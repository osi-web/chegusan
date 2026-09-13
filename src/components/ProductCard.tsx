"use client";

// Card de producto con foto real (next/image), zoom al hover y feedback del
// botón "Agregar" (que suma al carrito vía CartContext).

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Producto, Categoria } from "@/lib/types";

// Color del texto del chip de categoría (sobre pastilla blanca).
const CHIP: Record<Categoria, string> = {
  "Clásicos": "text-mostaza-dark",
  "De autor": "text-tomate",
  "Veggie": "text-verde",
};

const pesos = (n: number) => "$" + n.toLocaleString("es-AR");

export function ProductCard({ producto }: { producto: Producto }) {
  const { addItem } = useCart();
  const [sumado, setSumado] = useState(false);

  const agregar = () => {
    addItem(producto);
    setSumado(true);
    setTimeout(() => setSumado(false), 1300);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-linea bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-crema">
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span
          className={`absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold shadow-sm backdrop-blur-sm ${CHIP[producto.categoria]}`}
        >
          {producto.categoria}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-bold leading-snug">{producto.nombre}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{producto.descripcion}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl font-extrabold">{pesos(producto.precio)}</span>
          <button
            onClick={agregar}
            className={`rounded-full px-4 py-2 text-sm font-bold text-cream shadow-sm transition-all active:scale-95 ${
              sumado ? "bg-verde" : "bg-tomate hover:bg-tomate-dark"
            }`}
          >
            {sumado ? "¡Sumado! ✓" : "Agregar"}
          </button>
        </div>
      </div>
    </article>
  );
}
