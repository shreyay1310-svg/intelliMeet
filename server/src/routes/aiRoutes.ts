import { Router } from 'express';
import { askAIAssistant } from '../controllers/aiController';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);
router.post('/chat', askAIAssistant);

export default router;
