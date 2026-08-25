import { IconCheck } from "../lib/icons";

export interface ToastMsg {
  id: number;
  title: string;
  sub?: string;
}

export default function Toasts({
  toasts,
  onDismiss,
}: {
  toasts: ToastMsg[];
  onDismiss: (id: number) => void;
}) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-5 left-5 z-[80] flex w-[calc(100%-2.5rem)] max-w-sm flex-col gap-2.5">
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => onDismiss(t.id)}
          className="anim-toast-in flex items-center gap-3 rounded-2xl border-l-4 border-caramel bg-cream px-4 py-3 text-left text-bark shadow-lift transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-caramel text-bark">
            <IconCheck className="h-4 w-4" strokeWidth={2.6} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold">{t.title}</span>
            {t.sub && (
              <span className="block truncate font-mono text-[10.5px] uppercase tracking-[0.1em] text-bark/55">
                {t.sub}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}
