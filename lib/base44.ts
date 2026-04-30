import { createClient } from '@base44/sdk'

const base44 = createClient({
  appId: process.env.BASE44_APP_ID || '690248a304b1770ec9b7c4ed',
  headers: {
    api_key: process.env.BASE44_API_KEY || '2140f02bae1b47739601b959d5112078',
  },
})

export default base44

export function mapBase44Priority(value: string | number | undefined): 'urgent' | 'high' | 'normal' | 'low' {
  const v = String(value || '').toLowerCase()
  if (['urgente', 'urgent', 'critica', 'critico', '1'].includes(v)) return 'urgent'
  if (['alta', 'high', 'alto', '2'].includes(v)) return 'high'
  if (['baixa', 'low', 'baixo', '4'].includes(v)) return 'low'
  return 'normal'
}

export function normalizeBase44Notification(item: Record<string, any>) {
  return {
    base44_id: String(item.id || item._id || item.codigo || item.numero || ''),
    title: item.titulo || item.title || item.assunto || item.nome || `Notificação ${item.id}`,
    description: item.descricao || item.description || item.observacao || item.detalhe || null,
    pdf_url: item.arquivo_url || item.pdf_url || item.pdf || item.documento_url || item.anexo || null,
    municipality: item.municipio || item.cidade || item.municipality || item.local || null,
    priority: mapBase44Priority(item.prioridade || item.priority || item.urgencia),
    status: ['respondida', 'fechada', 'resolvida'].includes(String(item.status).toLowerCase())
      ? 'acknowledged'
      : 'pending',
  }
}

export const ENTITY_CANDIDATES = [
  'Notificacoes', 'Notificacao', 'Notifications',
  'Ocorrencias', 'Ocorrencia', 'Regularizacoes',
  'Comunicados', 'Alertas',
]
