import startApp from './app';

startApp()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    const url = `http://localhost:${PORT}`;
    console.log(`Servidor rodando em: ${url}`);
  })
  .catch((error) => {
    console.error('Erro ao iniciar a aplicação:', error);
    process.exit(1);
  });