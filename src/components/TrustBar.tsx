"use client";

import { motion } from "framer-motion";

interface TrustBarProps {
    dict?: {
        title?: string;
        subtitle?: string;
    };
}

const logos = [
    "Oracle",
    "APEX",
    "ECharts",
    "OCI",
    "PL/SQL",
    "REST",
];

export default function TrustBar({ dict }: TrustBarProps) {
    return (
        <section className="section blue-edge-glow" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        {dict?.title || "Trusted by world leaders."}
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.45)" }}>
                        {dict?.subtitle || "Powering analytics for enterprises worldwide."}
                    </p>
                </motion.div>

                {/* Logo Row */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center items-center gap-12 md:gap-16"
                >
                    {logos.map((logo, index) => (
                        <motion.div
                            key={logo}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-xl md:text-2xl font-bold tracking-wider"
                            style={{
                                color: "rgba(255, 255, 255, 0.25)",
                                fontFamily: "var(--font-heading)",
                                letterSpacing: "0.1em",
                            }}
                        >
                            {logo}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
