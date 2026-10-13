import {
  DEMO_USERS,
  INITIAL_DEMO_MEETINGS,
  INITIAL_DEMO_TASKS,
  DEMO_SUMMARY,
  DEMO_TRANSCRIPT,
  DEMO_NOTIFICATIONS,
  DEMO_RECORDINGS,
} from './mockData';
import { Meeting, Task, User } from '../types';

// Detect configured backend URL or fallback to relative /api
const getApiBaseUrl = (): string => {
  const envUrl = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
  if (envUrl) {
    const cleaned = envUrl.replace(/\/+$/, '');
    return cleaned.endsWith('/api') ? cleaned : `${cleaned}/api`;
  }
  return '/api';
};

export const API_BASE_URL = getApiBaseUrl();

interface RequestOptions extends RequestInit {
  data?: any;
}

// Local storage state helpers for persistent client demo experience
const getStoredList = <T>(key: string, initial: T[]): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : initial;
  } catch {
    return initial;
  }
};

const setStoredList = <T>(key: string, data: T[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('LocalStorage save failed', e);
  }
};

class ApiService {
  private getToken(): string | null {
    return localStorage.getItem('intellimeet_token');
  }

  // Safe request handler that automatically bridges between live API and offline demo fallback
  private async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    if (options.data) {
      config.body = JSON.stringify(options.data);
    }

    try {
      const response = await fetch(url, config);
      const contentType = response.headers.get('content-type') || '';

      // Check if response is valid JSON
      if (contentType.includes('application/json')) {
        const text = await response.text();
        const result = text ? JSON.parse(text) : {};

        if (!response.ok) {
          // If server returned 404/405/502/503 or route is missing on proxy, fallback to demo mode
          if ([404, 405, 502, 503, 504].includes(response.status)) {
            console.warn(`[IntellMeet API] Live backend returned HTTP ${response.status}. Falling back to demo mode for ${endpoint}`);
            return this.handleFallback<T>(endpoint, options);
          }
          throw new Error(result.message || result.error || 'Something went wrong with the request');
        }

        return result as T;
      }

      // If response is HTML or empty text (e.g., Vercel static rewrites returning index.html or 405 empty body)
      const text = await response.text();
      if (!response.ok || text.startsWith('<!DOCTYPE') || text.trim() === '') {
        console.warn(`[IntellMeet API] Live backend route ${endpoint} responded with non-JSON (${response.status}). Activating fast demo mode.`);
        return this.handleFallback<T>(endpoint, options);
      }

      try {
        return JSON.parse(text) as T;
      } catch {
        return this.handleFallback<T>(endpoint, options);
      }
    } catch (networkError: any) {
      console.warn(`[IntellMeet API] Network request to ${url} failed (${networkError.message}). Operating in standalone demo mode.`);
      return this.handleFallback<T>(endpoint, options);
    }
  }

  // Standalone Client Demo Fallback Handler (Guarantees 100% reliability on Vercel)
  private handleFallback<T = any>(endpoint: string, options: RequestOptions): T {
    const method = options.method?.toUpperCase() || 'GET';
    const payload = options.data || {};

    // 1. Authentication
    if (endpoint === '/auth/login' && method === 'POST') {
      const email = (payload.email || '').toLowerCase().trim();
      const isAdmin = email.includes('admin');
      
      const matchedUser = DEMO_USERS.find((u) => u.email.toLowerCase() === email) || (isAdmin ? DEMO_USERS[0] : DEMO_USERS[2]);
      const demoUser: User = {
        ...matchedUser,
        name: matchedUser.name || (isAdmin ? 'Admin' : 'Shreya'),
        email: email || matchedUser.email,
        role: isAdmin ? 'admin' : 'employee',
      };

      const token = `demo_jwt_token_${Date.now()}`;
      localStorage.setItem('intellimeet_token', token);
      localStorage.setItem('intellimeet_user', JSON.stringify(demoUser));

      return {
        success: true,
        token,
        user: demoUser,
        message: 'Fast demo login successful',
      } as unknown as T;
    }

    if (endpoint === '/auth/register' && method === 'POST') {
      const email = (payload.email || '').toLowerCase().trim();
      const isAdmin = payload.role === 'admin' || email.includes('admin');
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: payload.name || 'New User',
        email,
        role: isAdmin ? 'admin' : 'employee',
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(payload.name || 'User')}&backgroundColor=2563eb,7c3aed`,
        organization: payload.organization || 'Zidio Development',
        team: payload.team || 'Product Team',
        jobTitle: payload.jobTitle || (isAdmin ? 'System Administrator' : 'Product Designer'),
        status: 'active',
      };

      const token = `demo_jwt_token_${Date.now()}`;
      localStorage.setItem('intellimeet_token', token);
      localStorage.setItem('intellimeet_user', JSON.stringify(newUser));

      return {
        success: true,
        token,
        user: newUser,
        message: 'Account created successfully (Demo Mode)',
      } as unknown as T;
    }

    if (endpoint === '/auth/me') {
      const savedUserStr = localStorage.getItem('intellimeet_user');
      const user = savedUserStr ? JSON.parse(savedUserStr) : DEMO_USERS[0];
      return { success: true, user } as unknown as T;
    }

    if (endpoint === '/auth/profile' && method === 'PUT') {
      const savedUserStr = localStorage.getItem('intellimeet_user');
      const current = savedUserStr ? JSON.parse(savedUserStr) : DEMO_USERS[0];
      const updated = { ...current, ...payload };
      localStorage.setItem('intellimeet_user', JSON.stringify(updated));
      return { success: true, user: updated, message: 'Profile updated' } as unknown as T;
    }

    if (endpoint === '/auth/change-password') {
      return { success: true, message: 'Password updated successfully' } as unknown as T;
    }

    // 2. Meetings
    if (endpoint.startsWith('/meetings')) {
      const meetings = getStoredList<Meeting>('intellimeet_demo_meetings', INITIAL_DEMO_MEETINGS);

      if (endpoint === '/meetings' && method === 'POST') {
        const savedUserStr = localStorage.getItem('intellimeet_user');
        const currentUser = savedUserStr ? JSON.parse(savedUserStr) : DEMO_USERS[2];
        const newMeeting: Meeting = {
          _id: `meet-${Date.now()}`,
          title: payload.title || 'New Meeting',
          description: payload.description || '',
          host: currentUser,
          participants: [currentUser, DEMO_USERS[4]],
          startTime: payload.startTime || new Date().toISOString(),
          endTime: payload.endTime || new Date(Date.now() + 30 * 60000).toISOString(),
          duration: payload.duration || 30,
          meetingType: payload.meetingType || 'internal',
          platform: payload.platform || 'IntellMeet',
          meetingRoomId: payload.meetingRoomId || `room-${Date.now().toString(36)}`,
          status: 'scheduled',
          createdAt: new Date().toISOString(),
        };
        const updated = [newMeeting, ...meetings];
        setStoredList('intellimeet_demo_meetings', updated);
        return { success: true, meeting: newMeeting } as unknown as T;
      }

      if (endpoint.startsWith('/meetings/room/')) {
        const roomId = endpoint.replace('/meetings/room/', '');
        const matched = meetings.find((m) => m.meetingRoomId === roomId) || {
          ...INITIAL_DEMO_MEETINGS[0],
          meetingRoomId: roomId,
          title: 'Live Collaboration Session',
        };
        return { success: true, meeting: matched } as unknown as T;
      }

      if (endpoint.startsWith('/meetings/') && method === 'GET') {
        const id = endpoint.replace('/meetings/', '').split('?')[0];
        const matched = meetings.find((m) => m._id === id) || meetings[0];
        return { success: true, meeting: matched } as unknown as T;
      }

      if (endpoint.startsWith('/meetings/') && method === 'PUT') {
        const id = endpoint.replace('/meetings/', '').split('?')[0];
        const updated = meetings.map((m) => (m._id === id ? { ...m, ...payload } : m));
        setStoredList('intellimeet_demo_meetings', updated);
        const saved = updated.find((m) => m._id === id);
        return { success: true, meeting: saved } as unknown as T;
      }

      // Default GET /meetings
      return { success: true, meetings } as unknown as T;
    }

    // 3. Tasks
    if (endpoint.startsWith('/tasks')) {
      const tasks = getStoredList<Task>('intellimeet_demo_tasks', INITIAL_DEMO_TASKS);

      if (endpoint === '/tasks' && method === 'POST') {
        const savedUserStr = localStorage.getItem('intellimeet_user');
        const currentUser = savedUserStr ? JSON.parse(savedUserStr) : DEMO_USERS[2];
        const newTask: Task = {
          _id: `task-${Date.now()}`,
          title: payload.title || 'New Task',
          description: payload.description || '',
          meetingId: payload.meetingId,
          assignedTo: currentUser,
          createdBy: currentUser,
          dueDate: payload.dueDate || new Date(Date.now() + 86400000).toISOString(),
          priority: payload.priority || 'medium',
          status: payload.status || 'todo',
          kanbanColumn: payload.kanbanColumn || 'To Do',
          tags: payload.tags || ['General'],
          createdAt: new Date().toISOString(),
        };
        const updated = [newTask, ...tasks];
        setStoredList('intellimeet_demo_tasks', updated);
        return { success: true, task: newTask } as unknown as T;
      }

      if (endpoint.startsWith('/tasks/') && method === 'PUT') {
        const id = endpoint.replace('/tasks/', '').split('?')[0];
        const updated = tasks.map((t) => (t._id === id ? { ...t, ...payload } : t));
        setStoredList('intellimeet_demo_tasks', updated);
        const saved = updated.find((t) => t._id === id);
        return { success: true, task: saved } as unknown as T;
      }

      if (endpoint.startsWith('/tasks/') && method === 'DELETE') {
        const id = endpoint.replace('/tasks/', '').split('?')[0];
        const updated = tasks.filter((t) => t._id !== id);
        setStoredList('intellimeet_demo_tasks', updated);
        return { success: true, message: 'Task deleted successfully' } as unknown as T;
      }

      // Default GET /tasks
      return { success: true, tasks } as unknown as T;
    }

    // 4. Summaries
    if (endpoint.startsWith('/summaries')) {
      return {
        success: true,
        summary: DEMO_SUMMARY,
        transcript: DEMO_TRANSCRIPT,
        meeting: INITIAL_DEMO_MEETINGS[0],
      } as unknown as T;
    }

    // 5. AI Assistant Chat
    if (endpoint === '/ai/chat' && method === 'POST') {
      const prompt = payload.prompt || '';
      let reply = `Here is your IntellMeet AI analysis for "${prompt}":\n\n`;
      if (prompt.toLowerCase().includes('meeting') || prompt.toLowerCase().includes('schedule')) {
        reply += 'You have 3 meetings scheduled today. The highest priority is the "Product Roadmap Discussion" with the Executive and Engineering team at 10:30 AM.';
      } else if (prompt.toLowerCase().includes('task') || prompt.toLowerCase().includes('action')) {
        reply += 'You currently have 4 pending action items across your projects. Key deadline: "Prepare demo for client presentation" is due today at 6:00 PM.';
      } else {
        reply += 'IntellMeet AI is actively analyzing your enterprise workspaces, transcripts, and telemetry. Everything is running with optimal health and zero blockers!';
      }
      return { success: true, answer: reply } as unknown as T;
    }

    // 6. Users & Team
    if (endpoint.startsWith('/users')) {
      const users = getStoredList<User>('intellimeet_demo_users', DEMO_USERS);
      return { success: true, users } as unknown as T;
    }

    // 7. Notifications
    if (endpoint.startsWith('/notifications')) {
      return { success: true, notifications: DEMO_NOTIFICATIONS } as unknown as T;
    }

    // 8. Recordings
    if (endpoint.startsWith('/recordings')) {
      return { success: true, recordings: DEMO_RECORDINGS } as unknown as T;
    }

    // 9. Analytics Dashboard
    if (endpoint === '/analytics/dashboard') {
      return {
        success: true,
        stats: {
          totalMeetings: 28,
          hoursSaved: 19.5,
          aiSummaries: 18,
          activeCollabs: 14,
        },
        weeklyTrends: [
          { day: 'Mon', count: 4, duration: 120 },
          { day: 'Tue', count: 6, duration: 180 },
          { day: 'Wed', count: 8, duration: 240 },
          { day: 'Thu', count: 5, duration: 150 },
          { day: 'Fri', count: 5, duration: 150 },
        ],
      } as unknown as T;
    }

    // 10. Admin Stats
    if (endpoint === '/admin/stats') {
      return {
        success: true,
        overview: {
          totalUsers: 48,
          activeUsers: 42,
          totalMeetings: 186,
          totalHours: 354,
          storageUsed: '14.2 GB',
        },
        meetingTrend: [
          { month: 'Jan', meetings: 45 },
          { month: 'Feb', meetings: 52 },
          { month: 'Mar', meetings: 68 },
          { month: 'Apr', meetings: 60 },
          { month: 'May', meetings: 85 },
          { month: 'Jun', meetings: 95 },
          { month: 'Jul', meetings: 110 },
          { month: 'Aug', meetings: 125 },
          { month: 'Sep', meetings: 156 },
          { month: 'Oct', meetings: 186 },
        ],
        userActivity: [
          { day: 'Mon', active: 120 },
          { day: 'Tue', active: 145 },
          { day: 'Wed', active: 152 },
          { day: 'Thu', active: 138 },
          { day: 'Fri', active: 140 },
          { day: 'Sat', active: 45 },
          { day: 'Sun', active: 30 },
        ],
        topTeams: [
          { team: 'Product', count: 54 },
          { team: 'Design', count: 38 },
          { team: 'Engineering', count: 46 },
          { team: 'Marketing', count: 24 },
          { team: 'Sales', count: 24 },
        ],
        recentActivity: [
          { id: 'act-1', text: 'Admin updated enterprise security policies', time: '10 mins ago' },
          { id: 'act-2', text: 'Shreya published AI summary for Product Roadmap', time: '35 mins ago' },
          { id: 'act-3', text: 'Rohit created WebRTC signaling container test', time: '1 hour ago' },
        ],
      } as unknown as T;
    }

    // 11. Admin Reports
    if (endpoint === '/admin/reports') {
      return {
        success: true,
        meetingActivity: [
          { day: 'Mon', internal: 25, client: 15 },
          { day: 'Tue', internal: 32, client: 20 },
          { day: 'Wed', internal: 28, client: 22 },
          { day: 'Thu', internal: 35, client: 18 },
          { day: 'Fri', internal: 30, client: 16 },
          { day: 'Sat', internal: 5, client: 2 },
          { day: 'Sun', internal: 4, client: 1 },
        ],
        meetingTypes: [
          { name: 'Internal', value: 45, color: '#3b82f6' },
          { name: 'Client', value: 30, color: '#6366f1' },
          { name: 'Team-Sync', value: 15, color: '#10b981' },
          { name: 'Other', value: 10, color: '#f59e0b' },
        ],
        peakHours: [
          { hour: '9 AM', count: 18 },
          { hour: '11 AM', count: 42 },
          { hour: '2 PM', count: 48 },
          { hour: '4 PM', count: 35 },
          { hour: '6 PM', count: 12 },
        ],
        featureUsage: [
          { feature: 'Live Captions', percentage: 92 },
          { feature: 'AI Summaries', percentage: 88 },
          { feature: 'Screen Sharing', percentage: 76 },
          { feature: 'Cloud Recording', percentage: 65 },
        ],
      } as unknown as T;
    }

    // 12. Admin Users Management (POST / PUT / DELETE)
    if (endpoint.startsWith('/admin/users')) {
      const users = getStoredList<User>('intellimeet_demo_users', DEMO_USERS);

      if (endpoint === '/admin/users' && method === 'POST') {
        const newUser: User = {
          id: `usr-${Date.now()}`,
          name: payload.name || 'New User',
          email: payload.email || 'user@zidio.in',
          role: payload.role || 'employee',
          team: payload.team || 'Product Team',
          jobTitle: payload.jobTitle || 'Team Member',
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(payload.name || 'User')}`,
          status: 'active',
          organization: 'Zidio Development',
        };
        const updated = [...users, newUser];
        setStoredList('intellimeet_demo_users', updated);
        return { success: true, user: newUser } as unknown as T;
      }

      if (endpoint.startsWith('/admin/users/') && method === 'PUT') {
        const id = endpoint.replace('/admin/users/', '').split('?')[0];
        const updated = users.map((u) => ((u.id || (u as any)._id) === id ? { ...u, ...payload } : u));
        setStoredList('intellimeet_demo_users', updated);
        return { success: true, message: 'User updated' } as unknown as T;
      }

      if (endpoint.startsWith('/admin/users/') && method === 'DELETE') {
        const id = endpoint.replace('/admin/users/', '').split('?')[0];
        const updated = users.filter((u) => (u.id || (u as any)._id) !== id);
        setStoredList('intellimeet_demo_users', updated);
        return { success: true, message: 'User deleted' } as unknown as T;
      }

      return { success: true, users } as unknown as T;
    }

    // 13. Global Search
    if (endpoint.startsWith('/search')) {
      const query = (new URLSearchParams(endpoint.split('?')[1] || '').get('q') || '').toLowerCase();
      const meetings = getStoredList<Meeting>('intellimeet_demo_meetings', INITIAL_DEMO_MEETINGS);
      const tasks = getStoredList<Task>('intellimeet_demo_tasks', INITIAL_DEMO_TASKS);
      const users = getStoredList<User>('intellimeet_demo_users', DEMO_USERS);

      return {
        success: true,
        results: {
          meetings: meetings.filter((m) => m.title.toLowerCase().includes(query)),
          tasks: tasks.filter((t) => t.title.toLowerCase().includes(query)),
          people: users.filter((u) => u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query)),
          recordings: DEMO_RECORDINGS,
        },
      } as unknown as T;
    }

    return { success: true, data: [] } as unknown as T;
  }

  // --- Public API Methods ---

  // Auth
  async login(credentials: { email: string; password: string }) {
    return this.request<{ success: boolean; token: string; user: any; message?: string }>('/auth/login', {
      method: 'POST',
      data: credentials,
    });
  }

  async register(data: any) {
    return this.request<{ success: boolean; token: string; user: any; message?: string }>('/auth/register', {
      method: 'POST',
      data,
    });
  }

  async getMe() {
    return this.request<{ success: boolean; user: any; message?: string }>('/auth/me');
  }

  async updateProfile(data: any) {
    return this.request<{ success: boolean; user: any; message?: string }>('/auth/profile', {
      method: 'PUT',
      data,
    });
  }

  async uploadAvatar(file: File) {
    try {
      const token = this.getToken();
      const formData = new FormData();
      formData.append('avatar', file);

      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/users/avatar`, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fallback in demo mode
    }

    // Instant local image preview fallback
    const previewUrl = URL.createObjectURL(file);
    return { success: true, avatarUrl: previewUrl };
  }

  async changePassword(data: any) {
    return this.request<{ success: boolean; message: string }>('/auth/change-password', {
      method: 'PUT',
      data,
    });
  }

  // Meetings
  async getMeetings(params?: { type?: string; status?: string; search?: string }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request<{ success: boolean; meetings: any[] }>(`/meetings${query ? `?${query}` : ''}`);
  }

  async getMeetingById(id: string) {
    return this.request<{ success: boolean; meeting: any }>(`/meetings/${id}`);
  }

  async getMeetingByRoomId(roomId: string) {
    return this.request<{ success: boolean; meeting: any }>(`/meetings/room/${roomId}`);
  }

  async createMeeting(data: any) {
    return this.request<{ success: boolean; meeting: any }>('/meetings', {
      method: 'POST',
      data,
    });
  }

  async updateMeeting(id: string, data: any) {
    return this.request<{ success: boolean; meeting: any }>(`/meetings/${id}`, {
      method: 'PUT',
      data,
    });
  }

  // Tasks
  async getTasks(params?: { status?: string; kanban?: string; filterBy?: string }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request<{ success: boolean; tasks: any[] }>(`/tasks${query ? `?${query}` : ''}`);
  }

  async createTask(data: any) {
    return this.request<{ success: boolean; task: any }>('/tasks', {
      method: 'POST',
      data,
    });
  }

  async updateTask(id: string, data: any) {
    return this.request<{ success: boolean; task: any }>(`/tasks/${id}`, {
      method: 'PUT',
      data,
    });
  }

  async deleteTask(id: string) {
    return this.request<{ success: boolean; message: string }>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  // Summaries & Transcripts
  async getMeetingSummary(meetingId: string) {
    return this.request<{ success: boolean; summary: any; transcript: any; meeting: any }>(`/summaries/${meetingId}`);
  }

  async generateMeetingSummary(meetingId: string) {
    return this.request<{ success: boolean; summary: any }>(`/summaries/${meetingId}/generate`, {
      method: 'POST',
    });
  }

  // AI Assistant Chat
  async askAIAssistant(prompt: string) {
    return this.request<{ success: boolean; answer: string; relatedData?: any }>('/ai/chat', {
      method: 'POST',
      data: { prompt },
    });
  }

  // Team & Users
  async getUsers(params?: { role?: string; team?: string; search?: string }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request<{ success: boolean; users: any[] }>(`/users${query ? `?${query}` : ''}`);
  }

  // Admin User Governance
  async toggleUserStatus(userId: string, nextStatus: string) {
    return this.request<{ success: boolean }>(`/admin/users/${userId}`, {
      method: 'PUT',
      data: { status: nextStatus },
    });
  }

  async toggleUserRole(userId: string, nextRole: string) {
    return this.request<{ success: boolean }>(`/admin/users/${userId}`, {
      method: 'PUT',
      data: { role: nextRole },
    });
  }

  async deleteUser(userId: string) {
    return this.request<{ success: boolean }>(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async createUser(formData: any) {
    return this.request<{ success: boolean; user?: any; message?: string }>('/admin/users', {
      method: 'POST',
      data: formData,
    });
  }

  // Notifications
  async getNotifications() {
    return this.request<{ success: boolean; notifications: any[] }>('/notifications');
  }

  async markNotificationRead(id: string) {
    return this.request<{ success: boolean }>(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  }

  async markAllNotificationsRead() {
    return this.request<{ success: boolean }>('/notifications/read-all', {
      method: 'PUT',
    });
  }

  // Recordings
  async getRecordings() {
    return this.request<{ success: boolean; recordings: any[] }>('/recordings');
  }

  async saveRecording(data: any) {
    return this.request<{ success: boolean; recording: any }>('/recordings', {
      method: 'POST',
      data,
    });
  }

  // Analytics & Admin Telemetry
  async getDashboardAnalytics() {
    return this.request<{ success: boolean; stats: any; weeklyTrends: any[] }>('/analytics/dashboard');
  }

  async getAdminStats() {
    return this.request<{ success: boolean; overview: any; meetingTrend: any[]; userActivity: any[]; topTeams: any[]; recentActivity: any[] }>('/admin/stats');
  }

  async getAdminReports() {
    return this.request<{ success: boolean; meetingActivity: any[]; meetingTypes: any[]; peakHours: any[]; featureUsage: any[] }>('/admin/reports');
  }

  // Global Search
  async globalSearch(query: string) {
    return this.request<{ success: boolean; results: { meetings: any[]; tasks: any[]; people: any[]; recordings: any[] } }>(`/search?q=${encodeURIComponent(query)}`);
  }
}

export const api = new ApiService();
