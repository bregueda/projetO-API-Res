import 'dotenv/config';
import app from './app.js';  

import { conectar, desconectar } from './config/database.js';

await conectar();
const servidor = app.listen(process.env.PORT || 3000, () => console.log('API em http://localhost:3000'));

process.on('SIGINT', encerrar);
process.on('SIGTERM', encerrar);
