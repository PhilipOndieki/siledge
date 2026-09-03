"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation/contact";
import { Button } from "@/components/primitives/Button";
import { getUiCopy } from "@/lib/content/queries";
import { FormField } from "./FormField";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const ui = getUiCopy();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", phone: "", company: "", message: "", honeypot: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    if (values.honeypot) {
      // Bots fill hidden fields; pretend success without sending anything.
      setStatus("success");
      reset();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      aria-busy={isSubmitting}
    >
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="company-website">Leave this field empty</label>
        <input
          id="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("honeypot")}
        />
      </div>

      <FormField
        id="name"
        label={ui.form.fields.name}
        error={errors.name?.message}
        {...register("name")}
      />
      <FormField
        id="email"
        type="email"
        label={ui.form.fields.email}
        error={errors.email?.message}
        {...register("email")}
      />
      <FormField
        id="phone"
        required={false}
        label={ui.form.fields.phone}
        error={errors.phone?.message}
        {...register("phone")}
      />
      <FormField
        id="company"
        required={false}
        label={ui.form.fields.company}
        error={errors.company?.message}
        {...register("company")}
      />
      <FormField
        as="textarea"
        id="message"
        label={ui.form.fields.message}
        error={errors.message?.message}
        {...register("message")}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? ui.buttons.sending : ui.buttons.sendMessage}
      </Button>

      {status === "success" ? (
        <p role="status" className="text-sm font-medium text-siledge-blue">
          {ui.form.status.success}
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className="text-sm font-medium text-red-600">
          {ui.form.status.error}
        </p>
      ) : null}
    </form>
  );
}

export default ContactForm;
