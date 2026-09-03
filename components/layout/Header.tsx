import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Icon } from "@/components/primitives/Icon";
import { getUiCopy } from "@/lib/content/queries";
import { NavLink } from "./NavLink";
import { MobileNav } from "./MobileNav";

export function Header() {
  const ui = getUiCopy();
  const items = [
    { href: "/", label: ui.nav.home },
    { href: "/about", label: ui.nav.about },
    { href: "/products", label: ui.nav.products },
    { href: "/contact", label: ui.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-siledge-blue/10 bg-white/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-siledge-blue text-white">
              <Icon name="settings-2" className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold tracking-wide text-siledge-ink">
              SILEDGE
            </span>
          </span>
          <span className="pl-11 text-[0.6rem] font-medium uppercase tracking-widest text-siledge-slate">
            Industrial Solutions Ltd
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {items.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <MobileNav items={items} />
      </Container>
    </header>
  );
}

export default Header;
