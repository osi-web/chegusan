// Server Component async: trae los datos en el servidor. Sólo lo interactivo
// (ProductCard, Reveal) es cliente.

import Link from "next/link";
import Image from "next/image";
import { getProductosDestacados } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export default async function Home() {
  const destacados = await getProductosDestacados();

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-mostaza/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-tomate/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-linea bg-white/70 px-3 py-1 text-xs font-bold text-ink-soft">
              🥪 14 locales en Mar del Plata
            </span>
            <h1 className="mt-5 font-display text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">
              El sánguche que te hace decir <span className="text-tomate">che</span>.
            </h1>
            <p className="mt-5 max-w-md text-lg text-ink-soft">
              Pan casero, ingredientes de verdad y ese punto justo que sólo tiene
              el de la esquina. Pedí online y en minutos lo tenés.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/productos"
                className="rounded-full bg-tomate px-6 py-3 text-sm font-bold text-cream shadow-sm transition-all hover:bg-tomate-dark hover:shadow-md active:scale-95"
              >
                Ver el menú
              </Link>
              <Link
                href="/locales"
                className="rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-bold transition-colors hover:border-ink/30"
              >
                Ver locales
              </Link>
            </div>
          </div>

          {/* Foto del hero */}
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-black/5">
              <Image
                src="/products/hero.jpg"
                alt="Sánguche recién hecho de Chegusan"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
            <span className="absolute right-4 top-6 rotate-6 rounded-2xl bg-white px-3 py-1.5 font-display text-sm font-bold shadow-lg">
              recién hecho
            </span>
            <span className="absolute bottom-6 left-4 -rotate-3 rounded-2xl bg-ink px-3 py-1.5 font-display text-sm font-bold text-cream shadow-lg">
              pan casero
            </span>
          </div>
        </div>
      </section>

      {/* ---------- Franja de valores ---------- */}
      <section className="border-y border-linea bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
          <Valor emoji="🍞" titulo="Pan casero" texto="Horneado cada día en el local." />
          <Valor emoji="🥩" titulo="Ingredientes de verdad" texto="Sin vueltas ni letra chica." />
          <Valor emoji="⚡" titulo="Listo en minutos" texto="Pedí y retirá, o te lo llevamos." />
        </div>
      </section>

      {/* ---------- Destacados ---------- */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl">Los más pedidos</h2>
              <p className="mt-2 text-ink-soft">Los que no fallan nunca.</p>
            </div>
            <Link href="/productos" className="hidden shrink-0 text-sm font-bold text-tomate hover:underline sm:block">
              Ver todo →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destacados.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        </section>
      </Reveal>

      {/* ---------- Quiénes somos ---------- */}
      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl">
                De Mar del Plata, para Mar del Plata
              </h2>
              <p className="mt-4 text-cream/80">
                Empezamos con un local en Güemes y la misma idea de siempre: un
                sánguche bien hecho no necesita explicación. Hoy somos 14 locales,
                el mismo pan y el mismo mostrador de confianza.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <Stat n="14" l="locales" />
                <Stat n="30+" l="variedades" />
                <Stat n="15 min" l="promedio" />
              </div>
            </div>
          </Reveal>
          <Reveal className="grid grid-cols-2 gap-3" delay={120}>
            {[
              { src: "/products/milanesa-completa.jpg", alt: "Milanesa Completa" },
              { src: "/products/lomito-chegusan.jpg", alt: "Lomito Chegusan" },
              { src: "/products/bondiola-braseada.jpg", alt: "Bondiola Braseada" },
              { src: "/products/choripan-autor.jpg", alt: "Choripán de Autor" },
            ].map((img) => (
              <div key={img.src} className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-white/10">
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 40vw, 20vw" className="object-cover" />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- CTA final ---------- */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-mostaza to-tomate px-8 py-14 text-center shadow-lg">
            <h2 className="font-display text-3xl font-black text-cream sm:text-4xl">¿Listo para pedir?</h2>
            <p className="mx-auto mt-3 max-w-md text-cream/90">
              Armá tu pedido y te lo mandamos por WhatsApp al local más cercano.
            </p>
            <Link
              href="/productos"
              className="mt-7 inline-block rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-cream transition-transform hover:scale-105 active:scale-95"
            >
              Ver el menú
            </Link>
          </div>
        </section>
      </Reveal>
    </>
  );
}

function Valor({ emoji, titulo, texto }: { emoji: string; titulo: string; texto: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-crema text-2xl">{emoji}</span>
      <div>
        <h3 className="font-display font-bold">{titulo}</h3>
        <p className="text-sm text-ink-soft">{texto}</p>
      </div>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-black text-mostaza">{n}</div>
      <div className="text-xs uppercase tracking-wide text-cream/60">{l}</div>
    </div>
  );
}
