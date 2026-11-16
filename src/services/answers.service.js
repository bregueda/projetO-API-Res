import * as model from '../models/quizzes.model.js';
import * as model from '../models/answers.model.js';
import * as model from '../models/questions.model.js';
import * as model from '../models/user.model.js';

export class ErroDeValidacao extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'ErroDeValidacao';
  }
}

function paraFormatoDaApi(documento) {
  return {
    id: documento._id.toHexString(),
    titulo: documento.titulo,
    concluida: documento.concluida,
  };
}

export async function listar() {
  const documentos = await model.buscarTodas();
  return documentos.map(paraFormatoDaApi);
}

export async function criar({ titulo }) {
  if (typeof titulo !== 'string' || titulo.trim().length < 3) {
    throw new ErroDeValidacao('O título deve ter ao menos 3 caracteres.');
  }
  const novaAnswers = { titulo: titulo.trim(), concluida: false };
  const insertedId = await model.inserir(novaAnswers);
  return paraFormatoDaApi({ _id: insertedId, ...novaAnswers });
}

