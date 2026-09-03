import { describe, expect, it } from "vitest";
import { contactFormSchema } from "./contact";

describe("contactFormSchema", () => {
  it("accepts a valid submission", () => {
    const result = contactFormSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+254 700 000 000",
      company: "Acme Ltd",
      message: "We would like a quote for deep groove ball bearings.",
      honeypot: "",
    });
    expect(result.success).toBe(true);
  });

  it("accepts a valid submission with optional fields omitted", () => {
    const result = contactFormSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "We would like a quote for deep groove ball bearings.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a missing name", () => {
    const result = contactFormSchema.safeParse({
      name: "",
      email: "jane@example.com",
      message: "We would like a quote for deep groove ball bearings.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = contactFormSchema.safeParse({
      name: "Jane Doe",
      email: "not-an-email",
      message: "We would like a quote for deep groove ball bearings.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a message that is too short", () => {
    const result = contactFormSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "Hi",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a message that is too long", () => {
    const result = contactFormSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "a".repeat(2001),
    });
    expect(result.success).toBe(false);
  });
});
