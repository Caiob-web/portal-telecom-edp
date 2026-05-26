import { Inbox } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export function NotificationList({ limit: _limit }: { limit?: number }) {
  return (
    <EmptyState
      icon={Inbox}
      title="Nenhuma comunicação disponivel no momento"
      description="Quando novas notificações forem disponibilizadas para sua empresa, elas aparecerão automaticamente neste painel."
    />
  );
}
