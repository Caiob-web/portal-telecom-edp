import { notFound } from "next/navigation";
import { Download, Eye, MessageSquareReply, Paperclip } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockNotifications } from "@/data/mock-notifications";
import { formatDateTime } from "@/lib/utils";

export default async function NotificationDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notification = mockNotifications.find((item) => item.id === id);

  if (!notification) {
    notFound();
  }

  return (
    <DashboardShell
      title={notification.title}
      subtitle={`Detalhes da notificacao ${notification.id}`}
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-brand-700">
                  {notification.id}
                </p>
                <CardTitle className="mt-2 text-2xl">{notification.title}</CardTitle>
              </div>
              <StatusBadge status={notification.status} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["Empresa", notification.companyName],
                ["Municipio", notification.municipality],
                ["Data", formatDateTime(notification.receivedAt)],
                ["Tipo", notification.type]
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-md border border-graphite-200 bg-graphite-50 p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-graphite-500">
                    {label}
                  </p>
                  <p className="mt-1 font-semibold text-graphite-950">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-graphite-200 p-5">
              <h3 className="font-bold text-graphite-950">Descricao</h3>
              <p className="mt-3 leading-7 text-graphite-600">
                {notification.description}
              </p>
            </div>
          </CardContent>
        </Card>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Arquivos anexos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notification.attachments.length > 0 ? (
                notification.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="rounded-md border border-graphite-200 bg-white p-4"
                  >
                    <div className="flex items-start gap-3">
                      <Paperclip className="mt-1 h-5 w-5 text-brand-700" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-graphite-950">
                          {attachment.name}
                        </p>
                        <p className="text-sm text-graphite-500">
                          {attachment.type} | {attachment.size}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-graphite-500">
                  Nenhum anexo mockado para esta notificacao.
                </p>
              )}
              <Button className="w-full" variant="outline">
                <Download className="h-4 w-4" aria-hidden="true" />
                Baixar PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="p-5">
            <div className="space-y-3">
              <Badge variant="outline">PDF mockado</Badge>
              <p className="text-sm leading-6 text-graphite-600">
                A estrutura esta pronta para receber PDFs via Base44, armazenar
                no Vercel Blob e registrar metadados no Neon.
              </p>
              <Button className="w-full" variant="secondary">
                <Eye className="h-4 w-4" aria-hidden="true" />
                Marcar como visualizada
              </Button>
              <Button className="w-full">
                <MessageSquareReply className="h-4 w-4" aria-hidden="true" />
                Responder notificacao
              </Button>
            </div>
          </Card>
        </aside>
      </div>
    </DashboardShell>
  );
}
