import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { Sparkles, Bot, Send, User as UserIcon, HelpCircle } from 'lucide-react';

interface ChatBubble {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AIAssistantPage: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatBubble[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello ${user?.name || 'there'}! I am your IntellMeet AI Assistant. I can analyze your meeting transcripts, retrieve pending action items, summarize past calls, or prepare you for today's agenda. What would you like to know?`,
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    'Summarize my last meeting.',
    'What action items are pending?',
    'What meetings do I have today?',
    'Show unresolved tasks.',
    'Summarize Product Roadmap Discussion.',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatBubble = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await api.askAIAssistant(query);
      if (res.success && res.answer) {
        const aiMsg: ChatBubble = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: res.answer,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      }
    } catch (e: any) {
      const errorMsg: ChatBubble = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Sorry, I encountered an issue querying your workspace. Please try again.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col justify-between">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <span>IntellMeet AI Assistant</span>
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Ask questions about your meetings, tasks, and team deliverables
        </p>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200/80 shadow-card p-6 overflow-y-auto space-y-4">
        {messages.map((m) => {
          const isAi = m.sender === 'ai';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isAi ? '' : 'flex-row-reverse'}`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isAi
                    ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xs'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {isAi ? <Bot className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
              </div>

              <div
                className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed ${
                  isAi
                    ? 'bg-slate-50 border border-slate-200/70 text-slate-800'
                    : 'bg-blue-600 text-white shadow-xs'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>
                <span
                  className={`block text-[10px] mt-1.5 ${
                    isAi ? 'text-slate-400' : 'text-blue-200'
                  }`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200/70 rounded-2xl flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Suggested Prompts & Input */}
      <div className="space-y-3">
        {/* Sample prompt chips */}
        <div className="flex flex-wrap items-center gap-2">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-[11px] font-medium bg-white hover:bg-slate-50 text-slate-700 px-3 py-1 rounded-full border border-slate-200/80 shadow-2xs transition"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your meetings, tasks, or action items..."
            className="flex-1 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
