import { ImageResponse } from "next/og";
import { BUSINESS, SITE_NAME } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${SITE_NAME} — registered tax agent and public accountant in Mount Isa`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Built from the logo-sampled palette. No remote fonts or images, so this
// renders identically wherever it is generated.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#030202",
          padding: "72px 80px",
        }}
      >
        {/* Crest stripe. Satori rejects radial-gradient here ("unsupported
            image format"), so the accent is flat geometry instead. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 14,
            height: "100%",
            background: "#e00101",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 14,
            width: 6,
            height: "100%",
            background: "#b8c72c",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              color: "#b8c72c",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            <div style={{ width: 56, height: 3, background: "#b8c72c", display: "flex" }} />
            Mount Isa, Queensland
          </div>
          <div
            style={{
              marginTop: 30,
              fontSize: 76,
              lineHeight: 1.08,
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Maximise your returns.</span>
            <span style={{ color: "#b8c72c" }}>Minimise your tax.</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ height: 1, background: "rgba(217,222,223,0.22)", display: "flex" }} />
          <div
            style={{
              marginTop: 26,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#d9dedf",
                fontSize: 26,
              }}
            >
              <span style={{ color: "#ffffff", fontSize: 30, fontWeight: 700 }}>
                {SITE_NAME}
              </span>
              <span style={{ marginTop: 8 }}>
                Registered tax agent &amp; public accountant
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#e00101",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: 26,
                padding: "16px 28px",
                letterSpacing: 1,
              }}
            >
              {BUSINESS.phone}
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
