import type { SVGProps } from "react";
import type { Platform } from "@/lib/types";

type IconProps = SVGProps<SVGSVGElement>;

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const YouTubeIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path fill="currentColor" d="M9 7.5v9l7.5-4.5z" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
    <rect x="4" y="4" width="16" height="16" rx="5" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="17" cy="7" r=".6" fill="currentColor" />
  </svg>
);

export const TikTokIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path fill="currentColor" d="M16 3c.3 2.2 1.6 3.6 4 3.8v3c-1.5 0-2.8-.4-4-1.2v6.2A5.8 5.8 0 1 1 10.2 9v3.1a2.8 2.8 0 1 0 2.8 2.8V3z" />
  </svg>
);

export const TwitchIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
    <path d="M5 4h14v10l-4 4h-4l-3 3v-3H5z" />
    <path d="M11 8v4M15 8v4" />
  </svg>
);

export const XIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path fill="currentColor" d="M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.2L5.6 21h-3l7.1-8.1L2.2 3h6.2l4.3 5.7zm-1 16.2h1.7L7.3 4.7H5.5z" />
  </svg>
);

export const PlatformIcon = ({ platform, ...p }: IconProps & { platform: Platform }) => {
  const Icon = { youtube: YouTubeIcon, instagram: InstagramIcon, tiktok: TikTokIcon, twitch: TwitchIcon, x: XIcon }[platform];
  return <Icon {...p} />;
};

export const VerifiedIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-label="Compte vérifié" {...p}>
    <path fill="currentColor" d="M12 1l2.6 2.1 3.3-.4.9 3.2 3 1.5-1.2 3.1 1.2 3.1-3 1.5-.9 3.2-3.3-.4L12 23l-2.6-2.1-3.3.4-.9-3.2-3-1.5L3.4 13.5 2.2 10.4l3-1.5.9-3.2 3.3.4z" />
    <path fill="#fff" d="M10.6 15.6l-3.2-3.2 1.4-1.4 1.8 1.8 4.6-4.6 1.4 1.4z" />
  </svg>
);

export const BellIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
    <path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
    <circle cx="11" cy="11" r="6" />
    <path d="M20 20l-4.5-4.5" />
  </svg>
);

export const PlayIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path fill="currentColor" d="M8 6v12l10-6z" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

export const WhatsAppIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
    <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z" />
  </svg>
);

export const ShopIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
    <path d="M6 8h12l-1 12H7z" />
    <path d="M9 8a3 3 0 0 1 6 0" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const MicIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden {...stroke} {...p}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </svg>
);
