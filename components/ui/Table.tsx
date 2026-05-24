import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-graphite-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-graphite-200 text-sm">
          {children}
        </table>
      </div>
    </div>
  );
}

export function THead({ children }: { children: ReactNode }) {
  return <thead className="bg-graphite-50">{children}</thead>;
}

export function TBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-graphite-100 bg-white">{children}</tbody>;
}

export function TR({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLTableRowElement> & { children: ReactNode }) {
  return (
    <tr className={cn("transition hover:bg-brand-50/45", className)} {...props}>
      {children}
    </tr>
  );
}

export function TH({
  children,
  className,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement> & { children: ReactNode }) {
  return (
    <th
      className={cn(
        "px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-graphite-600",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

export function TD({
  children,
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & { children: ReactNode }) {
  return (
    <td className={cn("whitespace-nowrap px-4 py-4 text-graphite-700", className)} {...props}>
      {children}
    </td>
  );
}
