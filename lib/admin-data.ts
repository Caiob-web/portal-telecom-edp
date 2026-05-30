import "server-only";
import type {
  AccessRequestStatus,
  CompanyStatus,
  DocumentStatus,
  NotificationStatus,
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

export interface AdminNotificationRow {
  id: string;
  externalId: string;
  companyName: string | null;
  companyLegalName: string | null;
  municipality: string | null;
  type: string | null;
  receivedAt: string;
  status: NotificationStatus;
  viewed: boolean;
  answered: boolean;
  pdfLinked: boolean;
  sourceUrl: string | null;
}

export interface AdminDocumentRow {
  id: string;
  name: string;
  companyLegalName: string | null;
  municipality: string | null;
  uploadedAt: string;
  origin: "UPLOAD_MANUAL" | "EXTERNAL_API" | "INTERNAL_SYSTEM";
  status: DocumentStatus;
  size: string | null;
  url: string;
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

interface NotificationDbRow {
  id: string;
  external_id: string;
  company_name: string | null;
  legal_name: string | null;
  municipality: string | null;
  notification_type: string | null;
  received_at: string;
  status: NotificationStatus;
  viewed: boolean;
  answered: boolean;
  pdf_linked: boolean;
  source_url: string | null;
}

interface DocumentDbRow {
  id: string;
  name: string;
  legal_name: string | null;
  company_name: string | null;
  municipality: string | null;
  uploaded_at: string;
  origin: "UPLOAD_MANUAL" | "EXTERNAL_API" | "INTERNAL_SYSTEM";
  status: DocumentStatus;
  size_label: string | null;
  file_url: string;
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
      error: "N?o foi poss?vel carregar empresas do banco de dados."
    };
  }
}

export async function getNotificationsForAdmin(): Promise<
  AdminDataResult<AdminNotificationRow>
> {
  if (!isDatabaseConfigured()) {
    return { configured: false, rows: [] };
  }

  try {
    const result = await query<NotificationDbRow>(
      `SELECT
         n.id,
         n.external_id,
         n.company_name,
         c.legal_name,
         n.municipality,
         n.notification_type,
         n.received_at,
         n.status,
         n.viewed,
         n.answered,
         n.source_url,
         EXISTS (
           SELECT 1
           FROM portal_documents d
           WHERE d.notification_id = n.id
         ) AS pdf_linked
       FROM portal_notifications n
       LEFT JOIN companies c ON c.id = n.company_id
       ORDER BY n.received_at DESC
       LIMIT 300`
    );

    return {
      configured: true,
      rows: result.rows.map((row) => ({
        id: row.id,
        externalId: row.external_id,
        companyName: row.company_name,
        companyLegalName: row.legal_name,
        municipality: row.municipality,
        type: row.notification_type,
        receivedAt: row.received_at,
        status: row.status,
        viewed: row.viewed,
        answered: row.answered,
        pdfLinked: row.pdf_linked,
        sourceUrl: row.source_url
      }))
    };
  } catch {
    return {
      configured: true,
      rows: [],
      error: "N?o foi poss?vel carregar notifica??es do banco de dados."
    };
  }
}

export async function getDocumentsForAdmin(): Promise<
  AdminDataResult<AdminDocumentRow>
> {
  if (!isDatabaseConfigured()) {
    return { configured: false, rows: [] };
  }

  try {
    const result = await query<DocumentDbRow>(
      `SELECT
         d.id,
         d.name,
         c.legal_name,
         n.company_name,
         d.municipality,
         d.uploaded_at,
         d.origin,
         d.status,
         d.size_label,
         d.file_url
       FROM portal_documents d
       LEFT JOIN companies c ON c.id = d.company_id
       LEFT JOIN portal_notifications n ON n.id = d.notification_id
       ORDER BY d.uploaded_at DESC
       LIMIT 300`
    );

    return {
      configured: true,
      rows: result.rows.map((row) => ({
        id: row.id,
        name: row.name,
        companyLegalName: row.legal_name ?? row.company_name,
        municipality: row.municipality,
        uploadedAt: row.uploaded_at,
        origin: row.origin,
        status: row.status,
        size: row.size_label,
        url: row.file_url
      }))
    };
  } catch {
    return {
      configured: true,
      rows: [],
      error: "N?o foi poss?vel carregar documentos do banco de dados."
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
       INNER JOIN portal_users u ON u.id = ar.user_id
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
      error: "N?o foi poss?vel carregar solicita??es do banco de dados."
    };
  }
}
