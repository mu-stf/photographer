import { useState } from "react";
import { useC, useTheme } from "../ThemeContext";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { Deco } from "./UI";

// ─── THEME TOGGLE BUTTON ─────────────────────────────────────────
const ThemeToggle = () => {
  const { dark, toggle } = useTheme();
  const C = useC();
  const [h, setH] = useState(false);
  return (
    <button
      onClick={toggle}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      style={{
        background: h ? `${C.gold}22` : "transparent",
        border: `1px solid ${C.gold}55`,
        color: C.gold,
        width: "36px", height: "36px",
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1rem",
        transition: "all .25s",
        flexShrink: 0,
      }}
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
};

export const Nav = ({ page, setPage }) => {
  const [open, setOpen] = useState(false);
  const C = useC();
  const { dark } = useTheme();
  const { isMobile, isTablet } = useBreakpoint();
  const mobile = isMobile || isTablet;

  const links = [
    { id: "home",    label: "Home" },
    { id: "gallery", label: "Portfolio" },
    { id: "vip",     label: "✦ VIP", vip: true },
    { id: "booking", label: "Book a Session" },
    { id: "about",   label: "About" },
  ];

  const go = id => { setPage(id); setOpen(false); };

  return (
    <>
      <nav style={{
        position: "fixed", inset: "0 0 auto", zIndex: 1000,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: mobile ? "1.1rem 1.25rem" : "1.35rem 4.5rem",
        background: C.navBg,
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${C.gold}1a`,
        transition: "background .3s",
        gap: "1rem",
      }}>
        {/* Logo */}
        <div
          onClick={() => go("home")}
          style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.7rem", fontStyle: "italic", color: C.gold, letterSpacing: "2px", cursor: "pointer", userSelect: "none", flexShrink: 0 }}
        >
          Lens & Light
        </div>

        {mobile ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ThemeToggle />
            <button
              onClick={() => setOpen(o => !o)}
              style={{ background: "transparent", border: `1px solid ${C.gold}55`, color: C.gold, padding: "6px 11px", fontSize: "1.05rem", transition: "all .25s" }}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}>
              {links.map(l => (
                <li key={l.id}>
                  <span
                    onClick={() => go(l.id)}
                    style={{
                      fontSize: ".73rem", letterSpacing: "2.5px", textTransform: "uppercase",
                      fontWeight: 500, cursor: "pointer", transition: "color .3s",
                      color: page === l.id ? C.gold : C.beigeDark,
                      borderBottom: page === l.id ? `1px solid ${C.gold}` : "1px solid transparent",
                      paddingBottom: "2px",
                    }}
                  >{l.label}</span>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>
        )}
      </nav>

      {/* Mobile Drawer */}
      {mobile && open && <>
        <div
          onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 998, background: dark ? "rgba(7,7,7,.65)" : "rgba(200,190,175,.7)", backdropFilter: "blur(3px)" }}
        />
        <div className="menu-enter" style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(270px,80vw)", zIndex: 999,
          background: C.surface, borderLeft: `1px solid ${C.gold}22`,
          display: "flex", flexDirection: "column", paddingTop: "78px",
          transition: "background .3s",
        }}>
          {links.map(l => (
            <span
              key={l.id}
              onClick={() => go(l.id)}
              style={{
                padding: "1.15rem 1.8rem", borderBottom: `1px solid ${C.gold}12`,
                fontSize: ".8rem", letterSpacing: "3px", textTransform: "uppercase",
                fontWeight: 500, cursor: "pointer",
                color: page === l.id ? C.gold : C.cream,
                background: page === l.id ? `${C.gold}0f` : "transparent",
                transition: "all .2s",
              }}
            >{l.label}</span>
          ))}
          <div style={{ padding: "2rem", marginTop: "auto" }}>
            <Deco />
            <p style={{ color: C.muted, fontSize: ".68rem", letterSpacing: "1px" }}>© 2025 Lens & Light</p>
          </div>
        </div>
      </>}
    </>
  );
};
