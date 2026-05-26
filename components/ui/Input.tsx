import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes
} from "react";
import { cn } from "@/lib/utils";

export function Label({
  className,
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { children: ReactNode }) {
  return (
    <label
      className={cn("text-sm font-semibold text-graphite-800", className)}
      {...props}
    >
      {children}
    </label>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-graphite-200 bg-white px-3 text-sm text-graphite-900 outline-none transition placeholder:text-graphite-400 focus:border-edp-500 focus:ring-4 focus:ring-edp-100",
        className
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-xl border border-graphite-200 bg-white px-3 text-sm text-graphite-900 outline-none transition focus:border-edp-500 focus:ring-4 focus:ring-edp-100",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
