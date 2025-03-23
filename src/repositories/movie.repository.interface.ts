
export interface IMovieRepository {
    findAll(): Promise<Movie[]>;
  }
  
export interface Movie {
    [x: string]: any;
    producer: string;
    year: number;
  }