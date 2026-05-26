import { Database, UserRoundCog } from "lucide-react";
import type { AdminAccessRequestRow } from "@/lib/admin-data";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";

const requestStatusLabel: Record<AdminAccessRequestRow["requestStatus"], string> = {
  PENDING: "Pendente",
  APPROVED: "Aprovada",
  REJECTED: "Rejeitada"
};

export function UsersTable({
  requests,
  configured,
  error
}: {
  requests: AdminAccessRequestRow[];
  configured: boolean;
  error?: string;
}) {
  if (!configured) {
    return (
      <EmptyState
        icon={Database}
        title="Banco de dados não configurado"
        description="Configure a variavel DATABASE_URL para carregar solicitações de acesso do Neon."
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={Database}
        title="Não foi possível carregar solicitações"
        description={error}
      />
    );
  }

  if (!requests.length) {
    return (
      <EmptyState
        icon={UserRoundCog}
        title="Não há solicitações pendentes"
        description="As solicitações enviadas pelo cadastro aparecerão aqui para análise administrativa."
      />
    );
  }

  return (
    <Table>
      <THead>
        <TR>
          <TH>Nome</TH>
          <TH>E-mail</TH>
          <TH>Empresa</TH>
          <TH>CNPJ</TH>
          <TH>Município</TH>
          <TH>Status</TH>
          <TH>Data da solicitação</TH>
        </TR>
      </THead>
      <TBody>
        {requests.map((request) => (
          <TR key={request.id}>
            <TD className="font-semibold text-graphite-950">{request.fullName}</TD>
            <TD>{request.email}</TD>
            <TD>{request.companyLegalName}</TD>
            <TD>{request.cnpj}</TD>
            <TD>{request.mainCity || "-"}</TD>
            <TD>
              <Badge variant={request.requestStatus === "PENDING" ? "amber" : "gray"}>
                {requestStatusLabel[request.requestStatus]}
              </Badge>
            </TD>
            <TD>{formatDateTime(request.requestedAt)}</TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
