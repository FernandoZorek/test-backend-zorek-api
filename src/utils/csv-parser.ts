import * as fs from 'fs';
import csvParser from 'csv-parser';
import { getRepository } from 'typeorm';
import { Movie } from '../models/movie.entity';

export async function loadMoviesFromCSV(filePath: string): Promise<void> {
  const repository = getRepository(Movie);


  await repository.clear();  // Limpa o banco antes de carregar os dados, podendo ser comentado/removido caso não seja esperado esse comportamento;

  return new Promise((resolve, reject) => {
    const moviesToSave: Partial<Movie>[] = [];
    const processingPromises: Promise<void>[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser({ separator: ';' }))
      .on('data', (row) => {
        const processingPromise = (async () => {
          try {
            if (!row.year || !row.title || !row.studios || !row.producers) {
              console.warn(`Linha ignorada: Dados inválidos - ${JSON.stringify(row)}`);
              return;
            }

            const year = parseInt(row.year, 10);
            if (isNaN(year)) {
              console.warn(`Linha ignorada: Ano inválido - ${row.year}`);
              return;
            }

            const existingMovie = await repository.findOne({
              where: { title: row.title.trim(), year },
            });

            if (existingMovie) {
              console.warn(`Filme já existe: ${row.title.trim()} (${year})`);
              return;
            }

            const movie: Partial<Movie> = {
              title: row.title.trim(),
              year,
              studios: row.studios.trim(),
              producers: row.producers.trim(),
              winner: row.winner === 'yes',
            };

            moviesToSave.push(movie);
          } catch (error) {
            console.error(`Erro ao processar linha: ${JSON.stringify(row)}`, error);
          }
        })();

        processingPromises.push(processingPromise);
      })
      .on('end', async () => {
        try {
          await Promise.all(processingPromises);
          if (moviesToSave.length > 0) {
            await repository.save(moviesToSave as Movie[]);
            console.log(`${moviesToSave.length} filmes carregados com sucesso.`);
          } else {
            console.log('Nenhum novo filme foi adicionado.');
          }
          resolve();
        } catch (error) {
          console.error('Erro ao salvar filmes no banco de dados:', error);
          reject(error);
        }
      })
      .on('error', (error) => {
        console.error('Erro ao ler o arquivo CSV:', error);
        reject(error);
      });
  });
}