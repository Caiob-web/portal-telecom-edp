import { MapPinned } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { municipalities } from "@/data/municipalities";

const regions = [
  {
    name: "Vale do Paraiba",
    cities: [
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
    name: "Alto Tiete",
    cities: [
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
    name: "Vale Historico e Litoral Norte",
    cities: [
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

export default function CompanyMapPage() {
  return (
    <DashboardShell
      title="Area de concessao"
      subtitle="28 municipios da area de concessao - Vale do Paraiba, Alto Tiete e Vale Historico."
    >
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-graphite-950 p-8 text-white">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-edp-500 text-white">
                <MapPinned className="h-7 w-7" aria-hidden="true" />
              </div>
              <h2 className="mt-6 text-3xl font-black">Area de concessao</h2>
              <p className="mt-3 leading-7 text-white/70">
                28 municipios da area de concessao - Vale do Paraiba, Alto Tiete e Vale Historico.
              </p>
              <Badge variant="outline" className="mt-5">
                Leaflet/Mapbox ready
              </Badge>
            </div>
            <div className="grid gap-4 bg-brand-50 p-6 md:grid-cols-3">
              {regions.map((region) => (
                <div key={region.name} className="rounded-lg border border-white bg-white p-4 shadow-card">
                  <p className="text-sm font-bold text-graphite-950">{region.name}</p>
                  <p className="mt-2 text-3xl font-black text-brand-800">
                    {region.cities.length}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-graphite-500">
                    municipios
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <Card>
            <CardHeader>
              <CardTitle>Municipios por regiao</CardTitle>
              <p className="mt-1 text-sm text-graphite-500">
                Organizacao visual leve enquanto o mapa geografico real nao e carregado.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 lg:grid-cols-3">
                {regions.map((region) => (
                  <div key={region.name} className="rounded-lg border border-graphite-200 bg-graphite-50 p-4">
                    <h3 className="font-bold text-graphite-950">{region.name}</h3>
                    <div className="mt-3 grid gap-2">
                      {region.cities.map((city) => (
                        <div key={city} className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-graphite-700 shadow-sm">
                          {city}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lista completa</CardTitle>
              <p className="mt-1 text-sm text-graphite-500">
                Base inicial para futura camada geografica.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid max-h-[520px] gap-2 overflow-y-auto pr-1">
                {municipalities.map((item) => (
                  <div
                    key={item}
                    className="rounded-md border border-graphite-200 bg-graphite-50 px-3 py-2 text-sm font-semibold text-graphite-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
