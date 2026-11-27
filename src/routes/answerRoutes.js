import express from 'express';
import * as answerController from '../controllers/answerController.js';

const router = express.Router();

router.get('/', answerController.listar);
router.post('/', answerController.criar);
router.get('/pergunta/:questionId', answerController.buscarPorPergunta);
router.get('/:id', answerController.buscarPorId);
router.put('/:id', answerController.editar);
router.delete('/:id', answerController.deletar);

export default router;