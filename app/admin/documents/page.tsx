import { DocumentsTable } from "@/components/admin/DocumentsTable";
import { AdminShell } from "@/components/layout/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function AdminDocumentsPage() {
  return (
    <AdminShell
      title="Documentos administrativos"
      subtitle="Todos os PDFs e documentos enviados ao portal."
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Repositorio de documentos</CardTitle>
              <p className="mt-1 text-sm text-graphite-500">
                Estrutura preparada para PDFs recebidos por API, upload manual e armazenamento futuro.
              </p>
            </div>
            <Input className="max-w-sm" placeholder="Buscar documento" />
          </div>
        </CardHeader>
        <CardContent>
          <DocumentsTable />
        </CardContent>
      </Card>
    </AdminShell>
  );
}
