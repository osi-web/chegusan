import { ImageResponse } from "next/og";

// Tarjeta que se ve al compartir el link (WhatsApp, Twitter, etc.). Next la
// genera en build a partir de este JSX (via satori). Solo soporta flexbox y
// estilos inline — nada de grid. La imagen se cablea sola al og:image.

export const alt = "Chegusan — Sanguchería de Mar del Plata";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #fbf6ec 0%, #f4ecdb 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 104,
              height: 104,
              borderRadius: 30,
              background: "#e9a320",
              fontSize: 68,
              marginRight: 28,
            }}
          >
            🥪
          </div>
          <div style={{ fontSize: 88, fontWeight: 800, color: "#241c15" }}>Chegusan</div>
        </div>

        <div style={{ fontSize: 46, fontWeight: 700, color: "#241c15", marginTop: 44 }}>
          El sánguche que te hace decir che.
        </div>
        <div style={{ fontSize: 30, color: "#6f6154", marginTop: 16 }}>
          Sanguchería de Mar del Plata · Pedí online
        </div>

        <div style={{ display: "flex", marginTop: 52 }}>
          <div
            style={{
              display: "flex",
              background: "#e24b32",
              color: "#fbf6ec",
              fontSize: 27,
              fontWeight: 700,
              padding: "12px 30px",
              borderRadius: 999,
              marginRight: 14,
            }}
          >
            14 locales
          </div>
          <div
            style={{
              display: "flex",
              background: "#ffffff",
              color: "#241c15",
              fontSize: 27,
              fontWeight: 700,
              padding: "12px 30px",
              borderRadius: 999,
              border: "2px solid #ece2d0",
            }}
          >
            Pan casero
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
