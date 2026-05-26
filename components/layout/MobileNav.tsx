import Link from "next/link";
import {
  BellDot,
  Building2,
  FileStack,
  FileText,
  LayoutDashboard,
  Map,
  PlugZap,
  Radio,
  Settings,
  UserCircle,
  UsersRound
} from "lucide-react";

const dashboardItems = [
  { label: "Inicio", href: "/dashboard", icon: LayoutDashboard },
  { label: "Notificações", href: "/dashboard/notifications", icon: Radio },
  { label: "Documentos", href: "/dashboard/documents", icon: FileText },
  { label: "Mapa", href: "/dashboard/map", icon: Map },
  { label: "Perfil", href: "/dashboard/profile", icon: UserCircle }
];

const adminItems = [
  { label: "Geral", href: "/admin", icon: LayoutDashboard },
  { label: "Empresas", href: "/admin/companies", icon: Building2 },
  { label: "Usuários", href: "/admin/users", icon: UsersRound },
  { label: "Notificações", href: "/admin/notifications", icon: BellDot },
  { label: "Documentos", href: "/admin/documents", icon: FileStack },
  { label: "Integrações", href: "/admin/integrations", icon: PlugZap },
  { label: "Config", href: "/admin/settings", icon: Settings }
];

export function MobileNav({ variant }: { variant: "dashboard" | "admin" }) {
  const items = variant === "dashboard" ? dashboardItems : adminItems;

  return (
    <div className="border-b border-graphite-200 bg-white px-4 py-2 md:hidden">
      <nav className="flex gap-2 overflow-x-auto pb-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex shrink-0 items-center gap-2 rounded-md border border-graphite-200 bg-white px-3 py-2 text-sm font-semibold text-graphite-700"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
