import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "icon";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-edp-500 text-white shadow-[0_14px_30px_rgba(32,169,87,0.22)] hover:bg-edp-600 hover:shadow-[0_18px_36px_rgba(32,169,87,0.28)] focus-visible:ring-edp-500",
  secondary:
    "bg-brand-900 text-white shadow-sm hover:bg-brand-800 focus-visible:ring-brand-700",
  outline:
    "border border-graphite-200 bg-white text-graphite-800 shadow-sm hover:border-edp-300 hover:bg-edp-50 hover:text-brand-900 focus-visible:ring-edp-500",
  ghost:
    "text-graphite-700 hover:bg-graphite-100 hover:text-graphite-950 focus-visible:ring-brand-600",
  danger:
    "bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-600"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  icon: "h-10 w-10 p-0"
};

export function buttonStyles(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string
) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonStyles(variant, size, className)} {...props}>
      {children}
    </button>
  );
}
