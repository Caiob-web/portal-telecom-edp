import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import sql from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
  }

  const [
    totalUsers, totalNotifications, pendingNotifications,
    respondedNotifications, urgentNotifications,
    usersList, notificationsList, byMunicipality, responseRate,
  ] = await Promise.all([
    sql`SELECT COUNT(*) FROM users`,
    sql`SELECT COUNT(*) FROM notifications`,
    sql`SELECT COUNT(*) FROM notifications WHERE status = 'pending'`,
    sql`SELECT COUNT(*) FROM notification_responses`,
    sql`SELECT COUNT(*) FROM notifications WHERE priority = 'urgent' AND status = 'pending'`,

    // Lista de usuários recentes
    sql`SELECT id, name, email, company_name, municipality, role, is_active, created_at FROM users ORDER BY created_at DESC LIMIT 20`,

    // Lista de notificações com contagem de respostas
    sql`
      SELECT n.*, COUNT(nr.id) as response_count
      FROM notifications n
      LEFT JOIN notification_responses nr ON n.id = nr.notification_id
      GROUP BY n.id
      ORDER BY n.created_at DESC
      LIMIT 20
    `,

    // Notificações por município
    sql`
      SELECT municipality, COUNT(*) as total,
        COUNT(CASE WHEN status = 'acknowledged' THEN 1 END) as responded
      FROM notifications
      WHERE municipality IS NOT NULL
      GROUP BY municipality
      ORDER BY total DESC
      LIMIT 10
    `,

    // Taxa de resposta geral
    sql`
      SELECT 
        COUNT(DISTINCT nr.notification_id) as responded_unique,
        COUNT(DISTINCT n.id) as total_unique
      FROM notifications n
      LEFT JOIN notification_responses nr ON n.id = nr.notification_id
    `,
  ])

  return NextResponse.json({
    stats: {
      totalUsers:           Number(totalUsers[0].count),
      totalNotifications:   Number(totalNotifications[0].count),
      pendingNotifications: Number(pendingNotifications[0].count),
      respondedNotifications: Number(respondedNotifications[0].count),
      urgentNotifications:  Number(urgentNotifications[0].count),
    },
    users:         usersList,
    notifications: notificationsList,
    byMunicipality,
    responseRate,
  })
}
