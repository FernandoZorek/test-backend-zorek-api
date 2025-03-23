import request from 'supertest';
import startApp from '../src/app';

describe('Producer Intervals API', () => {
  let server: any;

  beforeAll(async () => {
    server = await startApp();
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      server.close(() => {
        console.log('Servidor encerrado.');
        resolve();
      });
    });
  });

  it('should return producer intervals', async () => {
    const response = await request(server).get('/producers/intervals');
    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('min');
    expect(response.body).toHaveProperty('max');

    expect(Array.isArray(response.body.min)).toBe(true);
    expect(Array.isArray(response.body.max)).toBe(true);

    expect(response.body.min[0]).toHaveProperty('producer');
    expect(response.body.min[0]).toHaveProperty('interval');
    expect(response.body.min[0]).toHaveProperty('previousWin');
    expect(response.body.min[0]).toHaveProperty('followingWin');

    expect(response.body.max[0]).toHaveProperty('producer');
    expect(response.body.max[0]).toHaveProperty('interval');
    expect(response.body.max[0]).toHaveProperty('previousWin');
    expect(response.body.max[0]).toHaveProperty('followingWin');
  });
});