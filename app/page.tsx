import Link from "next/link";
import {
  ArrowRight,
  BellDot,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  LockKeyhole,
  MapPinned,
  ShieldCheck
} from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { buttonStyles } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { municipalities } from "@/data/municipalities";

const features = [
  {
    id: "notificacoes",
    title: "Gestao de notificacoes",
    description:
      "Estrutura pronta para receber comunicacoes por API externa, classificar status e direcionar cada notificacao a empresa correta.",
    icon: BellDot
  },
  {
    id: "documentos",
    title: "Documentos e PDFs",
    description:
      "Base preparada para documentos vinculados, armazenamento futuro em blob e rastreabilidade por notificacao.",
    icon: FileText
  },
  {
    id: "empresas",
    title: "Empresas compartilhantes",
    description:
      "Cadastro, vinculo de usuarios, perfis e permissoes modelados para persistencia futura no Neon Database.",
    icon: Building2
  },
  {
    id: "admin",
    title: "Controle administrativo",
    description:
      "Painel executivo com filtros, indicadores, tabelas preparadas e governanca para a operacao de telecom.",
    icon: ClipboardCheck
  },
  {
    id: "seguranca",
    title: "Rastreabilidade de acesso",
    description:
      "Arquitetura preparada para autenticacao real, RBAC, logs de auditoria e historico de eventos.",
    icon: ShieldCheck
  },
  {
    id: "concessao",
    title: "Area de concessao EDP",
    description:
      "Visao institucional dos 28 municipios, sem carregar mapa pesado nesta etapa estrutural.",
    icon: MapPinned
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-graphite-950">
      <PublicHeader />

      <section className="portal-grid relative border-b border-graphite-200">
        <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col justify-center px-4 py-16 md:px-6 lg:py-20">
          <div className="max-w-4xl animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/90 px-3 py-1.5 text-sm font-semibold text-brand-800 shadow-sm">
              <LockKeyhole className="h-4 w-4" aria-hidden="true" />
              Acesso empresarial autorizado
            </div>
            <h1 className="mt-8 max-w-4xl text-4xl font-black tracking-normal text-graphite-950 sm:text-5xl lg:text-6xl">
              Portal Telecom EDP
            </h1>
            <p className="mt-5 max-w-3xl text-xl font-semibold leading-8 text-brand-800 md:text-2xl">
              Gestao centralizada de notificacoes, documentos e relacionamento com empresas compartilhantes.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-7 text-graphite-600 sm:text-lg">
              Uma plataforma digital para organizar comunicacoes, documentos, pendencias, notificacoes e acompanhamento administrativo relacionado as empresas de telecomunicacoes que utilizam infraestrutura compartilhada.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/auth/login" className={buttonStyles("primary", "lg")}>
                Acessar portal
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link href="/auth/register" className={buttonStyles("outline", "lg")}>
                Solicitar acesso
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {[
              ["Origem externa", "Recebimento futuro por API segura"],
              ["Neon Database", "Usuarios, empresas, permissoes e auditoria"],
              ["Vercel", "Estrutura pronta para deploy continuo"]
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-lg border border-white/80 bg-white/85 p-4 shadow-card backdrop-blur"
              >
                <p className="text-sm font-bold text-graphite-950">{title}</p>
                <p className="mt-1 text-sm leading-6 text-graphite-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite-50 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Portal corporativo"
            title="Uma base robusta para a operacao de telecom."
            description="A interface foi desenhada para operar com dados reais quando as integracoes forem ativadas, mantendo clareza, rastreabilidade e governanca desde a primeira versao."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  id={feature.id}
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

      <section id="concessao" className="bg-white px-4 py-16 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <SectionTitle
              eyebrow="Area de concessao"
              title="28 municipios da area de concessao"
              description="Vale do Paraiba, Alto Tiete e Vale Historico. O componente foi mantido leve e preparado para evoluir com Leaflet ou Mapbox."
            />
            <div className="mt-6 rounded-lg border border-brand-100 bg-brand-50 p-5">
              <p className="text-sm font-semibold leading-6 text-brand-900">
                As camadas geograficas reais serao adicionadas em fase posterior, sem comprometer a performance inicial do portal.
              </p>
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {municipalities.map((item) => (
              <div
                key={item}
                className="rounded-md border border-graphite-200 bg-graphite-50 px-3 py-2 text-sm font-semibold text-graphite-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="seguranca" className="bg-graphite-950 px-4 py-16 text-white md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-edp-300">
              Seguranca e rastreabilidade
            </p>
            <h2 className="mt-3 text-3xl font-black">
              Preparado para autenticacao real, auditoria e controle de acesso.
            </h2>
          </div>
          <div className="grid gap-3">
            {[
              "Login real futuro com Neon Database e AUTH_SECRET.",
              "Permissoes ADMIN, EMPRESA e VISUALIZADOR preparadas para RBAC.",
              "Registros de auditoria e logs de integracao planejados desde a arquitetura."
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg bg-white/10 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-edp-300" aria-hidden="true" />
                <p className="leading-6 text-white/78">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-graphite-200 bg-white px-4 py-8 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-graphite-500 md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-graphite-700">Portal Telecom EDP</p>
          <p>Estrutura visual e navegacao preparadas para integracoes futuras.</p>
        </div>
      </footer>
    </main>
  );
}
