"use client";

import { FormEvent, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  FileText,
  LockKeyhole,
  Mail,
  MapPinned,
  Phone,
  Send,
  UserRound
} from "lucide-react";
import { EDPLogo } from "@/components/brand/EDPLogo";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select } from "@/components/ui/Input";
import { registrationCompanies } from "@/data/mock-companies";
import { municipalities } from "@/data/municipalities";

export function RegisterForm() {
  const [company, setCompany] = useState(registrationCompanies[0]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const selectedCompany = String(formData.get("company") ?? "");
    const otherCompany = String(formData.get("otherCompany") ?? "").trim();
    const companyLegalName =
      selectedCompany === "OUTRA EMPRESA" ? otherCompany : selectedCompany;
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");
    const cnpj = String(formData.get("cnpj") ?? "");
    const cnpjDigits = cnpj.replace(/\D/g, "");

    if (!companyLegalName) {
      setError("Informe a empresa contratante.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter no minimo 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas informadas nao conferem.");
      return;
    }

    if (cnpjDigits.length !== 14) {
      setError("Informe um CNPJ valido com 14 digitos.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          password,
          confirmPassword,
          companyLegalName,
          companyTradeName: String(formData.get("companyTradeName") ?? ""),
          cnpj,
          phone: String(formData.get("phone") ?? ""),
          mainCity: String(formData.get("city") ?? ""),
          companyType: "TELECOM"
        })
      });

      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        setError(
          data?.message ??
            "Nao foi possivel enviar a solicitacao. Tente novamente."
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Nao foi possivel enviar a solicitacao. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div>
        <Link href="/" className="inline-flex" aria-label="Portal Telecom EDP">
          <EDPLogo showPortalName compact />
        </Link>
        <div className="mt-10 rounded-3xl border border-[#d7eee2] bg-[#f4fbf7] p-6 sm:p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#21ff72] text-[#102233] shadow-[0_16px_34px_rgba(33,255,114,0.28)]">
            <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-3xl font-black leading-tight text-[#132334]">
            Solicitacao enviada com sucesso
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-[#52616f]">
            O acesso sera analisado pela administracao do portal. A empresa sera comunicada quando houver retorno sobre a solicitacao.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/auth/login"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#21ff72] px-5 text-sm font-black text-[#102233] transition hover:bg-[#12df5f]"
            >
              Voltar ao login
            </Link>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#cfdbe5] px-5 text-sm font-bold text-[#243647] transition hover:bg-white"
            >
              Enviar outra solicitacao
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-[#e3eaf0] pb-6 md:flex-row md:items-start md:justify-between">
        <div>
          <Link href="/" className="inline-flex" aria-label="Portal Telecom EDP">
            <EDPLogo showPortalName compact />
          </Link>
          <h1 className="mt-7 text-3xl font-black leading-tight text-[#132334] sm:text-4xl">
            Solicitar acesso ao Portal Telecom EDP
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#52616f]">
            Preencha os dados para analise administrativa do acesso da sua empresa.
          </p>
        </div>
        <Link
          href="/auth/login"
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl border border-[#cfdbe5] px-4 text-sm font-bold text-[#243647] transition hover:bg-[#f7fafb]"
        >
          Ja tenho acesso
        </Link>
      </div>

      <form className="mt-7 grid gap-5 md:grid-cols-2" onSubmit={onSubmit}>
        <Field icon={UserRound} label="Nome completo" htmlFor="name">
          <Input
            id="name"
            name="name"
            required
            placeholder="Nome e sobrenome"
            className="auth-input h-12 rounded-xl pl-11"
          />
        </Field>

        <Field icon={Mail} label="E-mail corporativo" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="nome@empresa.com"
            className="auth-input h-12 rounded-xl pl-11"
          />
        </Field>

        <Field icon={LockKeyhole} label="Senha" htmlFor="password">
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="auth-input h-12 rounded-xl pl-11"
          />
        </Field>

        <Field icon={LockKeyhole} label="Confirmar senha" htmlFor="confirmPassword">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="auth-input h-12 rounded-xl pl-11"
          />
        </Field>

        <div className="space-y-2">
          <Label htmlFor="company" className="text-[#243647]">
            Empresa contratante
          </Label>
          <div className="relative">
            <Building2
              className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[#6e7d8b]"
              aria-hidden="true"
            />
            <Select
              id="company"
              name="company"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              className="auth-input h-12 rounded-xl pl-11"
            >
              {registrationCompanies.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <Field icon={FileText} label="CNPJ" htmlFor="cnpj">
          <Input
            id="cnpj"
            name="cnpj"
            required
            placeholder="00.000.000/0000-00"
            className="auth-input h-12 rounded-xl pl-11"
          />
        </Field>

        <Field icon={Building2} label="Nome fantasia (opcional)" htmlFor="companyTradeName">
          <Input
            id="companyTradeName"
            name="companyTradeName"
            placeholder="Nome comercial da empresa"
            className="auth-input h-12 rounded-xl pl-11"
          />
        </Field>

        <Field icon={Phone} label="Telefone" htmlFor="phone">
          <Input
            id="phone"
            name="phone"
            required
            placeholder="(00) 00000-0000"
            className="auth-input h-12 rounded-xl pl-11"
          />
        </Field>

        <div className="space-y-2">
          <Label htmlFor="city" className="text-[#243647]">
            Municipio principal de atuacao
          </Label>
          <div className="relative">
            <MapPinned
              className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[#6e7d8b]"
              aria-hidden="true"
            />
            <Select
              id="city"
              name="city"
              defaultValue="SAO JOSE DOS CAMPOS"
              className="auth-input h-12 rounded-xl pl-11"
            >
              {municipalities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {company === "OUTRA EMPRESA" ? (
          <Field
            icon={Building2}
            label="Informe a empresa"
            htmlFor="otherCompany"
            className="md:col-span-2"
          >
            <Input
              id="otherCompany"
              name="otherCompany"
              placeholder="Razao social da empresa"
              className="auth-input h-12 rounded-xl pl-11"
            />
          </Field>
        ) : null}

        {error ? (
          <div className="md:col-span-2">
            <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <p>{error}</p>
            </div>
          </div>
        ) : null}

        <div className="md:col-span-2">
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="h-12 rounded-xl bg-[#21ff72] px-6 text-base font-black text-[#102233] shadow-[0_18px_36px_rgba(33,255,114,0.28)] hover:bg-[#12df5f]"
          >
            <Send className="h-5 w-5" aria-hidden="true" />
            {loading ? "Enviando solicitacao..." : "Enviar solicitacao"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  htmlFor,
  children,
  className
}: {
  icon: typeof UserRound;
  label: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="space-y-2">
        <Label htmlFor={htmlFor} className="text-[#243647]">
          {label}
        </Label>
        <div className="relative">
          <Icon
            className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[#6e7d8b]"
            aria-hidden="true"
          />
          {children}
        </div>
      </div>
    </div>
  );
}
