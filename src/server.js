import 'dotenv/config';
import app from './app.js';
import { conectar, desconectar } from './config/database.js';

const porta = process.env.PORT || 3000;

try {
  await conectar();
} catch (error) {
  console.error('Não foi possível conectar ao MongoDB:', error.message);
  console.error('Ele está rodando? Tente: npm run db:up (precisa do Docker) ou ajuste MONGODB_URI no .env');
  process.exit(1);
}

const servidor = app.listen(porta, () => console.log(`API em http://localhost:${porta}`));

async function encerrar() {
  console.log('\nEncerrando...');
  servidor.close(async () => {
    await desconectar();
    process.exit(0);
  });
}

process.on('SIGINT', encerrar);
process.on('SIGTERM', encerrar);