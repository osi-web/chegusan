import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";

// next/font descarga y auto-hostea las fuentes (sin request a Google en
// runtime) y expone cada una como variable CSS que Tailwind usa en @theme.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700", "900"],
});

export const metadata: Metadata = {
  // Base para resolver URLs absolutas de OG. Cambiá el fallback por tu dominio
  // real de Vercel, o seteá NEXT_PUBLIC_SITE_URL.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://chegusan.vercel.app",
  ),
  title: "Chegusan — Sanguchería de Mar del Plata",
  description:
    "Sánguches de verdad, pan casero y 14 locales en Mar del Plata. Pedí online y en minutos lo tenés.",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Chegusan",
    title: "Chegusan — Sanguchería de Mar del Plata",
    description:
      "Sánguches de verdad, pan casero y 14 locales en Mar del Plata. Pedí online.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chegusan — Sanguchería de Mar del Plata",
    description: "Sánguches de verdad, pan casero y 14 locales en Mar del Plata.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${jakarta.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* CartProvider (Client Component) envuelve todo lo que consume el carrito */}
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
