import * as service from '../services/answers.service.js';
import { tratarErro } from '../utils/erros.js';

export async function listar(req, res) {
  try {
    res.json(await service.listar());
  } catch (error) {
    tratarErro(res, error);
  }
}

export async function buscarPorId(req, res) {
  try {
    res.json(await service.buscarPorId(req.params.id));
  } catch (error) {
    tratarErro(res, error);
  }
}

export async function buscarPorPergunta(req, res) {
  try {
    res.json(await service.buscarPorPergunta(req.params.questionId));
  } catch (error) {
    tratarErro(res, error);
  }
}

export async function criar(req, res) {
  try {
    res.status(201).json(await service.criar(req.body));
  } catch (error) {
    tratarErro(res, error);
  }
}

export async function editar(req, res) {
  try {
    res.json(await service.editar(req.params.id, req.body));
  } catch (error) {
    tratarErro(res, error);
  }
}

export async function deletar(req, res) {
  try {
    await service.deletar(req.params.id);
    res.status(204).send();
  } catch (error) {
    tratarErro(res, error);
  }
}