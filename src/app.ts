import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';
import { createConnection } from 'typeorm';
import { loadMoviesFromCSV } from './utils/csv-parser';
import { getProducerIntervalsController } from './controllers/producer.controller';
import 'reflect-metadata';

const app: Application = express();

app.use(express.json());
app.use('/api-docs', ...swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/producers/intervals', getProducerIntervalsController);

async function startApp() {
  try {
    await createConnection();
    await loadMoviesFromCSV(process.env.CSV_FILE_PATH || './data/movies.csv');
    console.log('Banco de dados inicializado e dados carregados com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados ou carregar dados:', error);
    process.exit(1);
  }

  const PORT = process.env.PORT || 3000;
  const server = app.listen(PORT);
  return server;
}

export default startApp;