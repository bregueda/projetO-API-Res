import express from 'express';
import * as questionController from '../controllers/questionController.js';

const router = express.Router();

router.get('/', questionController.listar);
router.post('/', questionController.criar);
router.get('/quiz/:quizId', questionController.buscarPorQuiz);
router.get('/:id', questionController.buscarPorId);
router.put('/:id', questionController.editar);
router.delete('/:id', questionController.deletar);

export default router;