import { Router } from 'express';
import {
  getAdminStats,
  getAdminReports,
  adminCreateUser,
  adminUpdateUser,
  adminDeleteUser,
} from '../controllers/adminController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

// Protect all admin endpoints for admin role only
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getAdminStats);
router.get('/reports', getAdminReports);
router.post('/users', adminCreateUser);
router.put('/users/:id', adminUpdateUser);
router.delete('/users/:id', adminDeleteUser);

export default router;
