import { IMovieRepository, Movie } from '../repositories/movie.repository.interface';

export class ProducerService {
  private movieRepository: IMovieRepository;

  constructor(movieRepository: IMovieRepository) {
    this.movieRepository = movieRepository;
  }

  public async getProducerIntervals() {
    const movies = await this.movieRepository.findAll();

    if (movies.length === 0) {
      return { min: [], max: [] };
    }

    const groupedByProducer = this.groupMoviesByProducer(movies);

    const intervals = [];
    for (const [producer, wins] of Object.entries(groupedByProducer)) {
      const sortedWins = wins.sort((a, b) => a.year - b.year);
      for (let i = 1; i < sortedWins.length; i++) {
        const previousWin = sortedWins[i - 1].year;
        const followingWin = sortedWins[i].year;
        const interval = followingWin - previousWin;
        intervals.push({ producer, interval, previousWin, followingWin });
      }
    }

    if (intervals.length === 0) {
      return { min: [], max: [] };
    }

    const minIntervalValue = Math.min(...intervals.map((i) => i.interval));
    const maxIntervalValue = Math.max(...intervals.map((i) => i.interval));

    const minIntervals = intervals.filter((i) => i.interval === minIntervalValue);
    const maxIntervals = intervals.filter((i) => i.interval === maxIntervalValue);

    const uniqueMin = this.removeDuplicates(minIntervals);
    const uniqueMax = this.removeDuplicates(maxIntervals);

    return {
      min: uniqueMin,
      max: uniqueMax,
    };
  }

  private removeDuplicates(intervals: any[]) {
    const seen = new Set();
    return intervals.filter((interval) => {
      const key = JSON.stringify(interval);
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  private groupMoviesByProducer(movies: Movie[]) {
    const grouped: Record<string, Movie[]> = {};
    movies.forEach((movie) => {
      if (!grouped[movie.producer]) {
        grouped[movie.producer] = [];
      }
      grouped[movie.producer].push(movie);
    });
    return grouped;
  }
}