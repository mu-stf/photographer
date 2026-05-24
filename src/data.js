// ─── GALLERY DATA ─────────────────────────────────────────────────
export const GALLERY = {
  wedding: {
    banner: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80",
    title: "Weddings",
    subtitle: "Love stories told through the lens",
    photos: [
      { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80", caption: "The First Dance" },
      { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80", caption: "Dance of Memories" },
      { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80", caption: "Enchanting Ambiance" },
      { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80", caption: "Golden Touch" },
      { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80", caption: "A Day to Remember" },
      { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80", caption: "Forever Begins Here" },
    ],
  },
  graduation: {
    banner: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1600&q=80",
    title: "Graduation",
    subtitle: "Celebrating your greatest achievement",
    photos: [
      { src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&q=80", caption: "The Achievement" },
      { src: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600&q=80", caption: "Future Starts Now" },
      { src: "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?w=600&q=80", caption: "Family Pride" },
      { src: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=600&q=80", caption: "End & Beginning" },
      { src: "https://images.unsplash.com/photo-1613896640137-bb5b31496543?w=600&q=80", caption: "Crowned Moment" },
      { src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80", caption: "Graduate Portrait" },
    ],
  },
  special: {
    banner: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80",
    title: "Special Occasions",
    subtitle: "Every moment deserves a professional lens",
    photos: [
      { src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80", caption: "Extraordinary Moments" },
      { src: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&q=80", caption: "Refined Memories" },
      { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80", caption: "Portrait Sessions" },
      { src: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&q=80", caption: "Artistic Touch" },
      { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80", caption: "Private Celebrations" },
      { src: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&q=80", caption: "Family Sessions" },
    ],
  },
};

export const HOME_PHOTOS = [
  { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80", caption: "Moments of Joy" },
  { src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&q=80", caption: "A New Beginning" },
  { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80", caption: "Timeless Portraits" },
  { src: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&q=80", caption: "Artistic Touch" },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80", caption: "Love Stories" },
  { src: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&q=80", caption: "Exclusive Events" },
  { src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80", caption: "Golden Evenings" },
  { src: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600&q=80", caption: "Achievement Unlocked" },
  { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80", caption: "Golden Celebrations" },
];

// ─── VIP PACKAGES ─────────────────────────────────────────────────
export const VIP_PACKAGES = [
  {
    id: "silver",
    icon: "🥈",
    name: "Silver Experience",
    badge: "POPULAR",
    price: 350,
    duration: "3 Hours",
    photos: "100+ Edited Photos",
    cover: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    features: [
      "1 Professional Photographer",
      "3-Hour Shoot Session",
      "100+ Edited High-Res Photos",
      "Online Gallery Delivery",
      "1 Scenic Location",
      "Basic Retouching Included",
    ],
  },
  {
    id: "gold",
    icon: "👑",
    name: "Gold Prestige",
    badge: "BEST VALUE",
    price: 650,
    duration: "6 Hours",
    photos: "250+ Edited Photos",
    cover: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    features: [
      "2 Professional Photographers",
      "6-Hour Full-Day Session",
      "250+ Edited High-Res Photos",
      "Private Online Gallery",
      "Up to 2 Scenic Locations",
      "Advanced Retouching & Color Grade",
      "Printed Photo Album (20 pages)",
      "Drone Aerial Shots (weather permitting)",
    ],
  },
  {
    id: "diamond",
    icon: "💎",
    name: "Diamond Elite",
    badge: "EXCLUSIVE",
    price: 1100,
    duration: "Full Day",
    photos: "500+ Edited Photos",
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    features: [
      "3 Professional Photographers + Videographer",
      "Full-Day Unlimited Session",
      "500+ Edited High-Res Photos",
      "Cinematic Highlight Video (3–5 min)",
      "Unlimited Scenic Locations",
      "Luxury Retouching & Cinematic Grade",
      "Premium Printed Album (40 pages)",
      "Drone Aerial & Gimbal Video",
      "Dedicated Personal Coordinator",
      "Same-Day Preview Gallery",
    ],
  },
];

// ─── VENUE LOCATIONS ──────────────────────────────────────────────
export const LOCATIONS = [
  { id: "abu_nuwas",    name: "Abu Nuwas Corniche",         price: 300, desc: "Iconic riverside promenade along the Tigris" },
  { id: "zawra",        name: "Al-Zawra Park",              price: 200, desc: "Lush green park in the heart of Baghdad" },
  { id: "babylon_isl",  name: "Baghdad Tourist Island",     price: 400, desc: "Exclusive island venue on the Tigris River" },
  { id: "atifiya",      name: "Al-Atifiya District",        price: 180, desc: "Historic charming neighborhood streets" },
  { id: "mutanabi",     name: "Al-Mutanabbi Street",        price: 150, desc: "Cultural hub with timeless architecture" },
  { id: "national_thtr",name: "National Theatre Gardens",   price: 250, desc: "Grand gardens with classical architecture" },
  { id: "urban_studio", name: "Private Urban Studio",       price: 120, desc: "Fully equipped professional studio setting" },
  { id: "custom",       name: "Custom Location",            price: 0,   desc: "Your own venue — price upon agreement" },
];

