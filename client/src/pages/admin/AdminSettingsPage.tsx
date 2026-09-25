import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Sliders,
  Video,
  Sparkles,
  CreditCard,
  FileText,
  Save,
  Check,
  Mic,
  Camera,
  Users,
  Lock,
  Zap,
  Download,
  RefreshCw,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  HardDrive,
  Clock,
  Globe,
  Plus,
  ExternalLink,
  Laptop,
  CheckCircle,
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'general' | 'security' | 'integrations' | 'preferences' | 'ai' | 'billing' | 'audit'
  >('preferences');

  // General Settings State
  const [orgName, setOrgName] = useState('Zidio Development');
  const [supportEmail, setSupportEmail] = useState('support@zidio.in');
  const [timezone, setTimezone] = useState('(UTC+5:30) India Standard Time');
  const [defaultDuration, setDefaultDuration] = useState('60 minutes');
  const [generalSaved, setGeneralSaved] = useState(false);

  // Meeting Preferences State
  const [prefDuration, setPrefDuration] = useState('45 minutes');
  const [prefResolution, setPrefResolution] = useState('1080p Full HD (Recommended)');
  const [prefMaxParticipants, setPrefMaxParticipants] = useState('100 participants');
  const [prefLayout, setPrefLayout] = useState('Smart Dynamic Grid');
  const [prefMuteOnEntry, setPrefMuteOnEntry] = useState(true);
  const [prefVideoOffOnEntry, setPrefVideoOffOnEntry] = useState(false);
  const [prefWaitingRoom, setPrefWaitingRoom] = useState(true);
  const [prefScreenShareAll, setPrefScreenShareAll] = useState(true);
  const [prefAutoRecord, setPrefAutoRecord] = useState(false);
  const [prefNoiseCancellation, setPrefNoiseCancellation] = useState(true);
  const [prefVirtualBackground, setPrefVirtualBackground] = useState(true);
  const [prefInMeetingChat, setPrefInMeetingChat] = useState(true);
  const [prefFileSharing, setPrefFileSharing] = useState(true);
  const [prefSaved, setPrefSaved] = useState(false);

  // AI Settings State
  const [aiProvider, setAiProvider] = useState('OpenAI Enterprise API');
  const [aiModel, setAiModel] = useState('gpt-4o-mini (Recommended - High Speed)');
  const [aiApiKey, setAiApiKey] = useState('sk-proj-intellimeet-live-89f4129bc4892');
  const [showApiKey, setShowApiKey] = useState(false);
  const [aiTemperature, setAiTemperature] = useState(0.3);
  const [aiAutoSummarize, setAiAutoSummarize] = useState(true);
  const [aiRealtimeTranscription, setAiRealtimeTranscription] = useState(true);
  const [aiActionItems, setAiActionItems] = useState(true);
  const [aiSentimentAnalysis, setAiSentimentAnalysis] = useState(true);
  const [aiAssistantBot, setAiAssistantBot] = useState(true);
  const [aiLanguage, setAiLanguage] = useState('English (US)');
  const [aiFollowUpEmail, setAiFollowUpEmail] = useState(true);
  const [aiTestingStatus, setAiTestingStatus] = useState<'idle' | 'testing' | 'success'>('idle');
  const [aiSaved, setAiSaved] = useState(false);

  // Billing State
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [currentPlan, setCurrentPlan] = useState('Enterprise Tier');
  const [downloadingInvoice, setDownloadingInvoice] = useState<string | null>(null);
  const [showEditPaymentModal, setShowEditPaymentModal] = useState(false);
  const [cardHolder, setCardHolder] = useState('Zidio Tech Corp');
  const [cardLast4, setCardLast4] = useState('4242');
  const [cardExpiry, setCardExpiry] = useState('08/2028');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleGeneralSave = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralSaved(true);
    showToast('General organization settings saved successfully.');
    setTimeout(() => setGeneralSaved(false), 2000);
  };

  const handlePreferencesSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPrefSaved(true);
    showToast('Meeting preferences updated successfully across all rooms.');
    setTimeout(() => setPrefSaved(false), 2000);
  };

  const handleAiSave = (e: React.FormEvent) => {
    e.preventDefault();
    setAiSaved(true);
    showToast('AI engine and model parameters successfully updated.');
    setTimeout(() => setAiSaved(false), 2000);
  };

  const handleTestAiConnection = () => {
    setAiTestingStatus('testing');
    setTimeout(() => {
      setAiTestingStatus('success');
      showToast('OpenAI Connection Verified: 38ms latency. Ready for inference.');
      setTimeout(() => setAiTestingStatus('idle'), 4000);
    }, 1200);
  };

  const handleDownloadInvoice = (id: string, fileName: string) => {
    setDownloadingInvoice(id);
    setTimeout(() => {
      setDownloadingInvoice(null);
      showToast(`Downloaded statement: ${fileName}`);
    }, 900);
  };

  const navItems = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Sliders },
    { id: 'preferences', label: 'Meeting Preferences', icon: Video },
    { id: 'ai', label: 'AI Settings', icon: Sparkles },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'audit', label: 'Audit Logs', icon: FileText },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-purple-600" />
          <span>System Settings & Configuration</span>
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Configure enterprise parameters, meeting policies, AI processing models, and billing subscription
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Navigation Sidebar */}
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-left transition cursor-pointer ${
                  isActive
                    ? 'bg-purple-50 text-purple-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.id === 'ai' && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-purple-100 text-purple-700">
                    Active
                  </span>
                )}
                {item.id === 'billing' && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-emerald-100 text-emerald-700">
                    Enterprise
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-card">
          {/* GENERAL TAB */}
          {activeTab === 'general' && (
            <form onSubmit={handleGeneralSave} className="space-y-5 max-w-2xl">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">General Settings</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Manage organization profile and workspace defaults</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Support Email
                </label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                >
                  <option value="(UTC+5:30) India Standard Time">(UTC+5:30) India Standard Time</option>
                  <option value="(UTC-5:00) Eastern Time (US & Canada)">(UTC-5:00) Eastern Time</option>
                  <option value="(UTC+0:00) UTC / London">(UTC+0:00) UTC / London</option>
                  <option value="(UTC+8:00) Singapore / Tokyo">(UTC+8:00) Singapore</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Default Meeting Duration
                </label>
                <select
                  value={defaultDuration}
                  onChange={(e) => setDefaultDuration(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                >
                  <option value="30 minutes">30 minutes</option>
                  <option value="45 minutes">45 minutes</option>
                  <option value="60 minutes">60 minutes</option>
                  <option value="90 minutes">90 minutes</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end">
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  {generalSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
                  <span>{generalSaved ? 'Changes Saved!' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          )}

          {/* MEETING PREFERENCES TAB */}
          {activeTab === 'preferences' && (
            <form onSubmit={handlePreferencesSave} className="space-y-6 max-w-3xl">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Video className="w-4 h-4 text-purple-600" />
                    <span>Meeting Preferences & Room Policies</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Define default audio, video, security, and recording behaviors for all hosted rooms
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPrefMuteOnEntry(true);
                    setPrefVideoOffOnEntry(false);
                    setPrefWaitingRoom(true);
                    setPrefScreenShareAll(true);
                    setPrefAutoRecord(false);
                    setPrefNoiseCancellation(true);
                    setPrefVirtualBackground(true);
                    setPrefInMeetingChat(true);
                    setPrefFileSharing(true);
                    setPrefDuration('45 minutes');
                    setPrefResolution('1080p Full HD (Recommended)');
                    showToast('Reset all meeting preferences to recommended defaults.');
                  }}
                  className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Defaults</span>
                </button>
              </div>

              {/* Audio & Video Controls Card */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 sm:p-5 space-y-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-purple-600" />
                  <span>Participant Audio & Video Defaults</span>
                </h4>

                <div className="space-y-3.5 divide-y divide-slate-200/50">
                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Mute Participants on Entry</div>
                      <p className="text-[11px] text-slate-500">
                        Automatically mute microphones when attendees join to prevent background interruptions
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrefMuteOnEntry(!prefMuteOnEntry)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        prefMuteOnEntry ? 'bg-purple-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          prefMuteOnEntry ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="pt-3.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Turn Camera Off by Default</div>
                      <p className="text-[11px] text-slate-500">
                        Attendees join with video disabled and must explicitly enable their camera
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrefVideoOffOnEntry(!prefVideoOffOnEntry)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        prefVideoOffOnEntry ? 'bg-purple-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          prefVideoOffOnEntry ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="pt-3.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">AI Background Noise Suppression</div>
                      <p className="text-[11px] text-slate-500">
                        Deep learning audio filtering removes ambient keyboard clatter, echo, and dogs barking
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrefNoiseCancellation(!prefNoiseCancellation)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        prefNoiseCancellation ? 'bg-purple-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          prefNoiseCancellation ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="pt-3.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">AI Virtual Backgrounds & Blur</div>
                      <p className="text-[11px] text-slate-500">
                        Allow users to replace their video backdrop with studio gradients or soft blur
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrefVirtualBackground(!prefVirtualBackground)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        prefVirtualBackground ? 'bg-purple-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          prefVirtualBackground ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Room Security & Permissions */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 sm:p-5 space-y-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-purple-600" />
                  <span>Security & In-Meeting Permissions</span>
                </h4>

                <div className="space-y-3.5 divide-y divide-slate-200/50">
                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Host Waiting Room (Admission Required)</div>
                      <p className="text-[11px] text-slate-500">
                        External guests wait in lobby until approved by a meeting host or co-host
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrefWaitingRoom(!prefWaitingRoom)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        prefWaitingRoom ? 'bg-purple-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          prefWaitingRoom ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="pt-3.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Allow Attendee Screen Sharing</div>
                      <p className="text-[11px] text-slate-500">
                        Permit non-host participants to broadcast windows, tabs, or full monitors
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrefScreenShareAll(!prefScreenShareAll)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        prefScreenShareAll ? 'bg-purple-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          prefScreenShareAll ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="pt-3.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Auto-Start Cloud Recording</div>
                      <p className="text-[11px] text-slate-500">
                        Automatically trigger server-side WebM/MP4 recording as soon as the host arrives
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrefAutoRecord(!prefAutoRecord)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        prefAutoRecord ? 'bg-purple-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          prefAutoRecord ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="pt-3.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">In-Meeting Chat & File Sharing</div>
                      <p className="text-[11px] text-slate-500">
                        Enable real-time messaging, emoji reactions, and file drops during the video call
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrefInMeetingChat(!prefInMeetingChat)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        prefInMeetingChat ? 'bg-purple-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          prefInMeetingChat ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Streaming Quality & Layout Presets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Default Video Resolution
                  </label>
                  <select
                    value={prefResolution}
                    onChange={(e) => setPrefResolution(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                  >
                    <option value="720p HD (Low Bandwidth)">720p HD (Low Bandwidth)</option>
                    <option value="1080p Full HD (Recommended)">1080p Full HD (Recommended)</option>
                    <option value="4K Ultra HD (High Bitrate)">4K Ultra HD (High Bitrate)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Max Room Capacity
                  </label>
                  <select
                    value={prefMaxParticipants}
                    onChange={(e) => setPrefMaxParticipants(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                  >
                    <option value="25 participants">25 participants</option>
                    <option value="50 participants">50 participants</option>
                    <option value="100 participants">100 participants (Default)</option>
                    <option value="250 participants">250 participants (Large All-Hands)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Default Meeting Duration
                  </label>
                  <select
                    value={prefDuration}
                    onChange={(e) => setPrefDuration(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                  >
                    <option value="15 minutes">15 minutes (Quick Standup)</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="45 minutes">45 minutes (Optimal)</option>
                    <option value="60 minutes">60 minutes</option>
                    <option value="90 minutes">90 minutes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Initial Layout View
                  </label>
                  <select
                    value={prefLayout}
                    onChange={(e) => setPrefLayout(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                  >
                    <option value="Smart Dynamic Grid">Smart Dynamic Grid</option>
                    <option value="Active Speaker Spotlight">Active Speaker Spotlight</option>
                    <option value="Gallery View (All Tiles)">Gallery View (All Tiles)</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  {prefSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
                  <span>{prefSaved ? 'Preferences Saved!' : 'Save Meeting Preferences'}</span>
                </button>
              </div>
            </form>
          )}

          {/* AI SETTINGS TAB */}
          {activeTab === 'ai' && (
            <form onSubmit={handleAiSave} className="space-y-6 max-w-3xl">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span>AI Engine & Intelligence Configuration</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Configure LLM models, real-time transcription, automated summaries, and sentiment analysis
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-[10px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>AI Engine Online</span>
                </div>
              </div>

              {/* Engine Selection & API Keys */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 sm:p-5 space-y-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-purple-600" />
                  <span>LLM Provider & Model Architecture</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      AI Provider
                    </label>
                    <select
                      value={aiProvider}
                      onChange={(e) => setAiProvider(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                    >
                      <option value="OpenAI Enterprise API">OpenAI Enterprise API</option>
                      <option value="Anthropic Claude Engine">Anthropic Claude Engine</option>
                      <option value="IntellMeet Local Edge AI">IntellMeet Local Edge AI (Ollama/vLLM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Inference Model
                    </label>
                    <select
                      value={aiModel}
                      onChange={(e) => setAiModel(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                    >
                      <option value="gpt-4o-mini (Recommended - High Speed)">gpt-4o-mini (High Speed & Low Latency)</option>
                      <option value="gpt-4o (Multimodal Advanced)">gpt-4o (Multimodal & Deep Reasoning)</option>
                      <option value="claude-3-5-sonnet">claude-3-5-sonnet (High Context)</option>
                      <option value="llama-3.3-70b-instruct">llama-3.3-70b-instruct (On-Premises)</option>
                    </select>
                  </div>
                </div>

                {/* API Key Box */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    OpenAI API Secret Key
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={aiApiKey}
                        onChange={(e) => setAiApiKey(e.target.value)}
                        className="w-full pl-3.5 pr-10 py-2.5 text-xs font-mono border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={handleTestAiConnection}
                      disabled={aiTestingStatus === 'testing'}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      {aiTestingStatus === 'testing' ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Testing...</span>
                        </>
                      ) : aiTestingStatus === 'success' ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Verified</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                          <span>Test Ping</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Encrypted using AES-256 in memory vault. Loaded automatically from environment if omitted.
                  </p>
                </div>

                {/* Temperature Slider */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Synthesis Temperature ({aiTemperature})
                    </label>
                    <span className="text-[11px] font-medium text-slate-500">
                      {aiTemperature <= 0.3 ? 'Deterministic & Factual' : aiTemperature <= 0.6 ? 'Balanced' : 'Creative'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.1"
                    value={aiTemperature}
                    onChange={(e) => setAiTemperature(parseFloat(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>0.0 (Strict Meeting Minutes)</span>
                    <span>0.5 (Balanced)</span>
                    <span>1.0 (Brainstorming)</span>
                  </div>
                </div>
              </div>

              {/* Automation & Insights Toggles */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 sm:p-5 space-y-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Autonomous Meeting Intelligence</span>
                </h4>

                <div className="space-y-3.5 divide-y divide-slate-200/50">
                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Auto-Generate Executive Summary</div>
                      <p className="text-[11px] text-slate-500">
                        Automatically synthesize meeting notes, key decisions, and topic breakdowns after call
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAiAutoSummarize(!aiAutoSummarize)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        aiAutoSummarize ? 'bg-purple-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          aiAutoSummarize ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="pt-3.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Live Speech-to-Text Diarization</div>
                      <p className="text-[11px] text-slate-500">
                        Real-time multilingual transcription with speaker recognition and timestamp anchors
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAiRealtimeTranscription(!aiRealtimeTranscription)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        aiRealtimeTranscription ? 'bg-purple-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          aiRealtimeTranscription ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="pt-3.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Action Item & Kanban Task Extraction</div>
                      <p className="text-[11px] text-slate-500">
                        Detect verbal commitments and automatically generate tasks on employee Kanban board
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAiActionItems(!aiActionItems)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        aiActionItems ? 'bg-purple-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          aiActionItems ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="pt-3.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Sentiment & Participant Engagement Scoring</div>
                      <p className="text-[11px] text-slate-500">
                        Analyze vocal tone, talk-time ratio, and sentiment positive/neutral/critical distributions
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAiSentimentAnalysis(!aiSentimentAnalysis)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        aiSentimentAnalysis ? 'bg-purple-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          aiSentimentAnalysis ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="pt-3.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">In-Meeting AI Bot Assistant (@IntellBot)</div>
                      <p className="text-[11px] text-slate-500">
                        Respond to participant questions directly in the meeting room chat sidebar
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAiAssistantBot(!aiAssistantBot)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        aiAssistantBot ? 'bg-purple-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          aiAssistantBot ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Language & Dispatch Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Default Transcription Language
                  </label>
                  <select
                    value={aiLanguage}
                    onChange={(e) => setAiLanguage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="English (UK & Global)">English (UK & Global)</option>
                    <option value="Hindi (हिंदी)">Hindi (हिंदी - Hinglish Auto)</option>
                    <option value="Spanish (Español)">Spanish (Español)</option>
                    <option value="French (Français)">French (Français)</option>
                    <option value="German (Deutsch)">German (Deutsch)</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Auto-Dispatch Follow-Up Email</div>
                      <div className="text-[10px] text-slate-500">Send minutes to all invitees</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAiFollowUpEmail(!aiFollowUpEmail)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        aiFollowUpEmail ? 'bg-purple-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          aiFollowUpEmail ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  {aiSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
                  <span>{aiSaved ? 'Configuration Saved!' : 'Save AI Configuration'}</span>
                </button>
              </div>
            </form>
          )}

          {/* BILLING & SUBSCRIPTION TAB */}
          {activeTab === 'billing' && (
            <div className="space-y-6 max-w-4xl">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-purple-600" />
                    <span>Billing & Enterprise Subscription</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Manage your subscription tier, seat allocations, cloud recording storage, and invoice receipts
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition cursor-pointer ${
                      billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('annual')}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition cursor-pointer flex items-center gap-1 ${
                      billingCycle === 'annual' ? 'bg-purple-600 text-white shadow-2xs' : 'text-slate-500'
                    }`}
                  >
                    <span>Annual</span>
                    <span className="text-[9px] bg-purple-200 text-purple-900 px-1 rounded-sm font-bold">Save 20%</span>
                  </button>
                </div>
              </div>

              {/* Current Plan Overview Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-purple-950 text-white shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-purple-500/30 text-purple-300 border border-purple-400/30 rounded-full">
                        Current Active Plan
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Auto-renews Dec 31, 2026</span>
                      </span>
                    </div>

                    <h2 className="text-2xl font-black tracking-tight mt-2">{currentPlan}</h2>
                    <p className="text-xs text-slate-300 mt-1">
                      Full-stack AI transcription, unlimited HD video meetings, 50 seats, and enterprise SLA guarantee.
                    </p>

                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-white">
                        {billingCycle === 'annual' ? '$49' : '$59'}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">/ user / month (Billed {billingCycle})</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => showToast('Plan upgrade options opened. Contacting enterprise sales representative.')}
                      className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-300" />
                      <span>Upgrade Plan Tier</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast('Subscription auto-renew confirmed for Dec 31, 2026.')}
                      className="px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Manage Subscription</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Resource Utilization Meters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">Team Seats</div>
                        <div className="text-[10px] text-slate-500">Assigned members</div>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">7 / 50</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: '14%' }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                    <span>14% utilized</span>
                    <span className="text-blue-600 font-semibold">43 seats available</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                        <HardDrive className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">Cloud Storage</div>
                        <div className="text-[10px] text-slate-500">Recordings & media</div>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">14.8 / 100 GB</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-purple-600 h-2 rounded-full transition-all duration-500" style={{ width: '15%' }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                    <span>15% consumed</span>
                    <span className="text-purple-600 font-semibold">85.2 GB free</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">AI Transcription</div>
                        <div className="text-[10px] text-slate-500">Monthly quota</div>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">1,840 / 10,000m</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-500 h-2 rounded-full transition-all duration-500" style={{ width: '18%' }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                    <span>18% used</span>
                    <span className="text-amber-600 font-semibold">8,160 mins left</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Card */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-8 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    MC
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                      <span>Mastercard ending in {cardLast4}</span>
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-100 text-emerald-700 rounded-md">
                        Primary
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Expires {cardExpiry} • Registered to {cardHolder}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowEditPaymentModal(true)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer self-start sm:self-auto"
                >
                  Update Payment Method
                </button>
              </div>

              {/* Invoices & History Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-purple-600" />
                    <span>Invoices & Billing History</span>
                  </h4>
                  <span className="text-[11px] text-slate-500">Tax inclusive (GST/VAT compliant)</span>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-4">Invoice ID</th>
                        <th className="py-2.5 px-4">Billing Period</th>
                        <th className="py-2.5 px-4">Amount</th>
                        <th className="py-2.5 px-4">Status</th>
                        <th className="py-2.5 px-4 text-right">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        {
                          id: 'INV-2026-009',
                          period: 'Sep 01, 2026 - Sep 30, 2026',
                          amount: '$2,450.00',
                          status: 'Paid',
                          date: 'Sep 01, 2026',
                        },
                        {
                          id: 'INV-2026-008',
                          period: 'Aug 01, 2026 - Aug 31, 2026',
                          amount: '$2,450.00',
                          status: 'Paid',
                          date: 'Aug 01, 2026',
                        },
                        {
                          id: 'INV-2026-007',
                          period: 'Jul 01, 2026 - Jul 31, 2026',
                          amount: '$2,450.00',
                          status: 'Paid',
                          date: 'Jul 01, 2026',
                        },
                      ].map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50/60 transition">
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">{inv.id}</td>
                          <td className="py-3 px-4 text-slate-600">{inv.period}</td>
                          <td className="py-3 px-4 font-bold text-slate-900">{inv.amount}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-700 rounded-md">
                              {inv.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDownloadInvoice(inv.id, `${inv.id}.pdf`)}
                              disabled={downloadingInvoice === inv.id}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-600 hover:text-purple-800 transition cursor-pointer"
                            >
                              {downloadingInvoice === inv.id ? (
                                <>
                                  <RefreshCw className="w-3 h-3 animate-spin" />
                                  <span>Downloading...</span>
                                </>
                              ) : (
                                <>
                                  <Download className="w-3 h-3" />
                                  <span>PDF</span>
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Edit Payment Modal */}
              {showEditPaymentModal && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
                  <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-purple-600" />
                        <span>Update Payment Card</span>
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowEditPaymentModal(false)}
                        className="text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                          Cardholder Full Name
                        </label>
                        <input
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          defaultValue="•••• •••• •••• 4242"
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                            CVV / CVC
                          </label>
                          <input
                            type="password"
                            defaultValue="•••"
                            maxLength={4}
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setShowEditPaymentModal(false)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowEditPaymentModal(false);
                          showToast('Payment method updated successfully.');
                        }}
                        className="px-4 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-xs cursor-pointer"
                      >
                        Save Card Details
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="space-y-4 max-w-xl">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Security & Compliance
              </h3>
              <div className="space-y-3 text-xs text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 rounded" />
                  <span>Enforce strong password policy (min 6 characters, mixed case, symbols)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 rounded" />
                  <span>Require session expiration after 7 days</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 rounded" />
                  <span>Log all administrative API queries in MongoDB AuditLog collection</span>
                </label>
              </div>
            </div>
          )}

          {/* INTEGRATIONS TAB */}
          {activeTab === 'integrations' && (
            <div className="space-y-4 max-w-xl">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                API & Provider Integrations
              </h3>
              <div className="space-y-3">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">OpenAI API</h4>
                    <p className="text-[11px] text-slate-500">Summary synthesis & conversational AI</p>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-700 rounded-md">
                    Configured via .env
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Cloud Storage (Cloudinary/S3)</h4>
                    <p className="text-[11px] text-slate-500">Recording video archive and profile images</p>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-700 rounded-md">
                    Ready
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* AUDIT LOGS TAB */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Audit Logs
              </h3>
              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-800">USER_LOGIN</span>
                    <p className="text-[11px] text-slate-500">User logged in: shreya@zidio.in</p>
                  </div>
                  <span className="text-[10px] text-slate-400">Just now</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-800">MEETING_CREATED</span>
                    <p className="text-[11px] text-slate-500">Created meeting: Product Roadmap Discussion</p>
                  </div>
                  <span className="text-[10px] text-slate-400">10 mins ago</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-800">SETTINGS_UPDATED</span>
                    <p className="text-[11px] text-slate-500">Modified meeting preferences & AI model</p>
                  </div>
                  <span className="text-[10px] text-slate-400">15 mins ago</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
