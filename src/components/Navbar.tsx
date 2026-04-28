"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LinkButton from "./LinkButton";
import Logo from "./Logo";
import { NavbarContent } from "../../payload-types";

interface NavbarProps {
  dict: Omit<NavbarContent, "id" | "createdAt" | "updatedAt">;
  siteSettings: {
    customerPortalUrl: string;
  };
}

export default function Navbar({ dict, siteSettings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = pathname.startsWith("/ar") ? "ar" : "en";

  const getLocalizedHref = (href: string) => {
    if (href.startsWith("#")) return `/${currentLocale}${href}`;
    if (href === "/") return `/${currentLocale}`;
    return `/${currentLocale}${href}`;
  };

  const navItems = dict.links || [];
  const switchLanguage = (newLocale: string) => {
    // 1. Calculate the new path
    const newPath = pathname.replace(/^\/(en|ar)/, `/${newLocale}`);

    // 2. Set the cookie so middleware remembers the choice
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // 3. Hard reload to fetch fresh HTML, direction, and translations
    window.location.href = newPath;
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginTop: "35px" }}
        className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 "
      >
        <div className="border border-primary-light flex w-full max-w-[1240px] h-[64px] py-[14px] pr-[10px] pl-[30px] justify-between items-center shrink-0 rounded-[50px] bg-white backdrop-blur-[7.5px] mx-auto shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          {/* Logo */}
          <Link
            href={`/${currentLocale}`}
            className="flex items-center gap-2 text-primary"
            style={{ textDecoration: "none" }}
          >
            <span className="sr-only">{dict.links?.[0].label}</span>
            <Logo width={120} height={36} />
          </Link>

          {/* DESKTOP: Center Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item, index) => {
              const isActive =
                item.href === "/"
                  ? pathname === `/${currentLocale}` || pathname === "/"
                  : pathname.includes(item.href.replace("#", "")) &&
                    item.href !== "/";
              return item.external ? (
                <a
                  key={item.label || index}
                  href={item.href}
                  className="text-text-heading hover:text-primary font-medium transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label || index}
                  href={getLocalizedHref(item.href)}
                  className={`${isActive ? "text-primary " : "text-text-heading"} relative hover:text-primary font-medium transition-colors`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute w-[60%] h-[1.5px] bg-primary -bottom-[2.5px] left-1/2 -translate-x-1/2 ${isActive ? "block" : "hidden"}`}
                  ></span>
                </Link>
              );
            })}
          </div>

          {/* DESKTOP: Right Side CTA + Lang */}
          <div className="hidden lg:flex items-center gap-4">
            {/* CTA: White pill button with arrow */}
            <LinkButton
              href={siteSettings.customerPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.getStarted}
            </LinkButton>
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-50 transition-colors text-text-heading font-semibold text-sm"
              >
                <Globe size={18} className="text-primary" />
                <span className="uppercase">{currentLocale}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-60"
                      onClick={() => setIsLangOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-70 overflow-hidden"
                    >
                      {[
                        { code: "en", label: "English" },
                        { code: "ar", label: "العربية" },
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            switchLanguage(lang.code);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                            currentLocale === lang.code
                              ? "text-primary font-bold bg-primary/5"
                              : "text-text-heading cursor-pointer"
                          }`}
                          style={{
                            fontFamily:
                              lang.code === "ar"
                                ? "var(--font-almarai), system-ui, sans-serif"
                                : "var(--font-inter), system-ui, sans-serif",
                          }}
                        >
                          <span>{lang.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 -mr-2 flex items-center justify-center transition-colors focus:outline-none text-text-heading hover:text-primary z-1001"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={30} strokeWidth={2.5} color="currentColor" />
            ) : (
              <Menu size={30} strokeWidth={2.5} color="currentColor" />
            )}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 z-60 bg-black/60 backdrop-blur-sm"
          />
        )}
        {isOpen && (
          <motion.div
            key="mobile-menu-panel"
            initial={{ x: currentLocale === "ar" ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: currentLocale === "ar" ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`lg:hidden fixed top-0 bottom-0 z-70 w-[300px] shadow-2xl bg-white flex flex-col ${
              currentLocale === "ar" ? "left-0" : "right-0"
            }`}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <Link href={`/${currentLocale}`} onClick={() => setIsOpen(false)}>
                <Logo width={120} height={36} />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-text-muted hover:text-text-heading transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-6">
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => {
                  const isExternal = item.external;
                  const content = (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="flex items-center justify-between py-4 px-3 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-medium text-text-heading group-hover:text-primary transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight
                        size={18}
                        className="text-text-muted group-hover:text-primary transition-all transform group-hover:translate-x-1"
                      />
                    </motion.div>
                  );

                  return isExternal ? (
                    <a
                      key={item.label || index}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      {content}
                    </a>
                  ) : (
                    <Link
                      key={item.label || index}
                      href={getLocalizedHref(item.href)}
                      onClick={() => setIsOpen(false)}
                    >
                      {content}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col gap-8">
                <div className="px-3">
                  <a
                    href={siteSettings.customerPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center py-4 rounded-xl text-center bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
                  >
                    {dict.getStarted}
                  </a>
                </div>

                <div className="px-3">
                  <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">
                    {currentLocale === "ar" ? "اللغة" : "Language"}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => switchLanguage("en")}
                      className={`flex items-center justify-center gap-2 font-bold py-3 rounded-xl border transition-all ${
                        pathname.startsWith("/en")
                          ? "bg-primary border-primary text-white"
                          : "bg-white border-gray-200 text-text-body hover:border-primary/50"
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => switchLanguage("ar")}
                      className={`flex items-center justify-center gap-2 font-bold py-3 rounded-xl border transition-all ${
                        pathname.startsWith("/ar")
                          ? "bg-primary border-primary text-white"
                          : "bg-white border-gray-200 text-text-body hover:border-primary/50"
                      }`}
                    >
                      AR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
