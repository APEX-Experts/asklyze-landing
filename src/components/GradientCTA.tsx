"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface GradientCTAProps {
    dict: {
        title: string;
        desc: string;
        cta: string;
    };
    lang?: string;
}

export default function GradientCTA({ dict, lang = "en" }: GradientCTAProps) {
    return (
        <section className="relative py-32 overflow-hidden bg-[#0c0a09]">
            {/* Purple/magenta atmospheric glow — x.ai Unhinged style */}
            <div className="absolute inset-0 pointer-events-none select-none z-0">
                {/* Main purple/magenta glow — bottom center-left */}
                <div className="absolute bottom-0 left-[30%] w-[70%] h-[80%]"
                    style={{
                        background: 'radial-gradient(ellipse 70% 70% at 40% 90%, rgba(168,85,247,0.25) 0%, rgba(147,51,234,0.15) 25%, rgba(126,34,206,0.08) 45%, transparent 70%)',
                    }}
                />
                {/* Secondary pink/fuchsia accent */}
                <div className="absolute bottom-0 left-[20%] w-[50%] h-[60%]"
                    style={{
                        background: 'radial-gradient(ellipse 60% 60% at 35% 95%, rgba(217,70,239,0.18) 0%, rgba(192,38,211,0.08) 35%, transparent 60%)',
                    }}
                />
                {/* Subtle warm edge blend */}
                <div className="absolute bottom-0 left-[40%] w-[40%] h-[50%]"
                    style={{
                        background: 'radial-gradient(ellipse 50% 50% at 50% 100%, rgba(236,72,153,0.10) 0%, transparent 50%)',
                    }}
                />
            </div>

            <div className="container relative z-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight tracking-tight text-white">
                        {dict.title}
                    </h2>

                    <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        {dict.desc}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <motion.a
                            href={`/${lang}/contact`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 bg-white text-black font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all"
                        >
                            {dict.cta}
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                        <motion.a
                            href="https://g50f94ce30c3ffb-asklyze.adb.ca-toronto-1.oraclecloudapps.com/ords/r/asklyze_local/asklyze-customer-portal/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 bg-transparent text-gray-300 border border-gray-700 hover:border-gray-500 font-bold py-4 px-10 rounded-xl transition-all"
                        >
                            Log In
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
