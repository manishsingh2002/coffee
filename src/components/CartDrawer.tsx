import { useState } from "react";
import type { Grind, Product } from "../data/products";
import {
  FREE_SHIPPING_THRESHOLD,
  GRINDS,
  PROMO_CODE,
  fmtStrict,
} from "../data/products";
import { useEscape, useLockBody } from "../lib/motion";
import {
  IconArrow,
  IconBag,
  IconBean,
  IconCheck,
  IconLock,
  IconMinus,
  IconPlus,
  IconTrash,
  IconTruck,
  IconX,
} from "../lib/icons";

export interface CartLine {
  key: string;
  product: Product;
  grind: Grind;
  qty: number;
}

export interface Totals {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export default function CartDrawer({
  open,
  lines,
  totals,
  promoActive,
  onApplyPromo,
  onRemovePromo,
  onUpdateQty,
  onRemove,
  onClose,
  onCheckout,
}: {
  open: boolean;
  lines: CartLine[];
  totals: Totals;
  promoActive: boolean;
  onApplyPromo: (code: string) => boolean;
  onRemovePromo: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onClose: () => void;
  onCheckout: () => void;
}) {
  const [promoInput, setPromoInput] = useState("");
  const [promoErr, setPromoErr] = useState(false);
  const [errCount, setErrCount] = useState(0);

  useLockBody(open);
  useEscape(open, onClose);

  const itemCount = lines.reduce((s, l) => s + l.qty, 0);
  const remaining = FREE_SHIPPING_THRESHOLD - totals.subtotal;
  const progress = Math.min(100, (totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const grindLabel = (g: Grind) => GRINDS.find((x) => x.id === g)?.label ?? g;

  const applyPromo = () => {
    if (!promoInput.trim()) return;
    const ok = onApplyPromo(promoInput.trim());
    if (ok) {
      setPromoInput("");
      setPromoErr(false);
    } else {
      setPromoErr(true);
      setErrCount((c) => c + 1);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-espresso/80 backdrop-blur-sm transition-opacity duration-400 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-label="Shopping bag"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-seam bg-bark shadow-lift transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-seam-soft px-5 py-4">
          <h2 className="flex items-center gap-3 font-display text-2xl font-black text-cream">
            <IconBag className="h-5 w-5 text-caramel" />
            Your bag
            <span className="font-mono text-xs font-normal uppercase tracking-[0.16em] text-faint">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-seam text-sand transition-all duration-300 hover:rotate-90 hover:border-caramel hover:text-caramel"
          >
            <IconX className="h-4 w-4" />
          </button>
        </div>

        {/* free shipping meter */}
        <div className="border-b border-seam-soft px-5 py-4">
          {lines.length > 0 && remaining > 0 ? (
            <p className="flex items-center gap-2 text-xs text-sand">
              <IconTruck className="h-4 w-4 shrink-0 text-caramel" />
              <span>
                <strong className="font-bold text-cream">{fmtStrict(remaining)}</strong>{" "}
                away from free shipping
              </span>
            </p>
          ) : lines.length > 0 ? (
            <p className="flex items-center gap-2 text-xs font-semibold text-sage">
              <IconCheck className="h-4 w-4" strokeWidth={2.4} />
              Free shipping unlocked
            </p>
          ) : (
            <p className="flex items-center gap-2 text-xs text-faint">
              <IconTruck className="h-4 w-4" />
              Free shipping on orders over {fmtStrict(FREE_SHIPPING_THRESHOLD)}
            </p>
          )}
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-roast">
            <div
              className="h-full rounded-full bg-gradient-to-r from-ember to-caramel transition-all duration-700 ease-out"
              style={{ width: `${lines.length ? progress : 0}%` }}
            />
          </div>
        </div>

        {/* lines */}
        <div className="warm-scroll flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <IconBean className="h-14 w-14 text-seam" />
              <p className="mt-4 font-display text-2xl font-bold text-cream">
                Your bag is empty
              </p>
              <p className="mt-2 max-w-[15rem] text-sm text-faint">
                Six coffees just came out of the drum. Go pick a favorite.
              </p>
              <a
                href="#shop"
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-caramel px-6 py-3 text-sm font-bold text-bark transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream active:scale-95"
              >
                Browse the shelf
                <IconArrow className="h-4 w-4" />
              </a>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((l) => (
                <li
                  key={l.key}
                  className="anim-rise-in group flex gap-3.5 rounded-2xl border border-seam-soft bg-mocha/60 p-3 transition-colors duration-300 hover:border-seam"
                >
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={l.product.image}
                      alt={l.product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-display text-base font-bold text-cream">
                          {l.product.name}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                          {grindLabel(l.grind)} · 250 g
                        </p>
                      </div>
                      <button
                        onClick={() => onRemove(l.key)}
                        aria-label={`Remove ${l.product.name} from bag`}
                        className="shrink-0 rounded-full p-1.5 text-faint transition-all duration-300 hover:bg-roast hover:text-ember"
                      >
                        <IconTrash className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-seam">
                        <button
                          onClick={() => onUpdateQty(l.key, -1)}
                          disabled={l.qty <= 1}
                          aria-label="Decrease quantity"
                          className="flex h-8 w-8 items-center justify-center text-sand transition-colors hover:text-caramel disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <IconMinus className="h-3.5 w-3.5" />
                        </button>
                        <span
                          key={l.qty}
                          className="anim-pop-in w-7 text-center font-mono text-sm font-bold text-cream"
                        >
                          {l.qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(l.key, 1)}
                          disabled={l.qty >= 12}
                          aria-label="Increase quantity"
                          className="flex h-8 w-8 items-center justify-center text-sand transition-colors hover:text-caramel disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <IconPlus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p
                        key={l.qty * 1000}
                        className="anim-pop-in font-mono text-sm font-bold text-caramel"
                      >
                        {fmtStrict(l.product.price * l.qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* footer */}
        {lines.length > 0 && (
          <div className="border-t border-seam-soft px-5 py-4">
            {/* promo */}
            <div key={errCount} className={promoErr ? "anim-shake" : ""}>
              {promoActive ? (
                <div className="flex items-center justify-between rounded-xl border border-sage/40 bg-sage/10 px-3.5 py-2.5">
                  <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-sage">
                    <IconCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
                    {PROMO_CODE} · 10% off applied
                  </p>
                  <button
                    onClick={onRemovePromo}
                    aria-label="Remove promo code"
                    className="rounded-full p-1 text-faint transition-colors hover:text-ember"
                  >
                    <IconX className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value.toUpperCase());
                        setPromoErr(false);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                      placeholder="Promo code"
                      aria-label="Promo code"
                      className={`min-w-0 flex-1 rounded-xl border bg-espresso/70 px-3.5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-cream placeholder:normal-case placeholder:tracking-normal placeholder:text-faint/70 focus:outline-none ${
                        promoErr ? "border-ember" : "border-seam focus:border-caramel/60"
                      }`}
                    />
                    <button
                      onClick={applyPromo}
                      className="rounded-xl border border-seam px-4 font-mono text-xs font-bold uppercase tracking-[0.12em] text-sand transition-all duration-300 hover:border-caramel hover:text-caramel active:scale-95"
                    >
                      Apply
                    </button>
                  </div>
                  {promoErr && (
                    <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ember">
                      That code didn't take — try {PROMO_CODE}
                    </p>
                  )}
                </div>
              )}
            </div>

            <dl className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between text-sand">
                <dt>Subtotal</dt>
                <dd className="font-mono">{fmtStrict(totals.subtotal)}</dd>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-sage">
                  <dt>Discount ({PROMO_CODE})</dt>
                  <dd className="font-mono">−{fmtStrict(totals.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between text-sand">
                <dt>Shipping</dt>
                <dd className="font-mono">
                  {totals.shipping === 0 ? (
                    <span className="font-bold text-sage">Free</span>
                  ) : (
                    fmtStrict(totals.shipping)
                  )}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-seam-soft pt-2.5">
                <dt className="font-display text-lg font-bold text-cream">Total</dt>
                <dd className="font-display text-2xl font-black text-caramel">
                  {fmtStrict(totals.total)}
                </dd>
              </div>
            </dl>

            <button
              onClick={onCheckout}
              className="group mt-4 flex w-full items-center justify-center gap-2.5 rounded-full bg-caramel py-3.5 text-sm font-bold text-bark transition-all duration-300 hover:bg-cream active:scale-[0.98]"
            >
              <IconLock className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              Checkout · {fmtStrict(totals.total)}
            </button>
            <p className="mt-2.5 text-center font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">
              Demo checkout — no real payment taken
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
