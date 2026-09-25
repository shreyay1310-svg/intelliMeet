import { Router } from 'express';
import { getNotifications, markNotificationRead, markAllRead } from '../controllers/notificationController';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);
router.get('/', getNotifications);
router.put('/:id/read', markNotificationRead);
router.put('/read-all', markAllRead);

export default router;
