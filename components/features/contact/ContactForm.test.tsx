import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows field errors and does not submit when required fields are empty", async () => {
    render(<ContactForm />);

    await userEvent.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByText("Enter your full name.")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("blocks double submission by disabling the button while submitting", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Full name"), "Jane Doe");
    await user.type(screen.getByLabelText("Email address"), "jane@example.com");
    await user.type(
      screen.getByLabelText("Message"),
      "We would like a quote for deep groove ball bearings.",
    );

    const submitButton = screen.getByRole("button", { name: "Send message" });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Thank you/)).toBeInTheDocument();
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
