import { IconBean } from "../lib/icons";

const items = [
  "Batch №214 in the drum",
  "Cupping 88.5 — Kiamugumo AA",
  "Free shipping over $45",
  "Roasted every Tuesday, 06:00",
  "Compostable bags, always",
  "Code ROAST10 — 10% off your first order",
  "Geisha lot: 12 bags only",
];

export default function Ticker() {
  const row = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-6 pr-6"
    >
      {items.map((t) => (
        <span key={t} className="flex items-center gap-6">
          <span className="whitespace-nowrap font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
            {t}
          </span>
          <IconBean className="h-3.5 w-3.5 shrink-0 opacity-60" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative z-10 overflow-hidden border-y-2 border-bark bg-caramel py-2.5 text-bark">
      <div className="ticker-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
