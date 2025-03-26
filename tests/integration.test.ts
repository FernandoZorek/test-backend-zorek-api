import request from 'supertest';
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import startApp from '../src/app';

describe('Producer Intervals API and CSV Validation', () => {
  let server;

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

  it('should validate the CSV file headers', async () => {
  
    const csvFilePath = path.resolve(__dirname, '../data/movies.csv');
    const expectedHeaders = ['year', 'title', 'studios', 'producers', 'winner'];
  
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv({ separator: ';' }))
        .on('headers', (headers) => {
          try {
            expect(headers).toEqual(expectedHeaders);
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  });

  it('should validate the content of each line in the CSV file', async () => {
  
    const csvFilePath = path.resolve(__dirname, '../data/movies.csv');
    let rowCount = 0;
  
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv({ separator: ';' }))
        .on('data', (row) => {
          try {
            rowCount++;
  
            const year = parseInt(row.year, 10);
            expect(year).not.toBeNaN();
            expect(year).toBeGreaterThanOrEqual(1900);
            expect(year).toBeLessThanOrEqual(new Date().getFullYear());
  
            expect(typeof row.title).toBe('string');
            expect(row.title.trim().length).toBeGreaterThan(0);
  
            expect(typeof row.studios).toBe('string');
            expect(row.studios.trim().length).toBeGreaterThan(0);
  
            expect(typeof row.producers).toBe('string');
            const producers = row.producers.split(/[;,]/).map((p) => p.trim());
            producers.forEach((producer) => {
              expect(typeof producer).toBe('string');
              expect(producer.length > 0).toBe(true);
            });
  
            expect(['yes', '', undefined]).toContain(row.winner);
          } catch (error) {
            reject(error);
          }
        })
        .on('end', () => {
          try {
            expect(rowCount).toBeGreaterThan(0);
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  });

  it('should return producer intervals with the correct format', async () => {
    const expectedFormat = {
      min: [
        {
          producer: expect.any(String),
          interval: expect.any(Number),
          previousWin: expect.any(Number),
          followingWin: expect.any(Number),
        },
      ],
      max: [
        {
          producer: expect.any(String),
          interval: expect.any(Number),
          previousWin: expect.any(Number),
          followingWin: expect.any(Number),
        },
      ],
    };

    const response = await request(server).get('/producers/intervals');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(expectedFormat));
  });
});