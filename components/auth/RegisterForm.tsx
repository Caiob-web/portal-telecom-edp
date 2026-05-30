"use client";

import { FormEvent, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Check,
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
import { Input, Label } from "@/components/ui/Input";
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

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function formatCnpj(value: string) {
  const digits = onlyDigits(value).slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function formatPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export function RegisterForm() {
  const initialCompany = CONTRACTING_COMPANIES[0] ?? "";
  const [selectedCompany, setSelectedCompany] = useState<string>(initialCompany);
  const [companyQuery, setCompanyQuery] = useState<string>(initialCompany);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([
    "SAO JOSE DOS CAMPOS"
  ]);
  const [cnpj, setCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const filteredCompanies = useMemo(() => {
    const term = normalizeForSearch(companyQuery);

    if (!term) {
      return CONTRACTING_COMPANIES.slice(0, 28);
    }

    return CONTRACTING_COMPANIES.filter((item) =>
      normalizeForSearch(item).includes(term)
    ).slice(0, 28);
  }, [companyQuery]);

  function selectCompany(companyName: string) {
    setSelectedCompany(companyName);
    setCompanyQuery(companyName);
    setCompanyOpen(false);
  }

  function toggleCity(city: string) {
    setSelectedCities((current) =>
      current.includes(city)
        ? current.filter((item) => item !== city)
        : [...current, city]
    );
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
    const cnpjDigits = onlyDigits(cnpj);

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

    if (!selectedCities.length) {
      setError("Selecione ao menos um município de atuação.");
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
          phone,
          mainCity: selectedCities.join(", "),
          operatingCities: selectedCities,
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
        <Link href="/auth/login" className="inline-flex" aria-label="Portal Telecom EDP">
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
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#cfdbe5] px-5 text-sm font-bold text-[#243647] transition hover:bg-[#ffffff]"
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
          <Link href="/auth/login" className="inline-flex" aria-label="Portal Telecom EDP">
            <EDPLogo showPortalName compact />
          </Link>
          <h1 className="mt-7 text-3xl font-black leading-tight text-[#132334] sm:text-4xl">
            Solicitar acesso ao Portal Telecom EDP
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#52616f]">
            Preencha os dados para análise administrativa do acesso da sua empresa.
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
              className="auth-input h-12 w-full rounded-xl border border-[#cfdbe5] bg-[#fbfdfe] px-11 text-sm font-semibold text-[#132334] outline-none transition placeholder:text-[#8a96a3] focus:border-[#21c866] focus:ring-4 focus:ring-[#dffbea]"
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
                className="absolute z-40 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-[#cfdbe5] bg-[#ffffff] p-1 shadow-[0_20px_45px_rgba(19,35,52,0.16)]"
                role="listbox"
                style={{ backgroundColor: "#ffffff", color: "#243647" }}
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
                      className={cn(
                        "block w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[#243647] transition hover:bg-[#e9fff2] hover:text-[#0d5d35]",
                        selectedCompany === item && "bg-[#dffbea] text-[#0d5d35]"
                      )}
                      role="option"
                      aria-selected={selectedCompany === item}
                      style={{ color: "#243647" }}
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
                    className="block w-full rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#243647] transition hover:bg-[#e9fff2]"
                  >
                    Nenhum resultado. Selecionar OUTRA EMPRESA.
                  </button>
                )}
              </div>
            ) : null}
          </div>
          <p className="text-xs font-semibold text-[#6b7b88]">
            Pesquise pelo nome da empresa contratante. Se ela não estiver na lista,
            selecione OUTRA EMPRESA.
          </p>
        </div>

        <Field icon={FileText} label="CNPJ" htmlFor="cnpj">
          <Input
            id="cnpj"
            name="cnpj"
            required
            value={cnpj}
            onChange={(event) => setCnpj(formatCnpj(event.target.value))}
            inputMode="numeric"
            maxLength={18}
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
            value={phone}
            onChange={(event) => setPhone(formatPhone(event.target.value))}
            inputMode="tel"
            placeholder="(00) 00000-0000"
            className="auth-input h-12 pl-11"
          />
        </Field>

        <div className="space-y-3 md:col-span-2">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Label className="text-[#243647]">
                Municípios de atuação
              </Label>
              <p className="mt-1 text-xs font-semibold text-[#6b7b88]">
                Selecione as cidades onde a empresa atua. As notificações futuras
                serão vinculadas por município e rua.
              </p>
            </div>
            <span className="text-xs font-black uppercase tracking-wide text-[#127a45]">
              {selectedCities.length} selecionado(s)
            </span>
          </div>

          <div className="max-h-64 overflow-y-auto rounded-2xl border border-[#cfdbe5] bg-[#fbfdfe] p-3 shadow-inner">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {municipalities.map((city) => {
                const checked = selectedCities.includes(city);

                return (
                  <label
                    key={city}
                    className={cn(
                      "flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs font-black transition",
                      checked
                        ? "border-[#21c866] bg-[#e9fff2] text-[#0d5d35]"
                        : "border-[#d8e2e8] bg-[#ffffff] text-[#324555] hover:border-[#21c866] hover:bg-[#f4fbf7]"
                    )}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggleCity(city)}
                    />
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                        checked
                          ? "border-[#127a45] bg-[#21ff72] text-[#102233]"
                          : "border-[#b9c7d2] bg-[#ffffff]"
                      )}
                    >
                      {checked ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                    </span>
                    {city}
                  </label>
                );
              })}
            </div>
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
