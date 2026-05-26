"use client";

import { FormEvent, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CheckCircle2,
  ChevronDown,
  FileText,
  LockKeyhole,
  Mail,
  MapPinned,
  Phone,
  Search,
  Send,
  UserRound
} from "lucide-react";

import { EDPLogo } from "@/components/brand/EDPLogo";
import { Button } from "@/components/ui/Button";
import { FormMessage } from "@/components/ui/FormMessage";
import { Input, Label, Select } from "@/components/ui/Input";
import { CONTRACTING_COMPANIES } from "@/data/contracting-companies";
import { municipalities } from "@/data/municipalities";
import { cn } from "@/lib/utils";

const OTHER_COMPANY = "OUTRA EMPRESA";

function normalizeForSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();
}

export function RegisterForm() {
  const initialCompany = CONTRACTING_COMPANIES[0] ?? "";
  const [selectedCompany, setSelectedCompany] = useState<string>(initialCompany);
  const [companyQuery, setCompanyQuery] = useState<string>(initialCompany);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const filteredCompanies = useMemo(() => {
    const term = normalizeForSearch(companyQuery);

    if (!term) {
      return CONTRACTING_COMPANIES.slice(0, 24);
    }

    return CONTRACTING_COMPANIES.filter((item) =>
      normalizeForSearch(item).includes(term)
    ).slice(0, 24);
  }, [companyQuery]);

  function selectCompany(companyName: string) {
    setSelectedCompany(companyName);
    setCompanyQuery(companyName);
    setCompanyOpen(false);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const selectedFromList = CONTRACTING_COMPANIES.some(
      (item) => item === selectedCompany
    );
    const otherCompany = String(formData.get("otherCompany") ?? "").trim();
    const companyLegalName =
      selectedCompany === OTHER_COMPANY ? otherCompany : selectedCompany.trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");
    const cnpj = String(formData.get("cnpj") ?? "");
    const cnpjDigits = cnpj.replace(/\D/g, "");

    if (!selectedFromList) {
      setError("Selecione uma empresa da lista ou escolha OUTRA EMPRESA.");
      return;
    }

    if (!companyLegalName) {
      setError("Informe a empresa contratante.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas informadas não conferem.");
      return;
    }

    if (cnpjDigits.length !== 14) {
      setError("Informe um CNPJ válido com 14 dígitos.");
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
            "Não foi possível enviar a solicitação. Tente novamente."
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Não foi possível enviar a solicitação. Tente novamente.");
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
            Solicitação enviada com sucesso
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-[#52616f]">
            O acesso será analisado pela administração do portal. A empresa será
            comunicada quando houver retorno sobre a solicitação.
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
              Enviar outra solicitação
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
            Preencha os dados para análise administrativa do acesso da sua
            empresa.
          </p>
        </div>
        <Link
          href="/auth/login"
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl border border-[#cfdbe5] px-4 text-sm font-bold text-[#243647] transition hover:bg-[#f7fafb]"
        >
          Já tenho acesso
        </Link>
      </div>

      <form className="mt-7 grid gap-5 md:grid-cols-2" onSubmit={onSubmit}>
        <Field icon={UserRound} label="Nome completo" htmlFor="name">
          <Input
            id="name"
            name="name"
            required
            placeholder="Nome e sobrenome"
            className="auth-input h-12 pl-11"
          />
        </Field>

        <Field icon={Mail} label="E-mail corporativo" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="nome@empresa.com"
            className="auth-input h-12 pl-11"
          />
        </Field>

        <Field icon={LockKeyhole} label="Senha" htmlFor="password">
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="auth-input h-12 pl-11"
          />
        </Field>

        <Field icon={LockKeyhole} label="Confirmar senha" htmlFor="confirmPassword">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="auth-input h-12 pl-11"
          />
        </Field>

        <div className="space-y-2">
          <Label htmlFor="companySearch" className="text-[#243647]">
            Empresa contratante
          </Label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[#6e7d8b]"
              aria-hidden="true"
            />
            <input
              id="companySearch"
              type="text"
              value={companyQuery}
              onBlur={() => window.setTimeout(() => setCompanyOpen(false), 120)}
              onChange={(event) => {
                setCompanyQuery(event.target.value);
                setSelectedCompany("");
                setCompanyOpen(true);
              }}
              onFocus={() => setCompanyOpen(true)}
              className="auth-input h-12 w-full rounded-xl border border-graphite-200 bg-white px-11 text-sm text-graphite-900 outline-none transition placeholder:text-graphite-400 focus:border-edp-500 focus:ring-4 focus:ring-edp-100"
              placeholder="Pesquisar empresa contratante"
              role="combobox"
              aria-expanded={companyOpen}
              aria-controls="company-options"
              aria-autocomplete="list"
            />
            <ChevronDown
              className={cn(
                "pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e7d8b] transition",
                companyOpen && "rotate-180"
              )}
              aria-hidden="true"
            />
            {companyOpen ? (
              <div
                id="company-options"
                className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-[#cfdbe5] bg-white p-1 shadow-[0_20px_45px_rgba(19,35,52,0.16)]"
                role="listbox"
              >
                {filteredCompanies.length ? (
                  filteredCompanies.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onMouseDown={(event) => {
                        event.preventDefault();
                        selectCompany(item);
                      }}
                      className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[#243647] transition hover:bg-edp-50 hover:text-edp-800"
                      role="option"
                      aria-selected={selectedCompany === item}
                    >
                      {item}
                    </button>
                  ))
                ) : (
                  <button
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                      selectCompany(OTHER_COMPANY);
                    }}
                    className="block w-full rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#243647] transition hover:bg-edp-50"
                  >
                    Nenhum resultado. Selecionar OUTRA EMPRESA.
                  </button>
                )}
              </div>
            ) : null}
          </div>
          <p className="text-xs font-semibold text-[#6b7b88]">
            Se a empresa não estiver na lista, selecione OUTRA EMPRESA.
          </p>
        </div>

        <Field icon={FileText} label="CNPJ" htmlFor="cnpj">
          <Input
            id="cnpj"
            name="cnpj"
            required
            placeholder="00.000.000/0000-00"
            className="auth-input h-12 pl-11"
          />
        </Field>

        <Field icon={Building2} label="Nome fantasia (opcional)" htmlFor="companyTradeName">
          <Input
            id="companyTradeName"
            name="companyTradeName"
            placeholder="Nome comercial da empresa"
            className="auth-input h-12 pl-11"
          />
        </Field>

        <Field icon={Phone} label="Telefone" htmlFor="phone">
          <Input
            id="phone"
            name="phone"
            required
            placeholder="(00) 00000-0000"
            className="auth-input h-12 pl-11"
          />
        </Field>

        <div className="space-y-2">
          <Label htmlFor="city" className="text-[#243647]">
            Município principal de atuação
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
              className="auth-input h-12 pl-11"
            >
              {municipalities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {selectedCompany === OTHER_COMPANY ? (
          <Field
            icon={Building2}
            label="Informe o nome da empresa"
            htmlFor="otherCompany"
            className="md:col-span-2"
          >
            <Input
              id="otherCompany"
              name="otherCompany"
              placeholder="Razão social da empresa"
              className="auth-input h-12 pl-11"
            />
          </Field>
        ) : null}

        {error ? (
          <div className="md:col-span-2">
            <FormMessage variant="error">{error}</FormMessage>
          </div>
        ) : null}

        <div className="md:col-span-2">
          <Button type="submit" size="lg" disabled={loading}>
            <Send className="h-5 w-5" aria-hidden="true" />
            {loading ? "Enviando solicitação..." : "Enviar solicitação"}
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
  icon: LucideIcon;
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
