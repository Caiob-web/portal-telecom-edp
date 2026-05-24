export const mockAdminStats = {
  totals: {
    companies: 6,
    users: 27,
    notifications: 114,
    documents: 68,
    openNotifications: 31,
    closedNotifications: 83
  },
  monthlyNotifications: [
    { month: "Jan", total: 18 },
    { month: "Fev", total: 26 },
    { month: "Mar", total: 21 },
    { month: "Abr", total: 32 },
    { month: "Mai", total: 17 }
  ],
  pendingByCompany: [
    { company: "CLARO S.A.", total: 7 },
    { company: "V.TAL", total: 6 },
    { company: "TELEFONICA", total: 5 },
    { company: "TIM", total: 2 }
  ],
  lastAccesses: [
    { name: "Ana Ribeiro", company: "EDP", at: "2026-05-23T20:11:00.000Z" },
    {
      name: "Carla Menezes",
      company: "TELEFONICA BRASIL S.A.",
      at: "2026-05-22T13:40:00.000Z"
    },
    { name: "Daniel Costa", company: "CLARO S.A.", at: "2026-05-21T18:15:00.000Z" }
  ],
  base44Logs: [
    {
      id: "log-001",
      event: "Sincronizacao simulada",
      status: "Ignorada",
      at: "2026-05-23T08:00:00.000Z"
    },
    {
      id: "log-002",
      event: "Validacao de endpoint pendente",
      status: "Nao configurada",
      at: "2026-05-22T08:00:00.000Z"
    }
  ]
};
