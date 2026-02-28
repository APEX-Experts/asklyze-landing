"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SceneCard from "./SceneCard";

/* ------------------------------------------------------------------ */
/*  Scene config per step                                              */
/* ------------------------------------------------------------------ */
const scenes = [
    { src: "/scene2-isolated.html", iframeWidth: 1000, iframeHeight: 700, title: "Select Tables" },
    { src: "/scene3-isolated.html", iframeWidth: 1000, iframeHeight: 700, title: "Build Metadata" },
    { src: "/scene4-isolated.html", iframeWidth: 1200, iframeHeight: 800, title: "AI Context" },
    { src: "/scene5-isolated.html", iframeWidth: 1200, iframeHeight: 800, title: "Generate Dashboard" },
];

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
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
        step4Title: string;
        step4Desc: string;
    };
}

export default function WorkingProcess({ dict }: WorkingProcessProps) {
    const steps = [
        { title: dict.step1Title, description: dict.step1Desc },
        { title: dict.step2Title, description: dict.step2Desc },
        { title: dict.step3Title, description: dict.step3Desc },
        { title: dict.step4Title, description: dict.step4Desc },
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
                        const scene = scenes[index];

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
                                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-5 leading-tight">
                                        {step.title}
                                    </h2>
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

                                {/* Visual Side — Scene Card */}
                                <div className={isReversed ? "lg:order-1" : "lg:order-2"}>
                                    <SceneCard
                                        src={scene.src}
                                        iframeWidth={scene.iframeWidth}
                                        iframeHeight={scene.iframeHeight}
                                        title={scene.title}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
