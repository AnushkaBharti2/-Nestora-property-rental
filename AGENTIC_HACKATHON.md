# Nestora Agent — Agentic AI Hackathon

## One-line pitch
Nestora Agent turns a natural-language rental goal into a multi-step, tool-using workflow that searches properties, verifies availability, ranks candidates, adapts when conditions change, and executes a shortlist action.

## Why this is agentic
- **Goal driven:** starts from an open-ended rental objective.
- **Planning:** turns the objective into constraints and a search plan.
- **Tool use:** calls property search, details, availability, ranking and shortlist tools.
- **State:** keeps preferences, candidates, actions and shortlist state across turns.
- **Adaptation:** unavailable candidates are removed and the agent can re-plan; changed user preferences are merged into the session.
- **Action + verification:** shortlisting changes agent state and the response is based on the actual tool result.

## Demo mode
The hackathon version includes a self-contained property inventory in `server/data/mockProperties.js`. This is intentional: the AI agent can be demonstrated without MongoDB credentials or a production database.

Set `AGENT_DEMO_MODE=true` in `server/.env`. The existing Nestora database integration remains available for future use; demo mode simply skips the MongoDB connection.

## Run locally
### Backend
```bash
cd server
npm install
npm start
```

### Frontend
```bash
cd client
npm install
npm run dev
```

The frontend expects `VITE_API_URL=http://localhost:5000`.

## Gemini
Create `server/.env` from `server/.env.example` and add your Gemini API key. Never commit `.env` or an API key. The agent calls Gemini from the server, not the browser.

## Suggested demo
1. Give the agent: “I'm moving to Bangalore for an internship. Find a furnished 1BHK under ₹25,000 near Electronic City with parking and a commute under 40 minutes.”
2. Show the Agent Activity panel: goal → search → evaluation → availability check → adaptation → final recommendation.
3. Ask: “Actually, increase my budget to ₹27,000 if the commute is below 25 minutes.”
4. Ask: “Shortlist the best option.”
5. Show the successful shortlist action.

## Architecture
```text
User Goal
   ↓
Nestora Agent Controller
   ↓
Gemini Reasoner + Session State
   ↓
Tool Selection
   ├── search_properties
   ├── get_property_details
   ├── check_availability
   ├── rank_properties
   └── shortlist_property
   ↓
Nestora Demo Inventory / MongoDB-compatible application layer
   ↓
Tool Result
   ↓
Replan / Act / Verify
   ↓
Final Outcome
```
