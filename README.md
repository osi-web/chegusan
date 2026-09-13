# 🥪 Chegusan

**Sanguchería de Mar del Plata — demo de pedidos online con menú QR.**

Web de una sandwichería con catálogo, carrito, checkout que arma el pedido por
WhatsApp, páginas de menú por local (para códigos QR) y mapa de sucursales.

> ⚠️ **Demo de portfolio.** _Chegusan_ es una **marca ficticia**; los precios,
> teléfonos y sucursales son de ejemplo. No representa a ningún comercio real.

---

## Stack

- **[Next.js 16](https://nextjs.org)** — App Router + React Server Components
- **React 19** + **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com)** — configuración CSS-first (`@theme`)
- **[Leaflet](https://leafletjs.com)** + **OpenStreetMap** — mapa de locales (sin API key)
- Deploy pensado para **[Vercel](https://vercel.com)**

## Funcionalidades

- 🏠 **Landing** con hero, destacados y sección "quiénes somos"
- 🍔 **Catálogo** de productos agrupado por categoría
- 🛒 **Carrito** persistente (`localStorage`) con drawer lateral usando el
  elemento nativo `<dialog>` (foco atrapado, `Esc` y `::backdrop` gratis)
- 📲 **Checkout → WhatsApp**: valida los datos y abre un `wa.me` con el pedido
  formateado, enrutado al local elegido
- 🔳 **Menú QR por local** en `/local/[id]` (páginas estáticas por sucursal)
- 🗺️ **Mapa** de locales con Leaflet + OpenStreetMap

## Correr en local

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

Para un build de producción:

```bash
npm run build && npm start
```

## Estructura

```
src/
├─ app/
│  ├─ layout.tsx            # layout raíz + CartProvider + fuentes
│  ├─ page.tsx              # landing (Server Component)
│  ├─ productos/            # catálogo
│  ├─ checkout/             # formulario → WhatsApp
│  ├─ locales/              # mapa + lista de locales
│  └─ local/[id]/           # menú por local (destino del QR, SSG)
├─ components/              # Navbar, Footer, ProductCard, CartDrawer, CheckoutForm, LocalesMap
├─ context/CartContext.tsx  # estado del carrito (useReducer + localStorage)
└─ lib/                     # tipos + capa de datos (mock async, lista para Firestore)
```

## Notas de arquitectura

- La **capa de datos** (`src/lib/data.ts`) expone funciones `async` con datos de
  ejemplo. Están pensadas para reemplazarse por Firestore **sin tocar los
  componentes** — misma firma, mismos tipos.
- Las páginas son **Server Components** que traen los datos en el servidor; sólo
  lo interactivo (carrito, formulario, mapa) es cliente.

## Créditos

- Mapa © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors.
