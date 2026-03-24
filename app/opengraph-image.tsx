import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "5SOLA.RO — Conferințe Biblice & Resurse Teologice";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative large S watermark */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-20px",
            fontSize: "500px",
            fontWeight: 900,
            color: "rgba(255,255,255,0.025)",
            lineHeight: 1,
            fontFamily: "serif",
            userSelect: "none",
          }}
        >
          S
        </div>

        {/* Red accent line */}
        <div
          style={{
            width: "80px",
            height: "4px",
            background: "#B11F24",
            marginBottom: "28px",
          }}
        />

        {/* Main title */}
        <div
          style={{
            fontSize: "110px",
            fontWeight: 900,
            color: "white",
            lineHeight: 0.85,
            letterSpacing: "-4px",
            marginBottom: "28px",
            fontFamily: "serif",
          }}
        >
          5SOLA
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "20px",
            color: "#B11F24",
            letterSpacing: "8px",
            textTransform: "uppercase",
            marginBottom: "40px",
          }}
        >
          Conferințe Biblice • România
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "22px",
            color: "#666666",
            maxWidth: "680px",
            lineHeight: 1.5,
          }}
        >
          Resurse teologice ancorate în cele 5 Sola ale Reformei Protestante
        </div>

        {/* Domain badge */}
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "80px",
            background: "#B11F24",
            color: "white",
            padding: "12px 24px",
            fontSize: "18px",
            letterSpacing: "2px",
            fontWeight: 700,
          }}
        >
          5SOLA.RO
        </div>
      </div>
    ),
    { ...size }
  );
}
