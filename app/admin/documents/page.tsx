import { DocumentsTable } from "@/components/admin/DocumentsTable";
import { AdminShell } from "@/components/layout/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { getDocumentsForAdmin } from "@/lib/admin-data";

export default async function AdminDocumentsPage() {
  const documentsResult = await getDocumentsForAdmin();

  return (
    <AdminShell
      title="Documentos administrativos"
      subtitle="Todos os PDFs e documentos enviados ao portal."
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Repositório de documentos</CardTitle>
              <p className="mt-1 text-sm text-graphite-500">
                PDFs, anexos e links recebidos pela API externa serão listados aqui.
              </p>
            </div>
            <Input className="max-w-sm" placeholder="Buscar documento" />
          </div>
        </CardHeader>
        <CardContent>
          <DocumentsTable
            documents={documentsResult.rows}
            configured={documentsResult.configured}
            error={documentsResult.error}
          />
        </CardContent>
      </Card>
    </AdminShell>
  );
}
