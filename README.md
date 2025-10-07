# mapaCultural

**Mapa Cultural** é uma API/serviço (backend) construída com Node.js e TypeScript para gerenciar e expor pontos, eventos e informações culturais de uma cidade/região. Este README é um modelo completo que você pode colar no `README.md` do repositório — ajuste as seções marcadas como `TODO` conforme necessário.

---

## 🚀 Visão geral

Uma aplicação para cadastrar, pesquisar e exibir locais e eventos culturais (museus, centros culturais, pontos de arte, etc.). Ideal para integrar com um frontend (web ou mobile), agregando informações de cada ponto cultural e possibilitando filtros por categorias, datas e localização.

## 🔧 Tecnologias

* Node.js (>= 18)
* TypeScript
* Prisma (ORM)
* Banco de dados: PostgreSQL / SQLite (ajuste conforme seu `.env`)
* Framework HTTP (Express, Fastify ou outro) — ajuste conforme o projeto
* Outras dependências: consulte `package.json` para lista completa

> O repositório já contém `prisma/` e configurações TypeScript — ajuste os detalhes do DB em `.env`.

## ✅ Recursos / Endpoints (exemplos)

> Estes são exemplos comuns para uma API cultural. Atualize com os endpoints reais do seu `src/`.

* `POST /auth/login` - autenticação (se houver)
* `GET /pontos` - listar pontos culturais
* `GET /pontos/:id` - detalhe de um ponto
* `POST /pontos` - criar novo ponto
* `PUT /pontos/:id` - atualizar ponto
* `DELETE /pontos/:id` - excluir ponto
* `GET /eventos` - listar eventos
* `GET /busca?query=…&categoria=…` - busca/filter

## 📦 Pré-requisitos

* Node.js (recomenda-se a versão LTS atual)
* npm ou yarn
* um banco de dados (Postgres, MySQL ou SQLite) — ver `prisma/schema.prisma` para o provider

## 🔁 Instalação (local)

```bash
# clonar o repositório
git clone https://github.com/handreykaleu/mapa-cultural.git
cd mapa-cultural

# instalar dependências
npm install
# ou
# yarn install
```

## 🛠 Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto (não comite `.env` real). Um exemplo mínimo:

```env
# .env.example
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
# ou para sqlite
# DATABASE_URL="file:./dev.db"

# Porta da API
PORT=3000

# Outras variáveis necessárias pelo projeto (JWT_SECRET, etc.)
JWT_SECRET=troque_esta_chave
```

> Ajuste as variáveis conforme as necessidades do seu projeto.

## 🗄 Banco de dados (Prisma)

Se estiver usando Prisma (pasta `prisma/` presente):

```bash
# gera o cliente prisma após alterar schema ou .env
npx prisma generate

# criar/migrar o banco (modo dev)
npx prisma migrate dev --name init

# abrir o studio (interface web do prisma)
npx prisma studio
```

Se estiver usando SQLite, o `DATABASE_URL` pode apontar para `file:./dev.db` — para Postgres/Prod ajuste a URL.

## 🏃 Executando localmente

Scripts sugeridos (ver `package.json` e ajuste conforme seu projeto):

```bash
# ambiente de desenvolvimento (com restart automático)
npm run dev

# compilar TypeScript
npm run build

# iniciar a versão compilada
npm start
```

## 🧪 Testes

Se você tiver testes, adicione instruções aqui. Exemplo:

```bash
npm run test
```

## ✅ Boas práticas e sugestões

* Mantenha variáveis sensíveis fora do repositório (`.env`, chaves, senhas).
* Adicione validação nas rotas (ex: `zod`, `joi` ou `yup`).
* Documente endpoints com Swagger/OpenAPI (já existe `swagger` no seu projeto? — se sim, insira link ou rota `/docs`).
* Configure ESLint + Prettier para manter padrão de código.

## 📁 Estrutura sugerida do projeto

```
mapa-cultural/
├─ prisma/
│  └─ schema.prisma
├─ src/
│  ├─ controllers/
│  ├─ routes/
│  ├─ services/
│  ├─ middlewares/
│  └─ index.ts
├─ .env
├─ package.json
├─ tsconfig.json
└─ README.md
```

## 🤝 Como contribuir

1. Fork o repositório
2. Crie uma branch: `git checkout -b feat/minha-funcionalidade`
3. Faça as mudanças e commit: `git commit -m "feat: descrição curta"`
4. Envie para o repositório remoto e abra um Pull Request

## 📜 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE`.

---

Se quiser, eu posso:

* gerar automaticamente um `README.md` já pronto e com comandos exatos retirados do `package.json` (posso buscar os scripts do `package.json` e inserir aqui),
* traduzir para inglês,
* adicionar badges (CI, cobertura, versão do Node) com base no `package.json`.

Diga qual dessas opções você prefere que eu faça agora — ou eu posso já inserir o `README.md` final no repositório (copie/cole) se quiser.
