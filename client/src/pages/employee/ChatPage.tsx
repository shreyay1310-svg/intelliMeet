import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { User } from '../../types';
import { MessageSquare, Send, Hash, Users, Sparkles, CheckCheck } from 'lucide-react';

export const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [activeChannel, setActiveChannel] = useState<'# general' | '# product-team' | '# engineering'>('# product-team');
  const [chatMessages, setChatMessages] = useState<
    { sender: string; avatar?: string; text: string; time: string; isSelf?: boolean }[]
  >([
    {
      sender: 'Rohit Sharma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      text: 'Good morning everyone! Starting standup review in 10 minutes.',
      time: '10:20 AM',
    },
    {
      sender: 'Ananya Singh',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      text: 'Just uploaded the new Figma design system tokens for the meeting summary card.',
      time: '10:22 AM',
    },
    {
      sender: 'Shreya Yadav',
      avatar: user?.avatar,
      text: "Thanks Ananya! I've updated the sprint backlog accordingly.",
      time: '10:25 AM',
      isSelf: true,
    },
  ]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    api.getUsers().then((res) => {
      if (res.success && res.users) {
        setUsers(res.users);
      }
    });
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        sender: user?.name || 'You',
        avatar: user?.avatar,
        text: messageInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: true,
      },
    ]);
    setMessageInput('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[calc(100vh-120px)] flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <span>Team Chat & Channels</span>
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Real-time messaging, asynchronous team updates, and project channels
        </p>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-slate-200/80 shadow-card flex overflow-hidden">
        {/* Channel & Direct Messages Sidebar */}
        <div className="w-64 border-r border-slate-200 bg-slate-50/50 p-4 space-y-5 hidden md:block">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-2">
              Channels
            </span>
            <div className="space-y-1">
              {(['# general', '# product-team', '# engineering'] as const).map((ch) => (
                <button
                  key={ch}
                  onClick={() => setActiveChannel(ch)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                    activeChannel === ch
                      ? 'bg-blue-100/70 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Hash className="w-3.5 h-3.5" />
                  <span>{ch.replace('# ', '')}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-2">
              Online Colleagues
            </span>
            <div className="space-y-1">
              {users.slice(0, 5).map((u) => (
                <div
                  key={u.id}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 cursor-pointer text-xs"
                >
                  <div className="relative">
                    <img
                      src={u.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(u.name)}`}
                      alt={u.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-1 ring-white" />
                  </div>
                  <span className="truncate text-slate-700 font-medium">{u.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          {/* Channel Header */}
          <div className="h-12 border-b border-slate-200 px-6 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-xs">
              <Hash className="w-4 h-4 text-slate-400" />
              <span>{activeChannel}</span>
            </div>
            <span className="text-[11px] text-slate-400">Synced across devices</span>
          </div>

          {/* Chat List */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {chatMessages.map((m, idx) => (
              <div key={idx} className={`flex items-start gap-3 ${m.isSelf ? 'flex-row-reverse' : ''}`}>
                <img
                  src={
                    m.avatar ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(m.sender)}`
                  }
                  alt={m.sender}
                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200"
                />
                <div className={`max-w-md ${m.isSelf ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className="flex items-center gap-2 mb-1 text-[11px]">
                    <span className="font-bold text-slate-800">{m.sender}</span>
                    <span className="text-slate-400 text-[10px]">{m.time}</span>
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      m.isSelf
                        ? 'bg-blue-600 text-white rounded-tr-xs'
                        : 'bg-slate-100 text-slate-800 rounded-tl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={`Message ${activeChannel}...`}
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
            <button
              type="submit"
              className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
