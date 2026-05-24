import { MapPinned } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { municipalities } from "@/data/municipalities";

export default function CompanyMapPage() {
  return (
    <DashboardShell
      title="Mapa da area de concessao"
      subtitle="Componente leve preparado para Leaflet ou Mapbox."
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card className="overflow-hidden">
          <div className="relative min-h-[430px] bg-brand-50 p-5">
            <img
              src="/concession-map.svg"
              alt="Mapa visual mockado da area de concessao"
              className="h-full min-h-[390px] w-full rounded-lg object-cover shadow-card"
            />
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="max-w-md rounded-lg border border-white/80 bg-white/95 p-6 text-center shadow-panel backdrop-blur">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-brand-700 text-white">
                  <MapPinned className="h-7 w-7" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-2xl font-black text-graphite-950">
                  28 municipios da area de concessao
                </h2>
                <p className="mt-2 text-graphite-600">
                  Vale do Paraiba, Alto Tiete e Vale Historico
                </p>
                <Badge variant="blue" className="mt-4">
                  Leaflet/Mapbox ready
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Municipios</CardTitle>
            <p className="mt-1 text-sm text-graphite-500">
              Lista inicial para futura camada geografica.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid max-h-[430px] gap-2 overflow-y-auto pr-1">
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
    </DashboardShell>
  );
}
