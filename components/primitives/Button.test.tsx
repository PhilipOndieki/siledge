import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders a button element and fires onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Send message</Button>);
    const button = screen.getByRole("button", { name: "Send message" });
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders a link when href is provided", () => {
    render(<Button href="/products">Explore our products</Button>);
    const link = screen.getByRole("link", { name: "Explore our products" });
    expect(link).toHaveAttribute("href", "/products");
  });

  it("disables the button and prevents interaction", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Sending…
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Sending…" });
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
