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

CREATE TABLE IF NOT EXISTS users (
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
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  request_status TEXT NOT NULL DEFAULT 'PENDING'
    CHECK (request_status IN ('PENDING', 'APPROVED', 'REJECTED')),
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
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

CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  notification_id UUID REFERENCES notifications(id) ON DELETE CASCADE,
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
CREATE INDEX IF NOT EXISTS idx_users_company_id ON users(company_id);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_access_requests_status ON access_requests(request_status);
CREATE INDEX IF NOT EXISTS idx_access_requests_requested_at ON access_requests(requested_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_company_id ON notifications(company_id);
CREATE INDEX IF NOT EXISTS idx_notifications_status ON notifications(status);
CREATE INDEX IF NOT EXISTS idx_notifications_received_at ON notifications(received_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_company_document ON notifications(company_document);
CREATE INDEX IF NOT EXISTS idx_documents_company_id ON documents(company_id);
CREATE INDEX IF NOT EXISTS idx_documents_notification_id ON documents(notification_id);
CREATE INDEX IF NOT EXISTS idx_documents_uploaded_at ON documents(uploaded_at DESC);
