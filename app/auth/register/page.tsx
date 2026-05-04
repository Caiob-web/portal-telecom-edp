'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
  Phone,
  Search,
  User,
  AlertCircle,
} from 'lucide-react'
import toast from 'react-hot-toast'
import EdpLogo from '@/components/EdpLogo'
import { CONTRACTED_COMPANIES } from '@/lib/contractedCompanies'

const REGIONS = [
  {
    id: 'vale-do-paraiba',
    title: 'Vale do Paraíba',
    description: 'São José dos Campos, Taubaté, Jacareí e região',
  },
  {
    id: 'alto-tiete',
    title: 'Alto Tietê',
    description: 'Mogi das Cruzes, Suzano, Guarulhos e região',
  },
  {
    id: 'vale-historico',
    title: 'Vale Histórico',
    description: 'Lorena, Cruzeiro, Guaratinguetá e região',
  },
]

const MUNICIPALITIES = [
  'Aparecida',
  'Areias',
  'Bananal',
  'Caçapava',
  'Cachoeira Paulista',
  'Canas',
  'Cruzeiro',
  'Guaratinguetá',
  'Guarulhos',
  'Itaquaquecetuba',
  'Jacareí',
  'Jambeiro',
  'Lavrinhas',
  'Lorena',
  'Mogi das Cruzes',
  'Monteiro Lobato',
  'Paraibuna',
  'Pindamonhangaba',
  'Poá',
  'Potim',
  'Queluz',
  'Roseira',
  'Santa Branca',
  'São José do Barreiro',
  'São José dos Campos',
  'Silveiras',
  'Suzano',
  'Taubaté',
  'Tremembé',
]

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, ' ').toUpperCase()
}

export default function RegisterPage() {
  const router = useRouter()

  const [companyName, setCompanyName] = useState('')
  const [companyNotListed, setCompanyNotListed] = useState(false)
  const [cnpj, setCnpj] = useState('')
  const [phone, setPhone] = useState('')
  const [municipality, setMunicipality] = useState('')
  const [regions, setRegions] = useState<string[]>([])
  const [responsibleName, setResponsibleName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const selectedCompanyIsValid = useMemo(() => {
    const typed = normalizeText(companyName)

    if (!typed) return false

    return CONTRACTED_COMPANIES.some(
      (company) => normalizeText(company) === typed
    )
  }, [companyName])

  const toggleRegion = (regionId: string) => {
    setRegions((current) =>
      current.includes(regionId)
        ? current.filter((item) => item !== regionId)
        : [...current, regionId]
    )
  }

  const handleCompanyNotListedChange = () => {
    setCompanyNotListed((current) => !current)
    setCompanyName('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const cleanCompanyName = companyName.trim()

    if (!cleanCompanyName) {
      toast.error('Informe o nome da empresa.')
      return
    }

    if (!companyNotListed && !selectedCompanyIsValid) {
      toast.error('Selecione uma empresa contratada válida da lista.')
      return
    }

    if (companyNotListed && cleanCompanyName.length < 3) {
      toast.error('Digite o nome completo da empresa.')
      return
    }

    if (regions.length === 0) {
      toast.error('Selecione pelo menos uma região de atuação.')
      return
    }

    if (!municipality.trim()) {
      toast.error('Informe o município sede.')
      return
    }

    if (!responsibleName.trim()) {
      toast.error('Informe o nome do responsável.')
      return
    }

    if (!email.trim()) {
      toast.error('Informe o e-mail do responsável.')
      return
    }

    if (password.length < 8) {
      toast.error('A senha precisa ter no mínimo 8 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      toast.error('As senhas não conferem.')
      return
    }

    setLoading(true)

    try {
      const payload = {
        companyName: cleanCompanyName,
        company_name: cleanCompanyName,
        razao_social: cleanCompanyName,
        companyNotListed,
        cnpj: cnpj.trim(),
        phone: phone.trim(),
        municipality: municipality.trim(),
        regions,
        region: regions.join(', '),
        responsibleName: responsibleName.trim(),
        name: responsibleName.trim(),
        email: email.trim().toLowerCase(),
        password,
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.error || 'Não foi possível finalizar o cadastro.')
      }

      toast.success('Cadastro realizado com sucesso!')
      router.push('/auth/login')
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao realizar cadastro.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* ======================== */}
      {/* LADO ESQUERDO — Foto */}
      {/* ======================== */}
      <div className="hidden lg:flex lg:w-[44%] relative overflow-hidden flex-col">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/poste-sunset.jpg')" }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/35 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

        <div className="relative z-10 flex flex-col h-full p-10">
          <EdpLogo size={44} showText={true} dark={false} />

          <div className="flex-1 flex flex-col justify-end pb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md w-fit">
              <span className="w-2 h-2 bg-edp-green rounded-full animate-pulse" />
              <span className="text-white text-xs font-semibold uppercase tracking-widest">
                Cadastro de Empresa
              </span>
            </div>

            <h1 className="font-display font-bold text-5xl text-white leading-tight mb-4">
              Faça parte da<br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #00A651, #7DC242)',
                }}
              >
                rede EDP
              </span>
            </h1>

            <p className="text-white/80 text-lg max-w-md leading-relaxed mb-8">
              Cadastre sua empresa e acompanhe notificações, retornos e
              informações da área de concessão em tempo real.
            </p>

            <div className="space-y-3 max-w-xl">
              {REGIONS.map((region) => (
                <div
                  key={region.id}
                  className="flex items-center gap-3 rounded-xl border border-white/15 bg-black/25 backdrop-blur-md p-4"
                >
                  <div className="w-9 h-9 rounded-lg bg-edp-green/15 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-edp-green" />
                  </div>

                  <div>
                    <p className="text-white font-semibold text-sm">
                      {region.title}
                    </p>
                    <p className="text-white/70 text-xs">
                      {region.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ======================== */}
      {/* LADO DIREITO — Cadastro */}
      {/* ======================== */}
      <div className="flex-1 min-h-screen overflow-y-auto bg-white relative">
        <div className="absolute top-0 right-0 w-72 h-72 bg-edp-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-500/5 rounded-full blur-3xl" />

        <main className="relative w-full max-w-xl mx-auto px-6 sm:px-10 py-10">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o login
          </Link>

          <div className="mb-8">
            <EdpLogo size={38} showText={true} dark={true} className="mb-6" />

            <h1 className="font-display font-bold text-3xl text-slate-950">
              Cadastro de Empresa
            </h1>

            <p className="text-slate-600 text-sm mt-1">
              Selecione sua empresa ou cadastre uma nova solicitação de acesso
              ao Portal Telecom EDP.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* DADOS DA EMPRESA */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-edp-green/10 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-edp-green" />
                </div>

                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Dados da Empresa
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Empresa *
                    </label>

                    <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={companyNotListed}
                        onChange={handleCompanyNotListedChange}
                        className="w-4 h-4 rounded border-slate-300 text-edp-green focus:ring-edp-green"
                      />
                      Empresa não está na lista
                    </label>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                      list={companyNotListed ? undefined : 'contracted-companies'}
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      placeholder={
                        companyNotListed
                          ? 'Digite o nome completo da empresa'
                          : 'Digite ou selecione a empresa contratada'
                      }
                      className="w-full pl-10 pr-10 py-3 bg-white border border-slate-300 rounded-xl text-slate-950 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all shadow-sm"
                    />

                    {!companyNotListed && selectedCompanyIsValid && (
                      <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-edp-green" />
                    )}

                    {companyNotListed && companyName.trim().length >= 3 && (
                      <AlertCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                    )}

                    <datalist id="contracted-companies">
                      {CONTRACTED_COMPANIES.map((company) => (
                        <option key={company} value={company} />
                      ))}
                    </datalist>
                  </div>

                  {!companyNotListed ? (
                    <p className="text-xs text-slate-500 mt-2">
                      Se a empresa já possuir contrato, selecione o nome na
                      lista cadastrada.
                    </p>
                  ) : (
                    <div className="mt-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
                      <p className="text-xs text-amber-800 leading-relaxed">
                        A empresa será cadastrada como nova solicitação no Neon.
                        Depois, poderá ser conferida pela administração.
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      CNPJ
                    </label>

                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                      <input
                        type="text"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        placeholder="00.000.000/0001-00"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-950 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Telefone
                    </label>

                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(12) 99999-9999"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-950 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Município sede *
                  </label>

                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                      list="municipalities"
                      value={municipality}
                      onChange={(e) => setMunicipality(e.target.value)}
                      required
                      placeholder="Selecione ou digite o município"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-950 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all shadow-sm"
                    />

                    <datalist id="municipalities">
                      {MUNICIPALITIES.map((city) => (
                        <option key={city} value={city} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Regiões de atuação *
                    <span className="ml-1 normal-case tracking-normal font-medium text-slate-500">
                      selecione uma ou mais
                    </span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {REGIONS.map((region) => {
                      const selected = regions.includes(region.id)

                      return (
                        <button
                          key={region.id}
                          type="button"
                          onClick={() => toggleRegion(region.id)}
                          className={`text-left rounded-xl border p-4 transition-all ${
                            selected
                              ? 'border-edp-green bg-edp-green/10 shadow-sm'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 ${
                                selected
                                  ? 'border-edp-green bg-edp-green text-white'
                                  : 'border-slate-300 bg-white'
                              }`}
                            >
                              {selected && (
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              )}
                            </span>

                            <span>
                              <span className="block text-sm font-bold text-slate-800 leading-snug">
                                {region.title}
                              </span>

                              <span className="block text-xs text-slate-500 leading-snug mt-1">
                                {region.description}
                              </span>
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* DADOS DO RESPONSÁVEL */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-edp-green/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-edp-green" />
                </div>

                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Dados do Responsável
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Nome completo *
                  </label>

                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                      type="text"
                      value={responsibleName}
                      onChange={(e) => setResponsibleName(e.target.value)}
                      required
                      placeholder="João da Silva"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-950 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    E-mail *
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="responsavel@empresa.com.br"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-950 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Senha *
                    </label>

                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Mínimo 8 caracteres"
                        className="w-full pl-10 pr-11 py-3 bg-white border border-slate-300 rounded-xl text-slate-950 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all shadow-sm"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Confirmar senha *
                    </label>

                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Repita a senha"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-950 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-semibold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-glow shadow-lg shadow-edp-green/20"
            >
              {loading ? 'Finalizando cadastro...' : 'Finalizar Cadastro'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-slate-200 pt-6">
            <p className="text-slate-500 text-sm">
              Já tem uma conta?{' '}
              <Link
                href="/auth/login"
                className="text-edp-green hover:text-green-700 font-semibold"
              >
                Fazer login
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
