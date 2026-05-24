import Link from "next/link";
import {
  BellDot,
  Building2,
  DatabaseZap,
  FileStack,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Visao geral", href: "/admin", icon: LayoutDashboard },
  { label: "Empresas", href: "/admin/companies", icon: Building2 },
  { label: "Usuarios", href: "/admin/users", icon: UsersRound },
  { label: "Notificacoes", href: "/admin/notifications", icon: BellDot },
  { label: "Documentos", href: "/admin/documents", icon: FileStack },
  { label: "Base44", href: "/admin/base44", icon: DatabaseZap },
  { label: "Configuracoes", href: "/admin/settings", icon: Settings }
];

export function AdminSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-graphite-200 bg-graphite-950 text-white md:flex md:flex-col">
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-edp-500 text-white shadow-sm">
          <ShieldCheck className="h-6 w-6" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-bold">Portal Telecom EDP</p>
          <p className="text-xs font-semibold text-edp-200">Administracao</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {navigation.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white",
                index === 0 && "bg-white/10 text-white"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-lg border border-white/10 bg-white/10 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-white/50">
            Governanca
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            Auditoria e rastreabilidade prontas para Neon
          </p>
        </div>
      </div>
    </aside>
  );
}
