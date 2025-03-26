import { IMovieRepository } from '../repositories/movie.repository.interface';

export class ProducerService {
  constructor(private movieRepository: IMovieRepository) {}

  public async getProducerIntervals() {
    const rawData = await this.movieRepository.findAll();

    const groupedByProducer = this.groupMoviesByProducer(rawData);

    const intervals = [];
    for (const [producer, wins] of Object.entries(groupedByProducer)) {
      const sortedWins = wins.sort((a, b) => a - b);
      for (let i = 1; i < sortedWins.length; i++) {
        const previousWin = sortedWins[i - 1];
        const followingWin = sortedWins[i];
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

    return {
      min: minIntervals,
      max: maxIntervals,
    };
  }

  private groupMoviesByProducer(rawData: any[]): Record<string, number[]> {
    const grouped: Record<string, number[]> = {};
    rawData.forEach((row) => {
      if (!grouped[row.producer]) {
        grouped[row.producer] = [];
      }
      grouped[row.producer].push(row.year);
    });
    return grouped;
  }
}