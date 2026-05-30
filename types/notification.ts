export type NotificationStatus =
  | "NOVA"
  | "EM_ANALISE"
  | "RESPONDIDA"
  | "FINALIZADA";

export type NotificationExecutionStatus =
  | "PENDENTE"
  | "ENVIADA"
  | "VALIDADA"
  | "REPROVADA";

export interface NotificationAttachment {
  id: string;
  name: string;
  type: "PDF" | "IMAGEM" | "PLANILHA" | "OUTRO";
  size: string;
  url: string;
}

export interface Notification {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  municipality: string;
  street?: string | null;
  receivedAt: string;
  dueAt?: string | null;
  deadlineDays?: number | null;
  type: string;
  status: NotificationStatus;
  executionStatus?: NotificationExecutionStatus;
  description: string;
  viewed: boolean;
  answered: boolean;
  pdfLinked: boolean;
  responseFileUrl?: string | null;
  attachments: NotificationAttachment[];
}

export interface ExternalNotificationPayload {
  externalId: string;
  source?: "BASE44" | "EXTERNAL_API";
  companyDocument?: string;
  companyName?: string;
  municipality?: string;
  street?: string;
  rua?: string;
  address?: string;
  title?: string;
  description?: string;
  type?: string;
  receivedAt?: string;
  dueAt?: string;
  dueDate?: string;
  deadlineDays?: number | string;
  prazoDias?: number | string;
  daysToRespond?: number | string;
  notificationUrl?: string;
  pdfUrl?: string;
  pdfName?: string;
  files?: Array<{
    name: string;
    mimeType: string;
    size?: string;
    url?: string;
  }>;
}

export interface NotificationValidationResult {
  valid: boolean;
  errors: string[];
}

export interface StoredExternalNotification {
  id: string;
  externalId: string;
  externalSource: string;
  companyId: string | null;
  documentsSaved: number;
  routed: boolean;
  dueAt: string | null;
  deadlineDays: number | null;
}
