import type {
  ExternalNotificationPayload,
  Notification,
  NotificationValidationResult
} from "@/types/notification";

export async function fetchNotificationsFromSource(): Promise<Notification[]> {
  // Implementacao futura: consultar a origem externa de notificacoes,
  // inicialmente prevista para a API do Base44, e persistir no Neon Database.
  return [];
}

export async function receiveExternalNotification(
  payload: ExternalNotificationPayload
): Promise<NotificationValidationResult> {
  // Implementacao futura: validar assinatura/token, normalizar payload e gravar no Neon.
  return validateNotificationPayload(payload);
}

export function mapExternalNotificationToPortal(
  _payload: ExternalNotificationPayload
): Notification | null {
  // Implementacao futura: transformar o contrato externo no modelo interno do portal.
  return null;
}

export function validateNotificationPayload(
  payload: ExternalNotificationPayload
): NotificationValidationResult {
  const errors: string[] = [];

  if (!payload.externalId) {
    errors.push("externalId e obrigatorio.");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export async function routeNotificationToCompany(
  _notification: Notification
): Promise<{ companyId: string | null }> {
  // Implementacao futura: localizar empresa pelo CNPJ/contrato e vincular a notificacao.
  return { companyId: null };
}
