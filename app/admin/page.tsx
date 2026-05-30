import {
  ArrowRight,
  Building2,
  Clock3,
  FileCheck2,
  Inbox,
  PlugZap,
  RadioTower,
  ShieldCheck,
  UploadCloud
} from "lucide-react";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminShell } from "@/components/layout/AdminShell";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAdminDashboardStats } from "@/lib/admin-data";
import Link from "next/link";

export const dynamic = "force-dynamic";

const operationalFlow = [
  {
    title: "Origem externa",
    description: "Recebe notificações geradas no sistema externo e valida o token técnico.",
    icon: RadioTower
  },
  {
    title: "Vínculo por empresa",
    description: "Relaciona CNPJ ou razão social com a empresa cadastrada no portal.",
    icon: Building2
  },
  {
    title: "PDF e prazo",
    description: "Salva links dos PDFs, município, rua e prazo de atendimento.",
    icon: FileCheck2
  },
  {
    title: "Comprovante",
    description: "Estrutura preparada para upload de evidência de execução pela empresa.",
    icon: UploadCloud
  }
];

export default async function AdminPage() {
  const statsResult = await getAdminDashboardStats();

  return (
    <AdminShell
      title="Painel administrativo"
      subtitle="Central executiva para notificações, empresas, prazos, PDFs e comprovação de execução."
    >
      <div className="space-y-6">
        <Card className="overflow-hidden border-brand-200">
          <div className="admin-energy-hero relative min-h-[320px] p-6 md:p-8">
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
              <div className="max-w-2xl">
                <Badge variant="outline">Centro de comando administrativo</Badge>
                <h2 className="mt-6 text-3xl font-black leading-tight text-white md:text-5xl">
                  Controle operacional das notificações de telecom.
                </h2>
                <p className="mt-4 max-w-xl leading-7 text-white/78">
                  Recebimento externo, vínculo com empresas compartilhantes,
                  PDFs, prazos e comprovação de execução em um fluxo administrativo único.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href="/admin/notifications" className={buttonStyles("primary")}>
                    Ver notificações
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href="/admin/integrations" className={buttonStyles("outline")}>
                    Configurar integrações
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-white/12 bg-[#102233]/72 p-5 shadow-[0_28px_70px_rgba(0,0,0,0.24)] backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#21ff72] text-[#102233]">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[#21ff72]">
                      Roteamento seguro
                    </p>
                    <p className="text-sm font-semibold text-white/76">
                      Empresa, município, rua, PDF e prazo vinculados ao registro.
                    </p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    ["Recebidas", statsResult.stats.notifications],
                    ["PDFs", statsResult.stats.documents],
                    ["Pendentes", statsResult.stats.pendingExecution],
                    ["Vencidas", statsResult.stats.overdueNotifications]
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                    >
                      <p className="text-xs font-bold uppercase tracking-wide text-white/52">
                        {label}
                      </p>
                      <p className="mt-2 text-3xl font-black text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <AdminStats stats={statsResult.stats} configured={statsResult.configured} />

        <div className="grid gap-4 lg:grid-cols-4">
          {operationalFlow.map((item, index) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="relative overflow-hidden p-5 transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-panel"
              >
                <div className="absolute right-4 top-4 text-5xl font-black text-white/5">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-200">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-black text-graphite-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-graphite-500">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <Card>
            <CardHeader>
              <CardTitle>Fila de notificações por prazo</CardTitle>
              <p className="mt-1 text-sm text-graphite-500">
                Visão preparada para acompanhar recebimento, vencimento e comprovação de execução.
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex h-72 items-center justify-center rounded-lg border border-dashed border-graphite-300 bg-graphite-50 p-6">
                <EmptyState
                  icon={Inbox}
                  title="Sem notificações na fila"
                  description="Quando a origem externa enviar registros reais, esta área mostrará volume por prazo, município e empresa."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Empresas com execução pendente</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={Building2}
                title="Nenhuma pendência registrada"
                description="Pendências por empresa serão calculadas a partir das notificações recebidas, prazos e uploads de comprovante."
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Últimos acessos</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={Clock3}
                title="Nenhum acesso registrado"
                description="Os logs de acesso serão exibidos quando a autenticação real estiver conectada."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimas notificações recebidas</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={PlugZap}
                title="Origem de notificações não configurada"
                description="Assim que a integração for configurada, os registros aparecerão automaticamente aqui."
                actionLabel="Ver integrações"
                actionHref="/admin/integrations"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
