import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { buttonStyles } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";
import { mockNotifications } from "@/data/mock-notifications";
import { formatDate } from "@/lib/utils";

export default function CompanyNotificationsPage() {
  const notifications = mockNotifications.filter(
    (notification) => notification.companyId === "cmp-telefonica"
  );

  return (
    <DashboardShell
      title="Notificacoes"
      subtitle="Notificacoes recebidas pela empresa compartilhante."
    >
      <Table>
        <THead>
          <TR>
            <TH>ID</TH>
            <TH>Titulo</TH>
            <TH>Data de recebimento</TH>
            <TH>Status</TH>
            <TH>Municipio</TH>
            <TH>Tipo</TH>
            <TH className="text-right">Acoes</TH>
          </TR>
        </THead>
        <TBody>
          {notifications.map((notification) => (
            <TR key={notification.id}>
              <TD className="font-bold text-brand-700">{notification.id}</TD>
              <TD className="max-w-sm whitespace-normal font-semibold text-graphite-950">
                {notification.title}
              </TD>
              <TD>{formatDate(notification.receivedAt)}</TD>
              <TD>
                <StatusBadge status={notification.status} />
              </TD>
              <TD>{notification.municipality}</TD>
              <TD>{notification.type}</TD>
              <TD>
                <div className="flex justify-end">
                  <Link
                    href={`/dashboard/notifications/${notification.id}`}
                    className={buttonStyles("outline", "sm")}
                  >
                    Ver detalhes
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </DashboardShell>
  );
}
