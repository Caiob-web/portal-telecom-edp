import { KeyRound, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const settings = [
  {
    title: "Autenticacao",
    description: "Preparado para sessoes reais, perfis de acesso e politicas administrativas.",
    icon: KeyRound
  },
  {
    title: "Permissoes",
    description: "Perfis ADMIN, EMPRESA e VISUALIZADOR modelados em TypeScript.",
    icon: ShieldCheck
  },
  {
    title: "Operacao",
    description: "Espaco para parametros administrativos e regras futuras.",
    icon: SlidersHorizontal
  }
];

export default function AdminSettingsPage() {
  return (
    <AdminShell
      title="Configuracoes"
      subtitle="Parametros estruturais do portal para futuras integracoes."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {settings.map((setting) => {
          const Icon = setting.icon;
          return (
            <Card key={setting.title}>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <CardTitle className="mt-4">{setting.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-6 text-graphite-600">{setting.description}</p>
                <Badge variant="outline" className="mt-4">
                  Preparado
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AdminShell>
  );
}
