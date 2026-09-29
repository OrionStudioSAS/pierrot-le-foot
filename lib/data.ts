import type { Block, HomeLayout } from "./blocks";
import type { Profile, SectionCounts } from "./types";

// Données de démonstration. Quand Supabase sera branché, seul ce fichier
// change : profil, compteurs et blocs deviennent des requêtes.

const ago = (hours: number) => new Date(Date.now() - hours * 3_600_000).toISOString();

export type HomeData = {
  profile: Profile;
  counts: SectionCounts;
  layout: HomeLayout;
};

const profile: Profile = {
  name: "Pierre Ménès",
  bio: "Journaliste & consultant foot. Débriefs, mercato, lives — tous mes contenus, au même endroit.",
  avatar: { tone: "portrait" },
  verified: true,
  liveOn: "twitch",
  stats: { followers: 2_400_000, views: 156_000_000, contents: 3200 },
  socials: [
    { platform: "youtube", url: "https://youtube.com" },
    { platform: "instagram", url: "https://instagram.com/menes_pierre" },
    { platform: "tiktok", url: "https://tiktok.com" },
    { platform: "twitch", url: "https://twitch.tv" },
    { platform: "x", url: "https://x.com/PierreMenes" },
  ],
  lastSyncedAt: ago(4 / 60),
};

function buildLayout(): HomeLayout {
  const debriefs: Block[] = [
    {
      id: "v-belfra",
      type: "youtube",
      cols: 2,
      rows: 2,
      data: {
        platform: "youtube",
        channel: "Pierrot le foot",
        title: "Belgique-France : débrief d’une victoire plutôt séduisante",
        overlayTitle: "Belgique - France",
        thumbnail: { tone: "studio" },
        duration: "24:12",
        views: 50_000,
        publishedAt: ago(48),
        url: "#",
      },
    },
    {
      id: "pl-face",
      type: "playlist",
      cols: 2,
      rows: 2,
      data: {
        title: "Face à Pierrot",
        videoCount: 48,
        totalDuration: "12 h",
        cover: { tone: "studio" },
        url: "#",
        items: [
          { title: "PSG – OM : mon débrief à chaud", duration: "24:12", url: "#" },
          { title: "PSG – Bayern : ce qui a manqué", duration: "19:40", url: "#" },
          { title: "Le mercato d’hiver du PSG", duration: "22:05", url: "#" },
          { title: "Lens – PSG : les notes", duration: "16:18", url: "#" },
          { title: "Mon onze type de la saison", duration: "14:52", url: "#" },
          { title: "OL : la crise expliquée", duration: "18:30", url: "#" },
          { title: "Monaco, la vraie surprise ?", duration: "13:07", url: "#" },
        ],
      },
    },
    {
      id: "d1",
      type: "youtube",
      cols: 2,
      rows: 1,
      data: {
        platform: "youtube",
        channel: "Pierrot le foot",
        title: "Gaëtan Laborde : “Il n’y a pas de spectateurs au Roazhon Park”",
        overlayTitle: "",
        thumbnail: { tone: "interview" },
        duration: "27:10",
        views: 1_200_000,
        publishedAt: ago(96),
        url: "#",
      },
    },
    {
      id: "d2",
      type: "youtube",
      cols: 2,
      rows: 1,
      data: {
        platform: "youtube",
        channel: "Pierrot le foot",
        title: "Gaëtan Laborde : “Je trouve ça super cool qu’on parle de moi”",
        overlayTitle: "",
        thumbnail: { tone: "interview2" },
        duration: "19:48",
        views: 640_000,
        publishedAt: ago(24 * 7),
        url: "#",
      },
    },
  ];

  const mercato: Block[] = [
    {
      id: "m-dossier",
      type: "dossier",
      cols: 2,
      rows: 1,
      data: {
        label: "Dossier chaud",
        title: "Les 5 dossiers qui vont tout changer cet hiver",
        updatedAt: ago(2),
        platforms: ["youtube", "x", "instagram"],
        formats: "Vidéo + threads + stories",
        url: "#",
      },
    },
    { id: "m1", type: "tile", cols: 1, rows: 1, data: { platform: "instagram", title: "L’OM a trouvé son 9 ?", image: { tone: "ocean" }, views: 876_000, url: "#" } },
    { id: "m2", type: "tile", cols: 1, rows: 1, data: { platform: "tiktok", title: "Rumeur ou info ?", image: { tone: "grass" }, views: 1_100_000, url: "#" } },
  ];

  const shorts: Block[] = [
    { id: "ig", type: "instagram", cols: 1, rows: 1, data: { handle: "@menes_pierre", url: "#", posts: [{ label: "la base", imageUrl: "" }, { label: "la base", imageUrl: "" }] } },
    {
      id: "s-questions",
      type: "short",
      cols: 1,
      rows: 2,
      data: {
        platform: "tiktok",
        caption: "Face à Pierrot :\nMardi 29/09\nÀ vos questions !",
        captionStyle: "white",
        footerTitle: "Posez vos questions ici et RDV demain",
        thumbnail: { tone: "selfie" },
        views: 3_200_000,
        url: "#",
      },
    },
    ...(
      [
        ["sh1", "tiktok", "Mardi 29/09\nÀ vos questions !", "white", "selfie", 2_100_000],
        ["sh2", "tiktok", "Lundi 21 septembre\nÀ vos questions !", "white", "beach", 1_400_000],
        ["sh3", "instagram", "Merde tout seul", "yellow", "selfie2", 980_000],
        ["sh4", "youtube", "Face à Pierrot\n14 septembre 2026", "blue", "cap", 876_000],
      ] as const
    ).map(
      ([id, platform, caption, captionStyle, tone, views]): Block => ({
        id,
        type: "short",
        cols: 1,
        rows: 2,
        data: { platform, caption, captionStyle, footerTitle: "", thumbnail: { tone }, views, url: "#" },
      }),
    ),
  ];

  const lives: Block[] = [
    { id: "live", type: "live", cols: 2, rows: 1, data: { isLive: true, platform: "twitch", title: "Multiplex Ligue 1", viewers: 12_300, url: "#" } },
    {
      id: "match",
      type: "match",
      cols: 2,
      rows: 1,
      data: { home: "PSG", away: "OM", competition: "Ligue 1", round: "J10", kickoff: "2026-10-04T20:45:00+02:00", platforms: ["twitch", "youtube"] },
    },
    {
      id: "schedule",
      type: "schedule",
      cols: 4,
      rows: 1,
      data: {
        platform: "twitch",
        title: "Les lives de la semaine",
        lead: "On regarde les matchs ensemble, on débat en direct.",
        slots: [
          { day: "Mer", time: "21:00", label: "Ligue des champions", featured: "" },
          { day: "Sam", time: "17:00", label: "Multiplex Ligue 1", featured: "" },
          { day: "Dim", time: "20:45", label: "PSG – OM", featured: "*" },
        ],
      },
    },
  ];

  const vestiaire: Block[] = [
    { id: "community", type: "stat", cols: 1, rows: 1, data: { eyebrow: "Communauté", value: "2,4 M", caption: "abonnés sur 5 plateformes" } },
    { id: "newsletter", type: "newsletter", cols: 1, rows: 1, data: { title: "Le Vestiaire", text: "Le débrief du lundi, direct dans ta boîte mail." } },
    {
      id: "post",
      type: "post",
      cols: 2,
      rows: 1,
      data: {
        platform: "x",
        author: "Pierre Ménès",
        handle: "@PierreMenes",
        avatar: { tone: "portrait" },
        text: "Aperçu du post — le texte réel est synchronisé automatiquement depuis le compte X de Pierre.",
        publishedAt: ago(3),
        replies: 1200,
        reposts: 3400,
        likes: 18_000,
        url: "#",
      },
    },
    { id: "contact-card", type: "contact", cols: 1, rows: 1, data: { title: "Contact pro", text: "Partenariats, médias & conférences", url: "#contact" } },
    { id: "join", type: "join", cols: 2, rows: 1, data: { eyebrow: "Communauté", title: "Rejoins le Vestiaire", members: 12_400, channel: "chaîne WhatsApp", url: "#" } },
    {
      id: "links",
      type: "links",
      cols: 2,
      rows: 1,
      data: {
        links: [
          { title: "Boutique officielle", subtitle: "Maillots, mugs & goodies", url: "#", icon: "shop" },
          { title: "Newsletter du lundi", subtitle: "Le débrief de la semaine", url: "#", icon: "mail" },
          { title: "Contact pro", subtitle: "Partenariats & médias", url: "mailto:contact@example.com", icon: "mic" },
        ],
      },
    },
  ];

  return {
    sections: { debriefs, mercato, shorts, lives, vestiaire },
    // Ordre pensé pour la grille 4 colonnes (placement automatique « dense »).
    featured: ["v-belfra", "live", "community", "ig", "s-questions", "match", "newsletter", "post", "contact-card"],
  };
}

export async function getHomeData(): Promise<HomeData> {
  return {
    profile,
    counts: { debriefs: 248, mercato: 96, shorts: 420, lives: 180 },
    layout: buildLayout(),
  };
}
