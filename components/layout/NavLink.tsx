"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export type NavLinkProps = {
  href: string;
  children: string;
};

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative py-2 text-sm font-medium text-siledge-slate transition-colors duration-200 hover:text-siledge-blue",
        isActive && "text-siledge-blue",
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-siledge-blue transition-opacity duration-200",
          isActive ? "opacity-100" : "opacity-0",
        )}
      />
    </Link>
  );
}

export default NavLink;
