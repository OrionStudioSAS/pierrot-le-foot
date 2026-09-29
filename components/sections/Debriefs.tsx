import type { HomeData } from "@/lib/data";
import { formatCompact, formatNumber, timeAgo } from "@/lib/format";
import { Reveal } from "../Reveal";
import { MediaFill, PlatformChip, SectionHeader } from "../ui";

type Props = Pick<HomeData, "playlist" | "debriefs"> & { total: number };

export function Debriefs({ playlist, debriefs, total }: Props) {
  return (
    <section id="debriefs" className="section">
      <SectionHeader index={2} title="Débriefs" link={{ label: `${formatNumber(total)} vidéos · Tout voir`, href: "#" }} />

      <div className="grid grid--debriefs">
        <Reveal className="area-playlist">
          <article className="card card--playlist">
            <div className="playlist__head">
              <div className="playlist__cover">
                <MediaFill media={playlist.cover} sizes="80px" />
              </div>
              <div>
                <span className="eyebrow eyebrow--muted">Playlist</span>
                <h3 className="display display--md">{playlist.title}</h3>
                <span className="meta">
                  {playlist.videoCount} vidéos · {playlist.totalDuration} de débrief
                </span>
              </div>
              <PlatformChip platform={playlist.platform} />
            </div>
            <ol className="playlist">
              {playlist.items.map((item, i) => (
                <li key={item.id} className={i === 0 ? "is-current" : undefined}>
                  <a href={item.url}>
                    <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                    <span className="t">{item.title}</span>
                    <span className="d">{item.duration}</span>
                  </a>
                </li>
              ))}
            </ol>
          </article>
        </Reveal>

        {debriefs.map((video, i) => (
          <Reveal key={video.id} className={`area-v${i + 1}`} delay={0.08 * (i + 1)}>
            <a href={video.url} className="card card--row">
              <div className="thumb thumb--row">
                <MediaFill media={video.thumbnail} alt={video.title} sizes="240px" />
                {video.duration && <span className="duration">{video.duration}</span>}
              </div>
              <div className="row__body">
                <PlatformChip platform={video.platform} size="sm" />
                <h3 className="card__title clamp-3">{video.title}</h3>
                <span className="meta">
                  {formatCompact(video.views)} vues · {timeAgo(video.publishedAt)}
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
