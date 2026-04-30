import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import sql from '@/lib/db'
import base44, { normalizeBase44Notification, ENTITY_CANDIDATES } from '@/lib/base44'

const BASE44_ENTITY = process.env.BASE44_ENTITY_NAME || 'Notificacoes'
let lastSync: Date | null = null
const SYNC_INTERVAL_MS = 5 * 60 * 1000

async function fetchFromBase44(): Promise<any[]> {
  try {
    const items = await (base44.entities as any)[BASE44_ENTITY].list('-created_date', 100)
    console.log(`[Base44] ${items?.length || 0} itens da entidade "${BASE44_ENTITY}"`)
    return Array.isArray(items) ? items : []
  } catch (err: any) {
    console.error(`[Base44] Erro na entidade "${BASE44_ENTITY}":`, err?.message)
    for (const entityName of ENTITY_CANDIDATES) {
      if (entityName === BASE44_ENTITY) continue
      try {
        const items = await (base44.entities as any)[entityName].list('-created_date', 100)
        if (Array.isArray(items) && items.length > 0) {
          console.log(`[Base44] Entidade encontrada: "${entityName}" — defina BASE44_ENTITY_NAME="${entityName}"`)
          return items
        }
      } catch { /* tenta próxima */ }
    }
    return []
  }
}

async function syncNotificationsFromBase44(): Promise<number> {
  if (lastSync && Date.now() - lastSync.getTime() < SYNC_INTERVAL_MS) return 0
  const items = await fetchFromBase44()
  let synced = 0
  for (const item of items) {
    try {
      const n = normalizeBase44Notification(item)
      if (!n.base44_id || !n.title) continue
      await sql`
        INSERT INTO notifications (base44_id, title, description, pdf_url, municipality, priority, status)
        VALUES (${n.base44_id}, ${n.title}, ${n.description}, ${n.pdf_url}, ${n.municipality}, ${n.priority}, ${n.status})
        ON CONFLICT (base44_id) DO UPDATE SET
          title        = EXCLUDED.title,
          description  = EXCLUDED.description,
          pdf_url      = EXCLUDED.pdf_url,
          municipality = EXCLUDED.municipality,
          priority     = EXCLUDED.priority,
          updated_at   = NOW()
      `
      synced++
    } catch (e: any) { console.error('[Base44] Erro upsert:', e?.message) }
  }
  lastSync = new Date()
  return synced
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  if (searchParams.get('sync') === 'true' || !lastSync) {
    try { await syncNotificationsFromBase44() } catch (e) { console.error('[Base44] Sync falhou:', e) }
  }
  const userId = parseInt(session.user.id)
  const notifications = await sql`
    SELECT n.*, nr.id AS response_id, nr.responded_at
    FROM notifications n
    LEFT JOIN notification_responses nr ON n.id = nr.notification_id AND nr.user_id = ${userId}
    ORDER BY CASE n.priority WHEN 'urgent' THEN 1 WHEN 'high' THEN 2 WHEN 'normal' THEN 3 ELSE 4 END,
             n.created_at DESC
  `
  return NextResponse.json({ notifications, meta: { lastSync: lastSync?.toISOString(), entity: BASE44_ENTITY } })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Apenas admins' }, { status: 403 })
  const { title, description, pdf_url, municipality, priority } = await req.json()
  if (!title) return NextResponse.json({ error: 'Título obrigatório' }, { status: 400 })
  const result = await sql`
    INSERT INTO notifications (title, description, pdf_url, municipality, priority)
    VALUES (${title}, ${description || null}, ${pdf_url || null}, ${municipality || null}, ${priority || 'normal'})
    RETURNING *
  `
  return NextResponse.json({ notification: result[0] }, { status: 201 })
}

export async function PUT() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  lastSync = null
  try {
    const synced = await syncNotificationsFromBase44()
    return NextResponse.json({ success: true, synced, entity: BASE44_ENTITY })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 })
  }
}
