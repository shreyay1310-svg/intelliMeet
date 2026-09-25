import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Recording } from '../models/Recording';
import { Meeting } from '../models/Meeting';

// @desc    Get all recordings
// @route   GET /api/recordings
// @access  Private
export const getRecordings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const recordings = await Recording.find()
      .populate('meetingId', 'title startTime duration meetingType platform participants')
      .populate('recordedBy', 'name email avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: recordings.length, recordings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Save new recording metadata
// @route   POST /api/recordings
// @access  Private
export const saveRecording = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { meetingId, title, durationSeconds, url, thumbnailUrl, sizeBytes } = req.body;

    const recording = await Recording.create({
      meetingId,
      title: title || 'Meeting Recording',
      durationSeconds: durationSeconds || 0,
      url: url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnailUrl: thumbnailUrl || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=80',
      sizeBytes: sizeBytes || 10485760,
      recordedBy: req.user?._id,
    });

    res.status(201).json({ success: true, recording });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
