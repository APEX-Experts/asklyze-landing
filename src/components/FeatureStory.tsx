"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
    Database,
    Layers,
    Sparkles,
    BarChart3,
    Shield,
    Globe,
    MessageSquareText,
    Zap,
} from "lucide-react";

const steps = [
    {
        step: "01",
        title: "Whitelist",
        subtitle: "Define Your Scope",
        description:
            "Select tables and schemas for AI access. The system supports 1000+ tables with complex relationships.",
        icon: Database,
        color: "#6366F1",
    },
    {
        step: "02",
        title: "Build",
        subtitle: "Metadata Intelligence",
        description:
            "Automatic foreign key analysis and join optimization. Zero manual configuration required.",
        icon: Layers,
        color: "#818CF8",
    },
    {
        step: "03",
        title: "Describe",
        subtitle: "AI Documentation",
        description:
            "Generate intelligent descriptions for thousands of tables, providing business context beyond technical names.",
        icon: Sparkles,
        color: "#A5B4FC",
    },
];

const features = [
    {
        title: "Natural Language Queries",
        description: "Ask questions in Arabic or English. Our semantic engine understands regional business terminology.",
        icon: MessageSquareText,
        span: "col-span-6 lg:col-span-4",
    },
    {
        title: "22+ Visualization Types",
        description: "From combo charts to pivot tables with WebDataRocks integration.",
        icon: BarChart3,
        span: "col-span-6 lg:col-span-4",
    },
    {
        title: "Zero Data Movement",
        description: "Queries execute within your Oracle environment. Data never leaves your infrastructure.",
        icon: Shield,
        span: "col-span-6 lg:col-span-4",
    },
    {
        title: "Bilingual Support",
        description: "Full Arabic and English interface with RTL support for regional enterprises.",
        icon: Globe,
        span: "col-span-6 lg:col-span-6",
    },
    {
        title: "Instant Insights",
        description: "AI-powered result explanations transform charts into executive narratives.",
        icon: Zap,
        span: "col-span-6 lg:col-span-6",
    },
];

export default function FeatureStory() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={containerRef} className="section-spacing relative overflow-hidden">
            {/* Background mesh */}
            <div className="absolute inset-0 mesh-gradient-strong pointer-events-none opacity-50" />

            <div className="section-container relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mb-20"
                >
                    <span
                        className="text-sm uppercase tracking-widest mb-4 block"
                        style={{ color: "var(--color-accent)" }}
                    >
                        The 3-Step Setup
                    </span>
                    <h2 style={{ fontFamily: "var(--font-playfair), serif" }}>
                        From Schema to{" "}
                        <span style={{ color: "var(--color-accent)" }}>Insights</span>{" "}
                        in Minutes
                    </h2>
                    <p className="mt-6 max-w-2xl">
                        Our configuration wizard grounds AI in your actual data structure,
                        eliminating hallucinations and ensuring accurate query generation.
                    </p>
                </motion.div>

                {/* 3-Step Process Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-24">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.step}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            {/* Connection line */}
                            {i < steps.length - 1 && (
                                <div
                                    className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px"
                                    style={{ background: "var(--color-border)" }}
                                />
                            )}

                            <div
                                className="glass p-8 h-full transition-all duration-500 group-hover:shadow-xl"
                                style={{
                                    borderColor: "transparent",
                                }}
                            >
                                {/* Step number */}
                                <div
                                    className="text-6xl font-bold mb-6 opacity-10"
                                    style={{
                                        fontFamily: "var(--font-playfair), serif",
                                        color: step.color,
                                    }}
                                >
                                    {step.step}
                                </div>

                                {/* Icon */}
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                                    style={{ background: `${step.color}15` }}
                                >
                                    <step.icon size={28} color={step.color} />
                                </div>

                                {/* Content */}
                                <h3
                                    className="text-2xl mb-2"
                                    style={{ fontFamily: "var(--font-playfair), serif" }}
                                >
                                    {step.title}
                                </h3>
                                <p
                                    className="text-sm font-medium mb-4"
                                    style={{ color: step.color }}
                                >
                                    {step.subtitle}
                                </p>
                                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Feature Bento Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h3
                        className="text-2xl mb-8"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                        Built for Enterprise
                    </h3>

                    <div className="bento-grid">
                        {features.map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={`${feature.span} group`}
                            >
                                <div
                                    className="h-full p-6 lg:p-8 rounded-3xl border transition-all duration-300 hover:shadow-lg"
                                    style={{
                                        background: "var(--color-bg)",
                                        borderColor: "var(--color-border)",
                                    }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                                        style={{ background: "rgba(99, 102, 241, 0.08)" }}
                                    >
                                        <feature.icon size={24} style={{ color: "var(--color-accent)" }} />
                                    </div>
                                    <h4
                                        className="text-lg font-semibold mb-2"
                                        style={{ color: "var(--color-text)" }}
                                    >
                                        {feature.title}
                                    </h4>
                                    <p
                                        className="text-sm leading-relaxed"
                                        style={{ color: "var(--color-text-muted)" }}
                                    >
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Floating decoration */}
            <motion.div
                style={{ y }}
                className="absolute right-0 top-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 8, repeat: Infinity }}
            >
                <div
                    className="w-full h-full rounded-full"
                    style={{ background: "var(--color-accent)" }}
                />
            </motion.div>
        </section>
    );
}
