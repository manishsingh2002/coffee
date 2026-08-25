import { useEffect, useMemo, useRef, useState } from "react";
import type { Category, Grind, Product } from "./data/products";
import {
  CATEGORY_META,
  FREE_SHIPPING_THRESHOLD,
  GRINDS,
  PRODUCTS,
  PROMO_CODE,
  PROMO_PCT,
  SHIPPING_FLAT,
} from "./data/products";
import Header from "./components/Header";
import Opener from "./components/Opener";
import Ticker from "./components/Ticker";
import ShopSection, { type SortKey } from "./components/ShopSection";
import ProductModal from "./components/ProductModal";
import CartDrawer, { type CartLine, type Totals } from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Footer from "./components/Footer";
import Toasts, { type ToastMsg } from "./components/Toast";

interface StoredLine {
  id: string;
  grind: Grind;
  qty: number;
}

const loadCart = (): StoredLine[] => {
  try {
    const raw = localStorage.getItem("emberline-cart");
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l) =>
        l &&
        typeof l.qty === "number" &&
        PRODUCTS.some((p) => p.id === l.id),
    );
  } catch {
    return [];
  }
};

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [detail, setDetail] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [promo, setPromo] = useState(false);
  const [cart, setCart] = useState<StoredLine[]>(loadCart);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      localStorage.setItem("emberline-cart", JSON.stringify(cart));
    } catch {
      /* storage unavailable — carry on */
    }
  }, [cart]);

  const pushToast = (title: string, sub?: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t.slice(-2), { id, title, sub }]);
    window.setTimeout(
      () => setToasts((t) => t.filter((x) => x.id !== id)),
      3200,
    );
  };

  /* ---------- cart ---------- */
  const lines: CartLine[] = useMemo(
    () =>
      cart.map((l) => ({
        key: `${l.id}:${l.grind}`,
        product: PRODUCTS.find((p) => p.id === l.id)!,
        grind: l.grind,
        qty: l.qty,
      })),
    [cart],
  );

  const totals: Totals = useMemo(() => {
    const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
    const discount = promo ? subtotal * PROMO_PCT : 0;
    const shipping =
      lines.length === 0 || subtotal - discount >= FREE_SHIPPING_THRESHOLD
        ? 0
        : SHIPPING_FLAT;
    return { subtotal, discount, shipping, total: subtotal - discount + shipping };
  }, [lines, promo]);

  const cartCount = lines.reduce((s, l) => s + l.qty, 0);

  const addToCart = (p: Product, grind: Grind, qty: number) => {
    setCart((c) => {
      const existing = c.find((l) => l.id === p.id && l.grind === grind);
      if (existing) {
        return c.map((l) =>
          l.id === p.id && l.grind === grind
            ? { ...l, qty: Math.min(12, l.qty + qty) }
            : l,
        );
      }
      return [...c, { id: p.id, grind, qty }];
    });
    const grindLabel = GRINDS.find((g) => g.id === grind)?.label ?? grind;
    pushToast(`${p.name} added to bag`, `${qty} × 250 g · ${grindLabel}`);
  };

  const quickAdd = (p: Product) => addToCart(p, "whole", 1);

  const updateQty = (key: string, delta: number) => {
    setCart((c) =>
      c.map((l) =>
        `${l.id}:${l.grind}` === key
          ? { ...l, qty: Math.min(12, Math.max(1, l.qty + delta)) }
          : l,
      ),
    );
  };

  const removeLine = (key: string) =>
    setCart((c) => c.filter((l) => `${l.id}:${l.grind}` !== key));

  const applyPromo = (code: string): boolean => {
    if (code.toUpperCase() === PROMO_CODE) {
      setPromo(true);
      pushToast("Promo applied", `${PROMO_CODE} · 10% off your order`);
      return true;
    }
    return false;
  };

  /* ---------- catalogue filtering ---------- */
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      const haystack = [
        p.name,
        p.origin,
        p.region,
        p.process,
        p.varietal,
        CATEGORY_META[p.category].label,
        ...p.notes,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "roast":
        return [...list].sort((a, b) => a.roast - b.roast);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [query, category, sort]);

  /* ---------- render ---------- */
  return (
    <div className="relative min-h-screen">
      {/* ambient fixed washes */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(60rem 40rem at 85% 0%, rgba(198,95,46,0.07), transparent 60%), radial-gradient(50rem 36rem at 0% 45%, rgba(226,155,61,0.05), transparent 60%), radial-gradient(44rem 30rem at 70% 100%, rgba(63,38,19,0.35), transparent 65%)",
        }}
      />
      <div className="grain" />

      <div className="relative">
        <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

        <main>
          <Opener />
          <Ticker />
          <ShopSection
            query={query}
            setQuery={setQuery}
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
            visible={visible}
            onOpen={setDetail}
            onQuickAdd={quickAdd}
          />
          <Footer />
        </main>
      </div>

      {detail && (
        <ProductModal
          product={detail}
          onClose={() => setDetail(null)}
          onAdd={addToCart}
        />
      )}

      <CartDrawer
        open={cartOpen}
        lines={lines}
        totals={totals}
        promoActive={promo}
        onApplyPromo={applyPromo}
        onRemovePromo={() => setPromo(false)}
        onUpdateQty={updateQty}
        onRemove={removeLine}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {checkoutOpen && (
        <CheckoutModal
          lines={lines}
          totals={totals}
          onClose={() => setCheckoutOpen(false)}
          onComplete={() => {
            setCart([]);
            setPromo(false);
          }}
        />
      )}

      <Toasts toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />
    </div>
  );
}
