import type { Media, Platform } from "./types";

// ---------------------------------------------------------------------------
// Modèle de blocs : chaque rubrique est une liste ordonnée de blocs posés sur
// la grille de 4 colonnes. Côté Supabase : une table `blocks`
// (id, section, position, type, cols, rows, featured_position, data jsonb).
// ---------------------------------------------------------------------------

export type SectionId = "debriefs" | "mercato" | "shorts" | "lives" | "vestiaire";

export const SECTIONS: { id: SectionId; title: string; countKey?: "debriefs" | "mercato" | "shorts" | "lives"; linkLabel: string }[] = [
  { id: "debriefs", title: "Débriefs", countKey: "debriefs", linkLabel: "vidéos · Tout voir" },
  { id: "mercato", title: "Mercato", countKey: "mercato", linkLabel: "contenus · Tout voir" },
  { id: "shorts", title: "Shorts & Reels", countKey: "shorts", linkLabel: "formats courts · Tout voir" },
  { id: "lives", title: "Lives", linkLabel: "Suivre sur Twitch" },
  { id: "vestiaire", title: "Le Vestiaire", linkLabel: "" },
];

export const MAX_COLS = 4;
export const MAX_ROWS = 3;

// --- Données par type de bloc ----------------------------------------------

export type YoutubeData = {
  platform: Platform;
  channel: string;
  title: string;
  overlayTitle: string;
  thumbnail: Media;
  duration: string;
  views: number;
  publishedAt: string;
  url: string;
};

export type PlaylistData = {
  title: string;
  videoCount: number;
  totalDuration: string;
  cover: Media;
  url: string;
  items: { title: string; duration: string; url: string }[];
};

export type MatchData = {
  home: string;
  away: string;
  competition: string;
  round: string;
  kickoff: string;
  platforms: Platform[];
};

export type LiveData = {
  isLive: boolean;
  platform: Platform;
  title: string;
  viewers: number;
  url: string;
};

export type StatData = { eyebrow: string; value: string; caption: string };

export type InstagramData = {
  handle: string;
  url: string;
  posts: { label: string; imageUrl: string }[];
};

export type ShortData = {
  platform: Platform;
  caption: string;
  captionStyle: "white" | "yellow" | "blue";
  footerTitle: string;
  thumbnail: Media;
  views: number;
  url: string;
};

export type PostData = {
  platform: Platform;
  author: string;
  handle: string;
  avatar: Media;
  text: string;
  publishedAt: string;
  replies: number;
  reposts: number;
  likes: number;
  url: string;
};

export type NewsletterData = { title: string; text: string };

export type ContactData = { title: string; text: string; url: string };

export type DossierData = {
  label: string;
  title: string;
  updatedAt: string;
  platforms: Platform[];
  formats: string;
  url: string;
};

export type TileData = {
  platform: Platform;
  title: string;
  image: Media;
  views: number;
  url: string;
};

export type ScheduleData = {
  platform: Platform;
  title: string;
  lead: string;
  slots: { day: string; time: string; label: string; featured: string }[];
};

export type JoinData = { eyebrow: string; title: string; members: number; channel: string; url: string };

export type LinksData = {
  links: { title: string; subtitle: string; url: string; icon: string }[];
};

export type BlockDataMap = {
  youtube: YoutubeData;
  playlist: PlaylistData;
  match: MatchData;
  live: LiveData;
  stat: StatData;
  instagram: InstagramData;
  short: ShortData;
  post: PostData;
  newsletter: NewsletterData;
  contact: ContactData;
  dossier: DossierData;
  tile: TileData;
  schedule: ScheduleData;
  join: JoinData;
  links: LinksData;
};

export type BlockType = keyof BlockDataMap;

export type Block<T extends BlockType = BlockType> = {
  [K in T]: { id: string; type: K; cols: number; rows: number; data: BlockDataMap[K] };
}[T];

export type HomeLayout = {
  sections: Record<SectionId, Block[]>;
  /** Ids des blocs mis « À la une », dans l'ordre d'affichage. */
  featured: string[];
};

// --- Templates (catalogue proposé dans la vue admin) ------------------------

export type FieldKind = "text" | "textarea" | "number" | "url" | "datetime" | "tone" | "platform" | "platforms" | "checkbox" | "select" | "lines";

export type Field = {
  key: string;
  label: string;
  kind: FieldKind;
  hint?: string;
  options?: string[];
  /** Pour `lines` : noms des colonnes, une ligne = « a | b | c ». */
  columns?: string[];
};

export type Template<K extends BlockType = BlockType> = {
  type: K;
  label: string;
  description: string;
  icon: string;
  cols: number;
  rows: number;
  defaults: () => BlockDataMap[K];
  fields: Field[];
};

const now = () => new Date().toISOString();
const mediaFields = (key: string, label: string): Field[] => [
  { key: `${key}.imageUrl`, label: `${label} (URL)`, kind: "url", hint: "Vide = dégradé de remplacement" },
  { key: `${key}.tone`, label: "Dégradé", kind: "tone" },
];

export const TEMPLATES: { [K in BlockType]: Template<K> } = {
  youtube: {
    type: "youtube",
    label: "Vidéo YouTube",
    description: "Miniature, titre, vues et bouton Regarder",
    icon: "▶",
    cols: 2,
    rows: 2,
    defaults: () => ({
      platform: "youtube",
      channel: "Pierrot le foot",
      title: "Titre de la vidéo",
      overlayTitle: "",
      thumbnail: { tone: "studio", imageUrl: "" },
      duration: "12:00",
      views: 0,
      publishedAt: now(),
      url: "#",
    }),
    fields: [
      { key: "title", label: "Titre", kind: "text" },
      { key: "overlayTitle", label: "Titre sur la miniature", kind: "text" },
      { key: "channel", label: "Chaîne", kind: "text" },
      { key: "url", label: "Lien", kind: "url" },
      { key: "duration", label: "Durée", kind: "text" },
      { key: "views", label: "Vues", kind: "number" },
      { key: "publishedAt", label: "Publiée le", kind: "datetime" },
      ...mediaFields("thumbnail", "Miniature"),
    ],
  },
  playlist: {
    type: "playlist",
    label: "Playlist",
    description: "Liste numérotée de vidéos avec durées",
    icon: "☰",
    cols: 2,
    rows: 2,
    defaults: () => ({
      title: "Nouvelle playlist",
      videoCount: 3,
      totalDuration: "1 h",
      cover: { tone: "studio", imageUrl: "" },
      url: "#",
      items: [
        { title: "Première vidéo", duration: "12:00", url: "#" },
        { title: "Deuxième vidéo", duration: "10:30", url: "#" },
        { title: "Troisième vidéo", duration: "08:45", url: "#" },
      ],
    }),
    fields: [
      { key: "title", label: "Titre", kind: "text" },
      { key: "videoCount", label: "Nombre de vidéos", kind: "number" },
      { key: "totalDuration", label: "Durée totale", kind: "text" },
      { key: "url", label: "Lien", kind: "url" },
      { key: "items", label: "Vidéos", kind: "lines", columns: ["title", "duration", "url"], hint: "Une par ligne : Titre | 12:00 | lien" },
      ...mediaFields("cover", "Couverture"),
    ],
  },
  match: {
    type: "match",
    label: "Prochain match",
    description: "Affiche du match commenté + rappel",
    icon: "⚽",
    cols: 2,
    rows: 1,
    defaults: () => ({
      home: "PSG",
      away: "OM",
      competition: "Ligue 1",
      round: "J1",
      kickoff: new Date(Date.now() + 3 * 86_400_000).toISOString(),
      platforms: ["twitch", "youtube"],
    }),
    fields: [
      { key: "home", label: "Domicile", kind: "text" },
      { key: "away", label: "Extérieur", kind: "text" },
      { key: "competition", label: "Compétition", kind: "text" },
      { key: "round", label: "Journée", kind: "text" },
      { key: "kickoff", label: "Coup d’envoi", kind: "datetime" },
      { key: "platforms", label: "Diffusé sur", kind: "platforms" },
    ],
  },
  live: {
    type: "live",
    label: "Live en cours",
    description: "Bandeau « En direct » avec spectateurs",
    icon: "●",
    cols: 2,
    rows: 1,
    defaults: () => ({ isLive: true, platform: "twitch", title: "Multiplex", viewers: 0, url: "#" }),
    fields: [
      { key: "title", label: "Titre", kind: "text" },
      { key: "isLive", label: "En direct maintenant", kind: "checkbox" },
      { key: "viewers", label: "Spectateurs", kind: "number" },
      { key: "platform", label: "Plateforme", kind: "platform" },
      { key: "url", label: "Lien", kind: "url" },
    ],
  },
  stat: {
    type: "stat",
    label: "Chiffre clé",
    description: "Un gros chiffre sur fond noir",
    icon: "#",
    cols: 1,
    rows: 1,
    defaults: () => ({ eyebrow: "Communauté", value: "2,4 M", caption: "abonnés" }),
    fields: [
      { key: "eyebrow", label: "Surtitre", kind: "text" },
      { key: "value", label: "Valeur", kind: "text" },
      { key: "caption", label: "Légende", kind: "text" },
    ],
  },
  instagram: {
    type: "instagram",
    label: "Aperçu Instagram",
    description: "Compte + deux derniers posts",
    icon: "◎",
    cols: 1,
    rows: 1,
    defaults: () => ({ handle: "@compte", url: "#", posts: [{ label: "", imageUrl: "" }, { label: "", imageUrl: "" }] }),
    fields: [
      { key: "handle", label: "Compte", kind: "text" },
      { key: "url", label: "Lien", kind: "url" },
      { key: "posts", label: "Posts", kind: "lines", columns: ["label", "imageUrl"], hint: "Un par ligne : Légende | URL image" },
    ],
  },
  short: {
    type: "short",
    label: "Short / Reel",
    description: "Format vertical avec légende",
    icon: "▯",
    cols: 1,
    rows: 2,
    defaults: () => ({
      platform: "tiktok",
      caption: "Légende",
      captionStyle: "white",
      footerTitle: "",
      thumbnail: { tone: "selfie", imageUrl: "" },
      views: 0,
      url: "#",
    }),
    fields: [
      { key: "caption", label: "Légende (haut)", kind: "textarea" },
      { key: "captionStyle", label: "Style de légende", kind: "select", options: ["white", "yellow", "blue"] },
      { key: "footerTitle", label: "Titre (bas)", kind: "text" },
      { key: "platform", label: "Plateforme", kind: "platform" },
      { key: "views", label: "Vues", kind: "number" },
      { key: "url", label: "Lien", kind: "url" },
      ...mediaFields("thumbnail", "Image"),
    ],
  },
  post: {
    type: "post",
    label: "Post X",
    description: "Dernier post avec stats",
    icon: "𝕏",
    cols: 2,
    rows: 1,
    defaults: () => ({
      platform: "x",
      author: "Pierre Ménès",
      handle: "@PierreMenes",
      avatar: { tone: "portrait", imageUrl: "" },
      text: "Texte du post",
      publishedAt: now(),
      replies: 0,
      reposts: 0,
      likes: 0,
      url: "#",
    }),
    fields: [
      { key: "text", label: "Texte", kind: "textarea" },
      { key: "author", label: "Auteur", kind: "text" },
      { key: "handle", label: "Compte", kind: "text" },
      { key: "publishedAt", label: "Publié le", kind: "datetime" },
      { key: "replies", label: "Réponses", kind: "number" },
      { key: "reposts", label: "Reposts", kind: "number" },
      { key: "likes", label: "J’aime", kind: "number" },
      { key: "url", label: "Lien", kind: "url" },
    ],
  },
  newsletter: {
    type: "newsletter",
    label: "Newsletter",
    description: "Champ email d’inscription",
    icon: "✉",
    cols: 1,
    rows: 1,
    defaults: () => ({ title: "Le Vestiaire", text: "Le débrief du lundi, direct dans ta boîte mail." }),
    fields: [
      { key: "title", label: "Titre", kind: "text" },
      { key: "text", label: "Texte", kind: "textarea" },
    ],
  },
  contact: {
    type: "contact",
    label: "Contact",
    description: "Carte lien avec flèche",
    icon: "↗",
    cols: 1,
    rows: 1,
    defaults: () => ({ title: "Contact pro", text: "Partenariats, médias & conférences", url: "#contact" }),
    fields: [
      { key: "title", label: "Titre", kind: "text" },
      { key: "text", label: "Texte", kind: "text" },
      { key: "url", label: "Lien", kind: "url" },
    ],
  },
  dossier: {
    type: "dossier",
    label: "Dossier",
    description: "Gros titre sur fond noir + formats",
    icon: "★",
    cols: 2,
    rows: 1,
    defaults: () => ({ label: "Dossier chaud", title: "Titre du dossier", updatedAt: now(), platforms: ["youtube"], formats: "Vidéo", url: "#" }),
    fields: [
      { key: "label", label: "Étiquette", kind: "text" },
      { key: "title", label: "Titre", kind: "text" },
      { key: "formats", label: "Formats", kind: "text" },
      { key: "platforms", label: "Plateformes", kind: "platforms" },
      { key: "updatedAt", label: "Mis à jour le", kind: "datetime" },
      { key: "url", label: "Lien", kind: "url" },
    ],
  },
  tile: {
    type: "tile",
    label: "Tuile visuelle",
    description: "Image plein cadre + titre + vues",
    icon: "▦",
    cols: 1,
    rows: 1,
    defaults: () => ({ platform: "instagram", title: "Titre", image: { tone: "ocean", imageUrl: "" }, views: 0, url: "#" }),
    fields: [
      { key: "title", label: "Titre", kind: "text" },
      { key: "platform", label: "Plateforme", kind: "platform" },
      { key: "views", label: "Vues", kind: "number" },
      { key: "url", label: "Lien", kind: "url" },
      ...mediaFields("image", "Image"),
    ],
  },
  schedule: {
    type: "schedule",
    label: "Programme des lives",
    description: "Bannière violette + créneaux",
    icon: "◷",
    cols: 4,
    rows: 1,
    defaults: () => ({
      platform: "twitch",
      title: "Les lives de la semaine",
      lead: "On regarde les matchs ensemble, on débat en direct.",
      slots: [
        { day: "Mer", time: "21:00", label: "Ligue des champions", featured: "" },
        { day: "Dim", time: "20:45", label: "Match", featured: "*" },
      ],
    }),
    fields: [
      { key: "title", label: "Titre", kind: "text" },
      { key: "lead", label: "Texte", kind: "textarea" },
      { key: "slots", label: "Créneaux", kind: "lines", columns: ["day", "time", "label", "featured"], hint: "Un par ligne : Jour | 21:00 | Libellé | * (mis en avant)" },
    ],
  },
  join: {
    type: "join",
    label: "Rejoindre la commu",
    description: "Grande carte rouge + bouton",
    icon: "✚",
    cols: 2,
    rows: 1,
    defaults: () => ({ eyebrow: "Communauté", title: "Rejoins le Vestiaire", members: 0, channel: "chaîne WhatsApp", url: "#" }),
    fields: [
      { key: "eyebrow", label: "Surtitre", kind: "text" },
      { key: "title", label: "Titre", kind: "text" },
      { key: "members", label: "Membres", kind: "number" },
      { key: "channel", label: "Canal", kind: "text" },
      { key: "url", label: "Lien", kind: "url" },
    ],
  },
  links: {
    type: "links",
    label: "Liste de liens",
    description: "Lignes cliquables avec icônes",
    icon: "⋮",
    cols: 2,
    rows: 1,
    defaults: () => ({
      links: [
        { title: "Boutique officielle", subtitle: "Maillots, mugs & goodies", url: "#", icon: "shop" },
        { title: "Contact pro", subtitle: "Partenariats & médias", url: "#", icon: "mic" },
      ],
    }),
    fields: [
      { key: "links", label: "Liens", kind: "lines", columns: ["title", "subtitle", "url", "icon"], hint: "Un par ligne : Titre | Sous-titre | lien | shop, mail ou mic" },
    ],
  },
};

export const TEMPLATE_LIST = Object.values(TEMPLATES) as Template[];

// --- Helpers ---------------------------------------------------------------

export function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((o, k) => (o == null ? undefined : (o as Record<string, unknown>)[k]), obj);
}

export function setPath<T>(obj: T, path: string, value: unknown): T {
  const [head, ...rest] = path.split(".");
  const src = (obj ?? {}) as Record<string, unknown>;
  return { ...src, [head]: rest.length ? setPath(src[head], rest.join("."), value) : value } as T;
}

export function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}

export function createBlock(type: BlockType, cols: number, rows: number): Block {
  return { id: newId(), type, cols, rows, data: TEMPLATES[type].defaults() } as Block;
}
