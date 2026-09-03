import type { Metadata } from "next";
import { getCompany } from "@/lib/content/queries";

const SITE_URL = "https://www.siledge.co.ke";

export function siteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

export function composeTitle(pageTitle?: string): string {
  const company = getCompany();
  return pageTitle
    ? `${pageTitle} | ${company.shortName}`
    : `${company.shortName} | ${company.tagline}`;
}

export function buildMetadata(options: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const url = siteUrl(options.path);
  return {
    title: composeTitle(options.title),
    description: options.description,
    alternates: { canonical: url },
    openGraph: {
      title: composeTitle(options.title),
      description: options.description,
      url,
      siteName: getCompany().shortName,
      locale: "en_KE",
      type: "website",
    },
  };
}

export function buildOrganizationJsonLd(): Record<string, unknown> {
  const company = getCompany();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    alternateName: company.shortName,
    url: SITE_URL,
    description: company.overview[0],
    email: company.contact.emails[0],
    telephone: company.contact.phones[0],
  };
}

export function buildLocalBusinessJsonLd(): Record<string, unknown> {
  const company = getCompany();
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.legalName,
    url: SITE_URL,
    telephone: company.contact.phones[0],
    email: company.contact.emails[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: company.contact.physicalAddress[0],
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    ...(company.contact.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: company.contact.geo.lat,
            longitude: company.contact.geo.lng,
          },
        }
      : {}),
  };
}
