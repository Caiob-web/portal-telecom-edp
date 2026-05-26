import "server-only";
import type { PoolClient } from "@neondatabase/serverless";

import { withTransaction } from "@/lib/db";
import type {
  ExternalNotificationPayload,
  Notification,
  NotificationValidationResult,
  StoredExternalNotification
} from "@/types/notification";

type CompanyLookupRow = {
  id: string;
};

type NotificationInsertRow = {
  id: string;
  company_id: string | null;
};

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function normalizeSource(source: ExternalNotificationPayload["source"]) {
  return source === "BASE44" ? "BASE44" : "EXTERNAL_API";
}

function normalizeReceivedAt(value?: string) {
  if (!value) {
    return new Date().toISOString();
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function fetchNotificationsFromSource(): Promise<Notification[]> {
  // Implementação futura: consultar a origem externa se houver necessidade de pull.
  // O fluxo principal previsto é receber notificações por POST e persistir no Neon.
  return [];
}

export function validateNotificationPayload(
  payload: ExternalNotificationPayload
): NotificationValidationResult {
  const errors: string[] = [];
  const externalId = asString(payload.externalId);
  const title = asString(payload.title);
  const notificationUrl = asString(payload.notificationUrl);
  const files = Array.isArray(payload.files) ? payload.files : [];

  if (!externalId) {
    errors.push("externalId é obrigatório.");
  }

  if (!title) {
    errors.push("title é obrigatório.");
  }

  if (notificationUrl && !isHttpUrl(notificationUrl)) {
    errors.push("notificationUrl deve ser um link HTTP ou HTTPS válido.");
  }

  files.forEach((file, index) => {
    const fileUrl = asString(file.url);
    if (!fileUrl) {
      errors.push(`files[${index}].url é obrigatório quando um arquivo é enviado.`);
      return;
    }

    if (!isHttpUrl(fileUrl)) {
      errors.push(`files[${index}].url deve ser um link HTTP ou HTTPS válido.`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

async function findCompanyByDocument(
  client: PoolClient,
  companyDocument: string
) {
  const cnpj = onlyDigits(companyDocument);

  if (!cnpj) {
    return null;
  }

  const result = await client.query<CompanyLookupRow>(
    "SELECT id FROM companies WHERE cnpj = $1 LIMIT 1",
    [cnpj]
  );

  return result.rows[0]?.id ?? null;
}

async function upsertExternalNotification(
  client: PoolClient,
  payload: ExternalNotificationPayload,
  companyId: string | null
) {
  const externalSource = normalizeSource(payload.source);
  const externalId = asString(payload.externalId);
  const companyDocument = onlyDigits(asString(payload.companyDocument));
  const companyName = asString(payload.companyName);
  const title = asString(payload.title);
  const description = asString(payload.description);
  const municipality = asString(payload.municipality);
  const notificationType = asString(payload.type) || "NOTIFICACAO";
  const sourceUrl = asString(payload.notificationUrl);
  const receivedAt = normalizeReceivedAt(payload.receivedAt);

  const result = await client.query<NotificationInsertRow>(
    `INSERT INTO notifications (
       company_id,
       external_source,
       external_id,
       company_document,
       company_name,
       title,
       description,
       municipality,
       notification_type,
       source_url,
       received_at,
       status,
       updated_at
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'NOVA', NOW())
     ON CONFLICT (external_source, external_id)
     DO UPDATE SET
       company_id = EXCLUDED.company_id,
       company_document = EXCLUDED.company_document,
       company_name = EXCLUDED.company_name,
       title = EXCLUDED.title,
       description = EXCLUDED.description,
       municipality = EXCLUDED.municipality,
       notification_type = EXCLUDED.notification_type,
       source_url = EXCLUDED.source_url,
       received_at = EXCLUDED.received_at,
       updated_at = NOW()
     RETURNING id, company_id`,
    [
      companyId,
      externalSource,
      externalId,
      companyDocument || null,
      companyName || null,
      title,
      description || null,
      municipality || null,
      notificationType,
      sourceUrl || null,
      receivedAt
    ]
  );

  const notification = result.rows[0];

  if (!notification) {
    throw new Error("Notification insert failed.");
  }

  return {
    id: notification.id,
    companyId: notification.company_id,
    externalSource,
    externalId,
    municipality
  };
}

async function saveNotificationDocuments(
  client: PoolClient,
  payload: ExternalNotificationPayload,
  notification: {
    id: string;
    companyId: string | null;
    externalSource: string;
    externalId: string;
    municipality: string;
  }
) {
  const files = Array.isArray(payload.files) ? payload.files : [];
  let saved = 0;

  for (const file of files) {
    const fileUrl = asString(file.url);
    if (!fileUrl) {
      continue;
    }

    const fileName = asString(file.name) || "Documento recebido";
    const mimeType = asString(file.mimeType) || "application/pdf";
    const documentType = mimeType.includes("pdf") ? "PDF" : "ANEXO";
    const size = asString(file.size);

    await client.query(
      `INSERT INTO documents (
         company_id,
         notification_id,
         external_source,
         external_id,
         name,
         document_type,
         file_url,
         mime_type,
         size_label,
         municipality,
         origin,
         status,
         uploaded_at,
         updated_at
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'EXTERNAL_API', 'DISPONIVEL', NOW(), NOW())
       ON CONFLICT (notification_id, file_url)
       DO UPDATE SET
         name = EXCLUDED.name,
         document_type = EXCLUDED.document_type,
         mime_type = EXCLUDED.mime_type,
         size_label = EXCLUDED.size_label,
         municipality = EXCLUDED.municipality,
         updated_at = NOW()`,
      [
        notification.companyId,
        notification.id,
        notification.externalSource,
        notification.externalId,
        fileName,
        documentType,
        fileUrl,
        mimeType || null,
        size || null,
        notification.municipality || null
      ]
    );
    saved += 1;
  }

  return saved;
}

export async function persistExternalNotification(
  payload: ExternalNotificationPayload
): Promise<StoredExternalNotification> {
  const validation = validateNotificationPayload(payload);

  if (!validation.valid) {
    const error = new Error(validation.errors.join(" "));
    error.name = "NotificationValidationError";
    throw error;
  }

  return withTransaction(async (client) => {
    const companyId = await findCompanyByDocument(
      client,
      asString(payload.companyDocument)
    );
    const notification = await upsertExternalNotification(client, payload, companyId);
    const documentsSaved = await saveNotificationDocuments(client, payload, notification);

    await client.query(
      `INSERT INTO audit_logs (user_id, action, entity_type, entity_id, metadata)
       VALUES (NULL, 'EXTERNAL_NOTIFICATION_RECEIVED', 'notification', $1, $2::jsonb)`,
      [
        notification.id,
        JSON.stringify({
          externalSource: notification.externalSource,
          externalId: notification.externalId,
          companyId,
          documentsSaved
        })
      ]
    );

    return {
      id: notification.id,
      externalId: notification.externalId,
      externalSource: notification.externalSource,
      companyId,
      documentsSaved,
      routed: Boolean(companyId)
    };
  });
}

export async function receiveExternalNotification(
  payload: ExternalNotificationPayload
): Promise<NotificationValidationResult> {
  return validateNotificationPayload(payload);
}

export function mapExternalNotificationToPortal(
  _payload: ExternalNotificationPayload
): Notification | null {
  // O mapeamento visual do detalhe será usado quando a área logada consumir dados reais.
  return null;
}

export async function routeNotificationToCompany(
  notification: Notification
): Promise<{ companyId: string | null }> {
  return { companyId: notification.companyId || null };
}
