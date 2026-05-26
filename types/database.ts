import type {
  Notification,
  NotificationAttachment,
  NotificationStatus
} from "@/types/notification";

export type { Notification, NotificationAttachment, NotificationStatus };

export type UserRole = "ADMIN" | "COMPANY_ADMIN" | "COMPANY_USER" | "VIEWER";
export type UserStatus = "PENDING" | "APPROVED" | "BLOCKED" | "INACTIVE";
export type CompanyStatus = "PENDING" | "APPROVED" | "BLOCKED" | "INACTIVE";
export type AccessRequestStatus = "PENDING" | "APPROVED" | "REJECTED";
export type DocumentStatus = "DISPONIVEL" | "PROCESSANDO" | "ARQUIVADO" | "PENDENTE";

export interface Company {
  id: string;
  legalName: string;
  tradeName: string | null;
  cnpj: string;
  mainEmail: string;
  phone: string | null;
  mainCity: string | null;
  companyType: string | null;
  status: CompanyStatus;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  companyId: string | null;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
}

export interface UserRecord extends User {
  passwordHash: string;
}

export type SafeUser = User;

export interface AccessRequest {
  id: string;
  companyId: string;
  userId: string;
  requestStatus: AccessRequestStatus;
  requestedAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
  notes: string | null;
}

export interface AuditLog {
  id: string;
  userId: string | null;
  action: string;
  entityType: string | null;
  entityId: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: "PDF" | "RELATORIO" | "OFICIO" | "ANEXO";
  uploadedAt: string;
  municipality: string;
  companyId: string | null;
  companyName: string | null;
  origin: "UPLOAD_MANUAL" | "EXTERNAL_API" | "INTERNAL_SYSTEM";
  status: DocumentStatus;
  size: string | null;
  url: string;
  notificationId?: string | null;
}
