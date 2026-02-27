"use client";

import { motion } from "framer-motion";
import { Database, Search, LineChart, LucideIcon } from "lucide-react";
import OptimizedVideo from "./OptimizedVideo";
import { ReactNode } from "react";

interface Step {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
    bg: string;
    image: string;
    video?: string;
    iframeSrc?: string;
    customVisual?: ReactNode;
}

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
    }
}

export default function WorkingProcess({ dict }: WorkingProcessProps) {
    const steps: Step[] = [
        {
            icon: Database,
            title: dict.step1Title,
            description: dict.step1Desc,
            color: "var(--color-heading)",
            bg: "var(--color-bg-accent)",
            image: "/illustrations/data.svg",
            customVisual: (
                <div style={{ position: "relative", paddingTop: "71.61803713527851%", width: "100%" }}>
                    <iframe
                        src="https://customer-nd6eq88q2tb3xwgl.cloudflarestream.com/d328e3583b683475127136da529109f8/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-nd6eq88q2tb3xwgl.cloudflarestream.com%2Fd328e3583b683475127136da529109f8%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                        loading="lazy"
                        style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowFullScreen={true}
                    />
                </div>
            )
        },
        {
            icon: Search,
            title: dict.step2Title,
            description: dict.step2Desc,
            color: "var(--color-heading)",
            bg: "var(--color-bg-accent)",
            image: "/illustrations/search.svg",
            customVisual: (
                <div style={{ position: "relative", paddingTop: "71.61803713527851%", width: "100%" }}>
                    <iframe
                        src="https://customer-nd6eq88q2tb3xwgl.cloudflarestream.com/53c62775896cab1b4dab846ba1427656/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-nd6eq88q2tb3xwgl.cloudflarestream.com%2F53c62775896cab1b4dab846ba1427656%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                        loading="lazy"
                        style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowFullScreen={true}
                    />
                </div>
            )
        },
        {
            icon: LineChart,
            title: dict.step3Title,
            description: dict.step3Desc,
            color: "var(--color-heading)",
            bg: "var(--color-bg-accent)",
            image: "/illustrations/charts.svg",
            customVisual: (
                <div style={{ position: "relative", paddingTop: "71.61803713527851%", width: "100%" }}>
                    <iframe
                        src="https://customer-nd6eq88q2tb3xwgl.cloudflarestream.com/158f53e6bb68c978945f6106ee7c0db4/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-nd6eq88q2tb3xwgl.cloudflarestream.com%2F158f53e6bb68c978945f6106ee7c0db4%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                        loading="lazy"
                        style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowFullScreen={true}
                    />
                </div>
            )
        }
    ];

    return (
        <section className="section bg-[var(--color-bg-alt)] py-24 border-b border-[var(--color-border)] relative overflow-hidden" id="process">
            {/* x.ai warm atmospheric top glow */}
            <div className="absolute inset-0 pointer-events-none select-none z-0">
                {/* Left corner warm reddish glow */}
                <div className="absolute top-0 left-0 w-[50%] h-[300px]"
                    style={{
                        background: 'radial-gradient(ellipse 80% 80% at 0% 0%, rgba(180,83,9,0.12) 0%, rgba(120,53,5,0.06) 40%, transparent 70%)',
                    }}
                />
                {/* Right corner warm reddish glow */}
                <div className="absolute top-0 right-0 w-[50%] h-[300px]"
                    style={{
                        background: 'radial-gradient(ellipse 80% 80% at 100% 0%, rgba(180,83,9,0.10) 0%, rgba(120,53,5,0.05) 40%, transparent 70%)',
                    }}
                />
                {/* Center top subtle amber line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px]"
                    style={{
                        background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(251,146,60,0.06) 0%, transparent 60%)',
                    }}
                />
            </div>
            <div className="container max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-xs font-bold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block">
                        {dict.title}
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-[var(--color-heading)]">
                        {dict.subtitle}
                    </h2>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {steps.map((step, index) => {
                        const hasCustom = "customVisual" in step && step.customVisual;

                        return (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="flex flex-col text-center"
                            >
                                {/* Media Container */}
                                <div className="mb-8 relative w-full rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)] overflow-hidden bg-[var(--color-bg-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300 group">
                                    {hasCustom && step.customVisual}
                                    {/* Subtle overlay on hover */}
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                </div>

                                {/* Text Content */}
                                <div className="px-2">
                                    <h3 className="mb-3 font-bold text-lg text-[var(--color-heading)]">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm font-medium text-[var(--color-body-secondary)] leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
