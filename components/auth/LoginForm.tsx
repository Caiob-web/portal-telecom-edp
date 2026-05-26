"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShieldCheck
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

    window.localStorage.setItem("portalTelecomSession", JSON.stringify(session.user));
    router.push(session.redirectTo);
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <Link href="/" className="inline-flex" aria-label="Portal Telecom EDP">
          <EDPLogo showPortalName compact />
        </Link>
        <div className="hidden rounded-full bg-[#eef8f3] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#127a45] sm:inline-flex">
          Acesso monitorado
        </div>
      </div>

      <div className="mt-9">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d7eee2] bg-[#f4fbf7] px-3 py-1.5 text-sm font-bold text-[#127a45]">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Ambiente empresarial
        </div>
        <h2 className="mt-5 text-3xl font-black leading-tight text-[#132334] sm:text-4xl">
          Acesse sua conta
        </h2>
        <p className="mt-3 text-base leading-7 text-[#52616f]">
          Portal exclusivo para empresas autorizadas acompanharem notificações, documentos e comunicações oficiais.
        </p>
        <p className="mt-2 text-sm font-semibold text-[#74818e]">
          Use suas credenciais corporativas para continuar.
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#243647]">
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
              className="auth-input h-12 rounded-xl pl-11"
              autoComplete="email"
              placeholder="nome@empresa.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-[#243647]">
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
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="auth-input h-12 rounded-xl pl-11"
              autoComplete="current-password"
              placeholder="Informe sua senha"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-2 text-sm font-semibold text-[#52616f]">
            <input
              type="checkbox"
              checked={rememberAccess}
              onChange={(event) => setRememberAccess(event.target.checked)}
              className="h-4 w-4 rounded border-[#c7d2dc] text-[#21ff72] focus:ring-[#21ff72]"
            />
            Lembrar acesso
          </label>
          <button
            type="button"
            onClick={() => {
              setError("");
              setNotice("Funcionalidade em preparacao.");
            }}
            className="text-left text-sm font-bold text-[#127a45] transition hover:text-[#0d5d35] sm:text-right"
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
          className="h-12 w-full rounded-xl bg-[#21ff72] text-base font-black text-[#102233] shadow-[0_18px_36px_rgba(33,255,114,0.28)] hover:bg-[#12df5f]"
          size="lg"
          disabled={loading}
        >
          {loading ? "Validando acesso..." : "Entrar no portal"}
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Button>
      </form>

      <div className="mt-8 rounded-2xl border border-[#e3eaf0] bg-[#f7fafb] p-4 text-center">
        <p className="text-sm font-semibold text-[#52616f]">
          Ainda não possui acesso?{" "}
          <Link href="/auth/register" className="font-black text-[#127a45] hover:text-[#0d5d35]">
            Solicitar cadastro
          </Link>
        </p>
      </div>

      <p className="mt-5 text-center text-xs font-semibold uppercase tracking-wide text-[#8a96a3]">
        Ambiente exclusivo para empresas compartilhantes autorizadas.
      </p>
    </div>
  );
}
