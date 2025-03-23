import { IMovieRepository, Movie } from './movie.repository.interface';

export class MockMovieRepository implements IMovieRepository {
  private movies: Movie[];

  constructor(mockData: Movie[]) {
    this.movies = mockData;
  }

  public async findAll(): Promise<Movie[]> {
    return this.movies;
  }
}