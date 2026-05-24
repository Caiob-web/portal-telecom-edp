import Link from "next/link";
import {
  ArrowRight,
  BellDot,
  Building2,
  CheckCircle2,
  FileText,
  LockKeyhole,
  MapPinned,
  Network,
  ShieldCheck
} from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const features = [
  {
    title: "Gestao de Notificacoes",
    description:
      "Centralize recebimento, acompanhamento, status e respostas administrativas.",
    icon: BellDot
  },
  {
    title: "Empresas Compartilhantes",
    description:
      "Organize empresas, usuarios, contratos e pendencias com visao operacional.",
    icon: Building2
  },
  {
    title: "Documentos e PDFs",
    description:
      "Estrutura preparada para anexos, PDFs, Vercel Blob e metadados no Neon.",
    icon: FileText
  },
  {
    title: "Acompanhamento Administrativo",
    description:
      "Indicadores, filtros, tabelas e historico para decisao rapida e auditavel.",
    icon: CheckCircle2
  },
  {
    title: "Mapa da Area de Concessao",
    description:
      "Componente leve para evoluir com Leaflet ou Mapbox sem travar a primeira versao.",
    icon: MapPinned
  },
  {
    title: "Seguranca e rastreabilidade",
    description:
      "Base preparada para RBAC, auditoria, autenticacao real e variaveis de ambiente.",
    icon: ShieldCheck
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-graphite-950">
      <section className="portal-grid relative border-b border-graphite-200">
        <div className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-12 px-4 py-8 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-12">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3 py-1.5 text-sm font-semibold text-brand-800 shadow-sm">
              <LockKeyhole className="h-4 w-4" aria-hidden="true" />
              Ambiente estrutural pronto para Base44 e Neon
            </div>
            <h1 className="mt-7 max-w-3xl text-4xl font-black tracking-normal text-graphite-950 sm:text-5xl lg:text-6xl">
              Portal Telecom EDP
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-semibold leading-8 text-brand-800">
              Gestao inteligente de notificacoes, empresas compartilhantes e
              ocupacoes em postes.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-graphite-600 sm:text-lg">
              Portal desenvolvido para centralizar informacoes, documentos,
              notificacoes, acompanhamento de empresas e gestao operacional da
              area de telecom.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/auth/login" className={buttonStyles("primary", "lg")}>
                Acessar Portal
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link href="/auth/register" className={buttonStyles("outline", "lg")}>
                Solicitar Acesso
              </Link>
            </div>
          </div>

          <div className="hero-panel relative animate-fade-up rounded-lg border border-white/80 p-4 shadow-panel lg:p-5">
            <div className="rounded-lg border border-graphite-200 bg-white p-4 shadow-card">
              <div className="flex items-center justify-between border-b border-graphite-100 pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-edp-700">
                    Painel operacional
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-graphite-950">
                    Area de concessao monitorada
                  </h2>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-700 text-white">
                  <Network className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ["114", "notificacoes"],
                  ["68", "documentos"],
                  ["28", "municipios"]
                ].map(([value, label]) => (
                  <div key={label} className="rounded-md bg-graphite-50 p-4">
                    <p className="text-2xl font-black text-graphite-950">{value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-graphite-500">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-lg bg-graphite-950 p-4 text-white">
                <div className="grid gap-3">
                  {[
                    ["Base44", "Aguardando configuracao", "bg-amber-400"],
                    ["Neon", "Preparado para DATABASE_URL", "bg-brand-300"],
                    ["Vercel", "Deploy-ready", "bg-edp-300"]
                  ].map(([label, value, dot]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 rounded-md bg-white/10 px-3 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
                        <span className="font-semibold">{label}</span>
                      </div>
                      <span className="text-sm text-white/70">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-graphite-50 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wide text-brand-700">
              Primeira versao estrutural
            </p>
            <h2 className="mt-3 text-3xl font-black text-graphite-950">
              Fundacao robusta para evoluir o portal com integracoes reais.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="p-6 transition duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-panel"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-graphite-950">
                    {feature.title}
                  </h3>
                  <p className="mt-3 leading-6 text-graphite-600">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
