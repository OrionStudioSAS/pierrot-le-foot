import type { HomeData } from "@/lib/data";
import { formatCompact, formatKickoff, timeAgo } from "@/lib/format";
import { ArrowRight, ArrowUpRight, BellIcon, PlayIcon, VerifiedIcon } from "../icons";
import { NewsletterForm } from "../NewsletterForm";
import { Reveal } from "../Reveal";
import { LiveBadge, MediaFill, PlatformChip, PlatformDot, SectionHeader } from "../ui";

type Props = Pick<HomeData, "featuredVideo" | "live" | "profile" | "instagram" | "featuredShort" | "nextMatch" | "latestPost">;

export function Featured({ featuredVideo: video, live, profile, instagram, featuredShort: short, nextMatch: match, latestPost: post }: Props) {
  const kickoff = formatKickoff(match.kickoff);

  return (
    <section id="une" className="section">
      <SectionHeader index={1} title="À la une" />

      <div className="grid grid--une">
        <Reveal className="area-video">
          <a href={video.url} className="card card--video">
            <div className="card__top">
              <span className="meta meta--strong">
                {video.channel} · YouTube
              </span>
              <PlatformChip platform={video.platform} />
            </div>
            <div className="thumb">
              <MediaFill media={video.thumbnail} alt={video.title} />
              {video.overlayTitle && <span className="thumb__title">{video.overlayTitle}</span>}
              {video.duration && <span className="duration">{video.duration}</span>}
            </div>
            <h3 className="card__title">{video.title}</h3>
            <div className="card__foot">
              <span className="meta">
                {formatCompact(video.views)} vues · {timeAgo(video.publishedAt)}
              </span>
              <span className="btn btn--dark btn--sm">
                <PlayIcon />
                Regarder
              </span>
            </div>
          </a>
        </Reveal>

        <Reveal className="area-multi" delay={0.05}>
          <a href={live.url} className="card card--multiplex">
            <div className="pitch" aria-hidden />
            <div className="card__top">
              {live.isLive ? <LiveBadge variant="light">En direct</LiveBadge> : <span />}
              <PlatformChip platform={live.platform} variant="glass" />
            </div>
            <div className="card__bottom">
              <div>
                <h3 className="display display--lg">{live.title}</h3>
                <p className="meta meta--light">{formatCompact(live.viewers)} spectateurs en ce moment</p>
              </div>
              <span className="btn btn--white btn--sm btn--blue-text">
                Rejoindre <ArrowRight />
              </span>
            </div>
          </a>
        </Reveal>

        <Reveal className="area-comm" delay={0.1}>
          <div className="card card--dark card--community">
            <span className="eyebrow">Communauté</span>
            <div>
              <p className="display display--xl">{formatCompact(profile.stats.followers)}</p>
              <p className="meta meta--light">abonnés sur {profile.socials.length} plateformes</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="area-insta" delay={0.15}>
          <a href={instagram.url} className="card card--insta">
            <div className="card__top">
              <span className="meta meta--strong">{instagram.handle}</span>
              <PlatformChip platform="instagram" size="sm" />
            </div>
            <div className="insta-grid">
              {instagram.posts.map((p) => (
                <div key={p.id} className="insta-grid__item">
                  <MediaFill media={p.image} sizes="120px" />
                  <span>{p.label}</span>
                </div>
              ))}
            </div>
          </a>
        </Reveal>

        <Reveal className="area-short" delay={0.05}>
          <a href={short.url} className="card card--short">
            <MediaFill media={short.thumbnail} sizes="240px" />
            <span className="short__platform">
              <PlatformChip platform={short.platform} variant="dark" size="sm" />
            </span>
            <p className="short__caption">{short.caption}</p>
            <div className="short__footer">
              {short.footerTitle && <p className="display display--sm">{short.footerTitle}</p>}
              <span className="views">
                <PlayIcon /> {formatCompact(short.views)}
              </span>
            </div>
          </a>
        </Reveal>

        <Reveal className="area-match" delay={0.1}>
          <div className="card card--dark card--match">
            <div className="card__top">
              <span className="eyebrow">Prochain match commenté</span>
              <span className="eyebrow">
                {match.competition} · {match.round}
              </span>
            </div>
            <div className="match">
              <span className="display display--xl">{match.home}</span>
              <div className="match__time">
                <small>{kickoff.day}</small>
                <strong>{kickoff.time}</strong>
              </div>
              <span className="display display--xl">{match.away}</span>
            </div>
            <div className="card__foot">
              <span className="meta meta--light meta--icons">
                {match.platforms.map((p) => (
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
        </Reveal>

        <Reveal className="area-news" delay={0.15}>
          <div className="card card--pink card--newsletter">
            <div>
              <h3 className="display display--md text-red">Le Vestiaire</h3>
              <p className="small">Le débrief du lundi, direct dans ta boîte mail.</p>
            </div>
            <NewsletterForm />
          </div>
        </Reveal>

        <Reveal className="area-tweet" delay={0.1}>
          <a href={post.url} className="card card--tweet">
            <div className="card__top">
              <div className="author">
                <span className="avatar">
                  <MediaFill media={post.avatar} sizes="40px" />
                </span>
                <div>
                  <strong>
                    {post.author} <VerifiedIcon className="verified verified--sm" />
                  </strong>
                  <span className="meta">
                    {post.handle} · {timeAgo(post.publishedAt)}
                  </span>
                </div>
              </div>
              <PlatformChip platform={post.platform} />
            </div>
            <p className="tweet__text">{post.text}</p>
            <ul className="tweet__stats meta">
              <li>{formatCompact(post.replies)} réponses</li>
              <li>{formatCompact(post.reposts)} reposts</li>
              <li>{formatCompact(post.likes)} j’aime</li>
            </ul>
          </a>
        </Reveal>

        <Reveal className="area-contact" delay={0.15}>
          <a href="#contact" className="card card--contact">
            <span className="round-arrow">
              <ArrowUpRight />
            </span>
            <div>
              <h3 className="card__title">Contact pro</h3>
              <p className="meta">Partenariats, médias &amp; conférences</p>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
