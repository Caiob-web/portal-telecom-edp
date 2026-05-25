import {
  BellDot,
  Building2,
  CheckCircle2,
  FileStack,
  PlugZap,
  ShieldCheck
} from "lucide-react";

const summaryCards = [
  {
    title: "Notificacoes",
    value: "0",
    detail: "Aguardando integracao",
    icon: BellDot
  },
  {
    title: "Documentos",
    value: "0",
    detail: "Sem arquivos recebidos",
    icon: FileStack
  },
  {
    title: "Empresas",
    value: "0",
    detail: "Cadastro administrativo",
    icon: Building2
  },
  {
    title: "Origem externa",
    value: "0",
    detail: "Preparada",
    icon: PlugZap
  }
];

export function PortalPreview() {
  return (
    <div className="relative">
      <div className="absolute -right-6 -top-6 h-36 w-36 rounded-full bg-[#21f36b]/18 blur-3xl" />
      <div className="absolute -bottom-10 -left-8 h-44 w-44 rounded-full bg-[#0f78a8]/14 blur-3xl" />

      <div className="relative overflow-hidden rounded-[28px] border border-[#dbe7ec] bg-white shadow-[0_26px_80px_rgba(20,38,56,0.16)]">
        <div className="border-b border-[#dde6ea] bg-[#142638] px-5 py-4 text-white">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#21f36b]">
                Previa operacional
              </p>
              <h3 className="mt-1 text-lg font-black">Painel do Portal Telecom</h3>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#21f36b]/40 bg-[#21f36b]/10 px-3 py-1.5 text-xs font-bold text-[#21f36b]">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Seguro
            </div>
          </div>
        </div>

        <div className="grid gap-3 bg-[#f7fafc] p-4 sm:grid-cols-2">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-[#dde6ea] bg-white p-4 shadow-[0_10px_28px_rgba(20,38,56,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(20,38,56,0.1)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eafaf0] text-[#128746]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="rounded-full border border-[#d4eee0] bg-[#f3fbf6] px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-[#128746]">
                    Preparado
                  </span>
                </div>
                <p className="mt-5 text-sm font-bold text-[#4b5b66]">{card.title}</p>
                <div className="mt-1 flex items-end gap-2">
                  <p className="text-4xl font-black text-[#142638]">{card.value}</p>
                  <p className="pb-1 text-xs font-semibold uppercase tracking-wide text-[#7b8994]">
                    registros
                  </p>
                </div>
                <p className="mt-2 text-sm font-semibold text-[#60717d]">{card.detail}</p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-4 border-t border-[#dde6ea] bg-white p-4 lg:grid-cols-[1fr_180px]">
          <div className="rounded-2xl border border-[#dde6ea] bg-[#fbfdfe]">
            <div className="flex items-center justify-between border-b border-[#dde6ea] px-4 py-3">
              <p className="text-sm font-black text-[#142638]">Fila de notificacoes</p>
              <span className="rounded-full bg-[#eef4f7] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#60717d]">
                Aguardando dados
              </span>
            </div>
            <div className="divide-y divide-[#e7eef2]">
              {["Empresa", "Municipio", "Status"].map((item) => (
                <div key={item} className="grid grid-cols-[1fr_110px] gap-3 px-4 py-3">
                  <div className="space-y-2">
                    <div className="h-2.5 w-28 rounded-full bg-[#dfe9ee]" />
                    <div className="h-2 w-44 max-w-full rounded-full bg-[#edf3f6]" />
                  </div>
                  <div className="flex justify-end">
                    <span className="h-7 rounded-full border border-dashed border-[#cfdbe2] px-3 text-xs font-bold leading-7 text-[#8a98a2]">
                      {item}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="preview-infra-strip relative min-h-[180px] overflow-hidden rounded-2xl border border-[#dde6ea] p-4">
            <div className="relative z-10">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-[#142638] shadow-sm">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-14 text-sm font-black leading-5 text-white">
                Infraestrutura compartilhada mapeada por fluxo administrativo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
