import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-graphite-50 px-4">
      <div className="max-w-md rounded-lg border border-graphite-200 bg-white p-8 text-center shadow-card">
        <p className="text-sm font-bold uppercase tracking-wide text-brand-700">
          Portal Telecom EDP
        </p>
        <h1 className="mt-3 text-3xl font-black text-graphite-950">
          Página não encontrada
        </h1>
        <p className="mt-3 text-graphite-600">
          A rota solicitada não existe nesta versão estrutural do portal.
        </p>
        <Link href="/" className={buttonStyles("primary", "md", "mt-6")}>
          Voltar ao inicio
        </Link>
      </div>
    </main>
  );
}
