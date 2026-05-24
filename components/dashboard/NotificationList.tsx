import { Inbox } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export function NotificationList({ limit: _limit }: { limit?: number }) {
  return (
    <EmptyState
      icon={Inbox}
      title="Nenhuma comunicacao disponivel no momento"
      description="Quando novas notificacoes forem disponibilizadas para sua empresa, elas aparecerao automaticamente neste painel."
    />
  );
}
