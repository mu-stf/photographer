import { useC } from "../ThemeContext";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { Label, Btn, Masonry, Footer, Deco } from "../components/UI";
import { HOME_PHOTOS } from "../data";

export const HomePage = ({ setPage }) => {
  const C = useC();
  const { isMobile, isTablet } = useBreakpoint();
  const sm = isMobile || isTablet;

  const stats = [
    { n: "500+", l: "Sessions" },
    { n: "8+",   l: "Years Exp." },
    { n: "200+", l: "Weddings" },
    { n: "100%", l: "Satisfaction" },
  ];

  return (
    <div className="page-enter">
      {/* HERO */}
      <div style={{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginTop: "-80px" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg,rgba(7,7,7,.82) 0%,rgba(7,7,7,.2) 52%,rgba(7,7,7,.9) 100%), url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1800&q=85') center/cover no-repeat` }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 1.2rem", maxWidth: "900px", width: "100%" }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? "1rem" : "1.1rem", fontStyle: "italic", letterSpacing: "6px", color: C.gold, marginBottom: "1.3rem" }}>
            — Vision · Moment · Legacy —
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: isMobile ? "3.2rem" : isTablet ? "5rem" : "clamp(5rem,10vw,8.5rem)", color: "#f4efe6", lineHeight: .9, marginBottom: "1.7rem" }}>
            We Capture<br /><em style={{ color: C.gold, fontStyle: "italic" }}>Your Golden</em><br />Moments
          </h1>
          <p style={{ color: "#c4ae8e", fontSize: isMobile ? ".78rem" : ".9rem", letterSpacing: "2.5px", marginBottom: "2.4rem", fontWeight: 300 }}>Professional Photography That Tells Your Story</p>
          <Btn onClick={() => setPage("booking")}>Book Your Session</Btn>
        </div>
        <div style={{ position: "absolute", bottom: "2.2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", zIndex: 2 }}>
          <div className="scroll-pulse" style={{ width: "1px", height: "46px", background: `linear-gradient(${C.gold},transparent)` }} />
          <span style={{ fontSize: ".56rem", letterSpacing: "3px", textTransform: "uppercase", color: "#c4ae8e" }}>Scroll</span>
        </div>
      </div>

      {/* STATS */}
      <div style={{ background: C.surface2, borderTop: `1px solid ${C.gold}25`, borderBottom: `1px solid ${C.gold}25`, display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", transition: "background .3s" }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            textAlign: "center", padding: isMobile ? "1.8rem .8rem" : "2.8rem 1.5rem",
            borderRight: (isMobile && i % 2 === 0) || ((!isMobile) && i < 3) ? `1px solid ${C.gold}18` : "none",
            borderBottom: isMobile && i < 2 ? `1px solid ${C.gold}18` : "none",
          }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? "2rem" : "2.7rem", fontWeight: 300, color: C.gold, lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontSize: ".58rem", letterSpacing: "2.5px", textTransform: "uppercase", color: C.beigeDark, marginTop: "4px" }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* GALLERY PREVIEW */}
      <div style={{ textAlign: "center", padding: sm ? "3.5rem 1.2rem 2rem" : "5rem 2rem 2.5rem" }}>
        <Label c>Featured Work</Label>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: isMobile ? "1.9rem" : "clamp(2.3rem,5vw,3.7rem)", color: C.cream, marginTop: "7px" }}>
          Every Frame Tells a <em style={{ color: C.gold, fontStyle: "italic" }}>Story</em>
        </h2>
      </div>
      <Masonry photos={HOME_PHOTOS} />
      <div style={{ textAlign: "center", paddingBottom: "4rem" }}>
        <Btn outline onClick={() => setPage("gallery")}>View Full Portfolio</Btn>
      </div>

      {/* CTA */}
      <div style={{ background: C.surface2, borderTop: `1px solid ${C.gold}1e`, borderBottom: `1px solid ${C.gold}1e`, textAlign: "center", padding: sm ? "3.5rem 1.2rem" : "5rem 2rem", transition: "background .3s" }}>
        <Label c>Limited Slots Available</Label>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: isMobile ? "1.8rem" : "clamp(2.1rem,4.5vw,3.3rem)", color: C.cream, margin: ".6rem 0 .9rem" }}>
          Ready to Document <em style={{ color: C.gold, fontStyle: "italic" }}>Your Story?</em>
        </h2>
        <p style={{ color: C.beigeDark, fontSize: ".86rem", marginBottom: "1.9rem" }}>Only 4 booking slots per day — secure yours before they're gone.</p>
        <Btn onClick={() => setPage("booking")}>Book Now</Btn>
      </div>

      <Footer />
    </div>
  );
};
