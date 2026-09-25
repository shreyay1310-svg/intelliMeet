import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
  BarChart2,
  Download,
  Calendar,
  Clock,
  PieChart as PieIcon,
  Activity,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export const AdminAnalyticsPage: React.FC = () => {
  const [reports, setReports] = useState<any>(null);

  useEffect(() => {
    api.getAdminReports().then((res) => {
      if (res.success) {
        setReports(res);
      }
    });
  }, []);

  const meetingTypes = reports?.meetingTypes || [
    { name: 'Internal', value: 45, color: '#3b82f6' },
    { name: 'Client', value: 30, color: '#6366f1' },
    { name: 'Team-Sync', value: 15, color: '#10b981' },
    { name: 'Other', value: 10, color: '#f59e0b' },
  ];

  const meetingActivity = reports?.meetingActivity || [
    { day: 'Mon', internal: 25, client: 15 },
    { day: 'Tue', internal: 32, client: 20 },
    { day: 'Wed', internal: 28, client: 22 },
    { day: 'Thu', internal: 35, client: 18 },
    { day: 'Fri', internal: 30, client: 16 },
    { day: 'Sat', internal: 5, client: 2 },
    { day: 'Sun', internal: 4, client: 1 },
  ];

  const peakHours = reports?.peakHours || [
    { hour: '9 AM', count: 18 },
    { hour: '11 AM', count: 42 },
    { hour: '2 PM', count: 48 },
    { hour: '4 PM', count: 35 },
    { hour: '6 PM', count: 12 },
  ];

  const featureUsage = reports?.featureUsage || [
    { feature: 'Video Meetings', percentage: 85 },
    { feature: 'AI Summaries', percentage: 80 },
    { feature: 'Screen Sharing', percentage: 70 },
    { feature: 'Live Chat', percentage: 65 },
  ];

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Feature,UsagePercentage\n' +
      featureUsage.map((f: any) => `"${f.feature}",${f.percentage}%`).join('\n') +
      '\n\nMeetingType,Percentage\n' +
      meetingTypes.map((t: any) => `"${t.name}",${t.value}%`).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'intellimeet_telemetry_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header matching admin reference image 3 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-purple-600" />
            <span>Analytics & Reports</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Holistic insights into feature adoption, load distribution, and call types
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV Report</span>
        </button>
      </div>

      {/* Top 3 Quick Stats matching admin reference image 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Total Meetings
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">642</span>
            <span className="text-xs font-bold text-emerald-600">+8%</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Total Meeting Hours
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-purple-600">78.5 hrs</span>
            <span className="text-xs font-bold text-emerald-600">+15%</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Overall Engagement
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-blue-600">92%</span>
            <span className="text-xs font-bold text-emerald-600">+5%</span>
          </div>
        </div>
      </div>

      {/* 2 Top Charts matching admin reference image 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meeting Activity Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-4">
            Meeting Activity (Weekly)
          </h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={meetingActivity}>
                <XAxis dataKey="day" tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="internal" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Internal" />
                <Bar dataKey="client" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Client" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Meeting Types Donut Chart matching admin reference image 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-4">
            Meeting Types Breakdown
          </h3>
          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={meetingTypes}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                >
                  {meetingTypes.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 2 Bottom Cards: Peak Hours & Top Features matching admin reference image 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peak Meeting Hours */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-4">
            Peak Meeting Hours
          </h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakHours}>
                <XAxis dataKey="hour" tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Features Used */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-4">
            Top Features Used
          </h3>
          <div className="space-y-4">
            {featureUsage.map((f: any, idx: number) => (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-slate-800">{f.feature}</span>
                  <span className="text-purple-600 font-bold">{f.percentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 rounded-full transition-all"
                    style={{ width: `${f.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
