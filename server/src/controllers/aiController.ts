import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { aiService } from '../services/aiService';
import { Meeting } from '../models/Meeting';
import { Task } from '../models/Task';

// @desc    Ask AI Assistant (meeting queries, pending tasks, schedules)
// @route   POST /api/ai/chat
// @access  Private
export const askAIAssistant = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { prompt } = req.body;
    const userId = req.user?._id;

    if (!prompt) {
      res.status(400).json({ success: false, message: 'Please provide a prompt' });
      return;
    }

    // Fetch user context: recent meetings and pending tasks
    const recentMeetings = await Meeting.find({
      $or: [{ host: userId }, { participants: userId }],
    })
      .sort({ startTime: -1 })
      .limit(5);

    const pendingTasks = await Task.find({
      assignedTo: userId,
      status: { $ne: 'completed' },
    }).sort({ dueDate: 1 });

    const answer = await aiService.answerAssistantQuery(prompt, {
      userName: req.user?.name || 'there',
      recentMeetings,
      pendingTasks,
    });

    res.status(200).json({
      success: true,
      answer,
      context: {
        recentMeetingsCount: recentMeetings.length,
        pendingTasksCount: pendingTasks.length,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
