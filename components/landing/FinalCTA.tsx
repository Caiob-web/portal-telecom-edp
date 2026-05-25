import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="bg-[#f5f8fa] px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-[#cfdbe2] bg-white shadow-[0_24px_70px_rgba(20,38,56,0.1)]">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#128746]">
              Ambiente empresarial
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-[#142638] sm:text-4xl">
              Centralize a comunicacao com empresas compartilhantes
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#4b5b66]">
              Solicite acesso ao portal para acompanhar notificacoes, documentos e comunicacoes administrativas em um unico ambiente.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/auth/register"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#b9c8d2] bg-white px-6 text-base font-bold text-[#142638] transition hover:border-[#21c866] hover:bg-[#f2fbf6]"
            >
              Solicitar acesso
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#21f36b] px-6 text-base font-black text-[#102233] transition hover:bg-[#19dd5f]"
            >
              Acessar portal
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
