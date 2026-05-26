import { Building2, Clock3, Inbox, PlugZap } from "lucide-react";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminShell } from "@/components/layout/AdminShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export default function AdminPage() {
  return (
    <AdminShell
      title="Painel administrativo"
      subtitle="Visão executiva de empresas, usuários, notificações, documentos e integrações."
    >
      <div className="space-y-6">
        <Card className="overflow-hidden border-brand-200">
          <div className="admin-energy-hero relative min-h-[260px] p-6 md:p-8">
            <div className="relative z-10 max-w-2xl">
              <Badge variant="outline">Painel executivo</Badge>
              <h2 className="mt-6 text-3xl font-black leading-tight text-white md:text-4xl">
                Operação telecom com visão institucional EDP.
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-white/74">
                Área administrativa preparada para receber dados reais de empresas,
                usuários, documentos e notificações assim que as integrações forem ativadas.
              </p>
            </div>
          </div>
        </Card>

        <AdminStats />

        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <Card>
            <CardHeader>
              <CardTitle>Evolução de notificações</CardTitle>
              <p className="mt-1 text-sm text-graphite-500">
                O gráfico será alimentado quando a origem externa enviar dados reais ao portal.
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex h-72 items-center justify-center rounded-lg border border-dashed border-graphite-300 bg-graphite-50 p-6">
                <EmptyState
                  icon={Inbox}
                  title="Sem dados para gráfico"
                  description="Nenhuma notificação real foi recebida ate o momento."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Empresas com pendências</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={Building2}
                title="Nenhuma pendencia registrada"
                description="Pendências por empresa serão calculadas após a integração de notificações e cadastro de empresas."
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
