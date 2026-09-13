import type { Metadata } from "next";
import { getProductos, CATEGORIAS } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Menú — Chegusan",
  description:
    "Todos nuestros sánguches: clásicos, de autor y veggie. Pedí online en Mar del Plata.",
};

export default async function ProductosPage() {
  const productos = await getProductos();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl">Nuestro menú</h1>
        <p className="mt-3 text-lg text-ink-soft">
          Todo hecho al momento. Elegí el tuyo y sumalo al pedido.
        </p>
      </header>

      {CATEGORIAS.map((cat) => {
        const items = productos.filter((p) => p.categoria === cat);
        if (items.length === 0) return null;
        return (
          <Reveal key={cat}>
            <section className="mt-12">
              <h2 className="mb-5 flex items-center gap-3 font-display text-2xl font-black tracking-tight">
                {cat}
                <span className="h-px flex-1 bg-linea" />
                <span className="text-sm font-semibold text-ink-soft">{items.length}</span>
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <ProductCard key={p.id} producto={p} />
                ))}
              </div>
            </section>
          </Reveal>
        );
      })}
    </div>
  );
}
