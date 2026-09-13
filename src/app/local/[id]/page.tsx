import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocal, getLocales, getProductos, CATEGORIAS } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

// Pre-genera en build una página por local (SSG). Es lo que hace que el QR de
// cada sucursal apunte a una URL estática y rápida (/local/guemes, etc.).
export async function generateStaticParams() {
  const locales = await getLocales();
  return locales.map((l) => ({ id: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const local = await getLocal(id);
  if (!local) return { title: "Local no encontrado — Chegusan" };
  return {
    title: `${local.nombre} — Chegusan`,
    description: `Menú y pedidos de ${local.nombre}, ${local.direccion}.`,
  };
}

export default async function LocalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // En Next 16 `params` es una Promise → hay que await-earla.
  const { id } = await params;
  const [local, productos] = await Promise.all([getLocal(id), getProductos()]);
  if (!local) notFound();

  const wa = `https://wa.me/${local.telefono.replace(/[^0-9]/g, "")}`;
  const maps = `https://www.google.com/maps/dir/?api=1&destination=${local.lat},${local.lng}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Hero del local */}
      <div className="rounded-3xl bg-gradient-to-br from-mostaza/25 via-crema to-tomate/15 p-6 sm:p-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-ink-soft">
          📍 Estás en
        </span>
        <h1 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl">{local.nombre}</h1>
        <div className="mt-3 flex flex-col gap-1 text-sm text-ink-soft sm:flex-row sm:gap-5">
          <span>📍 {local.direccion}</span>
          <span>🕒 {local.horarios}</span>
          <span>📞 {local.telefono}</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full bg-tomate px-5 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-tomate-dark">
            Pedir por WhatsApp
          </a>
          <a href={maps} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-bold transition-colors hover:border-ink/30">
            Cómo llegar
          </a>
          <Link href="/locales" className="rounded-full px-5 py-2.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink">
            Ver todos los locales
          </Link>
        </div>
      </div>

      {/* Menú del local */}
      <h2 className="mt-12 font-display text-3xl font-black tracking-tight">Menú</h2>
      {CATEGORIAS.map((cat) => {
        const items = productos.filter((p) => p.categoria === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} className="mt-8">
            <h3 className="mb-5 flex items-center gap-3 font-display text-xl font-black tracking-tight">
              {cat}
              <span className="h-px flex-1 bg-linea" />
            </h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <ProductCard key={p.id} producto={p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
