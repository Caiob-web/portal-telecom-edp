import {
  AlertTriangle,
  Building2,
  FileStack,
  PlugZap,
  Radio,
  UploadCloud,
  UserRoundCog
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import type { AdminDashboardStats } from "@/lib/admin-data";

const emptyStats: AdminDashboardStats = {
  companies: 0,
  pendingUsers: 0,
  notifications: 0,
  documents: 0,
  pendingExecution: 0,
  overdueNotifications: 0,
  activeIntegrations: 0,
  lastAccesses: 0
};

export function AdminStats({
  stats = emptyStats,
  configured = false
}: {
  stats?: AdminDashboardStats;
  configured?: boolean;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
      <StatCard
        title="Empresas cadastradas"
        value={stats.companies}
        detail={configured ? "Base real Neon" : "Banco não configurado"}
        icon={Building2}
        tone="blue"
      />
      <StatCard
        title="Usuários pendentes"
        value={stats.pendingUsers}
        detail="Aprovação administrativa"
        icon={UserRoundCog}
        tone="gray"
      />
      <StatCard
        title="Notificações recebidas"
        value={stats.notifications}
        detail="Via origem externa"
        icon={Radio}
        tone="green"
      />
      <StatCard
        title="PDFs vinculados"
        value={stats.documents}
        detail="Links recebidos"
        icon={FileStack}
        tone="blue"
      />
      <StatCard
        title="Execuções pendentes"
        value={stats.pendingExecution}
        detail="Aguardando upload"
        icon={UploadCloud}
        tone="amber"
      />
      <StatCard
        title="Prazos vencidos"
        value={stats.overdueNotifications}
        detail={stats.activeIntegrations ? "Integração ativa" : "Integração pendente"}
        icon={stats.activeIntegrations ? PlugZap : AlertTriangle}
        tone={stats.overdueNotifications ? "amber" : "green"}
      />
    </div>
  );
}
