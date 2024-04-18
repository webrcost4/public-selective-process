# API de Filmes

Bem-vindo ao projeto da API de Filmes! Este projeto tem como objetivo fornecer operações CRUD (Criar, Ler, Atualizar, Excluir) para gerenciar filmes em um banco de dados. Abaixo, você encontrará uma visão geral da estrutura do projeto, endpoints e minha experiência com NestJS e Prisma.

## Tecnologias Utilizadas

- **NestJS**: Um framework Node.js progressivo para construir aplicativos eficientes, confiáveis e escaláveis no lado do servidor.
- **Prisma**: Um kit de ferramentas de banco de dados moderno para TypeScript e Node.js que substitui ORMs tradicionais.

## Endpoints

### 1. Criar Filme

- **Método**: `POST`
- **Endpoint**: `/create-movie`
- **Descrição**: Adiciona um filme ao banco de dados.
- **Corpo da Requisição**:
  ```typescript
  {
    title: string,
    direction: string,
    year: number,
    filmImage: string
  }
  ```
- **Resposta**: Retorna o objeto do filme criado se bem-sucedido, ou uma mensagem de erro se falhar.

### 2. Listar Todos os Filmes

- **Método**: `GET`
- **Endpoint**: `/list-all-movies`
- **Descrição**: Recupera todos os filmes do banco de dados.
- **Resposta**: Retorna um array de objetos de filme e sua origem (cache ou banco de dados) se bem-sucedido, ou uma mensagem de erro se falhar.

### 3. Atualizar Filme

- **Método**: `PUT`
- **Endpoint**: `/update-movie/:id`
- **Descrição**: Atualiza um filme.
- **Parâmetro da URL**: `id` - O ID do filme a ser atualizado.
- **Corpo da Requisição**:
  ```typescript
  {
    title?: string,
    direction?: string,
    year?: number,
    filmImage?: string
  }
  ```
- **Resposta**: Retorna o objeto do filme atualizado se bem-sucedido, ou uma mensagem de erro se falhar.

### 4. Excluir Filme

- **Método**: `DELETE`
- **Endpoint**: `/:id`
- **Descrição**: Exclui um filme do banco de dados.
- **Parâmetro da URL**: `id` - O ID do filme a ser excluído.
- **Resposta**: Retorna uma mensagem de sucesso se bem-sucedido, ou uma mensagem de erro se falhar.

## Experiência com o Projeto

Este projeto marcou meu primeiro contato tanto com o NestJS quanto com o Prisma. Foi uma oportunidade empolgante para aprender sobre o desenvolvimento de APIs utilizando essas tecnologias modernas. A integração do NestJS com o Prisma proporcionou uma experiência de desenvolvimento suave e eficiente.

## Links do Projeto

- API Hospedada na Vercel: [link-da-api](https://sua-api.vercel.app)
