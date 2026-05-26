import { Database, ExternalLink, FileText } from "lucide-react";

import type { AdminDocumentRow } from "@/lib/admin-data";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";

const originLabel: Record<AdminDocumentRow["origin"], string> = {
  UPLOAD_MANUAL: "Upload manual",
  EXTERNAL_API: "API externa",
  INTERNAL_SYSTEM: "Sistema interno"
};

const statusLabel: Record<AdminDocumentRow["status"], string> = {
  DISPONIVEL: "Disponível",
  PROCESSANDO: "Processando",
  ARQUIVADO: "Arquivado",
  PENDENTE: "Pendente"
};

export function DocumentsTable({
  documents,
  configured,
  error
}: {
  documents: AdminDocumentRow[];
  configured: boolean;
  error?: string;
}) {
  if (!configured) {
    return (
      <EmptyState
        icon={Database}
        title="Banco de dados não configurado"
        description="Configure a variável DATABASE_URL para carregar documentos do Neon."
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={Database}
        title="Não foi possível carregar documentos"
        description={error}
      />
    );
  }

  if (!documents.length) {
    return (
      <EmptyState
        icon={FileText}
        title="Nenhum documento disponível"
        description="PDFs, anexos e links recebidos pela integração aparecerão aqui quando forem enviados pela origem externa."
      />
    );
  }

  return (
    <Table>
      <THead>
        <TR>
          <TH>Documento</TH>
          <TH>Empresa vinculada</TH>
          <TH>Município</TH>
          <TH>Upload</TH>
          <TH>Origem</TH>
          <TH>Status</TH>
          <TH>Tamanho</TH>
          <TH className="text-right">Ações</TH>
        </TR>
      </THead>
      <TBody>
        {documents.map((document) => (
          <TR key={document.id}>
            <TD className="font-semibold text-graphite-950">{document.name}</TD>
            <TD>{document.companyLegalName ?? "Empresa não vinculada"}</TD>
            <TD>{document.municipality ?? "-"}</TD>
            <TD>{formatDateTime(document.uploadedAt)}</TD>
            <TD>{originLabel[document.origin]}</TD>
            <TD>
              <Badge variant={document.status === "DISPONIVEL" ? "green" : "gray"}>
                {statusLabel[document.status]}
              </Badge>
            </TD>
            <TD>{document.size ?? "-"}</TD>
            <TD className="text-right">
              <a
                className="inline-flex items-center justify-end gap-1 text-sm font-bold text-brand-800 hover:text-edp-700"
                href={document.url}
                target="_blank"
                rel="noreferrer"
              >
                Abrir link
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
