'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Bell, MapPin, LogOut, Zap, Menu, X, ChevronRight, User } from 'lucide-react'
import { useState } from 'react'
import SyncBase44Button from '@/components/SyncBase44Button'

const navItems = [
  { href: '/dashboard', label: 'Painel Principal', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/notifications', label: 'Notificações', icon: Bell },
  { href: '/dashboard/map', label: 'Mapa da Região', icon: MapPin },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 flex flex-col transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="w-9 h-9 bg-edp-green rounded-lg flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-display font-bold text-base leading-tight">EDP Telecom</p>
            <p className="text-white/40 text-xs">Portal de Gestão</p>
          </div>
          <button onClick={() => setMobileOpen(false)} className="ml-auto lg:hidden text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-edp-green/20 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-edp-light" />
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-medium truncate">{session?.user?.company_name || session?.user?.name}</p>
              <p className="text-white/40 text-xs truncate">{session?.user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <p className="text-white/30 text-xs uppercase tracking-widest px-3 mb-3">Menu</p>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${isActive(item.href, item.exact) ? 'bg-edp-green text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium flex-1">{item.label}</span>
              {isActive(item.href, item.exact) && <ChevronRight className="w-4 h-4 opacity-70" />}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <button onClick={() => signOut({ callbackUrl: '/auth/login' })}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all w-full">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center gap-4 flex-shrink-0">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <SyncBase44Button />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-edp-green" />
              <span className="hidden md:inline">{session?.user?.municipality || 'Área de Concessão EDP'}</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
