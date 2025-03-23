import { ProducerService } from './producer.service';
import { MockMovieRepository } from '../repositories/mock.movie.repository';
import {
  mockMovies,
  mockMoviesWithMultipleProducers,
  mockMoviesWithEqualIntervals,
  mockMoviesWithSingleProducer,
} from '../utils/testData';

describe('Producer Service', () => {
  describe('getProducerIntervals', () => {
    it('should calculate the min and max intervals', async () => {
      const mockRepository = new MockMovieRepository(mockMovies);
      const producerService = new ProducerService(mockRepository);
      const result = await producerService.getProducerIntervals();

      expect(result).toMatchSnapshot();
    });

    it('should handle cases with no winners', async () => {
      const mockRepository = new MockMovieRepository([]);
      const producerService = new ProducerService(mockRepository);
      const result = await producerService.getProducerIntervals();

      expect(result).toMatchSnapshot();
    });

    it('should handle cases with equal intervals for min and max', async () => {
      const mockRepository = new MockMovieRepository(mockMoviesWithEqualIntervals);
      const producerService = new ProducerService(mockRepository);
      const result = await producerService.getProducerIntervals();

      expect(result).toMatchSnapshot();
    });

    it('should handle cases with a single producer', async () => {
      const mockRepository = new MockMovieRepository(mockMoviesWithSingleProducer);
      const producerService = new ProducerService(mockRepository);
      const result = await producerService.getProducerIntervals();

      expect(result).toMatchSnapshot();
    });

    it('should handle cases with multiple producers in the same movie', async () => {
      const mockRepository = new MockMovieRepository(mockMoviesWithMultipleProducers);
      const producerService = new ProducerService(mockRepository);
      const result = await producerService.getProducerIntervals();

      expect(result).toMatchSnapshot();
    });
  });
});