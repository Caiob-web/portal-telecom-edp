import Link from "next/link";
import { ExternalLink, Inbox } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";
import { getNotificationsForCompany } from "@/lib/admin-data";
import { getPortalSessionCookie } from "@/lib/session-cookie";
import { formatDateTime } from "@/lib/utils";

const statusLabel = {
  NOVA: "Nova",
  EM_ANALISE: "Em análise",
  RESPONDIDA: "Respondida",
  FINALIZADA: "Finalizada"
} as const;

export default async function CompanyNotificationsPage() {
  const session = await getPortalSessionCookie();
  const notificationsResult = await getNotificationsForCompany(session?.companyName);

  return (
    <DashboardShell
      title="Notificações"
      subtitle="Notificações recebidas pela empresa compartilhante."
    >
      {!notificationsResult.configured ? (
        <EmptyState
          icon={Inbox}
          title="Banco de dados não configurado"
          description="As notificações da empresa serão carregadas assim que a variável DATABASE_URL estiver configurada."
        />
      ) : notificationsResult.error ? (
        <EmptyState
          icon={Inbox}
          title="Não foi possível carregar notificações"
          description={notificationsResult.error}
        />
      ) : !notificationsResult.rows.length ? (
        <EmptyState
          icon={Inbox}
          title="Nenhuma notificação recebida"
          description="As notificações aparecerão aqui assim que forem disponibilizadas para a sua empresa pela origem externa."
        />
      ) : (
        <Table>
          <THead>
            <TR>
              <TH>ID</TH>
              <TH>Empresa</TH>
              <TH>Município</TH>
              <TH>Rua</TH>
              <TH>Prazo</TH>
              <TH>Status</TH>
              <TH>PDF</TH>
              <TH className="text-right">Ações</TH>
            </TR>
          </THead>
          <TBody>
            {notificationsResult.rows.map((notification) => (
              <TR key={notification.id}>
                <TD className="font-semibold text-graphite-950">
                  {notification.externalId}
                </TD>
                <TD>{notification.companyLegalName ?? notification.companyName ?? "-"}</TD>
                <TD>{notification.municipality ?? "-"}</TD>
                <TD>{notification.street ?? "-"}</TD>
                <TD>
                  {notification.dueAt
                    ? formatDateTime(notification.dueAt)
                    : notification.deadlineDays
                      ? `${notification.deadlineDays} dias`
                      : "-"}
                </TD>
                <TD>
                  <Badge variant={notification.status === "NOVA" ? "amber" : "gray"}>
                    {statusLabel[notification.status]}
                  </Badge>
                </TD>
                <TD>{notification.pdfLinked ? "Disponível" : "Pendente"}</TD>
                <TD className="text-right">
                  <div className="flex justify-end gap-2">
                    {notification.sourceUrl ? (
                      <a
                        href={notification.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={buttonStyles("outline", "sm")}
                      >
                        PDF
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : null}
                    <Link
                      href={`/dashboard/notifications/${notification.id}`}
                      className={buttonStyles("primary", "sm")}
                    >
                      Detalhes
                    </Link>
                  </div>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}
    </DashboardShell>
  );
}
