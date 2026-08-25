import { useEffect, useRef, useState } from "react";
import type { Grind, Product } from "../data/products";
import { CATEGORY_META, GRINDS, fmt } from "../data/products";
import { useEscape, useLockBody } from "../lib/motion";
import {
  IconBag,
  IconCheck,
  IconCone,
  IconMinus,
  IconPin,
  IconPlus,
  IconScale,
  IconThermo,
  IconX,
} from "../lib/icons";
import { RoastMeter, Stars } from "./ProductCard";

export default function ProductModal({
  product,
  onClose,
  onAdd,
}: {
  product: Product;
  onClose: () => void;
  onAdd: (p: Product, grind: Grind, qty: number) => void;
}) {
  const [grind, setGrind] = useState<Grind>("whole");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLockBody(true);
  useEscape(true, onClose);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const handleAdd = () => {
    onAdd(product, grind, qty);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1600);
  };

  const specs: [string, string][] = [
    ["Process", product.process],
    ["Varietal", product.varietal],
    ["Altitude", product.altitude],
    ["Category", CATEGORY_META[product.category].label],
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} details`}
    >
      <div
        className="anim-fade-in absolute inset-0 bg-espresso/85 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="anim-sheet-in warm-scroll relative max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-t-[1.5rem] border border-seam bg-bark shadow-lift sm:rounded-[1.5rem]">
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-espresso/80 text-sand backdrop-blur-sm transition-all duration-300 hover:rotate-90 hover:bg-caramel hover:text-bark"
        >
          <IconX className="h-4 w-4" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* image side */}
          <div className="relative h-64 overflow-hidden bg-roast sm:h-80 md:h-full md:min-h-[36rem]">
            <img
              src={product.image}
              alt={`${product.name} coffee bag`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent" />
            {product.badge && (
              <span
                className="absolute left-4 top-4 rounded-full border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{
                  color: product.accent,
                  borderColor: `${product.accent}66`,
                  background: "rgba(20,13,8,0.78)",
                }}
              >
                {product.badge}
              </span>
            )}
            <div className="absolute bottom-4 left-4 rounded-full bg-espresso/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-sand backdrop-blur-sm">
              SCA cup score {product.score}
            </div>
          </div>

          {/* details side */}
          <div className="p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-caramel">
              {CATEGORY_META[product.category].label}
            </p>
            <h3 className="mt-2 font-display text-3xl font-black tracking-tight text-cream sm:text-4xl">
              {product.name}
            </h3>

            <p className="mt-2 flex items-center gap-2 text-sm text-taupe">
              <IconPin className="h-4 w-4 shrink-0 text-caramel" />
              {product.region} · {product.origin}
            </p>

            <div className="mt-3 flex items-center gap-2.5">
              <Stars rating={product.rating} />
              <span className="font-mono text-xs text-faint">
                {product.rating.toFixed(1)} · {product.reviews} reviews
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-sand">
              {product.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.notes.map((n) => (
                <span
                  key={n}
                  className="rounded-full border px-3 py-1 text-xs font-medium"
                  style={{ borderColor: `${product.accent}55`, color: product.accent }}
                >
                  {n}
                </span>
              ))}
            </div>

            {/* spec grid */}
            <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-seam-soft bg-seam-soft">
              {specs.map(([k, v]) => (
                <div key={k} className="bg-bark px-4 py-3">
                  <dt className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                    {k}
                  </dt>
                  <dd className="mt-0.5 text-sm font-semibold text-cream">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-3 flex items-center justify-between rounded-xl border border-seam-soft px-4 py-3">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                Roast level
              </span>
              <RoastMeter level={product.roast} />
            </div>

            {/* brew recipe */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { icon: IconCone, label: "Brew", value: product.brew.method },
                { icon: IconScale, label: "Ratio", value: product.brew.ratio },
                { icon: IconThermo, label: "Water", value: product.brew.temp },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border border-seam-soft bg-espresso/50 px-3 py-2.5 text-center transition-colors duration-300 hover:border-caramel/40"
                >
                  <Icon className="mx-auto h-4.5 w-4.5 text-caramel" />
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
                    {label}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold leading-tight text-cream">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* grind */}
            <fieldset className="mt-5">
              <legend className="font-mono text-[10px] uppercase tracking-[0.22em] text-taupe">
                Grind
              </legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {GRINDS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGrind(g.id)}
                    aria-pressed={grind === g.id}
                    className={`rounded-xl border px-2 py-2.5 text-center transition-all duration-300 active:scale-95 ${
                      grind === g.id
                        ? "border-caramel bg-roast shadow-card"
                        : "border-seam-soft hover:border-seam"
                    }`}
                  >
                    <span
                      className={`block text-xs font-bold ${grind === g.id ? "text-caramel" : "text-cream"}`}
                    >
                      {g.label}
                    </span>
                    <span className="mt-0.5 block text-[10px] leading-tight text-faint">
                      {g.hint}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* qty + add */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center rounded-full border border-seam">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-12 w-11 items-center justify-center text-sand transition-colors hover:text-caramel disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <IconMinus className="h-4 w-4" />
                </button>
                <span
                  key={qty}
                  className="anim-pop-in w-8 text-center font-mono text-base font-bold text-cream"
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(12, q + 1))}
                  disabled={qty >= 12}
                  aria-label="Increase quantity"
                  className="flex h-12 w-11 items-center justify-center text-sand transition-colors hover:text-caramel disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <IconPlus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex h-12 flex-1 items-center justify-center gap-2.5 rounded-full text-sm font-bold transition-all duration-300 active:scale-[0.97] ${
                  added
                    ? "bg-sage text-bark"
                    : "bg-caramel text-bark hover:bg-cream"
                }`}
              >
                {added ? (
                  <>
                    <IconCheck className="anim-pop-in h-4.5 w-4.5" strokeWidth={2.4} />
                    In the bag
                  </>
                ) : (
                  <>
                    <IconBag className="h-4.5 w-4.5" />
                    Add {qty > 1 ? `${qty} bags` : "to bag"} · {fmt(product.price * qty)}
                  </>
                )}
              </button>
            </div>

            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
              250 g · roasted Tue · ships Thu–Fri · free over $45
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
