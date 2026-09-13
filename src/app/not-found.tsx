import Link from "next/link";

// Página 404 de marca. La usa Next tanto para rutas inexistentes como cuando
// llamamos a notFound() (ej. /local/[id] con un id que no existe).
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="text-7xl">🥪</span>
      <h1 className="mt-6 font-display text-5xl font-black tracking-tight">404</h1>
      <p className="mt-3 text-lg text-ink-soft">
        Esta página se la comió alguien con hambre. No encontramos lo que buscabas.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-tomate px-6 py-3 text-sm font-bold text-cream transition-colors hover:bg-tomate-dark"
        >
          Volver al inicio
        </Link>
        <Link
          href="/productos"
          className="rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-bold transition-colors hover:border-ink/30"
        >
          Ver el menú
        </Link>
      </div>
    </div>
  );
}
