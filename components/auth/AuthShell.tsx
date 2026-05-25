import type { ReactNode } from "react";
import { AuthVisualPanel } from "@/components/auth/AuthVisualPanel";
import { cn } from "@/lib/utils";

export function AuthShell({
  children,
  cardSize = "default"
}: {
  children: ReactNode;
  cardSize?: "default" | "wide";
}) {
  return (
    <main className="auth-screen min-h-screen px-4 py-4 text-white sm:px-6 lg:px-6">
      <section
        className={cn(
          "mx-auto grid min-h-[calc(100vh-32px)] w-full max-w-[1540px] gap-5",
          cardSize === "wide"
            ? "lg:grid-cols-[minmax(360px,0.78fr)_minmax(0,1.22fr)]"
            : "lg:grid-cols-[minmax(0,1.12fr)_minmax(420px,0.88fr)]"
        )}
      >
        <AuthVisualPanel compact={cardSize === "wide"} />
        <div className="flex items-center justify-center py-2 lg:py-8">
          <div
            className={cn(
              "auth-card w-full rounded-[28px] border border-white/70 p-6 shadow-[0_28px_90px_rgba(3,14,24,0.34)] sm:p-8",
              cardSize === "wide" ? "max-w-4xl lg:p-9" : "max-w-[520px] lg:p-10"
            )}
          >
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
