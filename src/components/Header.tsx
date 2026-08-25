import { IconBag, IconFlame, LogoMark } from "../lib/icons";

export default function Header({
  cartCount,
  onCartOpen,
}: {
  cartCount: number;
  onCartOpen: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-seam-soft bg-espresso/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <LogoMark className="h-9 w-9 text-caramel transition-transform duration-500 group-hover:rotate-[18deg]" />
          <span className="leading-none">
            <span className="block font-display text-xl font-black tracking-tight text-cream sm:text-2xl">
              Emberline
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-faint">
              Roasters · PDX
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.2em] text-taupe md:flex">
          <a href="#shop" className="transition-colors hover:text-caramel">
            The Shelf
          </a>
          <a href="#process" className="transition-colors hover:text-caramel">
            How We Roast
          </a>
          <a href="#visit" className="transition-colors hover:text-caramel">
            Visit
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-seam px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-sand lg:flex">
            <IconFlame className="h-3.5 w-3.5 text-ember" />
            Roast day: Tuesday
          </span>
          <button
            onClick={onCartOpen}
            aria-label={`Open cart, ${cartCount} items`}
            className="group relative flex items-center gap-2 rounded-full bg-mocha px-4 py-2.5 text-sm font-semibold text-cream ring-1 ring-seam transition-all duration-300 hover:bg-roast hover:ring-caramel/60 active:scale-95"
          >
            <IconBag className="h-4.5 w-4.5 text-caramel" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="anim-pop-in absolute -right-1.5 -top-1.5 flex h-5.5 min-w-5.5 items-center justify-center rounded-full bg-caramel px-1 font-mono text-[11px] font-bold text-bark"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
