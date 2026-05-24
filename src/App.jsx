import { useState, useEffect, useCallback } from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { injectCSS } from "./styles";
import { Nav } from "./components/Nav";
import { HomePage } from "./pages/HomePage";
import { GalleryPage } from "./pages/GalleryPage";
import { BookingPage } from "./pages/BookingPage";
import { AboutPage } from "./pages/AboutPage";
import { VipPage } from "./pages/VipPage";

function AppInner() {
  const [page, setPage] = useState("home");
  const go = useCallback(p => setPage(p), []);
  const { dark } = useTheme();

  useEffect(() => { injectCSS(); }, []);
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div style={{ minHeight: "100vh", background: dark ? "#070707" : "#fffdf8", transition: "background .3s" }}>
      <Nav page={page} setPage={go} />
      <div style={{ paddingTop: "80px" }}>
        {page === "home"    && <HomePage    setPage={go} />}
        {page === "gallery" && <GalleryPage setPage={go} />}
        {page === "booking" && <BookingPage setPage={go} />}
        {page === "about"   && <AboutPage   setPage={go} />}
        {page === "vip"     && <VipPage     setPage={go} />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
