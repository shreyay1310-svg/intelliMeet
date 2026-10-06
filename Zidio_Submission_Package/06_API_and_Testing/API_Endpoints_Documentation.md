# 📖 IntellMeet REST API Documentation

This document describes the complete REST API specification for **IntellMeet**, including route endpoints, request headers, payload parameters, and response structures.

A ready-to-import Postman Collection is also included in this folder: [`IntellMeet_Postman_Collection.json`](file:///c:/Users/shrey/OneDrive/Desktop/intelliMeet/Zidio_Submission_Package/06_API_and_Testing/IntellMeet_Postman_Collection.json).

---

## 🔐 Base URL & Headers

- **Base URL:** `http://localhost:5000/api` (Local) / `https://intellimeet-api.onrender.com/api` (Production)
- **Standard Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer <JWT_ACCESS_TOKEN>` (for protected endpoints)

---

## 1. Authentication Endpoints (`/api/auth`)

### 1.1 Register New User
- **Method:** `POST`
- **Route:** `/api/auth/register`
- **Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@intellimeet.io",
    "password": "Password123!",
    "role": "member"
  }
  ```
- **Response (`201 Created`):**
  ```json
  {
    "success": true,
    "token": "eyJhbGciOi...",
    "refreshToken": "eyJhbGciOi...",
    "user": {
      "_id": "673abc...",
      "name": "Jane Doe",
      "email": "jane@intellimeet.io",
      "role": "member"
    }
  }
  ```

### 1.2 User Login
- **Method:** `POST`
- **Route:** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "employee@intellimeet.io",
    "password": "Password123!"
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "token": "eyJhbGciOi...",
    "refreshToken": "eyJhbGciOi...",
    "user": {
      "_id": "673...",
      "name": "Shreya Yadav",
      "email": "employee@intellimeet.io",
      "role": "member"
    }
  }
  ```

### 1.3 Refresh Access Token
- **Method:** `POST`
- **Route:** `/api/auth/refresh`
- **Body:**
  ```json
  {
    "refreshToken": "eyJhbGciOi..."
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "token": "new_access_token_here"
  }
  ```

---

## 2. Meetings Endpoints (`/api/meetings`)

### 2.1 Get All Meetings
- **Method:** `GET`
- **Route:** `/api/meetings`
- **Headers:** `Authorization: Bearer <token>`
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "count": 4,
    "data": [
      {
        "_id": "673...",
        "title": "Weekly Sprint Planning",
        "roomId": "sprint-room-402",
        "scheduledAt": "2026-03-24T10:00:00.000Z",
        "duration": 45,
        "status": "scheduled",
        "participants": []
      }
    ]
  }
  ```

### 2.2 Create Meeting
- **Method:** `POST`
- **Route:** `/api/meetings`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "title": "Client Architecture Review",
    "description": "Walkthrough of WebRTC signaling design",
    "scheduledAt": "2026-03-25T14:30:00.000Z",
    "duration": 60
  }
  ```
- **Response (`201 Created`):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "673def...",
      "title": "Client Architecture Review",
      "roomId": "room-983172",
      "status": "scheduled"
    }
  }
  ```

---

## 3. AI Meeting Intelligence Endpoints (`/api/ai`)

### 3.1 Generate Meeting Summary
- **Method:** `POST`
- **Route:** `/api/ai/summarize`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "meetingId": "673def...",
    "transcript": "Speaker 1: We must finalize the WebRTC candidate queue before Friday. Speaker 2: Agreed, Shreya will take ownership of the candidate buffer test."
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "summary": {
      "executiveSummary": "The team aligned on closing WebRTC synchronization race conditions ahead of the Friday deadline.",
      "keyTakeaways": [
        "ICE candidate queuing is top priority",
        "Assigned to Shreya for end-to-end verification"
      ],
      "actionItems": [
        {
          "description": "Implement ICE candidate buffer test",
          "assignee": "Shreya Yadav",
          "dueDate": "2026-03-27",
          "priority": "high"
        }
      ]
    }
  }
  ```

---

## 4. Tasks & Kanban Endpoints (`/api/tasks`)

### 4.1 Get Tasks
- **Method:** `GET`
- **Route:** `/api/tasks`
- **Headers:** `Authorization: Bearer <token>`
- **Query Params:** `?status=todo&priority=high`

### 4.2 Update Task Status (Kanban Drop)
- **Method:** `PATCH`
- **Route:** `/api/tasks/:id/status`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "status": "completed"
  }
  ```

---

## 5. Admin & Analytics Endpoints (`/api/admin`)

### 5.1 System KPI Metrics
- **Method:** `GET`
- **Route:** `/api/admin/metrics`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "kpis": {
      "totalUsers": 28,
      "activeMeetings": 3,
      "totalConferences": 142,
      "systemHealth": "Optimal"
    }
  }
  ```
