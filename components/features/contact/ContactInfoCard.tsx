import { Card } from "@/components/primitives/Card";
import type { Company } from "@/lib/content/schema";

export type ContactInfoCardProps = {
  contact: Company["contact"];
};

export function ContactInfoCard({ contact }: ContactInfoCardProps) {
  return (
    <Card as="article">
      <address className="space-y-5 not-italic text-siledge-slate">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-siledge-blue">Address</p>
          <p className="mt-1">{contact.physicalAddress.join(", ")}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-siledge-blue">
            Postal Address
          </p>
          <p className="mt-1">{contact.postalAddress.join(", ")}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-siledge-blue">Phone</p>
          {contact.phones.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="mt-1 block text-siledge-ink hover:text-siledge-blueBright"
            >
              {phone}
            </a>
          ))}
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-siledge-blue">Email</p>
          {contact.emails.map((email) => (
            <a
              key={email}
              href={`mailto:${email}`}
              className="mt-1 block text-siledge-ink hover:text-siledge-blueBright"
            >
              {email}
            </a>
          ))}
        </div>
      </address>
    </Card>
  );
}

export default ContactInfoCard;
