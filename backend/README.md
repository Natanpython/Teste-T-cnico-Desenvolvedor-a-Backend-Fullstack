# Product Manager API (Backend)

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-11-red?style=for-the-badge&logo=nestjs" />
  <img src="https://img.shields.io/badge/Prisma-7-blue?style=for-the-badge&logo=prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql" />
  <img src="https://img.shields.io/badge/Docker-ready-blue?style=for-the-badge&logo=docker" />
  <img src="https://img.shields.io/badge/Swagger-API-green?style=for-the-badge&logo=swagger" />
</p>

---

##  Sobre o projeto

API REST desenvolvida com **NestJS + Prisma + PostgreSQL + Docker**, responsável pelo gerenciamento de:

- Categorias (com suporte a hierarquia)
- Produtos (com relacionamento N:N com categorias)

O projeto foi construído com foco em:

- boas práticas de arquitetura
- validação robusta de dados
- organização modular
- código limpo e escalável

---

## Tecnologias

- **NestJS** → framework backend
- **Prisma ORM (v7)** → acesso ao banco
- **PostgreSQL** → banco de dados
- **Docker** → ambiente isolado
- **Swagger (OpenAPI)** → documentação
- **Class-validator** → validação de dados
- **Biome** → lint + formatação

## Observações importantes

- O banco deve estar rodando via Docker antes de iniciar a aplicação
- As migrations são responsáveis por criar a estrutura do banco
- O Swagger é a principal forma de testar a API

## Swagger
http://localhost:3000/docs


## Por que Prisma?

O Prisma oferece tipagem forte, migrations organizadas e uma camada clara para acesso ao banco de dados.

## Por que PostgreSQL com Docker?

O PostgreSQL é robusto e muito usado em produção. O Docker facilita a reprodução do ambiente em qualquer máquina.

## Por que Biome?

O Biome foi utilizado para padronizar lint e formatação com configuração simples e execução rápida.

## Por que Swagger?

O Swagger facilita a documentação e testes manuais da API, deixando os endpoints claros para avaliação técnica.

## OBS lembrese de criar um arquivo .env e colocar os dados do .env.exemple!

## Como rodar o projeto

```bash
# Subir o banco com Docker
docker compose up -d

# Instalar dependências
pnpm install

# Rodar migrations
pnpm db:migrate

# Gerar Prisma Client
pnpm db:generate

# Iniciar aplicação
pnpm start:dev