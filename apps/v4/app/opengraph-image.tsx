import { ImageResponse } from "next/og"

import { MoonwitnessMark } from "@/components/moonwitness-mark"

export const alt =
  "Moonwitness UI — The Interface Language of a Living Knowledge Ecosystem"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 82% 20%, #302044 0%, #13101d 35%, #07060b 78%)",
          color: "#f7f4ec",
          fontFamily: "Arial, sans-serif",
          padding: "76px",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-90px",
            top: "-170px",
            width: "650px",
            height: "650px",
            border: "1px solid rgba(255,212,0,0.22)",
            borderRadius: "50%",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "15px",
            top: "-85px",
            width: "480px",
            height: "480px",
            border: "1px solid rgba(0,212,255,0.16)",
            borderRadius: "50%",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "58px",
                height: "58px",
                borderRadius: "16px",
                background: "#07060b",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
<MoonwitnessMark size={42} />
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "25px",
                letterSpacing: "2px",
                fontWeight: 700,
              }}
            >
              MOONWITNESS UI
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "22px",
              maxWidth: "900px",
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#ffd400",
                fontSize: "20px",
                letterSpacing: "5px",
                fontWeight: 700,
              }}
            >
              THE INTERFACE LANGUAGE OF A LIVING KNOWLEDGE ECOSYSTEM
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "76px",
                lineHeight: 1.02,
                fontWeight: 700,
                letterSpacing: "-3px",
              }}
            >
              <span>Observe.</span>
              <span>Understand.</span>
              <span>Preserve.</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#9e96b0",
              fontSize: "18px",
            }}
          >
            <span>Evidence-First Moonpunk</span>
            <span>One ecosystem. Different experiences. Shared principles.</span>
          </div>
        </div>
      </div>
    ),
    size
  )
}
