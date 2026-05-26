"use client";

import { useMemo, useState } from "react";
import { Database, ExternalLink, Filter, Inbox, Search } from "lucide-react";

import type { AdminNotificationRow } from "@/lib/admin-data";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input, Select } from "@/components/ui/Input";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";
import { municipalities } from "@/data/municipalities";
import type { NotificationStatus } from "@/types/database";

const allStatuses: Array<NotificationStatus | "TODOS"> = [
  "TODOS",
  "NOVA",
  "EM_ANALISE",
  "RESPONDIDA",
  "FINALIZADA"
];

const statusLabel: Record<NotificationStatus, string> = {
  NOVA: "Nova",
  EM_ANALISE: "Em análise",
  RESPONDIDA: "Respondida",
  FINALIZADA: "Finalizada"
};

function normalizeForSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function NotificationsTable({
  notifications,
  configured,
  error
}: {
  notifications: AdminNotificationRow[];
  configured: boolean;
  error?: string;
}) {
  const [municipality, setMunicipality] = useState("TODOS");
  const [status, setStatus] = useState<NotificationStatus | "TODOS">("TODOS");
  const [query, setQuery] = useState("");

  const filteredNotifications = useMemo(() => {
    const search = normalizeForSearch(query);

    return notifications.filter((notification) => {
      const company =
        notification.companyLegalName ?? notification.companyName ?? "";
      const matchesQuery =
        !search ||
        normalizeForSearch(notification.externalId).includes(search) ||
        normalizeForSearch(company).includes(search);
      const matchesMunicipality =
        municipality === "TODOS" || notification.municipality === municipality;
      const matchesStatus = status === "TODOS" || notification.status === status;

      return matchesQuery && matchesMunicipality && matchesStatus;
    });
  }, [municipality, notifications, query, status]);

  if (!configured) {
    return (
      <EmptyState
        icon={Database}
        title="Banco de dados não configurado"
        description="Configure a variável DATABASE_URL para carregar notificações recebidas da origem externa."
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={Database}
        title="Não foi possível carregar notificações"
        description={error}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 rounded-2xl border border-graphite-200 bg-white p-4 shadow-card lg:grid-cols-[1.5fr_1fr_1fr_auto]">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-400"
            aria-hidden="true"
          />
          <Input
            className="pl-9"
            placeholder="Buscar por ID ou empresa"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <Select
          value={municipality}
          onChange={(event) => setMunicipality(event.target.value)}
        >
          <option value="TODOS">Todos os municípios</option>
          {municipalities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as NotificationStatus | "TODOS")
          }
        >
          {allStatuses.map((item) => (
            <option key={item} value={item}>
              {item === "TODOS" ? "Todos os status" : statusLabel[item]}
            </option>
          ))}
        </Select>
        <Button variant="outline">
          <Filter className="h-4 w-4" aria-hidden="true" />
          Filtrar
        </Button>
      </div>

      {!filteredNotifications.length ? (
        <EmptyState
          icon={Inbox}
          title="Nenhuma notificação recebida"
          description="As notificações serão exibidas automaticamente quando forem enviadas pela integração configurada com a origem externa."
          actionLabel="Configurar integração"
          actionHref="/admin/integrations"
        />
      ) : (
        <Table>
          <THead>
            <TR>
              <TH>ID externo</TH>
              <TH>Empresa</TH>
              <TH>Município</TH>
              <TH>Tipo</TH>
              <TH>Recebimento</TH>
              <TH>Status</TH>
              <TH>Visualizada?</TH>
              <TH>Respondida?</TH>
              <TH>PDF/link?</TH>
              <TH className="text-right">Ações</TH>
            </TR>
          </THead>
          <TBody>
            {filteredNotifications.map((notification) => (
              <TR key={notification.id}>
                <TD className="font-semibold text-graphite-950">
                  {notification.externalId}
                </TD>
                <TD>
                  {notification.companyLegalName ??
                    notification.companyName ??
                    "Empresa não vinculada"}
                </TD>
                <TD>{notification.municipality ?? "-"}</TD>
                <TD>{notification.type ?? "-"}</TD>
                <TD>{formatDateTime(notification.receivedAt)}</TD>
                <TD>
                  <Badge variant={notification.status === "NOVA" ? "amber" : "gray"}>
                    {statusLabel[notification.status]}
                  </Badge>
                </TD>
                <TD>{notification.viewed ? "Sim" : "Não"}</TD>
                <TD>{notification.answered ? "Sim" : "Não"}</TD>
                <TD>{notification.pdfLinked ? "Sim" : "Não"}</TD>
                <TD className="text-right">
                  {notification.sourceUrl ? (
                    <a
                      className="inline-flex items-center justify-end gap-1 text-sm font-bold text-brand-800 hover:text-edp-700"
                      href={notification.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Abrir link
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-sm text-graphite-400">Sem link</span>
                  )}
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}
    </div>
  );
}
