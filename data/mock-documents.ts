import type { Document } from "@/types/database";

export const mockDocuments: Document[] = [
  {
    id: "doc-001",
    name: "notificacao-NTF-2026-0018.pdf",
    type: "PDF",
    uploadedAt: "2026-05-23T14:21:00.000Z",
    municipality: "SAO JOSE DOS CAMPOS",
    companyId: "cmp-telefonica",
    companyName: "TELEFONICA BRASIL S.A.",
    origin: "Base44",
    status: "DISPONIVEL",
    size: "1.8 MB",
    url: "#"
  },
  {
    id: "doc-002",
    name: "relatorio-fotografico-guarulhos.pdf",
    type: "RELATORIO",
    uploadedAt: "2026-05-22T10:08:00.000Z",
    municipality: "GUARULHOS",
    companyId: "cmp-claro",
    companyName: "CLARO S.A.",
    origin: "Upload manual",
    status: "DISPONIVEL",
    size: "2.4 MB",
    url: "#"
  },
  {
    id: "doc-003",
    name: "termo-finalizacao-suzano.pdf",
    type: "OFICIO",
    uploadedAt: "2026-05-18T16:11:00.000Z",
    municipality: "SUZANO",
    companyId: "cmp-desktop",
    companyName: "DESKTOP S.A.",
    origin: "Sistema interno",
    status: "ARQUIVADO",
    size: "980 KB",
    url: "#"
  },
  {
    id: "doc-004",
    name: "oficio-contrato-taubate.pdf",
    type: "PDF",
    uploadedAt: "2026-05-16T12:55:00.000Z",
    municipality: "TAUBATE",
    companyId: "cmp-vtal",
    companyName: "V.TAL REDE NEUTRA DE TELECOMUNICACOES S.A.",
    origin: "Base44",
    status: "PROCESSANDO",
    size: "1.1 MB",
    url: "#"
  }
];
