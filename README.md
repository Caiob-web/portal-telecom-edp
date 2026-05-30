# Portal Telecom EDP

Portal web corporativo para gest?o centralizada de empresas compartilhantes, solicita??es de acesso, notifica??es, documentos e ?rea administrativa da opera??o de telecom.

## Fase atual

Estrutura visual, navega??o e primeira integra??o real com Neon Database para solicita??es de acesso.

Nesta etapa j? est? funcional:

- Cadastro de empresa e usu?rio em `/auth/register`
- Grava??o em `companies`, `portal_users`, `access_requests` e `audit_logs`
- Hash de senha com `bcryptjs`
- Listagem administrativa de empresas em `/admin/companies`
- Listagem administrativa de solicita??es em `/admin/users`
- Estados vazios quando `DATABASE_URL` n?o estiver configurada

Ainda n?o est? implementado:

- Login real com usu?rios do Neon
- Aprova??o/reprova??o administrativa
- Integra??o com origem externa de notifica??es
- Upload manual, leitura avan?ada ou armazenamento pr?prio de PDFs

## Stack

- Next.js com App Router
- TypeScript
- React
- Tailwind CSS
- Neon Database/PostgreSQL
- `@neondatabase/serverless`
- `bcryptjs`
- lucide-react
- Deploy preparado para Vercel

## Como rodar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Acesse:

```text
http://localhost:3000
```

Build de produ??o:

```bash
npm run build
npm run start
```

## Vari?veis de ambiente

Use `.env.example` como refer?ncia:

```env
DATABASE_URL=
AUTH_SECRET=
NEXT_PUBLIC_APP_URL=
NOTIFICATION_API_URL=
NOTIFICATION_API_TOKEN=
BLOB_READ_WRITE_TOKEN=
```

N?o inclua credenciais, tokens ou connection strings reais no reposit?rio.

## Banco de dados

Para usar Neon localmente:

1. Crie um banco no Neon.
2. Copie a `DATABASE_URL` do projeto Neon.
3. Crie `.env.local` na raiz do projeto.
4. Insira `DATABASE_URL=` com a connection string real.
5. Abra o SQL Editor do Neon.
6. Execute o conte?do de [db/schema.sql](./db/schema.sql).
7. Rode `npm run dev`.
8. Teste o cadastro em `/auth/register`.

Para Vercel:

1. Acesse o projeto na Vercel.
2. Abra `Project Settings`.
3. Entre em `Environment Variables`.
4. Adicione `DATABASE_URL`.
5. Fa?a um novo deploy.

## Cadastro de acesso

O formul?rio em `/auth/register` envia os dados para:

```text
POST /api/auth/register
```

O endpoint:

- Valida campos obrigat?rios
- Normaliza e-mail
- Remove m?scara do CNPJ
- Verifica CNPJ duplicado
- Verifica e-mail duplicado
- Gera hash da senha
- Cria empresa
- Cria usu?rio pendente
- Cria solicita??o de acesso pendente
- Registra auditoria com `ACCESS_REQUEST_CREATED`

Respostas principais:

- `201`: solicita??o criada
- `400`: erro de valida??o
- `409`: CNPJ ou e-mail duplicado
- `500`: erro interno ou banco indispon?vel

## Autentica??o tempor?ria

O login real ainda n?o foi conectado aos usu?rios do Neon. O arquivo `lib/auth-mock.ts` segue apenas para navega??o local:

```text
admin@edp.com / admin123 -> /admin
empresa@teste.com / empresa123 -> /dashboard
```

Esse fluxo ser? substitu?do por autentica??o real em fase posterior.

## Rotas principais

- `/` Landing page institucional sem dados operacionais p?blicos
- `/auth/login` Login tempor?rio para navega??o
- `/auth/register` Solicita??o real de acesso
- `/api/auth/register` API server-side de cadastro
- `/api/integrations/notifications` API server-side para recebimento de notifica??es externas
- `/dashboard` Dashboard da empresa
- `/dashboard/notifications` Notifica??es da empresa
- `/dashboard/notifications/[id]` Estado de detalhe preparado
- `/dashboard/documents` Documentos da empresa
- `/dashboard/map` ?rea de concess?o
- `/dashboard/profile` Perfil da empresa
- `/admin` Painel administrativo
- `/admin/companies` Empresas reais do Neon
- `/admin/users` Solicita??es reais de acesso
- `/admin/notifications` Notifica??es administrativas
- `/admin/documents` Documentos administrativos
- `/admin/integrations` Integra??es e origem das notifica??es
- `/admin/settings` Configura??es

## Estrutura

```text
app/                  Rotas do App Router e route handlers
components/auth/      Telas e formul?rios de autentica??o
components/brand/     Logo e componentes de marca
components/layout/    Shells, headers e navega??o
components/landing/   Landing page institucional
components/ui/        Design system reutiliz?vel
components/dashboard/ Componentes da ?rea da empresa
components/admin/     Componentes administrativos
data/                 Listas estruturais e cole??es vazias
db/                   Schema SQL para Neon/PostgreSQL
lib/                  DB, auth tempor?rio, notifica??es e utils
types/                Contratos TypeScript para banco, RBAC e notifica??es
public/               Assets visuais, favicon e logo EDP
```

## Seguran?a

- `DATABASE_URL` e secrets ficam apenas em vari?veis de ambiente.
- `.env` e `.env*.local` est?o ignorados pelo Git.
- Queries usam par?metros.
- Senhas s?o persistidas somente como hash.
- `password_hash` n?o ? retornado por APIs.
- Consultas ao banco rodam somente server-side.
- A landing p?blica n?o exibe painel operacional, m?tricas internas ou dados administrativos.

## Pr?ximas fases

1. Autentica??o real com usu?rios aprovados.
2. Fluxo administrativo de aprova??o/rejei??o de solicita??es.
3. Integra??o com origem externa de notifica??es.
4. Persist?ncia de notifica??es e documentos.
5. Upload e armazenamento de PDFs.
6. Auditoria, rastreabilidade e permiss?es reais.
