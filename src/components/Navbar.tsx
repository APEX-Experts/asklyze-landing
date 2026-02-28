"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Home, Zap, CreditCard, Newspaper, FileText, Mail, Users, ChevronRight, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  dict: {
    home: string;
    features: string;
    pricing: string;
    blog: string;
    contact: string;
    getStarted: string;
    [key: string]: string;
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

  const isSolid = scrolled || !isHome;

  const getLocalizedHref = (href: string) => {
    if (href.startsWith("#")) return `/${currentLocale}${href}`;
    if (href === "/") return `/${currentLocale}`;
    return `/${currentLocale}${href}`;
  };

  const navItems = [
    { key: "features", href: "#features", icon: Zap },
    { key: "pricing", href: "#pricing", icon: CreditCard },
    { key: "blog", href: "/blog", icon: Newspaper },
    { key: "docs", href: "https://docs.asklyze.ai/", icon: FileText, external: true },
    { key: "about", href: "/about", icon: Users },
    { key: "contact", href: "/contact", icon: Mail },
  ];

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

        {/* DESKTOP: Center Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) =>
            item.external ? (
              <a key={item.key} href={item.href} className="nav-link">
                {dict[item.key] || item.key}
              </a>
            ) : (
              <Link key={item.key} href={getLocalizedHref(item.href)} className="nav-link">
                <span>{dict[item.key]}</span>
              </Link>
            )
          )}
        </div>

        {/* DESKTOP: Right Side CTA + Lang */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const newPath = pathname.replace(/^\/(en|ar)/, "/en");
                window.location.href = newPath;
              }}
              className={`text-xs font-bold transition-colors ${pathname.startsWith("/en")
                ? "text-white"
                : "text-white/40 hover:text-white/70"
                }`}
            >
              EN
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={() => {
                const newPath = pathname.replace(/^\/(en|ar)/, "/ar");
                window.location.href = newPath;
              }}
              className={`text-xs font-bold transition-colors ${pathname.startsWith("/ar")
                ? "text-white"
                : "text-white/40 hover:text-white/70"
                }`}
            >
              AR
            </button>
          </div>

          {/* CTA: White pill button with arrow */}
          <motion.a
            href="https://g50f94ce30c3ffb-asklyze.adb.ca-toronto-1.oraclecloudapps.com/ords/r/asklyze_local/asklyze-customer-portal/login"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
            style={{
              background: "#ffffff",
              color: "#000000",
            }}
          >
            {dict.getStarted}
            <span
              className="flex items-center justify-center w-6 h-6 rounded-full"
              style={{ background: "rgba(0,0,0,0.1)" }}
            >
              <ArrowUpRight size={14} />
            </span>
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 -mr-2 flex items-center justify-center transition-colors focus:outline-none"
          style={{ color: "white", zIndex: 1001 }}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={30} strokeWidth={2.5} /> : <Menu size={30} strokeWidth={2.5} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
              />
              <motion.div
                initial={{ x: currentLocale === "ar" ? "-100%" : "100%" }}
                animate={{ x: 0 }}
                exit={{ x: currentLocale === "ar" ? "-100%" : "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`fixed top-0 bottom-0 z-[70] w-4/5 max-w-sm shadow-2xl md:hidden ${currentLocale === "ar" ? "left-0" : "right-0"}`}
                style={{ background: "#0a0a0f" }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center p-6 border-b border-white/8">
                    <Link href={`/${currentLocale}`} onClick={() => setIsOpen(false)}>
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
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto py-6 px-6">
                    <div className="flex flex-col gap-1">
                      {navItems.map((item, index) => {
                        const isExternal = item.external;
                        const content = (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            className="flex items-center justify-between py-4 px-3 rounded-xl hover:bg-white/5 transition-colors group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="p-2 rounded-lg bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-white transition-colors">
                                <item.icon size={20} />
                              </div>
                              <span className="text-lg font-semibold text-gray-300 group-hover:text-white">
                                {dict[item.key]}
                              </span>
                            </div>
                            <ChevronRight size={18} className="text-gray-600 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                          </motion.div>
                        );

                        return isExternal ? (
                          <a key={item.key} href={item.href} onClick={() => setIsOpen(false)}>
                            {content}
                          </a>
                        ) : (
                          <Link key={item.key} href={getLocalizedHref(item.href)} onClick={() => setIsOpen(false)}>
                            {content}
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/8 flex flex-col gap-10">
                      <div className="px-3">
                        <a
                          href="https://g50f94ce30c3ffb-asklyze.adb.ca-toronto-1.oraclecloudapps.com/ords/r/asklyze_local/asklyze-customer-portal/login"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                          className="btn btn-white w-full py-4 rounded-xl text-center"
                          style={{ color: "#000000" }}
                        >
                          {dict.getStarted}
                        </a>
                      </div>
                      <div className="px-3">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                          {currentLocale === "ar" ? "اللغة" : "Language"}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => {
                              const newPath = pathname.replace(/^\/(en|ar)/, "/en");
                              window.location.href = newPath;
                            }}
                            className={`flex items-center justify-center gap-2 font-bold py-3 rounded-xl border transition-all ${pathname.startsWith("/en")
                              ? "bg-white border-white text-black"
                              : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
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
                              ? "bg-white border-white text-black"
                              : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
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
