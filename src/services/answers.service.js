
import express from 'express';
import * as answerController from '../controllers/answerController.js';
import { registrarLog } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.get('/', registrarLog, answerController.listar);
router.post('/', registrarLog, answerController.responder);
router.get('/ranking', registrarLog, answerController.ranking);

export default router;
