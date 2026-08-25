import type { Product } from "../data/products";
import { CATEGORY_META, fmt, roastLabel } from "../data/products";
import { IconBean, IconPlus } from "../lib/icons";

export function RoastMeter({ level, showLabel = true }: { level: number; showLabel?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span className="flex items-center gap-1" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <IconBean
            key={i}
            className={`h-3.5 w-3.5 ${i <= level ? "text-caramel" : "text-seam"}`}
          />
        ))}
      </span>
      {showLabel && (
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
          {roastLabel(level)}
        </span>
      )}
    </span>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
          <defs>
            <linearGradient id={`starfill-${i}-${rating}`}>
              <stop
                offset={`${Math.max(0, Math.min(1, rating - (i - 1))) * 100}%`}
                stopColor="#e29b3d"
              />
              <stop
                offset={`${Math.max(0, Math.min(1, rating - (i - 1))) * 100}%`}
                stopColor="#3d2a1a"
              />
            </linearGradient>
          </defs>
          <path
            fill={`url(#starfill-${i}-${rating})`}
            d="M12 3.4l2.6 5.3 5.9.9-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.6l5.9-.9L12 3.4Z"
          />
        </svg>
      ))}
    </span>
  );
}

export default function ProductCard({
  product,
  onOpen,
  onQuickAdd,
}: {
  product: Product;
  onOpen: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
}) {
  return (
    <article
      onClick={() => onOpen(product)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(product);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.25rem] border border-seam-soft bg-bark shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-caramel/50 hover:shadow-lift"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-roast">
        <img
          src={product.image}
          alt={`${product.name} coffee bag`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />

        {product.badge && (
          <span
            className="absolute left-3 top-3 rounded-full border px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] backdrop-blur-sm"
            style={{
              color: product.accent,
              borderColor: `${product.accent}66`,
              background: "rgba(20,13,8,0.72)",
            }}
          >
            {product.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-espresso/70 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-sand backdrop-blur-sm">
          250 g
        </span>

        {/* quick add — slides up on hover, always visible on touch */}
        <div className="absolute inset-x-3 bottom-3 translate-y-0 opacity-100 transition-all duration-400 ease-out sm:translate-y-[130%] sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            aria-label={`Quick add ${product.name} to cart`}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-cream py-2.5 text-sm font-bold text-bark transition-all duration-300 hover:bg-caramel active:scale-[0.97]"
          >
            <IconPlus className="h-4 w-4" />
            Quick add · {fmt(product.price)}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-taupe">
            {product.origin}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
            {product.process}
          </p>
        </div>

        <h3 className="mt-2 font-display text-[1.55rem] font-bold leading-tight text-cream transition-colors duration-300 group-hover:text-caramel">
          {product.name}
        </h3>

        <div className="mt-2.5 flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="font-mono text-[11px] text-faint">
            {product.rating.toFixed(1)} ({product.reviews})
          </span>
        </div>

        <div className="mb-4 mt-3 flex flex-wrap gap-1.5">
          {product.notes.map((n) => (
            <span
              key={n}
              className="rounded-full border border-seam px-2.5 py-0.5 text-[11px] font-medium text-sand"
            >
              {n}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-seam-soft pt-4">
          <div>
            <p className="font-mono text-lg font-bold text-cream">
              {fmt(product.price)}
            </p>
            <RoastMeter level={product.roast} />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen(product);
            }}
            aria-label={`Open details for ${product.name}`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-caramel text-bark transition-all duration-300 hover:rotate-90 hover:bg-cream active:scale-90"
          >
            <IconPlus className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </div>

        <p className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
          {CATEGORY_META[product.category].label} · SCA {product.score}
        </p>
      </div>
    </article>
  );
}
