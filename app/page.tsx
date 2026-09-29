import { getHomeData } from "@/lib/data";
import { Profile } from "@/components/Profile";
import { TopNav } from "@/components/TopNav";
import { HomeBuilder } from "@/components/HomeBuilder";

// Régénère la page toutes les 5 min (données synchronisées depuis Supabase).
export const revalidate = 300;

export default async function Home() {
  const { profile, counts, layout } = await getHomeData();

  return (
    <div className="layout">
      <Profile profile={profile} />

      <main className="content">
        <TopNav
          items={[
            { id: "une", label: "À la une" },
            { id: "debriefs", label: "Débriefs", count: counts.debriefs },
            { id: "mercato", label: "Mercato", count: counts.mercato },
            { id: "shorts", label: "Shorts", count: counts.shorts },
            { id: "lives", label: "Lives", count: counts.lives },
            { id: "vestiaire", label: "Le Vestiaire" },
          ]}
        />

        <HomeBuilder initialLayout={layout} counts={counts} />

        <footer className="footer">
          <span>© 2026 {profile.name} · Contenus synchronisés depuis YouTube, Instagram, TikTok, Twitch &amp; X</span>
          <a href="https://orion-studio.io">Site réalisé par Orion Studio</a>
        </footer>
      </main>
    </div>
  );
}
