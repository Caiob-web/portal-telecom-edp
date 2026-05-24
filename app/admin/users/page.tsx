import { UsersTable } from "@/components/admin/UsersTable";
import { AdminShell } from "@/components/layout/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function AdminUsersPage() {
  return (
    <AdminShell
      title="Usuarios"
      subtitle="Perfis ADMIN, EMPRESA e VISUALIZADOR preparados para RBAC real."
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Usuarios do portal</CardTitle>
              <p className="mt-1 text-sm text-graphite-500">
                Estrutura preparada para autenticacao, permissoes e status no Neon Database.
              </p>
            </div>
            <Input className="max-w-sm" placeholder="Buscar usuario ou e-mail" />
          </div>
        </CardHeader>
        <CardContent>
          <UsersTable />
        </CardContent>
      </Card>
    </AdminShell>
  );
}
