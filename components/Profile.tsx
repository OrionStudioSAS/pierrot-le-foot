import type { Profile as ProfileData } from "@/lib/types";
import { formatCompact, formatNumber, timeAgo } from "@/lib/format";
import { BellIcon, PlatformIcon, VerifiedIcon } from "./icons";
import { LiveBadge, MediaFill } from "./ui";

const platformName = { youtube: "YouTube", instagram: "Instagram", tiktok: "TikTok", twitch: "Twitch", x: "X" } as const;

export function Profile({ profile }: { profile: ProfileData }) {
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <aside className="profile">
      <div className="profile__card">
        <div className="profile__media">
          <MediaFill media={profile.avatar} alt={profile.name} sizes="380px" />
          {profile.liveOn && <LiveBadge>En direct sur {platformName[profile.liveOn]}</LiveBadge>}
          <span className="profile__monogram">{initials}</span>
        </div>

        <div className="profile__body">
          <h1 className="profile__name">
            {profile.name}
            {profile.verified && <VerifiedIcon className="verified" />}
          </h1>
          <p className="profile__bio">{profile.bio}</p>

          <ul className="socials">
            {profile.socials.map((s) => (
              <li key={s.platform}>
                <a className={`social chip--${s.platform}`} href={s.url} aria-label={platformName[s.platform]} target="_blank" rel="noreferrer">
                  <PlatformIcon platform={s.platform} />
                </a>
              </li>
            ))}
          </ul>

          <dl className="stats">
            <div>
              <dd>{formatCompact(profile.stats.followers)}</dd>
              <dt>abonnés</dt>
            </div>
            <div>
              <dd>{formatCompact(profile.stats.views)}</dd>
              <dt>vues</dt>
            </div>
            <div>
              <dd>{formatNumber(profile.stats.contents)}</dd>
              <dt>contenus</dt>
            </div>
          </dl>

          <div className="profile__actions">
            <a href="#lives" className="btn btn--red">
              <BellIcon />
              Alertes live
            </a>
            <a href="#contact" className="btn btn--ghost">
              Contact pro
            </a>
          </div>
        </div>
      </div>
      <p className="sync">
        <i className="dot dot--green" />
        Synchronisé automatiquement · {timeAgo(profile.lastSyncedAt)}
      </p>
    </aside>
  );
}
