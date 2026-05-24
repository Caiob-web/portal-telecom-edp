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
      subtitle="Visao executiva de empresas, usuarios, notificacoes, documentos e integracoes."
    >
      <div className="space-y-6">
        <Card className="overflow-hidden border-brand-200">
          <div className="admin-energy-hero relative min-h-[260px] p-6 md:p-8">
            <div className="relative z-10 max-w-2xl">
              <Badge variant="outline">Painel executivo</Badge>
              <h2 className="mt-6 text-3xl font-black leading-tight text-white md:text-4xl">
                Operacao telecom com visao institucional EDP.
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-white/74">
                Area administrativa preparada para receber dados reais de empresas,
                usuarios, documentos e notificacoes assim que as integracoes forem ativadas.
              </p>
            </div>
          </div>
        </Card>

        <AdminStats />

        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <Card>
            <CardHeader>
              <CardTitle>Evolucao de notificacoes</CardTitle>
              <p className="mt-1 text-sm text-graphite-500">
                O grafico sera alimentado quando a origem externa enviar dados reais ao portal.
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex h-72 items-center justify-center rounded-lg border border-dashed border-graphite-300 bg-graphite-50 p-6">
                <EmptyState
                  icon={Inbox}
                  title="Sem dados para grafico"
                  description="Nenhuma notificacao real foi recebida ate o momento."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Empresas com pendencias</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={Building2}
                title="Nenhuma pendencia registrada"
                description="Pendencias por empresa serao calculadas apos a integracao de notificacoes e cadastro de empresas."
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Ultimos acessos</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={Clock3}
                title="Nenhum acesso registrado"
                description="Os logs de acesso serao exibidos quando a autenticacao real estiver conectada."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ultimas notificacoes recebidas</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={PlugZap}
                title="Origem de notificacoes nao configurada"
                description="Assim que a integracao for configurada, os registros aparecerao automaticamente aqui."
                actionLabel="Ver integracoes"
                actionHref="/admin/integrations"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
