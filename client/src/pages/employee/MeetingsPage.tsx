import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Meeting } from '../../types';
import { NewMeetingModal } from '../../components/meetings/NewMeetingModal';
import {
  Video,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Share2,
  FileText,
} from 'lucide-react';

export const MeetingsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'personal'>('upcoming');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedRoom, setCopiedRoom] = useState(false);

  const fetchMeetings = async () => {
    try {
      const res = await api.getMeetings({
        type: typeFilter,
        search: searchQuery,
      });
      if (res.success && res.meetings) {
        setMeetings(res.meetings);
      }
    } catch (err) {
      console.error('Failed to fetch meetings', err);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [typeFilter, searchQuery]);

  const personalRoomId = `room-${user?.id?.slice(-6) || 'shreya-desk'}`;
  const personalRoomUrl = `${window.location.origin}/meetings/room/${personalRoomId}`;

  const handleCopyPersonalRoom = () => {
    navigator.clipboard.writeText(personalRoomUrl);
    setCopiedRoom(true);
    setTimeout(() => setCopiedRoom(false), 2000);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Google Meet':
        return '🟢 Google Meet';
      case 'Teams':
        return '🟣 Teams';
      case 'Zoom':
        return '🔵 Zoom';
      default:
        return '⚡ IntellMeet';
    }
  };

  // Group meetings by Date header matching reference design: "Mon, 22 Sep 2026"
  const groupedMeetings: Record<string, Meeting[]> = {};
  meetings.forEach((m) => {
    const d = new Date(m.startTime);
    const dateKey = d.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    if (!groupedMeetings[dateKey]) groupedMeetings[dateKey] = [];
    groupedMeetings[dateKey].push(m);
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Meetings
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage scheduled video conferences, personal rooms, and AI summaries
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs shadow-blue-500/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Meeting</span>
        </button>
      </div>

      {/* Tabs Navigation matching reference design */}
      <div className="border-b border-slate-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'upcoming'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`py-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'past'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Past Meetings
          </button>
          <button
            onClick={() => setActiveTab('personal')}
            className={`py-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'personal'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Personal Room
          </button>
        </div>
      </div>

      {/* Tab Content: Upcoming & Past */}
      {activeTab !== 'personal' ? (
        <div className="space-y-5">
          {/* Filters Bar matching reference design */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="relative w-full sm:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search meetings..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="py-1.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">All Meetings</option>
                <option value="internal">Internal</option>
                <option value="client">Client</option>
                <option value="team-sync">Team Sync</option>
                <option value="review">Review</option>
              </select>

              <span className="text-xs text-slate-400 px-2 font-medium">This Week</span>
            </div>
          </div>

          {/* Grouped Meetings List matching reference design */}
          <div className="space-y-6">
            {Object.keys(groupedMeetings).map((dateHeader) => (
              <div key={dateHeader} className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
                  {dateHeader}
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card divide-y divide-slate-100 overflow-hidden">
                  {groupedMeetings[dateHeader].map((m) => {
                    const startFmt = new Date(m.startTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    });
                    const endFmt = new Date(m.endTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    });
                    const participants = m.participants || [];
                    const displayAvatars = participants.slice(0, 3);
                    const extra = Math.max(0, participants.length - 3);

                    return (
                      <div
                        key={m._id}
                        className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition"
                      >
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span>
                              {startFmt} - {endFmt}
                            </span>
                            <span>•</span>
                            <span>{getPlatformIcon(m.platform)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {/* Avatars */}
                          <div className="flex items-center gap-1">
                            <div className="flex -space-x-2 overflow-hidden">
                              {displayAvatars.map((p, i) => (
                                <img
                                  key={p.id || i}
                                  src={
                                    p.avatar ||
                                    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(p.name || 'User')}`
                                  }
                                  alt={p.name}
                                  title={p.name}
                                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                                />
                              ))}
                            </div>
                            {extra > 0 && (
                              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full">
                                +{extra}
                              </span>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            {/* Summary link if available */}
                            <button
                              onClick={() => navigate(`/meetings/summary/${m._id}`)}
                              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition"
                              title="View AI Summary"
                            >
                              <FileText className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => navigate(`/meetings/room/${m.meetingRoomId}`)}
                              className="py-1.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition cursor-pointer shadow-2xs"
                            >
                              Join
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {Object.keys(groupedMeetings).length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center text-xs text-slate-500">
                No meetings found matching your filter criteria.
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Personal Room Tab */
        <div className="max-w-2xl bg-white rounded-2xl border border-slate-200/80 p-6 shadow-card space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Personal Meeting Room</h3>
            <p className="text-xs text-slate-500 mt-1">
              Your static dedicated video room for quick 1-on-1s and impromptu huddles.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
            <span className="text-xs font-mono text-slate-700 truncate select-all">
              {personalRoomUrl}
            </span>
            <button
              onClick={handleCopyPersonalRoom}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition flex items-center gap-1.5 shrink-0"
            >
              {copiedRoom ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/meetings/room/${personalRoomId}`)}
              className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <Video className="w-4 h-4" />
              <span>Start Personal Meeting</span>
            </button>
          </div>
        </div>
      )}

      {/* New Meeting Modal */}
      <NewMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMeetingCreated={fetchMeetings}
      />
    </div>
  );
};
