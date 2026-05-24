import { UserRoundCog } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";

export function UsersTable() {
  return (
    <Table>
      <THead>
        <TR>
          <TH>Nome</TH>
          <TH>E-mail</TH>
          <TH>Empresa</TH>
          <TH>Perfil</TH>
          <TH>Status</TH>
          <TH>Ultimo acesso</TH>
        </TR>
      </THead>
      <TBody>
        <TR>
          <TD colSpan={6} className="whitespace-normal p-0">
            <EmptyState
              icon={UserRoundCog}
              title="Nenhum usuario cadastrado"
              description="Solicitacoes, usuarios e perfis de acesso aparecerao aqui apos a ativacao do cadastro administrativo."
            />
          </TD>
        </TR>
      </TBody>
    </Table>
  );
}
