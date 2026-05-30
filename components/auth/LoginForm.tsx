"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail
} from "lucide-react";
import { EDPLogo } from "@/components/brand/EDPLogo";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import { mockLogin } from "@/lib/auth-mock";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberAccess, setRememberAccess] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const submittedEmail = String(formData.get("email") ?? email);
    const submittedPassword = String(formData.get("password") ?? password);

    // Mock temporário para navegação local. Futuramente será substituído pela autenticação real do portal.
    const session = await mockLogin(submittedEmail, submittedPassword);
    setLoading(false);

    if (!session) {
      setError("Não foi possível validar as credenciais informadas.");
      return;
    }

    const serializedSession = JSON.stringify(session.user);
    window.localStorage.setItem("portalTelecomSession", serializedSession);
    document.cookie = `portalTelecomSession=${encodeURIComponent(
      serializedSession
    )}; path=/; SameSite=Lax; max-age=${rememberAccess ? 60 * 60 * 24 * 7 : 60 * 60 * 8}`;
    router.push(session.redirectTo);
  }

  return (
    <div className="text-[#132334]">
      <div className="flex justify-center">
        <Link
          href="/auth/login"
          className="inline-flex rounded-xl bg-[#ffffff] p-1 shadow-[0_12px_30px_rgba(19,35,52,0.11)] ring-1 ring-[#dfe8ed]"
          aria-label="Portal Telecom EDP"
        >
          <EDPLogo compact />
        </Link>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#127a45]">
          Portal Telecom EDP
        </p>
        <h2 className="mt-3 text-2xl font-black leading-tight text-[#132334] sm:text-3xl">
          Acesse sua conta
        </h2>
        <p className="mx-auto mt-3 max-w-[330px] text-sm font-semibold leading-6 text-[#52616f]">
          Use suas credenciais corporativas para acessar notificações, documentos
          e comunicações oficiais.
        </p>
      </div>

      <form className="mt-7 space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-black text-[#243647]">
            E-mail corporativo
          </Label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e7d8b]"
              aria-hidden="true"
            />
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="auth-input h-12 rounded-lg border-[#d8e2e8] bg-[#fbfdfe] pl-11 text-sm font-semibold"
              autoComplete="email"
              placeholder="nome@empresa.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-xs font-black text-[#243647]">
            Senha
          </Label>
          <div className="relative">
            <LockKeyhole
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e7d8b]"
              aria-hidden="true"
            />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="auth-input h-12 rounded-lg border-[#d8e2e8] bg-[#fbfdfe] pl-11 pr-11 text-sm font-semibold"
              autoComplete="current-password"
              placeholder="Informe sua senha"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6e7d8b] transition hover:text-[#132334]"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-xs font-bold text-[#52616f]">
            <input
              type="checkbox"
              checked={rememberAccess}
              onChange={(event) => setRememberAccess(event.target.checked)}
              className="h-4 w-4 rounded border-[#c7d2dc] text-[#127a45] focus:ring-[#21ff72]"
            />
            Lembrar acesso
          </label>
          <button
            type="button"
            onClick={() => {
              setError("");
              setNotice("Funcionalidade em preparação.");
            }}
            className="text-right text-xs font-black text-[#132334] transition hover:text-[#127a45]"
          >
            Esqueci minha senha
          </button>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        ) : null}

        {notice ? (
          <div className="flex items-start gap-3 rounded-xl border border-[#d7eee2] bg-[#f4fbf7] px-4 py-3 text-sm font-semibold text-[#127a45]">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {notice}
          </div>
        ) : null}

        <Button
          type="submit"
          className="mt-2 h-12 w-full rounded-lg bg-[#21ff72] text-sm font-black text-[#102233] shadow-[0_18px_34px_rgba(33,255,114,0.26)] hover:bg-[#16e766]"
          size="lg"
          disabled={loading}
        >
          {loading ? "Validando acesso..." : "Entrar no portal"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </form>

      <div className="mt-7 text-center">
        <p className="text-xs font-semibold text-[#6b7784]">
          Ainda não possui acesso?{" "}
          <Link
            href="/auth/register"
            className="font-black text-[#127a45] transition hover:text-[#0d5d35]"
          >
            Solicitar cadastro
          </Link>
        </p>
      </div>

      <p className="mt-6 border-t border-[#e5edf2] pt-5 text-center text-[11px] font-bold uppercase tracking-wide text-[#8a96a3]">
        Acesso monitorado para segurança e rastreabilidade.
      </p>
    </div>
  );
}
