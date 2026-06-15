import { useEffect, useState } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function useMediaPreferences() {
  return {
    isMobile: useMediaQuery("(max-width: 767px)"),
    reduceMotion: useMediaQuery("(prefers-reduced-motion: reduce)"),
    saveData: typeof navigator !== "undefined" && "connection" in navigator
      ? Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData)
      : false,
  };
}
