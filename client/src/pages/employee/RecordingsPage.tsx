import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Recording } from '../../types';
import { Film, Play, Download, Trash2, Clock, Calendar, X } from 'lucide-react';

export const RecordingsPage: React.FC = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const fetchRecordings = async () => {
    try {
      const res = await api.getRecordings();
      if (res.success && res.recordings) {
        setRecordings(res.recordings);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRecordings();
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Film className="w-5 h-5 text-blue-600" />
          <span>Meeting Recordings</span>
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Access high-definition recordings with synced transcription and timestamps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recordings.map((rec) => (
          <div
            key={rec._id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden group hover:shadow-soft transition"
          >
            {/* Thumbnail with Play Overlay */}
            <div className="relative h-44 bg-slate-900 overflow-hidden cursor-pointer" onClick={() => setActiveVideo(rec.url)}>
              <img
                src={rec.thumbnailUrl || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=80'}
                alt={rec.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300 opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                  <Play className="w-5 h-5 ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md">
                {formatDuration(rec.durationSeconds || 1458)}
              </span>
            </div>

            <div className="p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                {rec.title}
              </h3>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {new Date(rec.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="text-[11px] font-semibold text-slate-600">
                  {((rec.sizeBytes || 104857600) / (1024 * 1024)).toFixed(1)} MB
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveVideo(rec.url)}
                  className="py-1.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Watch Video</span>
                </button>

                <a
                  href={rec.url}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}

        {recordings.length === 0 && (
          <div className="col-span-3 bg-white p-12 rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
            No meeting recordings found. Record any live call to see it here!
          </div>
        )}
      </div>

      {/* Video Playback Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
          <div className="bg-slate-950 rounded-2xl overflow-hidden max-w-3xl w-full border border-slate-800 shadow-modal">
            <div className="p-3 bg-slate-900 flex items-center justify-between border-b border-slate-800">
              <span className="text-xs font-bold text-slate-200">Video Player</span>
              <button onClick={() => setActiveVideo(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center">
              <video src={activeVideo} controls autoPlay className="w-full h-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
