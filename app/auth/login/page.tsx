'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Shield,
  Bell,
  MapPin,
} from 'lucide-react'
import toast from 'react-hot-toast'
import EdpLogo from '@/components/EdpLogo'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast.error('E-mail ou senha inválidos')
        return
      }

      toast.success('Acesso autorizado!')
      router.push('/dashboard')
      router.refresh()
    } catch {
      toast.error('Erro ao realizar login.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* ======================== */}
      {/* LADO ESQUERDO — Foto Poste */}
      {/* ======================== */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col">

        {/* Foto do poste */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/poste.jpg')" }}
        />

        {/* Overlay gradiente escuro */}
        <div className="absolute inset-0 bg-gradient-to-br from-edp-bg/80 via-edp-bg/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-edp-bg/90 via-transparent to-transparent" />

        {/* Grid overlay sutil */}
        <div className="absolute inset-0 bg-grid opacity-30" />

        {/* Glow verde no topo */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-edp-green/20 rounded-full blur-3xl" />

        {/* Conteúdo sobre a foto */}
        <div className="relative z-10 flex flex-col h-full p-10">

          {/* Logo EDP no topo */}
          <div className="flex items-center gap-3">
            <EdpLogo size={44} showText={true} dark={false} />
          </div>

          {/* Texto central */}
          <div className="flex-1 flex flex-col justify-end pb-10">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-edp-green/20 border border-edp-green/30 rounded-full px-4 py-1.5 mb-6">
                <div className="w-2 h-2 bg-edp-green rounded-full animate-pulse" />
                <span className="text-edp-green text-xs font-semibold uppercase tracking-widest">
                  Portal Ativo
                </span>
              </div>

              <h1 className="font-display font-bold text-5xl text-white leading-tight mb-4">
                Portal de Notificações<br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #00A651, #7DC242)',
                  }}
                >
                  Telecom - EDP/SP.
                </span>
              </h1>

              <p className="text-white/75 text-lg max-w-sm leading-relaxed">
                Plataforma integrada de notificações para as empresas de telecomunicações da área de concessão EDP.
              </p>

              {/* Cards informativos */}
              <div className="grid grid-cols-3 gap-3 mt-8">
                {[
                  {
                    icon: Bell,
                    label: 'Notificações',
                    desc: 'Em tempo real',
                  },
                  {
                    icon: MapPin,
                    label: '28 municípios da área de concessão',
                    desc: 'Vale do Paraíba, Alto Tietê e Vale Histórico',
                  },
                  {
                    icon: Shield,
                    label: 'Seguro',
                    desc: 'Acesso protegido',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/8 backdrop-blur-md border border-white/15 rounded-xl p-3 min-h-[96px]"
                  >
                    <item.icon className="w-5 h-5 text-edp-green mb-2" />

                    <p className="text-white text-xs font-semibold leading-snug">
                      {item.label}
                    </p>

                    <p className="text-white/65 text-xs leading-snug mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================== */}
      {/* LADO DIREITO — Formulário */}
      {/* ======================== */}
      <div className="flex-1 flex items-center justify-center bg-white relative overflow-hidden">

        {/* Decoração sutil */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-edp-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />

        {/* Linha vertical separadora */}
        <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-3/4 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />

        <div className="w-full max-w-sm px-8 py-10 relative animate-slide-up">

          {/* Mobile: logo no topo */}
          <div className="lg:hidden flex justify-center mb-8">
            <EdpLogo size={40} showText={true} dark={true} />
          </div>

          {/* Header do form */}
          <div className="mb-8">

            {/* EDP logo pequeno desktop */}
            <div className="hidden lg:flex items-center gap-2 mb-6">
              <EdpLogo size={32} showText={true} dark={true} />
            </div>

            <h2 className="font-display font-bold text-2xl text-slate-950">
              Bem-vindo de volta
            </h2>

            <p className="text-slate-600 text-sm mt-1">
              Acesse sua área de telecomunicações
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                E-mail
              </label>

              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="sua@empresa.com.br"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-950 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Senha
              </label>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-white border border-slate-300 rounded-xl text-slate-950 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-edp-green/20 focus:border-edp-green transition-all shadow-sm"
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

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-semibold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 btn-glow"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Entrando...
                </>
              ) : (
                <>
                  Acessar Portal
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divisor */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-400 text-xs">ou</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Cadastro */}
          <div className="text-center">
            <p className="text-slate-500 text-sm">
              Ainda não tem acesso?
            </p>

            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 mt-2 text-edp-green hover:text-green-700 font-semibold text-sm transition-colors"
            >
              Cadastrar minha empresa
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-slate-200 text-center">
            <p className="text-slate-500 text-xs leading-relaxed">
              © {new Date().getFullYear()} EDP · Área de Concessão: Vale do Paraíba, Alto Tietê e Vale Histórico
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
