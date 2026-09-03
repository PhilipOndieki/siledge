import { z } from "zod";
import { getUiCopy } from "@/lib/content/queries";

const messages = getUiCopy().form.errors;

export const contactFormSchema = z.object({
  name: z.string({ required_error: messages.nameRequired }).min(2, messages.nameRequired),
  email: z.string({ required_error: messages.emailInvalid }).email(messages.emailInvalid),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z
    .string({ required_error: messages.messageRequired })
    .min(10, messages.messageRequired)
    .max(2000, messages.messageTooLong),
  honeypot: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
