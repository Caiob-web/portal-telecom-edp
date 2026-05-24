import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EDPLogo } from "@/components/brand/EDPLogo";
import { buttonStyles } from "@/components/ui/Button";

const navItems = [
  { label: "Notificacoes", href: "#notificacoes" },
  { label: "Documentos", href: "#documentos" },
  { label: "Concessao", href: "#concessao" },
  { label: "Seguranca", href: "#seguranca" }
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" aria-label="Portal Telecom EDP">
          <EDPLogo showPortalName />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-graphite-600 transition hover:text-brand-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/auth/register" className={buttonStyles("outline", "md", "hidden sm:inline-flex")}>
            Solicitar acesso
          </Link>
          <Link href="/auth/login" className={buttonStyles("primary", "md")}>
            Acessar portal
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
