import { Router } from 'express';
import { getRecordings, saveRecording } from '../controllers/recordingController';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);
router.route('/').get(getRecordings).post(saveRecording);

export default router;
