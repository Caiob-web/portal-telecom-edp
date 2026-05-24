import Link from "next/link";
import {
  Building2,
  FileText,
  LayoutDashboard,
  Map,
  Radio,
  UserCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Notificacoes", href: "/dashboard/notifications", icon: Radio },
  { label: "Documentos", href: "/dashboard/documents", icon: FileText },
  { label: "Mapa", href: "/dashboard/map", icon: Map },
  { label: "Perfil", href: "/dashboard/profile", icon: UserCircle }
];

export function AppSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-graphite-200 bg-white md:flex md:flex-col">
      <div className="flex h-20 items-center gap-3 border-b border-graphite-200 px-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-700 text-white shadow-sm">
          <Building2 className="h-6 w-6" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-bold text-graphite-950">Portal Telecom</p>
          <p className="text-xs font-semibold text-edp-700">Area da empresa</p>
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
                "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-graphite-700 transition hover:bg-brand-50 hover:text-brand-800",
                index === 0 && "bg-brand-50 text-brand-800"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-graphite-200 p-4">
        <div className="rounded-lg bg-graphite-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-graphite-500">
            Empresa conectada
          </p>
          <p className="mt-2 text-sm font-bold text-graphite-950">
            TELEFONICA BRASIL S.A.
          </p>
          <p className="mt-1 text-xs text-graphite-500">Ambiente mockado</p>
        </div>
      </div>
    </aside>
  );
}
