import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("renders the icon matching a known registry name", () => {
    const { container } = render(<Icon name="circle-dot" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("falls back to a default icon for an unknown name instead of rendering nothing", () => {
    const { container } = render(<Icon name="not-a-real-icon" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
