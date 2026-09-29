import type {
  Community,
  InstagramPreview,
  LiveSlot,
  LiveStatus,
  Match,
  MercatoDossier,
  MercatoTile,
  Playlist,
  Profile,
  QuickLink,
  SectionCounts,
  Short,
  SocialPost,
  Video,
} from "./types";

// Données de démonstration. Quand Supabase sera branché, seul ce fichier
// change : chaque bloc devient une requête (ex. supabase.from("videos")...).

const ago = (hours: number) => new Date(Date.now() - hours * 3_600_000).toISOString();

export type HomeData = {
  profile: Profile;
  counts: SectionCounts;
  featuredVideo: Video;
  live: LiveStatus;
  instagram: InstagramPreview;
  featuredShort: Short;
  nextMatch: Match;
  latestPost: SocialPost;
  playlist: Playlist;
  debriefs: Video[];
  mercatoDossier: MercatoDossier;
  mercatoTiles: MercatoTile[];
  shorts: Short[];
  liveSlots: LiveSlot[];
  community: Community;
  links: QuickLink[];
};

export async function getHomeData(): Promise<HomeData> {
  return {
    profile: {
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
    },
    counts: { debriefs: 248, mercato: 96, shorts: 420, lives: 180 },
    featuredVideo: {
      id: "v-belfra",
      platform: "youtube",
      channel: "Pierrot le foot",
      title: "Belgique-France\u00a0: débrief d’une victoire plutôt séduisante",
      overlayTitle: "Belgique - France",
      thumbnail: { tone: "studio" },
      duration: "24:12",
      views: 50_000,
      publishedAt: ago(48),
      url: "#",
    },
    live: {
      isLive: true,
      platform: "twitch",
      title: "Multiplex Ligue 1",
      viewers: 12_300,
      url: "#",
    },
    instagram: {
      handle: "@menes_pierre",
      url: "#",
      posts: [
        { id: "ig1", label: "la base", image: { tone: "violet" } },
        { id: "ig2", label: "la base", image: { tone: "violet2" } },
      ],
    },
    featuredShort: {
      id: "s-questions",
      platform: "tiktok",
      caption: "Face à Pierrot\u00a0:\nMardi 29/09\nÀ vos questions\u00a0!",
      footerTitle: "Posez vos questions ici et RDV demain",
      thumbnail: { tone: "selfie" },
      views: 3_200_000,
      url: "#",
    },
    nextMatch: {
      home: "PSG",
      away: "OM",
      competition: "Ligue 1",
      round: "J10",
      kickoff: "2026-10-04T20:45:00+02:00",
      platforms: ["twitch", "youtube"],
    },
    latestPost: {
      id: "x1",
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
    playlist: {
      id: "pl-face",
      title: "Face à Pierrot",
      platform: "youtube",
      videoCount: 48,
      totalDuration: "12 h",
      cover: { tone: "studio" },
      items: [
        { id: "p1", title: "PSG – OM\u00a0: mon débrief à chaud", duration: "24:12", url: "#" },
        { id: "p2", title: "PSG – Bayern\u00a0: ce qui a manqué", duration: "19:40", url: "#" },
        { id: "p3", title: "Le mercato d’hiver du PSG", duration: "22:05", url: "#" },
        { id: "p4", title: "Lens – PSG\u00a0: les notes", duration: "16:18", url: "#" },
        { id: "p5", title: "Mon onze type de la saison", duration: "14:52", url: "#" },
        { id: "p6", title: "OL\u00a0: la crise expliquée", duration: "18:30", url: "#" },
        { id: "p7", title: "Monaco, la vraie surprise\u00a0?", duration: "13:07", url: "#" },
      ],
    },
    debriefs: [
      {
        id: "d1",
        platform: "youtube",
        title: "Gaëtan Laborde\u00a0: “Il n’y a pas de spectateurs au Roazhon Park”",
        thumbnail: { tone: "interview" },
        duration: "27:10",
        views: 1_200_000,
        publishedAt: ago(96),
        url: "#",
      },
      {
        id: "d2",
        platform: "youtube",
        title: "Gaëtan Laborde\u00a0: “Je trouve ça super cool qu’on parle de moi”",
        thumbnail: { tone: "interview2" },
        duration: "19:48",
        views: 640_000,
        publishedAt: ago(24 * 7),
        url: "#",
      },
    ],
    mercatoDossier: {
      label: "Dossier chaud",
      title: "Les 5 dossiers qui vont tout changer cet hiver",
      updatedAt: ago(2),
      platforms: ["youtube", "x", "instagram"],
      formats: "Vidéo + threads + stories",
      url: "#",
    },
    mercatoTiles: [
      { id: "m1", platform: "instagram", title: "L’OM a trouvé son 9\u00a0?", image: { tone: "ocean" }, views: 876_000, url: "#" },
      { id: "m2", platform: "tiktok", title: "Rumeur ou info\u00a0?", image: { tone: "grass" }, views: 1_100_000, url: "#" },
    ],
    shorts: [
      { id: "sh1", platform: "tiktok", caption: "Mardi 29/09\nÀ vos questions\u00a0!", thumbnail: { tone: "selfie" }, views: 2_100_000, url: "#" },
      { id: "sh2", platform: "tiktok", caption: "Lundi 21 septembre\nÀ vos questions\u00a0!", thumbnail: { tone: "beach" }, views: 1_400_000, url: "#" },
      { id: "sh3", platform: "instagram", caption: "Merde tout seul", captionStyle: "yellow", thumbnail: { tone: "selfie2" }, views: 980_000, url: "#" },
      { id: "sh4", platform: "youtube", caption: "Face à Pierrot\n14 septembre 2026", captionStyle: "blue", thumbnail: { tone: "cap" }, views: 876_000, url: "#" },
    ],
    liveSlots: [
      { id: "l1", day: "Mer", time: "21:00", label: "Ligue des champions" },
      { id: "l2", day: "Sam", time: "17:00", label: "Multiplex Ligue 1" },
      { id: "l3", day: "Dim", time: "20:45", label: "PSG – OM", featured: true },
    ],
    community: { members: 12_400, channel: "chaîne WhatsApp", url: "#" },
    links: [
      { id: "shop", icon: "shop", title: "Boutique officielle", subtitle: "Maillots, mugs & goodies", url: "#" },
      { id: "news", icon: "mail", title: "Newsletter du lundi", subtitle: "Le débrief de la semaine", url: "#" },
      { id: "contact", icon: "mic", title: "Contact pro", subtitle: "Partenariats & médias", url: "mailto:contact@example.com" },
    ],
  };
}
