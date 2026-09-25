import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { Meeting, Task } from '../../types';
import { UpcomingMeetingCard } from '../../components/meetings/UpcomingMeetingCard';
import { NewMeetingModal } from '../../components/meetings/NewMeetingModal';
import { NewTaskModal } from '../../components/tasks/NewTaskModal';
import {
  Video,
  Plus,
  Calendar,
  CheckSquare,
  Users,
  TrendingUp,
  Clock,
  ArrowRight,
  Bot,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [meetingsRes, tasksRes, analyticsRes] = await Promise.all([
        api.getMeetings({ status: 'scheduled' }),
        api.getTasks(),
        api.getDashboardAnalytics(),
      ]);

      if (meetingsRes.success) setMeetings(meetingsRes.meetings);
      if (tasksRes.success) setTasks(tasksRes.tasks);
      if (analyticsRes.success) setAnalytics(analyticsRes);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleTask = async (task: Task) => {
    const newStatus = task.status === 'completed' ? 'todo' : 'completed';
    try {
      await api.updateTask(task._id, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, status: newStatus } : t))
      );
    } catch (e) {
      console.error('Task update failed', e);
    }
  };

  const upcomingThree = meetings.slice(0, 3);
  const relativeLabels = ['in 10 min', 'in 3 hrs', 'in 5 hrs'];

  const weeklyData = analytics?.weeklyTrends || [
    { day: 'Mon', meetings: 3, hours: 2.5 },
    { day: 'Tue', meetings: 2, hours: 1.5 },
    { day: 'Wed', meetings: 4, hours: 3.0 },
    { day: 'Thu', meetings: 1, hours: 0.8 },
    { day: 'Fri', meetings: 3, hours: 2.2 },
    { day: 'Sat', meetings: 0, hours: 0 },
    { day: 'Sun', meetings: 0, hours: 0 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header Banner matching reference design */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-purple-50/70 border border-blue-100/70 p-6 sm:p-8 shadow-card">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Good Morning,
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>{user?.name || 'Shreya'}!</span>
                <span className="text-2xl">👋</span>
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-1">
                Turn your meetings into meaningful outcomes.
              </p>
            </div>

            {/* Quick Stats Badges inside Banner */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-slate-200/60 shadow-2xs flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-800">
                  {analytics?.stats?.totalMeetings || 12}
                </span>
                <span className="text-xs text-slate-500">Total Meetings</span>
              </div>

              <div className="bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-slate-200/60 shadow-2xs flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">
                  {analytics?.stats?.actionItems || 28}
                </span>
                <span className="text-xs text-slate-500">Action Items</span>
              </div>

              <div className="bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-slate-200/60 shadow-2xs flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-slate-800">
                  {analytics?.stats?.teamMembers || 6}
                </span>
                <span className="text-xs text-slate-500">Team Members</span>
              </div>

              <div className="bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-slate-200/60 shadow-2xs flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-emerald-600">
                  {analytics?.stats?.productivity || '+40%'}
                </span>
                <span className="text-xs text-slate-500">Productivity</span>
              </div>
            </div>
          </div>

          {/* Right Side: CTA Button and AI Robot Card */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Robot Floating Visual Card */}
            <div
              onClick={() => navigate('/ai-assistant')}
              className="hidden sm:flex items-center gap-3 p-3 bg-white/90 backdrop-blur-xs rounded-2xl border border-indigo-100 shadow-soft cursor-pointer hover:border-indigo-300 transition group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">
                  AI Assistant
                </span>
                <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition">
                  AI for better meetings
                </span>
              </div>
            </div>

            {/* Main Action Button */}
            <button
              onClick={() => setIsMeetingModalOpen(true)}
              className="py-3 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm rounded-2xl shadow-md shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer hover:shadow-lg hover:shadow-blue-500/30"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>New Meeting</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Upcoming Meetings Section matching reference design */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Upcoming Meetings
          </h2>
          <button
            onClick={() => navigate('/meetings')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingThree.map((m, idx) => (
            <UpcomingMeetingCard
              key={m._id}
              meeting={m}
              relativeTimeText={relativeLabels[idx] || `${m.duration}m`}
              isPrimary={idx === 0}
            />
          ))}
          {upcomingThree.length === 0 && !isLoading && (
            <div className="col-span-3 p-8 text-center bg-white rounded-2xl border border-slate-200/80">
              <p className="text-xs text-slate-500">No scheduled upcoming meetings.</p>
              <button
                onClick={() => setIsMeetingModalOpen(true)}
                className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
              >
                + Schedule one now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. Bottom Grid: Today's Tasks & Meeting Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks Card matching reference design */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-slate-700" />
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Today's Tasks
                </h3>
              </div>
              <button
                onClick={() => navigate('/tasks')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 space-y-1">
              {tasks.slice(0, 4).map((t, idx) => {
                const isCompleted = t.status === 'completed';
                const tagLabels = ['Today', 'Today', 'Tomorrow', 'Sep 24'];
                const tagColors = [
                  'bg-rose-50 text-rose-600 border-rose-100',
                  'bg-rose-50 text-rose-600 border-rose-100',
                  'bg-blue-50 text-blue-600 border-blue-100',
                  'bg-slate-100 text-slate-600 border-slate-200',
                ];

                return (
                  <div
                    key={t._id}
                    onClick={() => handleToggleTask(t)}
                    className="flex items-center justify-between py-3 hover:bg-slate-50/80 px-2 rounded-xl transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => {}}
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                      />
                      <span
                        className={`text-xs font-medium transition ${
                          isCompleted
                            ? 'line-through text-slate-400'
                            : 'text-slate-800 group-hover:text-blue-600'
                        }`}
                      >
                        {t.title}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                        tagColors[idx % tagColors.length]
                      }`}
                    >
                      {tagLabels[idx % tagLabels.length]}
                    </span>
                  </div>
                );
              })}

              {tasks.length === 0 && !isLoading && (
                <div className="py-6 text-center text-xs text-slate-400">
                  No active tasks. Create one using the button below.
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setIsTaskModalOpen(true)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Quick Task</span>
            </button>
            <span className="text-[11px] text-slate-400">
              {tasks.filter((t) => t.status === 'completed').length} of {tasks.length} done
            </span>
          </div>
        </div>

        {/* Meeting Insights (Last 7 days) Card matching reference design */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Meeting Insights <span className="text-xs font-normal text-slate-400">(Last 7 days)</span>
            </h3>
            <button
              onClick={() => navigate('/analytics')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Details
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50/80 rounded-xl border border-slate-100 mb-5">
            <div className="text-center border-r border-slate-200/60">
              <span className="text-base font-extrabold text-slate-900 block leading-tight">
                {analytics?.stats?.last7Days?.meetingsCount || 8}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Meetings</span>
            </div>

            <div className="text-center border-r border-slate-200/60">
              <span className="text-base font-extrabold text-blue-600 block leading-tight">
                {analytics?.stats?.last7Days?.totalHours || 6.2} hrs
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Total Time</span>
            </div>

            <div className="text-center">
              <span className="text-base font-extrabold text-emerald-600 block leading-tight">
                {analytics?.stats?.last7Days?.completionRate || 85}%
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Action Completion</span>
            </div>
          </div>

          {/* Recharts Bar Chart */}
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: '#f1f5f9' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white text-[11px] p-2 rounded-lg shadow-md">
                          <p className="font-bold">{payload[0].payload.day}</p>
                          <p>{payload[0].value} meetings ({payload[0].payload.hours || 0} hrs)</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="meetings" radius={[6, 6, 0, 0]}>
                  {weeklyData.map((_: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 2 ? '#2563eb' : '#93c5fd'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Modals */}
      <NewMeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        onMeetingCreated={fetchData}
      />

      <NewTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onTaskCreated={fetchData}
      />
    </div>
  );
};
