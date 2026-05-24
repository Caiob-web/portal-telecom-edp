import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  title,
  value,
  detail,
  icon: Icon,
  tone = "blue"
}: {
  title: string;
  value: string | number;
  detail?: string;
  icon: LucideIcon;
  tone?: "blue" | "green" | "amber" | "gray";
}) {
  const tones = {
    blue: "bg-brand-50 text-brand-700 ring-brand-100",
    green: "bg-edp-50 text-edp-700 ring-edp-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
    gray: "bg-graphite-100 text-graphite-700 ring-graphite-200"
  };

  return (
    <div className="rounded-lg border border-graphite-200 bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-panel">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-graphite-500">{title}</p>
          <p className="mt-3 text-3xl font-bold text-graphite-950">{value}</p>
        </div>
        <div className={cn("rounded-lg p-3 ring-1", tones[tone])}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      {detail ? (
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-edp-700">
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          {detail}
        </div>
      ) : null}
    </div>
  );
}
