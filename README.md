# Librix: API REST de Biblioteca Digital

Librix é uma API RESTful construída com NestJS e TypeScript para gerenciar uma biblioteca digital. O projeto serve como demonstração de técnicas de back-end aprendidas, seguindo uma arquitetura modular inspirada em Angular. Utiliza NestJS – um framework Node.js progressivo para criar aplicações servidor-side eficientes e escaláveis com TypeScript【41†L368-L372】 – em conjunto com TypeORM (um ORM compatível com Node.js e TypeScript) e PostgreSQL para persistência de dados. Para validação e transformação de dados usamos as bibliotecas **class-validator** (que aplica validações por meio de decorators em classes) e **class-transformer** (que permite converter objetos literais em instâncias de classes e vice-versa)【45†L326-L329】【47†L324-L328】. Além disso, a documentação da API é gerada automaticamente via Swagger/OpenAPI usando o módulo oficial `@nestjs/swagger`【51†L332-L334】.

## Tecnologias e Ferramentas

- **TypeScript** – Tipagem estática que aumenta a confiabilidade do código.  
- **NestJS** – Framework Node.js modular, construído com TypeScript【41†L368-L372】, que aplica princípios SOLID e facilita a criação de aplicações escaláveis.  
- **TypeORM** – ORM para TypeScript/JavaScript que oferece suporte a migrações, diversos tipos de relacionamentos e múltiplos bancos de dados【43†L257-L263】.  
- **PostgreSQL** – Banco de dados relacional robusto, usado para armazenar usuários, livros e empréstimos.  
- **class-validator** – Biblioteca de validação baseada em decorators para garantir integridade dos dados de entrada【45†L326-L329】.  
- **class-transformer** – Biblioteca que serializa/deserializa objetos de forma declarativa【47†L324-L328】.  
- **Swagger/OpenAPI** – Geração automática de documentação interativa da API usando o módulo oficial NestJS【51†L332-L334】.  
- Outras: **UUID** (identificadores únicos), **Chalk** (logs coloridos para debug), **dotenv** (variáveis de ambiente), entre outras utilidades para configuração e depuração.

## Funcionalidades Principais

- **CRUD Completo de Usuários e Livros:** Endpoints REST semânticos para criar, listar, atualizar e remover usuários e livros (ex.: `GET /books`, `POST /users`).  
- **Empréstimos (Loans):** Entidade que relaciona usuários e livros emprestados, permitindo registrar e consultar empréstimos realizados.  
- **Validação de Dados:** Todos os *DTOs* (Data Transfer Objects) usam decorators de validação para garantir entradas corretas (e.g. formatos de e-mail, tamanhos de texto)【45†L326-L329】.  
- **Resposta Padronizada:** As respostas usam objetos de saída (*Response DTOs*) transformados via class-transformer para incluir apenas os campos necessários【47†L324-L328】.  
- **Tratamento de Erros e Status HTTP:** Uso de exceptions do NestJS para retornar códigos HTTP adequados e mensagens claras de erro.  
- **Paginação e Filtros:** Possibilidade de listar registros paginados e filtrar resultados por critérios (ex.: consultar livros por autor ou categoria).  
- **Segurança:** Implementação de autenticação JWT. Endpoints protegidos exigem token válido para operações sensíveis (ex.: criação/remoção de recursos).  
- **Documentação Interativa:** Toda a API está documentada via Swagger; basta acessar a rota de docs para visualizar e testar os endpoints.  
- **Migrations:** Controle de esquema de banco de dados com migrações TypeORM, facilitando atualizações incrementais do banco.

## Exemplo de Uso

Após iniciar a aplicação, é possível testar os endpoints com cURL ou ferramentas como Postman:

- **Listar livros:**  
  ```bash
  curl -X GET http://localhost:3000/books
  ```  
  Retorna um JSON com a lista de livros cadastrados.  

- **Criar usuário:**  
  ```bash
  curl -X POST http://localhost:3000/auth/signup \
       -H "Content-Type: application/json" \
       -d '{"name":"João","email":"joao@exemplo.com, "senha":"senha"}'
  ```  
  Registra um novo usuário e retorna os dados criados.

- **Autenticar (JWT):**  
  ```bash
  curl -X POST http://localhost:3000/auth/signin \
       -H "Content-Type: application/json" \
       -d '{"email":"joao@exemplo.com","password":"senha"}'
  ```  
  Retorna um token JWT para uso em endpoints protegidos.

*(Observe que as rotas podem variar conforme configuração; use o endpoint `/api` se um prefixo tiver sido definido.)*

## Configuração e Execução

Para rodar o projeto localmente, proceda assim:

1. Clone o repositório: `git clone https://github.com/pedroOlvPinheiro/Librix.git`  
2. Entre na pasta: `cd Librix`  
3. Instale dependências: `npm install`  
4. Crie o arquivo `.env` com as variáveis de ambiente necessárias (ex.: dados de conexão do PostgreSQL, segredos JWT):  
   ```
   DATABASE_URL=postgres://<usuário>:<senha>@<host>:<porta>/<db>
   JWT_SECRET=<seu-segredo>
   ```  
5. Execute as migrações (se aplicável): `npm run typeorm migration:run`  
6. Inicie a aplicação em modo de desenvolvimento: `npm run start:dev`  

Após isso, a API estará disponível (por padrão em `http://localhost:3000`). Use o Swagger acessando `http://localhost:3000/api` para visualizar e testar os endpoints interativamente.

## Padrões e Boas Práticas

O projeto segue padrões consolidados de arquitetura e código limpo:

- **Arquitetura Modular NestJS:** Cada recurso (Users, Books, Loans) em módulo próprio, facilitando manutenção.  
- **Repository Pattern:** Uso de repositórios do TypeORM para abstrair operações de banco de dados.  
- **DTO Pattern:** Objetos de transferência (DTOs) separam as camadas de domínio e de interface da API.  
- **Injeção de Dependências:** Controladores e serviços desacoplados via injeção de dependências do NestJS, melhorando testabilidade.  
- **Decorators Declarativos:** Validações e transformações feitas via decorators (ex.: `@IsEmail()`, `@Exclude()`) para código mais legível e organizado.

Esta documentação foi atualizada para refletir o estado atual do projeto, incorporando todas as ferramentas e práticas aprendidas até o momento【41†L368-L372】【43†L257-L263】【45†L326-L329】【47†L324-L328】【51†L332-L334】. Com ela, qualquer desenvolvedor poderá entender o escopo, instalar facilmente o projeto e explorar suas funcionalidades de forma completa. 

**Fontes:** Documentação oficial do NestJS【41†L368-L372】, TypeORM【43†L257-L263】 e repositórios de *class-validator*【45†L326-L329】, *class-transformer*【47†L324-L328】 e *nestjs/swagger*【51†L332-L334】 para consulta.
