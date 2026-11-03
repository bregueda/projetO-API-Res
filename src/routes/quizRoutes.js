
import express from 'express';
import * as quizController from '../controllers/quizController.js';

const router = express.Router();

router.get('/', quizController.listar);
router.post('/', quizController.criar);
router.get('/:id', quizController.buscarPorId);
router.delete('/:id', quizController.deletar);

export default router;
