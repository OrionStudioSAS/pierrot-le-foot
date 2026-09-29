import type { HomeData } from "@/lib/data";
import { formatNumber } from "@/lib/format";
import { ArrowUpRight, MailIcon, MicIcon, ShopIcon, WhatsAppIcon } from "../icons";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../ui";

const linkIcons = { shop: ShopIcon, mail: MailIcon, mic: MicIcon };

export function Vestiaire({ community, links }: Pick<HomeData, "community" | "links">) {
  return (
    <section id="vestiaire" className="section">
      <SectionHeader index={6} title="Le Vestiaire" />

      <div className="grid grid--vestiaire">
        <Reveal className="area-join">
          <a href={community.url} className="card card--join">
            <div className="ring" aria-hidden />
            <div className="card__top">
              <span className="eyebrow">Communauté</span>
              <WhatsAppIcon className="join__icon" />
            </div>
            <div className="card__bottom">
              <div>
                <h3 className="display display--lg">Rejoins le Vestiaire</h3>
                <p className="meta meta--light">
                  {formatNumber(community.members)} membres · {community.channel}
                </p>
              </div>
              <span className="btn btn--white btn--sm btn--red-text">Rejoindre</span>
            </div>
          </a>
        </Reveal>

        <div className="links area-links">
          {links.map((link, i) => {
            const Icon = linkIcons[link.icon];
            return (
              <Reveal key={link.id} delay={0.06 * (i + 1)}>
                <a href={link.url} id={link.id === "contact" ? "contact" : undefined} className="link-row">
                  <span className="link-row__icon">
                    <Icon />
                  </span>
                  <span className="link-row__text">
                    <strong>{link.title}</strong>
                    <small>{link.subtitle}</small>
                  </span>
                  <ArrowUpRight className="link-row__arrow" />
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
