import { UsersTable } from "@/components/admin/UsersTable";
import { AdminShell } from "@/components/layout/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { getAccessRequestsForAdmin } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const requestsResult = await getAccessRequestsForAdmin();

  return (
    <AdminShell
      title="Usuários"
      subtitle="Solicitações de acesso e usuários pendentes para análise administrativa."
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Solicitações de acesso</CardTitle>
              <p className="mt-1 text-sm text-graphite-500">
                Dados enviados pelo formulário de cadastro e carregados diretamente do Neon.
              </p>
            </div>
            <Input className="max-w-sm" placeholder="Buscar usuário ou e-mail" />
          </div>
        </CardHeader>
        <CardContent>
          <UsersTable
            requests={requestsResult.rows}
            configured={requestsResult.configured}
            error={requestsResult.error}
          />
        </CardContent>
      </Card>
    </AdminShell>
  );
}
