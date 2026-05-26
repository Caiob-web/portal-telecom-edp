import { Building2, FileText, LockKeyhole, ShieldCheck } from "lucide-react";

const secureItems = [
  {
    title: "Acesso autorizado",
    description: "Entrada restrita a empresas compartilhantes previamente validadas.",
    icon: LockKeyhole
  },
  {
    title: "Documentos protegidos",
    description: "Arquivos e comunicações ficam disponíveis apenas após autenticação.",
    icon: FileText
  },
  {
    title: "Vínculo empresarial",
    description: "Cada solicitação e associada a uma empresa para análise administrativa.",
    icon: Building2
  },
  {
    title: "Rastreabilidade",
    description: "Fluxo preparado para controle, histórico e auditoria de acesso.",
    icon: ShieldCheck
  }
];

export function SecureAccessPanel() {
  return (
    <div className="relative">
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#21f36b]/18 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[#0f78a8]/14 blur-3xl" />

      <div className="secure-access-panel relative overflow-hidden rounded-[32px] border border-[#dbe7ec] bg-white p-6 shadow-[0_26px_80px_rgba(20,38,56,0.16)] sm:p-8">
        <div className="relative z-10 max-w-xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#142638] text-[#21f36b] shadow-[0_14px_30px_rgba(20,38,56,0.18)]">
            <LockKeyhole className="h-7 w-7" aria-hidden="true" />
          </div>
          <p className="mt-6 text-sm font-black uppercase tracking-wide text-[#128746]">
            Ambiente seguro para empresas autorizadas
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-[#142638] sm:text-4xl">
            Informações operacionais somente após autenticação.
          </h2>
          <p className="mt-4 leading-7 text-[#4b5b66]">
            O acesso ao Portal Telecom EDP é restrito a empresas compartilhantes previamente autorizadas. As informações operacionais ficam disponíveis apenas em ambiente autenticado.
          </p>
        </div>

        <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-2">
          {secureItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-[#dde6ea] bg-white/86 p-4 shadow-[0_10px_28px_rgba(20,38,56,0.06)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-[#bfead0]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eafaf0] text-[#128746]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#142638]">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#60717d]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
