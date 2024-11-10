import express from 'express';
import { DiContainer } from '@/shared/container';
import UserControllerInterface from '@/controllers/user/userControllerInterface';
import AuthMiddleware from '@/middleware/authMiddleware';

const router = express.Router();
const container = new DiContainer().getContainer();
const userController = container.get<UserControllerInterface>(
  'UserControllerInterface',
);
const authMiddleware = container.get<AuthMiddleware>('AuthMiddleware');

router.get(
  '/',
  authMiddleware.verifyToken.bind(authMiddleware),
  userController.getAllUsers,
);
router.post('/', userController.addUsers);

export default router;
