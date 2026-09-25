import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Meeting } from '../../types';
import { NewMeetingModal } from '../../components/meetings/NewMeetingModal';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Video,
  ExternalLink,
} from 'lucide-react';

export const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    api.getMeetings().then((res) => {
      if (res.success && res.meetings) {
        setMeetings(res.meetings);
      }
    });
  }, []);

  const weekDays = ['Mon, Sep 22', 'Tue, Sep 23', 'Wed, Sep 24', 'Thu, Sep 25', 'Fri, Sep 26'];
  const hours = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

  const colorPalettes = [
    'bg-purple-100/90 text-purple-900 border-purple-300',
    'bg-blue-100/90 text-blue-900 border-blue-300',
    'bg-emerald-100/90 text-emerald-900 border-emerald-300',
    'bg-amber-100/90 text-amber-900 border-amber-300',
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Calendar Header matching reference design 4 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            <span>Calendar</span>
          </h1>

          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2 py-1 shadow-2xs">
            <button className="p-1 hover:bg-slate-100 rounded text-slate-600">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-800 px-2">September 2026</span>
            <button className="p-1 hover:bg-slate-100 rounded text-slate-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle: Today | Week | Month */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-lg transition ${
                viewMode === 'week' ? 'bg-white shadow-2xs text-slate-900' : 'text-slate-500'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 rounded-lg transition ${
                viewMode === 'month' ? 'bg-white shadow-2xs text-slate-900' : 'text-slate-500'
              }`}
            >
              Month
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="py-2 px-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Meeting</span>
          </button>
        </div>
      </div>

      {/* Week Grid matching reference design 4 */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Day Headers */}
          <div className="grid grid-cols-6 border-b border-slate-200 bg-slate-50/70 text-center text-xs font-bold text-slate-700 py-3">
            <div className="w-20 text-slate-400">Time</div>
            {weekDays.map((day, i) => (
              <div key={i} className="border-l border-slate-200">
                {day}
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="divide-y divide-slate-100">
            {hours.map((hour, rowIdx) => (
              <div key={hour} className="grid grid-cols-6 min-h-[64px]">
                <div className="w-20 px-2 py-1 text-[11px] font-medium text-slate-400 text-right">
                  {hour}
                </div>

                {weekDays.map((_, colIdx) => {
                  // Find meeting that matches slot
                  let slotMeeting: Meeting | undefined;
                  if (colIdx === 0 && rowIdx === 1) slotMeeting = meetings[0]; // 10 AM Monday
                  if (colIdx === 0 && rowIdx === 5) slotMeeting = meetings[1]; // 2 PM Monday
                  if (colIdx === 0 && rowIdx === 7) slotMeeting = meetings[2]; // 4 PM Monday
                  if (colIdx === 1 && rowIdx === 1) slotMeeting = meetings[3]; // 10 AM Tuesday
                  if (colIdx === 1 && rowIdx === 3) slotMeeting = meetings[4]; // 12 PM Tuesday

                  return (
                    <div
                      key={colIdx}
                      className="border-l border-slate-100 p-1 relative hover:bg-slate-50/40 transition"
                    >
                      {slotMeeting && (
                        <div
                          onClick={() => navigate(`/meetings/room/${slotMeeting!.meetingRoomId}`)}
                          className={`p-2 rounded-xl border text-xs font-semibold shadow-2xs cursor-pointer transition hover:scale-[1.02] ${
                            colorPalettes[(rowIdx + colIdx) % colorPalettes.length]
                          }`}
                        >
                          <div className="font-bold truncate">{slotMeeting.title}</div>
                          <div className="text-[10px] opacity-80 mt-0.5">
                            {new Date(slotMeeting.startTime).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <NewMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMeetingCreated={() => api.getMeetings().then((res) => setMeetings(res.meetings || []))}
      />
    </div>
  );
};
