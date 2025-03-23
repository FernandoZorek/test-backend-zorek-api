export function mockTypeORMRepository(mockData: any[]) {
  jest.mock('typeorm', () => ({
    getRepository: jest.fn(() => ({
      find: jest.fn().mockResolvedValue(mockData),
    })),
  }));
}

export function clearMocks() {
  jest.clearAllMocks();
}