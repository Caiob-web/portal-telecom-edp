import { IntegrationStatusCard } from "@/components/admin/IntegrationStatusCard";
import { AdminShell } from "@/components/layout/AdminShell";

export const dynamic = "force-dynamic";

export default function AdminIntegrationsPage() {
  return (
    <AdminShell
      title="Integrações"
      subtitle="Configuração das origens externas responsáveis pelo envio de notificações e documentos ao portal."
    >
      <IntegrationStatusCard />
    </AdminShell>
  );
}
