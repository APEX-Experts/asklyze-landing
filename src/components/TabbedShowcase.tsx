"use client";

import { motion } from "framer-motion";

interface TabbedShowcaseProps {
    dict: {
        tag: string;
        title: string;
        tabs: string[];
        dashboard: string;
    };
}

export default function TabbedShowcase({ dict }: TabbedShowcaseProps) {
    const cards = dict.tabs.map((tab, i) => ({
        title: tab,
        icon: ["⚙️", "✦", "📊", "🔒"][i] || "✦",
    }));

    return (
        <section className="section">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <p className="text-sm uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {dict.tag}
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold">{dict.title}</h2>
                </motion.div>

                {/* 2x2 Bento Grid — 32px radius */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
                >
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-10 relative overflow-hidden group transition-all duration-300"
                            style={{
                                background: "rgba(5, 5, 10, 0.6)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "var(--card-radius)",
                                minHeight: "260px",
                            }}
                        >
                            {/* Decorative Visual */}
                            <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-30">
                                {index === 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="grid grid-cols-3 gap-2 p-4">
                                            {Array.from({ length: 9 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-6 h-6"
                                                    style={{
                                                        background: "rgba(255,255,255,0.04)",
                                                        border: "1px solid rgba(255,255,255,0.06)",
                                                        borderRadius: "6px",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {index === 1 && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="absolute w-2 h-2 rounded-full"
                                                style={{
                                                    background: "rgba(59, 130, 246, 0.4)",
                                                    top: `${20 + i * 15}%`,
                                                    left: `${30 + i * 10}%`,
                                                    boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)",
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                                {index === 2 && (
                                    <div className="absolute inset-0 flex items-end justify-center pb-8 gap-2 px-4">
                                        {[40, 60, 30, 80, 50, 70].map((h, i) => (
                                            <div
                                                key={i}
                                                className="w-4 rounded-t"
                                                style={{
                                                    height: `${h}%`,
                                                    background: `rgba(59, 130, 246, ${0.1 + i * 0.05})`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                                {index === 3 && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div
                                            className="w-16 h-16"
                                            style={{
                                                background: "rgba(59, 130, 246, 0.06)",
                                                border: "1px solid rgba(59, 130, 246, 0.15)",
                                                borderRadius: "16px",
                                                boxShadow: "0 0 40px rgba(59, 130, 246, 0.08)",
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="relative z-10">
                                <div className="text-2xl mb-5">{card.icon}</div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{card.title}</h3>
                                <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                                    {dict.dashboard}
                                </p>
                            </div>

                            {/* Hover glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: "radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.05) 0%, transparent 60%)",
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
