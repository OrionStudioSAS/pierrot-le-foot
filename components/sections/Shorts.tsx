import clsx from "clsx";
import type { HomeData } from "@/lib/data";
import { formatCompact, formatNumber } from "@/lib/format";
import { PlayIcon } from "../icons";
import { Reveal } from "../Reveal";
import { MediaFill, SectionHeader } from "../ui";

type Props = Pick<HomeData, "shorts"> & { total: number };

export function Shorts({ shorts, total }: Props) {
  return (
    <section id="shorts" className="section">
      <SectionHeader index={4} title="Shorts & Reels" link={{ label: `${formatNumber(total)} formats courts · Tout voir`, href: "#" }} />

      <div className="grid grid--shorts">
        {shorts.map((short, i) => (
          <Reveal key={short.id} delay={0.06 * i}>
            <a href={short.url} className="card card--short card--short-ratio">
              <MediaFill media={short.thumbnail} alt={short.caption} sizes="(max-width: 760px) 50vw, 240px" />
              <p className={clsx("short__caption", short.captionStyle && `short__caption--${short.captionStyle}`)}>{short.caption}</p>
              <div className="short__footer">
                <span className="views">
                  <PlayIcon /> {formatCompact(short.views)}
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
