import { useState } from "react";
import { useC } from "../ThemeContext";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { Label, Btn, Deco, Footer } from "../components/UI";

const ContactRow = ({ icon, label, value, href }) => {
  const [h, setH] = useState(false);
  const C = useC();
  return (
    <a
      href={href}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "flex", alignItems: "center", gap: ".9rem",
        padding: ".82rem 1.1rem",
        border: `1px solid ${h ? C.gold : `${C.gold}22`}`,
        background: h ? `${C.gold}07` : "transparent",
        transition: "all .3s",
      }}
    >
      <div style={{ width: "34px", height: "34px", border: `1px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".95rem", color: C.gold, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: ".57rem", letterSpacing: "2px", color: C.gold, textTransform: "uppercase" }}>{label}</div>
        <div style={{ color: C.cream, fontSize: ".84rem", marginTop: "2px" }}>{value}</div>
      </div>
    </a>
  );
};

export const AboutPage = ({ setPage }) => {
  const C = useC();
  const { isMobile, isTablet } = useBreakpoint();
  const sm = isMobile || isTablet;

  const contacts = [
    { icon: "📞", label: "Phone / WhatsApp", value: "+966 51 234 5678",   href: "tel:+966512345678" },
    { icon: "✉️", label: "Email",            value: "studio@lenslight.sa", href: "mailto:studio@lenslight.sa" },
    { icon: "📸", label: "Instagram",        value: "@lenslight.photo",    href: "#" },
    { icon: "🎬", label: "TikTok",           value: "@lenslight.official", href: "#" },
  ];

  const awards = [
    { year: "500+", title: "Sessions Completed",        org: "Since 2017 to present" },
    { year: "200+", title: "Weddings Documented",       org: "In a refined, distinctive style" },
    { year: "2023", title: "Best Wedding Photographer", org: "Riyadh Photography Exhibition" },
  ];

  return (
    <div className="page-enter">
      {/* Hero grid */}
      <div style={{ display: "grid", gridTemplateColumns: sm ? "1fr" : "1fr 1fr", maxWidth: "1380px", margin: "0 auto", padding: sm ? "2.5rem 1.2rem" : "3.5rem 5rem", gap: sm ? "2.5rem" : "6rem", alignItems: "center" }}>
        {/* Photo */}
        <div style={{ position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=900&q=80"
            alt="Mohammed Al-Rashid"
            style={{ width: "100%", height: sm ? "300px" : "580px", objectFit: "cover", objectPosition: "top", filter: "sepia(.08) brightness(.88)" }}
          />
          {!isMobile && <div style={{ position: "absolute", bottom: "-15px", right: "-15px", width: "150px", height: "150px", border: `1px solid ${C.gold}`, zIndex: -1 }} />}
          <div style={{ position: "absolute", bottom: "1.3rem", left: "1.3rem", background: "rgba(7,7,7,.75)", padding: ".35rem .75rem", fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: sm ? ".88rem" : "1.05rem", color: "#f4efe6", backdropFilter: "blur(4px)" }}>
            Mohammed Al-Rashid — Photographer
          </div>
        </div>

        {/* Text */}
        <div>
          <Label>About the Photographer</Label>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: sm ? "2.4rem" : "3.3rem", fontWeight: 300, lineHeight: 1.05, color: C.cream, margin: ".5rem 0 1.4rem" }}>
            Mohammed <span style={{ color: C.gold, fontStyle: "italic" }}>Al-Rashid</span>
          </h1>
          <div style={{ width: "48px", height: "1px", background: C.gold, marginBottom: "1.4rem" }} />

          {[
            "Through my lens, I see the world differently — in every fleeting moment, I find a story worth preserving, and in every smile, a light that deserves to last forever.",
            "With over 8 years of passion-driven photography, I've specialized in weddings, special occasions, and graduation portraits. I believe the truest photograph is captured by the heart before the camera.",
            "Studied Visual Arts Photography at the Dubai Institute of Arts. Worked with hundreds of families to document their most cherished moments with elegance and intention.",
          ].map((t, i) => (
            <p key={i} style={{ color: C.beigeDark, lineHeight: 1.95, fontSize: ".87rem", marginBottom: "1rem" }}>
              {i === 1
                ? <><span>With over </span><strong style={{ color: C.gold }}>8 years</strong><span>{" of passion-driven photography, I've specialized in weddings, special occasions, and graduation portraits. I believe the truest photograph is captured by the heart before the camera."}</span></>
                : t}
            </p>
          ))}

          <div style={{ width: "48px", height: "1px", background: C.gold, marginBottom: "1.4rem", marginTop: ".4rem" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            {contacts.map(c => <ContactRow key={c.label} {...c} />)}
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div style={{ background: C.surface2, borderTop: `1px solid ${C.gold}1e`, padding: sm ? "3rem 1.2rem" : "5rem", maxWidth: "1380px", margin: "0 auto", transition: "background .3s" }}>
        <div style={{ textAlign: "center" }}>
          <Label c>Milestones</Label>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: isMobile ? "1.9rem" : "clamp(2.1rem,4vw,3.3rem)", color: C.cream, marginTop: "7px" }}>
            Numbers That Tell <em style={{ color: C.gold, fontStyle: "italic" }}>My Story</em>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: "1.3rem", marginTop: "2.3rem" }}>
          {awards.map(a => (
            <div
              key={a.title}
              style={{ border: `1px solid ${C.gold}28`, padding: "1.8rem", textAlign: "center", transition: "border-color .3s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.gold}
              onMouseLeave={e => e.currentTarget.style.borderColor = `${C.gold}28`}
            >
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.3rem", fontWeight: 300, color: C.gold, marginBottom: ".3rem" }}>{a.year}</div>
              <div style={{ color: C.cream, fontSize: ".83rem", fontWeight: 600, marginBottom: ".22rem" }}>{a.title}</div>
              <div style={{ color: C.muted, fontSize: ".72rem" }}>{a.org}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <div style={{ textAlign: "center", padding: sm ? "4rem 1.5rem" : "6rem 2rem", maxWidth: "700px", margin: "0 auto" }}>
        <Label c>My Philosophy</Label>
        <Deco />
        <blockquote style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? "1.45rem" : "1.85rem", fontStyle: "italic", fontWeight: 300, color: C.cream, lineHeight: 1.65 }}>
          "A photograph is not just light and shadow — it is the <em style={{ color: C.gold }}>soul of a moment</em> that remains alive long after time has passed."
        </blockquote>
        <Deco />
        <div style={{ marginTop: "2.5rem" }}>
          <Btn onClick={() => setPage("booking")}>Book a Session</Btn>
        </div>
      </div>

      <Footer />
    </div>
  );
};
