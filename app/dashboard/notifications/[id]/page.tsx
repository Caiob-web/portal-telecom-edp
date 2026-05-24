import Link from "next/link";
import { Inbox } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { buttonStyles } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function NotificationDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <DashboardShell
      title="Detalhes da notificacao"
      subtitle={`Registro solicitado: ${id}`}
    >
      <EmptyState
        icon={Inbox}
        title="Notificacao nao encontrada"
        description="Nenhum dado real foi recebido para este identificador. Os detalhes, anexos e respostas serao exibidos quando a notificacao for enviada pela origem externa."
      />
      <div className="mt-5">
        <Link href="/dashboard/notifications" className={buttonStyles("outline")}>
          Voltar para notificacoes
        </Link>
      </div>
    </DashboardShell>
  );
}
