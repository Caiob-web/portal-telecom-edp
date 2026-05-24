import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { MobileNav } from "@/components/layout/MobileNav";

export function AdminShell({
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
        <AdminSidebar />
        <div className="min-w-0 flex-1">
          <AppHeader title={title} subtitle={subtitle} area="Admin" />
          <MobileNav variant="admin" />
          <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
