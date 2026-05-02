'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Building2, Mail, Phone, Lock, MapPin, User, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import EdpLogo from '@/components/EdpLogo'

const MUNICIPALITIES = [
  'São José dos Campos','Jacareí','Taubaté','Caçapava','Pindamonhangaba',
  'Tremembé','Aparecida','Guaratinguetá','Lorena','Cruzeiro','Queluz',
  'Lavrinhas','Silveiras','São José do Barreiro','Areias','Bananal',
  'Arapeí','Cunha','Paraibuna','Santa Branca','Jambeiro','Igaratá',
  'Guararema','Salesópolis','Natividade da Serra','Redenção da Serra',
  'São Luis do Paraitinga','Potim',
]

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', company_name: '', cnpj: '',
    phone: '', municipality: '', password: '', confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const formatCNPJ = (v: string) => v.replace(/\D/g,'').replace(/^(\d{2})(\d)/,'$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/,'$1.$2.$3').replace(/\.(\d{3})(\d)/,'.$1/$2').replace(/(\d{4})(\d)/,'$1-$2').slice(0,18)
  const formatPhone = (v: string) => v.replace(/\D/g,'').replace(/^(\d{2})(\d)/,'($1) $2').replace(/(\d{5})(\d)/,'$1-$2').slice(0,15)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) return toast.error('As senhas não conferem')
    if (form.password.length < 8) return toast.error('Senha mínima: 8 caracteres')
    setLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, company_name: form.company_name, cnpj: form.cnpj, phone: form.phone, municipality: form.municipality, password: form.password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast.success('Cadastro realizado! Faça login.')
      router.push('/auth/login')
    } catch (err: any) {
      toast.error(err.message || 'Erro ao cadastrar')
    } finally {
      setLoading(false)
    }
  }

  const ic = "input-dark w-full px-4 py-3 rounded-xl text-sm"
  const icl = "input-dark w-full pl-10 pr-4 py-3 rounded-xl text-sm"

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden py-12 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/poste.jpg')" }} />
      <div className="absolute inset-0 bg-edp-bg/88" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-edp-green/8 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 w-full max-w-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/auth/login" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </Link>
          <EdpLogo size={32} showText={true} />
          <div className="w-16" />
        </div>

        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl text-white">Cadastro de Empresa</h1>
          <p className="text-white/40 mt-2 text-sm">Registre sua empresa no Portal Telecom EDP</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Empresa */}
            <div>
              <h3 className="text-edp-green font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Dados da Empresa
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs text-white/50 mb-1.5">Razão Social *</label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input name="company_name" value={form.company_name} onChange={handleChange} required placeholder="Telecom Exemplo Ltda" className={icl} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5">CNPJ</label>
                  <input value={form.cnpj} onChange={e => setForm(p=>({...p,cnpj:formatCNPJ(e.target.value)}))} placeholder="00.000.000/0001-00" className={ic} />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5">Telefone</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input value={form.phone} onChange={e => setForm(p=>({...p,phone:formatPhone(e.target.value)}))} placeholder="(12) 99999-9999" className={icl} />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-white/50 mb-1.5">Município Principal *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 z-10" />
                    <select name="municipality" value={form.municipality} onChange={handleChange} required
                      className="input-dark w-full pl-10 pr-4 py-3 rounded-xl text-sm appearance-none">
                      <option value="" className="bg-edp-card">Selecione o município</option>
                      {MUNICIPALITIES.map(m => <option key={m} value={m} className="bg-edp-card">{m}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/8" />

            {/* Responsável */}
            <div>
              <h3 className="text-edp-green font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                <User className="w-4 h-4" /> Dados do Responsável
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs text-white/50 mb-1.5">Nome Completo *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="João da Silva" className={icl} />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-white/50 mb-1.5">E-mail *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="responsavel@empresa.com.br" className={icl} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5">Senha *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input name="password" type={showPassword?'text':'password'} value={form.password} onChange={handleChange} required placeholder="Mínimo 8 caracteres" className="input-dark w-full pl-10 pr-12 py-3 rounded-xl text-sm" />
                    <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                      {showPassword?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5">Confirmar Senha *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input name="confirmPassword" type={showPassword?'text':'password'} value={form.confirmPassword} onChange={handleChange} required placeholder="Repita a senha" className={icl} />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-glow w-full text-white font-semibold py-3.5 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? (<><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Cadastrando...</>) : 'Finalizar Cadastro'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
