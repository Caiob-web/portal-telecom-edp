import type { ReactNode } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileNav } from "@/components/layout/MobileNav";

export function DashboardShell({
  children,
  title,
  subtitle
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="min-h-screen bg-graphite-50">
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="min-w-0 flex-1">
          <AppHeader title={title} subtitle={subtitle} area="Empresa" />
          <MobileNav variant="dashboard" />
          <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
