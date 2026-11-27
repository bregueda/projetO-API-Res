import * as userModel from '../models/user.model.js';
import { ErroDeValidacao, ErroNaoEncontrado } from '../utils/erros.js';

function paraFormatoDaApi(documento) {
  return { id: documento._id.toHexString(), name: documento.name };
}

function validarNome(name) {
  if (typeof name !== 'string' || name.trim().length < 3) {
    throw new ErroDeValidacao('O nome do usuário deve ter ao menos 3 caracteres.');
  }
  return name.trim();
}

export async function listar() {
  const documentos = await userModel.buscarTodas();
  return documentos.map(paraFormatoDaApi);
}

export async function buscarPorId(id) {
  const documento = await userModel.buscarPorId(id);
  if (!documento) throw new ErroNaoEncontrado('Usuário não encontrado.');
  return paraFormatoDaApi(documento);
}

export async function criar({ name } = {}) {
  const novoUsuario = { name: validarNome(name) };
  const insertedId = await userModel.inserir(novoUsuario);
  return paraFormatoDaApi({ _id: insertedId, ...novoUsuario });
}

export async function editar(id, { name } = {}) {
  const campos = { name: validarNome(name) };
  const encontrou = await userModel.atualizar(id, campos);
  if (!encontrou) throw new ErroNaoEncontrado('Usuário não encontrado.');
  return buscarPorId(id);
}

export async function deletar(id) {
  const removeu = await userModel.remover(id);
  if (!removeu) throw new ErroNaoEncontrado('Usuário não encontrado.');
}