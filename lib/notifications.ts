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
  legal_name?: string;
  trade_name?: string | null;
};

type NotificationInsertRow = {
  id: string;
  company_id: string | null;
  due_at: string | null;
  deadline_days: number | null;
};

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function normalizeCompanyName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase();
}

function asNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value.replace(",", "."));
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
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

function normalizeDueAt(receivedAt: string, payload: ExternalNotificationPayload) {
  const explicitDueAt = asString(payload.dueAt) || asString(payload.dueDate);
  const deadlineDays =
    asNumber(payload.deadlineDays) ??
    asNumber(payload.prazoDias) ??
    asNumber(payload.daysToRespond);

  if (explicitDueAt) {
    const date = new Date(explicitDueAt);
    return {
      dueAt: Number.isNaN(date.getTime()) ? null : date.toISOString(),
      deadlineDays
    };
  }

  if (deadlineDays && deadlineDays > 0) {
    const date = new Date(receivedAt);
    date.setDate(date.getDate() + deadlineDays);
    return {
      dueAt: date.toISOString(),
      deadlineDays
    };
  }

  return { dueAt: null, deadlineDays };
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
  companyDocument: string,
  companyName: string
) {
  const cnpj = onlyDigits(companyDocument);

  if (!cnpj) {
    const normalizedPayloadName = normalizeCompanyName(companyName);

    if (!normalizedPayloadName) {
      return null;
    }

    const result = await client.query<CompanyLookupRow>(
      "SELECT id, legal_name, trade_name FROM companies LIMIT 600"
    );

    const company = result.rows.find((row) => {
      const legalName = normalizeCompanyName(row.legal_name ?? "");
      const tradeName = normalizeCompanyName(row.trade_name ?? "");

      return (
        legalName === normalizedPayloadName ||
        tradeName === normalizedPayloadName ||
        legalName.includes(normalizedPayloadName) ||
        normalizedPayloadName.includes(legalName)
      );
    });

    return company?.id ?? null;
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
  const street =
    asString(payload.street) || asString(payload.rua) || asString(payload.address);
  const notificationType = asString(payload.type) || "NOTIFICACAO";
  const sourceUrl = asString(payload.notificationUrl);
  const receivedAt = normalizeReceivedAt(payload.receivedAt);
  const { dueAt, deadlineDays } = normalizeDueAt(receivedAt, payload);

  const result = await client.query<NotificationInsertRow>(
    `INSERT INTO portal_notifications (
       company_id,
       external_source,
       external_id,
       company_document,
       company_name,
       title,
       description,
       municipality,
       street,
       notification_type,
       deadline_days,
       due_at,
       source_url,
       received_at,
       status,
       execution_status,
       updated_at
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 'NOVA', 'PENDENTE', NOW())
     ON CONFLICT (external_source, external_id)
     DO UPDATE SET
       company_id = EXCLUDED.company_id,
       company_document = EXCLUDED.company_document,
       company_name = EXCLUDED.company_name,
       title = EXCLUDED.title,
       description = EXCLUDED.description,
       municipality = EXCLUDED.municipality,
       street = EXCLUDED.street,
       notification_type = EXCLUDED.notification_type,
       deadline_days = EXCLUDED.deadline_days,
       due_at = EXCLUDED.due_at,
       source_url = EXCLUDED.source_url,
       received_at = EXCLUDED.received_at,
       updated_at = NOW()
     RETURNING id, company_id, due_at, deadline_days`,
    [
      companyId,
      externalSource,
      externalId,
      companyDocument || null,
      companyName || null,
      title,
      description || null,
      municipality || null,
      street || null,
      notificationType,
      deadlineDays,
      dueAt,
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
    municipality,
    dueAt: notification.due_at,
    deadlineDays: notification.deadline_days
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
  const files = Array.isArray(payload.files) ? [...payload.files] : [];
  const pdfUrl = asString(payload.pdfUrl);

  if (pdfUrl) {
    files.push({
      name: asString(payload.pdfName) || `Notificação ${notification.externalId}.pdf`,
      mimeType: "application/pdf",
      url: pdfUrl
    });
  }

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
      `INSERT INTO portal_documents (
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
      asString(payload.companyDocument),
      asString(payload.companyName)
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
          documentsSaved,
          dueAt: notification.dueAt,
          deadlineDays: notification.deadlineDays
        })
      ]
    );

    return {
      id: notification.id,
      externalId: notification.externalId,
      externalSource: notification.externalSource,
      companyId,
      documentsSaved,
      routed: Boolean(companyId),
      dueAt: notification.dueAt,
      deadlineDays: notification.deadlineDays
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
