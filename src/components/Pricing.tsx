"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

interface PricingProps {
    dict: {
        tag: string;
        title: string;
        desc: string;
        cta: string;
        recommended: string;
        trustNote: string;
        plans: Array<{
            name: string;
            price: string;
            period: string;
            desc: string;
            cta?: string;
            href?: string;
            features: string[];
        }>;
    };
    lang?: string;
}

function genSectionParticles() {
    return Array.from({ length: 20 }).map(() => ({
        width: `${(1 + Math.random() * 2).toFixed(2)}px`,
        height: `${(1 + Math.random() * 2).toFixed(2)}px`,
        background: `rgba(59, 130, 246, ${(0.2 + Math.random() * 0.3).toFixed(3)})`,
        top: `${(Math.random() * 60).toFixed(2)}%`,
        right: `${(Math.random() * 40).toFixed(2)}%`,
        boxShadow: `0 0 ${(3 + Math.random() * 6).toFixed(2)}px rgba(59, 130, 246, 0.3)`,
    }));
}

function genCardParticles() {
    return Array.from({ length: 15 }).map(() => ({
        width: `${(1 + Math.random() * 2).toFixed(2)}px`,
        height: `${(1 + Math.random() * 2).toFixed(2)}px`,
        background: `rgba(59, 130, 246, ${(0.2 + Math.random() * 0.4).toFixed(3)})`,
        top: `${(Math.random() * 80).toFixed(2)}%`,
        right: `${(Math.random() * 80).toFixed(2)}%`,
        boxShadow: `0 0 ${(2 + Math.random() * 5).toFixed(2)}px rgba(59, 130, 246, 0.3)`,
    }));
}

export default function Pricing({ dict, lang = "en" }: PricingProps) {
    const [sectionParts, setSectionParts] = useState<React.CSSProperties[]>([]);
    const [cardParts, setCardParts] = useState<React.CSSProperties[][]>([[], []]);

    useEffect(() => {
        setSectionParts(genSectionParticles());
        setCardParts([genCardParticles(), genCardParticles()]);
    }, []);

    return (
        <section id="pricing" className="section relative overflow-hidden">
            {/* Blue particle streaks in background (top right) */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none z-0">
                <div
                    className="absolute top-0 right-0"
                    style={{
                        width: "500px",
                        height: "500px",
                        background: "radial-gradient(ellipse at 100% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 60%)",
                    }}
                />
                {/* Particle streaks */}
                {sectionParts.map((p, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={p}
                    />
                ))}
            </div>

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-5">{dict.title}</h2>
                    <p className="text-base md:text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>{dict.desc}</p>
                </motion.div>

                {/* 3-Column Pricing Cards — Vexel exact style */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {dict.plans.map((plan, index) => {
                        const isPro = index === 1;
                        const isEnterprise = index === 2;
                        const hasParticles = isPro || isEnterprise;
                        const particleIdx = isPro ? 0 : 1;

                        return (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className="relative overflow-hidden transition-all duration-300"
                                style={{
                                    background: "rgba(5, 5, 10, 0.8)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    borderRadius: "var(--card-radius)",
                                    padding: "48px 36px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                {/* Pro card: Blue glow from top — matches Vexel exactly */}
                                {isPro && (
                                    <div
                                        className="absolute pointer-events-none"
                                        style={{
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: "200px",
                                            background: "#0083FF",
                                            filter: "blur(116px)",
                                            opacity: 0.35,
                                        }}
                                    />
                                )}

                                {/* Blue particle effect on Pro/Enterprise cards (top right) */}
                                {hasParticles && (
                                    <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none">
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "-20px",
                                                right: "-20px",
                                                width: "200px",
                                                height: "200px",
                                                background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 60%)",
                                            }}
                                        />
                                        {cardParts[particleIdx]?.map((p, i) => (
                                            <div
                                                key={i}
                                                className="absolute rounded-full"
                                                style={p}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Plan Name — Bold, large */}
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    {plan.name}
                                </h3>
                                <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
                                    {plan.desc}
                                </p>

                                {/* Price — Very large */}
                                <div className="mb-10">
                                    <span className="text-4xl md:text-5xl font-bold text-white" style={{ letterSpacing: "-0.03em" }}>
                                        {plan.price}
                                    </span>
                                    {plan.period && (
                                        <span className="text-base" style={{ color: "rgba(255,255,255,0.4)" }}>
                                            {plan.period}
                                        </span>
                                    )}
                                </div>

                                {/* Features — Blue sparkle icons like Vexel */}
                                <ul className="space-y-4 mb-10 flex-1" style={{ textAlign: lang === "ar" ? "right" : "left" }}>
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <Sparkles size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#3b82f6" }} />
                                            <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button — White pill with black circle arrow (exactly like Vexel) */}
                                <motion.a
                                    href={plan.href || "https://g64534a1113c35c-asklyze.adb.me-riyadh-1.oraclecloudapps.com/ords/r/asklyze_cloud/asklyze-customer-portal/login"}
                                    target={plan.href?.startsWith("/") ? "_self" : "_blank"}
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="btn-pill-white w-full justify-center"
                                >
                                    {plan.cta || dict.cta}
                                    <span className="btn-icon">
                                        <ArrowUpRight size={14} />
                                    </span>
                                </motion.a>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Trust Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-10 text-sm"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                >
                    {dict.trustNote}
                </motion.p>
            </div>
        </section>
    );
}
