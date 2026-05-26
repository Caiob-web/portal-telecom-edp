import { FileText } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";

export function DocumentsTable() {
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
          <TH className="text-right">Acoes</TH>
        </TR>
      </THead>
      <TBody>
        <TR>
          <TD colSpan={8} className="whitespace-normal p-0">
            <EmptyState
              icon={FileText}
              title="Nenhum documento disponivel"
              description="PDFs, anexos e uploads administrativos aparecerão aqui quando a integração e o armazenamento forem configurados."
            />
          </TD>
        </TR>
      </TBody>
    </Table>
  );
}
