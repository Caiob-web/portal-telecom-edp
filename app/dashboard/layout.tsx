'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Bell, MapPin, LogOut, Menu, X, ChevronRight, User, Shield } from 'lucide-react'
import { useState } from 'react'
import SyncBase44Button from '@/components/SyncBase44Button'
import EdpLogo from '@/components/EdpLogo'

const navItems = [
  { href: '/dashboard',               label: 'Painel',       icon: LayoutDashboard, exact: true },
  { href: '/dashboard/notifications', label: 'Notificações', icon: Bell },
  { href: '/dashboard/map',           label: 'Mapa',         icon: MapPin },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const pathname    = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  const isAdmin = session?.user?.role === 'admin'

  // Loading state durante hidratação
  if (status === 'loading') {
    return (
      <div className="flex h-screen bg-edp-bg items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <EdpLogo size={48} showText={false} />
          <div className="w-6 h-6 border-2 border-edp-green border-t-transparent rounded-full animate-spin" />
          <p className="text-white/30 text-sm">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-edp-bg overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-edp-sidebar flex flex-col transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto border-r border-white/5 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
          <EdpLogo size={34} showText={true} />
          <button onClick={() => setMobileOpen(false)} className="ml-auto lg:hidden text-white/40 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-3 border-b border-white/5">
          <p className="text-white/30 text-xs uppercase tracking-widest">Portal Telecom</p>
        </div>

        {/* User info */}
        <div className="px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-edp-green/20 border border-edp-green/30 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-edp-green" />
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-white text-sm font-medium truncate">
                {session?.user?.company_name || session?.user?.name || '...'}
              </p>
              <p className="text-white/30 text-xs truncate">{session?.user?.email || ''}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <p className="text-white/20 text-xs uppercase tracking-widest px-3 mb-3">Menu</p>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive(item.href, item.exact)
                  ? 'bg-edp-green/20 text-edp-green border border-edp-green/30'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}>
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium flex-1">{item.label}</span>
              {isActive(item.href, item.exact) && <ChevronRight className="w-4 h-4 opacity-60" />}
            </Link>
          ))}

          {isAdmin && (
            <>
              <div className="border-t border-white/5 my-3" />
              <p className="text-white/20 text-xs uppercase tracking-widest px-3 mb-2">Admin</p>
              <Link href="/admin" onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  pathname.startsWith('/admin')
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}>
                <Shield className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">Painel Admin</span>
              </Link>
            </>
          )}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-white/5">
          <button
            onClick={() => signOut({ callbackUrl: '/auth/login' })}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-edp-sidebar/80 backdrop-blur border-b border-white/5 px-4 lg:px-6 py-3 flex items-center gap-4 flex-shrink-0">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden text-white/40 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <SyncBase44Button />
            <div className="flex items-center gap-2 text-sm text-white/40">
              <MapPin className="w-4 h-4 text-edp-green" />
              <span className="hidden md:inline">{session?.user?.municipality || 'Área EDP'}</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-edp-bg">{children}</main>
      </div>
    </div>
  )
}
