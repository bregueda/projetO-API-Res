
import express from 'express';
import * as quizController from '../controllers/quizController.js';
import { registrarLog } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.get('/', registrarLog, quizController.listar);
router.post('/', registrarLog, quizController.criar);
router.delete('/:id', registrarLog, quizController.deletar);

export default router;
