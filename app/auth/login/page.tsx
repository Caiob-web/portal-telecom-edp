import Link from "next/link";
import {
  Building2,
  FileCheck2,
  LockKeyhole,
  Network,
  ShieldCheck
} from "lucide-react";
import { EDPLogo } from "@/components/brand/EDPLogo";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b0f12] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center lg:right-[31%]"
        style={{ backgroundImage: "url('/auth-powerlines-sunset.png')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,8,12,0.34)_0%,rgba(4,8,12,0.42)_42%,rgba(4,8,12,0.76)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 hidden w-[58%] bg-[#101315] shadow-[0_0_120px_rgba(0,0,0,0.55)] lg:block"
        style={{ clipPath: "polygon(24% 0, 100% 0, 100% 100%, 0 100%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 hidden w-[58%] bg-[radial-gradient(circle_at_82%_22%,rgba(33,255,114,0.11),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent)] lg:block"
        style={{ clipPath: "polygon(24% 0, 100% 0, 100% 100%, 0 100%)" }}
        aria-hidden="true"
      />

      <section className="relative z-10 grid min-h-screen grid-rows-[auto_1fr] px-5 py-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)] lg:grid-rows-1 lg:px-12 lg:py-10 xl:px-16">
        <div className="flex min-h-[44vh] flex-col justify-between pb-8 lg:min-h-0 lg:pb-0 lg:pr-16">
          <header className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex rounded-xl border border-white/18 bg-black/20 p-2 shadow-[0_14px_40px_rgba(0,0,0,0.25)] backdrop-blur-md transition hover:bg-black/30"
              aria-label="Voltar para a p?gina inicial"
            >
              <EDPLogo showPortalName inverted compact />
            </Link>
            <span className="hidden rounded-full border border-white/35 bg-black/20 px-4 py-2 text-xs font-bold text-white/85 backdrop-blur-md sm:inline-flex">
              Acesso empresarial restrito
            </span>
          </header>

          <div className="max-w-[620px] pb-4 pt-20 sm:pt-24 lg:pb-16 lg:pt-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/24 px-4 py-2 text-xs font-black uppercase tracking-wide text-white/88 backdrop-blur-md">
              <LockKeyhole className="h-4 w-4 text-[#21ff72]" aria-hidden="true" />
              Empresas compartilhantes autorizadas
            </div>

            <h1 className="mt-7 text-[clamp(2.7rem,6vw,5.9rem)] font-black leading-[0.93] tracking-normal text-white drop-shadow-[0_12px_42px_rgba(0,0,0,0.45)]">
              Portal Telecom EDP
            </h1>
            <p className="mt-6 max-w-xl text-xl font-black leading-8 text-[#21ff72] drop-shadow-[0_10px_34px_rgba(0,0,0,0.5)] sm:text-2xl">
              Gest?o de notifica??es, documentos e comunica??es oficiais em um
              ambiente empresarial seguro.
            </p>

            <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Acesso seguro", icon: ShieldCheck },
                { label: "Documentos", icon: FileCheck2 },
                { label: "Empresas", icon: Building2 },
                { label: "Telecom", icon: Network }
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/24 bg-black/24 p-3 shadow-[0_16px_38px_rgba(0,0,0,0.24)] backdrop-blur-md"
                  >
                    <Icon className="h-5 w-5 text-[#21ff72]" aria-hidden="true" />
                    <p className="mt-3 text-xs font-black leading-4 text-white">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="mt-8 max-w-lg text-sm font-semibold leading-6 text-white/82">
              Infraestrutura compartilhada, rastreabilidade administrativa e
              relacionamento com empresas de telecomunica??es.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center pb-6 lg:pb-0">
          <div className="auth-card w-full max-w-[430px] rounded-[22px] border border-white/85 bg-[#ffffff] p-6 text-[#132334] shadow-[0_30px_90px_rgba(0,0,0,0.46)] sm:p-8">
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
