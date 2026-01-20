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

const icons = [Database, Layers, Shield, Globe, BarChart3, Sparkles];
const colors = [
    { color: "#ff705a", bgColor: "rgba(255, 112, 90, 0.1)" },
    { color: "#5e63ff", bgColor: "rgba(94, 99, 255, 0.1)" },
    { color: "#1ad271", bgColor: "rgba(26, 210, 113, 0.1)" },
    { color: "#f39c12", bgColor: "rgba(243, 156, 18, 0.1)" },
    { color: "#9b59b6", bgColor: "rgba(155, 89, 182, 0.1)" },
    { color: "#00cec9", bgColor: "rgba(0, 206, 201, 0.1)" },
];

export default function FeatureGrid({ dict }: FeatureGridProps) {
    const combinedFeatures = dict.features.map((f, i) => ({
        ...f,
        icon: icons[i],
        ...colors[i]
    }));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut" as const
            },
        },
    };

    return (
        <section id="features" className="section section-alt">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="section-header"
                >
                    <span className="section-tag">{dict.tag}</span>
                    <h2>{dict.title}</h2>
                    <p>{dict.desc}</p>
                </motion.div>

                {/* Feature Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {combinedFeatures.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={itemVariants}
                            className="feature-card"
                        >
                            <div
                                className="feature-icon"
                                style={{ background: feature.bgColor }}
                            >
                                <feature.icon size={36} color={feature.color} />
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
