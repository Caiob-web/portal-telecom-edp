CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legal_name TEXT NOT NULL,
  trade_name TEXT,
  cnpj TEXT NOT NULL UNIQUE,
  main_email TEXT NOT NULL,
  phone TEXT,
  main_city TEXT,
  company_type TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING'
    CHECK (status IN ('PENDING', 'APPROVED', 'BLOCKED', 'INACTIVE')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portal_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'COMPANY_USER'
    CHECK (role IN ('ADMIN', 'COMPANY_ADMIN', 'COMPANY_USER', 'VIEWER')),
  status TEXT NOT NULL DEFAULT 'PENDING'
    CHECK (status IN ('PENDING', 'APPROVED', 'BLOCKED', 'INACTIVE')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS access_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES portal_users(id) ON DELETE CASCADE,
  request_status TEXT NOT NULL DEFAULT 'PENDING'
    CHECK (request_status IN ('PENDING', 'APPROVED', 'REJECTED')),
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES portal_users(id) ON DELETE SET NULL,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES portal_users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS login_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES portal_users(id) ON DELETE CASCADE,
  session_token_hash TEXT NOT NULL UNIQUE,
  ip_address TEXT,
  user_agent TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS login_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES portal_users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  success BOOLEAN NOT NULL DEFAULT FALSE,
  failure_reason TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portal_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  external_source TEXT NOT NULL DEFAULT 'BASE44',
  external_id TEXT NOT NULL,
  company_document TEXT,
  company_name TEXT,
  title TEXT NOT NULL,
  description TEXT,
  municipality TEXT,
  notification_type TEXT,
  status TEXT NOT NULL DEFAULT 'NOVA'
    CHECK (status IN ('NOVA', 'EM_ANALISE', 'RESPONDIDA', 'FINALIZADA')),
  source_url TEXT,
  received_at TIMESTAMPTZ DEFAULT NOW(),
  viewed BOOLEAN NOT NULL DEFAULT FALSE,
  answered BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (external_source, external_id)
);

CREATE TABLE IF NOT EXISTS portal_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  notification_id UUID REFERENCES portal_notifications(id) ON DELETE CASCADE,
  external_source TEXT,
  external_id TEXT,
  name TEXT NOT NULL,
  document_type TEXT NOT NULL DEFAULT 'PDF',
  file_url TEXT NOT NULL,
  mime_type TEXT,
  size_label TEXT,
  municipality TEXT,
  origin TEXT NOT NULL DEFAULT 'EXTERNAL_API'
    CHECK (origin IN ('UPLOAD_MANUAL', 'EXTERNAL_API', 'INTERNAL_SYSTEM')),
  status TEXT NOT NULL DEFAULT 'DISPONIVEL'
    CHECK (status IN ('DISPONIVEL', 'PROCESSANDO', 'ARQUIVADO', 'PENDENTE')),
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (notification_id, file_url)
);

CREATE INDEX IF NOT EXISTS idx_companies_status ON companies(status);
CREATE INDEX IF NOT EXISTS idx_portal_users_company_id ON portal_users(company_id);
CREATE INDEX IF NOT EXISTS idx_portal_users_status ON portal_users(status);
CREATE INDEX IF NOT EXISTS idx_access_requests_status ON access_requests(request_status);
CREATE INDEX IF NOT EXISTS idx_access_requests_requested_at ON access_requests(requested_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_login_sessions_user_id ON login_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_login_sessions_expires_at ON login_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON login_attempts(email);
CREATE INDEX IF NOT EXISTS idx_login_attempts_created_at ON login_attempts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_portal_notifications_company_id ON portal_notifications(company_id);
CREATE INDEX IF NOT EXISTS idx_portal_notifications_status ON portal_notifications(status);
CREATE INDEX IF NOT EXISTS idx_portal_notifications_received_at ON portal_notifications(received_at DESC);
CREATE INDEX IF NOT EXISTS idx_portal_notifications_company_document ON portal_notifications(company_document);
CREATE INDEX IF NOT EXISTS idx_portal_documents_company_id ON portal_documents(company_id);
CREATE INDEX IF NOT EXISTS idx_portal_documents_notification_id ON portal_documents(notification_id);
CREATE INDEX IF NOT EXISTS idx_portal_documents_uploaded_at ON portal_documents(uploaded_at DESC);
