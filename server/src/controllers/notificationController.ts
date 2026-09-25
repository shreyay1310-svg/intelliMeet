import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Notification } from '../models/Notification';
import { emitRealtimeNotification } from '../sockets/socketHandler';

// @desc    Get all notifications for user
// @route   GET /api/notifications
// @access  Private
export const getNotifications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const notifications = await Notification.find({ recipient: req.user?._id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ success: true, count: notifications.length, notifications });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Mark single notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markNotificationRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user?._id },
      { read: true }
    );
    res.status(200).json({ success: true, message: 'Notification marked read' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
export const markAllRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await Notification.updateMany({ recipient: req.user?._id }, { read: true });
    res.status(200).json({ success: true, message: 'All notifications marked read' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Helper: Create notification and emit real-time push event
export const createAndEmitNotification = async (
  recipientId: string,
  title: string,
  message: string,
  type: 'task' | 'meeting' | 'system' | 'mention' = 'system',
  actionUrl: string = ''
) => {
  try {
    const notification = await Notification.create({
      recipient: recipientId,
      title,
      message,
      type,
      actionUrl,
      read: false,
    });

    emitRealtimeNotification(recipientId, notification);
    return notification;
  } catch (err) {
    console.error('[Notification] Error creating notification:', err);
    return null;
  }
};
