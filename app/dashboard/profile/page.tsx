import { Building2, Mail, MapPin, Phone } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const profileItems = [
  {
    label: "Empresa",
    value: "TELEFONICA BRASIL S.A.",
    icon: Building2
  },
  {
    label: "E-mail principal",
    value: "gestao.postes@telefonica.com",
    icon: Mail
  },
  {
    label: "Telefone",
    value: "(11) 4000-0000",
    icon: Phone
  },
  {
    label: "Municipio principal",
    value: "SAO JOSE DOS CAMPOS",
    icon: MapPin
  }
];

export default function CompanyProfilePage() {
  return (
    <DashboardShell
      title="Perfil da empresa"
      subtitle="Dados cadastrais mockados para futura persistencia no Neon."
    >
      <Card>
        <CardHeader>
          <CardTitle>Dados cadastrais</CardTitle>
          <p className="mt-1 text-sm text-graphite-500">
            Perfil visual da empresa logada. Edicao real sera vinculada a
            permissoes e auditoria.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {profileItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-lg border border-graphite-200 bg-graphite-50 p-5"
                >
                  <Icon className="h-5 w-5 text-brand-700" aria-hidden="true" />
                  <p className="mt-4 text-xs font-bold uppercase tracking-wide text-graphite-500">
                    {item.label}
                  </p>
                  <p className="mt-1 font-semibold text-graphite-950">{item.value}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
