import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
  Users,
  Video,
  Clock,
  TrendingUp,
  Building2,
  Activity,
  ArrowUpRight,
  Shield,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getAdminStats().then((res) => {
      if (res.success) {
        setStats(res);
      }
      setIsLoading(false);
    });
  }, []);

  const meetingTrend = stats?.meetingTrend || [
    { month: 'Jan', meetings: 45 },
    { month: 'Feb', meetings: 52 },
    { month: 'Mar', meetings: 68 },
    { month: 'Apr', meetings: 60 },
    { month: 'May', meetings: 85 },
    { month: 'Jun', meetings: 95 },
    { month: 'Jul', meetings: 110 },
    { month: 'Aug', meetings: 125 },
    { month: 'Sep', meetings: 156 },
  ];

  const userActivity = stats?.userActivity || [
    { day: 'Mon', active: 120 },
    { day: 'Tue', active: 145 },
    { day: 'Wed', active: 152 },
    { day: 'Thu', active: 138 },
    { day: 'Fri', active: 140 },
    { day: 'Sat', active: 45 },
    { day: 'Sun', active: 30 },
  ];

  const topTeams = stats?.topTeams || [
    { team: 'Product', count: 42 },
    { team: 'Design', count: 28 },
    { team: 'Engineering', count: 25 },
    { team: 'Marketing', count: 18 },
  ];

  const recentActivity = stats?.recentActivity || [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            <span>Admin Dashboard</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time telemetry, user management, and platform engagement
          </p>
        </div>

        <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
          Last 30 days
        </span>
      </div>

      {/* 4 Overview Metric Cards matching admin reference image 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Users */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Total Users
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">
                {stats?.overview?.totalUsers || 156}
              </span>
              <span className="text-[10px] font-bold text-emerald-600">+12%</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Total Meetings */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Total Meetings
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-blue-600">
                {stats?.overview?.totalMeetings || 642}
              </span>
              <span className="text-[10px] font-bold text-blue-600">+8%</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Video className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Total Meeting Time */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Meeting Time
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">
                {stats?.overview?.totalMeetingHours || '78.5 hrs'}
              </span>
              <span className="text-[10px] font-bold text-emerald-600">+20%</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Engagement */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Engagement
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-purple-600">
                {stats?.overview?.engagement || '92%'}
              </span>
              <span className="text-[10px] font-bold text-emerald-600">+5%</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2 Charts matching admin reference image 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meetings Trend */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-4">
            Meetings Trend
          </h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={meetingTrend}>
                <defs>
                  <linearGradient id="colorMeetings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="meetings" stroke="#7c3aed" strokeWidth={2.5} fill="url(#colorMeetings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Activity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-4">
            User Activity
          </h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userActivity}>
                <XAxis dataKey="day" tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="active" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Activity & Top Teams matching admin reference image 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-4">
            Recent Activity
          </h3>
          <div className="divide-y divide-slate-100">
            {recentActivity.map((log: any, idx: number) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                    {log.userName?.[0] || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      {log.userName} <span className="font-normal text-slate-500">{log.action?.toLowerCase()}</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{log.details}</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">
                  {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Teams with horizontal bars */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-4">
            Top Teams by Meeting Hours
          </h3>
          <div className="space-y-4">
            {topTeams.map((t: any, idx: number) => {
              const max = 45;
              const pct = Math.round((t.count / max) * 100);
              return (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-slate-800">{t.team}</span>
                    <span className="text-slate-500">{t.count} hrs</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
