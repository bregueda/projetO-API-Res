import * as answerModel from '../models/answers.model.js';
import * as questionModel from '../models/questions.model.js';
import { ErroDeValidacao, ErroNaoEncontrado } from '../utils/erros.js';

function paraFormatoDaApi(documento) {
  return {
    id: documento._id.toHexString(),
    questionId: documento.questionId,
    texto: documento.texto,
    correta: documento.correta,
  };
}

function validarTexto(texto) {
  if (typeof texto !== 'string' || texto.trim().length < 1) {
    throw new ErroDeValidacao('O texto da resposta é obrigatório.');
  }
  return texto.trim();
}

function validarCorreta(correta) {
  if (typeof correta !== 'boolean') {
    throw new ErroDeValidacao('O campo "correta" deve ser true ou false.');
  }
  return correta;
}

export async function listar() {
  const documentos = await answerModel.buscarTodas();
  return documentos.map(paraFormatoDaApi);
}

export async function buscarPorId(id) {
  const documento = await answerModel.buscarPorId(id);
  if (!documento) throw new ErroNaoEncontrado('Resposta não encontrada.');
  return paraFormatoDaApi(documento);
}

export async function buscarPorPergunta(questionId) {
  const pergunta = await questionModel.buscarPorId(questionId);
  if (!pergunta) throw new ErroNaoEncontrado('Pergunta não encontrada.');
  const documentos = await answerModel.buscarPorPergunta(questionId);
  return documentos.map(paraFormatoDaApi);
}

export async function criar({ questionId, texto, correta = false } = {}) {
  const textoLimpo = validarTexto(texto);
  validarCorreta(correta);
  if (typeof questionId !== 'string' || !(await questionModel.buscarPorId(questionId))) {
    throw new ErroDeValidacao('questionId inválido: a pergunta informada não existe.');
  }
  const novaResposta = { questionId, texto: textoLimpo, correta };
  const insertedId = await answerModel.inserir(novaResposta);
  return paraFormatoDaApi({ _id: insertedId, ...novaResposta });
}

export async function editar(id, { texto, correta } = {}) {
  const campos = {};
  if (texto !== undefined) campos.texto = validarTexto(texto);
  if (correta !== undefined) campos.correta = validarCorreta(correta);
  if (Object.keys(campos).length === 0) {
    throw new ErroDeValidacao('Informe "texto" e/ou "correta" para editar.');
  }
  const encontrou = await answerModel.atualizar(id, campos);
  if (!encontrou) throw new ErroNaoEncontrado('Resposta não encontrada.');
  return buscarPorId(id);
}

export async function deletar(id) {
  const removeu = await answerModel.remover(id);
  if (!removeu) throw new ErroNaoEncontrado('Resposta não encontrada.');
}