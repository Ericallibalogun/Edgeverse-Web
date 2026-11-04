import { ImageResponse } from "next/og";

export const alt = "EBSL | Empowering Businesses Through Strategic Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72,
        background: "#001A33", color: "#fff", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, fontWeight: 700, color: "#A9B8CC" }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: "#FFB81C" }} /> EDGEVERVE BUSINESS SOLUTIONS
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1, letterSpacing: -3, maxWidth: 980 }}>
          Empowering Businesses Through Strategic Technology
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#A9B8CC" }}>Infrastructure · Consulting · Cybersecurity · Agentic AI · Phlyp Pay</div>
      </div>
    ),
    size,
  );
}
