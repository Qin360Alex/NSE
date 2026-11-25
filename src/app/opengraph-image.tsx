import { ImageResponse } from "next/og";

export const alt = "Swath: the NSE, made simple. A plain-language study desk for the Nairobi Securities Exchange.";
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
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 15% 0%, #2a2418 0%, #0b111a 45%, #070b12 100%)",
          color: "#eef3f8",
          position: "relative",
        }}
      >
        <svg
          width="620"
          height="620"
          viewBox="0 0 400 400"
          style={{ position: "absolute", right: -60, top: 40 }}
        >
          <path d="M28 372A176 176 0 0 1 292 90" fill="none" stroke="#a8dbff" strokeWidth="9" strokeOpacity="0.35" strokeLinecap="round" />
          <path d="M330 128A176 176 0 0 1 380 372" fill="none" stroke="#a8dbff" strokeWidth="9" strokeOpacity="0.35" strokeLinecap="round" />
          <path d="M40 350 396 36 254 372Z" fill="#a8dbff" fillOpacity="0.08" />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="84" height="56" viewBox="0 0 120 80">
            <path d="M8 72A52 52 0 0 1 86 26" fill="none" stroke="#a8dbff" strokeWidth="6" strokeLinecap="round" />
            <path d="M99 38A52 52 0 0 1 112 72" fill="none" stroke="#a8dbff" strokeWidth="6" strokeLinecap="round" />
            <path d="M117 7L10 68L66 72Z" fill="#ffffff" />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: 6 }}>SWATH</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>The NSE,</div>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.05, letterSpacing: -3 }}>made simple.</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#93a3b5" }}>
            Learn the Nairobi Securities Exchange in plain language.
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 22, color: "#a8dbff" }}>
          <div style={{ display: "flex", border: "1px solid rgba(168,219,255,0.45)", borderRadius: 999, padding: "8px 20px" }}>
            8 short lessons
          </div>
          <div style={{ display: "flex", border: "1px solid rgba(233,184,114,0.45)", borderRadius: 999, padding: "8px 20px", color: "#e9b872" }}>
            Education only
          </div>
        </div>
      </div>
    ),
    size,
  );
}
