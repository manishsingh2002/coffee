import { ROASTERY_IMAGE, PRODUCTS } from "../data/products";
import { IconArrow, IconBean, IconSteam } from "../lib/icons";

const stats = [
  { value: "14", label: "Origins on rotation" },
  { value: "87.4", label: "Avg. cupping score" },
  { value: "212", label: "Bags this week" },
  { value: "06:00", label: "Drum fires, Tuesdays" },
];

export default function Opener() {
  const featured = PRODUCTS[0];
  return (
    <section id="top" className="relative overflow-hidden">
      {/* ambient washes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58rem 34rem at 12% -8%, rgba(198,95,46,0.16), transparent 62%), radial-gradient(50rem 30rem at 92% 12%, rgba(226,155,61,0.12), transparent 60%), radial-gradient(40rem 26rem at 60% 110%, rgba(63,38,19,0.5), transparent 65%)",
        }}
      />
      {/* drifting beans */}
      {[
        { top: "18%", left: "4%", rot: "-18deg", size: "h-8 w-8", dur: "8s" },
        { top: "64%", left: "8%", rot: "24deg", size: "h-5 w-5", dur: "6.5s" },
        { top: "30%", right: "3%", rot: "40deg", size: "h-6 w-6", dur: "9s" },
      ].map((b, i) => (
        <IconBean
          key={i}
          aria-hidden
          className={`drift-bean pointer-events-none absolute text-seam ${b.size}`}
          style={{
            top: b.top,
            left: b.left,
            right: b.right,
            animationDuration: b.dur,
            ["--rot" as string]: b.rot,
          }}
        />
      ))}

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-8 lg:pb-24 lg:pt-16">
        {/* words */}
        <div className="lg:col-span-7">
          <p className="anim-rise-in flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-caramel">
            <span className="h-px w-10 bg-caramel/60" />
            Small-batch roastery — SE Division, Portland
          </p>

          <h1
            className="anim-rise-in mt-6 font-display text-[2.75rem] font-black leading-[0.98] tracking-tight text-cream sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
            style={{ animationDelay: "80ms" }}
          >
            Roasted{" "}
            <em className="font-light italic text-caramel">Tuesday.</em>
            <br />
            On your porch{" "}
            <em className="font-light italic text-ember">by Friday.</em>
          </h1>

          <p
            className="anim-rise-in mt-6 max-w-xl text-base leading-relaxed text-sand sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            Six coffees on the shelf at any time, sourced from growers we can
            name, roasted twelve kilos at a time, and shipped within the week.
            No warehouses, no stale bags — just this Tuesday's drum.
          </p>

          <div
            className="anim-rise-in mt-8 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href="#shop"
              className="group inline-flex items-center gap-2.5 rounded-full bg-caramel px-7 py-3.5 text-sm font-bold text-bark shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream active:translate-y-0 active:scale-95"
            >
              Shop this week's roast
              <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#process"
              className="inline-flex items-center gap-2 rounded-full border border-seam px-6 py-3.5 text-sm font-semibold text-sand transition-all duration-300 hover:border-caramel/60 hover:text-cream"
            >
              How we roast
            </a>
          </div>

          <dl
            className="anim-rise-in mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
            style={{ animationDelay: "320ms" }}
          >
            {stats.map((s) => (
              <div key={s.label} className="border-t border-seam pt-3">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-bold text-cream">
                  {s.value}
                </dd>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* roastery arch */}
        <div className="relative lg:col-span-5">
          <div className="anim-rise-in relative mx-auto max-w-md lg:ml-auto" style={{ animationDelay: "200ms" }}>
            <div className="ring-stain left-[-2.5rem] top-10 h-28 w-28 opacity-80" />
            <div className="ring-stain bottom-16 right-[-1.5rem] h-16 w-16 opacity-60" />
            <IconSteam className="absolute -top-9 left-1/2 z-10 h-12 w-12 -translate-x-1/2 text-taupe/70" />

            <div className="overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-seam shadow-lift">
              <img
                src={ROASTERY_IMAGE}
                alt="Inside the Emberline roastery — the vintage drum roaster glowing warm"
                className="anim-slow-zoom h-[26rem] w-full object-cover sm:h-[30rem] lg:h-[34rem]"
                loading="eager"
              />
            </div>

            {/* batch ticket */}
            <div className="absolute -bottom-8 -left-4 w-56 -rotate-3 rounded-xl border-2 border-dashed border-bark/25 bg-cream px-4 py-3.5 text-bark shadow-lift transition-transform duration-300 hover:rotate-0 sm:-left-10">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ember">
                Batch №214 · this week
              </p>
              <p className="mt-1 font-display text-lg font-black leading-tight">
                {featured.name}
              </p>
              <div className="mt-2 space-y-0.5 font-mono text-[10px] text-bark/70">
                <p>roasted tue · 06:40</p>
                <p>cup score {featured.score}</p>
                <p>24 bags · then it's gone</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
