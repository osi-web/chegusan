"use client";

// Mapa de locales con Leaflet. Leaflet toca `window`, así que NO puede correr
// en el servidor: por eso se importa dinámicamente DENTRO del useEffect (que
// sólo corre en el cliente). El módulo nunca se evalúa en SSR y no hace falta
// next/dynamic. El CSS sí se importa arriba (Next lo extrae sin ejecutar JS).

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Local } from "@/lib/types";

export function LocalesMap({ locales }: { locales: Local[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    let cancelado = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelado || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, { scrollWheelZoom: false });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Pin de marca (divIcon HTML) — evita el clásico bug de los íconos de
      // Leaflet con bundlers y queda on-brand.
      const icon = L.divIcon({
        className: "chegusan-pin",
        html: "<span>🥪</span>",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -14],
      });

      const puntos: [number, number][] = [];
      for (const l of locales) {
        puntos.push([l.lat, l.lng]);
        L.marker([l.lat, l.lng], { icon, title: l.nombre })
          .addTo(map)
          .bindPopup(
            `<strong>${l.nombre}</strong><br>${l.direccion}<br>` +
              `<a href="/local/${l.id}">Ver menú</a> · ` +
              `<a href="https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lng}" target="_blank" rel="noopener">Cómo llegar</a>`,
          );
      }
      if (puntos.length) map.fitBounds(puntos, { padding: [40, 40] });
    })();

    return () => {
      cancelado = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [locales]);

  return (
    <div
      ref={containerRef}
      className="isolate h-[60vh] min-h-80 w-full overflow-hidden rounded-2xl border border-linea"
    />
  );
}
