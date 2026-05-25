import Link from "next/link";
import { EDPLogo } from "@/components/brand/EDPLogo";

const links = [
  { label: "Portal", href: "#portal" },
  { label: "Notificacoes", href: "#notificacoes" },
  { label: "Documentos", href: "#documentos" },
  { label: "Seguranca", href: "#seguranca" }
];

export function LandingFooter() {
  return (
    <footer className="border-t border-[#dde6ea] bg-white px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <EDPLogo showPortalName compact />
          <p className="mt-4 max-w-2xl leading-7 text-[#60717d]">
            Portal corporativo para centralizar comunicacoes oficiais, documentos e acompanhamento administrativo de empresas compartilhantes.
          </p>
          <p className="mt-3 text-sm font-bold text-[#4b5b66]">
            Ambiente empresarial destinado a empresas compartilhantes autorizadas.
          </p>
        </div>
        <nav className="flex flex-wrap gap-3">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-[#dde6ea] px-4 py-2 text-sm font-bold text-[#4b5b66] transition hover:border-[#21c866] hover:text-[#128746]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
