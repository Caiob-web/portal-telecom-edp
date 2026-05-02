'use client'

import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SyncBase44Button() {
  const [loading, setLoading] = useState(false)

  const handleSync = async () => {
    setLoading(true)
    try {
      const res  = await fetch('/api/notifications', { method: 'PUT' })
      const data = await res.json()
      if (res.ok) {
        toast.success(`✅ ${data.synced} notificações sincronizadas`)
        setTimeout(() => window.location.reload(), 1000)
      } else {
        toast.error(`Erro: ${data.error}`)
      }
    } catch {
      toast.error('Erro ao sincronizar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleSync} disabled={loading}
      className="flex items-center gap-2 text-sm text-white/30 hover:text-edp-green transition-colors disabled:opacity-50 px-3 py-1.5 rounded-xl hover:bg-edp-green/5 border border-white/5">
      <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-edp-green' : ''}`} />
      <span className="hidden sm:inline">{loading ? 'Sincronizando...' : 'Base44'}</span>
    </button>
  )
}
