import type { Metric } from "web-vitals";

function sendMetric(metric: Metric) {
  const endpoint = import.meta.env.VITE_WEB_VITALS_ENDPOINT as string | undefined;
  if (!endpoint) return;
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    id: metric.id,
    path: window.location.pathname,
  });
  if (navigator.sendBeacon) navigator.sendBeacon(endpoint, body);
  else void fetch(endpoint, { method: "POST", body, keepalive: true, headers: { "content-type": "application/json" } });
}

export async function reportWebVitals() {
  const { onCLS, onINP, onLCP, onTTFB } = await import("web-vitals");
  onCLS(sendMetric);
  onINP(sendMetric);
  onLCP(sendMetric);
  onTTFB(sendMetric);
}
