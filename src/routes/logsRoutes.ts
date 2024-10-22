import express from 'express';

const router = express.Router();
const {
  logsController,
} = require('../controllers/logsController/logsController');

router.get('/logs/app', logsController.getLogs);

router.get('/logs/error', logsController.getLogsError);
