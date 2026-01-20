"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";

const features = [
    "Natural Language to SQL Engine",
    "22+ Interactive Visualization Types",
    "Full Arabic & English Support (RTL)",
    "Oracle 19c & 23ai Compatible",
    "Zero Data Movement Architecture",
    "Row-Level Security (VPD Support)",
    "AI-Powered Result Explanations",
    "WebDataRocks Pivot Integration",
    "Complete Audit Trail & Logging",
    "On-Premise & Cloud Deployment",
];

export default function PowerCard() {
    return (
        <section className="section-spacing">
            <div className="section-container">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span
                        className="text-sm uppercase tracking-widest mb-4 block"
                        style={{ color: "var(--color-accent)" }}
                    >
                        Simple Pricing
                    </span>
                    <h2 style={{ fontFamily: "var(--font-playfair), serif" }}>
                        One Powerful{" "}
                        <span style={{ color: "var(--color-accent)" }}>Solution</span>
                    </h2>
                    <p className="mt-4">
                        No confusing tiers. Everything you need to transform your Oracle
                        APEX into an AI-powered analytics center.
                    </p>
                </motion.div>

                {/* Single Power Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="relative">
                        {/* Background glow */}
                        <div
                            className="absolute inset-0 blur-3xl opacity-15 rounded-[40px]"
                            style={{ background: "var(--color-accent)" }}
                        />

                        {/* Main card */}
                        <div
                            className="relative glass overflow-hidden"
                            style={{ borderRadius: "32px" }}
                        >
                            {/* Mesh gradient overlay */}
                            <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none" />

                            <div className="relative p-8 lg:p-12">
                                {/* Badge */}
                                <div className="flex justify-between items-start mb-8">
                                    <div
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                                        style={{
                                            background: "rgba(99, 102, 241, 0.1)",
                                            color: "var(--color-accent)",
                                        }}
                                    >
                                        <Sparkles size={16} />
                                        Enterprise License
                                    </div>
                                    <div className="text-right">
                                        <div
                                            className="text-sm line-through opacity-50"
                                            style={{ color: "var(--color-text-muted)" }}
                                        >
                                            Custom Quote
                                        </div>
                                        <div className="flex items-baseline gap-1">
                                            <span
                                                className="text-4xl lg:text-5xl font-bold"
                                                style={{ fontFamily: "var(--font-playfair), serif" }}
                                            >
                                                Contact
                                            </span>
                                            <span
                                                className="text-sm"
                                                style={{ color: "var(--color-text-muted)" }}
                                            >
                                                for pricing
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Value proposition */}
                                <div className="mb-10">
                                    <h3
                                        className="text-2xl lg:text-3xl mb-4"
                                        style={{ fontFamily: "var(--font-playfair), serif" }}
                                    >
                                        Transform Oracle APEX into Your AI Analytics Hub
                                    </h3>
                                    <p
                                        className="text-lg leading-relaxed"
                                        style={{ color: "var(--color-text-muted)" }}
                                    >
                                        Complete solution for enterprise data democratization.
                                        Deploy on-premise or cloud with full data sovereignty.
                                    </p>
                                </div>

                                {/* Features grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                    {features.map((feature, i) => (
                                        <motion.div
                                            key={feature}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: i * 0.05 }}
                                            viewport={{ once: true }}
                                            className="flex items-center gap-3"
                                        >
                                            <div
                                                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                                                style={{ background: "rgba(99, 102, 241, 0.1)" }}
                                            >
                                                <Check size={14} style={{ color: "var(--color-accent)" }} />
                                            </div>
                                            <span className="text-sm" style={{ color: "var(--color-text)" }}>
                                                {feature}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="btn-primary flex-1 py-5"
                                        style={{
                                            background: "var(--color-accent)",
                                            fontSize: "1.125rem",
                                        }}
                                    >
                                        Request Demo
                                        <ArrowRight size={20} />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="btn-secondary flex-1 py-5"
                                        style={{ fontSize: "1.125rem" }}
                                    >
                                        Download Whitepaper
                                    </motion.button>
                                </div>
                            </div>

                            {/* Bottom accent line */}
                            <div
                                className="h-1"
                                style={{
                                    background: "linear-gradient(90deg, var(--color-accent), var(--color-accent-light))",
                                }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Trust statement */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-8 text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                >
                    Backed by Apex Experts • Oracle Partner • Enterprise Support Included
                </motion.p>
            </div>
        </section>
    );
}
