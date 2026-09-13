import type { Metadata } from "next";
import { getLocales } from "@/lib/data";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout — Chegusan",
  description: "Confirmá tu pedido y te lo mandamos por WhatsApp al local más cercano.",
};

// Server Component: trae los locales en el servidor (mañana, Firestore) y se
// los pasa como prop al formulario cliente. El carrito, en cambio, es estado
// de cliente y lo lee el propio <CheckoutForm> vía useCart.
export default async function CheckoutPage() {
  const locales = await getLocales();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl">Finalizá tu pedido</h1>
      <p className="mt-3 text-lg text-ink-soft">
        Completá tus datos y te abrimos WhatsApp con todo cargado.
      </p>
      <CheckoutForm locales={locales} />
    </div>
  );
}
