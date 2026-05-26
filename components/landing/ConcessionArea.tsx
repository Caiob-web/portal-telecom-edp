import { MapPinned } from "lucide-react";

const regions = [
  {
    name: "Vale do Paraíba",
    municipalities: [
      "SAO JOSE DOS CAMPOS",
      "TAUBATE",
      "JACAREI",
      "PINDAMONHANGABA",
      "CACAPAVA",
      "TREMEMBE",
      "SANTA BRANCA",
      "MONTEIRO LOBATO",
      "JAMBEIRO"
    ]
  },
  {
    name: "Alto Tietê",
    municipalities: [
      "GUARULHOS",
      "MOGI DAS CRUZES",
      "SUZANO",
      "ITAQUAQUECETUBA",
      "GUARAREMA",
      "FERRAZ DE VASCONCELOS",
      "SALESOPOLIS",
      "BIRITIBA MIRIM",
      "POA"
    ]
  },
  {
    name: "Vale Histórico",
    municipalities: [
      "GUARATINGUETA",
      "CARAGUATATUBA",
      "SAO SEBASTIAO",
      "LORENA",
      "CRUZEIRO",
      "CACHOEIRA PAULISTA",
      "APARECIDA",
      "ROSEIRA",
      "POTIM",
      "CANAS"
    ]
  }
];

export function ConcessionArea() {
  return (
    <section id="concessão" className="bg-white px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#128746]">
              Área de concessão
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#142638] sm:text-4xl">
              Área de concessão EDP
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#4b5b66]">
              Municípios da área de concessão - Vale do Paraíba, Alto Tietê e Vale Histórico.
            </p>

            <div className="concession-abstract-map relative mt-8 min-h-[300px] overflow-hidden rounded-[28px] border border-[#dde6ea] bg-[#f5f8fa] p-6">
              <div className="absolute inset-0 opacity-80" aria-hidden="true" />
              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#142638] text-[#21f36b] shadow-[0_14px_30px_rgba(20,38,56,0.18)]">
                  <MapPinned className="h-7 w-7" aria-hidden="true" />
                </div>
                <p className="mt-20 max-w-sm text-2xl font-black leading-tight text-[#142638]">
                  Visual leve, preparado para evoluir com camadas geográficas.
                </p>
                <p className="mt-3 max-w-sm leading-7 text-[#60717d]">
                  Nesta etapa, o portal apresenta a abrangência institucional sem carregar mapa pesado.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {regions.map((region) => (
              <article
                key={region.name}
                className="rounded-[24px] border border-[#dde6ea] bg-[#f7fafc] p-5 transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_42px_rgba(20,38,56,0.09)]"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-xl font-black text-[#142638]">{region.name}</h3>
                  <span className="w-fit rounded-full border border-[#d4eee0] bg-white px-3 py-1 text-xs font-black uppercase tracking-wide text-[#128746]">
                    Região operacional
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {region.municipalities.map((municipality) => (
                    <span
                      key={municipality}
                      className="rounded-full border border-[#d7e2e8] bg-white px-3 py-1.5 text-xs font-bold text-[#4b5b66]"
                    >
                      {municipality}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
