import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileNav } from "./MobileNav";

const items = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

describe("MobileNav", () => {
  it("opens the panel, navigates, and closes on Escape", async () => {
    render(<MobileNav items={items} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes when the close button is clicked", async () => {
    render(<MobileNav items={items} />);
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    await userEvent.click(await screen.findByRole("button", { name: "Close menu" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
