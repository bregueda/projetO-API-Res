
import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', userController.listar);
router.post('/', userController.criar);
router.get('/:id', userController.buscarPorId);
router.put('/:id', userController.editar);
router.delete('/:id', userController.deletar);

export default router;
