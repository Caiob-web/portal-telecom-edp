import { NotificationsTable } from "@/components/admin/NotificationsTable";
import { AdminShell } from "@/components/layout/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function AdminNotificationsPage() {
  return (
    <AdminShell
      title="Notificacoes administrativas"
      subtitle="Filtros por empresa, municipio, status e busca operacional."
    >
      <Card>
        <CardHeader>
          <CardTitle>Central de notificacoes</CardTitle>
          <p className="mt-1 text-sm text-graphite-500">
            Visual profissional com indicadores de visualizacao, resposta e PDF
            vinculado.
          </p>
        </CardHeader>
        <CardContent>
          <NotificationsTable />
        </CardContent>
      </Card>
    </AdminShell>
  );
}
