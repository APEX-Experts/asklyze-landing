"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe, Home, Zap, CreditCard, Newspaper, FileText, Mail, ChevronRight } from "lucide-react";

interface NavbarProps {
  dict: {
    home: string;
    features: string;
    pricing: string;
    blog: string;
    contact: string;
    getStarted: string;
    [key: string]: string; // Allow index signature for map loop
  };
}

export default function Navbar({ dict }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = pathname.startsWith("/ar") ? "ar" : "en";
  const isHome = pathname === "/" || pathname === "/en" || pathname === "/ar";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force solid navbar on non-home pages or when scrolled
  const isSolid = scrolled || !isHome;

  const getLocalizedHref = (href: string) => {
    if (href.startsWith("#")) return `/${currentLocale}${href}`;
    if (href === "/") return `/${currentLocale}`;
    return `/${currentLocale}${href}`;
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`navbar ${isSolid ? "scrolled" : ""}`}
    >
      <div className="container navbar-container">
        {/* Logo */}
        <Link
          href={`/${currentLocale}`}
          className="flex items-center gap-2"
          style={{ textDecoration: "none" }}
        >
          {/* Logo - always dark since background is never dark */}
          <Image
            src="/logo-light.png"
            alt="ASKLYZE"
            width={120}
            height={36}
            className="h-9 w-auto object-contain transition-all duration-300"
            priority
            unoptimized={true}
          />
        </Link>

        {/* DESKTOP MENU - Completely hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          {/* Nav Links */}
          <div className="flex items-center gap-8">
            {["home", "features", "pricing", "blog", "docs", "contact"].map((key) => {
              const href =
                key === "home"
                  ? "/"
                  : key === "blog"
                    ? "/blog"
                    : key === "docs"
                      ? "https://docs.asklyze.ai/"
                      : key === "contact"
                        ? "/contact"
                        : `#${key}`;

              const isExternal = key === "docs";

              const content = (
                <span style={{ color: "var(--color-heading)", fontSize: "14px", fontWeight: 500 }}>
                  {dict[key]}
                </span>
              );

              return isExternal ? (
                <a key={key} href={href} className="nav-link !text-[var(--color-heading)] hover:!text-[var(--color-primary)]">
                  {content}
                </a>
              ) : (
                <Link key={key} href={getLocalizedHref(href)} className="nav-link !text-[var(--color-heading)] hover:!text-[var(--color-primary)]">
                  {content}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4 border-l border-[var(--color-border)] pl-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const newPath = pathname.replace(/^\/(en|ar)/, "/en");
                  window.location.href = newPath;
                }}
                className={`text-sm font-bold transition-colors ${pathname.startsWith("/en")
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-body-secondary)] hover:text-[var(--color-primary)]"
                  }`}
              >
                EN
              </button>
              <span className="text-[var(--color-border)]">|</span>
              <button
                onClick={() => {
                  const newPath = pathname.replace(/^\/(en|ar)/, "/ar");
                  window.location.href = newPath;
                }}
                className={`text-sm font-bold transition-colors ${pathname.startsWith("/ar")
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-body-secondary)] hover:text-[var(--color-primary)]"
                  }`}
              >
                AR
              </button>
            </div>

            {/* Desktop CTA */}
            <motion.a
              href="https://g50f94ce30c3ffb-asklyze.adb.ca-toronto-1.oraclecloudapps.com/ords/r/asklyze_local/asklyze-customer-portal/login"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
              style={{
                padding: "10px 24px",
                fontSize: "14px",
                fontWeight: 600,
                color: "white",
                background: "var(--color-primary)",
                border: "none",
                borderRadius: "8px",
              }}
            >
              {dict.getStarted}
            </motion.a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 -mr-2 flex items-center justify-center transition-colors focus:outline-none"
          style={{
            color: "var(--color-heading)",
            zIndex: 1001
          }}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={30} strokeWidth={2.5} /> : <Menu size={30} strokeWidth={2.5} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
              />

              {/* Drawer Container */}
              <motion.div
                initial={{ x: currentLocale === "ar" ? "-100%" : "100%" }}
                animate={{ x: 0 }}
                exit={{ x: currentLocale === "ar" ? "-100%" : "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`fixed top-0 bottom-0 z-[70] w-4/5 max-w-sm bg-[var(--color-bg-card)] shadow-[var(--shadow-card)] md:hidden ${currentLocale === "ar" ? "left-0" : "right-0"
                  }`}
              >
                <div className="flex flex-col h-full bg-[var(--color-bg-card)]">
                  {/* Drawer Header */}
                  <div className="flex justify-between items-center p-6 border-b border-[var(--color-border)]">
                    <Link
                      href={`/${currentLocale}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Image
                        src="/logo-light.png"
                        alt="ASKLYZE"
                        width={120}
                        height={35}
                        className="h-8 w-auto"
                        unoptimized={true}
                      />
                    </Link>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 text-[var(--color-body-secondary)] hover:text-[var(--color-heading)] transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Drawer Content - Scrollable */}
                  <div className="flex-1 overflow-y-auto py-6 px-6">
                    <div className="flex flex-col gap-1">
                      {[
                        { key: "home", icon: Home, href: "/" },
                        { key: "features", icon: Zap, href: "#features" },
                        { key: "pricing", icon: CreditCard, href: "#pricing" },
                        { key: "blog", icon: Newspaper, href: "/blog" },
                        { key: "docs", icon: FileText, href: "https://docs.asklyze.ai/", external: true },
                        { key: "contact", icon: Mail, href: "/contact" },
                      ].map((item, index) => {
                        const isExternal = item.external;
                        const content = (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            className="flex items-center justify-between py-4 px-3 rounded-xl hover:bg-[var(--color-bg-alt)] transition-colors group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="p-2 rounded-lg bg-[var(--color-bg-alt)] text-[var(--color-body-muted)] group-hover:bg-[var(--color-primary-light)] group-hover:text-[var(--color-primary)] transition-colors">
                                <item.icon size={20} />
                              </div>
                              <span className="text-lg font-semibold text-[var(--color-body)] group-hover:text-[var(--color-heading)]">
                                {dict[item.key]}
                              </span>
                            </div>
                            <ChevronRight size={18} className="text-[var(--color-body-muted)] group-hover:text-[var(--color-primary)] transition-all transform group-hover:translate-x-1" />
                          </motion.div>
                        );

                        return isExternal ? (
                          <a
                            key={item.key}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                          >
                            {content}
                          </a>
                        ) : (
                          <Link
                            key={item.key}
                            href={getLocalizedHref(item.href)}
                            onClick={() => setIsOpen(false)}
                          >
                            {content}
                          </Link>
                        );
                      })}
                    </div>

                    <div className="mt-8 pt-8 border-t border-[var(--color-border)] flex flex-col gap-10">
                      {/* CTA inside menu */}
                      <div className="px-3">
                        <a
                          href="https://g50f94ce30c3ffb-asklyze.adb.ca-toronto-1.oraclecloudapps.com/ords/r/asklyze_local/asklyze-customer-portal/login"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                          className="btn btn-primary w-full py-4 rounded-xl shadow-lg shadow-[var(--shadow-button)] text-center font-semibold"
                          style={{ color: "white", background: "var(--color-primary)" }}
                        >
                          {dict.getStarted}
                        </a>
                      </div>

                      <div className="px-3">
                        <div className="text-xs font-bold text-[var(--color-body-muted)] uppercase tracking-widest mb-4">
                          {currentLocale === "ar" ? "اللغة" : "Language"}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => {
                              const newPath = pathname.replace(/^\/(en|ar)/, "/en");
                              window.location.href = newPath;
                            }}
                            className={`flex items-center justify-center gap-2 font-bold py-3 rounded-xl border transition-all ${pathname.startsWith("/en")
                              ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary-light)]"
                              : "bg-[var(--color-bg-alt)] border-[var(--color-border)] text-[var(--color-body-secondary)] hover:border-[var(--color-primary)]"
                              }`}
                          >
                            EN
                          </button>
                          <button
                            onClick={() => {
                              const newPath = pathname.replace(/^\/(en|ar)/, "/ar");
                              window.location.href = newPath;
                            }}
                            className={`flex items-center justify-center gap-2 font-bold py-3 rounded-xl border transition-all ${pathname.startsWith("/ar")
                              ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary-light)]"
                              : "bg-[var(--color-bg-alt)] border-[var(--color-border)] text-[var(--color-body-secondary)] hover:border-[var(--color-primary)]"
                              }`}
                          >
                            AR
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
