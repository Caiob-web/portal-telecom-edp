import Link from "next/link";
import { ArrowRight, ClipboardList, FileText, MapPinned } from "lucide-react";
import { CompanySummaryCards } from "@/components/dashboard/CompanySummaryCards";
import { NotificationList } from "@/components/dashboard/NotificationList";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { buttonStyles } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function DashboardPage() {
  return (
    <DashboardShell
      title="Dashboard da empresa"
      subtitle="Visao geral da area da empresa compartilhante."
    >
      <div className="space-y-6">
        <CompanySummaryCards />

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Ultimas notificacoes</CardTitle>
                  <p className="mt-1 text-sm text-graphite-500">
                    As comunicacoes reais aparecerao automaticamente apos a integracao da origem externa.
                  </p>
                </div>
                <Link
                  href="/dashboard/notifications"
                  className={buttonStyles("outline", "sm")}
                >
                  Ver todas
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <NotificationList limit={3} />
            </CardContent>
          </Card>

          <div className="space-y-4">
            {[
              {
                title: "Documentos",
                text: "PDFs e anexos vinculados as notificacoes serao exibidos aqui quando recebidos.",
                href: "/dashboard/documents",
                icon: FileText
              },
              {
                title: "Mapa",
                text: "28 municipios da area de concessao preparados para mapa real.",
                href: "/dashboard/map",
                icon: MapPinned
              },
              {
                title: "Perfil",
                text: "Dados cadastrais serao carregados pela autenticacao real.",
                href: "/dashboard/profile",
                icon: ClipboardList
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Card className="p-5 transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-panel">
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-bold text-graphite-950">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-graphite-600">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
