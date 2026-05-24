import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "blue"
  | "green"
  | "amber"
  | "red"
  | "gray"
  | "outline";

const variants: Record<BadgeVariant, string> = {
  blue: "bg-brand-50 text-brand-800 ring-brand-200",
  green: "bg-edp-50 text-edp-800 ring-edp-200",
  amber: "bg-amber-50 text-amber-800 ring-amber-200",
  red: "bg-red-50 text-red-700 ring-red-200",
  gray: "bg-graphite-100 text-graphite-700 ring-graphite-200",
  outline: "bg-white text-graphite-700 ring-graphite-200"
};

export function Badge({
  children,
  variant = "gray",
  className
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
