# 🎙️ Feedback Video — Script & Reflection Guide

**Duration Target:** 1 to 2 Minutes  
**Format:** Direct-to-Camera Video (Phone selfie camera or Laptop webcam)  
**Tone:** Personal, professional, truthful, and reflective  
**Deliverable Link:** YouTube Unlisted / Google Drive / Loom  

---

## 📜 Complete Word-for-Word Spoken Script (English)

> *"Hello, I'm Shreya Yadav. During this internship project, I worked on **IntellMeet**, an AI-powered enterprise meeting and collaboration platform.*  
> 
> *The primary areas where I gained hands-on experience were full-stack MERN architecture using TypeScript, real-time multimedia communication with WebRTC and Socket.io, robust MongoDB schema design, JWT authentication with token rotation, and integrating dual-tier AI pipelines.*  
> 
> *One of the biggest technical challenges I faced was managing the **WebRTC peer connection state and ICE candidate synchronization**. In high-latency network conditions, ICE candidates were frequently arriving before the remote peer's session description was set, causing peer connections to fail or hang.*  
> 
> *I solved this by implementing an asynchronous ICE candidate buffer queue in the frontend client. Candidates arriving prior to the `setRemoteDescription` resolution are cached and flushed sequentially only once the peer connection state transitions to ready. This made video room connection negotiation 100% resilient.*  
> 
> *Another key learning was designing graceful fallbacks for external AI APIs so that meeting summaries continue to generate even if the cloud API encounters rate limits.*  
> 
> *This project taught me how individual engineering modules—from signaling sockets to database transactions and UI components—come together to form a coherent, production-ready enterprise application.*  
> 
> *Going forward, I would love to enhance IntellMeet by migrating from a peer-to-peer mesh to a Selective Forwarding Unit like mediasoup to support 50+ participants, and adding end-to-end cryptographic encryption for media streams.*  
> 
> *Overall, this project provided me with invaluable real-world experience in full-stack engineering, performance debugging, and software delivery. Thank you to Zidio Development for this wonderful learning opportunity!"*

---

## ⏱️ Video Structure Breakdown

| Time | Topic | Key Words / Delivery Focus |
|---|---|---|
| **0:00 – 0:15** | Introduction | Name, Project Name (*IntellMeet*), Purpose |
| **0:15 – 0:40** | Core Learnings | MERN stack, WebRTC, Socket.io, TypeScript, JWT, AI integration |
| **0:40 – 1:10** | Biggest Challenge & Solution | WebRTC ICE candidate race condition solved with queuing buffer; AI fallback engine |
| **1:10 – 1:35** | What Would Improve Next | SFU architecture for scaling, End-to-End Encryption (E2EE) |
| **1:35 – 1:50** | Conclusion & Thanks | Practical experience gained, appreciation to Zidio |
