import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const IconBean = (props: P) => (
  <svg {...base(props)}>
    <ellipse cx="12" cy="12" rx="6.2" ry="8.6" transform="rotate(-28 12 12)" />
    <path d="M8.2 5.6c4.4 2.8 3.4 9.8 7.6 12.8" />
  </svg>
);

export const IconFlame = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 3.2c.6 3-1.8 4.6-2.9 6.4-1 1.7-1.3 3.6-.4 5.5A5.8 5.8 0 0 0 12 18a5.9 5.9 0 0 0 5.7-6c0-3.4-2.6-4.4-2.4-7.6-1.5.9-2.3 2.3-2.4 4.1" />
    <path d="M9.5 20.8c1.6.6 3.4.6 5 0" />
  </svg>
);

export const IconLeaf = (props: P) => (
  <svg {...base(props)}>
    <path d="M5 19C5 9 12 4.5 20 4c-.5 8-5 15-15 15Z" />
    <path d="M5 19c3-5.5 6.5-9 11-11.5" />
  </svg>
);

export const IconCup = (props: P) => (
  <svg {...base(props)}>
    <path d="M4.5 10h12v5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5v-5Z" />
    <path d="M16.5 11h1.2a2.3 2.3 0 0 1 0 4.6h-1.4" />
    <path d="M8 6.8c-.8-1 .8-1.7 0-2.8M12 6.8c-.8-1 .8-1.7 0-2.8" />
  </svg>
);

export const IconSearch = (props: P) => (
  <svg {...base(props)}>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="m20 20-4.4-4.4" />
  </svg>
);

export const IconBag = (props: P) => (
  <svg {...base(props)}>
    <path d="M5.5 8h13l-1 12a1.6 1.6 0 0 1-1.6 1.4H8.1A1.6 1.6 0 0 1 6.5 20L5.5 8Z" />
    <path d="M8.8 10V6.8a3.2 3.2 0 0 1 6.4 0V10" />
  </svg>
);

export const IconPlus = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMinus = (props: P) => (
  <svg {...base(props)}>
    <path d="M5 12h14" />
  </svg>
);

export const IconX = (props: P) => (
  <svg {...base(props)}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconStar = ({ filled = true, ...props }: P & { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.6} strokeLinejoin="round" {...props}>
    <path d="M12 3.4l2.6 5.3 5.9.9-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.6l5.9-.9L12 3.4Z" />
  </svg>
);

export const IconCheck = (props: P) => (
  <svg {...base(props)}>
    <path d="m4.5 12.5 5 5L19.5 7" />
  </svg>
);

export const IconArrow = (props: P) => (
  <svg {...base(props)}>
    <path d="M4 12h16m0 0-6-6m6 6-6 6" />
  </svg>
);

export const IconTruck = (props: P) => (
  <svg {...base(props)}>
    <path d="M2.5 6h11v11h-11zM13.5 10h4.2l3 3.4V17h-7.2" />
    <circle cx="7" cy="17.6" r="1.9" />
    <circle cx="17" cy="17.6" r="1.9" />
  </svg>
);

export const IconCard = (props: P) => (
  <svg {...base(props)}>
    <rect x="2.8" y="5.5" width="18.4" height="13" rx="2" />
    <path d="M2.8 10h18.4M6.5 14.5h4" />
  </svg>
);

export const IconLock = (props: P) => (
  <svg {...base(props)}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="1.8" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2" />
  </svg>
);

export const IconChevron = (props: P) => (
  <svg {...base(props)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconCone = (props: P) => (
  <svg {...base(props)}>
    <path d="M4 5.5h16l-5.5 8v5h-5v-5L4 5.5Z" />
    <path d="M9 8.5h6" />
  </svg>
);

export const IconPin = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 21s-6.5-5.7-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.3 12 21 12 21Z" />
    <circle cx="12" cy="10.3" r="2.3" />
  </svg>
);

export const IconSpark = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.4 2.4M15.6 15.6 18 18M18 6l-2.4 2.4M8.4 15.6 6 18" />
  </svg>
);

export const IconTrash = (props: P) => (
  <svg {...base(props)}>
    <path d="M4.5 6.5h15M9.5 6V4.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V6M7 6.5l.8 12.6a1.5 1.5 0 0 0 1.5 1.4h5.4a1.5 1.5 0 0 0 1.5-1.4L17 6.5" />
    <path d="M10.2 10.5v6M13.8 10.5v6" />
  </svg>
);

export const IconScale = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 3.5v3M5 6.5h14l1.5 4a3.6 3.6 0 0 1-7 0L15 6.5M9 6.5l-1.5 4a3.6 3.6 0 0 1-7 0L2 6.5" transform="translate(1.5 0)" />
    <path d="M12 6.5V20M8.5 20h7" />
  </svg>
);

export const IconClock = (props: P) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconThermo = (props: P) => (
  <svg {...base(props)}>
    <path d="M10 4a2 2 0 1 1 4 0v9.3a4.5 4.5 0 1 1-4 0V4Z" />
    <path d="M12 9v6.5" />
    <circle cx="12" cy="17" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

export const IconSteam = (props: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" {...props}>
    <path className="steam-path" d="M8 16c-1.2-1.6 1.2-2.4 0-4s1.2-2.4 0-4" style={{ animationDelay: "0s" }} />
    <path className="steam-path" d="M12.5 17c-1.2-1.6 1.2-2.4 0-4s1.2-2.4 0-4" style={{ animationDelay: "0.7s" }} />
    <path className="steam-path" d="M17 16c-1.2-1.6 1.2-2.4 0-4s1.2-2.4 0-4" style={{ animationDelay: "1.4s" }} />
  </svg>
);

export const LogoMark = (props: P) => (
  <svg viewBox="0 0 40 40" fill="none" {...props}>
    <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="2" />
    <ellipse cx="20" cy="21" rx="7.2" ry="10" transform="rotate(-28 20 21)" stroke="currentColor" strokeWidth="2" />
    <path d="M15.6 13.4c5.2 3.2 4 11.4 8.8 15.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 6.5c1.4-1.6 3-1.6 4.4 0s3 1.6 4.4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
