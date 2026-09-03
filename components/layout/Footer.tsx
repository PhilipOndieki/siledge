import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { getCategories, getCompany, getUiCopy } from "@/lib/content/queries";

export function Footer() {
  const company = getCompany();
  const categories = getCategories();
  const ui = getUiCopy();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-siledge-ink text-white">
      <Container className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold">{company.shortName.toUpperCase()}</p>
          <p className="mt-3 max-w-xs text-sm text-white/70">{company.tagline}</p>
        </div>

        <nav aria-label="Company">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white/60">Company</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/" className="text-white/80 hover:text-white">
                {ui.nav.home}
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-white/80 hover:text-white">
                {ui.nav.about}
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-white/80 hover:text-white">
                {ui.nav.products}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-white/80 hover:text-white">
                {ui.nav.contact}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Product categories">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white/60">Products</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/products#${category.slug}`}
                  className="text-white/80 hover:text-white"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white/60">Contact</h2>
          <address className="mt-4 space-y-3 text-sm not-italic text-white/80">
            <p>{company.contact.physicalAddress.join(", ")}</p>
            <p>{company.contact.postalAddress.join(", ")}</p>
            <p className="flex flex-col">
              {company.contact.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="inline-block py-1 hover:text-white"
                >
                  {phone}
                </a>
              ))}
            </p>
            <p className="flex flex-col">
              {company.contact.emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="inline-block py-1 hover:text-white"
                >
                  {email}
                </a>
              ))}
            </p>
          </address>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container>
          <p className="text-center text-xs text-white/60">
            © {year} {company.legalName}. All Rights Reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
