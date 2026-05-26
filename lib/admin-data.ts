import "server-only";
import type {
  AccessRequestStatus,
  CompanyStatus,
  UserRole,
  UserStatus
} from "@/types/database";
import { isDatabaseConfigured, query } from "@/lib/db";

export interface AdminCompanyRow {
  id: string;
  legalName: string;
  tradeName: string | null;
  cnpj: string;
  mainEmail: string;
  phone: string | null;
  mainCity: string | null;
  companyType: string | null;
  status: CompanyStatus;
  createdAt: string;
}

export interface AdminAccessRequestRow {
  id: string;
  fullName: string;
  email: string;
  companyLegalName: string;
  cnpj: string;
  mainCity: string | null;
  role: UserRole;
  userStatus: UserStatus;
  requestStatus: AccessRequestStatus;
  requestedAt: string;
}

export interface AdminDataResult<T> {
  configured: boolean;
  rows: T[];
  error?: string;
}

interface CompanyDbRow {
  id: string;
  legal_name: string;
  trade_name: string | null;
  cnpj: string;
  main_email: string;
  phone: string | null;
  main_city: string | null;
  company_type: string | null;
  status: CompanyStatus;
  created_at: string;
}

interface AccessRequestDbRow {
  id: string;
  full_name: string;
  email: string;
  legal_name: string;
  cnpj: string;
  main_city: string | null;
  role: UserRole;
  user_status: UserStatus;
  request_status: AccessRequestStatus;
  requested_at: string;
}

export async function getCompaniesForAdmin(): Promise<AdminDataResult<AdminCompanyRow>> {
  if (!isDatabaseConfigured()) {
    return { configured: false, rows: [] };
  }

  try {
    const result = await query<CompanyDbRow>(
      `SELECT id, legal_name, trade_name, cnpj, main_email, phone, main_city, company_type, status, created_at
       FROM companies
       ORDER BY created_at DESC
       LIMIT 200`
    );

    return {
      configured: true,
      rows: result.rows.map((row) => ({
        id: row.id,
        legalName: row.legal_name,
        tradeName: row.trade_name,
        cnpj: row.cnpj,
        mainEmail: row.main_email,
        phone: row.phone,
        mainCity: row.main_city,
        companyType: row.company_type,
        status: row.status,
        createdAt: row.created_at
      }))
    };
  } catch {
    return {
      configured: true,
      rows: [],
      error: "Não foi possível carregar empresas do banco de dados."
    };
  }
}

export async function getAccessRequestsForAdmin(): Promise<
  AdminDataResult<AdminAccessRequestRow>
> {
  if (!isDatabaseConfigured()) {
    return { configured: false, rows: [] };
  }

  try {
    const result = await query<AccessRequestDbRow>(
      `SELECT
         ar.id,
         u.full_name,
         u.email,
         u.role,
         u.status AS user_status,
         c.legal_name,
         c.cnpj,
         c.main_city,
         ar.request_status,
         ar.requested_at
       FROM access_requests ar
       INNER JOIN users u ON u.id = ar.user_id
       INNER JOIN companies c ON c.id = ar.company_id
       ORDER BY ar.requested_at DESC
       LIMIT 200`
    );

    return {
      configured: true,
      rows: result.rows.map((row) => ({
        id: row.id,
        fullName: row.full_name,
        email: row.email,
        companyLegalName: row.legal_name,
        cnpj: row.cnpj,
        mainCity: row.main_city,
        role: row.role,
        userStatus: row.user_status,
        requestStatus: row.request_status,
        requestedAt: row.requested_at
      }))
    };
  } catch {
    return {
      configured: true,
      rows: [],
      error: "Não foi possível carregar solicitações do banco de dados."
    };
  }
}
