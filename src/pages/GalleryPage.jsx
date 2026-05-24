import { useState } from "react";
import { useC } from "../ThemeContext";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { Label, Btn, Masonry, Footer } from "../components/UI";
import { GALLERY } from "../data";

export const GalleryPage = ({ setPage }) => {
  const [cat, setCat] = useState("wedding");
  const C = useC();
  const { isMobile, isTablet } = useBreakpoint();
  const sm = isMobile || isTablet;
  const data = GALLERY[cat];
  const tabs = [
    { id: "wedding",    icon: "💍", label: "Weddings" },
    { id: "graduation", icon: "🎓", label: "Graduation" },
    { id: "special",    icon: "✨", label: "Special" },
  ];

  return (
    <div className="page-enter">
      <div style={{ textAlign: "center", padding: sm ? "2.5rem 1.2rem 1.5rem" : "3.5rem 2rem 2rem" }}>
        <Label c>Portfolio</Label>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: isMobile ? "1.9rem" : "clamp(2.3rem,5vw,3.7rem)", color: C.cream, marginTop: "7px" }}>
          A Gallery of <em style={{ color: C.gold, fontStyle: "italic" }}>Memories</em>
        </h2>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", justifyContent: "center", maxWidth: sm ? "95vw" : "620px", margin: "0 auto", border: `1px solid ${C.gold}3e` }}>
        {tabs.map((t, i) => (
          <button key={t.id} onClick={() => setCat(t.id)} style={{
            flex: 1, padding: isMobile ? ".8rem .3rem" : ".88rem .9rem",
            background: cat === t.id ? C.gold : "transparent",
            border: "none", borderLeft: i > 0 ? `1px solid ${C.gold}3e` : "none",
            color: cat === t.id ? "#070707" : C.beigeDark,
            fontSize: isMobile ? ".62rem" : ".7rem", letterSpacing: isMobile ? "1px" : "2px",
            textTransform: "uppercase", fontWeight: 600, transition: "all .3s",
          }}>
            <span style={{ display: "block", fontSize: isMobile ? "1rem" : ".9rem" }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Banner */}
      <div style={{ height: sm ? "28vh" : "40vh", position: "relative", overflow: "hidden", margin: "1.5rem 0 2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={data.banner} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.3) sepia(.2)" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 1.2rem" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? "2.2rem" : "3.8rem", fontWeight: 300, fontStyle: "italic", color: "#f4efe6" }}>{data.title}</h2>
          <p style={{ color: C.gold, letterSpacing: "4px", fontSize: ".65rem", textTransform: "uppercase", marginTop: "7px" }}>{data.subtitle}</p>
        </div>
      </div>

      <Masonry photos={data.photos} />
      <div style={{ textAlign: "center", paddingBottom: "4rem" }}>
        <Btn onClick={() => setPage("booking")}>Book Your Session</Btn>
      </div>
      <Footer />
    </div>
  );
};
