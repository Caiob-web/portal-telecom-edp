import { AlertCircle, CheckCircle2, Clock3, DatabaseZap, FileText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { mockAdminStats } from "@/data/mock-admin-stats";
import { formatDateTime } from "@/lib/utils";

export function IntegrationStatusCard() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Recebidas via Base44"
          value={0}
          detail="Aguardando configuracao"
          icon={DatabaseZap}
          tone="blue"
        />
        <StatCard
          title="PDFs processados"
          value={0}
          detail="Mock estrutural"
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
          title="Ultima sincronizacao"
          value="--"
          detail="Nao configurada"
          icon={Clock3}
          tone="gray"
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Status da integracao</CardTitle>
              <p className="mt-1 text-sm text-graphite-500">
                Estrutura visual pronta para receber endpoint, token e logs reais.
              </p>
            </div>
            <Badge variant="amber">Nao configurada</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-graphite-200 bg-graphite-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-graphite-500">
                Endpoint futuro
              </p>
              <p className="mt-2 font-mono text-sm text-graphite-700">
                BASE44_API_URL
              </p>
            </div>
            <div className="rounded-lg border border-graphite-200 bg-graphite-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-graphite-500">
                Token futuro
              </p>
              <p className="mt-2 font-mono text-sm text-graphite-700">
                BASE44_API_TOKEN
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {mockAdminStats.base44Logs.map((log) => (
              <div
                key={log.id}
                className="flex flex-col gap-2 rounded-md border border-graphite-200 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-edp-600" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-graphite-950">{log.event}</p>
                    <p className="text-sm text-graphite-500">{formatDateTime(log.at)}</p>
                  </div>
                </div>
                <Badge variant="outline">{log.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
