import { DocumentList } from "@/components/dashboard/DocumentList";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function CompanyDocumentsPage() {
  return (
    <DashboardShell
      title="Documentos"
      subtitle="PDFs e anexos vinculados às notificações."
    >
      <Card>
        <CardHeader>
          <CardTitle>Documentos da empresa</CardTitle>
          <p className="mt-1 text-sm text-graphite-500">
            Os documentos vinculados às notificações serão exibidos aqui quando forem recebidos pela integração.
          </p>
        </CardHeader>
        <CardContent>
          <DocumentList />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
