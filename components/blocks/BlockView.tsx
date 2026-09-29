import clsx from "clsx";
import type { Block, BlockDataMap, BlockType } from "@/lib/blocks";
import { formatCompact, formatKickoff, formatNumber, timeAgo } from "@/lib/format";
import { PLATFORM_NAMES } from "@/lib/types";
import { ArrowRight, ArrowUpRight, BellIcon, MailIcon, MicIcon, PlayIcon, ShopIcon, VerifiedIcon, WhatsAppIcon } from "../icons";
import { NewsletterForm } from "../NewsletterForm";
import { LiveBadge, MediaFill, PlatformChip, PlatformDot } from "../ui";

type ViewProps<K extends BlockType> = { data: BlockDataMap[K]; cols: number; rows: number };

function YoutubeBlock({ data: v, cols, rows }: ViewProps<"youtube">) {
  const meta = `${formatCompact(v.views)} vues · ${timeAgo(v.publishedAt)}`;

  if (cols === 1) {
    return (
      <a href={v.url} className="card card--tile">
        <MediaFill media={v.thumbnail} alt={v.title} sizes="240px" />
        <div className="card__top">
          <h3 className="tile__title">{v.title}</h3>
          <PlatformChip platform={v.platform} size="sm" />
        </div>
        <span className="views">
          <PlayIcon /> {formatCompact(v.views)}
        </span>
      </a>
    );
  }

  if (rows === 1) {
    return (
      <a href={v.url} className="card card--row">
        <div className="thumb thumb--row">
          <MediaFill media={v.thumbnail} alt={v.title} sizes="240px" />
          {v.duration && <span className="duration">{v.duration}</span>}
        </div>
        <div className="row__body">
          <PlatformChip platform={v.platform} size="sm" />
          <h3 className="card__title clamp-3">{v.title}</h3>
          <span className="meta">{meta}</span>
        </div>
      </a>
    );
  }

  return (
    <a href={v.url} className="card card--video">
      <div className="card__top">
        <span className="meta meta--strong">
          {v.channel} · {PLATFORM_NAMES[v.platform]}
        </span>
        <PlatformChip platform={v.platform} />
      </div>
      <div className="thumb">
        <MediaFill media={v.thumbnail} alt={v.title} />
        {v.overlayTitle && <span className="thumb__title">{v.overlayTitle}</span>}
        {v.duration && <span className="duration">{v.duration}</span>}
      </div>
      <h3 className="card__title">{v.title}</h3>
      <div className="card__foot">
        <span className="meta">{meta}</span>
        <span className="btn btn--dark btn--sm">
          <PlayIcon />
          Regarder
        </span>
      </div>
    </a>
  );
}

function PlaylistBlock({ data: p }: ViewProps<"playlist">) {
  return (
    <article className="card card--playlist">
      <div className="playlist__head">
        <div className="playlist__cover">
          <MediaFill media={p.cover} sizes="80px" />
        </div>
        <div>
          <span className="eyebrow eyebrow--muted">Playlist</span>
          <h3 className="display display--md">{p.title}</h3>
          <span className="meta">
            {p.videoCount} vidéos · {p.totalDuration} de débrief
          </span>
        </div>
        <PlatformChip platform="youtube" />
      </div>
      <ol className="playlist">
        {p.items.map((item, i) => (
          <li key={i} className={i === 0 ? "is-current" : undefined}>
            <a href={item.url}>
              <span className="idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="t">{item.title}</span>
              <span className="d">{item.duration}</span>
            </a>
          </li>
        ))}
      </ol>
    </article>
  );
}

function MatchBlock({ data: m }: ViewProps<"match">) {
  const kickoff = formatKickoff(m.kickoff);
  return (
    <div className="card card--dark card--match">
      <div className="card__top">
        <span className="eyebrow">Prochain match commenté</span>
        <span className="eyebrow">
          {m.competition} · {m.round}
        </span>
      </div>
      <div className="match">
        <span className="display display--xl">{m.home}</span>
        <div className="match__time">
          <small>{kickoff.day}</small>
          <strong>{kickoff.time}</strong>
        </div>
        <span className="display display--xl">{m.away}</span>
      </div>
      <div className="card__foot">
        <span className="meta meta--light meta--icons">
          {m.platforms.map((p) => (
            <PlatformDot key={p} platform={p} />
          ))}
          Live commenté
        </span>
        <button className="btn btn--white btn--sm">
          <BellIcon />
          Me rappeler
        </button>
      </div>
    </div>
  );
}

function LiveBlock({ data: l }: ViewProps<"live">) {
  return (
    <a href={l.url} className="card card--multiplex">
      <div className="pitch" aria-hidden />
      <div className="card__top">
        {l.isLive ? <LiveBadge variant="light">En direct</LiveBadge> : <span className="badge badge--light">Bientôt</span>}
        <PlatformChip platform={l.platform} variant="glass" />
      </div>
      <div className="card__bottom">
        <div>
          <h3 className="display display--lg">{l.title}</h3>
          {l.isLive && <p className="meta meta--light">{formatCompact(l.viewers)} spectateurs en ce moment</p>}
        </div>
        <span className="btn btn--white btn--sm btn--blue-text">
          Rejoindre <ArrowRight />
        </span>
      </div>
    </a>
  );
}

function StatBlock({ data: s }: ViewProps<"stat">) {
  return (
    <div className="card card--dark card--community">
      <span className="eyebrow">{s.eyebrow}</span>
      <div>
        <p className="display display--xl">{s.value}</p>
        <p className="meta meta--light">{s.caption}</p>
      </div>
    </div>
  );
}

const instaTones = ["violet", "violet2"] as const;

function InstagramBlock({ data: ig }: ViewProps<"instagram">) {
  return (
    <a href={ig.url} className="card card--insta">
      <div className="card__top">
        <span className="meta meta--strong">{ig.handle}</span>
        <PlatformChip platform="instagram" size="sm" />
      </div>
      <div className="insta-grid">
        {ig.posts.slice(0, 2).map((p, i) => (
          <div key={i} className="insta-grid__item">
            <MediaFill media={{ tone: instaTones[i % 2], imageUrl: p.imageUrl }} sizes="120px" />
            {p.label && <span>{p.label}</span>}
          </div>
        ))}
      </div>
    </a>
  );
}

function ShortBlock({ data: s }: ViewProps<"short">) {
  return (
    <a href={s.url} className="card card--short">
      <MediaFill media={s.thumbnail} alt={s.caption} sizes="(max-width: 860px) 50vw, 240px" />
      <p className={clsx("short__caption", s.captionStyle !== "white" && `short__caption--${s.captionStyle}`)}>{s.caption}</p>
      <div className="short__footer">
        {s.footerTitle && <p className="display display--sm">{s.footerTitle}</p>}
        <span className="views">
          <PlayIcon /> {formatCompact(s.views)}
        </span>
      </div>
    </a>
  );
}

function PostBlock({ data: p }: ViewProps<"post">) {
  return (
    <a href={p.url} className="card card--tweet">
      <div className="card__top">
        <div className="author">
          <span className="avatar">
            <MediaFill media={p.avatar} sizes="40px" />
          </span>
          <div>
            <strong>
              {p.author} <VerifiedIcon className="verified verified--sm" />
            </strong>
            <span className="meta">
              {p.handle} · {timeAgo(p.publishedAt)}
            </span>
          </div>
        </div>
        <PlatformChip platform={p.platform} />
      </div>
      <p className="tweet__text">{p.text}</p>
      <ul className="tweet__stats meta">
        <li>{formatCompact(p.replies)} réponses</li>
        <li>{formatCompact(p.reposts)} reposts</li>
        <li>{formatCompact(p.likes)} j’aime</li>
      </ul>
    </a>
  );
}

function NewsletterBlock({ data: n }: ViewProps<"newsletter">) {
  return (
    <div className="card card--pink card--newsletter">
      <div>
        <h3 className="display display--md text-red">{n.title}</h3>
        <p className="small">{n.text}</p>
      </div>
      <NewsletterForm />
    </div>
  );
}

function ContactBlock({ data: c }: ViewProps<"contact">) {
  return (
    <a href={c.url} className="card card--contact">
      <span className="round-arrow">
        <ArrowUpRight />
      </span>
      <div>
        <h3 className="card__title">{c.title}</h3>
        <p className="meta">{c.text}</p>
      </div>
    </a>
  );
}

function DossierBlock({ data: d }: ViewProps<"dossier">) {
  return (
    <a href={d.url} className="card card--dark card--dossier">
      <div className="ring" aria-hidden />
      <div className="card__top">
        <span className="badge badge--red">{d.label}</span>
        <span className="meta meta--light">Mis à jour {timeAgo(d.updatedAt)}</span>
      </div>
      <div>
        <h3 className="display display--md">{d.title}</h3>
        <p className="meta meta--light meta--icons">
          {d.platforms.map((p) => (
            <PlatformDot key={p} platform={p} />
          ))}
          {d.formats}
        </p>
      </div>
    </a>
  );
}

function TileBlock({ data: t }: ViewProps<"tile">) {
  return (
    <a href={t.url} className="card card--tile">
      <MediaFill media={t.image} alt={t.title} sizes="240px" />
      <div className="card__top">
        <h3 className="display display--sm">{t.title}</h3>
        <PlatformChip platform={t.platform} variant={t.platform === "tiktok" ? "dark" : undefined} size="sm" />
      </div>
      <span className="views">
        <PlayIcon /> {formatCompact(t.views)}
      </span>
    </a>
  );
}

function ScheduleBlock({ data: s }: ViewProps<"schedule">) {
  return (
    <article className="card card--lives">
      <div className="pitch pitch--right" aria-hidden />
      <div className="lives__intro">
        <PlatformChip platform={s.platform} variant="glass" />
        <div>
          <h3 className="display display--lg">{s.title}</h3>
          <p className="lives__lead">{s.lead}</p>
        </div>
      </div>
      <ul className="schedule">
        {s.slots.map((slot, i) => (
          <li key={i} className={clsx("slot", slot.featured && "slot--featured")}>
            <span className="eyebrow">{slot.day}</span>
            <div>
              <strong className="display display--md">{slot.time}</strong>
              <small>{slot.label}</small>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

function JoinBlock({ data: j }: ViewProps<"join">) {
  return (
    <a href={j.url} className="card card--join">
      <div className="ring" aria-hidden />
      <div className="card__top">
        <span className="eyebrow">{j.eyebrow}</span>
        <WhatsAppIcon className="join__icon" />
      </div>
      <div className="card__bottom">
        <div>
          <h3 className="display display--lg">{j.title}</h3>
          <p className="meta meta--light">
            {formatNumber(j.members)} membres · {j.channel}
          </p>
        </div>
        <span className="btn btn--white btn--sm btn--red-text">Rejoindre</span>
      </div>
    </a>
  );
}

const linkIcons: Record<string, typeof ShopIcon> = { shop: ShopIcon, mail: MailIcon, mic: MicIcon };

function LinksBlock({ data: l }: ViewProps<"links">) {
  return (
    <div className="links">
      {l.links.map((link, i) => {
        const Icon = linkIcons[link.icon] ?? ArrowUpRight;
        return (
          <a key={i} href={link.url} id={link.icon === "mic" ? "contact" : undefined} className="link-row">
            <span className="link-row__icon">
              <Icon />
            </span>
            <span className="link-row__text">
              <strong>{link.title}</strong>
              <small>{link.subtitle}</small>
            </span>
            <ArrowUpRight className="link-row__arrow" />
          </a>
        );
      })}
    </div>
  );
}

const views: { [K in BlockType]: (p: ViewProps<K>) => React.ReactNode } = {
  youtube: YoutubeBlock,
  playlist: PlaylistBlock,
  match: MatchBlock,
  live: LiveBlock,
  stat: StatBlock,
  instagram: InstagramBlock,
  short: ShortBlock,
  post: PostBlock,
  newsletter: NewsletterBlock,
  contact: ContactBlock,
  dossier: DossierBlock,
  tile: TileBlock,
  schedule: ScheduleBlock,
  join: JoinBlock,
  links: LinksBlock,
};

export function BlockView({ block }: { block: Block }) {
  const View = views[block.type] as (p: ViewProps<BlockType>) => React.ReactNode;
  return <View data={block.data} cols={block.cols} rows={block.rows} />;
}
