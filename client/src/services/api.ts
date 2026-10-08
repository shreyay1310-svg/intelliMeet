const RAW_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
export const API_BASE_URL = RAW_BASE_URL
  ? (RAW_BASE_URL.endsWith('/api') ? RAW_BASE_URL : `${RAW_BASE_URL}/api`)
  : '/api';

interface RequestOptions extends RequestInit {
  data?: any;
}

class ApiService {
  private getToken(): string | null {
    return localStorage.getItem('intellimeet_token');
  }

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

    let response: Response;
    try {
      response = await fetch(url, config);
    } catch (networkErr: any) {
      throw new Error('Unable to connect to the backend server. Please ensure the backend is running on port 5000.');
    }

    let result: any = null;
    const text = await response.text();
    if (text) {
      try {
        result = JSON.parse(text);
      } catch {
        // Non-JSON response
      }
    }

    if (!response.ok) {
      const defaultMessage =
        response.status === 504 || response.status === 502 || response.status === 503
          ? 'Backend server is unreachable. Please ensure the backend is running on port 5000.'
          : `Request failed with status ${response.status}`;
      throw new Error(result?.message || defaultMessage);
    }

    return (result ?? {}) as T;
  }

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
    const token = this.getToken();
    const formData = new FormData();
    formData.append('avatar', file);

    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    let response: Response;
    try {
      response = await fetch(`${API_BASE_URL}/users/avatar`, {
        method: 'POST',
        headers,
        body: formData,
      });
    } catch (networkErr: any) {
      throw new Error('Unable to connect to the backend server. Please ensure the backend is running on port 5000.');
    }

    let result: any = null;
    const text = await response.text();
    if (text) {
      try {
        result = JSON.parse(text);
      } catch {}
    }

    if (!response.ok) {
      throw new Error(result?.message || 'Avatar upload failed');
    }
    return result;
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

  // Analytics & Admin
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
