"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Send } from "lucide-react";
import { EDPLogo } from "@/components/brand/EDPLogo";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Input, Label, Select } from "@/components/ui/Input";
import { registrationCompanies } from "@/data/mock-companies";
import { municipalities } from "@/data/municipalities";

export default function RegisterPage() {
  const [company, setCompany] = useState(registrationCompanies[0]);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-graphite-50 px-4 py-8">
      <section className="mx-auto max-w-5xl rounded-lg border border-graphite-200 bg-white p-6 shadow-panel sm:p-8">
        <div className="flex flex-col gap-4 border-b border-graphite-200 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="inline-flex">
              <EDPLogo showPortalName />
            </Link>
            <h1 className="mt-6 text-3xl font-black text-graphite-950">
              Solicitar acesso
            </h1>
            <p className="mt-2 max-w-2xl text-graphite-600">
              Preencha os dados para analise administrativa. O fluxo ainda nao salva informacoes no Neon, mas ja esta preparado para validacao, vinculo de empresa e status de aprovacao.
            </p>
          </div>
          <Link href="/auth/login" className={buttonStyles("outline")}>
            Ja tenho acesso
          </Link>
        </div>

        {submitted ? (
          <div className="mt-8 rounded-lg border border-edp-200 bg-edp-50 p-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-7 w-7 shrink-0 text-edp-700" aria-hidden="true" />
              <div>
                <h2 className="text-xl font-bold text-edp-900">
                  Solicitacao enviada com sucesso
                </h2>
                <p className="mt-2 text-edp-800">
                  Solicitacao enviada com sucesso. O acesso sera analisado pela administracao do portal.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" required placeholder="Nome e sobrenome" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail corporativo</Label>
              <Input id="email" type="email" required placeholder="nome@empresa.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input id="confirmPassword" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Empresa contratante</Label>
              <Select
                id="company"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
              >
                {registrationCompanies.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input id="cnpj" required placeholder="00.000.000/0000-00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" required placeholder="(00) 00000-0000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Municipio principal de atuacao</Label>
              <Select id="city" defaultValue="SAO JOSE DOS CAMPOS">
                {municipalities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>
            {company === "OUTRA EMPRESA" ? (
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="otherCompany">Informe a empresa</Label>
                <Input id="otherCompany" placeholder="Razao social da empresa" />
              </div>
            ) : null}
            <div className="md:col-span-2">
              <Button type="submit" size="lg">
                <Send className="h-5 w-5" aria-hidden="true" />
                Enviar solicitacao
              </Button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
