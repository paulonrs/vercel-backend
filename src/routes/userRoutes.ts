import express from 'express';
import UserController from '../controllers/userController/userController';
import { container } from '../shared/container';

const router = express.Router();
const userController = container.resolve(UserController);

router.get('/', userController.getAllUsers);

export default router;
