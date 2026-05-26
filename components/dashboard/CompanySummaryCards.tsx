import { AlertTriangle, CheckCircle2, FileText, Inbox } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

export function CompanySummaryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Notificações recebidas"
        value={0}
        detail="Aguardando origem externa"
        icon={Inbox}
        tone="blue"
      />
      <StatCard
        title="Em aberto"
        value={0}
        detail="Sem pendências reais"
        icon={AlertTriangle}
        tone="amber"
      />
      <StatCard
        title="Documentos disponíveis"
        value={0}
        detail="Sem documentos recebidos"
        icon={FileText}
        tone="green"
      />
      <StatCard
        title="Pendências"
        value={0}
        detail="Painel em preparacao"
        icon={CheckCircle2}
        tone="gray"
      />
    </div>
  );
}
