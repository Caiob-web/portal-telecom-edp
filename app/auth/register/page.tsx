'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Zap, Building2, Mail, Phone, Lock, MapPin, User } from 'lucide-react'
import toast from 'react-hot-toast'

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

  const formatCNPJ = (value: string) => {
    const d = value.replace(/\D/g, '')
    return d.replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18)
  }

  const formatPhone = (value: string) => {
    const d = value.replace(/\D/g, '')
    return d.replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) return toast.error('As senhas não conferem')
    if (form.password.length < 8) return toast.error('A senha deve ter pelo menos 8 caracteres')
    setLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, email: form.email, company_name: form.company_name,
          cnpj: form.cnpj, phone: form.phone, municipality: form.municipality,
          password: form.password,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro ao cadastrar')
      toast.success('Cadastro realizado! Faça login para continuar.')
      router.push('/auth/login')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao realizar cadastro')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all"
  const inputWithIconClass = "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all"

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/auth/login" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-edp-green rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-gray-800">EDP Portal Telecom</span>
          </Link>
          <h1 className="font-display font-bold text-3xl text-gray-800">Cadastro de Empresa</h1>
          <p className="text-gray-500 mt-2">Registre sua empresa para acessar o portal de telecomunicações EDP</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <h3 className="font-display font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-edp-green" /> Dados da Empresa
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Razão Social *</label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input name="company_name" value={form.company_name} onChange={handleChange} required placeholder="Telecom Exemplo Ltda" className={inputWithIconClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">CNPJ</label>
                  <input value={form.cnpj} onChange={e => setForm(p => ({ ...p, cnpj: formatCNPJ(e.target.value) }))} placeholder="00.000.000/0001-00" className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefone</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: formatPhone(e.target.value) }))} placeholder="(12) 99999-9999" className={inputWithIconClass} />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Município Principal *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                    <select name="municipality" value={form.municipality} onChange={handleChange} required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all appearance-none bg-white">
                      <option value="">Selecione o município</option>
                      {MUNICIPALITIES.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            <div>
              <h3 className="font-display font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-edp-green" /> Dados do Responsável
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome Completo *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="João da Silva" className={inputWithIconClass} />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">E-mail *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="responsavel@empresa.com.br" className={inputWithIconClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Senha *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} required placeholder="Mínimo 8 caracteres" className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirmar Senha *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input name="confirmPassword" type={showPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={handleChange} required placeholder="Repita a senha" className={inputWithIconClass} />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-edp-green hover:bg-edp-dark text-white font-semibold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {loading ? (
                <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Cadastrando...</>
              ) : 'Finalizar Cadastro'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Já tem uma conta?{' '}
          <Link href="/auth/login" className="text-edp-green font-semibold hover:text-edp-dark">Fazer login</Link>
        </p>
      </div>
    </div>
  )
}
