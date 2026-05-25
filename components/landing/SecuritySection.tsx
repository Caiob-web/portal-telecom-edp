import {
  Eye,
  FileClock,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  UserCog
} from "lucide-react";

const securityItems = [
  {
    title: "Acesso por empresa",
    description: "Ambiente projetado para separar usuarios, empresas e permissoes.",
    icon: LockKeyhole
  },
  {
    title: "Perfis administrativos",
    description: "Estrutura preparada para perfis operacionais e gestao de autorizacoes.",
    icon: UserCog
  },
  {
    title: "Registro de visualizacao",
    description: "Fluxo previsto para registrar leitura e acompanhamento de notificacoes.",
    icon: Eye
  },
  {
    title: "Historico de documentos",
    description: "Estrutura preparada para rastrear documentos vinculados a comunicacoes.",
    icon: FileClock
  },
  {
    title: "Autenticacao corporativa",
    description: "Base visual e tecnica preparada para autenticar usuarios em etapa posterior.",
    icon: KeyRound
  },
  {
    title: "Auditoria operacional",
    description: "Ambiente projetado para auditoria, seguranca e rastreabilidade administrativa.",
    icon: ShieldCheck
  }
];

export function SecuritySection() {
  return (
    <section id="seguranca" className="bg-[#142638] px-4 py-16 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#21f36b]">
              Seguranca e rastreabilidade
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              Controle, historico e governanca para comunicacoes empresariais.
            </h2>
            <p className="mt-4 leading-7 text-white/68">
              O portal foi desenhado para evoluir com autenticacao real, auditoria e registros administrativos sem expor dados sensiveis nesta etapa visual.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {securityItems.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.065] p-5 backdrop-blur transition duration-200 hover:-translate-y-1 hover:bg-white/[0.095]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#21f36b]/35 bg-[#21f36b]/10 text-[#21f36b]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/68">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
