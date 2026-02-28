"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Database } from "lucide-react";

interface WorkingProcessProps {
    dict: {
        title: string;
        subtitle: string;
        step1Title: string;
        step1Desc: string;
        step2Title: string;
        step2Desc: string;
        step3Title: string;
        step3Desc: string;
    };
}

const tableData = [
    { name: "EBA_COUNTRIES", tag: "MASTER", delay: 0 },
    { name: "CUSTOMER_ORDERS", tag: "FACTS", delay: 0.2 },
    { name: "PROJECT_MILESTONES", tag: "OPERATIONS", delay: 0.4 },
    { name: "SYSTEM_LOGS", tag: "SYSTEM", delay: 0.6, unselected: true },
];

export default function WorkingProcess({ dict }: WorkingProcessProps) {
    const steps = [
        { title: dict.step1Title, description: dict.step1Desc },
        { title: dict.step2Title, description: dict.step2Desc },
        { title: dict.step3Title, description: dict.step3Desc },
    ];

    return (
        <section className="section">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 max-w-3xl mx-auto"
                >
                    <p className="text-sm uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>{dict.title}</p>
                    <h2 className="text-3xl md:text-5xl font-bold">{dict.subtitle}</h2>
                </motion.div>

                {/* Alternating Bento-Style Sections */}
                <div className="flex flex-col gap-32">
                    {steps.map((step, index) => {
                        const isReversed = index % 2 !== 0;
                        return (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                            >
                                {/* Text Side */}
                                <div className={isReversed ? "lg:order-2" : "lg:order-1"}>
                                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-5 leading-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
                                        {step.description}
                                    </p>
                                    <motion.a
                                        href="https://docs.asklyze.ai/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="btn-pill-white inline-flex"
                                    >
                                        Try It Now
                                        <span className="btn-icon">
                                            <ArrowUpRight size={14} />
                                        </span>
                                    </motion.a>
                                </div>

                                {/* Visual Side — Bento Grid */}
                                <div className={isReversed ? "lg:order-1" : "lg:order-2"}>
                                    <div
                                        className="p-8 relative overflow-hidden flex flex-col justify-center"
                                        style={{
                                            background: "rgba(5, 5, 10, 0.6)",
                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                            borderRadius: "32px",
                                            minHeight: "360px",
                                        }}
                                    >
                                        {/* Center glow */}
                                        <div
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full pointer-events-none"
                                            style={{
                                                background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)",
                                            }}
                                        />

                                        {index === 0 ? (
                                            /* Whitelist Tables Animation */
                                            <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col gap-3">
                                                <div className="flex justify-between items-end mb-2 px-1">
                                                    <div>
                                                        <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Schema</div>
                                                        <div className="text-sm font-semibold text-white/80">CUSTOMER01</div>
                                                    </div>
                                                    <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">3 Selected</span>
                                                </div>

                                                {tableData.map((table) => (
                                                    <motion.div
                                                        key={table.name}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.5, delay: table.delay }}
                                                        viewport={{ once: true }}
                                                        className="flex items-center justify-between p-4 rounded-2xl border transition-all duration-500"
                                                        style={{
                                                            background: table.unselected ? "rgba(255,255,255,0.02)" : "rgba(59, 130, 246, 0.08)",
                                                            borderColor: table.unselected ? "rgba(255,255,255,0.05)" : "rgba(59, 130, 246, 0.3)",
                                                        }}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${table.unselected ? 'bg-white/5' : 'bg-blue-500/20'}`}>
                                                                <Database size={14} className={table.unselected ? 'text-white/40' : 'text-blue-400'} />
                                                            </div>
                                                            <div>
                                                                <div className={`text-sm font-bold ${table.unselected ? 'text-white/60' : 'text-white'}`}>{table.name}</div>
                                                                <div className="text-[10px] uppercase tracking-wider text-white/40 mt-0.5">{table.tag}</div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {table.unselected ? (
                                                                <div className="w-5 h-5 rounded-full border border-white/20" />
                                                            ) : (
                                                                <motion.div
                                                                    initial={{ scale: 0 }}
                                                                    whileInView={{ scale: 1 }}
                                                                    transition={{ type: "spring", delay: table.delay + 0.3 }}
                                                                    viewport={{ once: true }}
                                                                >
                                                                    <CheckCircle2 size={20} className="text-blue-500" />
                                                                </motion.div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        ) : (
                                            /* Placeholder 3x3 bento grid for other steps */
                                            <div className="grid grid-cols-3 gap-3 h-full relative z-10 w-full max-w-xs mx-auto aspect-square">
                                                {Array.from({ length: 9 }).map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="transition-all duration-500"
                                                        style={{
                                                            background: i === 4
                                                                ? "rgba(59, 130, 246, 0.08)"
                                                                : "rgba(255, 255, 255, 0.02)",
                                                            border: i === 4
                                                                ? "1px solid rgba(59, 130, 246, 0.2)"
                                                                : "1px solid rgba(255, 255, 255, 0.04)",
                                                            borderRadius: "16px",
                                                            aspectRatio: "1",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        {i === 4 && (
                                                            <div style={{
                                                                width: "24px",
                                                                height: "24px",
                                                                borderRadius: "8px",
                                                                background: "rgba(59, 130, 246, 0.3)",
                                                                border: "1px solid rgba(59, 130, 246, 0.4)",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                color: "rgba(59, 130, 246, 0.8)",
                                                                fontSize: "14px",
                                                            }}>
                                                                +
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
