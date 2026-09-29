import clsx from "clsx";
import type { HomeData } from "@/lib/data";
import { Reveal } from "../Reveal";
import { PlatformChip, SectionHeader } from "../ui";

export function Lives({ liveSlots }: Pick<HomeData, "liveSlots">) {
  return (
    <section id="lives" className="section">
      <SectionHeader index={5} title="Lives" link={{ label: "Suivre sur Twitch", href: "#" }} />

      <Reveal>
        <article className="card card--lives">
          <div className="pitch pitch--right" aria-hidden />
          <div className="lives__intro">
            <PlatformChip platform="twitch" variant="glass" />
            <div>
              <h3 className="display display--lg">Les lives de la semaine</h3>
              <p className="lives__lead">On regarde les matchs ensemble, on débat en direct.</p>
            </div>
          </div>
          <ul className="schedule">
            {liveSlots.map((slot) => (
              <li key={slot.id} className={clsx("slot", slot.featured && "slot--featured")}>
                <span className="eyebrow">{slot.day}</span>
                <div>
                  <strong className="display display--md">{slot.time}</strong>
                  <small>{slot.label}</small>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    </section>
  );
}
