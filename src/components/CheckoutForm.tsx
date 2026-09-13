"use client";

// Formulario de checkout (cliente): lee el carrito del Context, valida con
// validación NATIVA del navegador (:user-invalid, sin librerías) y arma un
// link wa.me con el pedido. No hace falta API route: el link se construye en
// el cliente y abre WhatsApp con el mensaje pre-cargado (el usuario lo envía).

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Local } from "@/lib/types";

const pesos = (n: number) => "$" + n.toLocaleString("es-AR");

// Clase compartida de inputs. El borde se pone tomate SÓLO después de que el
// usuario interactuó con un campo inválido (:user-invalid), no al cargar.
const campo =
  "w-full rounded-xl border border-linea bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-ink/40 [&:user-invalid]:border-tomate [&:user-invalid]:bg-tomate/5";

export function CheckoutForm({ locales }: { locales: Local[] }) {
  const { items, total, clear } = useCart();
  const [localId, setLocalId] = useState(locales[0]?.id ?? "");
  const [waUrl, setWaUrl] = useState<string | null>(null);

  // Pedido enviado: mostramos confirmación (el carrito ya se vació).
  if (waUrl) {
    return (
      <div className="mx-auto mt-10 max-w-md rounded-2xl border border-linea bg-white p-8 text-center">
        <span className="text-5xl">✅</span>
        <h2 className="mt-3 font-display text-2xl font-black">¡Pedido enviado!</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Te abrimos WhatsApp con el detalle cargado. Si no se abrió solo, tocá el botón.
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block rounded-full bg-tomate px-6 py-3 text-sm font-bold text-cream transition-colors hover:bg-tomate-dark"
        >
          Abrir WhatsApp
        </a>
        <Link href="/productos" className="mt-3 block text-sm font-semibold text-ink-soft hover:text-tomate">
          Volver al menú
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-linea bg-white p-8 text-center">
        <p className="text-ink-soft">No hay nada en tu pedido todavía.</p>
        <Link
          href="/productos"
          className="mt-4 inline-block rounded-full bg-tomate px-5 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-tomate-dark"
        >
          Ver el menú
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // el submit sólo llega acá si la validación nativa pasó
    const data = new FormData(e.currentTarget);
    const nombre = String(data.get("nombre") ?? "").trim();
    const tel = String(data.get("telefono") ?? "").trim();
    const dir = String(data.get("direccion") ?? "").trim();
    const refs = String(data.get("referencias") ?? "").trim();
    const local = locales.find((l) => l.id === localId) ?? locales[0];

    const lineas = items
      .map((i) => `• ${i.nombre} x${i.cantidad} — ${pesos(i.precio * i.cantidad)}`)
      .join("\n");

    const mensaje =
      `¡Hola ${local.nombre}! Quiero hacer un pedido:\n\n` +
      `${lineas}\n\n` +
      `Total: ${pesos(total)}\n\n` +
      `Nombre: ${nombre}\n` +
      `Tel: ${tel}\n` +
      `Dirección: ${dir}` +
      (refs ? `\nReferencias: ${refs}` : "");

    const numero = local.telefono.replace(/[^0-9]/g, "");
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    clear();
    setWaUrl(url); // guarda el link para el fallback de la pantalla de éxito
  };

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-5">
      {/* Formulario */}
      <form onSubmit={handleSubmit} noValidate={false} className="lg:col-span-3 lg:order-1 order-2">
        <div className="grid gap-4">
          <Field label="Nombre y apellido">
            <input name="nombre" type="text" required autoComplete="name" placeholder="Juan Pérez" className={campo} />
          </Field>

          <Field label="Teléfono">
            <input
              name="telefono"
              type="tel"
              required
              inputMode="tel"
              pattern="[0-9\s\+\(\)\-]{6,}"
              autoComplete="tel"
              placeholder="223 555 1234"
              className={campo}
            />
          </Field>

          <Field label="¿De qué local lo pedís?">
            <select
              name="local"
              value={localId}
              onChange={(e) => setLocalId(e.target.value)}
              className={campo}
            >
              {locales.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.nombre} — {l.direccion}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Dirección de entrega">
            <input name="direccion" type="text" required autoComplete="street-address" placeholder="Av. Colón 1234, 5º B" className={campo} />
          </Field>

          <Field label="Referencias (opcional)">
            <textarea name="referencias" rows={2} placeholder="Timbre B, entre calles..." className={campo} />
          </Field>
        </div>

        <button
          type="submit"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-tomate px-6 py-3.5 text-sm font-bold text-cream shadow-sm transition-colors hover:bg-tomate-dark"
        >
          <IconWhatsapp />
          Enviar pedido por WhatsApp
        </button>
        <p className="mt-2 text-center text-xs text-ink-soft">
          Se abre WhatsApp con el pedido cargado. Lo revisás y lo enviás vos.
        </p>
      </form>

      {/* Resumen del pedido */}
      <aside className="order-1 lg:order-2 lg:col-span-2">
        <div className="rounded-2xl border border-linea bg-white p-5 lg:sticky lg:top-20">
          <h2 className="font-display text-lg font-black">Tu pedido</h2>
          <ul className="mt-3 divide-y divide-linea">
            {items.map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <span className="flex items-center gap-2">
                  <span className="text-lg">{i.emoji}</span>
                  <span className="font-semibold">
                    {i.nombre} <span className="text-ink-soft">×{i.cantidad}</span>
                  </span>
                </span>
                <span className="font-display font-bold">{pesos(i.precio * i.cantidad)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t border-linea pt-3">
            <span className="font-semibold">Total</span>
            <span className="font-display text-2xl font-black">{pesos(total)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}

function IconWhatsapp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-4-1L3 20l1-5.5a8.5 8.5 0 0 1 16-3z" />
    </svg>
  );
}
