import type { Metadata } from "next";
import Link from "next/link";
import { getLocales } from "@/lib/data";
import { LocalesMap } from "@/components/LocalesMap";

export const metadata: Metadata = {
  title: "Locales — Chegusan",
  description: "Nuestros locales en Mar del Plata. Encontrá el más cercano en el mapa.",
};

export default async function LocalesPage() {
  const locales = await getLocales();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl">Nuestros locales</h1>
        <p className="mt-3 text-lg text-ink-soft">
          Estamos en todo Mar del Plata. Encontrá el más cercano y pedí.
        </p>
      </header>

      {/* Mapa (client component: Leaflet corre sólo en el navegador) */}
      <div className="mt-8">
        <LocalesMap locales={locales} />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {locales.map((l) => (
          <article key={l.id} className="flex flex-col rounded-2xl border border-linea bg-white p-5 shadow-sm">
            <h2 className="font-display text-lg font-bold">{l.nombre}</h2>
            <dl className="mt-3 space-y-1.5 text-sm text-ink-soft">
              <div className="flex gap-2"><span>📍</span><span>{l.direccion}</span></div>
              <div className="flex gap-2"><span>🕒</span><span>{l.horarios}</span></div>
              <div className="flex gap-2"><span>📞</span><span>{l.telefono}</span></div>
            </dl>
            <div className="mt-4 flex gap-2">
              <Link
                href={`/local/${l.id}`}
                className="flex-1 rounded-full bg-tomate px-4 py-2 text-center text-sm font-bold text-cream transition-colors hover:bg-tomate-dark"
              >
                Ver menú
              </Link>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ink/15 px-4 py-2 text-center text-sm font-bold transition-colors hover:border-ink/30"
              >
                Ir
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
