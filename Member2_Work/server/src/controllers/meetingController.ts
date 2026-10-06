import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Meeting } from '../models/Meeting';
import { User } from '../models/User';
import { AuditLog } from '../models/AuditLog';

// @desc    Get all meetings for current user
// @route   GET /api/meetings
// @access  Private
export const getMeetings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { type, status, search, range } = req.query;

    const filter: any = {
      $or: [{ host: userId }, { participants: userId }],
    };

    if (type && type !== 'all') {
      filter.meetingType = type;
    }

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const meetings = await Meeting.find(filter)
      .populate('host', 'name email avatar team jobTitle')
      .populate('participants', 'name email avatar team jobTitle')
      .populate('summaryId')
      .sort({ startTime: 1 });

    res.status(200).json({
      success: true,
      count: meetings.length,
      meetings,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single meeting by ID
// @route   GET /api/meetings/:id
// @access  Private
export const getMeetingById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const meeting = await Meeting.findById(req.params.id)
      .populate('host', 'name email avatar team jobTitle')
      .populate('participants', 'name email avatar team jobTitle')
      .populate('summaryId')
      .populate('transcriptId');

    if (!meeting) {
      res.status(404).json({ success: false, message: 'Meeting not found' });
      return;
    }

    res.status(200).json({ success: true, meeting });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get meeting by room ID
// @route   GET /api/meetings/room/:roomId
// @access  Private
export const getMeetingByRoomId = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { roomId } = req.params;
    let meeting = await Meeting.findOne({ meetingRoomId: roomId })
      .populate('host', 'name email avatar team jobTitle')
      .populate('participants', 'name email avatar team jobTitle')
      .populate('summaryId');

    // If meeting room doesn't exist yet, auto-create ad-hoc room
    if (!meeting) {
      meeting = await Meeting.create({
        title: `Instant Meeting (${roomId})`,
        description: 'Spontaneous ad-hoc collaboration room',
        host: req.user?._id,
        participants: [req.user?._id],
        startTime: new Date(),
        endTime: new Date(Date.now() + 45 * 60 * 1000),
        duration: 45,
        meetingType: 'internal',
        platform: 'IntellMeet',
        meetingRoomId: roomId,
        status: 'live',
      });
      await meeting.populate('host', 'name email avatar team jobTitle');
      await meeting.populate('participants', 'name email avatar team jobTitle');
    }

    res.status(200).json({ success: true, meeting });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new meeting
// @route   POST /api/meetings
// @access  Private
export const createMeeting = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      startTime,
      endTime,
      duration,
      meetingType,
      platform,
      participantIds,
    } = req.body;

    if (!title || !startTime) {
      res.status(400).json({ success: false, message: 'Please provide meeting title and start time' });
      return;
    }

    const hostId = req.user?._id;
    const participantsList = Array.isArray(participantIds) ? participantIds : [];
    if (!participantsList.includes(hostId?.toString())) {
      participantsList.push(hostId);
    }

    // Generate readable random room code
    const generatedRoomCode = `${title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 15)}-${Math.random().toString(36).substring(2, 7)}`;

    const calcDuration = duration || (endTime ? Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / 60000) : 30);
    const end = endTime ? new Date(endTime) : new Date(new Date(startTime).getTime() + calcDuration * 60000);

    const meeting = await Meeting.create({
      title,
      description: description || '',
      host: hostId,
      participants: participantsList,
      startTime: new Date(startTime),
      endTime: end,
      duration: calcDuration,
      meetingType: meetingType || 'internal',
      platform: platform || 'IntellMeet',
      meetingRoomId: generatedRoomCode,
      status: 'scheduled',
    });

    await meeting.populate('host', 'name email avatar team jobTitle');
    await meeting.populate('participants', 'name email avatar team jobTitle');

    await AuditLog.create({
      userId: req.user?._id,
      userName: req.user?.name,
      action: 'MEETING_CREATED',
      resource: 'MEETINGS',
      details: `Created meeting "${meeting.title}" (Room: ${meeting.meetingRoomId})`,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    });

    res.status(201).json({ success: true, meeting });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update meeting
// @route   PUT /api/meetings/:id
// @access  Private
export const updateMeeting = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      res.status(404).json({ success: false, message: 'Meeting not found' });
      return;
    }

    const updated = await Meeting.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('host', 'name email avatar team jobTitle')
      .populate('participants', 'name email avatar team jobTitle')
      .populate('summaryId');

    res.status(200).json({ success: true, meeting: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete meeting
// @route   DELETE /api/meetings/:id
// @access  Private
export const deleteMeeting = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      res.status(404).json({ success: false, message: 'Meeting not found' });
      return;
    }

    // Only host or admin can delete meeting
    const isHost = meeting.host.toString() === req.user?._id?.toString();
    const isAdmin = req.user?.role === 'admin';

    if (!isHost && !isAdmin) {
      res.status(403).json({ success: false, message: 'Not authorized to delete this meeting' });
      return;
    }

    await Meeting.findByIdAndDelete(req.params.id);

    await AuditLog.create({
      userId: req.user?._id,
      userName: req.user?.name,
      action: 'MEETING_DELETED',
      resource: 'MEETINGS',
      details: `Deleted meeting "${meeting.title}" (Room: ${meeting.meetingRoomId})`,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    });

    res.status(200).json({ success: true, message: 'Meeting deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

