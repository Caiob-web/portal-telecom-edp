import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import sql from '@/lib/db'
import { Bell, CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const PRIORITY_CONFIG = {
  urgent: { label: 'Urgente', class: 'priority-urgent', dot: 'bg-red-500' },
  high:   { label: 'Alta',    class: 'priority-high',   dot: 'bg-orange-500' },
  normal: { label: 'Normal',  class: 'priority-normal', dot: 'bg-blue-500' },
  low:    { label: 'Baixa',   class: 'priority-low',    dot: 'bg-gray-400' },
}

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return null

  const userId = parseInt(session.user.id)
  const notifications = await sql`
    SELECT n.*, nr.id as response_id, nr.observation, nr.image_url, nr.responded_at
    FROM notifications n
    LEFT JOIN notification_responses nr ON n.id = nr.notification_id AND nr.user_id = ${userId}
    ORDER BY CASE n.priority WHEN 'urgent' THEN 1 WHEN 'high' THEN 2 WHEN 'normal' THEN 3 ELSE 4 END,
             n.created_at DESC
  `

  const pending  = notifications.filter((n: any) => !n.response_id)
  const answered = notifications.filter((n: any) => n.response_id)

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-800">Notificações</h1>
          <p className="text-gray-500">{pending.length} pendente{pending.length !== 1 ? 's' : ''} · {answered.length} respondida{answered.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-700 px-3 py-1.5 rounded-lg text-sm font-medium">
            <Clock className="w-4 h-4" />{pending.length} pendentes
          </div>
          <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />{answered.length} respondidas
          </div>
        </div>
      </div>

      {pending.filter((n: any) => n.priority === 'urgent').length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-700 font-medium text-sm">
            Você tem {pending.filter((n: any) => n.priority === 'urgent').length} notificação(ões) urgente(s) aguardando resposta!
          </p>
        </div>
      )}

      {notifications.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
          <Bell className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h3 className="font-display font-semibold text-gray-700 text-xl mb-2">Nenhuma notificação</h3>
          <p className="text-gray-400">Quando a EDP enviar notificações, elas aparecerão aqui.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif: any) => {
            const priority = PRIORITY_CONFIG[notif.priority as keyof typeof PRIORITY_CONFIG] || PRIORITY_CONFIG.normal
            const isResponded = !!notif.response_id
            return (
              <Link key={notif.id} href={`/dashboard/notifications/${notif.id}`}
                className="block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all notification-card overflow-hidden">
                <div className={`h-1 ${notif.priority === 'urgent' ? 'bg-red-500' : notif.priority === 'high' ? 'bg-orange-500' : notif.priority === 'normal' ? 'bg-blue-500' : 'bg-gray-300'}`} />
                <div className="p-4 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isResponded ? 'bg-green-50' : 'bg-amber-50'}`}>
                    {isResponded ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <Bell className={`w-5 h-5 ${notif.priority === 'urgent' ? 'text-red-600 notif-pulse' : 'text-amber-600'}`} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-800 text-sm">{notif.title}</h3>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium flex-shrink-0 ${priority.class}`}>{priority.label}</span>
                    </div>
                    {notif.description && <p className="text-gray-500 text-sm mt-1 line-clamp-2">{notif.description}</p>}
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                      {notif.municipality && <span className="text-xs text-gray-400">📍 {notif.municipality}</span>}
                      <span className="text-xs text-gray-400">{format(new Date(notif.created_at), "dd 'de' MMM 'às' HH:mm", { locale: ptBR })}</span>
                      {notif.pdf_url && <span className="text-xs text-edp-green flex items-center gap-1"><FileText className="w-3 h-3" />PDF disponível</span>}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {isResponded ? (
                      <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-2.5 py-1 rounded-full font-medium">✓ Respondida</span>
                    ) : (
                      <span className="text-xs bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-full font-medium animate-pulse">Pendente</span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
