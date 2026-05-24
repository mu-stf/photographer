import { useState } from "react";
import { useC } from "../ThemeContext";
import { useBreakpoint } from "../hooks/useBreakpoint";

export const Label = ({ c, children }) => {
  const C = useC();
  return (
    <p style={{
      fontSize: ".63rem", letterSpacing: "5px", color: C.gold,
      textTransform: "uppercase", fontWeight: 500,
      textAlign: c ? "center" : undefined, marginBottom: "6px"
    }}>{children}</p>
  );
};

export const Deco = () => {
  const C = useC();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "16px 0" }}>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg,transparent,${C.gold}55,transparent)` }} />
      <span style={{ color: C.gold, fontSize: ".88rem" }}>✦</span>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg,transparent,${C.gold}55,transparent)` }} />
    </div>
  );
};

export const Btn = ({ children, onClick, outline, full }) => {
  const [h, setH] = useState(false);
  const C = useC();
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        padding: ".83rem 2.6rem", fontSize: ".71rem", letterSpacing: "3px",
        textTransform: "uppercase", fontWeight: 600,
        border: outline ? `1px solid ${C.gold}` : "none",
        transition: "all .3s", width: full ? "100%" : undefined,
        background: outline ? (h ? C.gold : "transparent") : (h ? C.goldLight : C.gold),
        color: outline ? (h ? C.black : C.beigeDark) : C.black,
      }}
    >{children}</button>
  );
};

export const Footer = () => {
  const C = useC();
  return (
    <footer style={{ background: C.surface, borderTop: `1px solid ${C.gold}18`, textAlign: "center", padding: "3rem 1.5rem", transition: "background .3s" }}>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.9rem", fontStyle: "italic", color: C.gold, marginBottom: "7px" }}>Lens & Light</div>
      <p style={{ color: C.muted, fontSize: ".68rem", letterSpacing: "1px" }}>© 2025 Lens & Light Photography — All Rights Reserved</p>
    </footer>
  );
};

export const Masonry = ({ photos }) => {
  const C = useC();
  const { isMobile, isTablet } = useBreakpoint();
  const cols = isMobile ? 1 : isTablet ? 2 : 3;
  const columns = Array.from({ length: cols }, () => []);
  photos.forEach((p, i) => columns[i % cols].push(p));

  return (
    <div style={{
      display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`,
      gap: "9px", padding: `0 ${isMobile ? "12px" : "22px"} 44px`,
      maxWidth: "1440px", margin: "0 auto"
    }}>
      {columns.map((col, ci) => (
        <div key={ci} style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
          {col.map((p, pi) => (
            <div key={pi} className="img-card" style={{ position: "relative", overflow: "hidden" }}>
              <img src={p.src} alt={p.caption} style={{ width: "100%", filter: "brightness(.84) sepia(.07)" }} loading="lazy" />
              <div className="ov" style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top,rgba(7,7,7,.85),transparent 55%)",
                display: "flex", alignItems: "flex-end", padding: "13px"
              }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontStyle: "italic", color: "#f4efe6" }}>{p.caption}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
