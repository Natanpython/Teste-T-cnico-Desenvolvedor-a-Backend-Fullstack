# Product Manager (Fullstack)

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-11-red?style=for-the-badge&logo=nestjs" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql" />
  <img src="https://img.shields.io/badge/Playwright-E2E-green?style=for-the-badge&logo=playwright" />
</p>

---

## Sobre o projeto

Aplicação fullstack para gerenciamento de produtos e categorias.

O sistema permite:

- Criar, editar e excluir produtos
- Associar produtos a categorias
- Buscar produtos por nome ou código
- Interface moderna com modal
- Testes E2E automatizados com Playwright

---

## Arquitetura

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- Validação com class-validator
- Documentação com Swagger

### Frontend
- React + Vite
- Axios para requisições
- CSS modularizado
- UI com modais e feedback visual

### Testes
- Playwright (E2E)
- Fluxo completo validado (CRUD)

---

##  Funcionalidades

### Produtos
- GET `/product` → lista produtos (filtro por nome ou código)
- GET `/product/:id`
- POST `/product`
- PATCH `/product/:id`
- DELETE `/product/:id`

### Categorias
- GET `/category`

### Regras de negócio
- Produto deve possuir ao menos uma categoria
- Preço não pode ser negativo
- Categoria não pode formar loop

---

## OBS os testes do playwright so funcionara se o back estiver rodando.

## OBS lembrese de criar um arquivo .env e colocar os dados do .env.exemple!


## teste E2E
- pnpm exec playwright test

## Modo visual
- pnpm exec playwright test --ui

## Como rodar o projeto

### Backend

```bash
cd backend

pnpm install

# subir banco
docker compose up -d

# rodar migrations
pnpm prisma migrate dev

# gerar client
pnpm prisma generate

# iniciar servidor
pnpm start:dev