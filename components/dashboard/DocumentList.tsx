import { Download, Eye, FileText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";
import { mockDocuments } from "@/data/mock-documents";
import { formatDate } from "@/lib/utils";

export function DocumentList({ companyOnly = true }: { companyOnly?: boolean }) {
  const documents = companyOnly
    ? mockDocuments.filter((document) => document.companyId === "cmp-telefonica")
    : mockDocuments;

  return (
    <Table>
      <THead>
        <TR>
          <TH>Arquivo</TH>
          <TH>Tipo</TH>
          <TH>Data</TH>
          <TH>Municipio</TH>
          <TH>Status</TH>
          <TH className="text-right">Acoes</TH>
        </TR>
      </THead>
      <TBody>
        {documents.map((document) => (
          <TR key={document.id}>
            <TD>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-graphite-950">{document.name}</p>
                  <p className="text-xs text-graphite-500">{document.size}</p>
                </div>
              </div>
            </TD>
            <TD>{document.type}</TD>
            <TD>{formatDate(document.uploadedAt)}</TD>
            <TD>{document.municipality}</TD>
            <TD>
              <Badge
                variant={
                  document.status === "DISPONIVEL"
                    ? "green"
                    : document.status === "PROCESSANDO"
                      ? "amber"
                      : "gray"
                }
              >
                {document.status.toLowerCase()}
              </Badge>
            </TD>
            <TD>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" aria-label="Visualizar documento">
                  <Eye className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Baixar documento">
                  <Download className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
