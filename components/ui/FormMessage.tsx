import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

type FormMessageVariant = "success" | "error" | "warning" | "info";

const variantStyles: Record<
  FormMessageVariant,
  {
    container: string;
    icon: typeof CheckCircle2;
  }
> = {
  success: {
    container: "border-emerald-200 bg-emerald-50 text-emerald-900",
    icon: CheckCircle2
  },
  error: {
    container: "border-red-200 bg-red-50 text-red-900",
    icon: AlertCircle
  },
  warning: {
    container: "border-amber-200 bg-amber-50 text-amber-900",
    icon: TriangleAlert
  },
  info: {
    container: "border-sky-200 bg-sky-50 text-sky-900",
    icon: Info
  }
};

type FormMessageProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  variant?: FormMessageVariant;
};

export function FormMessage({
  children,
  className,
  title,
  variant = "info"
}: FormMessageProps) {
  const Icon = variantStyles[variant].icon;

  return (
    <div
      className={cn(
        "flex gap-3 rounded-2xl border px-4 py-3 text-sm shadow-sm",
        variantStyles[variant].container,
        className
      )}
      role={variant === "error" ? "alert" : "status"}
    >
      <Icon className="mt-0.5 h-4 w-4 flex-none" aria-hidden />
      <div className="space-y-1">
        {title ? <p className="font-bold">{title}</p> : null}
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
