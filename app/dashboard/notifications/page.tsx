import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import sql from '@/lib/db'
import { Bell, CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const P = {
  urgent: { label: 'Urgente', cls: 'priority-urgent', bar: 'bg-red-500' },
  high:   { label: 'Alta',    cls: 'priority-high',   bar: 'bg-orange-500' },
  normal: { label: 'Normal',  cls: 'priority-normal', bar: 'bg-blue-500' },
  low:    { label: 'Baixa',   cls: 'priority-low',    bar: 'bg-white/20' },
}

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return null
  const userId = parseInt(session.user.id)

  const notifications = await sql`
    SELECT n.*, nr.id as response_id, nr.responded_at
    FROM notifications n
    LEFT JOIN notification_responses nr ON n.id = nr.notification_id AND nr.user_id = ${userId}
    ORDER BY CASE n.priority WHEN 'urgent' THEN 1 WHEN 'high' THEN 2 WHEN 'normal' THEN 3 ELSE 4 END, n.created_at DESC
  `
  const pending = notifications.filter((n: any) => !n.response_id)
  const answered = notifications.filter((n: any) => n.response_id)

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="animate-slide-up flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Notificações</h1>
          <p className="text-white/40 text-sm">{pending.length} pendentes · {answered.length} respondidas</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-xl text-sm font-medium">
            <Clock className="w-4 h-4"/>{pending.length} pendentes
          </div>
          <div className="flex items-center gap-2 bg-edp-green/10 border border-edp-green/20 text-edp-green px-3 py-1.5 rounded-xl text-sm font-medium">
            <CheckCircle2 className="w-4 h-4"/>{answered.length} respondidas
          </div>
        </div>
      </div>

      {/* Urgent alert */}
      {pending.filter((n: any) => n.priority === 'urgent').length > 0 && (
        <div className="animate-slide-up bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 animate-pulse" />
          <p className="text-red-400 font-medium text-sm">
            {pending.filter((n: any) => n.priority === 'urgent').length} notificação(ões) urgente(s) aguardando resposta!
          </p>
        </div>
      )}

      {notifications.length === 0 ? (
        <div className="bg-edp-card rounded-xl border border-white/5 p-16 text-center animate-fade-in">
          <Bell className="w-16 h-16 text-white/10 mx-auto mb-4" />
          <h3 className="font-display font-semibold text-white/40 text-xl">Nenhuma notificação</h3>
        </div>
      ) : (
        <div className="space-y-3 stagger">
          {notifications.map((n: any) => {
            const p = P[n.priority as keyof typeof P] || P.normal
            const responded = !!n.response_id
            return (
              <Link key={n.id} href={`/dashboard/notifications/${n.id}`}
                className="card-hover block bg-edp-card rounded-xl border border-white/5 overflow-hidden animate-slide-up">
                <div className={`h-0.5 ${p.bar}`} />
                <div className="p-4 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${responded ? 'bg-edp-green/10 border border-edp-green/20' : 'bg-amber-500/10 border border-amber-500/20'}`}>
                    {responded
                      ? <CheckCircle2 className="w-5 h-5 text-edp-green" />
                      : <Bell className={`w-5 h-5 ${n.priority==='urgent'?'text-red-400 notif-pulse':'text-amber-400'}`} />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <h3 className="font-semibold text-white text-sm">{n.title}</h3>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium flex-shrink-0 ${p.cls}`}>{p.label}</span>
                    </div>
                    {n.description && <p className="text-white/40 text-sm mt-1 line-clamp-1">{n.description}</p>}
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                      {n.municipality && <span className="text-xs text-white/30">📍 {n.municipality}</span>}
                      <span className="text-xs text-white/30">{format(new Date(n.created_at),"dd 'de' MMM 'às' HH:mm",{locale:ptBR})}</span>
                      {n.pdf_url && <span className="text-xs text-edp-green flex items-center gap-1"><FileText className="w-3 h-3"/>PDF</span>}
                    </div>
                  </div>
                  <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-medium ${responded?'bg-edp-green/10 text-edp-green border border-edp-green/20':'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse'}`}>
                    {responded ? '✓ Respondida' : 'Pendente'}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
