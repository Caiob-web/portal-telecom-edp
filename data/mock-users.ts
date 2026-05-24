import type { User } from "@/types/database";

export const mockUsers: User[] = [
  {
    id: "usr-001",
    name: "Ana Ribeiro",
    email: "ana.ribeiro@edp.com",
    role: "ADMIN",
    status: "ATIVO",
    lastAccess: "2026-05-23T20:11:00.000Z"
  },
  {
    id: "usr-002",
    name: "Marcos Lima",
    email: "marcos.lima@edp.com",
    role: "ADMIN",
    status: "ATIVO",
    lastAccess: "2026-05-23T17:45:00.000Z"
  },
  {
    id: "usr-003",
    name: "Carla Menezes",
    email: "carla@telefonica.com",
    companyId: "cmp-telefonica",
    companyName: "TELEFONICA BRASIL S.A.",
    role: "EMPRESA",
    status: "ATIVO",
    lastAccess: "2026-05-22T13:40:00.000Z"
  },
  {
    id: "usr-004",
    name: "Daniel Costa",
    email: "daniel@claro.com",
    companyId: "cmp-claro",
    companyName: "CLARO S.A.",
    role: "EMPRESA",
    status: "ATIVO",
    lastAccess: "2026-05-21T18:15:00.000Z"
  },
  {
    id: "usr-005",
    name: "Renata Dias",
    email: "renata@vtal.com",
    companyId: "cmp-vtal",
    companyName: "V.TAL REDE NEUTRA DE TELECOMUNICACOES S.A.",
    role: "VISUALIZADOR",
    status: "PENDENTE",
    lastAccess: "2026-05-18T16:22:00.000Z"
  }
];
