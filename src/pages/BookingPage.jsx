import { useState } from "react";
import { useC } from "../ThemeContext";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { Label, Btn, Deco, Footer } from "../components/UI";
import { LOCATIONS } from "../data";

// ─── INPUT STYLES (theme-aware) ──────────────────────────────────
const makeIBase = C => ({
  background: C.surface2, border: `1px solid ${C.gold}28`,
  color: C.cream, padding: ".7rem .9rem", fontSize: ".86rem",
  outline: "none", width: "100%", transition: "border-color .3s, background .3s",
});
const makeIErr = C => ({ ...makeIBase(C), border: `1px solid ${C.red}` });

const Field = ({ label, req, full, err, children }) => {
  const C = useC();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".3rem", gridColumn: full ? "1/-1" : undefined }}>
      <label style={{ fontSize: ".58rem", letterSpacing: "2px", color: err ? C.red : C.gold, textTransform: "uppercase" }}>
        {label}{req && <span style={{ color: C.red, marginLeft: "2px" }}>*</span>}
      </label>
      {children}
    </div>
  );
};

// ─── CALENDAR ────────────────────────────────────────────────────
const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const CDay = ({ day, past, full, sel, avail, onClick }) => {
  const [h, setH] = useState(false);
  const C = useC();
  const off = past || full;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => !off && setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        textAlign: "center", padding: ".4rem .1rem", fontSize: ".73rem",
        cursor: off ? "not-allowed" : "pointer",
        border: sel ? "none" : `1px solid ${h && !off ? C.gold : "transparent"}`,
        background: sel ? C.gold : "transparent",
        color: sel ? "#070707" : past ? C.muted : full ? C.muted + "88" : h ? C.gold : C.cream,
        transition: "all .18s", userSelect: "none",
      }}
    >
      {day}
      {!past && <span style={{ display: "block", fontSize: ".42rem", color: sel ? "#070707" : full ? C.red : C.gold, marginTop: "1px" }}>{full ? "Full" : `${avail}✓`}</span>}
    </div>
  );
};

const Calendar = ({ bookedMap, selectedDate, onSelect }) => {
  const [cur, setCur] = useState(new Date());
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const C = useC();
  const y = cur.getFullYear(), m = cur.getMonth();
  const key = d => `${y}-${m}-${d}`;
  const { isMobile } = useBreakpoint();

  const go = dir => {
    const n = new Date(y, m + dir, 1);
    if (n >= new Date(today.getFullYear(), today.getMonth(), 1)) setCur(n);
  };

  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();

  return (
    <div style={{ background: C.surface2, border: `1px solid ${C.gold}28`, padding: isMobile ? "1rem" : "1.4rem", marginBottom: "1.4rem", transition: "background .3s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".9rem" }}>
        <button onClick={() => go(-1)} style={{ background: "transparent", border: `1px solid ${C.gold}55`, color: C.gold, width: "28px", height: "28px", fontSize: "1.1rem" }}>‹</button>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? "1rem" : "1.2rem", color: C.cream }}>{MONTHS_EN[m]} {y}</span>
        <button onClick={() => go(1)} style={{ background: "transparent", border: `1px solid ${C.gold}55`, color: C.gold, width: "28px", height: "28px", fontSize: "1.1rem" }}>›</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "2px" }}>
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: ".52rem", letterSpacing: "1px", color: C.gold, padding: ".28rem 0", textTransform: "uppercase" }}>{d}</div>
        ))}
        {Array.from({ length: first }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: days }).map((_, i) => {
          const d = i + 1, dt = new Date(y, m, d); dt.setHours(0, 0, 0, 0);
          const past = dt < today, used = bookedMap[key(d)] || 0, avail = 4 - used, full = avail <= 0;
          const sel = selectedDate && selectedDate.getFullYear() === y && selectedDate.getMonth() === m && selectedDate.getDate() === d;
          return <CDay key={d} day={d} past={past} full={full} sel={sel} avail={avail} onClick={() => !past && !full && onSelect(new Date(y, m, d), avail)} />;
        })}
      </div>
    </div>
  );
};

// ─── LOCATION SELECTOR ───────────────────────────────────────────
const LocationSelector = ({ selected, onSelect }) => {
  const C = useC();
  const { isMobile } = useBreakpoint();
  return (
    <div style={{ marginBottom: "1.4rem" }}>
      <p style={{ fontSize: ".58rem", letterSpacing: "2px", color: C.gold, textTransform: "uppercase", marginBottom: ".55rem" }}>
        📍 Venue Location <span style={{ color: C.muted, fontWeight: 400 }}>(Optional — adds to total)</span>
      </p>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: ".5rem" }}>
        {LOCATIONS.map(loc => {
          const sel = selected?.id === loc.id;
          return (
            <div
              key={loc.id}
              onClick={() => onSelect(sel ? null : loc)}
              style={{
                padding: ".65rem .9rem", cursor: "pointer",
                border: sel ? `1px solid ${C.gold}` : `1px solid ${C.gold}25`,
                background: sel ? `${C.gold}10` : "transparent",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                transition: "all .2s",
              }}
            >
              <div>
                <div style={{ fontSize: ".75rem", color: sel ? C.gold : C.cream, fontWeight: sel ? 600 : 400 }}>
                  {sel ? "✓ " : ""}{loc.name}
                </div>
                <div style={{ fontSize: ".62rem", color: C.muted, marginTop: "1px" }}>{loc.desc}</div>
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", color: C.gold, flexShrink: 0, marginLeft: ".5rem" }}>
                {loc.price > 0 ? `+$${loc.price}` : "TBD"}
              </div>
            </div>
          );
        })}
      </div>
      {selected && (
        <p style={{ fontSize: ".66rem", color: C.muted, marginTop: "5px" }}>
          Selected: <strong style={{ color: C.gold }}>{selected.name}</strong>{selected.price > 0 ? ` (+$${selected.price})` : " (price TBD)"}
        </p>
      )}
    </div>
  );
};

// ─── BOOKING PAGE ────────────────────────────────────────────────
export const BookingPage = ({ setPage }) => {
  const C = useC();
  const { isMobile, isTablet } = useBreakpoint();
  const sm = isMobile || isTablet;

  // Check if coming from VIP page
  const vipPkg = (() => { try { return JSON.parse(sessionStorage.getItem("vip_package") || "null"); } catch { return null; } })();

  const [booked, setBooked]     = useState({});
  const [selDate, setSelDate]   = useState(null);
  const [tix, setTix]           = useState(1);
  const [avail, setAvail]       = useState(4);
  const [selLoc, setSelLoc]     = useState(null);
  const [form, setForm]         = useState({ name: "", phone: "", address: "", occasion: vipPkg ? `VIP – ${vipPkg.name}` : "", email: "", notes: "" });
  const [file, setFile]         = useState(null);
  const [done, setDone]         = useState(false);
  const [errs, setErrs]         = useState({});

  const key = d => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  // Total price
  const basePrice = vipPkg ? vipPkg.price : null;
  const locPrice  = selLoc?.price || 0;
  const total     = basePrice != null ? basePrice + locPrice : null;

  const check = () => {
    const e = {};
    if (!form.name)     e.name = 1;
    if (!form.phone)    e.phone = 1;
    if (!form.address)  e.address = 1;
    if (!form.occasion) e.occ = 1;
    if (!selDate)       e.date = 1;
    if (!file)          e.file = 1;
    setErrs(e);
    return !Object.keys(e).length;
  };

  const submit = () => {
    if (!check()) return;
    const k = key(selDate);
    setBooked(p => ({ ...p, [k]: (p[k] || 0) + tix }));
    sessionStorage.removeItem("vip_package");
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setForm({ name: "", phone: "", address: "", occasion: "", email: "", notes: "" });
      setFile(null); setSelDate(null); setSelLoc(null); setTix(1); setErrs({});
      setPage("home");
    }, 3500);
  };

  const iBase = makeIBase(C);
  const iErr  = makeIErr(C);
  const s = f => errs[f] ? iErr : iBase;

  return (
    <div className="page-enter">
      <div style={{ textAlign: "center", padding: sm ? "2.5rem 1.2rem 0" : "2.5rem 2rem 0" }}>
        <Label c>Reserve Your Date</Label>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: isMobile ? "1.9rem" : "clamp(2.3rem,5vw,3.4rem)", color: C.cream, marginTop: "7px" }}>
          {vipPkg ? <>VIP <em style={{ color: C.gold }}>"{vipPkg.name}"</em> Booking</> : <>Book a <em style={{ color: C.gold, fontStyle: "italic" }}>Session</em></>}
        </h2>
        {vipPkg && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", marginTop: ".8rem", padding: ".45rem 1.2rem", border: `1px solid ${C.gold}55`, background: `${C.gold}08` }}>
            <span style={{ fontSize: "1.1rem" }}>{vipPkg.icon}</span>
            <span style={{ fontSize: ".72rem", letterSpacing: "2px", color: C.gold }}>PACKAGE: {vipPkg.name.toUpperCase()} · STARTS AT ${vipPkg.price.toLocaleString()}</span>
          </div>
        )}
      </div>

      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: sm ? "1.8rem 1rem 3.5rem" : "3rem 2rem 5rem", display: "grid", gridTemplateColumns: sm ? "1fr" : "1fr 1fr", gap: sm ? "2rem" : "4.5rem", alignItems: "start" }}>

        {/* LEFT — Calendar + Location */}
        <div>
          <p style={{ color: C.beigeDark, lineHeight: 1.9, fontSize: ".86rem", marginBottom: "1.2rem" }}>
            Choose your perfect day and venue — let's begin the journey of preserving your most beautiful moments.
          </p>
          <div style={{ border: `1px solid ${C.gold}44`, background: `${C.gold}08`, padding: "1rem 1.3rem", fontSize: ".81rem", color: C.goldLight, lineHeight: 1.7, marginBottom: "1.6rem" }}>
            ⚡ <strong>Please Note:</strong> Each day has only <strong>4 booking slots</strong>. Book early to secure your date.
          </div>
          {errs.date && <p style={{ color: C.red, fontSize: ".72rem", marginBottom: ".4rem" }}>⚠ Please select a date from the calendar.</p>}
          <Calendar bookedMap={booked} selectedDate={selDate} onSelect={(d, a) => { setSelDate(d); setAvail(a); setTix(1); }} />

          {selDate && (
            <div style={{ marginBottom: "1.4rem" }}>
              <p style={{ fontSize: ".58rem", letterSpacing: "2px", color: C.gold, textTransform: "uppercase", marginBottom: ".45rem" }}>Number of Tickets</p>
              <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
                {Array.from({ length: Math.min(avail, 4) }).map((_, i) => {
                  const n = i + 1, on = tix === n;
                  return <button key={n} onClick={() => setTix(n)} style={{ width: "38px", height: "38px", border: `1px solid ${on ? C.gold : `${C.gold}44`}`, background: on ? C.gold : "transparent", color: on ? "#070707" : C.cream, fontWeight: on ? 700 : 400, transition: "all .18s" }}>{n}</button>;
                })}
              </div>
              <p style={{ fontSize: ".66rem", color: C.muted, marginTop: "4px" }}>{avail} of 4 slots available for this day</p>
            </div>
          )}

          {/* LOCATION SELECTOR */}
          <LocationSelector selected={selLoc} onSelect={setSelLoc} />

          {/* PRICE SUMMARY */}
          {(vipPkg || selLoc) && (
            <div style={{ border: `1px solid ${C.gold}44`, background: `${C.gold}06`, padding: "1rem 1.3rem", marginTop: ".4rem" }}>
              <p style={{ fontSize: ".58rem", letterSpacing: "2px", color: C.gold, textTransform: "uppercase", marginBottom: ".6rem" }}>Price Summary</p>
              {vipPkg && (
                <div style={{ display: "flex", justifyContent: "space-between", color: C.beigeDark, fontSize: ".8rem", marginBottom: ".3rem" }}>
                  <span>{vipPkg.name} Package</span><span>${vipPkg.price.toLocaleString()}</span>
                </div>
              )}
              {selLoc && selLoc.price > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: C.beigeDark, fontSize: ".8rem", marginBottom: ".3rem" }}>
                  <span>📍 {selLoc.name}</span><span>+${selLoc.price}</span>
                </div>
              )}
              {selLoc && selLoc.price === 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: C.beigeDark, fontSize: ".8rem", marginBottom: ".3rem" }}>
                  <span>📍 {selLoc.name}</span><span style={{ color: C.muted }}>TBD</span>
                </div>
              )}
              {total != null && (
                <>
                  <div style={{ height: "1px", background: `${C.gold}33`, margin: ".5rem 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", color: C.cream }}>
                    <span style={{ fontSize: ".75rem", letterSpacing: "1px" }}>ESTIMATED TOTAL</span>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", color: C.gold }}>${total.toLocaleString()}</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* RIGHT — Form */}
        <div>
          <p style={{ fontSize: ".68rem", color: C.muted, marginBottom: ".85rem" }}><span style={{ color: C.red }}>*</span> Required fields</p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: ".9rem" }}>
            <Field label="Full Name" req err={errs.name}>
              <input type="text" placeholder="John Smith" value={form.name} onChange={set("name")} style={s("name")} />
            </Field>
            <Field label="Phone Number" req err={errs.phone}>
              <input type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={set("phone")} style={s("phone")} />
            </Field>
            <Field label="Address / City" req full err={errs.address}>
              <input type="text" placeholder="Baghdad, Iraq" value={form.address} onChange={set("address")} style={s("address")} />
            </Field>
            <Field label="Occasion Type" req full err={errs.occ}>
              <select value={form.occasion} onChange={set("occasion")} style={s("occ")}>
                <option value="">— Select Occasion Type —</option>
                {["Wedding 💍","Graduation 🎓","Special Occasion ✨","Family Session 👨‍👩‍👧‍👦","Product Photography 📦","Professional Portrait 📷",
                  "VIP – Silver Experience 🥈","VIP – Gold Prestige 👑","VIP – Diamond Elite 💎","Other"].map(o => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Email Address" full>
              <input type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} style={iBase} />
            </Field>
            <Field label="Additional Requirements" full>
              <textarea placeholder="Theme, colors, guest count, special requests... (optional)" value={form.notes} onChange={set("notes")} style={{ ...iBase, resize: "vertical", minHeight: "90px" }} />
            </Field>
            <Field label="Payment Receipt" req full err={errs.file}>
              <div onClick={() => document.getElementById("f-upload").click()} style={{ border: `1px dashed ${errs.file ? C.red : `${C.gold}55`}`, padding: isMobile ? "1.4rem" : "1.9rem", textAlign: "center", cursor: "pointer", background: `${C.gold}03`, transition: "all .3s" }}>
                <div style={{ fontSize: "1.6rem", color: C.gold, marginBottom: "4px" }}>📎</div>
                <p style={{ color: file ? C.gold : C.beigeDark, fontSize: ".78rem" }}>{file ? `✓ ${file.name}` : "Click to upload your payment receipt"}</p>
                <small style={{ color: C.muted, fontSize: ".65rem" }}>JPG, PNG or PDF — max 10 MB</small>
                <input id="f-upload" type="file" accept="image/*,.pdf" style={{ display: "none" }}
                  onChange={e => { setFile(e.target.files[0] || null); setErrs(p => ({ ...p, file: false })); }} />
              </div>
            </Field>
          </div>

          <Deco />

          <div style={{ background: `${C.gold}08`, border: `1px solid ${C.gold}22`, padding: ".88rem 1.1rem", fontSize: ".77rem", color: C.beigeDark, lineHeight: 1.85, marginBottom: ".9rem" }}>
            📌 <strong style={{ color: C.gold }}>Important:</strong> Booking is not confirmed until receipt is verified. Our team will contact you within 24 hours.
          </div>

          <Btn onClick={submit} full>✦ Confirm Booking ✦</Btn>
        </div>
      </div>

      <Footer />

      {done && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(7,7,7,.97)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", padding: "2rem", animation: "fadeIn .5s ease" }}>
          <div style={{ width: "70px", height: "70px", border: `1.5px solid ${C.gold}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", color: C.gold, marginBottom: "1.8rem" }}>✓</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? "2rem" : "3rem", fontWeight: 300, color: "#f4efe6", marginBottom: ".7rem" }}>Booking Confirmed!</h2>
          <p style={{ color: "#c4ae8e", marginBottom: ".3rem" }}>Thank you for trusting us 🌟</p>
          <p style={{ color: "#c4ae8e", fontSize: ".83rem" }}>Our team will contact you within 24 hours.</p>
          {total != null && <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", color: C.gold, marginTop: ".6rem" }}>Total: ${total.toLocaleString()}</p>}
          <Deco />
          <p style={{ fontSize: ".68rem", color: "#6a6055" }}>Redirecting to homepage...</p>
        </div>
      )}
    </div>
  );
};
