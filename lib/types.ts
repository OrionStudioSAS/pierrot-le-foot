// Types du contenu. Ils serviront de base aux tables Supabase
// (colonnes en snake_case côté base).

export type Platform = "youtube" | "instagram" | "tiktok" | "twitch" | "x";

export const PLATFORMS: Platform[] = ["youtube", "instagram", "tiktok", "twitch", "x"];

export const PLATFORM_NAMES: Record<Platform, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  tiktok: "TikTok",
  twitch: "Twitch",
  x: "X",
};

/** Clé de dégradé utilisée tant qu'il n'y a pas de vraie image. */
export const TONES = [
  "studio",
  "interview",
  "interview2",
  "selfie",
  "selfie2",
  "beach",
  "cap",
  "violet",
  "violet2",
  "ocean",
  "grass",
  "portrait",
] as const;
export type Tone = (typeof TONES)[number];

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

export type SectionCounts = {
  debriefs: number;
  mercato: number;
  shorts: number;
  lives: number;
};
