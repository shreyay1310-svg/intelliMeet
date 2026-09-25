import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Meeting } from '../models/Meeting';
import { Task } from '../models/Task';
import { User } from '../models/User';
import { Recording } from '../models/Recording';

// @desc    Global search across meetings, people, tasks, recordings
// @route   GET /api/search?q=...
// @access  Private
export const globalSearch = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const q = req.query.q as string;
    if (!q || q.trim().length === 0) {
      res.status(200).json({
        success: true,
        results: { meetings: [], people: [], tasks: [], recordings: [] },
      });
      return;
    }

    const regex = new RegExp(q, 'i');

    const [meetings, people, tasks, recordings] = await Promise.all([
      Meeting.find({
        $or: [{ title: regex }, { description: regex }],
      }).limit(5),
      User.find({
        $or: [{ name: regex }, { email: regex }, { team: regex }],
      })
        .select('name email avatar team jobTitle')
        .limit(5),
      Task.find({
        $or: [{ title: regex }, { description: regex }],
      }).limit(5),
      Recording.find({
        title: regex,
      }).limit(5),
    ]);

    res.status(200).json({
      success: true,
      results: { meetings, people, tasks, recordings },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
