import swaggerJSDoc from 'swagger-jsdoc';
const PORT = process.env.PORT || 3000;
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Intervalos de Produtores',
      version: '1.0.0',
      description: 'API para calcular intervalos entre vitórias de produtores de filmes.',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Ambiente de desenvolvimento',
      },
    ],
  },
  apis: ['./src/controllers/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);