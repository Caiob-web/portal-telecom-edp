'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  Users, Bell, CheckCircle2, Clock, AlertTriangle,
  Shield, LogOut, ArrowLeft, RefreshCw, MapPin,
  TrendingUp, Building2, Activity
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import EdpLogo from '@/components/EdpLogo'
import Link from 'next/link'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'notifications'>('overview')

  const fetchStats = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/stats')
      if (res.status === 403) { router.push('/dashboard'); return }
      const json = await res.json()
      setData(json)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.role !== 'admin') {
        router.push('/dashboard')
        return
      }
      fetchStats()
    }
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [status, session])

  // Loading / redirect
  if (status === 'loading' || !session) {
    return (
      <div className="flex h-screen bg-edp-bg items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <EdpLogo size={48} showText={false} />
          <div className="w-6 h-6 border-2 border-edp-green border-t-transparent rounded-full animate-spin" />
          <p className="text-white/30 text-sm">Verificando acesso...</p>
        </div>
      </div>
    )
  }

  const stats = data?.stats || {}

  const statCards = [
    { label: 'Usuários',         value: stats.totalUsers,             icon: Users,         color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   glow: 'stat-glow-blue'   },
    { label: 'Notificações',     value: stats.totalNotifications,     icon: Bell,          color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', glow: ''                 },
    { label: 'Pendentes',        value: stats.pendingNotifications,   icon: Clock,         color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20',  glow: 'stat-glow-orange' },
    { label: 'Respostas',        value: stats.respondedNotifications, icon: CheckCircle2,  color: 'text-edp-green',  bg: 'bg-edp-green/10',  border: 'border-edp-green/20',  glow: 'stat-glow-green'  },
    { label: 'Urgentes',         value: stats.urgentNotifications,    icon: AlertTriangle, color: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/20',    glow: 'stat-glow-red'    },
  ]

  const tabs = [
    { id: 'overview',      label: 'Visão Geral',  icon: Activity  },
    { id: 'users',         label: 'Usuários',     icon: Users     },
    { id: 'notifications', label: 'Notificações', icon: Bell      },
  ]

  return (
    <div className="min-h-screen bg-edp-bg">
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="fixed top-0 right-0 w-96 h-96 bg-edp-green/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-edp-sidebar/90 backdrop-blur border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex items-center gap-4">
          <EdpLogo size={32} showText={true} />
          <div className="w-px h-6 bg-white/10" />
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-edp-green" />
            <span className="text-white font-semibold text-sm">Painel Admin</span>
          </div>
          <div className="flex-1" />
          <button
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors px-3 py-1.5 rounded-xl hover:bg-white/5 border border-white/5"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-edp-green' : ''}`} />
            <span className="hidden sm:inline">Atualizar</span>
          </button>
          <Link href="/dashboard"
            className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors px-3 py-1.5 rounded-xl hover:bg-white/5 border border-white/5">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Portal</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/auth/login' })}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm px-3 py-1.5 rounded-xl hover:bg-red-500/10 border border-red-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 relative space-y-6">

        {/* Welcome */}
        <div className="animate-slide-up">
          <h1 className="font-display font-bold text-2xl text-white">Dashboard Administrativo</h1>
          <p className="text-white/40 text-sm">
            Olá, <span className="text-edp-green">{session.user?.name}</span> · Visão completa do Portal Telecom EDP
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 stagger">
          {statCards.map(c => (
            <div key={c.label} className={`card-hover ${c.glow} bg-edp-card rounded-xl p-4 border ${c.border} animate-slide-up`}>
              <div className={`w-10 h-10 ${c.bg} rounded-xl flex items-center justify-center mb-3 border ${c.border}`}>
                <c.icon className={`w-5 h-5 ${c.color}`} />
              </div>
              {loading
                ? <div className="w-12 h-8 bg-white/5 rounded animate-pulse mb-1" />
                : <p className={`text-3xl font-display font-bold ${c.color}`}>{c.value ?? '—'}</p>
              }
              <p className="text-white/30 text-xs mt-1 leading-tight">{c.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-white/5">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'text-edp-green border-edp-green'
                  : 'text-white/40 border-transparent hover:text-white'
              }`}>
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            {/* Por município */}
            <div className="bg-edp-card rounded-xl border border-white/5 overflow-hidden">
              <div className="p-4 border-b border-white/5 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-edp-green" />
                <h2 className="font-display font-semibold text-white text-sm">Notificações por Município</h2>
              </div>
              <div className="p-4 space-y-3">
                {loading
                  ? [...Array(5)].map((_,i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between"><div className="h-3 w-24 bg-white/5 rounded animate-pulse"/><div className="h-3 w-12 bg-white/5 rounded animate-pulse"/></div>
                        <div className="h-1.5 bg-white/5 rounded-full animate-pulse"/>
                      </div>
                    ))
                  : data?.byMunicipality?.length === 0
                    ? <p className="text-white/30 text-sm text-center py-4">Nenhum dado ainda</p>
                    : data?.byMunicipality?.map((m: any) => {
                        const pct = m.total > 0 ? Math.round((Number(m.responded) / Number(m.total)) * 100) : 0
                        return (
                          <div key={m.municipality}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-white/60 text-xs">{m.municipality || 'Não informado'}</span>
                              <span className="text-white/30 text-xs">{m.responded}/{m.total} ({pct}%)</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-edp-green rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        )
                      })
                }
              </div>
            </div>

            {/* Resumo */}
            <div className="bg-edp-card rounded-xl border border-white/5 overflow-hidden">
              <div className="p-4 border-b border-white/5 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-edp-green" />
                <h2 className="font-display font-semibold text-white text-sm">Resumo Geral</h2>
              </div>
              <div className="p-6 space-y-6">
                {data?.responseRate?.[0] && (() => {
                  const r = data.responseRate[0]
                  const pct = r.total_unique > 0 ? Math.round((Number(r.responded_unique) / Number(r.total_unique)) * 100) : 0
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/50 text-sm">Taxa de Resposta Geral</span>
                        <span className="text-edp-green font-display font-bold text-xl">{pct}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#00A651,#7DC242)' }} />
                      </div>
                      <p className="text-white/20 text-xs mt-1">{r.responded_unique} de {r.total_unique} notificações respondidas</p>
                    </div>
                  )
                })()}

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Urgentes',   value: stats.urgentNotifications,    color: 'text-red-400',   bg: 'bg-red-500/10',   border: 'border-red-500/20'   },
                    { label: 'Respondidas',value: stats.respondedNotifications, color: 'text-edp-green', bg: 'bg-edp-green/10', border: 'border-edp-green/20' },
                    { label: 'Pendentes',  value: stats.pendingNotifications,   color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
                    { label: 'Empresas',   value: stats.totalUsers,             color: 'text-blue-400',  bg: 'bg-blue-500/10',  border: 'border-blue-500/20'  },
                  ].map(item => (
                    <div key={item.label} className={`${item.bg} border ${item.border} rounded-xl p-3 text-center`}>
                      {loading
                        ? <div className="w-8 h-7 bg-white/5 rounded animate-pulse mx-auto mb-1"/>
                        : <p className={`font-display font-bold text-2xl ${item.color}`}>{item.value ?? '—'}</p>
                      }
                      <p className="text-white/30 text-xs">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Usuários */}
        {activeTab === 'users' && (
          <div className="bg-edp-card rounded-xl border border-white/5 overflow-hidden animate-fade-in">
            <div className="p-4 border-b border-white/5 flex items-center gap-2">
              <Users className="w-4 h-4 text-edp-green" />
              <h2 className="font-display font-semibold text-white text-sm">Usuários Cadastrados</h2>
              <span className="ml-auto text-white/20 text-xs">{data?.users?.length ?? 0} registros</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {['Empresa', 'E-mail', 'Município', 'Status', 'Cadastro'].map((h, i) => (
                      <th key={h} className={`text-left text-white/30 text-xs uppercase tracking-wider px-4 py-3 font-medium ${i > 0 && i < 4 ? 'hidden md:table-cell' : ''} ${i === 4 ? 'hidden xl:table-cell' : ''}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? [...Array(6)].map((_,i) => (
                        <tr key={i} className="border-b border-white/5">
                          {[...Array(5)].map((_,j) => (
                            <td key={j} className="px-4 py-3">
                              <div className="h-4 bg-white/5 rounded animate-pulse" />
                            </td>
                          ))}
                        </tr>
                      ))
                    : data?.users?.map((u: any) => (
                        <tr key={u.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-edp-green/10 border border-edp-green/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Building2 className="w-4 h-4 text-edp-green" />
                              </div>
                              <div>
                                <p className="text-white font-medium text-sm">{u.company_name}</p>
                                <p className="text-white/30 text-xs">{u.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell text-white/40 text-xs">{u.email}</td>
                          <td className="px-4 py-3 hidden md:table-cell text-white/40 text-xs">{u.municipality || '—'}</td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${u.is_active ? 'bg-edp-green/10 text-edp-green border-edp-green/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                {u.is_active ? 'Ativo' : 'Inativo'}
                              </span>
                              {u.role === 'admin' && (
                                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">Admin</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden xl:table-cell text-white/30 text-xs">
                            {format(new Date(u.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                          </td>
                        </tr>
                      ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Notificações */}
        {activeTab === 'notifications' && (
          <div className="bg-edp-card rounded-xl border border-white/5 overflow-hidden animate-fade-in">
            <div className="p-4 border-b border-white/5 flex items-center gap-2">
              <Bell className="w-4 h-4 text-edp-green" />
              <h2 className="font-display font-semibold text-white text-sm">Todas as Notificações</h2>
              <span className="ml-auto text-white/20 text-xs">{data?.notifications?.length ?? 0} registros</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {['Título', 'Município', 'Prioridade', 'Respostas', 'Data'].map((h, i) => (
                      <th key={h} className={`text-left text-white/30 text-xs uppercase tracking-wider px-4 py-3 font-medium ${i === 1 ? 'hidden md:table-cell' : ''} ${i === 4 ? 'hidden lg:table-cell' : ''}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? [...Array(6)].map((_,i) => (
                        <tr key={i} className="border-b border-white/5">
                          {[...Array(5)].map((_,j) => (
                            <td key={j} className="px-4 py-3"><div className="h-4 bg-white/5 rounded animate-pulse"/></td>
                          ))}
                        </tr>
                      ))
                    : data?.notifications?.map((n: any) => {
                        const pColors: any = { urgent:'bg-red-500/10 text-red-400 border-red-500/20', high:'bg-orange-500/10 text-orange-400 border-orange-500/20', normal:'bg-blue-500/10 text-blue-400 border-blue-500/20', low:'bg-white/5 text-white/40 border-white/10' }
                        const pLabels: any = { urgent:'Urgente', high:'Alta', normal:'Normal', low:'Baixa' }
                        return (
                          <tr key={n.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                            <td className="px-4 py-3">
                              <p className="text-white text-sm font-medium line-clamp-1 max-w-xs">{n.title}</p>
                              {n.base44_id && <p className="text-white/20 text-xs font-mono">#{n.base44_id.slice(0,8)}</p>}
                            </td>
                            <td className="px-4 py-3 hidden md:table-cell text-white/40 text-xs">{n.municipality || '—'}</td>
                            <td className="px-4 py-3">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${pColors[n.priority] || pColors.normal}`}>
                                {pLabels[n.priority] || 'Normal'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-xs font-medium ${Number(n.response_count) > 0 ? 'text-edp-green' : 'text-amber-400'}`}>
                                {n.response_count} resposta{Number(n.response_count) !== 1 ? 's' : ''}
                              </span>
                            </td>
                            <td className="px-4 py-3 hidden lg:table-cell text-white/30 text-xs">
                              {format(new Date(n.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                            </td>
                          </tr>
                        )
                      })
                  }
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
