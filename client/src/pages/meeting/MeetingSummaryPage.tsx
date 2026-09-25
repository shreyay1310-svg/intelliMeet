import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import {
  ArrowLeft,
  Share2,
  Download,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  FileText,
  CheckSquare,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { MeetingSummary, Meeting, Transcript } from '../../types';

export const MeetingSummaryPage: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'summary' | 'transcript' | 'actionItems' | 'highlights'>('summary');
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [summary, setSummary] = useState<MeetingSummary | null>(null);
  const [transcript, setTranscript] = useState<Transcript | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const fetchSummary = async () => {
    if (!meetingId) return;
    try {
      setIsLoading(true);
      const res = await api.getMeetingSummary(meetingId);
      if (res.success) {
        setMeeting(res.meeting);
        setSummary(res.summary);
        setTranscript(res.transcript);
      }
    } catch (err) {
      console.error('Failed to load meeting summary:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [meetingId]);

  const handleRegenerate = async () => {
    if (!meetingId) return;
    try {
      setIsRegenerating(true);
      const res = await api.generateMeetingSummary(meetingId);
      if (res.success && res.summary) {
        setSummary(res.summary);
      }
    } catch (err) {
      console.error('Failed to regenerate summary:', err);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleDownload = () => {
    const reportData = {
      meeting: meeting?.title,
      date: meeting?.startTime,
      summary: summary?.overview,
      takeaways: summary?.keyTakeaways,
      actionItems: summary?.actionItems,
      decisions: summary?.decisions,
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${(meeting?.title || 'meeting').replace(/[^a-zA-Z0-9]/g, '_')}_summary.json`;
    link.click();
  };

  const handleCreateTaskFromAction = async (action: any) => {
    try {
      await api.createTask({
        title: action.task,
        dueDate: action.dueDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        status: 'todo',
        priority: 'high',
        tags: ['AI Summary', 'Action Item'],
      });
      alert(`Created task: "${action.task}"`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Buttons matching reference design 5 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/meetings')}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-blue-600 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>AI Meeting Summary</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="py-2 px-3.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold rounded-xl border border-purple-200/60 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Analyzing...' : 'Re-generate AI'}</span>
          </button>

          <button
            onClick={handleShare}
            className="py-2 px-3.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{copiedShare ? 'Link Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="py-2 px-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Meeting Details Card matching reference design 5 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
          Meeting Details
        </span>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          {meeting?.title || 'Product Roadmap Discussion'}
        </h2>

        <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {meeting?.startTime
              ? new Date(meeting.startTime).toLocaleDateString('en-US', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : 'Mon, 22 Sep 2026'}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            10:30 AM - 11:00 AM
          </span>
          <span>•</span>
          <span>{meeting?.platform || 'Google Meet'}</span>
          <span>•</span>
          <span className="flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
            <Users className="w-3 h-3 text-slate-500" />
            {meeting?.participants?.length || 4} participants
          </span>
        </div>
      </div>

      {/* Tabs matching reference design: Summary | Transcript | Action Items | Highlights */}
      <div className="border-b border-slate-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'summary'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveTab('transcript')}
            className={`py-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'transcript'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Transcript
          </button>
          <button
            onClick={() => setActiveTab('actionItems')}
            className={`py-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'actionItems'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Action Items ({summary?.actionItems?.length || 3})
          </button>
          <button
            onClick={() => setActiveTab('highlights')}
            className={`py-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'highlights'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Highlights
          </button>
        </div>
      </div>

      {/* Tab 1: Summary */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          {/* Executive Overview */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-3">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Summary</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {summary?.overview ||
                'Discussed Q3 roadmap, finalized key features, and aligned on timelines. The team agreed to prioritize analytics and improve the onboarding flow. Next steps were assigned to respective team members.'}
            </p>
          </div>

          {/* Key Takeaways matching reference design */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Key Takeaways</h3>
            <div className="space-y-2.5">
              {(
                summary?.keyTakeaways || [
                  'Finalize Q3 feature list',
                  'Improve onboarding flow',
                  'Add analytics in v2',
                  'Prepare client presentation',
                ]
              ).map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Transcript */}
      {activeTab === 'transcript' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-4">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Full Meeting Transcript
          </h3>
          <div className="divide-y divide-slate-100">
            {(
              transcript?.entries || [
                {
                  speaker: 'Rohit Sharma',
                  text: 'Looks great! We should make sure the telemetry pipeline handles real-time streams.',
                  timestamp: '10:35 AM',
                },
                {
                  speaker: 'Ananya Singh',
                  text: 'Should we add analytics in v2 or keep it in the initial Q3 release?',
                  timestamp: '10:36 AM',
                },
                {
                  speaker: 'Shreya Yadav',
                  text: "Yes, let's discuss this. Core metrics should be in the dashboard.",
                  timestamp: '10:37 AM',
                },
                {
                  speaker: 'Karan Mehta',
                  text: "I'll share the updated documentation and growth benchmarks.",
                  timestamp: '10:38 AM',
                },
              ]
            ).map((entry, idx) => (
              <div key={idx} className="py-3">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="font-bold text-slate-800">{entry.speaker}</span>
                  <span className="text-[10px]">
                    {entry.timestamp ? new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '10:35 AM'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{entry.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Action Items matching reference design */}
      {activeTab === 'actionItems' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Action Items & Assigned Deliverables
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3 px-6">Task</th>
                  <th className="py-3 px-6">Assignee</th>
                  <th className="py-3 px-6">Due Date</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {(
                  summary?.actionItems || [
                    {
                      task: 'Finalize Q3 feature list',
                      assigneeName: 'Rohit Sharma',
                      dueDate: 'Sep 24, 2026',
                      status: 'in-progress',
                    },
                    {
                      task: 'Improve onboarding flow',
                      assigneeName: 'Ananya Singh',
                      dueDate: 'Sep 25, 2026',
                      status: 'pending',
                    },
                    {
                      task: 'Prepare demo for client',
                      assigneeName: 'Shreya Yadav',
                      dueDate: 'Today',
                      status: 'in-progress',
                    },
                  ]
                ).map((action, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-6 font-semibold text-slate-800">{action.task}</td>
                    <td className="py-3.5 px-6">{action.assigneeName || 'Assigned Member'}</td>
                    <td className="py-3.5 px-6 text-slate-500">
                      {action.dueDate ? new Date(action.dueDate).toLocaleDateString() : 'Sep 24'}
                    </td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          action.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-600'
                            : action.status === 'in-progress'
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-amber-50 text-amber-600'
                        }`}
                      >
                        {action.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <button
                        onClick={() => handleCreateTaskFromAction(action)}
                        className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Create Task"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Highlights & Decisions */}
      {activeTab === 'highlights' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-3">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Decisions Made</h3>
            <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
              {(
                summary?.decisions || [
                  'Adopt WebRTC peer signaling for low-latency video and screen share.',
                  'Use Recharts for employee and admin analytics widgets.',
                ]
              ).map((d, idx) => (
                <li key={idx}>{d}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-3">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Important Topics</h3>
            <div className="flex flex-wrap gap-2">
              {(summary?.topics || ['Q3 Roadmap', 'UI/UX Design', 'Video Architecture', 'Analytics']).map(
                (topic, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg"
                  >
                    #{topic}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
