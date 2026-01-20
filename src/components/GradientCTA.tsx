"use client";

import { motion } from "framer-motion";

interface GradientCTAProps {
    dict: {
        title: string;
        desc: string;
        cta: string;
    };
}

export default function GradientCTA({ dict }: GradientCTAProps) {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Orange Gradient Background */}
            <div
                className="absolute inset-0 z-0 bg-gradient-to-r from-[#ff8d75] to-[#ffb39b]"
                style={{
                    background: "linear-gradient(90deg, #ff705a 0%, #ff9472 100%)"
                }}
            />

            {/* World Map Pattern Overlay */}
            <div
                className="absolute inset-0 z-10 opacity-10 bg-repeat"
                style={{
                    backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            />

            <div className="container relative z-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="!text-white text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        {dict.title}
                    </h2>

                    <p className="!text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                        {dict.desc}
                    </p>

                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block bg-white text-[#ff705a] font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                        {dict.cta}
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
