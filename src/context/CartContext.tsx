"use client";

// El carrito es estado global de cliente. En el App Router, el Context DEBE
// vivir en un Client Component que envuelve {children}; el layout (Server
// Component) lo importa y lo renderiza.

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { Producto, CartItem } from "@/lib/types";

type Action =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; producto: Producto }
  | { type: "decrement"; id: string }
  | { type: "remove"; id: string }
  | { type: "clear" };

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case "hydrate":
      return action.items;
    case "add": {
      const existe = state.find((i) => i.id === action.producto.id);
      if (existe) {
        return state.map((i) =>
          i.id === action.producto.id ? { ...i, cantidad: i.cantidad + 1 } : i,
        );
      }
      return [...state, { ...action.producto, cantidad: 1 }];
    }
    case "decrement":
      // Al llegar a 0, se elimina la línea.
      return state.flatMap((i) => {
        if (i.id !== action.id) return [i];
        return i.cantidad <= 1 ? [] : [{ ...i, cantidad: i.cantidad - 1 }];
      });
    case "remove":
      return state.filter((i) => i.id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

const STORAGE_KEY = "chegusan_carrito_v1";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  total: number;
  isOpen: boolean;
  addItem: (p: Producto) => void;
  decrement: (id: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [isOpen, setIsOpen] = useState(false);
  const [hidratado, setHidratado] = useState(false);

  // Cargar de localStorage recién en el cliente (evita mismatch de hidratación:
  // el server no tiene localStorage, así que arrancamos vacío en ambos lados).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", items: JSON.parse(raw) });
    } catch {
      /* localStorage puede fallar (modo privado); seguimos con carrito vacío */
    }
    setHidratado(true);
  }, []);

  // Persistir en cada cambio (una vez hidratado, para no pisar con [] al montar).
  useEffect(() => {
    if (!hidratado) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* sin persistencia si el navegador la bloquea */
    }
  }, [items, hidratado]);

  const itemCount = useMemo(
    () => items.reduce((n, i) => n + i.cantidad, 0),
    [items],
  );
  const total = useMemo(
    () => items.reduce((s, i) => s + i.precio * i.cantidad, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      total,
      isOpen,
      addItem: (p) => dispatch({ type: "add", producto: p }),
      decrement: (id) => dispatch({ type: "decrement", id }),
      removeItem: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [items, itemCount, total, isOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
