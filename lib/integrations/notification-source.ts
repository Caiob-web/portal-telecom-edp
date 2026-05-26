import type { ExternalNotificationPayload } from "@/types/notification";

export type NotificationSourceStatus = "NOT_CONFIGURED" | "READY" | "ERROR";

export interface NotificationSource {
  name: string;
  status: NotificationSourceStatus;
  fetchNotifications: () => Promise<ExternalNotificationPayload[]>;
}

export const notificationSourceConfig = {
  endpointEnv: "NOTIFICATION_API_URL",
  tokenEnv: "NOTIFICATION_API_TOKEN"
} as const;

export const externalNotificationSource: NotificationSource = {
  name: "Origem externa de notificações",
  status: "NOT_CONFIGURED",
  async fetchNotifications() {
    // Implementação futura: chamar a API externa, se o fluxo exigir consulta ativa.
    // O recebimento principal acontece via POST em /api/integrations/notifications.
    return [];
  }
};

export async function fetchNotificationsFromSource(): Promise<
  ExternalNotificationPayload[]
> {
  return externalNotificationSource.fetchNotifications();
}
