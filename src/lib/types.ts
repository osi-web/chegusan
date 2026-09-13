// Tipos de dominio: el contrato que comparten los componentes y la capa
// de datos. Hoy los sirve un mock (lib/data.ts); mañana Firestore, con la
// misma forma — y ni las páginas ni los componentes se enteran del cambio.

export type Categoria = "Clásicos" | "De autor" | "Veggie";

export interface Producto {
  id: string;
  nombre: string;
  precio: number; // pesos, sin decimales
  descripcion: string;
  categoria: Categoria;
  emoji: string; // ícono chico (carrito, checkout)
  imagen: string; // foto del producto (/products/<id>.jpg)
  destacado?: boolean; // aparece en "Los más pedidos" del home
}

// Un producto dentro del carrito = el producto + cuántas unidades lleva.
export interface CartItem extends Producto {
  cantidad: number;
}

export interface Local {
  id: string; // slug para las rutas /local/[id]
  nombre: string;
  direccion: string;
  telefono: string;
  horarios: string;
  lat: number;
  lng: number;
}
