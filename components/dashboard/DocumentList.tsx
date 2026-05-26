import { FileText } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export function DocumentList({ companyOnly: _companyOnly = true }: { companyOnly?: boolean }) {
  return (
    <EmptyState
      icon={FileText}
      title="Nenhum documento disponivel"
      description="Os documentos vinculados às notificações serão exibidos aqui quando forem recebidos pela integração."
    />
  );
}
