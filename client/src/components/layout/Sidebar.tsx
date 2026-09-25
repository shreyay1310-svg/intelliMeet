import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Video,
  Calendar,
  MessageSquare,
  CheckSquare,
  Film,
  Sparkles,
  Users,
  BarChart2,
  Settings,
  LogOut,
  Shield,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Meetings', path: '/meetings', icon: Video },
    { label: 'Calendar', path: '/calendar', icon: Calendar },
    { label: 'Chat', path: '/chat', icon: MessageSquare },
    { label: 'Tasks', path: '/tasks', icon: CheckSquare },
    { label: 'Recordings', path: '/recordings', icon: Film },
    { label: 'AI Assistant', path: '/ai-assistant', icon: Sparkles },
    { label: 'Team', path: '/team', icon: Users },
    { label: 'Analytics', path: '/analytics', icon: BarChart2 },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 w-64 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100 gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
          <Video className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">
            Intell<span className="text-blue-600">Meet</span>
          </span>
          <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-0.5">
            Enterprise Suite
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-blue-600 stroke-[2.25]' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.label === 'AI Assistant' && (
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-100 text-indigo-700 rounded-md">
                      AI
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        {/* Admin Quick Switch (if Admin role) */}
        {isAdmin && (
          <div className="pt-2 mt-2 border-t border-slate-100">
            <NavLink
              to="/admin"
              onClick={onCloseMobile}
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 transition"
            >
              <Shield className="w-4 h-4 text-purple-600" />
              <span className="flex-1">Admin Portal</span>
              <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
            </NavLink>
          </div>
        )}
      </nav>

      {/* User Card at bottom matching reference design */}
      <div className="p-3 border-t border-slate-100">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer group">
          <img
            src={
              user?.avatar ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || 'User')}`
            }
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-xs"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate leading-tight">
              {user?.name || 'Shreya Yadav'}
            </p>
            <p className="text-xs text-slate-400 truncate mt-0.5">
              {user?.team || 'Product Team'}
            </p>
          </div>
          <button
            onClick={handleLogout}
            title="Sign out"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop static sidebar */}
      <aside className="hidden lg:block h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative z-10">{sidebarContent}</div>
        </div>
      )}
    </>
  );
};
