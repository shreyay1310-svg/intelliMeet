import { Router } from 'express';
import {
  getMeetings,
  getMeetingById,
  getMeetingByRoomId,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} from '../controllers/meetingController';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);

router.route('/').get(getMeetings).post(createMeeting);
router.route('/room/:roomId').get(getMeetingByRoomId);
router.route('/:id').get(getMeetingById).put(updateMeeting).delete(deleteMeeting);

export default router;
