export type NotificationStatus =
  | "NOVA"
  | "EM_ANALISE"
  | "RESPONDIDA"
  | "FINALIZADA";

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
  receivedAt: string;
  type: string;
  status: NotificationStatus;
  description: string;
  viewed: boolean;
  answered: boolean;
  pdfLinked: boolean;
  attachments: NotificationAttachment[];
}

export interface ExternalNotificationPayload {
  externalId: string;
  source?: "BASE44" | "EXTERNAL_API";
  companyDocument?: string;
  companyName?: string;
  municipality?: string;
  title?: string;
  description?: string;
  type?: string;
  receivedAt?: string;
  notificationUrl?: string;
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
}
