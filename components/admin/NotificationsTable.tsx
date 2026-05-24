"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye, Filter, Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";
import { municipalities } from "@/data/municipalities";
import { mockCompanies } from "@/data/mock-companies";
import { mockNotifications } from "@/data/mock-notifications";
import { formatDate } from "@/lib/utils";
import type { NotificationStatus } from "@/types/database";

const allStatuses: Array<NotificationStatus | "TODOS"> = [
  "TODOS",
  "NOVA",
  "EM_ANALISE",
  "RESPONDIDA",
  "FINALIZADA"
];

export function NotificationsTable() {
  const [company, setCompany] = useState("TODAS");
  const [municipality, setMunicipality] = useState("TODOS");
  const [status, setStatus] = useState<NotificationStatus | "TODOS">("TODOS");
  const [query, setQuery] = useState("");

  const notifications = useMemo(() => {
    return mockNotifications.filter((notification) => {
      const matchesCompany = company === "TODAS" || notification.companyId === company;
      const matchesMunicipality =
        municipality === "TODOS" || notification.municipality === municipality;
      const matchesStatus = status === "TODOS" || notification.status === status;
      const matchesQuery =
        notification.id.toLowerCase().includes(query.toLowerCase()) ||
        notification.title.toLowerCase().includes(query.toLowerCase());

      return matchesCompany && matchesMunicipality && matchesStatus && matchesQuery;
    });
  }, [company, municipality, query, status]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 rounded-lg border border-graphite-200 bg-white p-4 shadow-card lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-400"
            aria-hidden="true"
          />
          <Input
            className="pl-9"
            placeholder="Buscar por ID ou titulo"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <Select value={company} onChange={(event) => setCompany(event.target.value)}>
          <option value="TODAS">Todas as empresas</option>
          {mockCompanies.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
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
          {notifications.map((notification) => (
            <TR key={notification.id}>
              <TD className="font-bold text-brand-700">{notification.id}</TD>
              <TD>{notification.companyName}</TD>
              <TD>{notification.municipality}</TD>
              <TD>{notification.type}</TD>
              <TD>{formatDate(notification.receivedAt)}</TD>
              <TD>
                <StatusBadge status={notification.status} />
              </TD>
              <TD>
                <Badge variant={notification.viewed ? "green" : "amber"}>
                  {notification.viewed ? "Sim" : "Nao"}
                </Badge>
              </TD>
              <TD>
                <Badge variant={notification.answered ? "green" : "gray"}>
                  {notification.answered ? "Sim" : "Nao"}
                </Badge>
              </TD>
              <TD>
                <Badge variant={notification.pdfLinked ? "blue" : "gray"}>
                  {notification.pdfLinked ? "Sim" : "Nao"}
                </Badge>
              </TD>
              <TD>
                <div className="flex justify-end">
                  <Link
                    href={`/dashboard/notifications/${notification.id}`}
                    className={buttonStyles("ghost", "icon")}
                    aria-label="Ver detalhes"
                  >
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
