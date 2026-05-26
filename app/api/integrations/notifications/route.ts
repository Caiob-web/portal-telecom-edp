import { NextResponse } from "next/server";

import { DatabaseConfigurationError } from "@/lib/db";
import { persistExternalNotification } from "@/lib/notifications";
import type { ExternalNotificationPayload } from "@/types/notification";

export const runtime = "nodejs";

function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization") ?? "";
  const [scheme, token] = authorization.split(" ");

  if (scheme?.toLowerCase() !== "bearer") {
    return "";
  }

  return token?.trim() ?? "";
}

function isIntegrationAuthorized(request: Request) {
  const expectedToken = process.env.NOTIFICATION_API_TOKEN?.trim();

  if (!expectedToken) {
    return {
      configured: false,
      authorized: false
    };
  }

  return {
    configured: true,
    authorized: getBearerToken(request) === expectedToken
  };
}

function logUnexpectedNotificationError(error: unknown) {
  if (process.env.NODE_ENV !== "production") {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[notifications] Unexpected integration error:", message);
  }
}

export async function POST(request: Request) {
  const authorization = isIntegrationAuthorized(request);

  if (!authorization.configured) {
    return NextResponse.json(
      {
        message:
          "Token da integração não configurado. Verifique a variável NOTIFICATION_API_TOKEN."
      },
      { status: 500 }
    );
  }

  if (!authorization.authorized) {
    return NextResponse.json(
      { message: "Token de integração inválido." },
      { status: 401 }
    );
  }

  let payload: ExternalNotificationPayload;

  try {
    payload = (await request.json()) as ExternalNotificationPayload;
  } catch {
    return NextResponse.json(
      { message: "Payload inválido." },
      { status: 400 }
    );
  }

  try {
    const result = await persistExternalNotification(payload);

    return NextResponse.json(
      {
        message: "Notificação recebida e registrada com sucesso.",
        notification: result
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof DatabaseConfigurationError) {
      return NextResponse.json(
        {
          message:
            "Banco de dados não configurado. Verifique a variável DATABASE_URL."
        },
        { status: 500 }
      );
    }

    if (error instanceof Error && error.name === "NotificationValidationError") {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    logUnexpectedNotificationError(error);

    return NextResponse.json(
      { message: "Erro interno ao registrar notificação." },
      { status: 500 }
    );
  }
}
