import { DocumentList } from "@/components/dashboard/DocumentList";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function CompanyDocumentsPage() {
  return (
    <DashboardShell
      title="Documentos"
      subtitle="PDFs e anexos disponiveis para a empresa."
    >
      <Card>
        <CardHeader>
          <CardTitle>Documentos da empresa</CardTitle>
          <p className="mt-1 text-sm text-graphite-500">
            Lista mockada preparada para Base44, Vercel Blob e Neon Database.
          </p>
        </CardHeader>
        <CardContent>
          <DocumentList />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
