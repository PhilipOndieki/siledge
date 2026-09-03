import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ImagePlaceholder } from "./ImagePlaceholder";

describe("ImagePlaceholder", () => {
  it("renders a labelled placeholder when no image is given", () => {
    render(<ImagePlaceholder label="Deep Groove Ball Bearings" />);
    expect(screen.getByRole("img", { name: "Deep Groove Ball Bearings" })).toBeInTheDocument();
    expect(screen.getByText("Deep Groove Ball Bearings")).toBeInTheDocument();
  });

  it("renders an actual image once an image path is provided", () => {
    render(<ImagePlaceholder label="Timing Belts" image="/images/timing-belts.jpg" />);
    const image = screen.getByAltText("Timing Belts");
    expect(image.tagName).toBe("IMG");
  });
});
