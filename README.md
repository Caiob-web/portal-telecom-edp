# Portal Telecom EDP

Portal web corporativo para gestão centralizada de empresas compartilhantes, solicitações de acesso, notificações, documentos e área administrativa da operação de telecom.

## Fase atual

Estrutura visual, navegação e primeira integração real com Neon Database para solicitações de acesso.

Nesta etapa já está funcional:

- Cadastro de empresa e usuário em `/auth/register`
- Gravação em `companies`, `users`, `access_requests` e `audit_logs`
- Hash de senha com `bcryptjs`
- Listagem administrativa de empresas em `/admin/companies`
- Listagem administrativa de solicitações em `/admin/users`
- Estados vazios quando `DATABASE_URL` não estiver configurada

Ainda não está implementado:

- Login real com usuários do Neon
- Aprovação/reprovação administrativa
- Integração com origem externa de notificações
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

Build de produção:

```bash
npm run build
npm run start
```

## Variáveis de ambiente

Use `.env.example` como referência:

```env
DATABASE_URL=
AUTH_SECRET=
NEXT_PUBLIC_APP_URL=
NOTIFICATION_API_URL=
NOTIFICATION_API_TOKEN=
BLOB_READ_WRITE_TOKEN=
```

Não inclua credenciais, tokens ou connection strings reais no repositório.

## Banco de dados

Para usar Neon localmente:

1. Crie um banco no Neon.
2. Copie a `DATABASE_URL` do projeto Neon.
3. Crie `.env.local` na raiz do projeto.
4. Insira `DATABASE_URL=` com a connection string real.
5. Abra o SQL Editor do Neon.
6. Execute o conteúdo de [db/schema.sql](./db/schema.sql).
7. Rode `npm run dev`.
8. Teste o cadastro em `/auth/register`.

Para Vercel:

1. Acesse o projeto na Vercel.
2. Abra `Project Settings`.
3. Entre em `Environment Variables`.
4. Adicione `DATABASE_URL`.
5. Faça um novo deploy.

## Cadastro de acesso

O formulário em `/auth/register` envia os dados para:

```text
POST /api/auth/register
```

O endpoint:

- Valida campos obrigatórios
- Normaliza e-mail
- Remove máscara do CNPJ
- Verifica CNPJ duplicado
- Verifica e-mail duplicado
- Gera hash da senha
- Cria empresa
- Cria usuário pendente
- Cria solicitação de acesso pendente
- Registra auditoria com `ACCESS_REQUEST_CREATED`

Respostas principais:

- `201`: solicitação criada
- `400`: erro de validação
- `409`: CNPJ ou e-mail duplicado
- `500`: erro interno ou banco indisponível

## Autenticação temporária

O login real ainda não foi conectado aos usuários do Neon. O arquivo `lib/auth-mock.ts` segue apenas para navegação local:

```text
admin@edp.com / admin123 -> /admin
empresa@teste.com / empresa123 -> /dashboard
```

Esse fluxo será substituído por autenticação real em fase posterior.

## Rotas principais

- `/` Landing page institucional sem dados operacionais públicos
- `/auth/login` Login temporário para navegação
- `/auth/register` Solicitação real de acesso
- `/api/auth/register` API server-side de cadastro
- `/dashboard` Dashboard da empresa
- `/dashboard/notifications` Notificações da empresa
- `/dashboard/notifications/[id]` Estado de detalhe preparado
- `/dashboard/documents` Documentos da empresa
- `/dashboard/map` Área de concessão
- `/dashboard/profile` Perfil da empresa
- `/admin` Painel administrativo
- `/admin/companies` Empresas reais do Neon
- `/admin/users` Solicitações reais de acesso
- `/admin/notifications` Notificações administrativas
- `/admin/documents` Documentos administrativos
- `/admin/integrations` Integrações e origem das notificações
- `/admin/settings` Configurações

## Estrutura

```text
app/                  Rotas do App Router e route handlers
components/auth/      Telas e formulários de autenticação
components/brand/     Logo e componentes de marca
components/layout/    Shells, headers e navegação
components/landing/   Landing page institucional
components/ui/        Design system reutilizável
components/dashboard/ Componentes da área da empresa
components/admin/     Componentes administrativos
data/                 Listas estruturais e coleções vazias
db/                   Schema SQL para Neon/PostgreSQL
lib/                  DB, auth temporário, notificações e utils
types/                Contratos TypeScript para banco, RBAC e notificações
public/               Assets visuais, favicon e logo EDP
```

## Segurança

- `DATABASE_URL` e secrets ficam apenas em variáveis de ambiente.
- `.env` e `.env*.local` estão ignorados pelo Git.
- Queries usam parâmetros.
- Senhas são persistidas somente como hash.
- `password_hash` não é retornado por APIs.
- Consultas ao banco rodam somente server-side.
- A landing pública não exibe painel operacional, métricas internas ou dados administrativos.

## Próximas fases

1. Autenticação real com usuários aprovados.
2. Fluxo administrativo de aprovacao/rejeicao de solicitações.
3. Integração com origem externa de notificações.
4. Persistência de notificações e documentos.
5. Upload e armazenamento de PDFs.
6. Auditoria, rastreabilidade e permissões reais.
