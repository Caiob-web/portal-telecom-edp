export type UserRole = "ADMIN" | "EMPRESA" | "VISUALIZADOR";

export type NotificationStatus =
  | "NOVA"
  | "EM_ANALISE"
  | "RESPONDIDA"
  | "FINALIZADA";

export type CompanyStatus = "ATIVA" | "PENDENTE" | "INATIVA";

export type DocumentStatus = "DISPONIVEL" | "PROCESSANDO" | "ARQUIVADO";

export interface Company {
  id: string;
  name: string;
  cnpj: string;
  primaryEmail: string;
  status: CompanyStatus;
  usersCount: number;
  notificationsCount: number;
  pendingCount: number;
  lastAccess: string;
  mainMunicipality: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  companyId?: string;
  companyName?: string;
  role: UserRole;
  status: "ATIVO" | "PENDENTE" | "INATIVO";
  lastAccess: string;
}

export interface NotificationAttachment {
  id: string;
  name: string;
  type: "PDF" | "IMAGEM" | "PLANILHA";
  size: string;
  url: string;
}

export interface Notification {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  municipality: string;
  receivedAt: string;
  type: string;
  status: NotificationStatus;
  description: string;
  viewed: boolean;
  answered: boolean;
  pdfLinked: boolean;
  attachments: NotificationAttachment[];
}

export interface Document {
  id: string;
  name: string;
  type: "PDF" | "RELATORIO" | "OFICIO" | "ANEXO";
  uploadedAt: string;
  municipality: string;
  companyId: string;
  companyName: string;
  origin: "Upload manual" | "Base44" | "Sistema interno";
  status: DocumentStatus;
  size: string;
  url: string;
}

export interface AuditLog {
  id: string;
  userName: string;
  action: string;
  entity: string;
  createdAt: string;
  ipAddress: string;
}
