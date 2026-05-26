import { AlertCircle, Clock3, FileText, Inbox, PlugZap } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatCard } from "@/components/ui/StatCard";

export function IntegrationStatusCard() {
  const tokenConfigured = Boolean(process.env.NOTIFICATION_API_TOKEN?.trim());
  const databaseConfigured = Boolean(process.env.DATABASE_URL?.trim());
  const ready = tokenConfigured && databaseConfigured;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Notificações recebidas"
          value={0}
          detail="Contador real será conectado ao banco"
          icon={Inbox}
          tone="blue"
        />
        <StatCard
          title="Links processados"
          value={0}
          detail="PDFs e anexos por URL"
          icon={FileText}
          tone="green"
        />
        <StatCard
          title="Falhas"
          value={0}
          detail="Logs técnicos futuros"
          icon={AlertCircle}
          tone="amber"
        />
        <StatCard
          title="Última sincronização"
          value="--"
          detail="Recebimento por webhook"
          icon={Clock3}
          tone="gray"
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Origem das notificações</CardTitle>
              <p className="mt-1 text-sm text-graphite-500">
                Configuração técnica das origens externas responsáveis pelo envio
                de notificações, PDFs e links de documentos.
              </p>
            </div>
            <Badge variant={ready ? "green" : "amber"}>
              {ready ? "Preparada" : "Configuração pendente"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-graphite-200 bg-graphite-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-graphite-500">
                Endpoint de recebimento
              </p>
              <p className="mt-2 break-all font-mono text-sm text-graphite-700">
                POST /api/integrations/notifications
              </p>
            </div>
            <div className="rounded-2xl border border-graphite-200 bg-graphite-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-graphite-500">
                Autorização
              </p>
              <p className="mt-2 font-mono text-sm text-graphite-700">
                Authorization: Bearer NOTIFICATION_API_TOKEN
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-brand-100 bg-brand-50 p-5">
            <div className="flex items-start gap-3">
              <PlugZap className="mt-1 h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
              <p className="text-sm leading-6 text-brand-900">
                As notificações recebidas pela API externa serão persistidas no
                Neon. Quando o CNPJ existir em empresas cadastradas, o portal
                vincula automaticamente a notificação à empresa correspondente e
                salva os PDFs como links na tabela de documentos.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <EmptyState
              icon={Clock3}
              title="Nenhum log de integração"
              description="Assim que a origem externa enviar dados reais, os eventos de recebimento e falhas aparecerão aqui."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
