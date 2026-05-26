import { Building2, FileStack, Inbox, LayoutDashboard, Route } from "lucide-react";

const steps = [
  {
    title: "Origem externa envia notificação",
    description: "Fluxo preparado para receber comunicações oficiais de uma origem externa configurada.",
    icon: Inbox
  },
  {
    title: "Portal recebe e organiza",
    description: "A estrutura do portal foi desenhada para classificar status, empresa, município e documentos.",
    icon: Route
  },
  {
    title: "Empresa acessa sua área",
    description: "Cada empresa compartilhante acessa apenas sua área de notificações, pendências e arquivos.",
    icon: Building2
  },
  {
    title: "Documentos ficam disponíveis",
    description: "PDFs e anexos vinculados ao fluxo ficam preparados para consulta e rastreabilidade.",
    icon: FileStack
  },
  {
    title: "Administração acompanha status",
    description: "O painel administrativo consolida visão executiva, filtros e acompanhamento operacional.",
    icon: LayoutDashboard
  }
];

export function HowItWorks() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-wide text-[#128746]">
            Como o portal funciona
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-[#142638] sm:text-4xl">
            Um fluxo preparado para comunicações oficiais de telecom.
          </h2>
          <p className="mt-4 leading-7 text-[#4b5b66]">
            A integração real será ativada em etapa posterior. Nesta fase, a experiência visual e a arquitetura já deixam claro como as notificações serão recebidas, organizadas e acompanhadas.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative">
                {index < steps.length - 1 ? (
                  <div className="absolute left-10 top-9 hidden h-px w-[calc(100%-2.5rem)] bg-[#cfdbe2] lg:block" />
                ) : null}
                <div className="relative rounded-3xl border border-[#dde6ea] bg-[#f7fafc] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#bfead0] hover:bg-white hover:shadow-[0_18px_42px_rgba(20,38,56,0.1)]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#142638] text-[#21f36b] shadow-[0_14px_30px_rgba(20,38,56,0.18)]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="mt-5 inline-flex rounded-full bg-[#eafaf0] px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-[#128746]">
                    Etapa {index + 1}
                  </span>
                  <h3 className="mt-3 text-lg font-black leading-6 text-[#142638]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#60717d]">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
