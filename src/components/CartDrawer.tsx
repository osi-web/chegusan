"use client";

// Drawer del carrito = <dialog> nativo abierto con showModal(): top layer,
// foco atrapado, ESC y ::backdrop vienen del navegador. La animación de
// entrada/salida (slide-over) y el bloqueo de scroll viven en globals.css.

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/lib/types";

const pesos = (n: number) => "$" + n.toLocaleString("es-AR");

export function CartDrawer() {
  const { items, itemCount, total, isOpen, closeCart, addItem, decrement, removeItem, clear } =
    useCart();
  const ref = useRef<HTMLDialogElement>(null);

  // Sincroniza el <dialog> nativo con el estado del carrito.
  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (isOpen && !dlg.open) dlg.showModal();
    else if (!isOpen && dlg.open) dlg.close();
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      className="cart-dialog"
      aria-label="Tu pedido"
      onClose={closeCart} // ESC o close() → sincroniza el estado
      onClick={(e) => {
        // Click sobre el backdrop (el target es el propio <dialog>) → cerrar.
        if (e.target === ref.current) closeCart();
      }}
    >
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between border-b border-linea px-5 py-4">
          <div>
            <h2 className="font-display text-lg font-black">Tu pedido</h2>
            <p className="text-xs text-ink-soft">
              {itemCount} {itemCount === 1 ? "ítem" : "ítems"}
            </p>
          </div>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="grid h-9 w-9 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-crema"
          >
            <IconX />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <span className="text-5xl">🛒</span>
            <p className="font-display text-lg font-bold">Tu carrito está vacío</p>
            <p className="text-sm text-ink-soft">Sumá unos sánguches y volvé.</p>
            <Link
              href="/productos"
              onClick={closeCart}
              className="mt-2 rounded-full bg-tomate px-5 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-tomate-dark"
            >
              Ver el menú
            </Link>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-linea overflow-y-auto px-5">
            {items.map((item) => (
              <CartRow
                key={item.id}
                item={item}
                onInc={() => addItem(item)}
                onDec={() => decrement(item.id)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <footer className="border-t border-linea px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-soft">Total</span>
              <span className="font-display text-2xl font-black">{pesos(total)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="mt-3 block rounded-full bg-tomate px-5 py-3 text-center text-sm font-bold text-cream shadow-sm transition-colors hover:bg-tomate-dark"
            >
              Ir al checkout
            </Link>
            <button
              onClick={clear}
              className="mt-2 w-full text-center text-xs font-semibold text-ink-soft transition-colors hover:text-tomate"
            >
              Vaciar carrito
            </button>
          </footer>
        )}
      </div>
    </dialog>
  );
}

function CartRow({
  item,
  onInc,
  onDec,
  onRemove,
}: {
  item: CartItem;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
}) {
  return (
    <li className="flex gap-3 py-4">
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-crema text-2xl">
        {item.emoji}
      </span>
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-sm font-bold leading-tight">{item.nombre}</h3>
          <button
            onClick={onRemove}
            aria-label={`Quitar ${item.nombre}`}
            className="text-ink-soft transition-colors hover:text-tomate"
          >
            <IconX small />
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-full border border-linea">
            <button
              onClick={onDec}
              aria-label="Restar uno"
              className="grid h-7 w-7 place-items-center rounded-full text-base text-ink transition-colors hover:bg-crema"
            >
              −
            </button>
            <span className="min-w-5 text-center text-sm font-bold">{item.cantidad}</span>
            <button
              onClick={onInc}
              aria-label="Sumar uno"
              className="grid h-7 w-7 place-items-center rounded-full text-base text-ink transition-colors hover:bg-crema"
            >
              +
            </button>
          </div>
          <span className="font-display text-sm font-bold">{pesos(item.precio * item.cantidad)}</span>
        </div>
      </div>
    </li>
  );
}

function IconX({ small = false }: { small?: boolean }) {
  const s = small ? 16 : 20;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
