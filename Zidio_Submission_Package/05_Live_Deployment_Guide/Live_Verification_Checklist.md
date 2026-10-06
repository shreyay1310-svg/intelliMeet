# 🌐 Live Deployment Verification Checklist

Run these quick checks after deploying your frontend and backend to production:

---

## 1. Network & Protocol Checks
- [ ] **HTTPS Enforced:** Frontend loads with a secure padlock icon in the browser address bar.
- [ ] **WSS (WebSocket Secure):** Socket.io connects over `wss://` without SSL protocol downgrades.
- [ ] **CORS Configuration:** Opening browser DevTools Console reveals zero `Access-Control-Allow-Origin` blocked errors.

---

## 2. API & Data Persistence Checks
- [ ] **User Authentication:** Able to log in with `employee@intellimeet.io` on the live domain.
- [ ] **Token Storage:** JWT tokens are stored securely in `localStorage` or HttpOnly cookies.
- [ ] **Database Read:** Dashboard meetings list renders live scheduled meetings fetched from MongoDB Atlas.
- [ ] **Database Write:** Clicking "+ New Meeting" saves a new meeting record that persists across page refreshes.

---

## 3. WebRTC Conferencing Checks
- [ ] **Camera & Mic Stream:** User video preview appears when entering `/meeting/:roomId`.
- [ ] **Two-Party Call:** Opening the same room in an incognito window displays both video tiles.
- [ ] **In-Meeting Chat:** Chat message sent from Tab A arrives instantly in Tab B.
- [ ] **AI Summarization:** Clicking "End Meeting" generates an executive summary on the live server.
