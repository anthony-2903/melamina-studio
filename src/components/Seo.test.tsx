import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Seo from "@/components/Seo";

describe("Seo", () => {
  it("updates title, canonical and robots", () => {
    render(<Seo title="Projects" description="Portfolio" path="/proyectos" noIndex />);
    expect(document.title).toBe("Projects");
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://husheniid.com/proyectos");
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow");
  });
});
