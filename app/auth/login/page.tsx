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

const highlights = [
  { label: "Acesso seguro", icon: ShieldCheck },
  { label: "Documentos", icon: FileCheck2 },
  { label: "Empresas", icon: Building2 },
  { label: "Telecom", icon: Network }
];

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#111a20] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center lg:right-[36%]"
        style={{ backgroundImage: "url('/auth-powerlines-sunset.png')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,16,21,0.36)_0%,rgba(12,20,25,0.28)_38%,rgba(14,29,30,0.72)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 hidden w-[58%] bg-[linear-gradient(135deg,#17262d_0%,#101b20_42%,#0d171b_100%)] shadow-[0_0_90px_rgba(0,0,0,0.38)] lg:block"
        style={{ clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 hidden w-[58%] bg-[radial-gradient(circle_at_74%_18%,rgba(33,255,114,0.13),transparent_28%),radial-gradient(circle_at_36%_72%,rgba(19,116,93,0.18),transparent_32%)] lg:block"
        style={{ clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0b1317]/80 to-transparent"
        aria-hidden="true"
      />

      <section className="relative z-10 grid min-h-screen grid-rows-[auto_1fr] px-5 py-5 sm:px-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] lg:grid-rows-1 lg:px-12 lg:py-9 xl:px-16">
        <div className="flex min-h-[48vh] flex-col justify-between pb-8 lg:min-h-0 lg:pb-0 lg:pr-10">
          <header className="flex items-center justify-between gap-4">
            <Link
              href="/auth/login"
              className="inline-flex rounded-2xl border border-white/24 bg-white/8 px-3 py-2 shadow-[0_18px_48px_rgba(0,0,0,0.24)] backdrop-blur-md transition hover:bg-white/12"
              aria-label="Portal Telecom EDP"
            >
              <EDPLogo showPortalName inverted compact monochrome />
            </Link>
          </header>

          <div className="max-w-[660px] pb-2 pt-16 sm:pt-24 lg:pb-14 lg:pt-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/22 bg-[#173126]/48 px-4 py-2 text-xs font-black uppercase tracking-wide text-white/92 shadow-[0_16px_46px_rgba(0,0,0,0.22)] backdrop-blur-md">
              <LockKeyhole className="h-4 w-4 text-[#21ff72]" aria-hidden="true" />
              Empresas compartilhantes autorizadas
            </div>

            <h1 className="mt-7 max-w-[620px] text-[clamp(2.65rem,5.5vw,5.25rem)] font-black leading-[0.96] tracking-normal text-white drop-shadow-[0_16px_44px_rgba(0,0,0,0.42)]">
              Portal Telecom EDP
            </h1>
            <p className="mt-6 max-w-xl text-lg font-black leading-8 text-[#42ff88] drop-shadow-[0_10px_34px_rgba(0,0,0,0.42)] sm:text-2xl">
              Gest?o de notifica??es, documentos e comunica??es oficiais em um
              ambiente empresarial seguro.
            </p>

            <div className="mt-8 grid max-w-[560px] grid-cols-2 gap-3 sm:grid-cols-4">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/30 bg-white/10 p-3 shadow-[0_16px_36px_rgba(0,0,0,0.2)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/14"
                  >
                    <Icon className="h-5 w-5 text-[#21ff72]" aria-hidden="true" />
                    <p className="mt-3 text-xs font-black leading-4 text-white">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="mt-8 max-w-xl text-sm font-semibold leading-6 text-white/84">
              Infraestrutura compartilhada, rastreabilidade administrativa e
              relacionamento com empresas de telecomunica??es em uma experi?ncia
              corporativa controlada.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center pb-6 lg:justify-end lg:pb-0">
          <div className="auth-card w-full max-w-[430px] rounded-[24px] border border-white/90 bg-white p-6 text-[#132334] shadow-[0_34px_110px_rgba(0,0,0,0.36)] sm:p-8">
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
