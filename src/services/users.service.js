const users = []
let proximoId = 1;

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

export async function criar({ name }) {
  if (typeof name !== 'string' || name.trim().length < 3) {
    throw new ErroDeValidacao('O user deve ter ao menos 3 caracteres.');
  }
  const newUser = { name: name.trim(), concluida: false };
  const insertedId = await model.inserir(newUser);
  return paraFormatoDaApi({ _id: insertedId, ...newUser });
}
