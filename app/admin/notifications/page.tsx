import { NotificationsTable } from "@/components/admin/NotificationsTable";
import { AdminShell } from "@/components/layout/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getNotificationsForAdmin } from "@/lib/admin-data";

export default async function AdminNotificationsPage() {
  const notificationsResult = await getNotificationsForAdmin();

  return (
    <AdminShell
      title="Notificações administrativas"
      subtitle="Controle de notificações por empresa, município, rua, PDF, prazo e execução."
    >
      <Card>
        <CardHeader>
          <CardTitle>Central de notificações</CardTitle>
          <p className="mt-1 text-sm text-graphite-500">
            Lista real das notificações recebidas pela origem externa e persistidas no Neon.
          </p>
        </CardHeader>
        <CardContent>
          <NotificationsTable
            notifications={notificationsResult.rows}
            configured={notificationsResult.configured}
            error={notificationsResult.error}
          />
        </CardContent>
      </Card>
    </AdminShell>
  );
}
