# Portal Telecom EDP

Portal web corporativo para gestao centralizada de notificacoes, documentos, empresas compartilhantes e area administrativa da operacao de telecom.

## Fase atual

Estrutura visual e navegacao preparada.

Nesta etapa o portal nao possui dados reais, nao possui integracao ativa e nao conecta ao Neon Database. As telas exibem estados vazios profissionais enquanto aguardam as proximas integracoes.

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

## Autenticacao temporaria

Ainda nao existe autenticacao real. O arquivo `lib/auth-mock.ts` permite apenas navegacao local:

```text
admin@edp.com / admin123 -> /admin
empresa@teste.com / empresa123 -> /dashboard
```

Na proxima fase, esse fluxo deve ser substituido por login real com Neon Database, senhas criptografadas, sessoes e RBAC.

## Variaveis de ambiente

Use `.env.example` como referencia quando as integracoes reais forem iniciadas:

```env
DATABASE_URL=
AUTH_SECRET=
NEXT_PUBLIC_APP_URL=
NOTIFICATION_API_URL=
NOTIFICATION_API_TOKEN=
BLOB_READ_WRITE_TOKEN=
```

Nao inclua credenciais, tokens ou connection strings reais no repositorio.

## Rotas principais

- `/` Landing page institucional
- `/auth/login` Login temporario para navegacao
- `/auth/register` Solicitacao visual de acesso
- `/dashboard` Dashboard da empresa
- `/dashboard/notifications` Notificacoes da empresa
- `/dashboard/notifications/[id]` Estado de detalhe preparado
- `/dashboard/documents` Documentos da empresa
- `/dashboard/map` Area de concessao
- `/dashboard/profile` Perfil da empresa
- `/admin` Painel administrativo
- `/admin/companies` Empresas
- `/admin/users` Usuarios
- `/admin/notifications` Notificacoes administrativas
- `/admin/documents` Documentos administrativos
- `/admin/integrations` Integracoes e origem das notificacoes
- `/admin/settings` Configuracoes

## Estrutura

```text
app/                  Rotas do App Router
components/brand/     Logo e componentes de marca
components/layout/    Shells, headers e navegacao
components/ui/        Design system reutilizavel
components/dashboard/ Componentes da area da empresa
components/admin/     Componentes administrativos
data/                 Listas estruturais e colecoes vazias
lib/                  Auth temporario, DB placeholder, notificacoes e utils
types/                Contratos TypeScript para Neon, RBAC e notificacoes
public/               Assets visuais, favicon e logo EDP
```

## Arquitetura de notificacoes

Arquivos preparados:

- `types/notification.ts`
- `lib/notifications.ts`
- `lib/integrations/notification-source.ts`

Esses arquivos deixam o contrato pronto para receber notificacoes por API externa, validar payload, mapear para o modelo interno e vincular cada registro a uma empresa. A origem inicial prevista para etapa futura e a API Base44, mas ela nao e uma pagina ou modulo do usuario final.

## Preparacao Neon Database

`lib/db.ts` contem apenas o placeholder de conexao futura via `DATABASE_URL`.

`types/database.ts` modela:

- `User`
- `Company`
- `UserRole`
- `UserStatus`
- `Notification`
- `NotificationStatus`
- `Document`
- `AuditLog`

## Proximas fases

1. Integracao com Neon Database para autenticacao.
2. Integracao com API externa de notificacoes.
3. Persistencia de notificacoes e documentos.
4. Upload e armazenamento de PDFs.
5. Auditoria, rastreabilidade e permissoes reais.
6. Deploy final na Vercel com variaveis de ambiente.

## Seguranca

- Nao ha secrets no codigo.
- `.env` e `.env*.local` estao ignorados pelo Git.
- O portal exibe estados vazios enquanto nao houver integracao ativa.
