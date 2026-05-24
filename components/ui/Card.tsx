import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-graphite-200 bg-white shadow-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return <div className={cn("p-5 pb-3", className)}>{children}</div>;
}

export function CardTitle({
  className,
  children
}: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode }) {
  return (
    <h3 className={cn("text-base font-semibold text-graphite-950", className)}>
      {children}
    </h3>
  );
}

export function CardContent({
  className,
  children
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return <div className={cn("p-5 pt-2", className)}>{children}</div>;
}
