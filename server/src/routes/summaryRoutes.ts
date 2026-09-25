import { Router } from 'express';
import { getMeetingSummary, generateMeetingSummary } from '../controllers/summaryController';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);

router.get('/:meetingId', getMeetingSummary);
router.post('/:meetingId/generate', generateMeetingSummary);

export default router;
