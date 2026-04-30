import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import sql from '@/lib/db'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FileText, MapPin, Clock, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import NotificationResponseForm from '@/components/NotificationResponseForm'

const PRIORITY_CONFIG = {
  urgent: { label: 'Urgente', class: 'bg-red-100 text-red-700 border-red-200' },
  high:   { label: 'Alta',    class: 'bg-orange-100 text-orange-700 border-orange-200' },
  normal: { label: 'Normal',  class: 'bg-blue-100 text-blue-700 border-blue-200' },
  low:    { label: 'Baixa',   class: 'bg-gray-100 text-gray-700 border-gray-200' },
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
  const notification = rows[0]
  if (!notification) notFound()

  const priority = PRIORITY_CONFIG[notification.priority as keyof typeof PRIORITY_CONFIG] || PRIORITY_CONFIG.normal
  const isResponded = !!notification.response_id

  return (
    <div className="p-4 lg:p-6 max-w-4xl animate-fade-in">
      <Link href="/dashboard/notifications" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar às notificações
      </Link>

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className={`h-2 ${notification.priority === 'urgent' ? 'bg-red-500' : notification.priority === 'high' ? 'bg-orange-500' : notification.priority === 'normal' ? 'bg-blue-500' : 'bg-gray-300'}`} />
          <div className="p-6">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${priority.class}`}>{priority.label}</span>
              {isResponded ? (
                <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Respondida</span>
              ) : (
                <span className="text-xs bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-0.5 rounded-full font-medium">⏳ Aguardando resposta</span>
              )}
            </div>
            <h1 className="font-display font-bold text-xl text-gray-800">{notification.title}</h1>
            <div className="flex items-center gap-6 mt-4 text-sm text-gray-500 flex-wrap">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{format(new Date(notification.created_at), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}</span>
              {notification.municipality && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{notification.municipality}</span>}
              {notification.base44_id && <span className="text-xs text-gray-400 font-mono">ID: {notification.base44_id}</span>}
            </div>
          </div>
        </div>

        {notification.description && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-display font-semibold text-gray-800 mb-3">Descrição</h2>
            <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{notification.description}</p>
          </div>
        )}

        {notification.pdf_url && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-display font-semibold text-gray-800 mb-4">Documento Anexo (Base44)</h2>
            <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">Notificação PDF</p>
                  <p className="text-gray-500 text-xs">Documento oficial EDP</p>
                </div>
                <a href={notification.pdf_url} target="_blank" rel="noopener noreferrer"
                  className="bg-edp-green text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-edp-dark transition-colors">
                  Abrir PDF
                </a>
              </div>
              <div className="h-[500px]">
                <iframe src={`${notification.pdf_url}#toolbar=0`} className="w-full h-full" title="PDF da notificação" />
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-display font-semibold text-gray-800">{isResponded ? '✅ Sua Resposta' : '📋 Responder Notificação'}</h2>
            {!isResponded && <p className="text-gray-500 text-sm mt-1">Anexe uma foto comprovando o atendimento e adicione suas observações.</p>}
          </div>
          <div className="p-6">
            {isResponded ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Respondida em {format(new Date(notification.responded_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</span>
                </div>
                {notification.image_url && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Foto enviada:</p>
                    <img src={notification.image_url} alt="Comprovante" className="rounded-lg border border-gray-200 max-h-64 object-cover" />
                  </div>
                )}
                {notification.observation && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Observações:</p>
                    <div className="bg-gray-50 rounded-lg p-4 text-gray-700 text-sm whitespace-pre-wrap border border-gray-100">{notification.observation}</div>
                  </div>
                )}
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-sm text-amber-700 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  Notificação já respondida. Entre em contato com a EDP para alterações.
                </div>
              </div>
            ) : (
              <NotificationResponseForm notificationId={notification.id} userId={userId} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
