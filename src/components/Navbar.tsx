"use client";

// Componente cliente: estado (menú mobile), usePathname (link activo) y el
// carrito (badge de cantidad + abrir el drawer) vía useCart.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Menú" },
  { href: "/locales", label: "Locales" },
];

export function Navbar() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [abierto, setAbierto] = useState(false);

  const esActivo = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-linea bg-cream/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setAbierto(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-mostaza font-display text-lg font-black text-ink shadow-sm">
            C
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight">Chegusan</span>
        </Link>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  esActivo(l.href) ? "text-tomate" : "text-ink-soft hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Carrito — siempre visible, abre el drawer */}
          <button
            onClick={openCart}
            aria-label={`Abrir carrito, ${itemCount} ${itemCount === 1 ? "ítem" : "ítems"}`}
            className="relative grid h-10 w-10 place-items-center rounded-lg text-ink transition-colors hover:bg-crema"
          >
            <IconBag />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-tomate px-1 text-[11px] font-bold leading-none text-cream">
                {itemCount}
              </span>
            )}
          </button>

          <Link
            href="/productos"
            className="ml-1 hidden rounded-full bg-tomate px-5 py-2.5 text-sm font-bold text-cream shadow-sm transition-colors hover:bg-tomate-dark md:inline-flex"
          >
            Pedí ahora
          </Link>

          <button
            onClick={() => setAbierto((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg text-ink md:hidden"
            aria-label="Abrir menú"
            aria-expanded={abierto}
          >
            {abierto ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </nav>

      {abierto && (
        <div className="border-t border-linea bg-cream px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setAbierto(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-semibold ${
                  esActivo(l.href) ? "bg-crema text-tomate" : "text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/productos"
              onClick={() => setAbierto(false)}
              className="mt-1 rounded-full bg-tomate px-5 py-3 text-center text-sm font-bold text-cream"
            >
              Pedí ahora
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function IconBag() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
function IconMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function IconX() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
