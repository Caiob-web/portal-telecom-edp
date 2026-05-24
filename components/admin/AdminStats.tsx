import { Building2, CheckCircle2, FileStack, Radio, UserRoundCog } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { mockAdminStats } from "@/data/mock-admin-stats";

export function AdminStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <StatCard
        title="Empresas"
        value={mockAdminStats.totals.companies}
        detail="6 ativas ou pendentes"
        icon={Building2}
        tone="blue"
      />
      <StatCard
        title="Usuarios"
        value={mockAdminStats.totals.users}
        detail="RBAC preparado"
        icon={UserRoundCog}
        tone="gray"
      />
      <StatCard
        title="Notificacoes"
        value={mockAdminStats.totals.notifications}
        detail="Recebidas no portal"
        icon={Radio}
        tone="green"
      />
      <StatCard
        title="Documentos"
        value={mockAdminStats.totals.documents}
        detail="PDFs e anexos"
        icon={FileStack}
        tone="blue"
      />
      <StatCard
        title="Finalizadas"
        value={mockAdminStats.totals.closedNotifications}
        detail="Fluxo administrativo"
        icon={CheckCircle2}
        tone="green"
      />
    </div>
  );
}
