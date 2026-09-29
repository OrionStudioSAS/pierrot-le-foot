import type { HomeData } from "@/lib/data";
import { formatCompact, formatNumber, timeAgo } from "@/lib/format";
import { PlayIcon } from "../icons";
import { Reveal } from "../Reveal";
import { MediaFill, PlatformChip, PlatformDot, SectionHeader } from "../ui";

type Props = Pick<HomeData, "mercatoDossier" | "mercatoTiles"> & { total: number };

export function Mercato({ mercatoDossier: dossier, mercatoTiles: tiles, total }: Props) {
  return (
    <section id="mercato" className="section">
      <SectionHeader index={3} title="Mercato" link={{ label: `${formatNumber(total)} contenus · Tout voir`, href: "#" }} />

      <div className="grid grid--mercato">
        <Reveal className="area-dossier">
          <a href={dossier.url} className="card card--dark card--dossier">
            <div className="ring" aria-hidden />
            <div className="card__top">
              <span className="badge badge--red">{dossier.label}</span>
              <span className="meta meta--light">Mis à jour {timeAgo(dossier.updatedAt)}</span>
            </div>
            <div>
              <h3 className="display display--md">{dossier.title}</h3>
              <p className="meta meta--light meta--icons">
                {dossier.platforms.map((p) => (
                  <PlatformDot key={p} platform={p} />
                ))}
                {dossier.formats}
              </p>
            </div>
          </a>
        </Reveal>

        {tiles.map((tile, i) => (
          <Reveal key={tile.id} className={`area-t${i + 1}`} delay={0.08 * (i + 1)}>
            <a href={tile.url} className="card card--tile">
              <MediaFill media={tile.image} alt={tile.title} sizes="240px" />
              <div className="card__top">
                <h3 className="display display--sm">{tile.title}</h3>
                <PlatformChip platform={tile.platform} variant={tile.platform === "tiktok" ? "dark" : undefined} size="sm" />
              </div>
              <span className="views">
                <PlayIcon /> {formatCompact(tile.views)}
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
