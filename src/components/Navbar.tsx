"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
    dict: {
        home: string;
        features: string;
        pricing: string;
        blog: string;
        contact: string;
        getStarted: string;
        [key: string]: string; // Allow index signature for map loop
    }
}

export default function Navbar({ dict }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
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
                            const newPath = pathname.replace(/^\/(en|ar)/, '/en');
                            window.location.href = newPath;
                        }}
                        className={`text-sm font-bold transition-colors ${pathname.startsWith('/en') ? 'text-[#ff705a]' : (isSolid ? 'text-gray-600 hover:text-[#ff705a]' : 'text-white/80 hover:text-white')}`}
                    >
                        EN
                    </button>
                    <span className={isSolid ? 'text-gray-300' : 'text-white/40'}>|</span>
                    <button
                        onClick={() => {
                            const newPath = pathname.replace(/^\/(en|ar)/, '/ar');
                            window.location.href = newPath;
                        }}
                        className={`text-sm font-bold transition-colors ${pathname.startsWith('/ar') ? 'text-[#ff705a]' : (isSolid ? 'text-gray-600 hover:text-[#ff705a]' : 'text-white/80 hover:text-white')}`}
                    >
                        AR
                    </button>
                </div>

                {/* Nav Links */}
                <div className="nav-links hidden md:flex">
                    {["home", "features", "pricing", "blog", "contact"].map((key) => {
                        const href = key === "home" ? "/" : key === "blog" ? "/blog" : key === "contact" ? "/contact" : `#${key}`;
                        return (
                            <Link
                                key={key}
                                href={getLocalizedHref(href)}
                                className="nav-link"
                                style={{
                                    color: isSolid ? "var(--color-heading)" : "white"
                                }}
                            >
                                {dict[key]}
                            </Link>
                        );
                    })}
                </div>

                {/* CTA Button */}
                <motion.a
                    href={`/${currentLocale}#contact`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={isSolid ? "btn btn-primary" : "btn btn-outline"}
                    style={{
                        padding: "10px 25px",
                        fontSize: "14px",
                        borderColor: isSolid ? "var(--color-primary)" : "white",
                        color: isSolid ? "white" : "white",
                        background: isSolid ? "var(--color-primary)" : "transparent",
                    }}
                >
                    {dict.getStarted}
                </motion.a>

            </div>
        </motion.nav>
    );
}
