import { Building2, FileText, MapPinned, RadioTower, ShieldCheck } from "lucide-react";

const indicators = [
  { label: "Área de concessão protegida", icon: MapPinned },
  { label: "Empresas autorizadas", icon: Building2 },
  { label: "Comunicações oficiais", icon: RadioTower },
  { label: "Documentos autenticados", icon: FileText },
  { label: "Acesso empresarial controlado", icon: ShieldCheck }
];

export function IndicatorStrip() {
  return (
    <section className="bg-[#f7fafc] px-4 pb-12 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-3 rounded-[24px] border border-[#dde6ea] bg-white p-3 shadow-[0_18px_50px_rgba(20,38,56,0.08)] sm:grid-cols-2 lg:grid-cols-5">
        {indicators.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-2xl border border-transparent p-4 transition hover:border-[#d4eee0] hover:bg-[#f4fbf7]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eafaf0] text-[#128746]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="text-sm font-black leading-5 text-[#142638]">{item.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
