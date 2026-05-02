import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import sql from '@/lib/db'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FileText, MapPin, Clock, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import NotificationResponseForm from '@/components/NotificationResponseForm'

const P = {
  urgent: { label: 'Urgente', cls: 'bg-red-500/20 text-red-400 border-red-500/30', bar: 'bg-red-500' },
  high:   { label: 'Alta',    cls: 'bg-orange-500/20 text-orange-400 border-orange-500/30', bar: 'bg-orange-500' },
  normal: { label: 'Normal',  cls: 'bg-blue-500/20 text-blue-400 border-blue-500/30', bar: 'bg-blue-500' },
  low:    { label: 'Baixa',   cls: 'bg-white/10 text-white/40 border-white/10', bar: 'bg-white/20' },
}

export default async function NotificationDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return null
  const userId = parseInt(session.user.id)
  const notificationId = parseInt(params.id)
  if (isNaN(notificationId)) notFound()

  const rows = await sql`
    SELECT n.*, nr.id as response_id, nr.observation, nr.image_url, nr.image_filename, nr.responded_at
    FROM notifications n
    LEFT JOIN notification_responses nr ON n.id = nr.notification_id AND nr.user_id = ${userId}
    WHERE n.id = ${notificationId} LIMIT 1
  `
  const n = rows[0]
  if (!n) notFound()

  const p = P[n.priority as keyof typeof P] || P.normal
  const isResponded = !!n.response_id

  return (
    <div className="p-4 lg:p-6 max-w-4xl animate-fade-in">
      <Link href="/dashboard/notifications" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>

      <div className="space-y-6">
        {/* Header */}
        <div className="bg-edp-card rounded-xl border border-white/5 overflow-hidden">
          <div className={`h-1 ${p.bar}`} />
          <div className="p-6">
            <div className="flex items-center gap-3 flex-wrap mb-3">
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${p.cls}`}>{p.label}</span>
              {isResponded
                ? <span className="text-xs bg-edp-green/10 text-edp-green border border-edp-green/20 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/>Respondida</span>
                : <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-full">⏳ Aguardando</span>
              }
            </div>
            <h1 className="font-display font-bold text-xl text-white">{n.title}</h1>
            <div className="flex items-center gap-6 mt-4 text-sm text-white/40 flex-wrap">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4"/>{format(new Date(n.created_at),"dd 'de' MMMM 'de' yyyy 'às' HH:mm",{locale:ptBR})}</span>
              {n.municipality && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-edp-green"/>{n.municipality}</span>}
              {n.base44_id && <span className="text-xs font-mono text-white/20">ID: {n.base44_id}</span>}
            </div>
          </div>
        </div>

        {/* Description */}
        {n.description && (
          <div className="bg-edp-card rounded-xl border border-white/5 p-6">
            <h2 className="font-display font-semibold text-white mb-3 text-sm uppercase tracking-widest text-white/40">Descrição</h2>
            <p className="text-white/70 whitespace-pre-wrap leading-relaxed">{n.description}</p>
          </div>
        )}

        {/* PDF */}
        {n.pdf_url && (
          <div className="bg-edp-card rounded-xl border border-white/5 p-6">
            <h2 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-widest text-white/40">Documento Base44</h2>
            <div className="bg-black/30 rounded-xl border border-white/5 overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-white/5">
                <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white text-sm">Notificação PDF</p>
                  <p className="text-white/30 text-xs">Documento oficial EDP</p>
                </div>
                <a href={n.pdf_url} target="_blank" rel="noopener noreferrer"
                  className="btn-glow text-white text-sm font-medium px-4 py-2 rounded-xl">
                  Abrir PDF
                </a>
              </div>
              <div className="h-[480px]">
                <iframe src={`${n.pdf_url}#toolbar=0`} className="w-full h-full" title="PDF" />
              </div>
            </div>
          </div>
        )}

        {/* Response */}
        <div className="bg-edp-card rounded-xl border border-white/5">
          <div className="p-6 border-b border-white/5">
            <h2 className="font-display font-semibold text-white">{isResponded ? '✅ Sua Resposta' : '📋 Responder Notificação'}</h2>
            {!isResponded && <p className="text-white/40 text-sm mt-1">Anexe uma foto e adicione observações.</p>}
          </div>
          <div className="p-6">
            {isResponded ? (
              <div className="space-y-4">
                <p className="text-edp-green text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4"/>
                  Respondida em {format(new Date(n.responded_at),"dd/MM/yyyy 'às' HH:mm",{locale:ptBR})}
                </p>
                {n.image_url && <img src={n.image_url} alt="Comprovante" className="rounded-xl border border-white/10 max-h-64 object-cover"/>}
                {n.observation && (
                  <div className="bg-black/20 rounded-xl p-4 border border-white/5 text-white/70 text-sm whitespace-pre-wrap">{n.observation}</div>
                )}
                <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-amber-400 text-sm">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0"/>
                  Notificação já respondida. Entre em contato com a EDP para alterações.
                </div>
              </div>
            ) : (
              <NotificationResponseForm notificationId={n.id} userId={userId} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
