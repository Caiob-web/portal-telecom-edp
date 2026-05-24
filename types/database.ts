import type {
  Notification,
  NotificationAttachment,
  NotificationStatus
} from "@/types/notification";

export type { Notification, NotificationAttachment, NotificationStatus };

export type UserRole = "ADMIN" | "EMPRESA" | "VISUALIZADOR";
export type UserStatus = "PENDENTE" | "APROVADO" | "BLOQUEADO" | "ATIVO" | "INATIVO";
export type CompanyStatus = "ATIVA" | "PENDENTE" | "INATIVA";
export type DocumentStatus = "DISPONIVEL" | "PROCESSANDO" | "ARQUIVADO" | "PENDENTE";

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
  status: UserStatus;
  lastAccess: string;
}

export interface Document {
  id: string;
  name: string;
  type: "PDF" | "RELATORIO" | "OFICIO" | "ANEXO";
  uploadedAt: string;
  municipality: string;
  companyId: string;
  companyName: string;
  origin: "UPLOAD_MANUAL" | "EXTERNAL_API" | "INTERNAL_SYSTEM";
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
