export type Category = "single-origin" | "blend" | "decaf";
export type Grind = "whole" | "filter" | "espresso";

export interface Product {
  id: string;
  name: string;
  origin: string;
  region: string;
  category: Category;
  process: string;
  varietal: string;
  altitude: string;
  roast: 1 | 2 | 3 | 4 | 5;
  notes: string[];
  price: number;
  rating: number;
  reviews: number;
  score: number;
  badge?: string;
  accent: string;
  image: string;
  description: string;
  brew: { method: string; ratio: string; temp: string };
}

export const CATEGORY_META: Record<Category, { label: string; blurb: string }> = {
  "single-origin": { label: "Single Origin", blurb: "One farm, one lot, one voice." },
  blend: { label: "Blends", blurb: "Composed for milk & ritual." },
  decaf: { label: "Decaf", blurb: "All of the cup, none of the buzz." },
};

export const GRINDS: { id: Grind; label: string; hint: string }[] = [
  { id: "whole", label: "Whole bean", hint: "Grind at home — peak aroma" },
  { id: "filter", label: "Filter grind", hint: "V60 · Chemex · batch brew" },
  { id: "espresso", label: "Espresso grind", hint: "Fine, for 9-bar machines" },
];

export const FREE_SHIPPING_THRESHOLD = 45;
export const SHIPPING_FLAT = 5.95;
export const PROMO_CODE = "ROAST10";
export const PROMO_PCT = 0.1;

export const PRODUCTS: Product[] = [
  {
    id: "kiamugumo-aa",
    name: "Kiamugumo AA",
    origin: "Kenya",
    region: "Kirinyaga County",
    category: "single-origin",
    process: "Washed",
    varietal: "SL28 · SL34",
    altitude: "1,750 masl",
    roast: 2,
    notes: ["Blackcurrant", "Grapefruit", "Demerara"],
    price: 21,
    rating: 4.9,
    reviews: 132,
    score: 88.5,
    badge: "New crop",
    accent: "#bf5b60",
    image:
      "https://image.qwenlm.ai/generated-images/be3c3bdd-1a99-4eb4-aaf7-f2cf74ecda8e/_result.png",
    description:
      "From the slopes of Mount Kenya, this AA lot is a loud, glittering cup — cassis fruit piled over a sparkling citrus acidity, with a raw-sugar finish that lingers for minutes. We roast it gently to keep every edge intact.",
    brew: { method: "V60 pour-over", ratio: "1 : 16", temp: "94 °C" },
  },
  {
    id: "finca-esperanza",
    name: "Finca La Esperanza",
    origin: "Colombia",
    region: "Huila · San Agustín",
    category: "single-origin",
    process: "Washed",
    varietal: "Caturra · Castillo",
    altitude: "1,650 masl",
    roast: 3,
    notes: ["Panela", "Red apple", "Cacao nib"],
    price: 18.5,
    rating: 4.8,
    reviews: 208,
    score: 87,
    badge: "Staff pick",
    accent: "#e29b3d",
    image:
      "https://image.qwenlm.ai/generated-images/839666df-73fb-4e68-8995-d2d1bc92cc2d/_result.png",
    description:
      "The Trujillo family's fourth harvest with us. A round, honeyed everyday coffee — unrefined-cane sweetness, crisp apple acidity and a soft cocoa tail. The bag we reach for when guests ask what 'good coffee' tastes like.",
    brew: { method: "Batch brew or V60", ratio: "1 : 16", temp: "93 °C" },
  },
  {
    id: "cerro-azul-geisha",
    name: "Cerro Azul Geisha",
    origin: "Panama",
    region: "Volcán Barú",
    category: "single-origin",
    process: "Slow-dried washed",
    varietal: "Geisha",
    altitude: "1,800 masl",
    roast: 1,
    notes: ["Jasmine", "Bergamot", "White peach"],
    price: 32,
    rating: 5,
    reviews: 74,
    score: 91.5,
    badge: "Limited · 12 bags",
    accent: "#d8b45a",
    image:
      "https://image.qwenlm.ai/generated-images/d64d0e7c-0194-4e5a-9e44-e28814afc20f/_result.png",
    description:
      "A perfume of a coffee. High-grown Geisha, picked ripe over three passes and dried slowly under shade cloth. Jasmine and bergamot up front, white-peach juice through the middle, tea-like and weightless. Twelve bags only — when they're gone, they're gone.",
    brew: { method: "V60 pour-over", ratio: "1 : 17", temp: "92 °C" },
  },
  {
    id: "night-shift",
    name: "Night Shift Espresso",
    origin: "Brazil & Sumatra",
    region: "Blend · two origins",
    category: "blend",
    process: "Natural & wet-hulled",
    varietal: "Mundo Novo · Ateng",
    altitude: "1,200–1,400 masl",
    roast: 5,
    notes: ["Dark chocolate", "Molasses", "Toasted hazelnut"],
    price: 16.5,
    rating: 4.7,
    reviews: 341,
    score: 85,
    badge: "Best seller",
    accent: "#c65f2e",
    image:
      "https://image.qwenlm.ai/generated-images/67d9f494-c29a-4fbe-bca4-9c454ffa1462/_result.png",
    description:
      "Our darkest roast and our proudest workhorse. Built for milk: heavy-bodied, low-acid, and syrupy, with bittersweet chocolate and molasses that punch straight through a flat white. Named for everyone brewing at 5 a.m.",
    brew: { method: "Espresso", ratio: "1 : 2 in 27 s", temp: "93 °C" },
  },
  {
    id: "sunday-paper",
    name: "Sunday Paper",
    origin: "Ethiopia & Colombia",
    region: "Filter blend",
    category: "blend",
    process: "Honey & washed",
    varietal: "Heirloom · Pink Bourbon",
    altitude: "1,800–2,000 masl",
    roast: 3,
    notes: ["Milk chocolate", "Orange zest", "Marzipan"],
    price: 17,
    rating: 4.8,
    reviews: 187,
    score: 86.5,
    badge: "Back in stock",
    accent: "#e07b39",
    image:
      "https://image.qwenlm.ai/generated-images/cf0ba8d0-1f72-4df6-8a1f-5c71328571d4/_result.png",
    description:
      "A slow-morning filter blend — an Ethiopian heirloom for the floral lift, a Colombian honey lot for the almond-sweet body. Comforting but never boring; the coffee equivalent of sunlight through a kitchen window.",
    brew: { method: "Batch brew or V60", ratio: "1 : 16", temp: "93 °C" },
  },
  {
    id: "moonless-decaf",
    name: "Moonless Decaf",
    origin: "Colombia",
    region: "Cauca · sugarcane E.A.",
    category: "decaf",
    process: "Sugarcane decaf",
    varietal: "Castillo",
    altitude: "1,500 masl",
    roast: 3,
    notes: ["Caramel", "Bosc pear", "Vanilla"],
    price: 17.5,
    rating: 4.6,
    reviews: 96,
    score: 85.5,
    badge: "Evening ritual",
    accent: "#9fa369",
    image:
      "https://image.qwenlm.ai/generated-images/c4ad21ec-bd45-4882-a1fb-72d04e875a0d/_result.png",
    description:
      "Decaffeinated with sugarcane ethanol from the same valleys the coffee grows in, so nothing is lost in translation. Caramel and ripe pear with a vanilla-cream finish. You will not believe it's decaf — neither do we.",
    brew: { method: "French press", ratio: "1 : 14", temp: "95 °C" },
  },
];

export const ROASTERY_IMAGE =
  "https://image.qwenlm.ai/generated-images/8a550771-deec-42ce-894a-78706753b414/_result.png";

export const fmt = (n: number): string =>
  `$${n.toFixed(2).replace(/\.00$/, "")}`;

export const fmtStrict = (n: number): string => `$${n.toFixed(2)}`;

export const roastLabel = (r: number): string =>
  r <= 1 ? "Light" : r === 2 ? "Light–Med" : r === 3 ? "Medium" : r === 4 ? "Med–Dark" : "Dark";
