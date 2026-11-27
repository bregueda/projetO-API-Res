export class ErroDeValidacao extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'ErroDeValidacao';
  }
}

export class ErroNaoEncontrado extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'ErroNaoEncontrado';
  }
}

// Converte um erro lançado pelo service na resposta HTTP certa.
export function tratarErro(res, error) {
  if (error instanceof ErroDeValidacao) {
    return res.status(400).json({ erro: error.message });
  }
  if (error instanceof ErroNaoEncontrado) {
    return res.status(404).json({ erro: error.message });
  }
  console.error(error);
  return res.status(500).json({ erro: 'Erro interno do servidor.' });
}