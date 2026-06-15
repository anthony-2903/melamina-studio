import { describe, expect, it } from "vitest";
import { validateVideoMetadata } from "@/lib/mediaValidation";

describe("validateVideoMetadata", () => {
  it("accepts short Full HD videos", () => {
    expect(validateVideoMetadata({ duration: 10, width: 1920, height: 1080 })).toBeNull();
  });

  it("rejects long videos", () => {
    expect(validateVideoMetadata({ duration: 13, width: 1280, height: 720 })).toContain("12 segundos");
  });

  it("rejects oversized resolutions", () => {
    expect(validateVideoMetadata({ duration: 5, width: 2560, height: 1440 })).toContain("1920x1080");
  });
});
