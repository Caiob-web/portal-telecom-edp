# Portal Telecom EDP

Portal web corporativo para gestao centralizada de empresas compartilhantes, solicitacoes de acesso, notificacoes, documentos e area administrativa da operacao de telecom.

## Fase atual

Estrutura visual, navegacao e primeira integracao real com Neon Database para solicitacoes de acesso.

Nesta etapa ja esta funcional:

- Cadastro de empresa e usuario em `/auth/register`
- Gravacao em `companies`, `users`, `access_requests` e `audit_logs`
- Hash de senha com `bcryptjs`
- Listagem administrativa de empresas em `/admin/companies`
- Listagem administrativa de solicitacoes em `/admin/users`
- Estados vazios quando `DATABASE_URL` nao estiver configurada

Ainda nao esta implementado:

- Login real com usuarios do Neon
- Aprovacao/reprovacao administrativa
- Integracao com origem externa de notificacoes
- Upload, leitura ou armazenamento real de PDFs

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

Build de producao:

```bash
npm run build
npm run start
```

## Variaveis de ambiente

Use `.env.example` como referencia:

```env
DATABASE_URL=
AUTH_SECRET=
NEXT_PUBLIC_APP_URL=
NOTIFICATION_API_URL=
NOTIFICATION_API_TOKEN=
BLOB_READ_WRITE_TOKEN=
```

Nao inclua credenciais, tokens ou connection strings reais no repositorio.

## Banco de dados

Para usar Neon localmente:

1. Crie um banco no Neon.
2. Copie a `DATABASE_URL` do projeto Neon.
3. Crie `.env.local` na raiz do projeto.
4. Insira `DATABASE_URL=` com a connection string real.
5. Abra o SQL Editor do Neon.
6. Execute o conteudo de [db/schema.sql](./db/schema.sql).
7. Rode `npm run dev`.
8. Teste o cadastro em `/auth/register`.

Para Vercel:

1. Acesse o projeto na Vercel.
2. Abra `Project Settings`.
3. Entre em `Environment Variables`.
4. Adicione `DATABASE_URL`.
5. Faca um novo deploy.

## Cadastro de acesso

O formulario em `/auth/register` envia os dados para:

```text
POST /api/auth/register
```

O endpoint:

- Valida campos obrigatorios
- Normaliza e-mail
- Remove mascara do CNPJ
- Verifica CNPJ duplicado
- Verifica e-mail duplicado
- Gera hash da senha
- Cria empresa
- Cria usuario pendente
- Cria solicitacao de acesso pendente
- Registra auditoria com `ACCESS_REQUEST_CREATED`

Respostas principais:

- `201`: solicitacao criada
- `400`: erro de validacao
- `409`: CNPJ ou e-mail duplicado
- `500`: erro interno ou banco indisponivel

## Autenticacao temporaria

O login real ainda nao foi conectado aos usuarios do Neon. O arquivo `lib/auth-mock.ts` segue apenas para navegacao local:

```text
admin@edp.com / admin123 -> /admin
empresa@teste.com / empresa123 -> /dashboard
```

Esse fluxo sera substituido por autenticacao real em fase posterior.

## Rotas principais

- `/` Landing page institucional sem dados operacionais publicos
- `/auth/login` Login temporario para navegacao
- `/auth/register` Solicitacao real de acesso
- `/api/auth/register` API server-side de cadastro
- `/dashboard` Dashboard da empresa
- `/dashboard/notifications` Notificacoes da empresa
- `/dashboard/notifications/[id]` Estado de detalhe preparado
- `/dashboard/documents` Documentos da empresa
- `/dashboard/map` Area de concessao
- `/dashboard/profile` Perfil da empresa
- `/admin` Painel administrativo
- `/admin/companies` Empresas reais do Neon
- `/admin/users` Solicitacoes reais de acesso
- `/admin/notifications` Notificacoes administrativas
- `/admin/documents` Documentos administrativos
- `/admin/integrations` Integracoes e origem das notificacoes
- `/admin/settings` Configuracoes

## Estrutura

```text
app/                  Rotas do App Router e route handlers
components/auth/      Telas e formularios de autenticacao
components/brand/     Logo e componentes de marca
components/layout/    Shells, headers e navegacao
components/landing/   Landing page institucional
components/ui/        Design system reutilizavel
components/dashboard/ Componentes da area da empresa
components/admin/     Componentes administrativos
data/                 Listas estruturais e colecoes vazias
db/                   Schema SQL para Neon/PostgreSQL
lib/                  DB, auth temporario, notificacoes e utils
types/                Contratos TypeScript para banco, RBAC e notificacoes
public/               Assets visuais, favicon e logo EDP
```

## Seguranca

- `DATABASE_URL` e secrets ficam apenas em variaveis de ambiente.
- `.env` e `.env*.local` estao ignorados pelo Git.
- Queries usam parametros.
- Senhas sao persistidas somente como hash.
- `password_hash` nao e retornado por APIs.
- Consultas ao banco rodam somente server-side.
- A landing publica nao exibe painel operacional, metricas internas ou dados administrativos.

## Proximas fases

1. Autenticacao real com usuarios aprovados.
2. Fluxo administrativo de aprovacao/rejeicao de solicitacoes.
3. Integracao com origem externa de notificacoes.
4. Persistencia de notificacoes e documentos.
5. Upload e armazenamento de PDFs.
6. Auditoria, rastreabilidade e permissoes reais.
