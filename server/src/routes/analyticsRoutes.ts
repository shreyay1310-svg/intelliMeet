import { Router } from 'express';
import { getDashboardAnalytics } from '../controllers/analyticsController';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);
router.get('/dashboard', getDashboardAnalytics);

export default router;
