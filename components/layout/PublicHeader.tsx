import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EDPLogo } from "@/components/brand/EDPLogo";
import { buttonStyles } from "@/components/ui/Button";

const navItems = [
  { label: "Portal", href: "#portal" },
  { label: "Notificacoes", href: "#notificacoes" },
  { label: "Documentos", href: "#documentos" },
  { label: "Area de concessao", href: "#concessao" },
  { label: "Seguranca", href: "#seguranca" }
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#dde6ea] bg-[#ffffff]/95 shadow-[0_8px_28px_rgba(20,38,56,0.06)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" aria-label="Portal Telecom EDP">
          <EDPLogo showPortalName compact />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-[#4b5b66] transition hover:text-[#128746]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/auth/register"
            className={buttonStyles(
              "outline",
              "md",
              "hidden rounded-xl border-[#b9c8d2] bg-[#ffffff] text-[#142638] hover:border-[#21c866] hover:bg-[#f2fbf6] sm:inline-flex"
            )}
          >
            Solicitar acesso
          </Link>
          <Link
            href="/auth/login"
            className={buttonStyles(
              "primary",
              "md",
              "rounded-xl bg-[#21f36b] font-black text-[#102233] hover:bg-[#19dd5f]"
            )}
          >
            Acessar portal
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
