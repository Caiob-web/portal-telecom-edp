"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, LockKeyhole, Mail } from "lucide-react";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import { mockLogin } from "@/lib/auth-mock";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@edp.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const submittedEmail = String(formData.get("email") ?? email);
    const submittedPassword = String(formData.get("password") ?? password);
    const session = await mockLogin(submittedEmail, submittedPassword);
    setLoading(false);

    if (!session) {
      setError("Credenciais mockadas invalidas. Tente admin@edp.com/admin123.");
      return;
    }

    window.localStorage.setItem("portalTelecomSession", JSON.stringify(session.user));
    router.push(session.redirectTo);
  }

  return (
    <main className="portal-grid flex min-h-screen items-center justify-center bg-graphite-50 px-4 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-graphite-200 bg-white shadow-panel lg:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden bg-graphite-950 p-8 text-white lg:block">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-edp-500">
                <Building2 className="h-7 w-7" aria-hidden="true" />
              </div>
              <h1 className="mt-8 text-3xl font-black">Portal Telecom EDP</h1>
              <p className="mt-4 leading-7 text-white/70">
                Acesso operacional para administradores e empresas
                compartilhantes. Esta etapa usa login mockado e esta pronta para
                evoluir com Neon Database.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/10 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">
                Acessos de teste
              </p>
              <p className="mt-3 font-mono text-sm text-white/80">
                admin@edp.com / admin123
              </p>
              <p className="mt-2 font-mono text-sm text-white/80">
                empresa@teste.com / empresa123
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <Link href="/" className="text-sm font-semibold text-brand-700 hover:text-brand-900">
            Portal Telecom EDP
          </Link>
          <h2 className="mt-6 text-3xl font-black text-graphite-950">
            Entrar no portal
          </h2>
          <p className="mt-2 text-graphite-600">
            Use as credenciais mockadas para navegar pela area administrativa ou
            dashboard da empresa.
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
      </section>
    </main>
  );
}
