import { getRepository } from 'typeorm';
import { IMovieRepository } from './movie.repository.interface';
import { Movie } from '../models/movie.entity';

export class MovieRepository implements IMovieRepository {
  private repository = getRepository(Movie);
  
  public async findAll(): Promise<any[]> {
    return await this.repository.query(`
        WITH SplitProducers AS (
          SELECT
            TRIM(value) AS producer,
            year
          FROM movie,
               json_each('["' || REPLACE(producers, ',', '","') || '"]')
          WHERE winner = true
        )
        SELECT
          producer,
          year
        FROM SplitProducers
        ORDER BY producer, year;
      `);
  }
}