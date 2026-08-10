import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MaterialCatalog from "@/components/MaterialCatalog";

vi.mock("@/hooks/use-media-preferences", () => ({
  useMediaPreferences: () => ({ isMobile: true, reduceMotion: true }),
}));

describe("MaterialCatalog", () => {
  it("exposes the active view to assistive technology", () => {
    render(<MaterialCatalog />);

    const carouselButtons = screen.getAllByRole("button", { name: "Carrusel" });
    const gridButtons = screen.getAllByRole("button", { name: "Ver Todo" });

    expect(carouselButtons[0]).toHaveAttribute("aria-pressed", "true");
    expect(gridButtons[0]).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(gridButtons[0]);

    expect(carouselButtons[0]).toHaveAttribute("aria-pressed", "false");
    expect(gridButtons[0]).toHaveAttribute("aria-pressed", "true");
  });
});
