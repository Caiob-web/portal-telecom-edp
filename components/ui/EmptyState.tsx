import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button, buttonStyles } from "@/components/ui/Button";

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="rounded-lg border border-dashed border-graphite-300 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-graphite-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-graphite-600">{description}</p>
      {actionLabel && actionHref ? (
        <Link href={actionHref} className={buttonStyles("outline", "md", "mt-5")}>
          {actionLabel}
        </Link>
      ) : actionLabel ? (
        <Button className="mt-5" variant="outline">{actionLabel}</Button>
      ) : null}
    </div>
  );
}
