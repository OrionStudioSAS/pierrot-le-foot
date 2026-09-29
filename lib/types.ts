// Types du contenu. Ils serviront de base aux tables Supabase
// (une table par type, colonnes en snake_case côté base).

export type Platform = "youtube" | "instagram" | "tiktok" | "twitch" | "x";

/** Clé de dégradé utilisée tant qu'il n'y a pas de vraie image. */
export type Tone =
  | "studio"
  | "interview"
  | "interview2"
  | "selfie"
  | "selfie2"
  | "beach"
  | "cap"
  | "violet"
  | "violet2"
  | "ocean"
  | "grass"
  | "portrait";

export type Media = {
  imageUrl?: string | null;
  tone: Tone;
};

export type Profile = {
  name: string;
  bio: string;
  avatar: Media;
  verified: boolean;
  liveOn: Platform | null;
  stats: { followers: number; views: number; contents: number };
  socials: { platform: Platform; url: string }[];
  lastSyncedAt: string;
};

export type Video = {
  id: string;
  platform: Platform;
  channel?: string;
  title: string;
  overlayTitle?: string;
  thumbnail: Media;
  duration?: string;
  views: number;
  publishedAt: string;
  url: string;
};

export type Short = {
  id: string;
  platform: Platform;
  caption: string;
  captionStyle?: "white" | "yellow" | "blue";
  footerTitle?: string;
  thumbnail: Media;
  views: number;
  url: string;
};

export type Playlist = {
  id: string;
  title: string;
  platform: Platform;
  videoCount: number;
  totalDuration: string;
  cover: Media;
  items: { id: string; title: string; duration: string; url: string }[];
};

export type LiveStatus = {
  isLive: boolean;
  platform: Platform;
  title: string;
  viewers: number;
  url: string;
};

export type Match = {
  home: string;
  away: string;
  competition: string;
  round: string;
  kickoff: string;
  platforms: Platform[];
};

export type SocialPost = {
  id: string;
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

export type InstagramPreview = {
  handle: string;
  url: string;
  posts: { id: string; label: string; image: Media }[];
};

export type MercatoDossier = {
  label: string;
  title: string;
  updatedAt: string;
  platforms: Platform[];
  formats: string;
  url: string;
};

export type MercatoTile = {
  id: string;
  platform: Platform;
  title: string;
  image: Media;
  views: number;
  url: string;
};

export type LiveSlot = {
  id: string;
  day: string;
  time: string;
  label: string;
  featured?: boolean;
};

export type Community = {
  members: number;
  channel: string;
  url: string;
};

export type QuickLink = {
  id: string;
  icon: "shop" | "mail" | "mic";
  title: string;
  subtitle: string;
  url: string;
};

export type SectionCounts = {
  debriefs: number;
  mercato: number;
  shorts: number;
  lives: number;
};
