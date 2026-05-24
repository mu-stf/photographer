import { useState } from "react";
import { useC } from "../ThemeContext";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { Label, Btn, Deco, Footer } from "../components/UI";
import { VIP_PACKAGES, LOCATIONS } from "../data";

// ─── PACKAGE CARD ─────────────────────────────────────────────────
const PkgCard = ({ pkg, onBook }) => {
  const C = useC();
  const [h, setH] = useState(false);
  const isGold = pkg.id === "gold";
  const isDiam = pkg.id === "diamond";

  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        position: "relative", overflow: "hidden",
        border: isDiam
          ? `1.5px solid ${C.gold}`
          : isGold
          ? `1px solid ${C.gold}88`
          : `1px solid ${C.gold}33`,
        background: isDiam
          ? `linear-gradient(160deg,${C.surface2},${C.gold}0d)`
          : C.surface2,
        transition: "transform .3s, box-shadow .3s",
        transform: h ? "translateY(-6px)" : "translateY(0)",
        boxShadow: h ? `0 18px 48px ${C.gold}18` : "none",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Cover */}
      <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
        <img
          src={pkg.cover}
          alt={pkg.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.55) sepia(.15)", transition: "transform .6s", transform: h ? "scale(1.07)" : "scale(1)" }}
        />
        {/* Badge */}
        <div style={{ position: "absolute", top: "12px", right: "12px", background: C.gold, color: "#070707", fontSize: ".52rem", letterSpacing: "2.5px", fontWeight: 700, padding: "4px 10px" }}>
          {pkg.badge}
        </div>
        {/* Icon */}
        <div style={{ position: "absolute", bottom: "-22px", left: "50%", transform: "translateX(-50%)", width: "44px", height: "44px", background: C.surface2, border: `1px solid ${C.gold}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", borderRadius: "50%", zIndex: 2 }}>
          {pkg.icon}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "2.2rem 1.6rem 1.6rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 300, color: C.cream, textAlign: "center", marginBottom: ".2rem" }}>{pkg.name}</p>

        {/* Meta row */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1.3rem", margin: ".7rem 0 1.2rem", flexWrap: "wrap" }}>
          {[["⏱", pkg.duration], ["📷", pkg.photos]].map(([ic, v]) => (
            <span key={v} style={{ fontSize: ".68rem", color: C.beigeDark, letterSpacing: "1px" }}>{ic} {v}</span>
          ))}
        </div>

        <Deco />

        {/* Features */}
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".55rem", marginBottom: "1.5rem", flex: 1 }}>
          {pkg.features.map(f => (
            <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: ".6rem", fontSize: ".78rem", color: C.beigeDark }}>
              <span style={{ color: C.gold, marginTop: "1px", flexShrink: 0 }}>✦</span>
              {f}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div style={{ textAlign: "center", marginTop: "auto" }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.6rem", fontWeight: 300, color: C.gold, lineHeight: 1, marginBottom: ".15rem" }}>
            ${pkg.price.toLocaleString()}
          </div>
          <p style={{ fontSize: ".58rem", letterSpacing: "2px", color: C.muted, marginBottom: "1.2rem" }}>STARTING PRICE · LOCATION EXTRA</p>
          <Btn onClick={() => onBook(pkg)} full={false}>Book This Package</Btn>
        </div>
      </div>
    </div>
  );
};

// ─── LOCATION CARD ────────────────────────────────────────────────
const LocCard = ({ loc }) => {
  const C = useC();
  return (
    <div style={{ border: `1px solid ${C.gold}22`, padding: "1.1rem 1.3rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".8rem", transition: "border-color .2s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = `${C.gold}88`}
      onMouseLeave={e => e.currentTarget.style.borderColor = `${C.gold}22`}
    >
      <div>
        <div style={{ color: C.cream, fontSize: ".85rem", fontWeight: 500, marginBottom: ".2rem" }}>📍 {loc.name}</div>
        <div style={{ color: C.muted, fontSize: ".7rem" }}>{loc.desc}</div>
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", color: C.gold, whiteSpace: "nowrap", flexShrink: 0 }}>
        {loc.price > 0 ? `+$${loc.price}` : "TBD"}
      </div>
    </div>
  );
};

// ─── VIP PAGE ─────────────────────────────────────────────────────
export const VipPage = ({ setPage }) => {
  const C = useC();
  const { isMobile, isTablet } = useBreakpoint();
  const sm = isMobile || isTablet;

  const handleBook = (pkg) => {
    // Navigate to booking and pass VIP package info via sessionStorage
    sessionStorage.setItem("vip_package", JSON.stringify(pkg));
    setPage("booking");
  };

  return (
    <div className="page-enter">
      {/* HERO */}
      <div style={{ position: "relative", textAlign: "center", padding: sm ? "5rem 1.2rem 3rem" : "7rem 2rem 4rem", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${C.gold}14 0%, transparent 70%)`, pointerEvents: "none" }} />
        <Label c>Exclusive Packages</Label>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: isMobile ? "2.8rem" : "clamp(3rem,8vw,6rem)", color: C.cream, lineHeight: .95, marginTop: ".4rem" }}>
          VIP <em style={{ color: C.gold }}>Experience</em>
        </h1>
        <p style={{ color: C.beigeDark, fontSize: isMobile ? ".82rem" : ".95rem", marginTop: "1.2rem", maxWidth: "560px", margin: "1.2rem auto 0", lineHeight: 1.8 }}>
          All-inclusive photography packages crafted for those who demand the finest — location, time, and artistry combined into one seamless experience.
        </p>
        <Deco />
      </div>

      {/* PACKAGES GRID */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: sm ? "0 1rem 3rem" : "0 2rem 4rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: "1.6rem" }}>
        {VIP_PACKAGES.map(pkg => (
          <PkgCard key={pkg.id} pkg={pkg} onBook={handleBook} />
        ))}
      </div>

      {/* LOCATIONS SECTION */}
      <div style={{ background: C.surface2, borderTop: `1px solid ${C.gold}18`, borderBottom: `1px solid ${C.gold}18`, padding: sm ? "3rem 1rem" : "5rem 2rem", transition: "background .3s" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <Label c>Scenic Venues</Label>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: isMobile ? "2rem" : "clamp(2.2rem,5vw,3.4rem)", color: C.cream, marginTop: ".4rem" }}>
              Choose Your <em style={{ color: C.gold }}>Perfect Location</em>
            </h2>
            <p style={{ color: C.beigeDark, fontSize: ".83rem", marginTop: ".8rem" }}>Each location fee is added to your selected package price</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: ".8rem" }}>
            {LOCATIONS.map(loc => <LocCard key={loc.id} loc={loc} />)}
          </div>
        </div>
      </div>

      {/* COMPARISON NOTE */}
      <div style={{ textAlign: "center", padding: sm ? "3.5rem 1.2rem" : "5rem 2rem", maxWidth: "680px", margin: "0 auto" }}>
        <Label c>How It Works</Label>
        <Deco />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", marginBottom: "2.5rem" }}>
          {[
            ["1", "Choose Package", "Select Silver, Gold, or Diamond based on your needs"],
            ["2", "Pick a Venue", "Add a scenic Baghdad location of your choice"],
            ["3", "Book & Confirm", "Fill in your details and we handle the rest"],
          ].map(([n, t, d]) => (
            <div key={n} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.2rem", color: C.gold, lineHeight: 1, marginBottom: ".4rem" }}>{n}</div>
              <div style={{ color: C.cream, fontSize: ".78rem", fontWeight: 600, marginBottom: ".3rem" }}>{t}</div>
              <div style={{ color: C.muted, fontSize: ".7rem", lineHeight: 1.6 }}>{d}</div>
            </div>
          ))}
        </div>
        <Btn onClick={() => setPage("booking")}>Book a Custom Session</Btn>
      </div>

      <Footer />
    </div>
  );
};
