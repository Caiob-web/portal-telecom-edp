import Link from "next/link";
import {
  BellDot,
  FileStack,
  LockKeyhole,
  MapPinned,
  Network,
  ShieldCheck
} from "lucide-react";
import { EDPLogo } from "@/components/brand/EDPLogo";
import { cn } from "@/lib/utils";

const highlights = [
  { label: "Notificações oficiais", icon: BellDot },
  { label: "Documentos centralizados", icon: FileStack },
  { label: "Rastreabilidade de acesso", icon: ShieldCheck },
  { label: "Área de concessão EDP", icon: MapPinned }
];

export function AuthVisualPanel({
  compact = false
}: {
  compact?: boolean;
}) {
  return (
    <aside
      className={cn(
        "auth-visual-panel relative overflow-hidden rounded-[28px] border border-white/10 p-6 text-white shadow-panel sm:p-8",
        compact ? "lg:min-h-[760px]" : "lg:min-h-[calc(100vh-48px)]"
      )}
    >
      <div className="auth-network-lines" aria-hidden="true">
        <span className="auth-node auth-node-one" />
        <span className="auth-node auth-node-two" />
        <span className="auth-node auth-node-three" />
        <span className="auth-node auth-node-four" />
      </div>

      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" aria-label="Portal Telecom EDP">
          <EDPLogo showPortalName inverted compact />
        </Link>
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-edp-300/70 bg-edp-300/10 px-4 py-2 text-sm font-bold text-edp-300 shadow-[0_0_30px_rgba(33,255,114,0.16)] backdrop-blur">
          <LockKeyhole className="h-4 w-4" aria-hidden="true" />
          Acesso restrito a empresas autorizadas
        </div>
      </div>

      <div className="relative z-10 mt-16 max-w-3xl lg:mt-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white/70 backdrop-blur">
          <Network className="h-4 w-4 text-edp-300" aria-hidden="true" />
          Infraestrutura compartilhada de energia e telecom
        </div>
        <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.02] tracking-normal text-white sm:text-5xl xl:text-6xl">
          Portal Telecom EDP
        </h1>
        <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-edp-300 sm:text-xl">
          Acesso restrito para empresas compartilhantes autorizadas.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/68">
          Ambiente corporativo para organizar notificações oficiais, documentos,
          acompanhamento administrativo e rastreabilidade de processos
          relacionados a ocupações em postes.
        </p>
      </div>

      <div className="relative z-10 mt-12 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="auth-floating-card rounded-xl border border-white/12 bg-white/[0.075] p-4 backdrop-blur"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-edp-300/45 bg-edp-300/10 text-edp-300">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-4 text-sm font-bold leading-5 text-white">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 mt-12 grid gap-3 sm:grid-cols-3">
        {[
          ["Concessão EDP", "área protegida"],
          ["Comunicações", "notificações oficiais"],
          ["Controle", "histórico previsto"]
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-white/10 bg-[#132334]/50 p-4 backdrop-blur"
          >
            <p className="text-sm font-black text-edp-300">{label}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/55">
              {value}
            </p>
          </div>
        ))}
      </div>

      <p className="relative z-10 mt-12 text-xs font-semibold uppercase tracking-wide text-white/45">
        Portal Telecom EDP - Ambiente empresarial
      </p>
    </aside>
  );
}
