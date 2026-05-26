import { NotificationsTable } from "@/components/admin/NotificationsTable";
import { AdminShell } from "@/components/layout/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function AdminNotificationsPage() {
  return (
    <AdminShell
      title="Notificações administrativas"
      subtitle="Filtros por empresa, município, status e busca operacional."
    >
      <Card>
        <CardHeader>
          <CardTitle>Central de notificações</CardTitle>
          <p className="mt-1 text-sm text-graphite-500">
            Filtros e indicadores preparados para notificações reais enviadas pela origem externa.
          </p>
        </CardHeader>
        <CardContent>
          <NotificationsTable />
        </CardContent>
      </Card>
    </AdminShell>
  );
}
