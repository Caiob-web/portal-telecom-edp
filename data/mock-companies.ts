import type { Company } from "@/types/database";

export const mockCompanies: Company[] = [
  {
    id: "cmp-telefonica",
    name: "TELEFONICA BRASIL S.A.",
    cnpj: "02.558.157/0001-62",
    primaryEmail: "gestao.postes@telefonica.com",
    status: "ATIVA",
    usersCount: 8,
    notificationsCount: 34,
    pendingCount: 5,
    lastAccess: "2026-05-22T13:40:00.000Z",
    mainMunicipality: "SAO JOSE DOS CAMPOS"
  },
  {
    id: "cmp-claro",
    name: "CLARO S.A.",
    cnpj: "40.432.544/0001-47",
    primaryEmail: "infraestrutura@claro.com",
    status: "ATIVA",
    usersCount: 6,
    notificationsCount: 28,
    pendingCount: 7,
    lastAccess: "2026-05-21T18:15:00.000Z",
    mainMunicipality: "GUARULHOS"
  },
  {
    id: "cmp-tim",
    name: "TIM S.A.",
    cnpj: "02.421.421/0001-11",
    primaryEmail: "compartilhamento@tim.com",
    status: "ATIVA",
    usersCount: 5,
    notificationsCount: 19,
    pendingCount: 2,
    lastAccess: "2026-05-20T09:10:00.000Z",
    mainMunicipality: "MOGI DAS CRUZES"
  },
  {
    id: "cmp-vtal",
    name: "V.TAL REDE NEUTRA DE TELECOMUNICACOES S.A.",
    cnpj: "02.041.460/0001-93",
    primaryEmail: "operacoes@vtal.com",
    status: "PENDENTE",
    usersCount: 3,
    notificationsCount: 14,
    pendingCount: 6,
    lastAccess: "2026-05-18T16:22:00.000Z",
    mainMunicipality: "TAUBATE"
  },
  {
    id: "cmp-desktop",
    name: "DESKTOP S.A.",
    cnpj: "08.170.849/0001-15",
    primaryEmail: "regulatorio@desktop.com",
    status: "ATIVA",
    usersCount: 4,
    notificationsCount: 11,
    pendingCount: 1,
    lastAccess: "2026-05-19T11:32:00.000Z",
    mainMunicipality: "SUZANO"
  },
  {
    id: "cmp-algar",
    name: "ALGAR TELECOM S.A.",
    cnpj: "71.208.516/0001-74",
    primaryEmail: "telecom.edp@algar.com",
    status: "ATIVA",
    usersCount: 2,
    notificationsCount: 8,
    pendingCount: 0,
    lastAccess: "2026-05-17T12:01:00.000Z",
    mainMunicipality: "LORENA"
  }
];

export const registrationCompanies = [
  "TELEFONICA BRASIL S.A.",
  "CLARO S.A.",
  "TIM S.A.",
  "V.TAL REDE NEUTRA DE TELECOMUNICACOES S.A.",
  "DESKTOP S.A.",
  "ALGAR TELECOM S.A.",
  "OUTRA EMPRESA"
];
