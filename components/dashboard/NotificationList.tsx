import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockNotifications } from "@/data/mock-notifications";
import { formatDate } from "@/lib/utils";

export function NotificationList({ limit }: { limit?: number }) {
  const items = mockNotifications
    .filter((item) => item.companyId === "cmp-telefonica")
    .slice(0, limit);

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Card
          key={item.id}
          className="p-4 transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-panel"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wide text-brand-700">
                  {item.id}
                </span>
                <StatusBadge status={item.status} />
              </div>
              <h3 className="mt-2 text-base font-bold text-graphite-950">
                {item.title}
              </h3>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-graphite-500">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {formatDate(item.receivedAt)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {item.municipality}
                </span>
              </div>
            </div>
            <Link
              href={`/dashboard/notifications/${item.id}`}
              className={buttonStyles("outline")}
            >
              Ver detalhes
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
