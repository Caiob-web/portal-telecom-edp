import { CompaniesTable } from "@/components/admin/CompaniesTable";
import { AdminShell } from "@/components/layout/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function AdminCompaniesPage() {
  return (
    <AdminShell
      title="Empresas"
      subtitle="Cadastro, status e acompanhamento das empresas compartilhantes."
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Empresas cadastradas</CardTitle>
              <p className="mt-1 text-sm text-graphite-500">
                Tabela mockada com drawer visual de detalhes.
              </p>
            </div>
            <Input className="max-w-sm" placeholder="Buscar empresa ou CNPJ" />
          </div>
        </CardHeader>
        <CardContent>
          <CompaniesTable />
        </CardContent>
      </Card>
    </AdminShell>
  );
}
