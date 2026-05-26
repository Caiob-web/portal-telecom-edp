import { AlertCircle, Clock3, FileText, Inbox, PlugZap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatCard } from "@/components/ui/StatCard";

export function IntegrationStatusCard() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Notificações recebidas"
          value={0}
          detail="Origem não configurada"
          icon={Inbox}
          tone="blue"
        />
        <StatCard
          title="PDFs processados"
          value={0}
          detail="Aguardando storage"
          icon={FileText}
          tone="green"
        />
        <StatCard
          title="Falhas"
          value={0}
          detail="Sem execucao real"
          icon={AlertCircle}
          tone="amber"
        />
        <StatCard
          title="Ultima sincronização"
          value="--"
          detail="Nenhuma"
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
                Configuração técnica das origens externas responsáveis pelo envio de notificações e documentos.
              </p>
            </div>
            <Badge variant="amber">Não configurada</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-graphite-200 bg-graphite-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-graphite-500">
                Endpoint futuro
              </p>
              <p className="mt-2 font-mono text-sm text-graphite-700">
                NOTIFICATION_API_URL
              </p>
            </div>
            <div className="rounded-lg border border-graphite-200 bg-graphite-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-graphite-500">
                Token futuro
              </p>
              <p className="mt-2 font-mono text-sm text-graphite-700">
                NOTIFICATION_API_TOKEN
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-brand-100 bg-brand-50 p-5">
            <div className="flex items-start gap-3">
              <PlugZap className="mt-1 h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
              <p className="text-sm leading-6 text-brand-900">
                As notificações serão recebidas por uma API externa e vinculadas automaticamente à empresa correspondente após a configuração da integração.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <EmptyState
              icon={Clock3}
              title="Nenhum log de integração"
              description="Assim que a origem externa for configurada, os eventos de sincronização e falhas aparecerão aqui."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
