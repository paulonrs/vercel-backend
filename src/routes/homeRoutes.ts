import express from 'express';
import HomeController from '../controllers/homeController/homeController';

const router = express.Router();

const homeController = new HomeController();

router.get('/', homeController.getHome);

export default router;
