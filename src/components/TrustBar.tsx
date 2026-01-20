"use client";

import { motion } from "framer-motion";

const partners = [
    "Oracle",
    "Apex Experts",
    "Enterprise Corp",
    "Data Solutions",
    "Analytics Pro",
    "Cloud Systems",
    "Tech Innovate",
    "Digital First",
];

export default function TrustBar() {
    return (
        <section className="section-spacing overflow-hidden">
            <div className="section-container mb-8">
                <p
                    className="text-center text-sm uppercase tracking-widest"
                    style={{ color: "var(--color-text-muted)", opacity: 0.6 }}
                >
                    Trusted by industry leaders
                </p>
            </div>

            {/* Marquee container */}
            <div className="relative">
                {/* Left fade */}
                <div
                    className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
                    style={{
                        background: "linear-gradient(to right, var(--color-bg), transparent)",
                    }}
                />

                {/* Right fade */}
                <div
                    className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
                    style={{
                        background: "linear-gradient(to left, var(--color-bg), transparent)",
                    }}
                />

                {/* Marquee track */}
                <div className="flex animate-marquee">
                    {/* First set */}
                    {[...partners, ...partners].map((partner, i) => (
                        <div
                            key={`${partner}-${i}`}
                            className="flex-shrink-0 px-12 py-6"
                        >
                            <div
                                className="text-2xl font-semibold tracking-tight whitespace-nowrap transition-opacity duration-300 hover:opacity-60"
                                style={{
                                    fontFamily: "var(--font-playfair), serif",
                                    color: "var(--color-text)",
                                    opacity: 0.25,
                                }}
                            >
                                {partner}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats row */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="section-container mt-16"
            >
                <div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-t border-b"
                    style={{ borderColor: "var(--color-border)" }}
                >
                    {[
                        { value: "1000+", label: "Tables Analyzed" },
                        { value: "22+", label: "Visualization Types" },
                        { value: "< 2s", label: "Average Response" },
                        { value: "100%", label: "Data Sovereignty" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div
                                className="text-3xl lg:text-4xl font-bold mb-2"
                                style={{
                                    fontFamily: "var(--font-playfair), serif",
                                    color: "var(--color-accent)",
                                }}
                            >
                                {stat.value}
                            </div>
                            <div
                                className="text-sm"
                                style={{ color: "var(--color-text-muted)" }}
                            >
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
