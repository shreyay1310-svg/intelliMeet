export type UserRole = 'employee' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  organization: string;
  team: string;
  jobTitle: string;
  status?: 'active' | 'inactive';
  preferences?: {
    defaultMeetingDuration: number;
    cameraDefault: boolean;
    microphoneDefault: boolean;
    meetingReminders: boolean;
    taskNotifications: boolean;
    mentions: boolean;
    aiSummaryNotifications: boolean;
  };
  createdAt?: string;
}

export interface Meeting {
  _id: string;
  title: string;
  description: string;
  host: User;
  participants: User[];
  startTime: string;
  endTime: string;
  duration: number;
  meetingType: 'internal' | 'client' | 'team-sync' | 'review';
  platform: 'IntellMeet' | 'Google Meet' | 'Teams' | 'Zoom';
  meetingRoomId: string;
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  recordingUrl?: string;
  transcriptId?: string;
  summaryId?: string;
  createdAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  meetingId?: string | { _id: string; title: string };
  assignedTo: User;
  createdBy: User;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  kanbanColumn: 'To Do' | 'In Progress' | 'Review' | 'Completed';
  tags: string[];
  createdAt: string;
}

export interface ActionItem {
  _id?: string;
  task: string;
  assigneeName?: string;
  assignee?: User | string;
  dueDate?: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface MeetingSummary {
  _id: string;
  meetingId: string | Meeting;
  overview: string;
  keyTakeaways: string[];
  actionItems: ActionItem[];
  decisions: string[];
  highlights: string[];
  topics: string[];
  createdAt: string;
}

export interface TranscriptEntry {
  speaker: string;
  userId?: string;
  timestamp: string;
  text: string;
}

export interface Transcript {
  _id: string;
  meetingId: string;
  entries: TranscriptEntry[];
}

export interface ChatMessage {
  _id?: string;
  meetingId: string;
  sender?: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  isSystemMessage?: boolean;
  timestamp: string;
}

export interface Recording {
  _id: string;
  meetingId: Meeting | string;
  title: string;
  durationSeconds: number;
  url: string;
  thumbnailUrl: string;
  sizeBytes: number;
  recordedBy: User;
  createdAt: string;
}

export interface NotificationItem {
  _id: string;
  recipient: string;
  title: string;
  message: string;
  type: 'meeting_invite' | 'meeting_reminder' | 'task_assigned' | 'task_due' | 'mention' | 'summary_ready';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalMeetings: number;
  actionItems: number;
  teamMembers: number;
  productivity: string;
}
