import { getHomeData } from "@/lib/data";
import { Profile } from "@/components/Profile";
import { TopNav } from "@/components/TopNav";
import { Featured } from "@/components/sections/Featured";
import { Debriefs } from "@/components/sections/Debriefs";
import { Mercato } from "@/components/sections/Mercato";
import { Shorts } from "@/components/sections/Shorts";
import { Lives } from "@/components/sections/Lives";
import { Vestiaire } from "@/components/sections/Vestiaire";

// Régénère la page toutes les 5 min (données synchronisées depuis Supabase).
export const revalidate = 300;

export default async function Home() {
  const data = await getHomeData();
  const { counts } = data;

  return (
    <div className="layout">
      <Profile profile={data.profile} />

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

        <Featured {...data} />
        <Debriefs playlist={data.playlist} debriefs={data.debriefs} total={counts.debriefs} />
        <Mercato mercatoDossier={data.mercatoDossier} mercatoTiles={data.mercatoTiles} total={counts.mercato} />
        <Shorts shorts={data.shorts} total={counts.shorts} />
        <Lives liveSlots={data.liveSlots} />
        <Vestiaire community={data.community} links={data.links} />

        <footer className="footer">
          <span>© 2026 {data.profile.name} · Contenus synchronisés depuis YouTube, Instagram, TikTok, Twitch &amp; X</span>
          <a href="https://orion-studio.io">Site réalisé par Orion Studio</a>
        </footer>
      </main>
    </div>
  );
}
