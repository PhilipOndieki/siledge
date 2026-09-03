"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export type MobileNavItem = { href: string; label: string };

export type MobileNavProps = {
  items: MobileNavItem[];
};

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    openButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        ref={openButtonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Open menu"
        className="flex h-11 w-11 items-center justify-center rounded-md text-siledge-ink"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {open && mounted
        ? createPortal(
            <div className="fixed inset-0 z-50">
              <div
                className="absolute inset-0 bg-siledge-ink/50"
                onClick={close}
                aria-hidden="true"
              />
              <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                className="absolute inset-y-0 right-0 flex h-full w-full max-w-sm flex-col bg-white p-6 shadow-cardHover"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-siledge-ink">Menu</span>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={close}
                    aria-label="Close menu"
                    className="flex h-11 w-11 items-center justify-center rounded-md text-siledge-ink"
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <nav className="mt-8 flex flex-col gap-2" aria-label="Primary">
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={close}
                      className="rounded-md px-3 py-3 text-lg font-medium text-siledge-ink hover:bg-siledge-mist hover:text-siledge-blue"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

export default MobileNav;
