import { AlertTriangle, CheckCircle2, FileText, Inbox } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { mockDocuments } from "@/data/mock-documents";
import { mockNotifications } from "@/data/mock-notifications";

export function CompanySummaryCards() {
  const companyNotifications = mockNotifications.filter(
    (item) => item.companyId === "cmp-telefonica"
  );
  const open = companyNotifications.filter(
    (item) => item.status === "NOVA" || item.status === "EM_ANALISE"
  ).length;
  const documents = mockDocuments.filter(
    (item) => item.companyId === "cmp-telefonica"
  ).length;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Notificacoes recebidas"
        value={companyNotifications.length}
        detail="Mock da empresa logada"
        icon={Inbox}
        tone="blue"
      />
      <StatCard
        title="Em aberto"
        value={open}
        detail="Aguardando tratativa"
        icon={AlertTriangle}
        tone="amber"
      />
      <StatCard
        title="Documentos disponiveis"
        value={documents}
        detail="PDFs e anexos"
        icon={FileText}
        tone="green"
      />
      <StatCard
        title="Pendencias"
        value={5}
        detail="Prioridade operacional"
        icon={CheckCircle2}
        tone="gray"
      />
    </div>
  );
}
