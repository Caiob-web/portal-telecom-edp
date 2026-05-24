import { IntegrationStatusCard } from "@/components/admin/IntegrationStatusCard";
import { AdminShell } from "@/components/layout/AdminShell";

export default function AdminBase44Page() {
  return (
    <AdminShell
      title="Integracao Base44"
      subtitle="Estrutura visual preparada. Nenhuma integracao real foi criada nesta etapa."
    >
      <IntegrationStatusCard />
    </AdminShell>
  );
}
