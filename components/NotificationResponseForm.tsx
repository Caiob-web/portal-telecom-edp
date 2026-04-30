'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, X, Send } from 'lucide-react'
import toast from 'react-hot-toast'

interface Props { notificationId: number; userId: number }

export default function NotificationResponseForm({ notificationId }: Props) {
  const router = useRouter()
  const [observation, setObservation] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 10 * 1024 * 1024) return toast.error('Imagem muito grande. Máximo 10MB.')
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
    if (!allowed.includes(file.type)) return toast.error('Formato não suportado. Use JPG, PNG ou WebP.')
    setImage(file)
    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file || !fileRef.current) return
    const dt = new DataTransfer()
    dt.items.add(file)
    fileRef.current.files = dt.files
    handleImageSelect({ target: fileRef.current } as any)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!observation.trim()) return toast.error('Por favor, adicione uma observação')
    if (observation.trim().length < 10) return toast.error('Observação muito curta.')
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('notification_id', String(notificationId))
      formData.append('observation', observation.trim())
      if (image) formData.append('image', image)

      const res  = await fetch('/api/respond', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro ao enviar resposta')
      toast.success('✅ Resposta enviada com sucesso!')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Erro ao enviar resposta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Foto Comprovante <span className="text-gray-400 font-normal">(recomendado)</span>
        </label>
        {imagePreview ? (
          <div className="relative inline-block">
            <img src={imagePreview} alt="Preview" className="rounded-xl border border-gray-200 max-h-64 max-w-full object-cover shadow-sm" />
            <button type="button" onClick={() => { setImage(null); setImagePreview(null); if (fileRef.current) fileRef.current.value = '' }}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-lg">
              <X className="w-4 h-4" />
            </button>
            <div className="mt-2 text-xs text-gray-500">{image?.name} ({(image!.size / 1024).toFixed(0)}KB)</div>
          </div>
        ) : (
          <div onDrop={handleDrop} onDragOver={e => e.preventDefault()} onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-edp-green hover:bg-edp-50/50 transition-all group">
            <div className="w-12 h-12 bg-gray-100 group-hover:bg-edp-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Upload className="w-6 h-6 text-gray-400 group-hover:text-edp-green" />
            </div>
            <p className="text-gray-600 font-medium text-sm">Clique ou arraste uma foto aqui</p>
            <p className="text-gray-400 text-xs mt-1">JPG, PNG, WebP — máximo 10MB</p>
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageSelect} className="hidden" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Observações *</label>
        <textarea value={observation} onChange={e => setObservation(e.target.value)} rows={5} required
          placeholder="Descreva as ações realizadas, o estado atual da infraestrutura, datas de atendimento..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all resize-none text-sm" />
        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-400">Mínimo 10 caracteres</p>
          <p className={`text-xs ${observation.length > 500 ? 'text-amber-500' : 'text-gray-400'}`}>{observation.length} caracteres</p>
        </div>
      </div>

      <div className="bg-edp-50 border border-edp-100 rounded-xl p-4 flex items-start gap-3">
        <div className="w-5 h-5 bg-edp-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-white text-xs font-bold">i</span>
        </div>
        <p className="text-sm text-edp-700">Após enviar sua resposta, ela não poderá ser editada. Certifique-se de que as informações estão corretas.</p>
      </div>

      <button type="submit" disabled={loading || !observation.trim()}
        className="w-full bg-edp-green hover:bg-edp-dark text-white font-semibold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm">
        {loading ? (
          <><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Enviando...</>
        ) : (
          <><Send className="w-5 h-5" /> Confirmar Atendimento</>
        )}
      </button>
    </form>
  )
}
