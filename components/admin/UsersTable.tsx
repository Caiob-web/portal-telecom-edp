import { Badge } from "@/components/ui/Badge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";
import { mockUsers } from "@/data/mock-users";
import { formatDateTime } from "@/lib/utils";

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
        {mockUsers.map((user) => (
          <TR key={user.id}>
            <TD className="font-semibold text-graphite-950">{user.name}</TD>
            <TD>{user.email}</TD>
            <TD>{user.companyName ?? "EDP"}</TD>
            <TD>
              <Badge
                variant={
                  user.role === "ADMIN"
                    ? "blue"
                    : user.role === "EMPRESA"
                      ? "green"
                      : "gray"
                }
              >
                {user.role}
              </Badge>
            </TD>
            <TD>
              <Badge
                variant={
                  user.status === "ATIVO"
                    ? "green"
                    : user.status === "PENDENTE"
                      ? "amber"
                      : "gray"
                }
              >
                {user.status}
              </Badge>
            </TD>
            <TD>{formatDateTime(user.lastAccess)}</TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
