import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation/contact";

export async function POST(request: Request): Promise<NextResponse> {
  const body: unknown = await request.json();
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    // Silently accept spam bot submissions without sending mail.
    return NextResponse.json({ ok: true });
  }

  // TODO: wire mail transport (e.g. Resend, SES) to deliver parsed.data to
  // the Siledge sales inbox. For now this route only validates the payload.

  return NextResponse.json({ ok: true });
}
