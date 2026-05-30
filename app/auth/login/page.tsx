import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { EDPLogo } from "@/components/brand/EDPLogo";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#111a20] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/auth-powerlines-sunset.png')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,14,18,0.52),rgba(14,24,29,0.32)_44%,rgba(7,14,18,0.58)),radial-gradient(circle_at_70%_18%,rgba(33,255,114,0.18),transparent_30%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,16,21,0.2),rgba(9,16,21,0.68))]"
        aria-hidden="true"
      />

      <section className="relative z-10 flex min-h-screen flex-col px-5 py-5 sm:px-8 lg:px-12 lg:py-9">
        <header className="flex items-center justify-between gap-4">
          <Link
            href="/auth/login"
            className="inline-flex rounded-2xl border border-white/24 bg-white/8 px-3 py-2 shadow-[0_18px_48px_rgba(0,0,0,0.24)] backdrop-blur-md transition hover:bg-white/12"
            aria-label="Portal Telecom EDP"
          >
            <EDPLogo showPortalName inverted compact monochrome />
          </Link>

          <span className="hidden items-center gap-2 rounded-full border border-white/24 bg-white/8 px-4 py-2 text-xs font-black uppercase tracking-wide text-white/88 backdrop-blur-md sm:inline-flex">
            <LockKeyhole className="h-4 w-4 text-[#21ff72]" aria-hidden="true" />
            Acesso empresarial restrito
          </span>
        </header>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="auth-card w-full max-w-[440px] rounded-[26px] border border-white/90 p-6 text-[#132334] shadow-[0_34px_110px_rgba(0,0,0,0.42)] sm:p-8">
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
