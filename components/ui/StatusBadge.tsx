import { CheckCircle2, Clock3, Eye, Radio } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { NotificationStatus } from "@/types/database";

const statusMap: Record<
  NotificationStatus,
  {
    label: string;
    variant: "blue" | "green" | "amber" | "gray";
    icon: typeof Radio;
  }
> = {
  NOVA: { label: "Nova", variant: "blue", icon: Radio },
  EM_ANALISE: { label: "Em análise", variant: "amber", icon: Clock3 },
  RESPONDIDA: { label: "Respondida", variant: "green", icon: Eye },
  FINALIZADA: { label: "Finalizada", variant: "gray", icon: CheckCircle2 }
};

export function StatusBadge({ status }: { status: NotificationStatus }) {
  const item = statusMap[status];
  const Icon = item.icon;

  return (
    <Badge variant={item.variant}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {item.label}
    </Badge>
  );
}
