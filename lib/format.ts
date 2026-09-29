const NBSP = " ";

/** 2 400 000 → « 2,4 M », 876 000 → « 876 k » */
export function formatCompact(n: number): string {
  const units: [number, string][] = [
    [1e9, "Md"],
    [1e6, "M"],
    [1e3, "k"],
  ];
  for (const [value, suffix] of units) {
    if (n >= value) {
      const v = n / value;
      const str = v.toLocaleString("fr-FR", { maximumFractionDigits: v < 100 ? 1 : 0 });
      return `${str}${NBSP}${suffix}`;
    }
  }
  return n.toLocaleString("fr-FR");
}

/** 3200 → « 3 200 » */
export function formatNumber(n: number): string {
  return n.toLocaleString("fr-FR");
}

/** Date ISO → « il y a 3 h » */
export function timeAgo(iso: string, now: number = Date.now()): string {
  const minutes = Math.max(1, Math.round((now - new Date(iso).getTime()) / 60_000));
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.round(hours / 24);
  if (days < 7) return `il y a ${days} j`;
  const weeks = Math.round(days / 7);
  if (weeks < 5) return `il y a ${weeks} sem`;
  const months = Math.round(days / 30);
  return `il y a ${months} mois`;
}

const paris = { timeZone: "Europe/Paris" } as const;

/** Date ISO → { day: « Dim. », time: « 20:45 » } */
export function formatKickoff(iso: string) {
  const d = new Date(iso);
  const day = d.toLocaleDateString("fr-FR", { weekday: "short", ...paris });
  const time = d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", ...paris });
  return { day: day.charAt(0).toUpperCase() + day.slice(1), time };
}
