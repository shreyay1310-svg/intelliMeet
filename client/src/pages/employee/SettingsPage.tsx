import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { Settings, User, Lock, Bell, Video, Save, Check, Camera, Upload, Trash2, Loader2, Sparkles } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, refreshUser } = useAuth();

  const [activeSection, setActiveSection] = useState<'general' | 'security' | 'notifications' | 'preferences'>('general');
  const [name, setName] = useState(user?.name || 'Shreya Yadav');
  const [jobTitle, setJobTitle] = useState(user?.jobTitle || 'Product Designer');
  const [team, setTeam] = useState(user?.team || 'Product Team');

  // Avatar fields
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarMsg, setAvatarMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user?.avatar) {
      setAvatar(user.avatar);
    }
  }, [user?.avatar]);

  const avatarPresets = [
    { label: 'Corporate Male', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
    { label: 'Corporate Female', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80' },
    { label: 'Creative Designer', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
    { label: 'Tech Lead', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
    { label: 'Product Manager', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80' },
    { label: 'Minimalist Initials', url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || 'User')}&backgroundColor=2563eb,7c3aed` },
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setAvatarMsg({ type: 'error', text: 'Please select a valid image file (JPEG, PNG, WEBP).' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setAvatarMsg({ type: 'error', text: 'Image size must be less than 5MB.' });
      return;
    }

    try {
      setUploadingAvatar(true);
      setAvatarMsg(null);
      const res = await api.uploadAvatar(file);
      if (res.success && res.avatarUrl) {
        setAvatar(res.avatarUrl);
        await refreshUser();
        setAvatarMsg({ type: 'success', text: 'Profile picture updated successfully!' });
        setTimeout(() => setAvatarMsg(null), 3000);
      }
    } catch (err: any) {
      setAvatarMsg({ type: 'error', text: err.message || 'Avatar upload failed' });
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSelectPreset = async (presetUrl: string) => {
    try {
      setUploadingAvatar(true);
      setAvatarMsg(null);
      setAvatar(presetUrl);
      await api.updateProfile({ avatar: presetUrl });
      await refreshUser();
      setAvatarMsg({ type: 'success', text: 'Profile picture updated!' });
      setTimeout(() => setAvatarMsg(null), 3000);
    } catch (err: any) {
      setAvatarMsg({ type: 'error', text: err.message || 'Failed to update avatar' });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleRemoveAvatar = async () => {
    const defaultInitials = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || 'User')}&backgroundColor=2563eb,7c3aed`;
    await handleSelectPreset(defaultInitials);
  };

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

              {/* Profile Avatar / DP Section */}
              <div className="border-b border-slate-100 pb-6 mb-4">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
                  Profile Picture (DP)
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  {/* Avatar Preview */}
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm bg-slate-100 ring-4 ring-blue-50">
                      {avatar ? (
                        <img src={avatar} alt="Profile DP" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 text-xl bg-slate-200">
                          {name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingAvatar}
                      className="absolute bottom-0 right-0 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition transform hover:scale-105"
                      title="Upload new photo"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Action Buttons & Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/gif"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingAvatar}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm disabled:opacity-50"
                      >
                        {uploadingAvatar ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Upload className="w-3.5 h-3.5" />
                        )}
                        <span>{uploadingAvatar ? 'Uploading...' : 'Upload Photo'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        disabled={uploadingAvatar}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Remove</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      JPG, PNG, GIF or WEBP. Max size 5MB.
                    </p>

                    {avatarMsg && (
                      <div className={`text-[11px] font-semibold flex items-center gap-1 ${
                        avatarMsg.type === 'success' ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        {avatarMsg.type === 'success' ? <Check className="w-3.5 h-3.5" /> : null}
                        <span>{avatarMsg.text}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Preset Avatars */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Or choose a quick preset avatar:</span>
                  </div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {avatarPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectPreset(preset.url)}
                        disabled={uploadingAvatar}
                        title={preset.label}
                        className={`w-9 h-9 rounded-full overflow-hidden border-2 transition transform hover:scale-110 ${
                          avatar === preset.url ? 'border-blue-600 ring-2 ring-blue-400 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

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
