import { Building2, Database } from "lucide-react";
import type { AdminCompanyRow } from "@/lib/admin-data";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";

const statusLabel: Record<AdminCompanyRow["status"], string> = {
  PENDING: "Pendente",
  APPROVED: "Aprovada",
  BLOCKED: "Bloqueada",
  INACTIVE: "Inativa"
};

export function CompaniesTable({
  companies,
  configured,
  error
}: {
  companies: AdminCompanyRow[];
  configured: boolean;
  error?: string;
}) {
  if (!configured) {
    return (
      <EmptyState
        icon={Database}
        title="Banco de dados não configurado"
        description="Configure a variavel DATABASE_URL para carregar empresas do Neon."
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={Database}
        title="Não foi possível carregar empresas"
        description={error}
      />
    );
  }

  if (!companies.length) {
    return (
      <EmptyState
        icon={Building2}
        title="Nenhuma empresa cadastrada"
        description="As empresas aparecerão aqui quando solicitações reais forem enviadas pelo cadastro."
      />
    );
  }

  return (
    <Table>
      <THead>
        <TR>
          <TH>Razao social</TH>
          <TH>Nome fantasia</TH>
          <TH>CNPJ</TH>
          <TH>E-mail principal</TH>
          <TH>Telefone</TH>
          <TH>Município principal</TH>
          <TH>Status</TH>
          <TH>Data de cadastro</TH>
        </TR>
      </THead>
      <TBody>
        {companies.map((company) => (
          <TR key={company.id}>
            <TD className="font-semibold text-graphite-950">{company.legalName}</TD>
            <TD>{company.tradeName || "-"}</TD>
            <TD>{company.cnpj}</TD>
            <TD>{company.mainEmail}</TD>
            <TD>{company.phone || "-"}</TD>
            <TD>{company.mainCity || "-"}</TD>
            <TD>
              <Badge variant={company.status === "PENDING" ? "amber" : "gray"}>
                {statusLabel[company.status]}
              </Badge>
            </TD>
            <TD>{formatDate(company.createdAt)}</TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
