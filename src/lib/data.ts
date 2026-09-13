import type { Producto, Local, Categoria } from "./types";

// ⚠️ Datos de ejemplo (marca ficticia). En la fase de Firebase, estas mismas
// funciones van a leer de Firestore con idéntica firma async, así que las
// páginas y los componentes no cambian una sola línea.
// Fotos: Unsplash (licencia libre, uso comercial), guardadas en /public/products.

const PRODUCTOS: Producto[] = [
  {
    id: "milanesa-completa",
    nombre: "Milanesa Completa",
    precio: 6500,
    categoria: "Clásicos",
    emoji: "🥪",
    imagen: "/products/milanesa-completa.jpg",
    destacado: true,
    descripcion:
      "Milanesa de ternera, jamón, queso, huevo, lechuga y tomate en pan casero.",
  },
  {
    id: "lomito-chegusan",
    nombre: "Lomito Chegusan",
    precio: 8900,
    categoria: "De autor",
    emoji: "🥖",
    imagen: "/products/lomito-chegusan.jpg",
    destacado: true,
    descripcion:
      "Lomo tierno, queso fundido, jamón, huevo y morrones asados. El de la casa.",
  },
  {
    id: "bondiola-braseada",
    nombre: "Bondiola Braseada",
    precio: 7800,
    categoria: "De autor",
    emoji: "🍖",
    imagen: "/products/bondiola-braseada.jpg",
    destacado: true,
    descripcion: "Bondiola cocida a fuego lento, cheddar y cebolla crocante.",
  },
  {
    id: "choripan-autor",
    nombre: "Choripán de Autor",
    precio: 4900,
    categoria: "Clásicos",
    emoji: "🌭",
    imagen: "/products/choripan-autor.jpg",
    descripcion: "Chorizo artesanal, chimichurri de la casa y salsa criolla.",
  },
  {
    id: "veggie-casa",
    nombre: "Veggie de la Casa",
    precio: 6200,
    categoria: "Veggie",
    emoji: "🥬",
    imagen: "/products/veggie-casa.jpg",
    destacado: true,
    descripcion: "Portobello grillado, rúcula, muzzarella y pesto de albahaca.",
  },
  {
    id: "pollo-crispy",
    nombre: "Pollo Crispy",
    precio: 6800,
    categoria: "Clásicos",
    emoji: "🍗",
    imagen: "/products/pollo-crispy.jpg",
    descripcion: "Pollo rebozado crocante, honey mustard y coleslaw fresco.",
  },
  {
    id: "pastron-serrano",
    nombre: "Pastrón Serrano",
    precio: 9200,
    categoria: "De autor",
    emoji: "🥪",
    imagen: "/products/pastron-serrano.jpg",
    descripcion: "Pastrón braseado, pepinos agridulces y mostaza a la antigua.",
  },
  {
    id: "tostado-triple",
    nombre: "Tostado Triple",
    precio: 4200,
    categoria: "Clásicos",
    emoji: "🧀",
    imagen: "/products/tostado-triple.jpg",
    descripcion:
      "El clásico de siempre: triple de jamón, queso y tomate en pan de miga.",
  },
];

const LOCALES: Local[] = [
  { id: "guemes", nombre: "Chegusan Güemes", direccion: "Güemes 2650", telefono: "+54 223 555-1010", horarios: "Lun a Dom · 10 a 24 h", lat: -38.0102, lng: -57.5432 },
  { id: "puerto", nombre: "Chegusan Puerto", direccion: "Av. Martínez de Hoz 1150", telefono: "+54 223 555-1020", horarios: "Lun a Dom · 11 a 23 h", lat: -38.043, lng: -57.532 },
  { id: "constitucion", nombre: "Chegusan Constitución", direccion: "Av. Constitución 4500", telefono: "+54 223 555-1030", horarios: "Lun a Dom · 10 a 24 h", lat: -37.962, lng: -57.562 },
  { id: "luro", nombre: "Chegusan Luro", direccion: "Av. Luro 3200", telefono: "+54 223 555-1040", horarios: "Lun a Dom · 9 a 23 h", lat: -38.0015, lng: -57.556 },
  { id: "colon", nombre: "Chegusan Colón", direccion: "Av. Colón 1800", telefono: "+54 223 555-1050", horarios: "Lun a Dom · 10 a 24 h", lat: -37.995, lng: -57.551 },
  { id: "playa-grande", nombre: "Chegusan Playa Grande", direccion: "Av. P. Peralta Ramos 5900", telefono: "+54 223 555-1060", horarios: "Lun a Dom · 10 a 24 h", lat: -38.025, lng: -57.534 },
];

// Simulamos una latencia mínima para que el mock se comporte como una llamada
// real a Firestore (y para practicar el patrón async/await).
const delay = (ms = 120) => new Promise((r) => setTimeout(r, ms));

export async function getProductos(): Promise<Producto[]> {
  await delay();
  return PRODUCTOS;
}

export async function getProductosDestacados(): Promise<Producto[]> {
  await delay();
  return PRODUCTOS.filter((p) => p.destacado);
}

export async function getLocales(): Promise<Local[]> {
  await delay();
  return LOCALES;
}

export async function getLocal(id: string): Promise<Local | undefined> {
  await delay();
  return LOCALES.find((l) => l.id === id);
}

export const CATEGORIAS: Categoria[] = ["Clásicos", "De autor", "Veggie"];
