"use client";

import { useState } from "react";
import { Building2, Eye, Pencil, Power } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";
import { mockCompanies } from "@/data/mock-companies";
import { formatDateTime } from "@/lib/utils";
import type { Company } from "@/types/database";

export function CompaniesTable() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  return (
    <div className="space-y-4">
      <Table>
        <THead>
          <TR>
            <TH>Empresa</TH>
            <TH>CNPJ</TH>
            <TH>E-mail principal</TH>
            <TH>Status</TH>
            <TH>Usuarios</TH>
            <TH>Notificacoes</TH>
            <TH>Ultimo acesso</TH>
            <TH className="text-right">Acoes</TH>
          </TR>
        </THead>
        <TBody>
          {mockCompanies.map((company) => (
            <TR key={company.id}>
              <TD>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                    <Building2 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-graphite-950">{company.name}</p>
                    <p className="text-xs text-graphite-500">
                      {company.mainMunicipality}
                    </p>
                  </div>
                </div>
              </TD>
              <TD>{company.cnpj}</TD>
              <TD>{company.primaryEmail}</TD>
              <TD>
                <Badge
                  variant={
                    company.status === "ATIVA"
                      ? "green"
                      : company.status === "PENDENTE"
                        ? "amber"
                        : "gray"
                  }
                >
                  {company.status}
                </Badge>
              </TD>
              <TD>{company.usersCount}</TD>
              <TD>{company.notificationsCount}</TD>
              <TD>{formatDateTime(company.lastAccess)}</TD>
              <TD>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Ver detalhes"
                    onClick={() => setSelectedCompany(company)}
                  >
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button type="button" variant="outline" size="icon" aria-label="Editar">
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Ativar ou inativar"
                  >
                    <Power className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>

      {selectedCompany ? (
        <div className="fixed inset-0 z-40 flex justify-end bg-graphite-950/30 backdrop-blur-sm">
          <aside className="h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-panel">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-brand-700">
                  Detalhes da empresa
                </p>
                <h2 className="mt-2 text-xl font-bold text-graphite-950">
                  {selectedCompany.name}
                </h2>
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setSelectedCompany(null)}
              >
                Fechar
              </Button>
            </div>

            <div className="mt-6 grid gap-3">
              {[
                ["CNPJ", selectedCompany.cnpj],
                ["E-mail principal", selectedCompany.primaryEmail],
                ["Municipio principal", selectedCompany.mainMunicipality],
                ["Usuarios", selectedCompany.usersCount.toString()],
                ["Notificacoes", selectedCompany.notificationsCount.toString()],
                ["Pendencias", selectedCompany.pendingCount.toString()]
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
          </aside>
        </div>
      ) : null}
    </div>
  );
}
