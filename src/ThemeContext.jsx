import { createContext, useContext, useState, useEffect } from "react";

const ThemeCtx = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("ll-theme");
    return saved ? saved === "dark" : true; // default dark
  });

  useEffect(() => {
    localStorage.setItem("ll-theme", dark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  const toggle = () => setDark(d => !d);
  return <ThemeCtx.Provider value={{ dark, toggle }}>{children}</ThemeCtx.Provider>;
};

export const useTheme = () => useContext(ThemeCtx);

// ─── DYNAMIC TOKENS ──────────────────────────────────────────────
export const useC = () => {
  const { dark } = useTheme();
  return dark ? DARK : LIGHT;
};

const DARK = {
  black:      "#070707",
  charcoal:   "#111111",
  charcoal2:  "#1a1a1a",
  cream:      "#f4efe6",
  beige:      "#e6d9c4",
  beigeDark:  "#c4ae8e",
  gold:       "#c9a86c",
  goldLight:  "#e8d4a4",
  muted:      "#6a6055",
  red:        "#c0392b",
  bg:         "#070707",
  surface:    "#111111",
  surface2:   "#1a1a1a",
  text:       "#f4efe6",
  border:     "#c9a86c",
  navBg:      "rgba(7,7,7,.92)",
};

const LIGHT = {
  black:      "#1a0f00",
  charcoal:   "#faf7f2",
  charcoal2:  "#f0ebe0",
  cream:      "#2c1e0f",
  beige:      "#3d2b14",
  beigeDark:  "#6b4c1e",
  gold:       "#a07828",
  goldLight:  "#c9a86c",
  muted:      "#8a7560",
  red:        "#b83030",
  bg:         "#fffdf8",
  surface:    "#faf7f2",
  surface2:   "#f0ebe0",
  text:       "#2c1e0f",
  border:     "#a07828",
  navBg:      "rgba(255,253,248,.94)",
};
