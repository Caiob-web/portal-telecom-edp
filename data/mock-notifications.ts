import type { Notification } from "@/types/database";

export const mockNotifications: Notification[] = [
  {
    id: "NTF-2026-0018",
    title: "Regularizacao de ocupacao em poste",
    companyId: "cmp-telefonica",
    companyName: "TELEFONICA BRASIL S.A.",
    municipality: "SAO JOSE DOS CAMPOS",
    receivedAt: "2026-05-23T14:20:00.000Z",
    type: "Ocupacao irregular",
    status: "NOVA",
    description:
      "Notificacao referente a ocupacao identificada em rede de distribuicao com necessidade de conferencia documental e retorno tecnico.",
    viewed: false,
    answered: false,
    pdfLinked: true,
    attachments: [
      {
        id: "att-001",
        name: "notificacao-NTF-2026-0018.pdf",
        type: "PDF",
        size: "1.8 MB",
        url: "#"
      }
    ]
  },
  {
    id: "NTF-2026-0017",
    title: "Solicitacao de adequacao de infraestrutura",
    companyId: "cmp-claro",
    companyName: "CLARO S.A.",
    municipality: "GUARULHOS",
    receivedAt: "2026-05-22T10:05:00.000Z",
    type: "Adequacao tecnica",
    status: "EM_ANALISE",
    description:
      "Pedido de regularizacao de afastamento e revisao de pontos compartilhados em trecho urbano monitorado pela EDP.",
    viewed: true,
    answered: false,
    pdfLinked: true,
    attachments: [
      {
        id: "att-002",
        name: "relatorio-fotografico-guarulhos.pdf",
        type: "PDF",
        size: "2.4 MB",
        url: "#"
      }
    ]
  },
  {
    id: "NTF-2026-0016",
    title: "Resposta administrativa pendente",
    companyId: "cmp-tim",
    companyName: "TIM S.A.",
    municipality: "MOGI DAS CRUZES",
    receivedAt: "2026-05-20T08:35:00.000Z",
    type: "Pendencia documental",
    status: "RESPONDIDA",
    description:
      "Empresa enviou retorno inicial. A equipe administrativa deve validar anexos e registrar aceite ou nova exigencia.",
    viewed: true,
    answered: true,
    pdfLinked: false,
    attachments: []
  },
  {
    id: "NTF-2026-0015",
    title: "Encerramento de tratativa de campo",
    companyId: "cmp-desktop",
    companyName: "DESKTOP S.A.",
    municipality: "SUZANO",
    receivedAt: "2026-05-18T16:10:00.000Z",
    type: "Fiscalizacao",
    status: "FINALIZADA",
    description:
      "Tratativa concluida apos comprovacao de adequacao em campo e atualizacao dos registros operacionais.",
    viewed: true,
    answered: true,
    pdfLinked: true,
    attachments: [
      {
        id: "att-003",
        name: "termo-finalizacao-suzano.pdf",
        type: "PDF",
        size: "980 KB",
        url: "#"
      }
    ]
  },
  {
    id: "NTF-2026-0014",
    title: "Conferencia de contrato de compartilhamento",
    companyId: "cmp-vtal",
    companyName: "V.TAL REDE NEUTRA DE TELECOMUNICACOES S.A.",
    municipality: "TAUBATE",
    receivedAt: "2026-05-16T12:50:00.000Z",
    type: "Contrato",
    status: "EM_ANALISE",
    description:
      "Analise de vinculo contratual para ocupacoes informadas no municipio e solicitacao de documentos complementares.",
    viewed: true,
    answered: false,
    pdfLinked: true,
    attachments: [
      {
        id: "att-004",
        name: "oficio-contrato-taubate.pdf",
        type: "PDF",
        size: "1.1 MB",
        url: "#"
      }
    ]
  }
];
