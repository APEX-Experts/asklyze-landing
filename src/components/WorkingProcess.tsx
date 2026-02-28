"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
                                    {index === 0 ? (
                                        /* Verbatim Scene 2 (Select Tables) via iframe, without the outer styling card container */
                                        <div className="relative z-10 w-full flex items-center justify-center overflow-visible">
                                            <iframe
                                                src="/scene2-isolated.html"
                                                className="w-[120%] max-w-[900px] h-[700px] border-0 outline-none select-none pointer-events-none sm:-ml-[10%]"
                                                style={{ background: 'transparent' }}
                                                title="Asklyze Workflow Scene 2"
                                            />
                                        </div>
                                    ) : (
                                        /* Card container for placeholder bento steps */
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

                                            {/* Placeholder 3x3 bento grid for other steps */}
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
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
