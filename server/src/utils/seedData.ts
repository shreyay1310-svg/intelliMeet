import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../config/db';
import { User } from '../models/User';
import { Meeting } from '../models/Meeting';
import { Task } from '../models/Task';
import { MeetingSummary } from '../models/MeetingSummary';
import { Transcript } from '../models/Transcript';
import { Message } from '../models/Message';
import { Notification } from '../models/Notification';
import { Recording } from '../models/Recording';

export const seedDatabase = async () => {
  try {
    console.log('[Seeder] Starting IntellMeet sample data initialization...');

    // Clear existing collections
    await User.deleteMany({});
    await Meeting.deleteMany({});
    await Task.deleteMany({});
    await MeetingSummary.deleteMany({});
    await Transcript.deleteMany({});
    await Message.deleteMany({});
    await Notification.deleteMany({});
    await Recording.deleteMany({});

    console.log('[Seeder] Cleared existing records.');

    // 1. Create Users
    const users = await User.create([
      {
        name: 'Shreya Yadav',
        email: 'shreya@zidio.in',
        password: 'Password123!',
        role: 'employee',
        team: 'Product Team',
        jobTitle: 'Product Designer',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        status: 'active',
      },
      {
        name: 'Rohit Sharma',
        email: 'rohit@zidio.in',
        password: 'Password123!',
        role: 'employee',
        team: 'Engineering',
        jobTitle: 'Senior Software Engineer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        status: 'active',
      },
      {
        name: 'Ananya Singh',
        email: 'ananya@zidio.in',
        password: 'Password123!',
        role: 'employee',
        team: 'Design',
        jobTitle: 'Lead UI/UX Designer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        status: 'active',
      },
      {
        name: 'Karan Mehta',
        email: 'karan@zidio.in',
        password: 'Password123!',
        role: 'employee',
        team: 'Marketing',
        jobTitle: 'Growth Lead',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        status: 'inactive',
      },
      {
        name: 'Priya Verma',
        email: 'priya@zidio.in',
        password: 'Password123!',
        role: 'employee',
        team: 'Product Team',
        jobTitle: 'Technical Product Manager',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        status: 'active',
      },
      {
        name: 'Aman Gupta',
        email: 'aman@zidio.in',
        password: 'Password123!',
        role: 'employee',
        team: 'Engineering',
        jobTitle: 'DevOps & Cloud Engineer',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        status: 'active',
      },
      {
        name: 'Admin',
        email: 'admin@zidio.in',
        password: 'Password123!',
        role: 'admin',
        team: 'Executive',
        jobTitle: 'Enterprise Administrator',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        status: 'active',
      },
    ]);

    const [shreya, rohit, ananya, karan, priya, aman, admin] = users;
    console.log(`[Seeder] Created ${users.length} users.`);

    // 2. Create Meetings
    const today = new Date();
    const setTime = (hours: number, minutes: number, daysFromToday = 0) => {
      const d = new Date(today);
      d.setDate(d.getDate() + daysFromToday);
      d.setHours(hours, minutes, 0, 0);
      return d;
    };

    const meeting1 = await Meeting.create({
      title: 'Product Roadmap Discussion',
      description: 'Review Q3 milestone deliverables, telemetry integration, and customer feedback.',
      host: shreya._id,
      participants: [shreya._id, rohit._id, ananya._id, karan._id, priya._id, aman._id],
      startTime: setTime(10, 30),
      endTime: setTime(11, 0),
      duration: 30,
      meetingType: 'internal',
      platform: 'Google Meet',
      meetingRoomId: 'roadmap-q3-live',
      status: 'scheduled',
    });

    const meeting2 = await Meeting.create({
      title: 'UI/UX Review',
      description: 'Deep dive into user onboarding heuristics, design system tokens, and accessibility audit.',
      host: ananya._id,
      participants: [ananya._id, shreya._id, rohit._id, priya._id, aman._id],
      startTime: setTime(14, 0),
      endTime: setTime(14, 45),
      duration: 45,
      meetingType: 'review',
      platform: 'Teams',
      meetingRoomId: 'ui-ux-review-demo',
      status: 'scheduled',
    });

    const meeting3 = await Meeting.create({
      title: 'Sprint Planning',
      description: 'Sprint backlog grooming and estimation for next 2-week cycle.',
      host: rohit._id,
      participants: [rohit._id, shreya._id, aman._id, karan._id],
      startTime: setTime(16, 0),
      endTime: setTime(17, 0),
      duration: 60,
      meetingType: 'team-sync',
      platform: 'Zoom',
      meetingRoomId: 'sprint-planning-demo',
      status: 'scheduled',
    });

    // Upcoming tomorrow
    await Meeting.create([
      {
        title: 'Team Sync',
        description: 'Daily standup check-in on blockers and releases.',
        host: shreya._id,
        participants: [shreya._id, rohit._id, ananya._id, priya._id],
        startTime: setTime(10, 0, 1),
        endTime: setTime(10, 30, 1),
        duration: 30,
        meetingType: 'team-sync',
        platform: 'Google Meet',
        meetingRoomId: 'team-sync-live',
        status: 'scheduled',
      },
      {
        title: 'Client Presentation',
        description: 'Demonstrating v1.2 prototype to enterprise stakeholders.',
        host: priya._id,
        participants: [priya._id, shreya._id, karan._id],
        startTime: setTime(12, 0, 1),
        endTime: setTime(13, 0, 1),
        duration: 60,
        meetingType: 'client',
        platform: 'Teams',
        meetingRoomId: 'client-pres-demo',
        status: 'scheduled',
      },
      {
        title: 'Design Review',
        description: 'Mobile responsive layouts and typography scale review.',
        host: ananya._id,
        participants: [ananya._id, shreya._id, rohit._id],
        startTime: setTime(15, 0, 1),
        endTime: setTime(16, 0, 1),
        duration: 60,
        meetingType: 'review',
        platform: 'Zoom',
        meetingRoomId: 'design-review-live',
        status: 'scheduled',
      },
    ]);

    // 3. Create Tasks for Shreya and team
    await Task.create([
      {
        title: 'Prepare demo for client',
        description: 'Package presentation slides and prototype walkthrough flow for stakeholder signoff.',
        meetingId: meeting1._id,
        assignedTo: shreya._id,
        createdBy: priya._id,
        dueDate: setTime(18, 0),
        priority: 'high',
        status: 'in-progress',
        kanbanColumn: 'In Progress',
        tags: ['Client', 'Demo', 'Roadmap'],
      },
      {
        title: 'Update documentation',
        description: 'Revise API and WebRTC client integration guides in the developer portal.',
        meetingId: meeting3._id,
        assignedTo: shreya._id,
        createdBy: rohit._id,
        dueDate: setTime(19, 0),
        priority: 'medium',
        status: 'todo',
        kanbanColumn: 'To Do',
        tags: ['Docs', 'Sprint'],
      },
      {
        title: 'Review PR #245',
        description: 'Peer review backend authentication middleware changes and JWT token refresh logic.',
        meetingId: meeting3._id,
        assignedTo: shreya._id,
        createdBy: rohit._id,
        dueDate: setTime(15, 0, 1),
        priority: 'high',
        status: 'todo',
        kanbanColumn: 'To Do',
        tags: ['GitHub', 'Engineering'],
      },
      {
        title: 'Finalize UI designs',
        description: 'Deliver exported Figma component tokens and high-fidelity mockups for meeting summary view.',
        meetingId: meeting2._id,
        assignedTo: shreya._id,
        createdBy: ananya._id,
        dueDate: setTime(17, 0, 2),
        priority: 'medium',
        status: 'in-progress',
        kanbanColumn: 'In Progress',
        tags: ['Design', 'UI/UX'],
      },
      {
        title: 'Finalize Q3 feature list',
        description: 'Verify prioritized feature dependencies with engineering leads.',
        meetingId: meeting1._id,
        assignedTo: rohit._id,
        createdBy: shreya._id,
        dueDate: setTime(16, 0, 1),
        priority: 'high',
        status: 'in-progress',
        kanbanColumn: 'In Progress',
        tags: ['Roadmap', 'Sprint'],
      },
      {
        title: 'Improve onboarding flow',
        description: 'Streamline empty state guidance and user tutorial walkthroughs.',
        meetingId: meeting1._id,
        assignedTo: ananya._id,
        createdBy: shreya._id,
        dueDate: setTime(17, 0, 2),
        priority: 'medium',
        status: 'completed',
        kanbanColumn: 'Completed',
        tags: ['UX', 'Onboarding'],
      },
    ]);

    // 4. Create Transcript & AI Summary for meeting1
    const transcript = await Transcript.create({
      meetingId: meeting1._id,
      entries: [
        {
          speaker: 'Rohit Sharma',
          userId: rohit._id,
          timestamp: new Date(Date.now() - 25 * 60 * 1000),
          text: 'Looks great! We should ensure the real-time telemetry pipeline handles concurrent streams seamlessly.',
        },
        {
          speaker: 'Ananya Singh',
          userId: ananya._id,
          timestamp: new Date(Date.now() - 22 * 60 * 1000),
          text: 'Should we add analytics in v2 or keep it in the initial Q3 release?',
        },
        {
          speaker: 'Shreya Yadav',
          userId: shreya._id,
          timestamp: new Date(Date.now() - 20 * 60 * 1000),
          text: "Yes, let's discuss this. I think having core metrics visible in the dashboard is essential for user engagement.",
        },
        {
          speaker: 'Karan Mehta',
          userId: karan._id,
          timestamp: new Date(Date.now() - 17 * 60 * 1000),
          text: "I'll share the updated documentation and growth benchmarks after this call.",
        },
      ],
    });

    const summary = await MeetingSummary.create({
      meetingId: meeting1._id,
      overview:
        'Discussed Q3 roadmap, finalized key features, and aligned on timelines. The team agreed to prioritize analytics and improve the onboarding flow. Next steps were assigned to respective team members.',
      keyTakeaways: [
        'Finalize Q3 feature list with engineering dependencies',
        'Improve onboarding flow for newly invited team members',
        'Add analytics in v2 dashboard with Recharts integration',
        'Prepare client presentation for tomorrow morning',
      ],
      actionItems: [
        {
          task: 'Finalize Q3 feature list',
          assigneeName: 'Rohit Sharma',
          assignee: rohit._id,
          dueDate: setTime(16, 0, 1),
          status: 'in-progress',
        },
        {
          task: 'Improve onboarding flow',
          assigneeName: 'Ananya Singh',
          assignee: ananya._id,
          dueDate: setTime(17, 0, 2),
          status: 'completed',
        },
        {
          task: 'Prepare demo for client',
          assigneeName: 'Shreya Yadav',
          assignee: shreya._id,
          dueDate: setTime(18, 0),
          status: 'in-progress',
        },
      ],
      decisions: [
        'Adopt WebRTC peer signaling for low-latency video and screen share.',
        'Use Recharts for employee and admin analytics widgets.',
      ],
      highlights: [
        'Unanimous agreement on MVP feature scope.',
        'Design tokens approved for light theme enterprise palette.',
      ],
      topics: ['Q3 Roadmap', 'UI/UX Design', 'Video Architecture', 'Analytics'],
    });

    // Link transcript & summary to meeting1
    meeting1.transcriptId = transcript._id as any;
    meeting1.summaryId = summary._id as any;
    await meeting1.save();

    // 5. Seed Messages for Meeting 1 Room Chat
    await Message.create([
      {
        meetingId: meeting1.meetingRoomId,
        sender: rohit._id,
        senderName: 'Rohit Sharma',
        senderAvatar: rohit.avatar,
        text: 'Looks great!',
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
      },
      {
        meetingId: meeting1.meetingRoomId,
        sender: ananya._id,
        senderName: 'Ananya Singh',
        senderAvatar: ananya.avatar,
        text: 'Should we add analytics in v2?',
        timestamp: new Date(Date.now() - 22 * 60 * 1000),
      },
      {
        meetingId: meeting1.meetingRoomId,
        sender: shreya._id,
        senderName: 'Shreya Yadav',
        senderAvatar: shreya.avatar,
        text: "Yes, let's discuss this.",
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
      },
      {
        meetingId: meeting1.meetingRoomId,
        sender: karan._id,
        senderName: 'Karan Mehta',
        senderAvatar: karan.avatar,
        text: "I'll share the updated doc.",
        timestamp: new Date(Date.now() - 17 * 60 * 1000),
      },
    ]);

    // 6. Seed Notifications
    await Notification.create([
      {
        recipient: shreya._id,
        title: 'Meeting in 10 minutes',
        message: 'Product Roadmap Discussion starts at 10:30 AM.',
        type: 'meeting_reminder',
        link: `/meetings/room/${meeting1.meetingRoomId}`,
      },
      {
        recipient: shreya._id,
        title: 'New Task Assigned',
        message: 'Priya Verma assigned "Prepare demo for client" to you.',
        type: 'task_assigned',
        link: '/tasks',
      },
      {
        recipient: shreya._id,
        title: 'AI Summary Ready',
        message: 'The AI summary for Product Roadmap Discussion is now available.',
        type: 'summary_ready',
        link: `/meetings/summary/${meeting1._id}`,
      },
    ]);

    // 7. Seed Sample Recording
    await Recording.create({
      meetingId: meeting1._id,
      title: 'Product Roadmap Discussion - Recording',
      durationSeconds: 1458, // ~24 mins 18s
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=80',
      sizeBytes: 104857600, // 100MB
      recordedBy: shreya._id,
    });

    console.log('[Seeder] Successfully populated IntellMeet database with demo records!');
  } catch (error) {
    console.error('[Seeder] Failed to seed database:', error);
    throw error;
  }
};

// Allow running directly from CLI: npm run seed
if (require.main === module) {
  (async () => {
    await connectDB();
    await seedDatabase();
    await disconnectDB();
    process.exit(0);
  })();
}
