"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";

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
            width={140}
            height={40}
            className="h-10 w-auto transition-all duration-300"
            priority
          />
        </Link>

        {/* Language Switcher */}
        <div className="hidden md:flex items-center gap-2 ml-4">
          <button
            onClick={() => {
              const newPath = pathname.replace(/^\/(en|ar)/, "/en");
              window.location.href = newPath;
            }}
            className={`text-sm font-bold transition-colors ${pathname.startsWith("/en")
              ? isSolid
                ? "text-[#ff705a]"
                : "text-white"
              : isSolid
                ? "text-gray-600 hover:text-[#ff705a]"
                : "text-white/80 hover:text-white"
              }`}
            style={
              !isSolid
                ? { textShadow: "0 1px 2px rgba(0,0,0,0.45)" }
                : undefined
            }
          >
            EN
          </button>
          <span className={isSolid ? "text-gray-300" : "text-white/40"}>|</span>
          <button
            onClick={() => {
              const newPath = pathname.replace(/^\/(en|ar)/, "/ar");
              window.location.href = newPath;
            }}
            className={`text-sm font-bold transition-colors ${pathname.startsWith("/ar")
              ? isSolid
                ? "text-[#ff705a]"
                : "text-white"
              : isSolid
                ? "text-gray-600 hover:text-[#ff705a]"
                : "text-white/80 hover:text-white"
              }`}
            style={
              !isSolid
                ? { textShadow: "0 1px 2px rgba(0,0,0,0.45)" }
                : undefined
            }
          >
            AR
          </button>
        </div>

        {/* Nav Links */}
        <div className="nav-links hidden md:flex">
          {["home", "features", "pricing", "blog", "contact"].map((key) => {
            const href =
              key === "home"
                ? "/"
                : key === "blog"
                  ? "/blog"
                  : key === "contact"
                    ? "/contact"
                    : `#${key}`;
            return (
              <Link
                key={key}
                href={getLocalizedHref(href)}
                className="nav-link"
                style={{
                  color: isSolid ? "var(--color-heading)" : "white",
                }}
              >
                {dict[key]}
              </Link>
            );
          })}
        </div>

        {/* CTA Button - Desktop */}
        <motion.a
          href={`/${currentLocale}#contact`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`hidden md:inline-flex ${isSolid ? "btn btn-primary" : "btn btn-outline"
            }`}
          style={{
            padding: "10px 25px",
            fontSize: "14px",
            borderColor: isSolid ? "var(--color-primary)" : "white",
            color: "white",
            background: isSolid ? "var(--color-primary)" : "transparent",
          }}
        >
          {dict.getStarted}
        </motion.a>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          style={{ color: isSolid ? "var(--color-heading)" : "white" }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-white md:hidden"
            style={{ top: 0, height: "100vh" }}
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex justify-between items-center mb-12">
                <Link
                  href={`/${currentLocale}`}
                  onClick={() => setIsOpen(false)}
                >
                  <Image
                    src="/logo-dark.png"
                    alt="ASKLYZE"
                    width={140}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-900"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {["home", "features", "pricing", "blog", "contact"].map(
                  (key) => {
                    const href =
                      key === "home"
                        ? "/"
                        : key === "blog"
                          ? "/blog"
                          : key === "contact"
                            ? "/contact"
                            : `#${key}`;
                    return (
                      <Link
                        key={key}
                        href={getLocalizedHref(href)}
                        onClick={() => setIsOpen(false)}
                        className="text-2xl font-bold text-gray-900 hover:text-[#ff705a] transition-colors"
                      >
                        {dict[key]}
                      </Link>
                    );
                  }
                )}
              </div>

              <div className="mt-auto pt-8 border-t border-gray-100">
                <Link
                  href={`/${currentLocale}#contact`}
                  onClick={() => setIsOpen(false)}
                  className="btn btn-primary w-full text-center py-4 mb-8"
                >
                  {dict.getStarted}
                </Link>

                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => {
                      const newPath = pathname.replace(/^\/(en|ar)/, "/en");
                      window.location.href = newPath;
                    }}
                    className={`flex items-center gap-2 font-bold px-4 py-2 rounded-lg ${pathname.startsWith("/en")
                        ? "bg-[#ff705a] text-white"
                        : "text-gray-600"
                      }`}
                  >
                    <Globe size={18} /> English
                  </button>
                  <button
                    onClick={() => {
                      const newPath = pathname.replace(/^\/(en|ar)/, "/ar");
                      window.location.href = newPath;
                    }}
                    className={`flex items-center gap-2 font-bold px-4 py-2 rounded-lg ${pathname.startsWith("/ar")
                        ? "bg-[#ff705a] text-white"
                        : "text-gray-600"
                      }`}
                  >
                    <Globe size={18} /> العربية
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
