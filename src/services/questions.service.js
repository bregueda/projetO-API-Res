import * as questionModel from '../models/questions.model.js';
import * as quizModel from '../models/quiz.model.js';
import { ErroDeValidacao, ErroNaoEncontrado } from '../utils/erros.js';

function paraFormatoDaApi(documento) {
  return {
    id: documento._id.toHexString(),
    quizId: documento.quizId,
    enunciado: documento.enunciado,
  };
}

function validarEnunciado(enunciado) {
  if (typeof enunciado !== 'string' || enunciado.trim().length < 3) {
    throw new ErroDeValidacao('O enunciado deve ter ao menos 3 caracteres.');
  }
  return enunciado.trim();
}

export async function listar() {
  const documentos = await questionModel.buscarTodas();
  return documentos.map(paraFormatoDaApi);
}

export async function buscarPorId(id) {
  const documento = await questionModel.buscarPorId(id);
  if (!documento) throw new ErroNaoEncontrado('Pergunta não encontrada.');
  return paraFormatoDaApi(documento);
}

export async function buscarPorQuiz(quizId) {
  const quiz = await quizModel.buscarPorId(quizId);
  if (!quiz) throw new ErroNaoEncontrado('Quiz não encontrado.');
  const documentos = await questionModel.buscarPorQuiz(quizId);
  return documentos.map(paraFormatoDaApi);
}

export async function criar({ quizId, enunciado } = {}) {
  const enunciadoLimpo = validarEnunciado(enunciado);
  if (typeof quizId !== 'string' || !(await quizModel.buscarPorId(quizId))) {
    throw new ErroDeValidacao('quizId inválido: o quiz informado não existe.');
  }
  const novaPergunta = { quizId, enunciado: enunciadoLimpo };
  const insertedId = await questionModel.inserir(novaPergunta);
  return paraFormatoDaApi({ _id: insertedId, ...novaPergunta });
}

export async function editar(id, { enunciado } = {}) {
  const campos = { enunciado: validarEnunciado(enunciado) };
  const encontrou = await questionModel.atualizar(id, campos);
  if (!encontrou) throw new ErroNaoEncontrado('Pergunta não encontrada.');
  return buscarPorId(id);
}

export async function deletar(id) {
  const removeu = await questionModel.remover(id);
  if (!removeu) throw new ErroNaoEncontrado('Pergunta não encontrada.');
}