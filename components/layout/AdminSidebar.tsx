import Link from "next/link";
import {
  BellDot,
  Building2,
  FileStack,
  LayoutDashboard,
  PlugZap,
  Settings,
  UsersRound
} from "lucide-react";
import { EDPLogo } from "@/components/brand/EDPLogo";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Visão geral", href: "/admin", icon: LayoutDashboard },
  { label: "Empresas", href: "/admin/companies", icon: Building2 },
  { label: "Usuários", href: "/admin/users", icon: UsersRound },
  { label: "Notificações", href: "/admin/notifications", icon: BellDot },
  { label: "Documentos", href: "/admin/documents", icon: FileStack },
  { label: "Integrações", href: "/admin/integrations", icon: PlugZap },
  { label: "Configurações", href: "/admin/settings", icon: Settings }
];

export function AdminSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-graphite-200 bg-graphite-950 text-white md:flex md:flex-col">
      <div className="flex h-24 items-center border-b border-white/10 px-6">
        <EDPLogo showPortalName inverted />
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
            Auditoria e rastreabilidade operacional
          </p>
        </div>
      </div>
    </aside>
  );
}
