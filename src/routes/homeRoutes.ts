import express from 'express';
import HomeController from '../controllers/home/homeController';

const router = express.Router();

const homeController = new HomeController();

router.get('/', homeController.getHome);

export default router;
