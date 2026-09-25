import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
  BarChart2,
  TrendingUp,
  Clock,
  Calendar,
  CheckCircle,
  Users,
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.getDashboardAnalytics().then((res) => {
      if (res.success) {
        setData(res);
      }
    });
  }, []);

  const productivityTrend = [
    { week: 'Week 1', score: 65 },
    { week: 'Week 2', score: 72 },
    { week: 'Week 3', score: 80 },
    { week: 'Week 4', score: 88 },
  ];

  const meetingTypes = [
    { name: 'Internal', value: 50, color: '#3b82f6' },
    { name: 'Client Review', value: 25, color: '#6366f1' },
    { name: 'Team Sync', value: 15, color: '#10b981' },
    { name: 'Ad-hoc', value: 10, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-blue-600" />
          <span>Productivity & Meeting Analytics</span>
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Measure collaboration efficiency, time spent in sessions, and deliverable throughput
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">
            Weekly Meetings
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900">12</span>
            <span className="text-xs font-bold text-emerald-600">+15% from last wk</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">
            Meeting Hours
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-blue-600">8.4 hrs</span>
            <span className="text-xs font-bold text-slate-500">Avg 42m / meeting</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">
            Action Completion
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-600">85%</span>
            <span className="text-xs font-bold text-emerald-600">High efficiency</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">
            Productivity Score
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-purple-600">+40%</span>
            <span className="text-xs font-bold text-purple-600">Above team avg</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productivity Trend */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-4">
            Productivity Growth Trend
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productivityTrend}>
                <defs>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2.5} fill="url(#colorProd)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Meeting Type Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-4">
            Meeting Type Breakdown
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={meetingTypes}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={50}
                  paddingAngle={4}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {meetingTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
