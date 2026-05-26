import { Building2, Clock3, FileStack, PlugZap, Radio, UserRoundCog } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { mockAdminStats } from "@/data/mock-admin-stats";

export function AdminStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
      <StatCard
        title="Empresas cadastradas"
        value={mockAdminStats.totals.companies}
        detail="Aguardando cadastro"
        icon={Building2}
        tone="blue"
      />
      <StatCard
        title="Usuários pendentes"
        value={mockAdminStats.totals.pendingUsers}
        detail="Fluxo preparado"
        icon={UserRoundCog}
        tone="gray"
      />
      <StatCard
        title="Notificações recebidas"
        value={mockAdminStats.totals.notifications}
        detail="Origem não configurada"
        icon={Radio}
        tone="green"
      />
      <StatCard
        title="Documentos disponíveis"
        value={mockAdminStats.totals.documents}
        detail="Aguardando recebimento"
        icon={FileStack}
        tone="blue"
      />
      <StatCard
        title="Integrações ativas"
        value={mockAdminStats.totals.activeIntegrations}
        detail="Não configurada"
        icon={PlugZap}
        tone="green"
      />
      <StatCard
        title="Últimos acessos"
        value={mockAdminStats.totals.lastAccesses}
        detail="Auditoria futura"
        icon={Clock3}
        tone="amber"
      />
    </div>
  );
}
