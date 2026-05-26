import { Inbox } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";

export default function CompanyNotificationsPage() {
  return (
    <DashboardShell
      title="Notificações"
      subtitle="Notificações recebidas pela empresa compartilhante."
    >
      <Table>
        <THead>
          <TR>
            <TH>ID</TH>
            <TH>Titulo</TH>
            <TH>Data de recebimento</TH>
            <TH>Status</TH>
            <TH>Município</TH>
            <TH>Tipo</TH>
            <TH className="text-right">Ações</TH>
          </TR>
        </THead>
        <TBody>
          <TR>
            <TD colSpan={7} className="whitespace-normal p-0">
              <EmptyState
                icon={Inbox}
                title="Nenhuma notificação recebida"
                description="As notificações aparecerão aqui assim que forem disponibilizadas para a sua empresa pela integração configurada."
              />
            </TD>
          </TR>
        </TBody>
      </Table>
    </DashboardShell>
  );
}
