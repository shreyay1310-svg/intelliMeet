import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Task } from '../models/Task';
import { createAndEmitNotification } from './notificationController';

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { status, kanban, filterBy } = req.query;

    const query: any = {};

    if (filterBy === 'assignedToMe') {
      query.assignedTo = userId;
    } else if (filterBy === 'createdByMe') {
      query.createdBy = userId;
    } else {
      // Default: My tasks (assigned or created)
      query.$or = [{ assignedTo: userId }, { createdBy: userId }];
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    if (kanban && kanban !== 'all') {
      query.kanbanColumn = kanban;
    }

    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email avatar team jobTitle')
      .populate('createdBy', 'name email avatar team jobTitle')
      .populate('meetingId', 'title')
      .sort({ dueDate: 1 });

    res.status(200).json({ success: true, count: tasks.length, tasks });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, meetingId, assignedTo, dueDate, priority, status, kanbanColumn, tags } = req.body;

    if (!title) {
      res.status(400).json({ success: false, message: 'Please provide task title' });
      return;
    }

    const assignedUserId = assignedTo || req.user?._id;

    const columnMap: Record<string, 'To Do' | 'In Progress' | 'Review' | 'Completed'> = {
      'todo': 'To Do',
      'in-progress': 'In Progress',
      'review': 'Review',
      'completed': 'Completed',
    };

    const taskStatus = status || 'todo';
    const column = kanbanColumn || columnMap[taskStatus] || 'To Do';

    const task = await Task.create({
      title,
      description: description || '',
      meetingId: meetingId || undefined,
      assignedTo: assignedUserId,
      createdBy: req.user?._id,
      dueDate: dueDate ? new Date(dueDate) : new Date(Date.now() + 24 * 60 * 60 * 1000),
      priority: priority || 'medium',
      status: taskStatus,
      kanbanColumn: column,
      tags: tags || [],
    });

    await task.populate('assignedTo', 'name email avatar team jobTitle');
    await task.populate('createdBy', 'name email avatar team jobTitle');
    if (task.meetingId) {
      await task.populate('meetingId', 'title');
    }

    // Trigger real-time notification to assignee if assigned to someone else
    if (assignedUserId && assignedUserId.toString() !== req.user?._id?.toString()) {
      createAndEmitNotification(
        assignedUserId.toString(),
        'New Task Assigned',
        `${req.user?.name || 'A teammate'} assigned you: "${task.title}"`,
        'task',
        '/tasks'
      );
    }

    res.status(201).json({ success: true, task });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ success: false, message: 'Task not found' });
      return;
    }

    // Sync status and kanban column if either changes
    if (req.body.status && !req.body.kanbanColumn) {
      const map: Record<string, 'To Do' | 'In Progress' | 'Review' | 'Completed'> = {
        'todo': 'To Do',
        'in-progress': 'In Progress',
        'review': 'Review',
        'completed': 'Completed',
      };
      req.body.kanbanColumn = map[req.body.status] || task.kanbanColumn;
    } else if (req.body.kanbanColumn && !req.body.status) {
      const reverseMap: Record<string, 'todo' | 'in-progress' | 'review' | 'completed'> = {
        'To Do': 'todo',
        'In Progress': 'in-progress',
        'Review': 'review',
        'Completed': 'completed',
      };
      req.body.status = reverseMap[req.body.kanbanColumn] || task.status;
    }

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('assignedTo', 'name email avatar team jobTitle')
      .populate('createdBy', 'name email avatar team jobTitle')
      .populate('meetingId', 'title');

    res.status(200).json({ success: true, task: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ success: false, message: 'Task not found' });
      return;
    }

    await task.deleteOne();
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
