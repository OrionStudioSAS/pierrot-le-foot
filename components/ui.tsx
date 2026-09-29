import Image from "next/image";
import clsx from "clsx";
import type { ReactNode } from "react";
import type { Media, Platform } from "@/lib/types";
import { ArrowRight, PlatformIcon } from "./icons";

/** Image plein cadre, ou dégradé de remplacement tant qu'il n'y a pas d'URL. */
export function MediaFill({ media, alt = "", sizes = "50vw", className }: { media: Media; alt?: string; sizes?: string; className?: string }) {
  return (
    <div className={clsx("media", `tone-${media.tone}`, className)}>
      {media.imageUrl && <Image src={media.imageUrl} alt={alt} fill sizes={sizes} className="media__img" />}
    </div>
  );
}

export function PlatformChip({ platform, variant, size }: { platform: Platform; variant?: "glass" | "dark"; size?: "sm" }) {
  return (
    <span className={clsx("chip", `chip--${variant ?? platform}`, size && `chip--${size}`)}>
      <PlatformIcon platform={platform} />
    </span>
  );
}

/** Petit carré coloré aux couleurs d'une plateforme (lignes de métadonnées). */
export function PlatformDot({ platform }: { platform: Platform }) {
  return (
    <span className={clsx("pdot", `chip--${platform}`)}>
      <PlatformIcon platform={platform} />
    </span>
  );
}

export function LiveBadge({ children, variant = "red" }: { children: ReactNode; variant?: "red" | "light" }) {
  return (
    <span className={clsx("badge", `badge--${variant}`)}>
      <i className="dot dot--pulse" />
      {children}
    </span>
  );
}

export function SectionHeader({ index, title, link }: { index: number; title: string; link?: { label: string; href: string } }) {
  return (
    <header className="section__head">
      <h2 className="section__title">
        <span className="num">{String(index).padStart(2, "0")}</span>
        {title}
      </h2>
      {link && (
        <a href={link.href} className="see-all">
          {link.label} <ArrowRight />
        </a>
      )}
    </header>
  );
}
