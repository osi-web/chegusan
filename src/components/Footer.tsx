import Link from "next/link";
import type { ReactNode } from "react";

export function Footer() {
  return (
    <footer className="border-t border-linea bg-crema">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-mostaza font-display text-lg font-black text-ink">
              C
            </span>
            <span className="font-display text-xl font-extrabold">Chegusan</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-ink-soft">
            Sánguches de verdad, pan casero y 14 locales en Mar del Plata. Pedí
            online y en minutos lo tenés.
          </p>
        </div>

        <FooterCol
          titulo="Menú"
          links={[
            { href: "/productos", label: "Ver todo" },
            { href: "/productos", label: "Clásicos" },
            { href: "/productos", label: "De autor" },
            { href: "/productos", label: "Veggie" },
          ]}
        />

        <FooterCol
          titulo="Chegusan"
          links={[
            { href: "/locales", label: "Locales" },
            { href: "/", label: "Quiénes somos" },
            { href: "/productos", label: "Pedí ahora" },
          ]}
        />

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wide">Seguinos</h4>
          <div className="mt-3 flex gap-2">
            <Social label="Instagram"><IconInstagram /></Social>
            <Social label="Facebook"><IconFacebook /></Social>
            <Social label="WhatsApp"><IconWhatsapp /></Social>
          </div>
        </div>
      </div>

      <div className="border-t border-linea">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-5 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 Chegusan · Mar del Plata</p>
          <p>Sitio demo de portfolio · marca ficticia · mapa © OpenStreetMap</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  titulo,
  links,
}: {
  titulo: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="font-display text-sm font-bold uppercase tracking-wide">{titulo}</h4>
      <ul className="mt-3 space-y-2">
        {links.map((l, i) => (
          <li key={i}>
            <Link href={l.href} className="text-sm text-ink-soft transition-colors hover:text-tomate">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Social({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-lg border border-linea bg-cream text-ink-soft"
    >
      {children}
    </span>
  );
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IconWhatsapp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-4-1L3 20l1-5.5a8.5 8.5 0 0 1 16-3z" />
    </svg>
  );
}
