'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Eye, EyeOff, Building2, Mail, Phone,
  Lock, MapPin, User, ArrowLeft, ArrowRight, Check
} from 'lucide-react'
import toast from 'react-hot-toast'
import EdpLogo from '@/components/EdpLogo'

const MUNICIPALITIES = [
  'Aparecida',
  'Biritiba Mirim',
  'Caçapava',
  'Cachoeira Paulista',
  'Canas',
  'Caraguatatuba',
  'Cruzeiro',
  'Ferraz de Vasconcelos',
  'Guararema',
  'Guaratinguetá',
  'Guarulhos',
  'Itaquaquecetuba',
  'Jacareí',
  'Jambeiro',
  'Lorena',
  'Mogi das Cruzes',
  'Monteiro Lobato',
  'Pindamonhangaba',
  'Poá',
  'Potim',
  'Roseira',
  'Salesópolis',
  'Santa Branca',
  'São José dos Campos',
  'São Sebastião',
  'Suzano',
  'Taubaté',
  'Tremembé',
]

const REGIONS = [
  { id: 'vale-paraiba',  label: 'Vale do Paraíba',  desc: 'São José dos Campos, Taubaté, Jacareí e região' },
  { id: 'alto-tiete',   label: 'Alto Tietê',        desc: 'Mogi das Cruzes, Suzano, Guarulhos e região' },
  { id: 'vale-historico',label: 'Vale Histórico',   desc: 'Lorena, Cruzeiro, Guaratinguetá e região' },
]

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [form, setForm] = useState({
    name: '',
    email: '',
    company_name: '',
    cnpj: '',
    phone: '',
    municipality: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const toggleRegion = (regionId: string) => {
    setSelectedRegions(prev =>
      prev.includes(regionId)
        ? prev.filter(r => r !== regionId)
        : [...prev, regionId]
    )
  }

  const formatCNPJ = (v: string) =>
    v.replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18)

  const formatPhone = (v: string) =>
    v.replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      return toast.error('As senhas não conferem')
    }
    if (form.password.length < 8) {
      return toast.error('Senha mínima: 8 caracteres')
    }
    if (selectedRegions.length === 0) {
      return toast.error('Selecione ao menos uma região de atuação')
    }

    setLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:          form.name,
          email:         form.email,
          company_name:  form.company_name,
          cnpj:          form.cnpj,
          phone:         form.phone,
          municipality:  form.municipality,
          region:        selectedRegions.join(', '),
          password:      form.password,
        }),
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

  return (
    <div className="min-h-screen flex">

      {/* ============================== */}
      {/* LADO ESQUERDO — Foto pôr do sol */}
      {/* ============================== */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden flex-col">
        {/* Foto do pôr do sol com postes */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/poste-sunset.jpg')" }}
        />
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Conteúdo */}
        <div className="relative z-10 flex flex-col h-full p-10">
          <EdpLogo size={44} showText={true} dark={false} />

          <div className="flex-1 flex flex-col justify-end pb-10 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 mb-6 w-fit">
              <div className="w-2 h-2 bg-edp-green rounded-full animate-pulse" />
              <span className="text-white/80 text-xs font-semibold uppercase tracking-widest">
                Cadastro de Empresa
              </span>
            </div>

            <h1 className="font-display font-bold text-4xl text-white leading-tight mb-4">
              Inclua sua empresa no sistema de Notificações da<br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #00A651, #7DC242)' }}>
                rede EDP-SP
              </span>
            </h1>

            <p className="text-white/60 text-base max-w-xs leading-relaxed">
              Registre sua empresa e acesse notificações, alertas e informações da área de concessão EDP em tempo real.
            </p>

            <div className="mt-8 space-y-3">
              {REGIONS.map(r => (
                <div key={r.id} className="flex items-start gap-3 bg-white/8 backdrop-blur border border-white/10 rounded-xl p-3">
                  <div className="w-8 h-8 bg-edp-green/20 border border-edp-green/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-edp-green" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{r.label}</p>
                    <p className="text-white/40 text-xs">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================== */}
      {/* LADO DIREITO — Formulário       */}
      {/* ============================== */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="min-h-full flex flex-col justify-center py-10 px-6 lg:px-10 max-w-xl mx-auto">

          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <EdpLogo size={40} showText={true} dark={true} />
          </div>

          {/* Voltar */}
          <Link
            href="/auth/login"
            className="hidden lg:inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm transition-colors mb-8 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o login
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="hidden lg:block mb-6">
              <EdpLogo size={36} showText={true} dark={true} />
            </div>
            <h2 className="font-display font-bold text-2xl text-gray-900">
              Cadastro de Empresa
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Registre sua empresa para acessar o Portal Telecom EDP
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">

            {/* ---- DADOS DA EMPRESA ---- */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-edp-green rounded-full flex items-center justify-center">
                  <Building2 className="w-3.5 h-3.5 text-white" />
                </div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Dados da Empresa
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Razão Social */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Razão Social *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input
                      name="company_name"
                      value={form.company_name}
                      onChange={handleChange}
                      required
                      placeholder="Telecom Exemplo Ltda"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all"
                    />
                  </div>
                </div>

                {/* CNPJ */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    CNPJ
                  </label>
                  <input
                    value={form.cnpj}
                    onChange={e => setForm(p => ({ ...p, cnpj: formatCNPJ(e.target.value) }))}
                    placeholder="00.000.000/0001-00"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all"
                  />
                </div>

                {/* Telefone */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Telefone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: formatPhone(e.target.value) }))}
                      placeholder="(12) 99999-9999"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all"
                    />
                  </div>
                </div>

                {/* Município sede */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Município Sede *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 z-10" />
                    <select
                      name="municipality"
                      value={form.municipality}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all appearance-none"
                    >
                      <option value="">Selecione o município</option>
                      {MUNICIPALITIES.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Regiões de atuação */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Regiões de Atuação *{' '}
                    <span className="text-gray-300 font-normal normal-case">(selecione uma ou mais)</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {REGIONS.map(region => {
                      const isSelected = selectedRegions.includes(region.id)
                      return (
                        <button
                          key={region.id}
                          type="button"
                          onClick={() => toggleRegion(region.id)}
                          className={`relative flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${
                            isSelected
                              ? 'border-edp-green bg-edp-green/5'
                              : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                          }`}
                        >
                          {/* Checkbox visual */}
                          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                            isSelected
                              ? 'bg-edp-green border-edp-green'
                              : 'border-gray-300 bg-white'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                          </div>
                          <div>
                            <p className={`text-sm font-semibold transition-colors ${
                              isSelected ? 'text-edp-dark' : 'text-gray-700'
                            }`}>
                              {region.label}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5 leading-tight">
                              {region.desc}
                            </p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Divisor */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-gray-300 text-xs">dados do responsável</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* ---- DADOS DO RESPONSÁVEL ---- */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-edp-green rounded-full flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Dados do Responsável
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nome */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="João da Silva"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all"
                    />
                  </div>
                </div>

                {/* E-mail */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    E-mail *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="responsavel@empresa.com.br"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all"
                    />
                  </div>
                </div>

                {/* Senha */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Senha *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange}
                      required
                      placeholder="Mínimo 8 caracteres"
                      className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirmar Senha */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Confirmar Senha *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Repita a senha"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Botão submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-semibold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-glow"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Cadastrando...
                </>
              ) : (
                <>
                  Finalizar Cadastro
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Link login */}
            <p className="text-center text-gray-400 text-sm">
              Já tem uma conta?{' '}
              <Link href="/auth/login" className="text-edp-green hover:text-edp-dark font-semibold transition-colors">
                Fazer login
              </Link>
            </p>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-300 text-xs">
              © {new Date().getFullYear()} EDP · Área de Concessão Vale do Paraíba
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
