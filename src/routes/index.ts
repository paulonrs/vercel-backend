import express from 'express';
import userRoutes from './userRoutes';
import homeRoutes from './homeRoutes';

const router = express.Router();

router.use('/home', homeRoutes);
router.use('/users', userRoutes);

export default router;
