"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";

interface ContentSplitProps {
    dict: {
        section1: {
            title: string;
            desc: string;
            cta: string;
            badgeTitle: string;
            badgeTime: string;
        };
        section2: {
            title: string;
            desc: string;
            cta: string;
            features: string[];
        };
    };
}

export default function ContentSplit({ dict }: ContentSplitProps) {
    return (
        <section className="section">
            <div className="container">
                <div className="flex flex-col gap-32">

                    {/* Section 1: Text Left, Visual Right */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                    >
                        <div>
                            <h2 className="text-2xl md:text-4xl font-bold text-white mb-5 leading-tight">
                                {dict.section1.title}
                            </h2>
                            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
                                {dict.section1.desc}
                            </p>
                            <motion.a
                                href="https://g50f94ce30c3ffb-asklyze.adb.ca-toronto-1.oraclecloudapps.com/ords/r/asklyze_local/asklyze-customer-portal/login"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="btn-pill-white inline-flex"
                            >
                                {dict.section1.cta}
                                <span className="btn-icon">
                                    <ArrowUpRight size={14} />
                                </span>
                            </motion.a>
                        </div>

                        {/* Visual: Dashboard mockup with 32px radius */}
                        <div
                            className="p-6 relative overflow-hidden"
                            style={{
                                background: "rgba(5, 5, 10, 0.6)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "var(--card-radius)",
                            }}
                        >
                            <div className="flex gap-2 mb-4">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
                                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.10)" }} />
                                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.10)" }} />
                            </div>

                            <div className="space-y-3">
                                <div className="h-4 rounded-full" style={{ background: "rgba(255,255,255,0.08)", width: "40%" }} />
                                <div className="h-3 rounded-full" style={{ background: "rgba(255,255,255,0.05)", width: "80%" }} />
                                <div
                                    className="h-10 rounded-lg flex items-center px-4"
                                    style={{
                                        background: "rgba(59, 130, 246, 0.08)",
                                        border: "1px solid rgba(59, 130, 246, 0.15)",
                                    }}
                                >
                                    <div className="h-3 rounded-full" style={{ background: "rgba(255,255,255,0.15)", width: "60%" }} />
                                </div>
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-center gap-3 py-2">
                                        <div className="w-3 h-3 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
                                        <div className="h-3 rounded-full flex-1" style={{ background: "rgba(255,255,255,0.04)", width: `${60 + i * 5}%` }} />
                                    </div>
                                ))}
                            </div>

                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                className="absolute top-8 right-8 px-3 py-1.5 rounded-full text-xs font-semibold"
                                style={{
                                    background: "rgba(26, 210, 113, 0.1)",
                                    color: "#1ad271",
                                    border: "1px solid rgba(26, 210, 113, 0.2)",
                                }}
                            >
                                {dict.section1.badgeTitle} — {dict.section1.badgeTime}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Section 2: Visual Left, Text Right */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                    >
                        <div
                            className="p-8 relative overflow-hidden order-2 lg:order-1"
                            style={{
                                background: "rgba(5, 5, 10, 0.6)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "var(--card-radius)",
                                minHeight: "320px",
                            }}
                        >
                            <div className="flex items-center justify-center h-full">
                                <div className="grid grid-cols-3 gap-8 items-center">
                                    <div className="flex flex-col gap-4">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className="w-12 h-12 flex items-center justify-center"
                                                style={{
                                                    background: "rgba(255, 255, 255, 0.03)",
                                                    border: "1px solid rgba(255, 255, 255, 0.06)",
                                                    borderRadius: "12px",
                                                }}
                                            >
                                                <div className="w-3 h-3 rounded-full" style={{ background: `rgba(59, 130, 246, ${0.2 + i * 0.1})` }} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <div
                                            className="w-16 h-16 flex items-center justify-center"
                                            style={{
                                                background: "rgba(59, 130, 246, 0.08)",
                                                border: "1px solid rgba(59, 130, 246, 0.2)",
                                                borderRadius: "16px",
                                                boxShadow: "0 0 40px rgba(59, 130, 246, 0.1)",
                                            }}
                                        >
                                            <span style={{ color: "rgba(59, 130, 246, 0.8)", fontSize: "20px" }}>+</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className="w-12 h-12 flex items-center justify-center"
                                                style={{
                                                    background: "rgba(255, 255, 255, 0.03)",
                                                    border: "1px solid rgba(255, 255, 255, 0.06)",
                                                    borderRadius: "12px",
                                                }}
                                            >
                                                <div className="w-3 h-3 rounded-full" style={{ background: `rgba(255, 255, 255, ${0.05 + i * 0.05})` }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <h2 className="text-2xl md:text-4xl font-bold text-white mb-5 leading-tight">
                                {dict.section2.title}
                            </h2>
                            <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                                {dict.section2.desc}
                            </p>

                            <ul className="space-y-3 mb-8">
                                {dict.section2.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <div
                                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                            style={{ background: "rgba(255,255,255,0.1)" }}
                                        >
                                            <Check size={12} color="#ffffff" />
                                        </div>
                                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <motion.a
                                href="https://docs.asklyze.ai/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="btn-pill-white inline-flex"
                            >
                                {dict.section2.cta}
                                <span className="btn-icon">
                                    <ArrowUpRight size={14} />
                                </span>
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
