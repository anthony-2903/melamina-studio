import { useEffect, useRef, useState } from "react";
import { getOptimizedVideoUrl, getVideoPosterUrl } from "@/lib/cloudinary";
import { useMediaPreferences } from "@/hooks/use-media-preferences";

type OptimizedVideoProps = {
  src: string;
  className?: string;
  eager?: boolean;
  posterWidth?: number;
};

export default function OptimizedVideo({
  src,
  className,
  eager = false,
  posterWidth = 800,
}: OptimizedVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(eager);
  const [pageVisible, setPageVisible] = useState(() => document.visibilityState !== "hidden");
  const { reduceMotion, saveData } = useMediaPreferences();
  const poster = getVideoPosterUrl(src, posterWidth);
  const optimizedSrc = getOptimizedVideoUrl(src, eager ? 1280 : 900);

  useEffect(() => {
    if (eager || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry?.isIntersecting ?? false),
      { rootMargin: "200px" },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [eager]);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState !== "hidden");
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isNearViewport || !pageVisible || reduceMotion || saveData) {
      video?.pause();
      return;
    }

    void video.play().catch(() => undefined);
    return () => video.pause();
  }, [isNearViewport, pageVisible, reduceMotion, saveData]);

  return (
    <div ref={containerRef} className="h-full w-full bg-slate-100">
      {isNearViewport && (!saveData || eager) ? (
        <video
          ref={videoRef}
          src={optimizedSrc}
          poster={poster}
          loop
          muted
          playsInline
          controls={eager && (reduceMotion || saveData)}
          preload={eager ? "metadata" : "none"}
          className={className}
        />
      ) : poster ? (
        <img
          src={poster}
          alt=""
          loading="lazy"
          decoding="async"
          className={className}
        />
      ) : null}
    </div>
  );
}
