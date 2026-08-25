import { useState } from "react";
import { Reveal } from "../lib/motion";
import {
  IconCheck,
  IconCup,
  IconFlame,
  IconLeaf,
  IconPin,
  IconSteam,
  IconTruck,
  LogoMark,
} from "../lib/icons";

const steps = [
  {
    icon: IconLeaf,
    title: "Source",
    body: "Direct contracts with named farms in nine countries — prices agreed before harvest, not after.",
  },
  {
    icon: IconCup,
    title: "Sample",
    body: "Every lot is cupped three times blind before we commit. If it scores under 85, it doesn't ship.",
  },
  {
    icon: IconFlame,
    title: "Roast",
    body: "Twelve kilos at a time in a 1974 Probat, every Tuesday from 06:00. Profiles logged to the second.",
  },
  {
    icon: IconTruck,
    title: "Rest & ship",
    body: "Bags rest 48 hours to degas, then leave the roastery Thursday — at their absolute peak.",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "err" | "ok">("idle");

  const subscribe = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("err");
      return;
    }
    setState("ok");
  };

  return (
    <>
      {/* process strip */}
      <section id="process" className="relative scroll-mt-24 border-t border-seam-soft bg-bark/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-caramel">
                <span className="h-px w-10 bg-caramel/60" />
                From cherry to cup
              </p>
              <h2 className="mt-4 font-display text-3xl font-black tracking-tight text-cream sm:text-5xl">
                How the roast <em className="font-light italic text-taupe">happens.</em>
              </h2>
            </div>
            <p className="max-w-xs font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-faint">
              The whole journey, four steps, one week
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div className="group relative h-full overflow-hidden rounded-[1.25rem] border border-seam-soft bg-mocha/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-caramel/50 hover:shadow-card">
                  <span className="absolute right-4 top-3 font-display text-5xl font-black text-roast transition-colors duration-500 group-hover:text-seam">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <s.icon className="h-7 w-7 text-caramel transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110" />
                  <h3 className="mt-4 font-display text-xl font-bold text-cream">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-faint">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* footer */}
      <footer id="visit" className="scroll-mt-24 border-t border-seam-soft">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <LogoMark className="h-10 w-10 text-caramel" />
              <span className="leading-none">
                <span className="block font-display text-2xl font-black text-cream">
                  Emberline
                </span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-faint">
                  Roasters · est. 2019
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-faint">
              A two-drum roastery on SE Division. We buy small, roast smaller,
              and ship everything within four days of the roast.
            </p>
            <IconSteam className="mt-6 h-10 w-10 text-seam" />
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.24em] text-taupe">
              Cupping bar
            </h4>
            <ul className="mt-4 space-y-2 font-mono text-xs text-faint">
              <li className="flex justify-between gap-3">
                <span>Tue–Fri</span>
                <span className="text-sand">7a – 5p</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>Sat–Sun</span>
                <span className="text-sand">8a – 4p</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>Monday</span>
                <span className="text-ember">closed</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.24em] text-taupe">
              Find us
            </h4>
            <address className="mt-4 space-y-2 text-sm not-italic leading-relaxed text-faint">
              <p className="flex items-start gap-2">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
                3323 SE Division St
                <br />
                Portland, OR 97202
              </p>
              <p>(503) 555-0114</p>
              <p className="text-sand">hello@emberline.coffee</p>
            </address>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.24em] text-taupe">
              The roast letter
            </h4>
            <p className="mt-4 text-sm leading-relaxed text-faint">
              Tuesday's roast log, one recipe, zero spam. First pour's on us.
            </p>
            {state === "ok" ? (
              <p className="anim-pop-in mt-4 flex items-center gap-2 rounded-xl border border-sage/40 bg-sage/10 px-4 py-3 text-sm font-semibold text-sage">
                <IconCheck className="h-4 w-4" strokeWidth={2.4} />
                You're on the list — welcome in.
              </p>
            ) : (
              <div key={state} className={state === "err" ? "anim-shake mt-4" : "mt-4"}>
                <div className="flex gap-2">
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setState("idle");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && subscribe()}
                    placeholder="you@somewhere.co"
                    aria-label="Email for newsletter"
                    className={`min-w-0 flex-1 rounded-full border bg-espresso/70 px-4 py-2.5 text-sm text-cream placeholder:text-faint/60 transition-colors focus:outline-none ${
                      state === "err"
                        ? "border-ember"
                        : "border-seam focus:border-caramel/60"
                    }`}
                  />
                  <button
                    onClick={subscribe}
                    className="shrink-0 rounded-full bg-caramel px-5 py-2.5 text-sm font-bold text-bark transition-all duration-300 hover:bg-cream active:scale-95"
                  >
                    Join
                  </button>
                </div>
                {state === "err" && (
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ember">
                    That email doesn't pour — try again
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-seam-soft">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 font-mono text-[10px] uppercase tracking-[0.18em] text-faint sm:px-6 lg:px-8">
            <p>© 2026 Emberline Roasters — brewed by hand in PDX</p>
            <nav className="flex gap-5">
              <a href="#shop" className="transition-colors hover:text-caramel">
                The Shelf
              </a>
              <a href="#process" className="transition-colors hover:text-caramel">
                How we roast
              </a>
              <a href="#top" className="transition-colors hover:text-caramel">
                Back to top
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
