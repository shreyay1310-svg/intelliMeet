import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { Settings, User, Lock, Bell, Video, Save, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, refreshUser } = useAuth();

  const [activeSection, setActiveSection] = useState<'general' | 'security' | 'notifications' | 'preferences'>('general');
  const [name, setName] = useState(user?.name || 'Shreya Yadav');
  const [jobTitle, setJobTitle] = useState(user?.jobTitle || 'Product Designer');
  const [team, setTeam] = useState(user?.team || 'Product Team');

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  // Preferences
  const [cameraDefault, setCameraDefault] = useState(user?.preferences?.cameraDefault ?? true);
  const [microphoneDefault, setMicrophoneDefault] = useState(user?.preferences?.microphoneDefault ?? true);
  const [defaultDuration, setDefaultDuration] = useState(user?.preferences?.defaultMeetingDuration ?? 30);

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateProfile({
        name,
        jobTitle,
        team,
        preferences: {
          cameraDefault,
          microphoneDefault,
          defaultMeetingDuration: defaultDuration,
        },
      });
      await refreshUser();
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.changePassword({ currentPassword, newPassword });
      setPasswordMsg('Password successfully changed!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setPasswordMsg(err.message || 'Failed to update password');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <span>Account Settings & Preferences</span>
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Manage your personal workspace profile, meeting hardware defaults, and security
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar Tabs */}
        <div className="space-y-1">
          <button
            onClick={() => setActiveSection('general')}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-left transition ${
              activeSection === 'general'
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>General</span>
          </button>

          <button
            onClick={() => setActiveSection('security')}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-left transition ${
              activeSection === 'security'
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Security</span>
          </button>

          <button
            onClick={() => setActiveSection('notifications')}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-left transition ${
              activeSection === 'notifications'
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </button>

          <button
            onClick={() => setActiveSection('preferences')}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-left transition ${
              activeSection === 'preferences'
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Meeting Defaults</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="md:col-span-3 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-card">
          {activeSection === 'general' && (
            <form onSubmit={handleSaveGeneral} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Profile Details
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Work Email (Read Only)
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || 'shreya@zidio.in'}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Team / Department
                  </label>
                  <input
                    type="text"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
                  <span>{isSaved ? 'Changes Saved!' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          )}

          {activeSection === 'security' && (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Change Password
              </h3>

              {passwordMsg && (
                <div className="p-3 bg-blue-50 border border-blue-200 text-xs text-blue-700 rounded-xl">
                  {passwordMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  required
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer"
              >
                Update Password
              </button>
            </form>
          )}

          {activeSection === 'preferences' && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Meeting Preferences
              </h3>

              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Auto-start Camera</h4>
                  <p className="text-[11px] text-slate-500">Turn camera on automatically when entering a room</p>
                </div>
                <input
                  type="checkbox"
                  checked={cameraDefault}
                  onChange={(e) => setCameraDefault(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Auto-start Microphone</h4>
                  <p className="text-[11px] text-slate-500">Enable microphone automatically upon connecting</p>
                </div>
                <input
                  type="checkbox"
                  checked={microphoneDefault}
                  onChange={(e) => setMicrophoneDefault(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Notification Rules
              </h3>
              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <span>Notify me 10 minutes before meetings start</span>
              </label>
              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <span>Send notification when new task is assigned to me</span>
              </label>
              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <span>Alert when AI Meeting Summary is generated</span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
