import { Building2 } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";

export function CompaniesTable() {
  return (
    <div className="space-y-4">
      <Table>
        <THead>
          <TR>
            <TH>Empresa</TH>
            <TH>CNPJ</TH>
            <TH>E-mail principal</TH>
            <TH>Status</TH>
            <TH>Usuarios</TH>
            <TH>Notificacoes</TH>
            <TH>Ultimo acesso</TH>
            <TH className="text-right">Acoes</TH>
          </TR>
        </THead>
        <TBody>
          <TR>
            <TD colSpan={8} className="whitespace-normal p-0">
              <EmptyState
                icon={Building2}
                title="Nenhuma empresa cadastrada"
                description="As empresas reais serao exibidas aqui quando o cadastro administrativo estiver ativo."
              />
            </TD>
          </TR>
        </TBody>
      </Table>
    </div>
  );
}
