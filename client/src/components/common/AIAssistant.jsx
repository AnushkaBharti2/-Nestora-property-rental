import { useState } from 'react';
import { MessageCircle, X, Send, Bot, User, Activity, CheckCircle2, AlertTriangle, Loader2, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const activityIcon = (type) => {
  if (type === 'adapt') return <AlertTriangle className="w-3.5 h-3.5" />;
  if (type === 'result') return <CheckCircle2 className="w-3.5 h-3.5" />;
  return <Activity className="w-3.5 h-3.5" />;
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ id: 1, role: 'assistant', content: "Hi! I'm **Nestora Agent**. Give me a rental goal in natural language. I'll search, evaluate, adapt to changes, and can shortlist an available property for you." }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activity, setActivity] = useState([]);
  const [sessionId] = useState(() => `nestora-${Date.now()}-${Math.random().toString(36).slice(2)}`);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: text }]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/agent/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text })
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Agent request failed');
      setActivity(data.activity || []);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: data.reply || 'I completed the task.' }]);
    } catch (error) {
      setActivity(prev => [...prev, { type: 'adapt', message: 'Agent request failed', detail: error.message }]);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: `I couldn't reach the agent service. **${error.message}**\n\nMake sure the Nestora server is running on port 5000.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetSession = () => {
    window.location.reload();
  };

  return <>
    <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-110 transition-all duration-300">
      <MessageCircle className="w-6 h-6 text-white" />
    </button>

    {isOpen && <div className="fixed bottom-24 right-6 z-50 w-[430px] max-w-[calc(100vw-2rem)] h-[650px] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl"><Bot className="w-5 h-5" /></div>
          <div><h3 className="font-semibold">Nestora Agent</h3><p className="text-xs text-white/80">Plan • Act • Adapt • Verify</p></div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={resetSession} title="Reset session" className="p-2 hover:bg-white/20 rounded-xl"><RotateCcw className="w-4 h-4" /></button>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-xl"><X className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs text-slate-500">
        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Agentic rental workflow enabled
      </div>

      {activity.length > 0 && <div className="mx-3 mt-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
        <div className="px-3 py-2 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300"><Activity className="w-3.5 h-3.5 text-orange-500" /> Agent Activity</div>
        <div className="max-h-32 overflow-y-auto p-2 space-y-1">
          {activity.map((item, i) => <div key={i} className={`flex items-start gap-2 text-[11px] ${item.type === 'adapt' ? 'text-amber-600' : 'text-slate-600 dark:text-slate-300'}`}>
            <span className="mt-0.5">{activityIcon(item.type)}</span><span><b>{item.message}</b>{item.detail ? ` — ${typeof item.detail === 'string' ? item.detail : JSON.stringify(item.detail)}` : ''}</span>
          </div>)}
        </div>
      </div>}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          {msg.role === 'assistant' && <div className="mr-2 mt-1 text-orange-500"><Bot className="w-4 h-4" /></div>}
          {msg.role === 'user' && <div className="order-2 ml-2 mt-1 text-slate-400"><User className="w-4 h-4" /></div>}
          <div className={`max-w-[82%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100'}`}>
            {msg.role === 'assistant' ? <ReactMarkdown className="text-sm prose prose-sm dark:prose-invert">{msg.content}</ReactMarkdown> : <p className="text-sm">{msg.content}</p>}
          </div>
        </div>)}
        {isLoading && <div className="flex justify-start items-center gap-2 text-xs text-slate-500"><Loader2 className="w-4 h-4 animate-spin text-orange-500" /> Agent is planning and using Nestora tools...</div>}
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="text-[11px] text-slate-400 mb-2">Try: “Find a furnished 1BHK in Bangalore under ₹25,000 near Electronic City with parking.”</div>
        <div className="flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Give the agent a rental goal..." className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 border-0 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
          <button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"><Send className="w-5 h-5" /></button>
        </div>
      </div>
    </div>}
  </>;
}
