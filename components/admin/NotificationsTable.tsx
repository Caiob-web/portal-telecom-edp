"use client";

import { useState } from "react";
import { Filter, Inbox, Search } from "lucide-react";
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

export function NotificationsTable() {
  const [municipality, setMunicipality] = useState("TODOS");
  const [status, setStatus] = useState<NotificationStatus | "TODOS">("TODOS");
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-4">
      <div className="grid gap-3 rounded-lg border border-graphite-200 bg-white p-4 shadow-card lg:grid-cols-[1.5fr_1fr_1fr_auto]">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-400"
            aria-hidden="true"
          />
          <Input
            className="pl-9"
            placeholder="Buscar por ID, titulo ou empresa"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <Select
          value={municipality}
          onChange={(event) => setMunicipality(event.target.value)}
        >
          <option value="TODOS">Todos os municipios</option>
          {municipalities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Select
          value={status}
          onChange={(event) => setStatus(event.target.value as NotificationStatus | "TODOS")}
        >
          {allStatuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Button variant="outline">
          <Filter className="h-4 w-4" aria-hidden="true" />
          Filtrar
        </Button>
      </div>

      <Table>
        <THead>
          <TR>
            <TH>ID</TH>
            <TH>Empresa</TH>
            <TH>Municipio</TH>
            <TH>Tipo</TH>
            <TH>Data</TH>
            <TH>Status</TH>
            <TH>Visualizada?</TH>
            <TH>Respondida?</TH>
            <TH>PDF?</TH>
            <TH className="text-right">Acoes</TH>
          </TR>
        </THead>
        <TBody>
          <TR>
            <TD colSpan={10} className="whitespace-normal p-0">
              <EmptyState
                icon={Inbox}
                title="Nenhuma notificacao recebida"
                description="As notificacoes serao exibidas automaticamente quando forem enviadas pela integracao configurada com a origem externa."
                actionLabel="Configurar integracao"
                actionHref="/admin/integrations"
              />
            </TD>
          </TR>
        </TBody>
      </Table>
    </div>
  );
}
