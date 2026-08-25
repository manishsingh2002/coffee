import type { Category, Product } from "../data/products";
import { CATEGORY_META, PRODUCTS } from "../data/products";
import { Reveal } from "../lib/motion";
import { IconChevron, IconSearch, IconX } from "../lib/icons";
import ProductCard from "./ProductCard";

export type SortKey = "featured" | "price-asc" | "price-desc" | "roast" | "rating";

const SORTS: { id: SortKey; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price · low → high" },
  { id: "price-desc", label: "Price · high → low" },
  { id: "roast", label: "Roast · light → dark" },
  { id: "rating", label: "Top rated" },
];

export default function ShopSection({
  query,
  setQuery,
  category,
  setCategory,
  sort,
  setSort,
  visible,
  onOpen,
  onQuickAdd,
}: {
  query: string;
  setQuery: (q: string) => void;
  category: Category | "all";
  setCategory: (c: Category | "all") => void;
  sort: SortKey;
  setSort: (s: SortKey) => void;
  visible: Product[];
  onOpen: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
}) {
  const filtersActive = query.trim() !== "" || category !== "all";
  const countFor = (c: Category | "all") =>
    c === "all"
      ? PRODUCTS.length
      : PRODUCTS.filter((p) => p.category === c).length;

  const pills: (Category | "all")[] = ["all", "single-origin", "blend", "decaf"];

  return (
    <section id="shop" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* heading */}
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-caramel">
              <span className="h-px w-10 bg-caramel/60" />
              The shelf — week 08
            </p>
            <h2 className="mt-4 font-display text-4xl font-black tracking-tight text-cream sm:text-5xl lg:text-6xl">
              Six coffees.
              <br className="sm:hidden" />{" "}
              <em className="font-light italic text-taupe">This week only.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-faint">
            Everything below came out of the drum this Tuesday. When a lot
            sells through, it's gone until next season — the shelf rotates
            weekly.
          </p>
        </Reveal>

        {/* toolbar */}
        <Reveal delay={100} className="mt-10">
          <div className="flex flex-col gap-4 rounded-[1.25rem] border border-seam-soft bg-bark/70 p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              {/* search */}
              <label className="group relative flex flex-1 items-center">
                <IconSearch className="pointer-events-none absolute left-4 h-4.5 w-4.5 text-faint transition-colors group-focus-within:text-caramel" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search coffees, origins, tasting notes…"
                  aria-label="Search coffees"
                  className="w-full rounded-full border border-seam bg-espresso/70 py-3 pl-11 pr-10 text-sm text-cream placeholder:text-faint/80 transition-all duration-300 focus:border-caramel/70 focus:outline-none focus:ring-2 focus:ring-caramel/25"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 flex h-6 w-6 items-center justify-center rounded-full text-faint transition-colors hover:bg-roast hover:text-cream"
                  >
                    <IconX className="h-3.5 w-3.5" />
                  </button>
                )}
              </label>

              {/* sort */}
              <label className="relative lg:w-56">
                <span className="sr-only">Sort products</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="w-full cursor-pointer appearance-none rounded-full border border-seam bg-espresso/70 py-3 pl-5 pr-10 font-mono text-xs uppercase tracking-[0.1em] text-sand transition-colors focus:border-caramel/70 focus:outline-none"
                >
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id} className="bg-bark">
                      {s.label}
                    </option>
                  ))}
                </select>
                <IconChevron className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              </label>
            </div>

            {/* category pills + count */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {pills.map((c) => {
                  const active = category === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      aria-pressed={active}
                      className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-300 active:scale-95 ${
                        active
                          ? "border-caramel bg-caramel font-bold text-bark"
                          : "border-seam text-taupe hover:border-caramel/50 hover:text-cream"
                      }`}
                    >
                      {c === "all" ? "All" : CATEGORY_META[c].label}
                      <span className={`ml-1.5 ${active ? "text-bark/60" : "text-faint"}`}>
                        {countFor(c)}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint" aria-live="polite">
                {visible.length} of {PRODUCTS.length} coffees
              </p>
            </div>
          </div>
        </Reveal>

        {/* grid */}
        {visible.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
            {visible.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 90} className="h-full">
                <ProductCard product={p} onOpen={onOpen} onQuickAdd={onQuickAdd} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="anim-fade-in mt-10 flex flex-col items-center rounded-[1.25rem] border border-dashed border-seam px-6 py-20 text-center">
            <p className="font-display text-3xl font-bold text-cream sm:text-4xl">
              Nothing in the hopper.
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-faint">
              No coffees match{" "}
              {query.trim() ? (
                <span className="font-mono text-sand">“{query.trim()}”</span>
              ) : (
                "those filters"
              )}
              . Try a tasting note like <em className="text-sand">chocolate</em>, an
              origin like <em className="text-sand">Colombia</em>, or clear
              everything below.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="mt-6 flex items-center gap-2 rounded-full bg-caramel px-6 py-3 text-sm font-bold text-bark transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream active:scale-95"
            >
              <IconX className="h-4 w-4" />
              Clear search & filters
            </button>
          </div>
        )}

        {filtersActive && visible.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-taupe underline decoration-seam underline-offset-4 transition-colors hover:text-caramel"
            >
              Reset the shelf
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
