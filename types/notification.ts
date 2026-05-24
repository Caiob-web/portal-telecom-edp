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
  source: "EXTERNAL_API";
  companyDocument?: string;
  municipality?: string;
  title?: string;
  description?: string;
  receivedAt?: string;
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
