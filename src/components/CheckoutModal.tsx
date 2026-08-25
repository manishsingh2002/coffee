import { useEffect, useState, type ReactNode } from "react";
import type { CartLine, Totals } from "./CartDrawer";
import { fmtStrict } from "../data/products";
import { useEscape, useLockBody } from "../lib/motion";
import {
  IconArrow,
  IconBean,
  IconCard,
  IconCheck,
  IconLock,
  IconTruck,
  IconX,
} from "../lib/icons";

type Step = "details" | "payment" | "processing" | "done";

const STEPS: { id: Step; label: string }[] = [
  { id: "details", label: "Details" },
  { id: "payment", label: "Payment" },
  { id: "done", label: "Confirmed" },
];

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function Field({
  label,
  err,
  children,
}: {
  label: string;
  err?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-taupe">
        {label}
        {err && <span className="normal-case tracking-normal text-ember">{err}</span>}
      </span>
      {children}
    </label>
  );
}

export default function CheckoutModal({
  lines,
  totals,
  onClose,
  onComplete,
}: {
  lines: CartLine[];
  totals: Totals;
  onClose: () => void;
  onComplete: () => void;
}) {
  const itemCount = lines.reduce((s, l) => s + l.qty, 0);
  // snapshot so the confirmation screen survives the cart being cleared
  const [snapshot] = useState({ itemCount, total: totals.total, email: "" });
  const [orderNo] = useState(
    () => `EL-${Math.floor(2400 + Math.random() * 7000)}`,
  );

  const [step, setStep] = useState<Step>("details");
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    card: "",
    expiry: "",
    cvc: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useLockBody(true);
  useEscape(true, () => {
    if (step !== "processing") onClose();
  });

  useEffect(() => {
    if (step !== "processing") return;
    const t = setTimeout(() => {
      onComplete();
      setStep("done");
    }, 1900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const set = (k: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const validateDetails = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Tell us who's brewing";
    if (!emailOk(form.email)) e.email = "That email doesn't look right";
    if (form.address.trim().length < 5) e.address = "We need a street address";
    if (!form.city.trim()) e.city = "City, please";
    if (form.zip.trim().length < 3) e.zip = "ZIP?";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Record<string, string> = {};
    if (form.card.replace(/\s/g, "").length !== 16) e.card = "16 digits, any will do";
    const m = parseInt(form.expiry.slice(0, 2), 10);
    const y = parseInt(form.expiry.slice(3), 10);
    if (form.expiry.length !== 5 || m < 1 || m > 12 || (y !== undefined && y < 26))
      e.expiry = "Use MM/YY, in the future";
    if (form.cvc.replace(/\D/g, "").length < 3) e.cvc = "3–4 digits";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const inputCls = (err?: string) =>
    `w-full rounded-xl border bg-espresso/70 px-4 py-3 text-sm text-cream placeholder:text-faint/60 transition-all duration-300 focus:outline-none focus:ring-2 ${
      err
        ? "border-ember ring-ember/20 focus:ring-ember/25"
        : "border-seam focus:border-caramel/70 focus:ring-caramel/20"
    }`;

  const stepIndex = STEPS.findIndex((s) => s.id === (step === "processing" ? "payment" : step));

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
    >
      <div
        className="anim-fade-in absolute inset-0 bg-espresso/85 backdrop-blur-sm"
        onClick={() => step !== "processing" && onClose()}
      />
      <div className="anim-sheet-in warm-scroll relative max-h-[94vh] w-full max-w-lg overflow-y-auto rounded-t-[1.5rem] border border-seam bg-bark p-6 shadow-lift sm:rounded-[1.5rem] sm:p-8">
        {step !== "done" && step !== "processing" && (
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-seam text-sand transition-all duration-300 hover:rotate-90 hover:border-caramel hover:text-caramel"
          >
            <IconX className="h-4 w-4" />
          </button>
        )}

        {/* step rail */}
        {step !== "done" && (
          <div className="mb-6 flex items-center gap-2">
            {STEPS.slice(0, 2).map((s, i) => (
              <div key={s.id} className="flex flex-1 items-center gap-2">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold transition-colors duration-300 ${
                    i <= stepIndex ? "bg-caramel text-bark" : "border border-seam text-faint"
                  }`}
                >
                  {i < stepIndex || step === "processing" ? (
                    <IconCheck className="h-3.5 w-3.5" strokeWidth={2.6} />
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
                    i <= stepIndex ? "text-cream" : "text-faint"
                  }`}
                >
                  {s.label}
                </span>
                {i === 0 && <span className="h-px flex-1 bg-seam" />}
              </div>
            ))}
            <span className="ml-2 flex items-center gap-1.5 rounded-full border border-ember/40 bg-ember/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ember">
              <IconLock className="h-3 w-3" />
              Test mode
            </span>
          </div>
        )}

        {step === "details" && (
          <div className="anim-fade-in">
            <h3 className="font-display text-3xl font-black text-cream">
              Where's it <em className="font-light italic text-caramel">brewing?</em>
            </h3>
            <p className="mt-1.5 text-sm text-faint">
              Shipping details for {snapshot.itemCount}{" "}
              {snapshot.itemCount === 1 ? "bag" : "bags"} of this week's roast.
            </p>

            <div className="mt-6 space-y-4">
              <Field label="Full name" err={errors.name}>
                <input
                  className={inputCls(errors.name)}
                  placeholder="Jo March"
                  value={form.name}
                  onChange={(e) => set("name")(e.target.value)}
                  autoComplete="name"
                />
              </Field>
              <Field label="Email" err={errors.email}>
                <input
                  className={inputCls(errors.email)}
                  placeholder="jo@littlewomen.co"
                  value={form.email}
                  onChange={(e) => set("email")(e.target.value)}
                  autoComplete="email"
                  inputMode="email"
                />
              </Field>
              <Field label="Street address" err={errors.address}>
                <input
                  className={inputCls(errors.address)}
                  placeholder="3323 SE Division St"
                  value={form.address}
                  onChange={(e) => set("address")(e.target.value)}
                  autoComplete="street-address"
                />
              </Field>
              <div className="grid grid-cols-[1fr_7rem] gap-3">
                <Field label="City" err={errors.city}>
                  <input
                    className={inputCls(errors.city)}
                    placeholder="Portland"
                    value={form.city}
                    onChange={(e) => set("city")(e.target.value)}
                  />
                </Field>
                <Field label="ZIP" err={errors.zip}>
                  <input
                    className={inputCls(errors.zip)}
                    placeholder="97202"
                    value={form.zip}
                    onChange={(e) => set("zip")(e.target.value)}
                    inputMode="numeric"
                  />
                </Field>
              </div>
            </div>

            <button
              onClick={() => {
                if (validateDetails()) {
                  setForm((f) => ({ ...f }));
                  snapshot.email = form.email;
                  setStep("payment");
                }
              }}
              className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-caramel py-3.5 text-sm font-bold text-bark transition-all duration-300 hover:bg-cream active:scale-[0.98]"
            >
              Continue to payment
              <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        )}

        {step === "payment" && (
          <div className="anim-fade-in">
            <h3 className="font-display text-3xl font-black text-cream">
              Settle the <em className="font-light italic text-caramel">tab.</em>
            </h3>
            <p className="mt-1.5 flex items-center gap-2 text-sm text-faint">
              <IconCard className="h-4 w-4 text-caramel" />
              Simulated payment — any digits work, nothing is charged.
            </p>

            <div className="mt-6 space-y-4">
              <Field label="Card number" err={errors.card}>
                <input
                  className={`${inputCls(errors.card)} font-mono tracking-[0.08em]`}
                  placeholder="4242 4242 4242 4242"
                  value={form.card}
                  onChange={(e) => set("card")(formatCard(e.target.value))}
                  inputMode="numeric"
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Expiry" err={errors.expiry}>
                  <input
                    className={`${inputCls(errors.expiry)} font-mono`}
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={(e) => set("expiry")(formatExpiry(e.target.value))}
                    inputMode="numeric"
                  />
                </Field>
                <Field label="CVC" err={errors.cvc}>
                  <input
                    className={`${inputCls(errors.cvc)} font-mono`}
                    placeholder="•••"
                    value={form.cvc}
                    onChange={(e) =>
                      set("cvc")(e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    inputMode="numeric"
                    type="password"
                  />
                </Field>
              </div>
            </div>

            {/* mini summary */}
            <div className="mt-5 rounded-xl border border-seam-soft bg-espresso/50 p-4">
              <ul className="space-y-1">
                {lines.map((l) => (
                  <li
                    key={l.key}
                    className="flex justify-between text-xs text-sand"
                  >
                    <span className="truncate pr-3">
                      {l.qty} × {l.product.name}
                    </span>
                    <span className="font-mono shrink-0">
                      {fmtStrict(l.product.price * l.qty)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-2.5 flex justify-between border-t border-seam-soft pt-2.5 text-sm">
                <span className="font-semibold text-cream">Total due</span>
                <span className="font-display font-black text-caramel">
                  {fmtStrict(totals.total)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setStep("details")}
                className="rounded-full border border-seam px-5 py-3.5 text-sm font-semibold text-sand transition-colors duration-300 hover:border-caramel/60 hover:text-cream"
              >
                Back
              </button>
              <button
                onClick={() => validatePayment() && setStep("processing")}
                className="group flex flex-1 items-center justify-center gap-2.5 rounded-full bg-caramel py-3.5 text-sm font-bold text-bark transition-all duration-300 hover:bg-cream active:scale-[0.98]"
              >
                <IconLock className="h-4 w-4" />
                Pay {fmtStrict(totals.total)}
              </button>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="anim-fade-in flex flex-col items-center py-14 text-center">
            <div className="relative">
              <IconBean className="anim-spin-slow h-14 w-14 text-caramel" />
              <span className="anim-glow absolute inset-0 -m-4 rounded-full bg-caramel/15 blur-xl" />
            </div>
            <p className="mt-6 font-display text-2xl font-bold text-cream">
              Grinding the gears…
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
              Securing payment · reserving your bags
            </p>
          </div>
        )}

        {step === "done" && (
          <div className="anim-fade-in flex flex-col items-center py-6 text-center">
            <span className="anim-pop-in flex h-20 w-20 items-center justify-center rounded-full bg-sage/15 ring-2 ring-sage/50">
              <IconCheck className="h-9 w-9 text-sage" strokeWidth={2.4} />
            </span>
            <h3 className="mt-5 font-display text-3xl font-black text-cream sm:text-4xl">
              Order <em className="font-light italic text-sage">confirmed.</em>
            </h3>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-seam bg-espresso/60 px-4 py-2 font-mono text-sm font-bold tracking-[0.12em] text-caramel">
              {orderNo}
            </p>
            <div className="mt-6 w-full space-y-2.5 rounded-xl border border-seam-soft bg-espresso/50 p-4 text-left text-sm">
              <p className="flex justify-between text-sand">
                <span>{snapshot.itemCount} bags · this Tuesday's roast</span>
                <span className="font-mono font-bold text-cream">
                  {fmtStrict(snapshot.total)}
                </span>
              </p>
              <p className="flex items-center gap-2 text-xs text-faint">
                <IconTruck className="h-4 w-4 shrink-0 text-caramel" />
                Ships Thursday — tracking heads to{" "}
                <span className="truncate font-mono text-sand">{snapshot.email || "your inbox"}</span>
              </p>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-faint">
              (This was a simulated checkout — no card was charged, no beans
              were harmed.)
            </p>
            <button
              onClick={onClose}
              className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-caramel py-3.5 text-sm font-bold text-bark transition-all duration-300 hover:bg-cream active:scale-[0.98]"
            >
              Back to the shelf
              <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
