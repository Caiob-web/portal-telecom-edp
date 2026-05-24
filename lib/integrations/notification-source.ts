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
  name: "Origem externa de notificacoes",
  status: "NOT_CONFIGURED",
  async fetchNotifications() {
    // Implementacao futura: chamar a API externa, inicialmente prevista como Base44.
    // Nenhum endpoint, token ou dado real e usado nesta versao.
    return [];
  }
};

export async function fetchNotificationsFromSource(): Promise<
  ExternalNotificationPayload[]
> {
  return externalNotificationSource.fetchNotifications();
}
