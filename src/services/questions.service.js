
import express from 'express';
import * as questionController from '../controllers/questionController.js';
import { registrarLog } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.get('/', registrarLog, questionController.listar);
router.post('/', registrarLog, questionController.criar);
router.get('/quiz/:quizId', registrarLog, questionController.listarPorQuiz);

export default router;
