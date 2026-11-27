import * as quizModel from '../models/quiz.model.js';
import { ErroDeValidacao, ErroNaoEncontrado } from '../utils/erros.js';

function paraFormatoDaApi(documento) {
  return { id: documento._id.toHexString(), titulo: documento.titulo };
}

function validarTitulo(titulo) {
  if (typeof titulo !== 'string' || titulo.trim().length < 3) {
    throw new ErroDeValidacao('O título deve ter ao menos 3 caracteres.');
  }
  return titulo.trim();
}

export async function listar() {
  const documentos = await quizModel.buscarTodas();
  return documentos.map(paraFormatoDaApi);
}

export async function buscarPorId(id) {
  const documento = await quizModel.buscarPorId(id);
  if (!documento) throw new ErroNaoEncontrado('Quiz não encontrado.');
  return paraFormatoDaApi(documento);
}

export async function criar({ titulo } = {}) {
  const novoQuiz = { titulo: validarTitulo(titulo) };
  const insertedId = await quizModel.inserir(novoQuiz);
  return paraFormatoDaApi({ _id: insertedId, ...novoQuiz });
}

export async function editar(id, { titulo } = {}) {
  const campos = { titulo: validarTitulo(titulo) };
  const encontrou = await quizModel.atualizar(id, campos);
  if (!encontrou) throw new ErroNaoEncontrado('Quiz não encontrado.');
  return buscarPorId(id);
}

export async function deletar(id) {
  const removeu = await quizModel.remover(id);
  if (!removeu) throw new ErroNaoEncontrado('Quiz não encontrado.');
}