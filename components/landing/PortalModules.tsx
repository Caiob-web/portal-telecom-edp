import {
  BellDot,
  Building2,
  ClipboardCheck,
  FileText,
  MapPinned,
  ShieldCheck
} from "lucide-react";

const modules = [
  {
    title: "Notificacoes oficiais",
    description: "Area preparada para comunicacoes administrativas, status e acompanhamento por empresa.",
    icon: BellDot
  },
  {
    title: "Documentos e PDFs",
    description: "Estrutura para centralizar documentos vinculados a notificacoes e processos operacionais.",
    icon: FileText
  },
  {
    title: "Empresas compartilhantes",
    description: "Cadastro empresarial, usuarios vinculados e perfis de acesso organizados para gestao.",
    icon: Building2
  },
  {
    title: "Area administrativa",
    description: "Painel executivo para acompanhar empresas, documentos, notificacoes e pendencias.",
    icon: ClipboardCheck
  },
  {
    title: "Auditoria de acessos",
    description: "Ambiente projetado para registrar visualizacoes, acoes e historico operacional.",
    icon: ShieldCheck
  },
  {
    title: "Area de concessao",
    description: "Visual institucional dos municipios atendidos e estrutura futura para camadas geograficas.",
    icon: MapPinned
  }
];

export function PortalModules() {
  return (
    <section id="notificacoes" className="bg-[#f5f8fa] px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wide text-[#128746]">
              Modulos do portal
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#142638] sm:text-4xl">
              Recursos desenhados para operacao empresarial.
            </h2>
            <p className="mt-4 leading-7 text-[#4b5b66]">
              Cada modulo foi estruturado para receber dados reais em uma etapa posterior, sem simular operacao inexistente.
            </p>
          </div>
          <span className="inline-flex w-fit rounded-full border border-[#d4eee0] bg-white px-4 py-2 text-sm font-black text-[#128746] shadow-sm">
            Preparado para integracao
          </span>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <article
                key={module.title}
                id={module.title === "Documentos e PDFs" ? "documentos" : undefined}
                className="group rounded-[24px] border border-[#dde6ea] bg-white p-6 shadow-[0_12px_34px_rgba(20,38,56,0.06)] transition duration-200 hover:-translate-y-1 hover:border-[#bfead0] hover:shadow-[0_22px_48px_rgba(20,38,56,0.1)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#142638] text-[#21f36b] transition group-hover:scale-105">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="rounded-full bg-[#f1f6f8] px-3 py-1 text-[11px] font-black uppercase tracking-wide text-[#60717d]">
                    Preparado
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-black text-[#142638]">{module.title}</h3>
                <p className="mt-3 leading-7 text-[#60717d]">{module.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
