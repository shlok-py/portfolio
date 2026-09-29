"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar({ hasModeSwitcher = false }: { hasModeSwitcher?: boolean }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const modeQuery = hasModeSwitcher ? "?mode=user" : "";
  const links = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ].map((link) => ({ ...link, href: `${link.href}${modeQuery}` }));

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      style={{
        position: "fixed",
        top: hasModeSwitcher ? 28 : 0,
        left: 0,
        width: "100%",
        zIndex: 50,
        background: "var(--navbar-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href={`/${modeQuery}`}
            className="font-serif text-xl font-bold transition-colors"
            style={{ color: "var(--text-heading)" }}
          >
            SK.
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-mono text-sm relative transition-colors"
                style={{
                  color: isActive(link.href)
                    ? "var(--text-primary)"
                    : "var(--text-body)",
                  fontWeight: isActive(link.href) ? 700 : undefined,
                }}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-2 left-0 right-0 h-0.5"
                    style={{ background: "var(--text-primary)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            {/* Mobile Hamburger — hidden on desktop */}
            <button
              className="flex md:hidden items-center justify-center w-10 h-10 rounded-lg transition-colors"
              style={{ color: "var(--text-body)" }}
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "var(--navbar-bg)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <nav className="md:hidden flex flex-col px-6 py-4 gap-1">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-sm px-4 py-3 rounded-lg transition-colors"
                  style={{
                    color: isActive(link.href) ? "var(--text-primary)" : "var(--text-body)",
                    background: isActive(link.href) ? "var(--surface-teal)" : undefined,
                    fontWeight: isActive(link.href) ? 700 : undefined,
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

