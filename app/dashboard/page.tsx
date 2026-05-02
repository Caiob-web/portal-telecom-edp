export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import sql from '@/lib/db'
import WeatherGreeting from '@/components/WeatherGreeting'
import MapComponent from '@/components/MapComponent'
import { Bell, CheckCircle2, Clock, AlertTriangle } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return null
  }

  const userId = parseInt(session.user.id)

  const totalResult = await sql`
    SELECT COUNT(*) FROM notifications
  `

  const pendingResult = await sql`
    SELECT COUNT(*) FROM notifications 
    WHERE status = 'pending'
  `

  const respondedResult = await sql`
    SELECT COUNT(*) FROM notification_responses 
    WHERE user_id = ${userId}
  `

  const urgentResult = await sql`
    SELECT COUNT(*) FROM notifications 
    WHERE priority = 'urgent' 
    AND status = 'pending'
  `

  const municipalities = await sql`
    SELECT * FROM municipalities 
    WHERE is_active = true 
    ORDER BY name
  `

  const recentNotifications = await sql`
    SELECT 
      n.*, 
      nr.id AS response_id
    FROM notifications n
    LEFT JOIN notification_responses nr 
      ON n.id = nr.notification_id 
      AND nr.user_id = ${userId}
    ORDER BY n.created_at DESC
    LIMIT 5
  `

  const totalValue = Number(totalResult[0].count)
  const pendingValue = Number(pendingResult[0].count)
  const respondedValue = Number(respondedResult[0].count)
  const urgentValue = Number(urgentResult[0].count)

  return (
    <div className="p-4 lg:p-6 space-y-6">

      <div className="animate-slide-up">
        <WeatherGreeting
          userName={session.user.name || ''}
          companyName={session.user.company_name}
          municipality={session.user.municipality}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="card-hover stat-glow-blue bg-edp-card rounded-xl p-4 border border-blue-500/20 animate-slide-up">
          <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-3 border border-blue-500/20">
            <Bell className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-display font-bold text-blue-400">
            {totalValue}
          </p>
          <p className="text-white/40 text-xs mt-1">
            Total Notificações
          </p>
        </div>

        <div className="card-hover stat-glow-orange bg-edp-card rounded-xl p-4 border border-amber-500/20 animate-slide-up">
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-3 border border-amber-500/20">
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-3xl font-display font-bold text-amber-400">
            {pendingValue}
          </p>
          <p className="text-white/40 text-xs mt-1">
            Pendentes
          </p>
        </div>

        <div className="card-hover stat-glow-green bg-edp-card rounded-xl p-4 border border-edp-green/20 animate-slide-up">
          <div className="w-10 h-10 bg-edp-green/10 rounded-xl flex items-center justify-center mb-3 border border-edp-green/20">
            <CheckCircle2 className="w-5 h-5 text-edp-green" />
          </div>
          <p className="text-3xl font-display font-bold text-edp-green">
            {respondedValue}
          </p>
          <p className="text-white/40 text-xs mt-1">
            Respondidas por Você
          </p>
        </div>

        <div className="card-hover stat-glow-red bg-edp-card rounded-xl p-4 border border-red-500/20 animate-slide-up">
          <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center mb-3 border border-red-500/20">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-3xl font-display font-bold text-red-400">
            {urgentValue}
          </p>
          <p className="text-white/40 text-xs mt-1">
            Urgentes
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 animate-slide-up">
          <div className="bg-edp-card rounded-xl border border-white/5 overflow-hidden">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="font-display font-semibold text-white">
                  Área de Concessão EDP
                </h2>
                <p className="text-white/40 text-sm">
                  {municipalities.length} municípios
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-edp-green animate-pulse inline-block" />
                <span className="text-xs text-white/40">
                  Online
                </span>
              </div>
            </div>

            <div className="h-[400px]">
              <MapComponent
                municipalities={municipalities as any}
                userMunicipality={session.user.municipality}
              />
            </div>
          </div>
        </div>

        <div className="bg-edp-card rounded-xl border border-white/5 animate-slide-up">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="font-display font-semibold text-white">
              Últimas Notificações
            </h2>

            <Link
              href="/dashboard/notifications"
              className="text-edp-green text-xs hover:text-edp-light transition-colors"
            >
              Ver todas →
            </Link>
          </div>

          <div className="p-4 space-y-2">
            {recentNotifications.length === 0 && (
              <div className="text-center py-10">
                <Bell className="w-10 h-10 text-white/10 mx-auto mb-2" />
                <p className="text-white/30 text-sm">
                  Nenhuma notificação
                </p>
              </div>
            )}

            {recentNotifications.map((n: any) => (
              <Link
                key={n.id}
                href={`/dashboard/notifications/${n.id}`}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/8 group"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    n.priority === 'urgent'
                      ? 'bg-red-500'
                      : n.priority === 'high'
                        ? 'bg-orange-500'
                        : 'bg-blue-500'
                  }`}
                />

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/80 group-hover:text-white truncate transition-colors">
                    {n.title}
                  </p>

                  {n.response_id ? (
                    <span className="text-xs text-edp-green flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      Respondida
                    </span>
                  ) : (
                    <span className="text-xs text-amber-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      Pendente
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <div className="bg-edp-card rounded-xl border border-white/5 animate-slide-up">
        <div className="p-4 border-b border-white/5">
          <h2 className="font-display font-semibold text-white">
            28 Municípios — Vale do Paraíba
          </h2>
          <p className="text-white/30 text-xs mt-0.5">
            Área de Concessão EDP
          </p>
        </div>

        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {municipalities.map((m: any) => (
            <div
              key={m.id}
              className={`px-2 py-2 rounded-lg text-xs font-medium text-center transition-all ${
                session.user.municipality === m.name
                  ? 'bg-edp-green/20 text-edp-green border border-edp-green/30'
                  : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/8 border border-transparent'
              }`}
            >
              {m.name}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
