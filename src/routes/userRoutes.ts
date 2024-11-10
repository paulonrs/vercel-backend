import express from 'express';
import { DiContainer } from '@/shared/container';
import UserControllerInterface from '@/controllers/user/userControllerInterface';

const router = express.Router();
const container = new DiContainer().getContainer();
const userController = container.get<UserControllerInterface>(
  'UserControllerInterface',
);

router.get('/', userController.getAllUsers);
router.post('/', userController.addUsers);

export default router;
