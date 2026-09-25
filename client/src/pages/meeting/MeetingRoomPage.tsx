import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Share2,
  Disc,
  MessageSquare,
  Users,
  Sparkles,
  PhoneOff,
  MoreVertical,
  Send,
  CheckCircle,
  Copy,
  ChevronRight,
  Maximize2,
  Volume2,
} from 'lucide-react';
import { ChatMessage, Meeting } from '../../types';

export const MeetingRoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Meeting details
  const [meeting, setMeeting] = useState<Meeting | null>(null);

  // Media streams & controls
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const screenStreamRef = useRef<MediaStream | null>(null);

  // Recording
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  // Timer
  const [elapsedSeconds, setElapsedSeconds] = useState(1458); // default demo start ~ 24:18

  // Right sidebar
  const [sidebarTab, setSidebarTab] = useState<'chat' | 'participants' | 'notes'>('chat');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Chat
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');

  // Participants in room
  const [participants, setParticipants] = useState<any[]>([]);

  // Live Transcript / AI Notes
  const [transcriptEntries, setTranscriptEntries] = useState<
    { speaker: string; text: string; time: string }[]
  >([
    {
      speaker: 'Rohit Sharma',
      text: 'Looks great! The telemetry pipeline is connected.',
      time: '10:35 AM',
    },
    {
      speaker: 'Ananya Singh',
      text: 'Should we add analytics in v2 or keep it in the initial Q3 release?',
      time: '10:36 AM',
    },
    {
      speaker: 'Shreya Yadav',
      text: "Yes, let's discuss this. Core metrics should be in the dashboard.",
      time: '10:37 AM',
    },
    {
      speaker: 'Karan Mehta',
      text: "I'll share the updated documentation and growth benchmarks.",
      time: '10:38 AM',
    },
  ]);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(new Map());

  // Format seconds to HH:MM:SS or MM:SS
  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 1. Fetch meeting info
  useEffect(() => {
    if (roomId) {
      api.getMeetingByRoomId(roomId).then((res) => {
        if (res.success && res.meeting) {
          setMeeting(res.meeting);
        }
      });
    }
  }, [roomId]);

  // 2. Setup Local Media Stream
  useEffect(() => {
    let mounted = true;

    async function initMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (mounted) {
          setLocalStream(stream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        }
      } catch (err) {
        console.warn('Could not acquire local camera/mic stream, using audio/placeholder fallback:', err);
      }
    }

    initMedia();

    return () => {
      mounted = false;
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // 3. Connect to Socket.io for Real-time Signaling & Chat
  useEffect(() => {
    const socket = io('/', {
      transports: ['websocket', 'polling'],
    });
    socketRef.current = socket;

    socket.emit('meeting:join', {
      roomId,
      user: {
        id: user?.id,
        name: user?.name,
        avatar: user?.avatar,
      },
      isHost: meeting?.host?.id === user?.id,
    });

    // Populate initial demo participants matching reference design
    setParticipants([
      {
        id: user?.id || 'you',
        name: `${user?.name || 'You'} (You)`,
        avatar: user?.avatar,
        isHost: true,
        audio: audioEnabled,
        video: videoEnabled,
      },
      {
        id: 'rohit-1',
        name: 'Rohit Sharma',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        isHost: false,
        audio: true,
        video: true,
      },
      {
        id: 'ananya-2',
        name: 'Ananya Singh',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        isHost: false,
        audio: true,
        video: true,
      },
      {
        id: 'karan-3',
        name: 'Karan Mehta',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        isHost: false,
        audio: false,
        video: false,
      },
    ]);

    // Initial messages matching reference UI
    setMessages([
      {
        meetingId: roomId || '',
        senderName: 'Rohit',
        senderAvatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        text: 'Looks great!',
        timestamp: '10:35 AM',
      },
      {
        meetingId: roomId || '',
        senderName: 'Ananya',
        senderAvatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: 'Should we add analytics in v2?',
        timestamp: '10:36 AM',
      },
      {
        meetingId: roomId || '',
        senderName: 'You',
        senderAvatar: user?.avatar || '',
        text: "Yes, let's discuss this.",
        timestamp: '10:37 AM',
      },
      {
        meetingId: roomId || '',
        senderName: 'Karan',
        senderAvatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        text: "I'll share the updated doc.",
        timestamp: '10:38 AM',
      },
    ]);

    socket.on('chat:message', (msg: any) => {
      setMessages((prev) => [
        ...prev,
        {
          ...msg,
          timestamp: new Date(msg.timestamp || Date.now()).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    });

    socket.on('meeting:user-joined', (newUser: any) => {
      setParticipants((prev) => {
        if (prev.find((p) => p.id === newUser.userId)) return prev;
        return [
          ...prev,
          {
            id: newUser.userId,
            name: newUser.name,
            avatar: newUser.avatar,
            audio: newUser.audioEnabled,
            video: newUser.videoEnabled,
          },
        ];
      });
    });

    socket.on('meeting:user-left', ({ userId }: any) => {
      setParticipants((prev) => prev.filter((p) => p.id !== userId));
    });

    return () => {
      socket.emit('meeting:leave', { roomId });
      socket.disconnect();
    };
  }, [roomId, user]);

  // Meeting duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Media toggle handlers
  const toggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !audioEnabled;
      });
    }
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    socketRef.current?.emit('participant:mute', {
      roomId,
      audioEnabled: nextState,
    });
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !videoEnabled;
      });
    }
    const nextState = !videoEnabled;
    setVideoEnabled(nextState);
    socketRef.current?.emit('participant:camera', {
      roomId,
      videoEnabled: nextState,
    });
  };

  // Screen Sharing
  const handleToggleScreenShare = async () => {
    if (isScreenSharing) {
      screenStreamRef.current?.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
      setIsScreenSharing(false);
      socketRef.current?.emit('screen:stop', { roomId });
    } else {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        screenStreamRef.current = stream;
        setIsScreenSharing(true);
        socketRef.current?.emit('screen:start', { roomId });

        stream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          socketRef.current?.emit('screen:stop', { roomId });
        };
      } catch (err) {
        console.warn('Screen share canceled or failed:', err);
      }
    }
  };

  // Local Recording via MediaRecorder API
  const handleToggleRecording = () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const recordStream = localStream || new MediaStream();
        const mediaRecorder = new MediaRecorder(recordStream);
        mediaRecorderRef.current = mediaRecorder;
        recordedChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          if (meeting?._id) {
            await api.saveRecording({
              meetingId: meeting._id,
              title: `${meeting.title} - Recording`,
              durationSeconds: recordingSeconds,
              url,
              thumbnailUrl:
                'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=80',
              sizeBytes: blob.size,
            });
          }
        };

        mediaRecorder.start(1000);
        setIsRecording(true);
      } catch (e) {
        console.error('Failed to start recording', e);
        setIsRecording(true); // Fallback simulation mode
      }
    }
  };

  // Send Chat message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      meetingId: roomId || '',
      senderId: user?.id,
      senderName: user?.name || 'You',
      senderAvatar: user?.avatar || '',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    socketRef.current?.emit('chat:send', {
      roomId,
      message: newMsg,
    });

    setMessages((prev) => [...prev, newMsg]);
    setChatInput('');
  };

  const handleLeaveMeeting = () => {
    if (localStream) {
      localStream.getTracks().forEach((t) => t.stop());
    }
    if (meeting?._id) {
      navigate(`/meetings/summary/${meeting._id}`);
    } else {
      navigate('/meetings');
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-900 text-white flex flex-col overflow-hidden select-none">
      {/* Top Header matching reference image 3 */}
      <header className="h-14 px-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span>{meeting?.title || 'Product Roadmap Discussion'}</span>
            </h1>
          </div>
        </div>

        {/* Center: Live Timer and Recording indicator */}
        <div className="flex items-center gap-3 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/60">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="text-xs font-mono font-semibold tracking-wider text-slate-200">
            {formatTimer(elapsedSeconds)}
          </span>
          {isRecording && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-800/40">
              REC
            </span>
          )}
        </div>

        {/* Right Header: Leave button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleLeaveMeeting}
            className="py-1.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs shadow-rose-600/20"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span>Leave</span>
          </button>
        </div>
      </header>

      {/* Main Grid & Drawer Container */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left/Center: Video Grid matching reference image 3 */}
        <div className="flex-1 p-4 flex flex-col justify-between overflow-hidden">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full max-h-[calc(100vh-140px)]">
            {/* Tile 1: You */}
            <div className="relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 flex items-center justify-center group shadow-md">
              {videoEnabled ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform scale-x-[-1]"
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={
                      user?.avatar ||
                      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || 'You')}`
                    }
                    alt="You"
                    className="w-20 h-20 rounded-full object-cover border-2 border-slate-600 shadow-md"
                  />
                  <span className="text-xs font-medium text-slate-400">Camera turned off</span>
                </div>
              )}
              {/* Name Tag & Status */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-200 border border-slate-700/50">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>You</span>
                {!audioEnabled && <MicOff className="w-3 h-3 text-rose-400" />}
              </div>
            </div>

            {/* Tile 2: Rohit Sharma */}
            <div className="relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 flex items-center justify-center shadow-md">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80"
                alt="Rohit Sharma"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-200 border border-slate-700/50">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Rohit Sharma</span>
              </div>
            </div>

            {/* Tile 3: Ananya Singh */}
            <div className="relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 flex items-center justify-center shadow-md">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
                alt="Ananya Singh"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-200 border border-slate-700/50">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Ananya Singh</span>
              </div>
            </div>

            {/* Tile 4: Screen Share or Karan Mehta */}
            <div className="relative bg-slate-850 rounded-2xl overflow-hidden border border-slate-700 flex items-center justify-center p-4 bg-gradient-to-br from-slate-800 to-slate-900 shadow-md">
              {isScreenSharing ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-blue-500/50 rounded-xl bg-blue-950/20">
                  <Share2 className="w-12 h-12 text-blue-400 mb-2 animate-bounce" />
                  <p className="text-sm font-bold text-blue-300">You are sharing your screen</p>
                  <p className="text-xs text-slate-400 mt-1">Participants can see your active window</p>
                </div>
              ) : (
                <div className="w-full h-full bg-slate-800 rounded-xl flex flex-col items-center justify-center p-4 relative overflow-hidden">
                  <div className="w-full max-w-xs bg-slate-900/90 rounded-xl p-3 border border-slate-700/80 shadow-lg">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <span>Product Roadmap Overview</span>
                      <span className="text-emerald-400">Q3 Targets</span>
                    </div>
                    <div className="py-3 space-y-2">
                      <div className="h-2 bg-blue-600 rounded-full w-3/4" />
                      <div className="h-2 bg-purple-600 rounded-full w-1/2" />
                      <div className="h-2 bg-emerald-600 rounded-full w-5/6" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-200 border border-slate-700/50">
                    <span>Presentation Deck (Shared)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Drawer: Tabs for Chat, Participants, AI Notes matching reference image */}
        {isSidebarOpen && (
          <aside className="w-80 sm:w-88 bg-slate-850 border-l border-slate-800 flex flex-col z-20 shrink-0">
            {/* Tabs Header */}
            <div className="h-12 border-b border-slate-800 flex items-center px-4 bg-slate-900/60 justify-between">
              <div className="flex space-x-4">
                <button
                  onClick={() => setSidebarTab('chat')}
                  className={`text-xs font-bold transition pb-1 border-b-2 ${
                    sidebarTab === 'chat'
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => setSidebarTab('participants')}
                  className={`text-xs font-bold transition pb-1 border-b-2 ${
                    sidebarTab === 'participants'
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Participants ({participants.length})
                </button>
                <button
                  onClick={() => setSidebarTab('notes')}
                  className={`text-xs font-bold transition pb-1 border-b-2 flex items-center gap-1 ${
                    sidebarTab === 'notes'
                      ? 'border-purple-500 text-purple-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>AI Notes</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Chat Messages */}
            {sidebarTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                <div className="flex-1 p-4 space-y-3.5 overflow-y-auto">
                  {messages.map((m, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">
                          {m.senderName}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {m.timestamp || 'Just now'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/60 p-2.5 rounded-xl border border-slate-750">
                        {m.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-3 border-t border-slate-800 bg-slate-900/80 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 bg-slate-800 rounded-xl border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Tab 2: Participants */}
            {sidebarTab === 'participants' && (
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                {participants.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/60 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={
                          p.avatar ||
                          `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(p.name)}`
                        }
                        alt={p.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-200">{p.name}</span>
                          {p.isHost && (
                            <span className="px-1.5 py-0.2 bg-blue-900/80 text-blue-300 text-[9px] rounded font-semibold">
                              Host
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Online
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-slate-400">
                      {p.audio ? (
                        <Mic className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <MicOff className="w-3.5 h-3.5 text-rose-400" />
                      )}
                      {p.video ? (
                        <Video className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <VideoOff className="w-3.5 h-3.5 text-slate-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: AI Notes & Live Transcript */}
            {sidebarTab === 'notes' && (
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                <div className="p-3 bg-purple-950/40 border border-purple-800/40 rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-300 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Real-Time AI Summary</span>
                  </div>
                  <p className="text-[11px] text-purple-200/80 leading-relaxed">
                    Analyzing conversation transcript... Consensus reached on Q3 feature deliverables.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Live Transcript Stream
                  </span>
                  <div className="space-y-2">
                    {transcriptEntries.map((t, idx) => (
                      <div key={idx} className="p-2 bg-slate-800/40 rounded-lg text-xs">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                          <span className="font-bold text-slate-300">{t.speaker}</span>
                          <span>{t.time}</span>
                        </div>
                        <p className="text-slate-300">{t.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* Bottom Meeting Controls matching reference image 3 */}
      <footer className="h-18 px-6 bg-slate-900 border-t border-slate-800 flex items-center justify-center shrink-0 relative z-20">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Microphone Toggle */}
          <button
            onClick={toggleAudio}
            className={`p-3 rounded-2xl flex items-center justify-center transition cursor-pointer ${
              audioEnabled
                ? 'bg-slate-800 hover:bg-slate-700 text-white'
                : 'bg-rose-600 text-white hover:bg-rose-700'
            }`}
            title={audioEnabled ? 'Mute Microphone' : 'Unmute Microphone'}
          >
            {audioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          {/* Video Camera Toggle */}
          <button
            onClick={toggleVideo}
            className={`p-3 rounded-2xl flex items-center justify-center transition cursor-pointer ${
              videoEnabled
                ? 'bg-slate-800 hover:bg-slate-700 text-white'
                : 'bg-rose-600 text-white hover:bg-rose-700'
            }`}
            title={videoEnabled ? 'Stop Video' : 'Start Video'}
          >
            {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          {/* Share Screen */}
          <button
            onClick={handleToggleScreenShare}
            className={`p-3 rounded-2xl flex items-center justify-center transition cursor-pointer ${
              isScreenSharing
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
            title="Share Screen"
          >
            <Share2 className="w-5 h-5" />
          </button>

          {/* Record Meeting */}
          <button
            onClick={handleToggleRecording}
            className={`p-3 rounded-2xl flex items-center justify-center transition cursor-pointer ${
              isRecording
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
            title={isRecording ? 'Stop Recording' : 'Record Meeting'}
          >
            <Disc className="w-5 h-5" />
          </button>

          {/* Toggle Chat */}
          <button
            onClick={() => {
              setIsSidebarOpen(true);
              setSidebarTab('chat');
            }}
            className={`p-3 rounded-2xl flex items-center justify-center transition cursor-pointer ${
              isSidebarOpen && sidebarTab === 'chat'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
            title="Chat Panel"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          {/* Toggle Participants */}
          <button
            onClick={() => {
              setIsSidebarOpen(true);
              setSidebarTab('participants');
            }}
            className={`p-3 rounded-2xl flex items-center justify-center transition cursor-pointer ${
              isSidebarOpen && sidebarTab === 'participants'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
            title="Participants"
          >
            <Users className="w-5 h-5" />
          </button>

          {/* Toggle AI Notes */}
          <button
            onClick={() => {
              setIsSidebarOpen(true);
              setSidebarTab('notes');
            }}
            className={`p-3 rounded-2xl flex items-center justify-center transition cursor-pointer ${
              isSidebarOpen && sidebarTab === 'notes'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
            title="AI Notes & Live Transcript"
          >
            <Sparkles className="w-5 h-5" />
          </button>

          {/* Leave Button */}
          <button
            onClick={handleLeaveMeeting}
            className="p-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl transition cursor-pointer shadow-md shadow-rose-600/30 ml-2"
            title="Leave Call"
          >
            <PhoneOff className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};
