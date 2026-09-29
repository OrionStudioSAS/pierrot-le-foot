import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "i.ytimg.com" },
      // Phase de test : la vue admin accepte n'importe quelle image https.
      // À restreindre une fois les images servies par Supabase Storage.
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
