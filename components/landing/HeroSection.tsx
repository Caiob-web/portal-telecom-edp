import Link from "next/link";
import { ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";
import { SecureAccessPanel } from "@/components/landing/SecureAccessPanel";

const trustItems = [
  "Acesso restrito",
  "Comunicacao oficial",
  "Rastreabilidade administrativa"
];

export function HeroSection() {
  return (
    <section id="portal" className="relative overflow-hidden bg-[#f7fafc]">
      <div className="corporate-hero-aura absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:py-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#cbe8d6] bg-white px-3 py-1.5 text-sm font-black text-[#127a45] shadow-sm">
            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
            Portal empresarial para empresas compartilhantes
          </div>
          <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.02] tracking-normal text-[#142638] sm:text-5xl lg:text-6xl">
            Gestao centralizada de notificacoes e documentos de telecom
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4b5b66]">
            Uma plataforma digital para organizar comunicacoes oficiais, documentos, pendencias e acompanhamento administrativo das empresas que utilizam infraestrutura compartilhada.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/auth/login"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#21f36b] px-6 text-base font-black text-[#102233] shadow-[0_16px_34px_rgba(33,243,107,0.26)] transition hover:-translate-y-0.5 hover:bg-[#19dd5f]"
            >
              Acessar portal
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#b9c8d2] bg-white px-6 text-base font-bold text-[#142638] transition hover:-translate-y-0.5 hover:border-[#21c866] hover:bg-[#f2fbf6]"
            >
              Solicitar acesso
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-bold text-[#536572]">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#128746]" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <SecureAccessPanel />
      </div>
    </section>
  );
}
