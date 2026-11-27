import { MongoClient } from 'mongodb';

let cliente = null;
let banco = null;

export async function conectar() {
  // Lê as variáveis aqui (e não no topo) para garantir que o dotenv já carregou o .env.
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
  const nomeBanco = process.env.DB_NAME || 'quizzes';

  cliente = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  await cliente.connect();
  banco = cliente.db(nomeBanco);
  console.log(`MongoDB conectado (banco "${nomeBanco}")`);
}

export function obterBanco() {
  if (!banco) {
    throw new Error('Banco não conectado. Chame conectar() antes de usar os models.');
  }
  return banco;
}

export async function desconectar() {
  if (cliente) {
    await cliente.close();
    cliente = null;
    banco = null;
  }
}