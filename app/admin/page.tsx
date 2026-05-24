import { AdminStats } from "@/components/admin/AdminStats";
import { AdminShell } from "@/components/layout/AdminShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { mockAdminStats } from "@/data/mock-admin-stats";
import { mockNotifications } from "@/data/mock-notifications";
import { formatDateTime } from "@/lib/utils";

export default function AdminPage() {
  const maxMonthly = Math.max(
    ...mockAdminStats.monthlyNotifications.map((item) => item.total)
  );

  return (
    <AdminShell
      title="Painel administrativo"
      subtitle="Visao geral de empresas, usuarios, notificacoes e documentos."
    >
      <div className="space-y-6">
        <AdminStats />

        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <Card>
            <CardHeader>
              <CardTitle>Notificacoes por mes</CardTitle>
              <p className="mt-1 text-sm text-graphite-500">
                Grafico mockado para demonstrar o painel executivo.
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex h-72 items-end gap-4 rounded-lg bg-graphite-50 p-5">
                {mockAdminStats.monthlyNotifications.map((item) => (
                  <div key={item.month} className="flex flex-1 flex-col items-center gap-3">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-brand-800 to-edp-500 shadow-sm transition hover:opacity-85"
                      style={{ height: `${(item.total / maxMonthly) * 100}%` }}
                    />
                    <div className="text-center">
                      <p className="text-sm font-bold text-graphite-950">{item.total}</p>
                      <p className="text-xs font-semibold text-graphite-500">{item.month}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Empresas com mais pendencias</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockAdminStats.pendingByCompany.map((item) => (
                <div key={item.company}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-graphite-800">{item.company}</span>
                    <span className="font-bold text-brand-700">{item.total}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-graphite-100">
                    <div
                      className="h-2 rounded-full bg-edp-500"
                      style={{ width: `${(item.total / 8) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Ultimos acessos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockAdminStats.lastAccesses.map((access) => (
                <div
                  key={`${access.name}-${access.at}`}
                  className="flex items-center justify-between rounded-md border border-graphite-200 p-4"
                >
                  <div>
                    <p className="font-semibold text-graphite-950">{access.name}</p>
                    <p className="text-sm text-graphite-500">{access.company}</p>
                  </div>
                  <span className="text-sm font-semibold text-graphite-600">
                    {formatDateTime(access.at)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ultimas notificacoes recebidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockNotifications.slice(0, 4).map((notification) => (
                <div
                  key={notification.id}
                  className="rounded-md border border-graphite-200 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-bold text-brand-700">{notification.id}</p>
                    <Badge
                      variant={
                        notification.status === "NOVA"
                          ? "blue"
                          : notification.status === "EM_ANALISE"
                            ? "amber"
                            : "green"
                      }
                    >
                      {notification.status}
                    </Badge>
                  </div>
                  <p className="mt-2 font-semibold text-graphite-950">
                    {notification.companyName}
                  </p>
                  <p className="text-sm text-graphite-500">
                    {notification.municipality} | {notification.type}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
