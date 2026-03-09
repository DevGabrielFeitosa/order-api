# Order API

API para autenticação e gerenciamento de pedidos.

## Tecnologias

- Node.js
- Express
- PostgreSQL
- JWT
- Node PG Migrate

## Pré-requisitos

- Node.js instalado
- PostgreSQL instalado e em execução
- Criar um banco chamado `ordersdb`
- Subir o PostgreSQL na porta `5433`
- Usar as credenciais padrão do projeto:
  - usuário: `postgres`
  - senha: `postgres`

## Como executar

- `npm install` (para instalar as dependências)
- `npm run migrate up` (para rodar as migrations)
- `npm run start || npm run dev` (para rodar em ambiente de produção ou desenvolvimento, respectivamente)

## Ambiente

- API disponível em: `http://localhost:3000`
- Porta da aplicação: `3000`
- Banco configurado atualmente: PostgreSQL em `localhost:5433`
- Database: `ordersdb`

## Documentação da API

- Postman: https://documenter.getpostman.com/view/25011304/2sBXcLhJJb