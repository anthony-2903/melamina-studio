import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";

export default function DeferredSection({ children, minHeight = 700, rootMargin = "600px 0px", targetId }: { children: ReactNode; minHeight?: number; rootMargin?: string; targetId?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin, visible]);

  useEffect(() => {
    if (!targetId) return;
    const revealTarget = () => {
      if (window.location.hash === `#${targetId}`) setVisible(true);
    };
    revealTarget();
    window.addEventListener("hashchange", revealTarget);
    return () => window.removeEventListener("hashchange", revealTarget);
  }, [targetId]);

  useEffect(() => {
    if (!visible || !targetId || window.location.hash !== `#${targetId}`) return;
    requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" }));
  }, [targetId, visible]);

  return (
    <div ref={ref} style={{ minHeight }}>
      {visible ? (
        <Suspense fallback={<div style={{ minHeight }} aria-hidden="true" />}>
          {children}
        </Suspense>
      ) : null}
    </div>
  );
}
