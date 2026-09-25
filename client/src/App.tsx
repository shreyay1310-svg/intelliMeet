import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Layouts
import { DashboardLayout } from './layouts/DashboardLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Employee Pages
import { DashboardPage } from './pages/employee/DashboardPage';
import { MeetingsPage } from './pages/employee/MeetingsPage';
import { CalendarPage } from './pages/employee/CalendarPage';
import { ChatPage } from './pages/employee/ChatPage';
import { TasksPage } from './pages/employee/TasksPage';
import { KanbanPage } from './pages/employee/KanbanPage';
import { RecordingsPage } from './pages/employee/RecordingsPage';
import { AIAssistantPage } from './pages/employee/AIAssistantPage';
import { TeamPage } from './pages/employee/TeamPage';
import { AnalyticsPage } from './pages/employee/AnalyticsPage';
import { SettingsPage } from './pages/employee/SettingsPage';

// Meeting Room & Summary Pages
import { MeetingRoomPage } from './pages/meeting/MeetingRoomPage';
import { MeetingSummaryPage } from './pages/meeting/MeetingSummaryPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Real-Time Meeting Room (Full-screen WebRTC) */}
        <Route
          path="/meetings/room/:roomId"
          element={
            <ProtectedRoute>
              <MeetingRoomPage />
            </ProtectedRoute>
          }
        />

        {/* Employee / Team Workspace (Wrapped in DashboardLayout) */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['employee', 'admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/meetings" element={<MeetingsPage />} />
          <Route path="/meetings/summary/:meetingId" element={<MeetingSummaryPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/kanban" element={<KanbanPage />} />
          <Route path="/recordings" element={<RecordingsPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Administrator Portal (Wrapped in AdminLayout) */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/meetings" element={<MeetingsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/reports" element={<AdminAnalyticsPage />} />
          <Route path="/admin/integrations" element={<AdminSettingsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
