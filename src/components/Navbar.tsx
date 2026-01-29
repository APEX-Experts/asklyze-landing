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
          {/* Logo - switches between light and dark versions */}
          <Image
            src={isSolid ? "/logo-dark.png" : "/logo-light.png"}
            alt="ASKLYZE"
            width={120}
            height={36}
            className="h-9 w-auto object-contain transition-all duration-300"
            priority
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
                <span style={{ color: isSolid ? "var(--color-heading)" : "white" }}>
                  {dict[key]}
                </span>
              );

              return isExternal ? (
                <a key={key} href={href} className="nav-link">
                  {content}
                </a>
              ) : (
                <Link key={key} href={getLocalizedHref(href)} className="nav-link">
                  {content}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4 border-l border-white/20 pl-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const newPath = pathname.replace(/^\/(en|ar)/, "/en");
                  window.location.href = newPath;
                }}
                className={`text-sm font-bold transition-colors ${pathname.startsWith("/en")
                  ? isSolid ? "text-[#ff705a]" : "text-white"
                  : isSolid ? "text-gray-600 hover:text-[#ff705a]" : "text-white/80 hover:text-white"
                  }`}
              >
                EN
              </button>
              <span className={isSolid ? "text-gray-300" : "text-white/20"}>|</span>
              <button
                onClick={() => {
                  const newPath = pathname.replace(/^\/(en|ar)/, "/ar");
                  window.location.href = newPath;
                }}
                className={`text-sm font-bold transition-colors ${pathname.startsWith("/ar")
                  ? isSolid ? "text-[#ff705a]" : "text-white"
                  : isSolid ? "text-gray-600 hover:text-[#ff705a]" : "text-white/80 hover:text-white"
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
              className={isSolid ? "btn btn-primary" : "btn btn-outline"}
              style={{
                padding: "8px 20px",
                fontSize: "13px",
                borderColor: isSolid ? "var(--color-primary)" : "white",
                color: "white",
                background: isSolid ? "var(--color-primary)" : "transparent",
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
            color: isSolid ? "var(--color-heading)" : "white",
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
                className={`fixed top-0 bottom-0 z-[70] w-4/5 max-w-sm bg-white shadow-2xl md:hidden ${currentLocale === "ar" ? "left-0" : "right-0"
                  }`}
              >
                <div className="flex flex-col h-full bg-white">
                  {/* Drawer Header */}
                  <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <Link
                      href={`/${currentLocale}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Image
                        src="/logo-dark.png"
                        alt="ASKLYZE"
                        width={120}
                        height={35}
                        className="h-8 w-auto"
                      />
                    </Link>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
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
                            className="flex items-center justify-between py-4 px-3 rounded-xl hover:bg-gray-50 transition-colors group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="p-2 rounded-lg bg-gray-50 text-gray-400 group-hover:bg-[#ff705a]/10 group-hover:text-[#ff705a] transition-colors">
                                <item.icon size={20} />
                              </div>
                              <span className="text-lg font-semibold text-gray-700 group-hover:text-gray-900">
                                {dict[item.key]}
                              </span>
                            </div>
                            <ChevronRight size={18} className="text-gray-300 group-hover:text-[#ff705a] transition-all transform group-hover:translate-x-1" />
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

                    <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col gap-10">
                      {/* CTA inside menu */}
                      <div className="px-3">
                        <a
                          href="https://g50f94ce30c3ffb-asklyze.adb.ca-toronto-1.oraclecloudapps.com/ords/r/asklyze_local/asklyze-customer-portal/login"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                          className="btn btn-primary w-full py-4 rounded-xl shadow-lg shadow-[#ff705a]/30 text-center"
                          style={{ color: "white" }}
                        >
                          {dict.getStarted}
                        </a>
                      </div>

                      <div className="px-3">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                          {currentLocale === "ar" ? "اللغة" : "Language"}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => {
                              const newPath = pathname.replace(/^\/(en|ar)/, "/en");
                              window.location.href = newPath;
                            }}
                            className={`flex items-center justify-center gap-2 font-bold py-3 rounded-xl border transition-all ${pathname.startsWith("/en")
                              ? "bg-[#ff705a] border-[#ff705a] text-white shadow-md shadow-[#ff705a]/20"
                              : "bg-gray-50 border-gray-100 text-gray-600 hover:border-gray-300"
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
                              ? "bg-[#ff705a] border-[#ff705a] text-white shadow-md shadow-[#ff705a]/20"
                              : "bg-gray-50 border-gray-100 text-gray-600 hover:border-gray-300"
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
