import { Download, Eye, FileText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";
import { mockDocuments } from "@/data/mock-documents";
import { formatDateTime } from "@/lib/utils";

export function DocumentsTable() {
  return (
    <Table>
      <THead>
        <TR>
          <TH>Documento</TH>
          <TH>Empresa vinculada</TH>
          <TH>Municipio</TH>
          <TH>Upload</TH>
          <TH>Origem</TH>
          <TH>Status</TH>
          <TH>Tamanho</TH>
          <TH className="text-right">Acoes</TH>
        </TR>
      </THead>
      <TBody>
        {mockDocuments.map((document) => (
          <TR key={document.id}>
            <TD>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-edp-50 text-edp-700">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-graphite-950">{document.name}</p>
                  <p className="text-xs text-graphite-500">{document.type}</p>
                </div>
              </div>
            </TD>
            <TD>{document.companyName}</TD>
            <TD>{document.municipality}</TD>
            <TD>{formatDateTime(document.uploadedAt)}</TD>
            <TD>
              <Badge
                variant={
                  document.origin === "Base44"
                    ? "blue"
                    : document.origin === "Upload manual"
                      ? "green"
                      : "gray"
                }
              >
                {document.origin}
              </Badge>
            </TD>
            <TD>{document.status}</TD>
            <TD>{document.size}</TD>
            <TD>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" aria-label="Visualizar">
                  <Eye className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Baixar">
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
