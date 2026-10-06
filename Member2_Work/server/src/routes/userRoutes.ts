import { Router } from 'express';
import { getUsers, getUserById, uploadAvatar } from '../controllers/userController';
import { protect } from '../middleware/auth';
import { uploadAvatarMiddleware } from '../middleware/upload';

const router = Router();

router.use(protect);

router.get('/', getUsers);
router.post('/avatar', uploadAvatarMiddleware.single('avatar'), uploadAvatar);
router.get('/:id', getUserById);

export default router;
