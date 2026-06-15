import { describe, expect, it } from "vitest";
import { getOptimizedSrcSet, getOptimizedVideoUrl, getVideoPosterUrl } from "@/lib/cloudinary";

const video = "https://res.cloudinary.com/demo/video/upload/v1/project.mp4";

describe("cloudinary media helpers", () => {
  it("creates responsive image candidates", () => {
    expect(getOptimizedSrcSet("/image.webp", [320, 640])).toContain("320w");
  });

  it("creates an optimized video URL", () => {
    expect(getOptimizedVideoUrl(video, 900)).toContain("q_auto:eco,vc_auto,w_900");
  });

  it("creates a poster from the first video frame", () => {
    expect(getVideoPosterUrl(video, 600)).toContain("so_0");
    expect(getVideoPosterUrl(video, 600)).toMatch(/\.jpg$/);
  });
});
