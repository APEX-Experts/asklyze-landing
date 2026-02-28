"use client";

import { motion, Variants } from "framer-motion";
import {
    Database,
    Layers,
    Sparkles,
    BarChart3,
    Shield,
    Globe,
} from "lucide-react";

interface FeatureGridProps {
    dict: {
        tag: string;
        title: string;
        desc: string;
        features: Array<{
            title: string;
            desc: string;
        }>;
    };
}

const icons = [Shield, Layers, Database, Globe, BarChart3, Sparkles];

export default function FeatureGrid({ dict }: FeatureGridProps) {
    // Show only first 3 features like Vexel's "All-in-one SaaS engine" section
    const topFeatures = dict.features.slice(0, 3).map((f, i) => ({
        ...f,
        icon: icons[i],
    }));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const
            },
        },
    };

    return (
        <section id="features" className="section">
            <div className="container">
                {/* Section Header - Centered, Vexel style */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-5">{dict.title}</h2>
                    <p className="text-base md:text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>{dict.desc}</p>
                </motion.div>

                {/* 3-Column Feature Cards — Tall, spacious like Vexel */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {topFeatures.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={itemVariants}
                            className="group transition-all duration-300"
                            style={{
                                background: "rgba(5, 5, 10, 0.6)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "var(--card-radius)",
                                padding: "48px 36px",
                                minHeight: "340px",
                                display: "flex",
                                flexDirection: "column" as const,
                            }}
                        >
                            {/* Large white circle icon — exactly like Vexel */}
                            <div
                                className="flex items-center justify-center mb-12"
                                style={{
                                    width: "64px",
                                    height: "64px",
                                    borderRadius: "50%",
                                    background: "#ffffff",
                                }}
                            >
                                <feature.icon size={28} color="#000000" />
                            </div>

                            <div className="mt-auto">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-sm leading-relaxed m-0" style={{ color: "rgba(255,255,255,0.55)" }}>
                                    {feature.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom 3 features in a second row */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
                >
                    {dict.features.slice(3).map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            variants={itemVariants}
                            className="group transition-all duration-300"
                            style={{
                                background: "rgba(5, 5, 10, 0.6)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "var(--card-radius)",
                                padding: "48px 36px",
                                minHeight: "340px",
                                display: "flex",
                                flexDirection: "column" as const,
                            }}
                        >
                            <div
                                className="flex items-center justify-center mb-12"
                                style={{
                                    width: "64px",
                                    height: "64px",
                                    borderRadius: "50%",
                                    background: "#ffffff",
                                }}
                            >
                                {(() => {
                                    const Icon = icons[i + 3];
                                    return <Icon size={28} color="#000000" />;
                                })()}
                            </div>

                            <div className="mt-auto">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-sm leading-relaxed m-0" style={{ color: "rgba(255,255,255,0.55)" }}>
                                    {feature.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
