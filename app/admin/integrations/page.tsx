import { IntegrationStatusCard } from "@/components/admin/IntegrationStatusCard";
import { AdminShell } from "@/components/layout/AdminShell";

export default function AdminIntegrationsPage() {
  return (
    <AdminShell
      title="Integracoes"
      subtitle="Configuracao das origens externas responsaveis pelo envio de notificacoes e documentos ao portal."
    >
      <IntegrationStatusCard />
    </AdminShell>
  );
}
