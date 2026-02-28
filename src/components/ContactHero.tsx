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
        <section className="hero-gradient pt-40 pb-32 relative">
            <div className="container relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl"
                >
                    <h1 className="!text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        {dict.title}
                    </h1>
                    <p className="!text-white/80 text-lg md:text-xl max-w-xl">
                        {dict.desc}
                    </p>
                </motion.div>
            </div>

            {/* Decorative shapes */}
            <div className="absolute top-20 right-10 w-20 h-20 rounded-full animate-float" style={{ background: "rgba(255, 112, 90, 0.06)" }} />
            <div className="absolute bottom-40 right-1/4 w-32 h-32 rounded-full animate-float" style={{ background: "rgba(255, 112, 90, 0.03)", animationDelay: "1s" }} />
            <div className="absolute top-1/3 right-20 w-16 h-16 rounded-full border-2 border-white/5 animate-float" style={{ animationDelay: "0.5s" }} />
        </section>
    );
}
