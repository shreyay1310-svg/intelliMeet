import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import {
  Search,
  Bell,
  HelpCircle,
  Menu,
  Check,
  Video,
  CheckSquare,
  User as UserIcon,
  LogOut,
  ExternalLink,
  X,
  Shield,
  Film,
} from 'lucide-react';
import { NotificationItem } from '../../types';

interface NavbarProps {
  onOpenMobileSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileSidebar }) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    meetings: any[];
    tasks: any[];
    people: any[];
    recordings: any[];
  } | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Notification state
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // User menu state
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Help modal state
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await api.getNotifications();
      if (res.success && res.notifications) {
        setNotifications(res.notifications);
      }
    } catch (e) {
      // Ignore background error
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Handle global search debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await api.globalSearch(searchQuery);
        if (res.success) {
          setSearchResults(res.results);
          setIsSearchOpen(true);
        }
      } catch (err) {
        // search failed
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllNotifRead = async () => {
    try {
      await api.markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (e) {}
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
        {/* Left: Mobile hamburger + Search input */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Global Search Bar */}
          <div ref={searchRef} className="relative w-full max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => {
                  if (searchResults) setIsSearchOpen(true);
                }}
                placeholder="Search meetings, people, transcripts..."
                className="w-full pl-9 pr-14 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded shadow-2xs">
                  Ctrl K
                </kbd>
              </div>
            </div>

            {/* Global Search Results Dropdown */}
            {isSearchOpen && searchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-modal border border-slate-100 overflow-hidden z-50 max-h-96 overflow-y-auto">
                <div className="p-2 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Search Results
                  </span>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Meetings */}
                {searchResults.meetings.length > 0 && (
                  <div className="p-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                      Meetings
                    </div>
                    {searchResults.meetings.map((m) => (
                      <div
                        key={m._id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate(`/meetings/room/${m.meetingRoomId}`);
                        }}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-blue-50 cursor-pointer text-xs group"
                      >
                        <Video className="w-3.5 h-3.5 text-blue-500" />
                        <span className="font-medium text-slate-800 group-hover:text-blue-600 truncate flex-1">
                          {m.title}
                        </span>
                        <span className="text-[10px] text-slate-400">{m.platform}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tasks */}
                {searchResults.tasks.length > 0 && (
                  <div className="p-2 border-t border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                      Tasks
                    </div>
                    {searchResults.tasks.map((t) => (
                      <div
                        key={t._id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate('/tasks');
                        }}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-amber-50 cursor-pointer text-xs group"
                      >
                        <CheckSquare className="w-3.5 h-3.5 text-amber-500" />
                        <span className="font-medium text-slate-800 group-hover:text-amber-600 truncate flex-1">
                          {t.title}
                        </span>
                        <span className="text-[10px] text-slate-400 capitalize">{t.status}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* People */}
                {searchResults.people.length > 0 && (
                  <div className="p-2 border-t border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                      Team Members
                    </div>
                    {searchResults.people.map((p) => (
                      <div
                        key={p._id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate('/team');
                        }}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-purple-50 cursor-pointer text-xs group"
                      >
                        <img
                          src={
                            p.avatar ||
                            `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(p.name)}`
                          }
                          alt={p.name}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-medium text-slate-800 group-hover:text-purple-600 truncate flex-1">
                          {p.name}
                        </span>
                        <span className="text-[10px] text-slate-400">{p.team}</span>
                      </div>
                    ))}
                  </div>
                )}

                {searchResults.meetings.length === 0 &&
                  searchResults.tasks.length === 0 &&
                  searchResults.people.length === 0 && (
                    <div className="py-6 text-center text-xs text-slate-400">
                      No matching records found for "{searchQuery}"
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>

        {/* Right Nav Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin Switch Shortcut if user is Admin */}
          {isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 hover:bg-purple-100 transition border border-purple-200/50"
            >
              <Shield className="w-3.5 h-3.5 text-purple-600" />
              <span>Admin View</span>
            </button>
          )}

          {/* Help Button */}
          <button
            onClick={() => setIsHelpOpen(true)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
            title="Help & Shortcuts"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Notifications Dropdown */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-modal border border-slate-100 overflow-hidden z-50">
                <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-800">Notifications</span>
                    {unreadNotifCount > 0 && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-700 rounded-full">
                        {unreadNotifCount} new
                      </span>
                    )}
                  </div>
                  {unreadNotifCount > 0 && (
                    <button
                      onClick={handleMarkAllNotifRead}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      <span>Mark all read</span>
                    </button>
                  )}
                </div>

                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">
                      No notifications at this time.
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => {
                          setIsNotifOpen(false);
                          if (item.link) navigate(item.link);
                        }}
                        className={`p-3.5 hover:bg-slate-50 transition cursor-pointer flex gap-3 ${
                          !item.read ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            item.type === 'meeting_reminder'
                              ? 'bg-blue-100 text-blue-600'
                              : item.type === 'task_assigned'
                              ? 'bg-amber-100 text-amber-600'
                              : 'bg-indigo-100 text-indigo-600'
                          }`}
                        >
                          {item.type === 'meeting_reminder' ? (
                            <Video className="w-4 h-4" />
                          ) : item.type === 'task_assigned' ? (
                            <CheckSquare className="w-4 h-4" />
                          ) : (
                            <Film className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                            {item.message}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {new Date(item.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar Dropdown */}
          <div ref={userMenuRef} className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition cursor-pointer"
            >
              <img
                src={
                  user?.avatar ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || 'User')}`
                }
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-2xs"
              />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-modal border border-slate-100 py-1.5 z-50">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-800 truncate">{user?.name}</p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{user?.email}</p>
                  <span className="inline-block mt-1 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded bg-blue-100 text-blue-700">
                    {user?.role}
                  </span>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigate('/settings');
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>Profile & Preferences</span>
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        navigate('/admin');
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-purple-700 hover:bg-purple-50 flex items-center gap-2.5 transition font-semibold"
                    >
                      <Shield className="w-3.5 h-3.5 text-purple-600" />
                      <span>Admin Management</span>
                    </button>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logout();
                      navigate('/login');
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Help Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-modal border border-slate-100 max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <span>IntellMeet Quick Guide</span>
              </h3>
              <button
                onClick={() => setIsHelpOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                <p className="font-semibold text-blue-900 mb-1">📹 Real-Time WebRTC Conferencing</p>
                <p>Click "Join" on any upcoming meeting to launch the video call with audio, video, screen share, and live chat.</p>
              </div>
              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
                <p className="font-semibold text-purple-900 mb-1">🤖 AI Meeting Summaries</p>
                <p>Meeting transcripts automatically generate summaries, key takeaways, and action items in one click.</p>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <p className="font-semibold text-emerald-900 mb-1">📅 Calendar Integration</p>
                <p>Click "Add to Calendar" to download an .ics file compatible with Google Calendar, Outlook, and Apple Calendar.</p>
              </div>
            </div>
            <button
              onClick={() => setIsHelpOpen(false)}
              className="mt-5 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
