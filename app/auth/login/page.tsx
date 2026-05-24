"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { EDPLogo } from "@/components/brand/EDPLogo";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import { mockLogin } from "@/lib/auth-mock";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const submittedEmail = String(formData.get("email") ?? email);
    const submittedPassword = String(formData.get("password") ?? password);

    // Mock temporario: substituir por autenticacao real com Neon Database.
    const session = await mockLogin(submittedEmail, submittedPassword);
    setLoading(false);

    if (!session) {
      setError("Credenciais invalidas para o ambiente de navegacao atual.");
      return;
    }

    window.localStorage.setItem("portalTelecomSession", JSON.stringify(session.user));
    router.push(session.redirectTo);
  }

  return (
    <main className="portal-grid flex min-h-screen items-center justify-center bg-graphite-50 px-4 py-10">
      <section className="grid w-full max-w-6xl overflow-hidden rounded-lg border border-brand-200 bg-white shadow-panel lg:min-h-[620px] lg:grid-cols-[0.86fr_1.14fr]">
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <Link href="/" className="inline-flex">
            <EDPLogo showPortalName />
          </Link>
          <h2 className="mt-8 text-3xl font-black text-graphite-950">
            Entrar no portal
          </h2>
          <p className="mt-2 text-graphite-600">
            Acesso exclusivo para empresas autorizadas.
          </p>

          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-400"
                  aria-hidden="true"
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="pl-9"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <LockKeyhole
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-400"
                  aria-hidden="true"
                />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="pl-9"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            {error ? (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            ) : null}

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Validando..." : "Entrar"}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </form>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/auth/register" className={buttonStyles("outline", "md")}>
              Criar conta
            </Link>
            <button className="text-sm font-semibold text-brand-700 hover:text-brand-900">
              Esqueci minha senha
            </button>
          </div>
        </div>

        <div className="login-energy-visual relative hidden p-8 text-white lg:block">
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex justify-end">
              <div className="rounded-full border border-brand-200 bg-[#1f2e3e]/70 px-4 py-2 text-sm font-semibold text-white/78 backdrop-blur">
                Ambiente corporativo EDP
              </div>
            </div>
            <div className="max-w-lg">
              <h1 className="text-4xl font-black leading-tight">Portal Telecom EDP</h1>
              <p className="mt-4 leading-7 text-white/74">
                Acesso exclusivo para empresas autorizadas e administradores do portal.
              </p>
              <div className="mt-6 rounded-lg border border-white/15 bg-[#1f2e3e]/70 p-4 backdrop-blur">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-edp-300" aria-hidden="true" />
                  <p className="text-sm leading-6 text-white/75">
                    A autenticacao definitiva sera conectada ao Neon Database em fase posterior, com controle de sessao e permissoes reais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
