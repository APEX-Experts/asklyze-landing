"use client";

import { motion } from "framer-motion";

interface ContactHeroProps {
    dict: {
        title: string;
        desc: string;
    }
}

export default function ContactHero({ dict }: ContactHeroProps) {
    return (
        <section className="relative pt-40 pb-20 overflow-hidden" style={{ background: "#000" }}>
            <div className="container max-w-3xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Get in Touch
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        {dict.title}
                    </h1>
                    <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {dict.desc}
                    </p>
                </motion.div>
            </div>
            {/* Subtle blue glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                    width: "800px",
                    height: "600px",
                    background: "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 60%)",
                }}
            />
        </section>
    );
}
