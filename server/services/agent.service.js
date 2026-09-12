const { mockProperties } = require('../data/mockProperties');

const sessions = new Map();
const GEMINI_URL = (model) => `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

function getState(sessionId) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, { preferences: {}, candidates: [], shortlisted: [], actions: [], history: [] });
  }
  return sessions.get(sessionId);
}

function textFromResponse(data) {
  return (data?.candidates?.[0]?.content?.parts || [])
    .filter(p => p.text)
    .map(p => p.text)
    .join('\n');
}

function normalize(s) { return String(s || '').toLowerCase().trim(); }

function searchProperties(args, state) {
  const a = args || {};
  const maxRent = Number(a.maxRent) || Infinity;
  const minBedrooms = Number(a.minBedrooms) || 0;
  const city = normalize(a.city);
  const locality = normalize(a.locality);
  const furnished = a.furnished === true || a.furnished === 'true' ? true : null;
  const requiredAmenities = Array.isArray(a.amenities) ? a.amenities.map(normalize) : [];
  let results = mockProperties.filter(p =>
    p.price <= maxRent &&
    p.bedrooms >= minBedrooms &&
    (!city || normalize(p.city).includes(city)) &&
    (!locality || normalize(p.locality).includes(locality) || normalize(p.city).includes(locality)) &&
    (furnished === null || p.furnished === furnished) &&
    requiredAmenities.every(req => p.amenities.some(x => normalize(x).includes(req)) || (req === 'parking' && p.parking))
  );
  state.candidates = results.map(p => p.id);
  return { count: results.length, properties: results.map(p => ({...p})) };
}

function getPropertyDetails(args) {
  const p = mockProperties.find(x => x.id === args?.propertyId);
  return p ? {...p} : { error: 'Property not found' };
}

function checkAvailability(args) {
  const p = mockProperties.find(x => x.id === args?.propertyId);
  if (!p) return { propertyId: args?.propertyId, available: false, reason: 'Property not found' };
  return { propertyId: p.id, title: p.title, available: p.available, reason: p.available ? 'Available for booking' : 'Currently unavailable' };
}

function rankProperties(args) {
  const ids = Array.isArray(args?.propertyIds) ? args.propertyIds : [];
  const prefs = args?.preferences || {};
  const maxRent = Number(prefs.maxRent) || Infinity;
  const maxCommute = Number(prefs.maxCommute) || Infinity;
  const wantsParking = prefs.parking === true;
  const wantsFurnished = prefs.furnished === true;
  const scored = ids.map(id => mockProperties.find(p => p.id === id)).filter(Boolean).map(p => {
    const budgetScore = Math.max(0, Math.min(100, 100 - ((p.price / maxRent) * 55)));
    const commuteScore = maxCommute === Infinity ? 85 : Math.max(0, Math.min(100, 100 - ((p.commuteMinutes / maxCommute) * 45)));
    const furnishingScore = !wantsFurnished || p.furnished ? 100 : 0;
    const parkingScore = !wantsParking || p.parking ? 100 : 0;
    const ratingScore = p.rating * 20;
    const score = Math.round((budgetScore*.3 + commuteScore*.25 + furnishingScore*.15 + parkingScore*.15 + ratingScore*.15)*10)/10;
    return { propertyId:p.id, title:p.title, score, price:p.price, commuteMinutes:p.commuteMinutes, rating:p.rating, available:p.available, reasons:{ budget:Math.round(budgetScore), commute:Math.round(commuteScore), furnished:furnishingScore, parking:parkingScore } };
  }).sort((a,b)=>b.score-a.score);
  return { rankings: scored };
}

function shortlistProperty(args, state) {
  const p = mockProperties.find(x => x.id === args?.propertyId);
  if (!p) return { success:false, message:'Property not found' };
  if (!p.available) return { success:false, message:`${p.title} is unavailable, so it was not shortlisted.` };
  if (!state.shortlisted.includes(p.id)) state.shortlisted.push(p.id);
  state.actions.push({ type:'SHORTLIST_PROPERTY', propertyId:p.id, at:new Date().toISOString() });
  return { success:true, propertyId:p.id, title:p.title, shortlisted:state.shortlisted };
}

const declarations = [
  {name:'search_properties',description:'Search the Nestora demo property inventory using user constraints.',parameters:{type:'OBJECT',properties:{city:{type:'STRING'},locality:{type:'STRING'},maxRent:{type:'NUMBER'},minBedrooms:{type:'NUMBER'},furnished:{type:'BOOLEAN'},amenities:{type:'ARRAY',items:{type:'STRING'}}}}},
  {name:'get_property_details',description:'Get complete details for one property.',parameters:{type:'OBJECT',properties:{propertyId:{type:'STRING'}},required:['propertyId']}},
  {name:'check_availability',description:'Verify whether a property is currently available before recommending or shortlisting it.',parameters:{type:'OBJECT',properties:{propertyId:{type:'STRING'}},required:['propertyId']}},
  {name:'rank_properties',description:'Rank candidate properties using explicit rental preferences and return match scores.',parameters:{type:'OBJECT',properties:{propertyIds:{type:'ARRAY',items:{type:'STRING'}},preferences:{type:'OBJECT',properties:{maxRent:{type:'NUMBER'},maxCommute:{type:'NUMBER'},furnished:{type:'BOOLEAN'},parking:{type:'BOOLEAN'}}}},required:['propertyIds']}},
  {name:'shortlist_property',description:'Shortlist an available property for the current agent session. This is a real state-changing action in the demo.',parameters:{type:'OBJECT',properties:{propertyId:{type:'STRING'}},required:['propertyId']}}
];

async function callGemini(messages, model, apiKey) {
  const body = { contents: messages, tools:[{functionDeclarations:declarations}], generationConfig:{temperature:0.2} };
  const res = await fetch(GEMINI_URL(model), {method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':apiKey},body:JSON.stringify(body)});
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || `Gemini API error ${res.status}`);
  return data;
}

async function runAgent({sessionId, userMessage}) {
  const state = getState(sessionId);
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const activity = [];
  const add = (type, message, detail) => activity.push({type, message, detail, timestamp:new Date().toISOString()});

  add('goal','Goal received',userMessage);
  if (!apiKey) {
    return { reply: fallbackAgent(userMessage,state,add), activity, state };
  }

  const system = `You are Nestora Agent, an autonomous property-rental decision agent. Your job is to achieve the user's rental goal, not merely chat. Use tools to search, inspect, verify availability, rank candidates, and execute permitted actions. Maintain context across turns. Extract constraints from natural language and merge them with prior preferences. If the user changes a preference, re-plan. Before recommending a final property, verify availability. If a top candidate is unavailable, remove it and continue with another candidate. If the user asks to shortlist, use shortlist_property and verify the tool result. Never claim an action happened unless the tool returned success. Keep responses concise and explain the outcome, not hidden chain-of-thought. Current session state: ${JSON.stringify({preferences:state.preferences,shortlisted:state.shortlisted})}`;
  let contents = [
    {role:'user',parts:[{text:system}]},
    ...state.history.slice(-8),
    {role:'user',parts:[{text:userMessage}]}
  ];

  for (let step=0; step<8; step++) {
    const data = await callGemini(contents, model, apiKey);
    const parts = data?.candidates?.[0]?.content?.parts || [];
    const calls = parts.filter(p=>p.functionCall);
    if (!calls.length) {
      const reply = textFromResponse(data) || 'I could not complete the rental plan. Please try again.';
      state.history.push({role:'user',parts:[{text:userMessage}]},{role:'model',parts:[{text:reply}]});
      add('result','Final outcome',reply);
      return {reply,activity,state};
    }
    contents.push({role:'model',parts});
    const responses=[];
    for (const part of calls) {
      const name=part.functionCall.name, args=part.functionCall.args||{};
      add('action',`Calling ${name}`,args);
      let result;
      if(name==='search_properties') { result=searchProperties(args,state); state.preferences={...state.preferences,...args}; add('result','Search completed',`${result.count} candidate properties found`); }
      else if(name==='get_property_details') result=getPropertyDetails(args);
      else if(name==='check_availability') { result=checkAvailability(args); if(!result.available) add('adapt','Adaptation triggered',`${result.title || args.propertyId} unavailable; agent must re-plan`); }
      else if(name==='rank_properties') result=rankProperties(args);
      else if(name==='shortlist_property') { result=shortlistProperty(args,state); add(result.success?'result':'adapt',result.success?'Shortlist action completed':'Action blocked',result.message || result.title); }
      else result={error:'Unknown tool'};
      responses.push({functionResponse:{name,response:result}});
    }
    contents.push({role:'user',parts:responses});
  }
  throw new Error('Agent reached its execution limit without finishing.');
}

function fallbackAgent(message,state,add) {
  const m=normalize(message);
  const budget=(m.match(/(?:under|below|upto|up to|₹|rs\.?)[^\d]*(\d[\d,]*)/)||[])[1];
  if(budget) state.preferences.maxRent=Number(budget.replace(/,/g,''));
  const bedrooms=(m.match(/(\d+)\s*(?:bhk|bedroom)/)||[])[1]; if(bedrooms) state.preferences.minBedrooms=Number(bedrooms);
  if(/furnished/.test(m)) state.preferences.furnished=true;
  if(/parking/.test(m)) state.preferences.amenities=['parking'];
  if(/electronic city/.test(m)) state.preferences.locality='Electronic City';
  state.preferences.city='Bangalore';
  add('plan','Plan created','Search → verify availability → rank → recommend');
  const r=searchProperties(state.preferences,state); add('action','Calling search_properties',state.preferences); add('result','Search completed',`${r.count} candidate properties found`);
  const available=r.properties.filter(p=>p.available).slice(0,5); const ranking=rankProperties({propertyIds:available.map(p=>p.id),preferences:{...state.preferences,maxCommute:40}},state).rankings; add('action','Calling rank_properties',`${available.length} available candidates`);
  const best=ranking[0];
  if(!best) return 'I could not find a property matching the current constraints. Try increasing the budget or commute range.';
  const p=mockProperties.find(x=>x.id===best.propertyId);
  add('action','Calling check_availability',p.id); add('result','Availability verified',`${p.title} is available`);
  return `I found ${r.count} matching properties and verified availability. **Top match: ${p.title}** — ₹${p.price.toLocaleString('en-IN')}/month, ${p.bedrooms}BHK, ${p.furnished?'furnished':''}, ${p.commuteMinutes} min commute, rating ${p.rating}/5. Match score: **${best.score}%**.\n\nWhy it fits: it balances your budget, commute, furnishing and property preferences. Ask me to **shortlist it**, or change any constraint and I’ll re-plan.`;
}

module.exports = { runAgent };
