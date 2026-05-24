import Link from "next/link";
import { Bell, Menu, Search } from "lucide-react";
import { EDPLogo } from "@/components/brand/EDPLogo";
import { Button } from "@/components/ui/Button";

export function AppHeader({
  title,
  subtitle,
  area = "Empresa"
}: {
  title: string;
  subtitle?: string;
  area?: "Empresa" | "Admin";
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-graphite-200 bg-white/90 backdrop-blur-xl">
      <div className="flex min-h-16 items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu">
            <Menu className="h-5 w-5" aria-hidden="true" />
          </Button>
          <div className="hidden lg:block">
            <EDPLogo />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-700">
              Portal Telecom EDP | {area}
            </div>
            <h1 className="truncate text-lg font-bold text-graphite-950 md:text-xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="truncate text-sm text-graphite-500">{subtitle}</p>
            ) : null}
          </div>
        </div>

        <div className="hidden flex-1 justify-center md:flex">
          <div className="relative w-full max-w-md">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-400"
              aria-hidden="true"
            />
            <input
              aria-label="Buscar no portal"
              className="h-10 w-full rounded-md border border-graphite-200 bg-graphite-50 pl-9 pr-3 text-sm outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100"
              placeholder="Buscar notificacoes, documentos ou empresas"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" aria-label="Notificacoes">
            <Bell className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Link
            href="/auth/login"
            className="hidden rounded-md border border-graphite-200 px-3 py-2 text-sm font-semibold text-graphite-700 transition hover:bg-graphite-100 sm:inline-flex"
          >
            Sair
          </Link>
        </div>
      </div>
    </header>
  );
}
