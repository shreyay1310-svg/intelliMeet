import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Meeting } from '../../types';
import { downloadICSFile } from '../../utils/calendar';
import { Video, Calendar, Clock, Sparkles } from 'lucide-react';

interface UpcomingMeetingCardProps {
  meeting: Meeting;
  relativeTimeText?: string;
  isPrimary?: boolean;
}

export const UpcomingMeetingCard: React.FC<UpcomingMeetingCardProps> = ({
  meeting,
  relativeTimeText,
  isPrimary = false,
}) => {
  const navigate = useNavigate();

  const formattedTime = new Date(meeting.startTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

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

  const handleJoin = () => {
    navigate(`/meetings/room/${meeting.meetingRoomId}`);
  };

  const handleAddToCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadICSFile(meeting);
  };

  const participantsList = meeting.participants || [];
  const displayAvatars = participantsList.slice(0, 3);
  const remainingCount = Math.max(0, participantsList.length - 3);

  return (
    <div
      className={`bg-white rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between ${
        isPrimary
          ? 'border-blue-200 shadow-soft ring-1 ring-blue-500/10'
          : 'border-slate-200/80 shadow-xs hover:shadow-soft hover:border-slate-300'
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-slate-900 tracking-tight">
            {formattedTime}
          </span>
          <span
            className={`px-2 py-0.5 text-[11px] font-semibold rounded-full ${
              isPrimary
                ? 'bg-blue-50 text-blue-600 border border-blue-100'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {relativeTimeText || `${meeting.duration}m`}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition">
          {meeting.title}
        </h4>

        {/* Duration & Platform */}
        <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {meeting.duration} min
          </span>
          <span>•</span>
          <span className="text-[11px] text-slate-600">{getPlatformIcon(meeting.platform)}</span>
        </div>

        {/* Participant Avatars Stack */}
        <div className="flex items-center gap-1.5 mt-4">
          <div className="flex -space-x-2 overflow-hidden">
            {displayAvatars.map((p, idx) => (
              <img
                key={p.id || idx}
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
          {remainingCount > 0 && (
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full">
              +{remainingCount}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
        {isPrimary ? (
          <button
            onClick={handleJoin}
            className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs shadow-blue-500/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Join</span>
          </button>
        ) : (
          <>
            <button
              onClick={handleAddToCalendar}
              className="flex-1 py-1.5 px-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl transition flex items-center justify-center gap-1 cursor-pointer"
              title="Add to Calendar"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Add to Calendar</span>
            </button>
            <button
              onClick={handleJoin}
              className="py-1.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Join</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
