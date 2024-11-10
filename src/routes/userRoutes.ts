import express from 'express';
import UserController from '../controllers/user/userController';
import { container } from '../shared/container';

const router = express.Router();
const userController = container.resolve(UserController);

router.get('/', userController.getAllUsers);
router.post('/', userController.addUsers);

export default router;
