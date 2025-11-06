# Librix

Librix é uma API RESTful de gerenciamento de biblioteca digital, desenvolvida com o objetivo de aprimorar habilidades em desenvolvimento back-end, explorando conceitos básicos, intermediários e avançados de TypeScript.

Esta é uma aplicação real sendo construída incrementalmente e evoluindo conforme novos conceitos são dominados.

---

## Stack Tecnológica

### Core
- **TypeScript** — Tipagem estática e ferramentas avançadas
- **NestJS** — Framework Node.js modular e escalável
- **TypeORM** — ORM com suporte a múltiplos bancos de dados
- **PostgreSQL** — Banco de dados relacional

### Ferramentas e Bibliotecas
- **class-validator** — Validação de DTOs
- **class-transformer** — Transformação e serialização de objetos
- **UUID** — Geração de identificadores únicos
- **Chalk** — Logs coloridos para melhor debugging

---

## Objetivos de Aprendizado

Este projeto está me ajudando a dominar:

### Já implementado
- Estrutura modular com NestJS
- CRUD completo (Users e Books)
- Validação robusta com DTOs e decorators
- Tipagem forte com TypeScript
- Persistência com TypeORM + PostgreSQL
- Boas práticas REST (status codes, endpoints semânticos)
- Response DTOs com class-transformer
- Tratamento de erros com exceptions do NestJS

### Em desenvolvimento
- Relacionamentos entre entidades (User ↔ Book empréstimos)
- Filtros avançados e paginação
- Migrations com TypeORM
- Testes unitários e E2E
- Autenticação JWT
- Documentação com Swagger/OpenAPI
- CI/CD pipeline

---

## Motivação

Escolhi NestJS por sua arquitetura modular inspirada no Angular, suporte nativo a TypeScript e vasta documentação.  
Permite aplicar princípios SOLID naturalmente.

---

## Por que TypeORM?

TypeORM oferece um equilíbrio entre produtividade e controle sobre queries SQL, além de excelente integração com NestJS e suporte a migrations.

---

## Padrões aplicados
- **Repository Pattern** — Abstração da camada de dados
- **DTO Pattern** — Separação de entrada/saída da API vs. entidades de domínio
- **Dependency Injection** — Facilita testes e desacoplamento
- **Decorator Pattern** — Validações declarativas com class-validator
