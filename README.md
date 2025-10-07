#🚀 Visão geral

Uma aplicação para cadastrar, pesquisar e exibir locais e eventos culturais (museus, centros culturais, pontos de arte, etc.).

#🔧 Tecnologias

Node.js (>= 18)

TypeScript

Prisma (ORM)

Banco de dados: PostgreSQL / SQLite (ajuste conforme seu .env)

Framework HTTP (Express, Fastify ou outro) — ajuste conforme o projeto

#📦 Pré-requisitos

Node.js (recomenda-se a versão LTS atual)

npm ou yarn

um banco de dados (Postgres, MySQL ou SQLite)

#🔁 Instalação (local)

# clonar o repositório
git clone https://github.com/handreykaleu/mapa-cultural.git
cd mapa-cultural

# instalar dependências
npm install
# ou
# yarn install

#🛠 Configuração do ambiente

Crie um arquivo .env na raiz do projeto (não comite .env real).

# .env.example
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
# ou para sqlite
# DATABASE_URL="file:./dev.db"

# Porta da API
PORT=3000

# Outras variáveis necessárias pelo projeto (JWT_SECRET, etc.)
JWT_SECRET=troque_esta_chave

#🗄 Banco de dados (Prisma)

# gera o cliente prisma após alterar schema ou .env
npx prisma generate

# criar/migrar o banco (modo dev)
npx prisma migrate dev --name init

# abrir o studio (interface web do prisma)
npx prisma studio

#🏃 Executando localmente

# ambiente de desenvolvimento (com restart automático)
npm run dev

# compilar TypeScript
npm run build

# iniciar a versão compilada
npm start

#📁 Estrutura sugerida do projeto

mapa-cultural/
├─ prisma/
│ └─ schema.prisma
├─ src/
│ ├─ controllers/
│ ├─ routes/
│ ├─ services/
│ ├─ middlewares/
│ └─ index.ts
├─ .env
├─ package.json
├─ tsconfig.json
└─ README.md

#📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE.
