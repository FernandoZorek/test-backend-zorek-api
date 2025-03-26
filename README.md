# Test Backend Zorek API

API RESTful desenvolvida para calcular os intervalos entre prêmios consecutivos na categoria "Pior Filme" do Golden Raspberry Awards. O projeto utiliza Node.js, TypeScript, Express.js, TypeORM e SQLite.

---

## Requisitos do Sistema

1. **Node.js**: Versão 16 ou superior.
2. **Yarn**: Gerenciador de pacotes recomendado.
3. **Git**: Para clonar o repositório (opcional).

---

## Instalação

### 1. Clone o Repositório

Se você estiver usando Git, clone o repositório com o seguinte comando:

```bash
git clone https://github.com/FernandoZorek/test-backend-zorek-api.git
cd test-backend-zorek-api
```

### 2. Instale as Dependências

Instale todas as dependências necessárias usando Yarn:

```bash
yarn install

```

### 3. Configure as Variáveis de Ambiente

As variáveis de ambiente são usadas para configurar o comportamento da aplicação. Certifique-se de definir todas as variáveis no arquivo `.env`. Aqui está um exemplo completo:

```plaintext
PORT=3000
DB_TYPE=sqlite
DB_DATABASE=:memory:
DB_SYNCHRONIZE=true
DB_LOGGING=false
CSV_FILE_PATH='./data/movies.csv'
```

### **4. Execução**

Para iniciar o servidor localmente, execute:

```bash
yarn dev
```

O servidor estará disponível em:
http://localhost:3000



## Endpoints da API


### GET /producers/intervals

Retorna os produtores com:
- Dois prêmios mais rápido;
- Maior intervalo entre dois prêmios consecutivos;

**Exemplo de Resposta:**

```json
{
  "min": [
    {
      "producer": "Producer A",
      "interval": 1,
      "previousWin": 2000,
      "followingWin": 2001
    }
  ],
  "max": [
    {
      "producer": "Producer B",
      "interval": 5,
      "previousWin": 2000,
      "followingWin": 2005
    }
  ]
}
```


## Testes

### Executar Testes de Integração

Os testes de integração e unitarios garantem que a API funcione conforme o esperado. Execute-os com o seguinte comando:

```bash
yarn test
```


##  Documentação

A API é documentada automaticamente usando o Swagger, uma ferramenta que fornece uma interface interativa para visualizar e testar os endpoints disponíveis.

### Como Acessar a Documentação
Após iniciar o servidor, a documentação do Swagger estará disponível no seguinte endereço:

```bash
http://localhost:3000/api-docs
```



## Arquivo CSV

O arquivo `data/movie.csv` contém os dados dos filmes no seguinte formato:



## Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias e ferramentas:

- **Node.js**: Ambiente de execução JavaScript/TypeScript para desenvolvimento backend.
- **TypeScript**: Linguagem de programação que adiciona tipagem estática ao JavaScript, garantindo maior segurança e manutenibilidade do código.
- **Express.js**: Framework minimalista para construção de APIs RESTful.
- **TypeORM**: ORM (Object-Relational Mapping) para interação com o banco de dados, suportando SQLite e outros bancos de dados relacionais.
- **SQLite**: Banco de dados leve e embutido utilizado para armazenamento dos dados.
- **Jest**: Framework de testes para execução de testes unitários e de integração.
- **ts-node-dev**: Ferramenta para executar e reiniciar automaticamente o servidor durante o desenvolvimento (hot reload).
- **ESLint**: Ferramenta de linting para garantir a qualidade e consistência do código TypeScript.
- **dotenv**: Biblioteca para gerenciar variáveis de ambiente através do arquivo `.env`.
- **CSV Parsing**: Processamento de arquivos CSV utilizando funções utilitárias personalizadas (`csv-parser.ts`).

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).