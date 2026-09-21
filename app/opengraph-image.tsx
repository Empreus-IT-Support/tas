import { ImageResponse } from "next/og";
import { BRAND, BUSINESS, SITE_NAME, TAGLINE } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${SITE_NAME} — ${TAGLINE}, Mount Isa`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card, drawn from the brand palette in lib/site.ts.
 *
 * No remote fonts or images, so it renders identically wherever it is
 * generated. Note Satori rejects `radial-gradient` and only handles a subset
 * of layout, so the guidelines' double gold frame is drawn as four plain
 * divs rather than borders with insets — same result, no unsupported CSS.
 */
export default async function Image() {
  const frame = {
    position: "absolute" as const,
    background: BRAND.gold,
    display: "flex",
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BRAND.navy,
          padding: "84px 92px",
        }}
      >
        {/* Outer gold hairline frame — the cover treatment of the guidelines. */}
        <div style={{ ...frame, top: 28, left: 28, right: 28, height: 2 }} />
        <div style={{ ...frame, bottom: 28, left: 28, right: 28, height: 2 }} />
        <div style={{ ...frame, top: 28, left: 28, bottom: 28, width: 2 }} />
        <div style={{ ...frame, top: 28, right: 28, bottom: 28, width: 2 }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              color: BRAND.gold,
              fontSize: 21,
              letterSpacing: 7,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            <div
              style={{ width: 56, height: 1, background: BRAND.gold, display: "flex" }}
            />
            Mount Isa, Queensland
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 72,
              lineHeight: 1.1,
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Maximise your returns.</span>
            <span style={{ color: BRAND.champagne }}>Minimise your tax.</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* The diamond rule from the lockup. */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(215,162,69,0.5)",
                display: "flex",
              }}
            />
            <div
              style={{
                width: 9,
                height: 9,
                background: BRAND.gold,
                transform: "rotate(45deg)",
                display: "flex",
              }}
            />
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(215,162,69,0.5)",
                display: "flex",
              }}
            />
          </div>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: BRAND.platinum,
                fontSize: 24,
              }}
            >
              <span
                style={{
                  color: "#ffffff",
                  fontSize: 34,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                {SITE_NAME}
              </span>
              <span
                style={{
                  marginTop: 10,
                  color: BRAND.gold,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  fontSize: 20,
                }}
              >
                {TAGLINE}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: BRAND.gold,
                color: BRAND.navy,
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
