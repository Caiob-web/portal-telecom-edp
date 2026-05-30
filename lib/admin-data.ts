import "server-only";
import type {
  AccessRequestStatus,
  CompanyStatus,
  DocumentStatus,
  NotificationExecutionStatus,
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
  operatingCities: string[];
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
  street: string | null;
  type: string | null;
  receivedAt: string;
  dueAt: string | null;
  deadlineDays: number | null;
  status: NotificationStatus;
  executionStatus: NotificationExecutionStatus;
  viewed: boolean;
  answered: boolean;
  pdfLinked: boolean;
  sourceUrl: string | null;
  responseFileUrl: string | null;
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

export interface NotificationDocumentLink {
  id: string;
  name: string;
  url: string;
  type: string;
}

export interface NotificationDetailResult {
  configured: boolean;
  notification: AdminNotificationRow | null;
  documents: NotificationDocumentLink[];
  error?: string;
}

export interface AdminDataResult<T> {
  configured: boolean;
  rows: T[];
  error?: string;
}

export interface AdminDashboardStats {
  companies: number;
  pendingUsers: number;
  notifications: number;
  documents: number;
  pendingExecution: number;
  overdueNotifications: number;
  activeIntegrations: number;
  lastAccesses: number;
}

interface CompanyDbRow {
  id: string;
  legal_name: string;
  trade_name: string | null;
  cnpj: string;
  main_email: string;
  phone: string | null;
  main_city: string | null;
  operating_cities: string[] | null;
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
  street: string | null;
  notification_type: string | null;
  received_at: string;
  due_at: string | null;
  deadline_days: number | null;
  status: NotificationStatus;
  execution_status: NotificationExecutionStatus;
  viewed: boolean;
  answered: boolean;
  pdf_linked: boolean;
  source_url: string | null;
  response_file_url: string | null;
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

interface NotificationDocumentDbRow {
  id: string;
  name: string;
  file_url: string;
  document_type: string;
}

interface DashboardStatsDbRow {
  companies: string;
  pending_users: string;
  notifications: string;
  documents: string;
  pending_execution: string;
  overdue_notifications: string;
  last_accesses: string;
}

function asCount(value: string | number | null | undefined) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeCompanyName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase();
}

function companyNameMatches(candidate: string, expected: string) {
  return (
    Boolean(candidate) &&
    (candidate === expected || candidate.includes(expected) || expected.includes(candidate))
  );
}

export async function getAdminDashboardStats(): Promise<{
  configured: boolean;
  stats: AdminDashboardStats;
  error?: string;
}> {
  const emptyStats: AdminDashboardStats = {
    companies: 0,
    pendingUsers: 0,
    notifications: 0,
    documents: 0,
    pendingExecution: 0,
    overdueNotifications: 0,
    activeIntegrations: 0,
    lastAccesses: 0
  };

  if (!isDatabaseConfigured()) {
    return { configured: false, stats: emptyStats };
  }

  try {
    const result = await query<DashboardStatsDbRow>(
      `SELECT
         (SELECT COUNT(*) FROM companies) AS companies,
         (SELECT COUNT(*) FROM portal_users WHERE status = 'PENDING') AS pending_users,
         (SELECT COUNT(*) FROM portal_notifications) AS notifications,
         (SELECT COUNT(*) FROM portal_documents) AS documents,
         (SELECT COUNT(*) FROM portal_notifications WHERE execution_status = 'PENDENTE') AS pending_execution,
         (SELECT COUNT(*) FROM portal_notifications WHERE due_at IS NOT NULL AND due_at < NOW() AND execution_status = 'PENDENTE') AS overdue_notifications,
         (SELECT COUNT(*) FROM audit_logs WHERE action = 'USER_LOGIN' AND created_at >= NOW() - INTERVAL '7 days') AS last_accesses`
    );

    const row = result.rows[0];

    return {
      configured: true,
      stats: {
        companies: asCount(row?.companies),
        pendingUsers: asCount(row?.pending_users),
        notifications: asCount(row?.notifications),
        documents: asCount(row?.documents),
        pendingExecution: asCount(row?.pending_execution),
        overdueNotifications: asCount(row?.overdue_notifications),
        activeIntegrations: process.env.NOTIFICATION_API_TOKEN?.trim() ? 1 : 0,
        lastAccesses: asCount(row?.last_accesses)
      }
    };
  } catch {
    return {
      configured: true,
      stats: emptyStats,
      error: "Não foi possível carregar indicadores administrativos."
    };
  }
}

export async function getCompaniesForAdmin(): Promise<AdminDataResult<AdminCompanyRow>> {
  if (!isDatabaseConfigured()) {
    return { configured: false, rows: [] };
  }

  try {
    const result = await query<CompanyDbRow>(
      `SELECT id, legal_name, trade_name, cnpj, main_email, phone, main_city, operating_cities, company_type, status, created_at
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
        operatingCities: row.operating_cities ?? [],
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
         n.street,
         n.notification_type,
         n.received_at,
         n.due_at,
         n.deadline_days,
         n.status,
         n.execution_status,
         n.viewed,
         n.answered,
         n.source_url,
         n.response_file_url,
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
        street: row.street,
        type: row.notification_type,
        receivedAt: row.received_at,
        dueAt: row.due_at,
        deadlineDays: row.deadline_days,
        status: row.status,
        executionStatus: row.execution_status,
        viewed: row.viewed,
        answered: row.answered,
        pdfLinked: row.pdf_linked,
        sourceUrl: row.source_url,
        responseFileUrl: row.response_file_url
      }))
    };
  } catch {
    return {
      configured: true,
      rows: [],
      error: "Não foi possível carregar notificações do banco de dados."
    };
  }
}

export async function getNotificationsForCompany(
  companyName: string | null | undefined
): Promise<AdminDataResult<AdminNotificationRow>> {
  if (!isDatabaseConfigured()) {
    return { configured: false, rows: [] };
  }

  const normalizedCompanyName = normalizeCompanyName(companyName ?? "");

  if (!normalizedCompanyName) {
    return { configured: true, rows: [] };
  }

  try {
    const result = await query<NotificationDbRow>(
      `SELECT
         n.id,
         n.external_id,
         n.company_name,
         c.legal_name,
         n.municipality,
         n.street,
         n.notification_type,
         n.received_at,
         n.due_at,
         n.deadline_days,
         n.status,
         n.execution_status,
         n.viewed,
         n.answered,
         n.source_url,
         n.response_file_url,
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
      rows: result.rows
        .filter((row) => {
          const legalName = normalizeCompanyName(row.legal_name ?? "");
          const externalName = normalizeCompanyName(row.company_name ?? "");

          return (
            companyNameMatches(legalName, normalizedCompanyName) ||
            companyNameMatches(externalName, normalizedCompanyName)
          );
        })
        .map((row) => ({
          id: row.id,
          externalId: row.external_id,
          companyName: row.company_name,
          companyLegalName: row.legal_name,
          municipality: row.municipality,
          street: row.street,
          type: row.notification_type,
          receivedAt: row.received_at,
          dueAt: row.due_at,
          deadlineDays: row.deadline_days,
          status: row.status,
          executionStatus: row.execution_status,
          viewed: row.viewed,
          answered: row.answered,
          pdfLinked: row.pdf_linked,
          sourceUrl: row.source_url,
          responseFileUrl: row.response_file_url
        }))
    };
  } catch {
    return {
      configured: true,
      rows: [],
      error: "Não foi possível carregar notificações da empresa."
    };
  }
}

export async function getNotificationDetail(
  notificationId: string
): Promise<NotificationDetailResult> {
  if (!isDatabaseConfigured()) {
    return { configured: false, notification: null, documents: [] };
  }

  try {
    const notificationResult = await query<NotificationDbRow>(
      `SELECT
         n.id,
         n.external_id,
         n.company_name,
         c.legal_name,
         n.municipality,
         n.street,
         n.notification_type,
         n.received_at,
         n.due_at,
         n.deadline_days,
         n.status,
         n.execution_status,
         n.viewed,
         n.answered,
         n.source_url,
         n.response_file_url,
         EXISTS (
           SELECT 1
           FROM portal_documents d
           WHERE d.notification_id = n.id
         ) AS pdf_linked
       FROM portal_notifications n
       LEFT JOIN companies c ON c.id = n.company_id
       WHERE n.id = $1
       LIMIT 1`,
      [notificationId]
    );

    const row = notificationResult.rows[0];

    if (!row) {
      return { configured: true, notification: null, documents: [] };
    }

    const documentsResult = await query<NotificationDocumentDbRow>(
      `SELECT id, name, file_url, document_type
       FROM portal_documents
       WHERE notification_id = $1
       ORDER BY uploaded_at DESC`,
      [notificationId]
    );

    return {
      configured: true,
      notification: {
        id: row.id,
        externalId: row.external_id,
        companyName: row.company_name,
        companyLegalName: row.legal_name,
        municipality: row.municipality,
        street: row.street,
        type: row.notification_type,
        receivedAt: row.received_at,
        dueAt: row.due_at,
        deadlineDays: row.deadline_days,
        status: row.status,
        executionStatus: row.execution_status,
        viewed: row.viewed,
        answered: row.answered,
        pdfLinked: row.pdf_linked,
        sourceUrl: row.source_url,
        responseFileUrl: row.response_file_url
      },
      documents: documentsResult.rows.map((document) => ({
        id: document.id,
        name: document.name,
        url: document.file_url,
        type: document.document_type
      }))
    };
  } catch {
    return {
      configured: true,
      notification: null,
      documents: [],
      error: "Não foi possível carregar os detalhes da notificação."
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
      error: "Não foi possível carregar documentos do banco de dados."
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
      error: "Não foi possível carregar solicitações do banco de dados."
    };
  }
}
