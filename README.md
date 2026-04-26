# Product Manager (Fullstack)

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-11-red?style=for-the-badge&logo=nestjs" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql" />
  <img src="https://img.shields.io/badge/Playwright-E2E-green?style=for-the-badge&logo=playwright" />
</p>

---

## Objetivo

Desenvolver uma aplicação de gerenciamento de produtos com foco em:

- organização de código
- boas práticas de arquitetura
- clareza na tomada de decisão
- experiência do usuário

---

## Tecnologias

### Backend
- Node.js (v20+)
- TypeScript
- NestJS
- Prisma ORM
- PostgreSQL
- Docker

### Frontend
- React + Vite
- TypeScript
- React Router
- Axios

### Testes
- Playwright (E2E)

---

## Funcionalidades

### Produtos
- Criar produto
- Editar produto
- Excluir produto
- Listar produtos
- Buscar por nome ou código

### Categorias
- Listagem de categorias
- Associação com produtos

---

## API

### Categoria
- GET `/category`

### Produto
- GET `/product` (filtro por nome ou código)
- GET `/product/:id`
- POST `/product`
- PATCH `/product/:id`
- DELETE `/product/:id`

---

## Regras de negócio

- Produto deve possuir pelo menos uma categoria
- Preço não pode ser negativo
- Categoria não pode formar loop hierárquico

---

## Frontend

- Listagem em cards responsivos
- Filtro em tempo real (debounce)
- Modal para criação e edição
- Confirmação de exclusão customizada
- UX otimizada (sem reload de página)

---

## Testes E2E

Fluxos cobertos:

- Criar produto
- Filtrar produto
- Editar produto
- Excluir produto

##  Uso de Inteligência Artificial

### Ferramenta utilizada
- ChatGPT (OpenAI)

### Onde foi utilizada
A IA foi utilizada de forma pontual, principalmente para:

- apoio na definição de layout e melhorias de UI/UX
- auxílio na estruturação e escrita dos arquivos README

### O que foi adaptado
As sugestões foram analisadas e ajustadas conforme as necessidades do projeto, garantindo alinhamento com os requisitos propostos.

### Considerações
A lógica de negócio, implementação do backend, frontend e testes foram desenvolvidas manualmente. A IA foi utilizada apenas como apoio complementar.

##  Arquitetura

A aplicação foi organizada em camadas, separando responsabilidades entre interface, API, regras de negócio, ORM e banco de dados.

┌────────────────────────────┐
│        Frontend React       │
│  Vite + React Router + UI   │
└──────────────┬─────────────┘
               │ HTTP / Axios
               ▼
┌────────────────────────────┐
│        Backend NestJS       │
│ Controllers + Services      │
└──────────────┬─────────────┘
               │ Prisma Client
               ▼
┌────────────────────────────┐
│         Prisma ORM          │
│ Migrations + Models         │
└──────────────┬─────────────┘
               │ SQL
               ▼
┌────────────────────────────┐
│        PostgreSQL           │
│ Docker Container            │
└────────────────────────────┘

## Estrutura do BackEnd
backend/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
│
└── src/
    ├── database/
    │   ├── prisma.module.ts
    │   └── prisma.service.ts
    │
    ├── modules/
    │   ├── category/
    │   │   ├── category.controller.ts
    │   │   ├── category.module.ts
    │   │   └── category.service.ts
    │   │
    │   └── product/
    │       ├── dto/
    │       ├── product.controller.ts
    │       ├── product.module.ts
    │       └── product.service.ts
    │
    ├── app.module.ts
    └── main.ts

## Fluxo de requisição

Usuário
  ↓
Frontend React
  ↓
Axios
  ↓
Controller NestJS
  ↓
Service NestJS
  ↓
PrismaService
  ↓
PostgreSQL
  ↓
Resposta JSON

## AppModule
├── PrismaModule
├── CategoryModule
│   ├── CategoryController
│   └── CategoryService
└── ProductModule
    ├── ProductController
    ├── ProductService
    └── DTOs

## ORM (Prisma) Escolhido por:
- tipagem forte
- facilidade de uso
- migrations organizadas

## no Bash

git clone 