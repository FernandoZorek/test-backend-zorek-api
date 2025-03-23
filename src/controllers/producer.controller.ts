import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { ProducerService } from '../services/producer.service';
import { IMovieRepository, Movie } from '../repositories/movie.repository.interface';
import { Movie as MovieEntity } from '../models/movie.entity';

/**
 * @swagger
 * /producers/intervals:
 *   get:
 *     summary: Retorna os intervalos mínimo e máximo entre vitórias de produtores.
 *     description: Calcula os intervalos mínimo e máximo entre vitórias de produtores com base nos dados do banco de dados.
 *     responses:
 *       200:
 *         description: Intervalos calculados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 min:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       producer:
 *                         type: string
 *                       interval:
 *                         type: integer
 *                       previousWin:
 *                         type: integer
 *                       followingWin:
 *                         type: integer
 *                 max:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       producer:
 *                         type: string
 *                       interval:
 *                         type: integer
 *                       previousWin:
 *                         type: integer
 *                       followingWin:
 *                         type: integer
 *       500:
 *         description: Erro interno do servidor.
 */

class MovieRepository implements IMovieRepository {
  private repository = getRepository(MovieEntity);

  public async findAll(): Promise<Movie[]> {
    const movies = await this.repository.find();
    return movies
      .filter((movie) => movie.winner)
      .flatMap((movie) =>
        movie.producers
          .split(/\s*,\s*|\s*and\s*/)
          .map((producer) => ({
            producer: producer.trim(),
            year: movie.year,
          }))
      );
  }
}

export const getProducerIntervalsController = async (_req: Request, res: Response) => {
  try {
    const movieRepository = new MovieRepository();
    const producerService = new ProducerService(movieRepository);
    const intervals = await producerService.getProducerIntervals();

    return res.status(200).json(intervals);
  } catch (error) {
    console.error('Erro ao calcular intervalos:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};