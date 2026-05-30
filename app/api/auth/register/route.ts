import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import type { PoolClient } from "@neondatabase/serverless";
import { DatabaseConfigurationError, withTransaction } from "@/lib/db";

export const runtime = "nodejs";

interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyLegalName: string;
  companyTradeName?: string;
  cnpj: string;
  phone: string;
  mainCity: string;
  companyType?: string;
}

class RequestError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
  }
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function validatePayload(input: Record<string, unknown>): RegisterPayload {
  const payload: RegisterPayload = {
    fullName: asString(input.fullName),
    email: normalizeEmail(asString(input.email)),
    password: asString(input.password),
    confirmPassword: asString(input.confirmPassword),
    companyLegalName: asString(input.companyLegalName),
    companyTradeName: asString(input.companyTradeName),
    cnpj: onlyDigits(asString(input.cnpj)),
    phone: asString(input.phone),
    mainCity: asString(input.mainCity),
    companyType: asString(input.companyType)
  };

  if (
    !payload.fullName ||
    !payload.email ||
    !payload.password ||
    !payload.confirmPassword ||
    !payload.companyLegalName ||
    !payload.cnpj ||
    !payload.phone ||
    !payload.mainCity
  ) {
    throw new RequestError("Preencha todos os campos obrigat?rios.", 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    throw new RequestError("Informe um e-mail v?lido.", 400);
  }

  if (payload.password.length < 6) {
    throw new RequestError("A senha deve ter no m?nimo 6 caracteres.", 400);
  }

  if (payload.password !== payload.confirmPassword) {
    throw new RequestError("As senhas informadas n?o conferem.", 400);
  }

  if (payload.cnpj.length !== 14) {
    throw new RequestError("Informe um CNPJ v?lido com 14 d?gitos.", 400);
  }

  return payload;
}

async function ensureUniqueCompanyAndUser(
  client: PoolClient,
  cnpj: string,
  email: string
) {
  const companyExists = await client.query<{ id: string }>(
    "SELECT id FROM companies WHERE cnpj = $1 LIMIT 1",
    [cnpj]
  );

  if (companyExists.rowCount) {
    throw new RequestError("J? existe uma empresa cadastrada com este CNPJ.", 409);
  }

  const userExists = await client.query<{ id: string }>(
    "SELECT id FROM portal_users WHERE email = $1 LIMIT 1",
    [email]
  );

  if (userExists.rowCount) {
    throw new RequestError("J? existe um usu?rio cadastrado com este e-mail.", 409);
  }
}

function isDatabaseUniqueViolation(
  error: unknown
): error is { code: "23505"; constraint?: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  );
}

function logUnexpectedRegisterError(error: unknown) {
  if (process.env.NODE_ENV !== "production") {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[register] Unexpected registration error:", message);
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { message: "Payload inv?lido." },
      { status: 400 }
    );
  }

  try {
    const payload = validatePayload(body);
    const passwordHash = await bcrypt.hash(payload.password, 12);

    await withTransaction(async (client) => {
      await ensureUniqueCompanyAndUser(client, payload.cnpj, payload.email);

      const companyResult = await client.query<{ id: string }>(
        `INSERT INTO companies (
           legal_name, trade_name, cnpj, main_email, phone, main_city, company_type, status
         )
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'PENDING')
         RETURNING id`,
        [
          payload.companyLegalName,
          payload.companyTradeName || null,
          payload.cnpj,
          payload.email,
          payload.phone,
          payload.mainCity,
          payload.companyType || null
        ]
      );

      const companyId = companyResult.rows[0]?.id;
      if (!companyId) {
        throw new Error("Company insert failed.");
      }

      const userResult = await client.query<{ id: string }>(
        `INSERT INTO portal_users (
           company_id, full_name, email, password_hash, role, status
         )
         VALUES ($1, $2, $3, $4, 'COMPANY_USER', 'PENDING')
         RETURNING id`,
        [companyId, payload.fullName, payload.email, passwordHash]
      );

      const userId = userResult.rows[0]?.id;
      if (!userId) {
        throw new Error("User insert failed.");
      }

      const accessRequestResult = await client.query<{ id: string }>(
        `INSERT INTO access_requests (company_id, user_id, request_status)
         VALUES ($1, $2, 'PENDING')
         RETURNING id`,
        [companyId, userId]
      );

      const accessRequestId = accessRequestResult.rows[0]?.id;
      if (!accessRequestId) {
        throw new Error("Access request insert failed.");
      }

      await client.query(
        `INSERT INTO audit_logs (user_id, action, entity_type, entity_id, metadata)
         VALUES ($1, 'ACCESS_REQUEST_CREATED', 'access_request', $2, $3::jsonb)`,
        [
          userId,
          accessRequestId,
          JSON.stringify({
            companyId,
            cnpj: payload.cnpj,
            email: payload.email
          })
        ]
      );
    });

    return NextResponse.json(
      {
        message:
          "Solicita??o enviada com sucesso. O acesso ser? analisado pela administra??o do portal."
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof RequestError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status }
      );
    }

    if (error instanceof DatabaseConfigurationError) {
      return NextResponse.json(
        {
          message:
            "Banco de dados n?o configurado. Verifique a vari?vel DATABASE_URL."
        },
        { status: 500 }
      );
    }

    if (isDatabaseUniqueViolation(error)) {
      if (error.constraint === "companies_cnpj_key") {
        return NextResponse.json(
          { message: "J? existe uma empresa cadastrada com este CNPJ." },
          { status: 409 }
        );
      }

      if (error.constraint === "portal_users_email_key") {
        return NextResponse.json(
          { message: "J? existe um usu?rio cadastrado com este e-mail." },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { message: "J? existe um cadastro com os dados informados." },
        { status: 409 }
      );
    }

    logUnexpectedRegisterError(error);

    return NextResponse.json(
      { message: "Erro interno ao processar solicita??o." },
      { status: 500 }
    );
  }
}
