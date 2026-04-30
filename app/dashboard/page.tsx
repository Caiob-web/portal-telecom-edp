import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import sql from '@/lib/db'
import WeatherGreeting from '@/components/WeatherGreeting'
import MapComponent from '@/components/MapComponent'
import { Bell, CheckCircle2, Clock, AlertTriangle } from 'lucide-react'

async function getDashboardStats(userId: number) {
  const [total, pending, responded, urgent] = await Promise.all([
    sql`SELECT COUNT(*) FROM notifications`,
    sql`SELECT COUNT(*) FROM notifications WHERE status = 'pending'`,
    sql`SELECT COUNT(*) FROM notification_responses WHERE user_id = ${userId}`,
    sql`SELECT COUNT(*) FROM notifications WHERE priority = 'urgent' AND status = 'pending'`,
  ])
  return {
    total: Number(total[0].count),
    pending: Number(pending[0].count),
    responded: Number(responded[0].count),
    urgent: Number(urgent[0].count),
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return null

  const userId = parseInt(session.user.id)
  const [stats, municipalities, recentNotifications] = await Promise.all([
    getDashboardStats(userId),
    sql`SELECT * FROM municipalities WHERE is_active = true ORDER BY name`,
    sql`
      SELECT n.*, nr.id as response_id, nr.responded_at
      FROM notifications n
      LEFT JOIN notification_responses nr ON n.id = nr.notification_id AND nr.user_id = ${userId}
      ORDER BY n.created_at DESC LIMIT 5
    `,
  ])

  const statCards = [
    { label: 'Total de Notificações', value: stats.total, icon: Bell, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { label: 'Aguardando Resposta', value: stats.pending, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
    { label: 'Respondidas por Você', value: stats.responded, icon: CheckCircle2, color: 'text-edp-green', bg: 'bg-green-50', border: 'border-green-100' },
    { label: 'Urgentes', value: stats.urgent, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
  ]

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <WeatherGreeting userName={session.user.name || ''} companyName={session.user.company_name} municipality={session.user.municipality} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(card => (
          <div key={card.label} className={`bg-white rounded-xl p-4 border ${card.border} shadow-sm`}>
            <div className={`w-10 h-10 ${card.bg} rounded-lg flex items-center justify-center mb-3`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <p className="text-2xl font-display font-bold text-gray-800">{card.value}</p>
            <p className="text-gray-500 text-sm mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="font-display font-semibold text-gray-800">Área de Concessão EDP</h2>
                <p className="text-gray-500 text-sm">{municipalities.length} municípios</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-edp-green inline-block"></span>
                <span className="text-xs text-gray-500">Município ativo</span>
              </div>
            </div>
            <div className="h-[420px]">
              <MapComponent municipalities={municipalities as any} userMunicipality={session.user.municipality} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-display font-semibold text-gray-800">Últimas Notificações</h2>
            <a href="/dashboard/notifications" className="text-edp-green text-sm font-medium hover:text-edp-dark">Ver todas</a>
          </div>
          <div className="p-4 space-y-3">
            {recentNotifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Nenhuma notificação ainda</p>
              </div>
            ) : (
              recentNotifications.map((notif: any) => (
                <a key={notif.id} href={`/dashboard/notifications/${notif.id}`}
                  className="block p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 notification-card">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notif.priority === 'urgent' ? 'bg-red-500' : notif.priority === 'high' ? 'bg-orange-500' : notif.priority === 'normal' ? 'bg-blue-500' : 'bg-gray-400'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{notif.title}</p>
                      {notif.municipality && <p className="text-xs text-gray-500 mt-0.5">{notif.municipality}</p>}
                      <div className="flex items-center gap-2 mt-1">
                        {notif.response_id ? (
                          <span className="text-xs text-green-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Respondida</span>
                        ) : (
                          <span className="text-xs text-amber-600 flex items-center gap-1"><Clock className="w-3 h-3" />Pendente</span>
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-display font-semibold text-gray-800">28 Municípios — Área de Concessão</h2>
          <p className="text-gray-500 text-sm">Vale do Paraíba e região</p>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {municipalities.map((m: any) => (
            <div key={m.id} className={`px-3 py-2 rounded-lg text-xs font-medium text-center transition-all ${session.user.municipality === m.name ? 'bg-edp-green text-white' : 'bg-gray-50 text-gray-600 hover:bg-edp-50 hover:text-edp-dark'}`}>
              {m.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
