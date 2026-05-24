# Portal Telecom EDP

Primeira versao estrutural de um portal web profissional para gestao de telecom, notificacoes, empresas compartilhantes, documentos e area administrativa.

Esta etapa nao integra Base44, Neon Database ou Vercel Blob em producao. O projeto esta preparado para receber essas integracoes nas proximas fases, com dados mockados e placeholders explicitos.

## Stack

- Next.js com App Router
- TypeScript
- React
- Tailwind CSS
- lucide-react
- Estrutura pronta para deploy na Vercel

## Como rodar localmente

```bash
npm install
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

## Login mockado

Nesta versao nao existe autenticacao real. O arquivo `lib/auth-mock.ts` simula o login:

```text
admin@edp.com / admin123 -> /admin
empresa@teste.com / empresa123 -> /dashboard
```

## Variaveis de ambiente

Copie `.env.example` para `.env.local` apenas quando for iniciar integracoes reais:

```env
DATABASE_URL=
AUTH_SECRET=
BASE44_API_URL=
BASE44_API_TOKEN=
BLOB_READ_WRITE_TOKEN=
NEXT_PUBLIC_APP_URL=
```

Nao inclua credenciais reais no repositorio.

## Rotas principais

- `/` Landing page
- `/auth/login` Login mockado
- `/auth/register` Cadastro visual de empresa/usuario
- `/dashboard` Dashboard da empresa
- `/dashboard/notifications` Notificacoes da empresa
- `/dashboard/notifications/[id]` Detalhes da notificacao
- `/dashboard/documents` Documentos da empresa
- `/dashboard/map` Mapa visual mockado da area de concessao
- `/dashboard/profile` Perfil da empresa
- `/admin` Painel administrativo
- `/admin/companies` Empresas
- `/admin/users` Usuarios
- `/admin/notifications` Notificacoes administrativas
- `/admin/documents` Documentos administrativos
- `/admin/base44` Preparacao Base44
- `/admin/settings` Configuracoes

## Estrutura

```text
app/                 Rotas do App Router
components/layout/   Shells, headers e navegacao
components/ui/       Design system reutilizavel
components/dashboard Componentes da area da empresa
components/admin     Componentes administrativos
data/                Dados mockados
lib/                 Auth mock, Base44 placeholder, DB placeholder e utils
types/               Contratos TypeScript para Neon/RBAC/documentos
public/              Assets visuais estaticos
```

## Preparacao Base44

`lib/base44.ts` contem placeholders:

- `receiveBase44Notification()`
- `validateBase44Token()`
- `mapNotificationToCompany()`
- `processBase44Pdf()`

Essas funcoes retornam mocks e documentam onde a integracao real sera implementada.

## Preparacao Neon Database

`lib/db.ts` contem a estrutura inicial para futura conexao via `DATABASE_URL`.

`types/database.ts` ja modela:

- `User`
- `Company`
- `Notification`
- `Document`
- `AuditLog`
- `UserRole`
- `NotificationStatus`

## Proximas integracoes

1. Autenticacao real com Neon Database.
2. RBAC para perfis `ADMIN`, `EMPRESA` e `VISUALIZADOR`.
3. Recebimento/envio de notificacoes e PDFs via Base44.
4. Armazenamento de PDFs com Vercel Blob.
5. Deploy na Vercel com variaveis de ambiente.
6. Mapa real com Leaflet ou Mapbox.

## Observacoes de seguranca

- Nao ha secrets no codigo.
- `.env` e `.env*.local` estao ignorados pelo Git.
- Credenciais do login atual sao apenas mocks para navegacao.
