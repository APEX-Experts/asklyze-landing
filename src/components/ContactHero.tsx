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
        <section className="relative pt-40 pb-20 bg-[var(--color-bg)] overflow-hidden">
            <div className="container max-w-6xl mx-auto px-4 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl"
                >
                    <span className="text-xs font-bold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-6 block">
                        Contact Us
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--color-heading)] mb-6 leading-tight">
                        {dict.title}
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--color-body-secondary)] max-w-xl font-medium">
                        {dict.desc}
                    </p>
                </motion.div>
            </div>

            {/* Subtle Decorative Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-primary-light)] opacity-20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        </section>
    );
}
