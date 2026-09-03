import type { Metadata } from "next";
import { displayFont, bodyFont } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "./providers";
import { buildLocalBusinessJsonLd, buildMetadata, buildOrganizationJsonLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = buildMetadata({
  description:
    "Siledge Industrial Solutions Ltd supplies bearings, seals, power transmission components, and automation systems to manufacturing, agricultural, and transport operators across East Africa.",
  path: "/",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = buildOrganizationJsonLd();
  const localBusinessJsonLd = buildLocalBusinessJsonLd();

  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
