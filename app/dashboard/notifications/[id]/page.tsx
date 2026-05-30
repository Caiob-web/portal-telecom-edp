import Link from "next/link";
import { Download, FileUp, Inbox } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { getNotificationDetail } from "@/lib/admin-data";
import { formatDateTime } from "@/lib/utils";

export default async function NotificationDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = await getNotificationDetail(id);

  if (!detail.configured || detail.error || !detail.notification) {
    return (
      <DashboardShell
        title="Detalhes da notificação"
        subtitle={`Registro solicitado: ${id}`}
      >
        <EmptyState
          icon={Inbox}
          title={!detail.configured ? "Banco de dados não configurado" : "Notificação não encontrada"}
          description={
            detail.error ??
            "Nenhum dado real foi recebido para este identificador. Os detalhes, anexos e respostas serão exibidos quando a notificação for enviada pela origem externa."
          }
        />
        <div className="mt-5">
          <Link href="/dashboard/notifications" className={buttonStyles("outline")}>
            Voltar para notificações
          </Link>
        </div>
      </DashboardShell>
    );
  }

  const notification = detail.notification;

  return (
    <DashboardShell
      title="Detalhes da notificação"
      subtitle={`Registro externo: ${notification.externalId}`}
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle>{notification.type ?? "Notificação recebida"}</CardTitle>
              <p className="mt-2 text-sm leading-6 text-graphite-500">
                {notification.companyLegalName ?? notification.companyName ?? "Empresa vinculada"}
              </p>
            </div>
            <Badge variant={notification.executionStatus === "PENDENTE" ? "amber" : "green"}>
              Execução: {notification.executionStatus.toLowerCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Município", notification.municipality ?? "-"],
              ["Rua", notification.street ?? "-"],
              ["Recebimento", formatDateTime(notification.receivedAt)],
              [
                "Prazo",
                notification.dueAt
                  ? formatDateTime(notification.dueAt)
                  : notification.deadlineDays
                    ? `${notification.deadlineDays} dias`
                    : "-"
              ]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-graphite-200 bg-graphite-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-graphite-500">
                  {label}
                </p>
                <p className="mt-2 text-sm font-black text-graphite-950">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-graphite-200 bg-graphite-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-graphite-500">
              PDFs e anexos
            </p>
            {detail.documents.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {detail.documents.map((document) => (
                  <a
                    key={document.id}
                    href={document.url}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonStyles("outline", "sm")}
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    {document.name}
                  </a>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-graphite-500">
                Nenhum PDF foi vinculado a esta notificação.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Comprovação de execução</CardTitle>
          <p className="mt-1 text-sm text-graphite-500">
            Quando a notificação real estiver disponível, a empresa poderá anexar
            o comprovante de execução e o admin acompanhará o status.
          </p>
        </CardHeader>
        <CardContent>
          <label className="flex min-h-36 cursor-not-allowed flex-col items-center justify-center rounded-2xl border border-dashed border-graphite-300 bg-graphite-50 p-6 text-center opacity-70">
            <FileUp className="h-8 w-8 text-brand-700" aria-hidden="true" />
            <span className="mt-3 text-sm font-bold text-graphite-950">
              Upload de comprovante preparado
            </span>
            <span className="mt-1 text-sm text-graphite-500">
              A ativação do envio real será feita com armazenamento seguro de arquivos.
            </span>
            <input type="file" className="sr-only" disabled />
          </label>
        </CardContent>
      </Card>
      <div className="mt-5">
        <Link href="/dashboard/notifications" className={buttonStyles("outline")}>
          Voltar para notificações
        </Link>
      </div>
    </DashboardShell>
  );
}
