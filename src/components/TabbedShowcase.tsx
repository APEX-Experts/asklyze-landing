"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import OptimizedVideo from "./OptimizedVideo";

interface TabbedShowcaseProps {
    dict: {
        tag: string;
        title: string;
        tabs: string[];
        dashboard: string;
    };
}

export default function TabbedShowcase({ dict }: TabbedShowcaseProps) {
    const [activeTab, setActiveTab] = useState(0);
    const [progress, setProgress] = useState(0);

    // Auto-transition through tabs with progress
    useEffect(() => {
        const duration = 6550; // 6.55 seconds matching video length approx
        const startTime = Date.now();

        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);
        }, 50);

        const tabInterval = setTimeout(() => {
            setActiveTab((prev) => (prev + 1) % dict.tabs.length);
        }, duration);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(tabInterval);
        };
    }, [activeTab, dict.tabs.length]);

    const descriptions = [
        "Ask questions in natural language",
        "Structured tables ready to scan and export",
        "Instant charts and dashboards for insights",
        "Fully explainable and auditable queries"
    ];

    return (
        <section className="section bg-[var(--color-bg)] py-24">
            <div className="container max-w-6xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-heading)] mb-4">
                        {dict.title}
                    </h2>
                    <p className="text-lg text-[var(--color-body)] max-w-3xl mx-auto">
                        ASKLYZE doesn't lock you into a single output. Every question can evolve into
                        reports, dashboards, charts, or SQL — instantly and transparently.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Visual Content - Right side on desktop, top on mobile */}
                    <div className="lg:col-span-8 order-1 lg:order-2">
                        <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 md:p-8 shadow-xl border border-[var(--color-border)] h-full min-h-[400px] flex flex-col justify-center">
                            <h3 className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-6">Same Question. Different Outputs.</h3>

                            {/* Content Container based on tab */}
                            <div className="w-full rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-alt)]">
                                {activeTab === 0 ? (
                                    <div style={{ position: "relative", paddingTop: "56.25%" }}>
                                        <iframe
                                            src="https://customer-nd6eq88q2tb3xwgl.cloudflarestream.com/55692ccda3764ca9a68525d86e504c15/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-nd6eq88q2tb3xwgl.cloudflarestream.com%2F55692ccda3764ca9a68525d86e504c15%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                                            loading="lazy"
                                            className="absolute top-0 left-0 w-full h-full"
                                            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                            allowFullScreen={true}
                                        />
                                    </div>
                                ) : activeTab === 1 ? (
                                    <div style={{ position: "relative", paddingTop: "56.25%" }}>
                                        <iframe
                                            src="https://customer-nd6eq88q2tb3xwgl.cloudflarestream.com/ff634d10d51fdb3d2eeec7f75049fab2/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-nd6eq88q2tb3xwgl.cloudflarestream.com%2Fff634d10d51fdb3d2eeec7f75049fab2%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                                            loading="lazy"
                                            className="absolute top-0 left-0 w-full h-full"
                                            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                            allowFullScreen={true}
                                        />
                                    </div>
                                ) : activeTab === 2 ? (
                                    <div style={{ position: "relative", paddingTop: "56.25%" }}>
                                        <iframe
                                            src="https://customer-nd6eq88q2tb3xwgl.cloudflarestream.com/6751079fa304be597c3140e0ed900d9a/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-nd6eq88q2tb3xwgl.cloudflarestream.com%2F6751079fa304be597c3140e0ed900d9a%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                                            loading="lazy"
                                            className="absolute top-0 left-0 w-full h-full"
                                            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                            allowFullScreen={true}
                                        />
                                    </div>
                                ) : activeTab === 3 ? (
                                    <div style={{ position: "relative", paddingTop: "56.25%" }}>
                                        <iframe
                                            src="https://customer-nd6eq88q2tb3xwgl.cloudflarestream.com/4f369287d11d183bea5af749e15f7e9a/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-nd6eq88q2tb3xwgl.cloudflarestream.com%2F4f369287d11d183bea5af749e15f7e9a%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                                            loading="lazy"
                                            className="absolute top-0 left-0 w-full h-full"
                                            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                            allowFullScreen={true}
                                        />
                                    </div>
                                ) : null}
                            </div>
                            <div className="text-center mt-4 text-xs italic text-[var(--color-body-muted)]">
                                No SQL required. No training needed.
                            </div>
                        </div>
                    </div>

                    {/* Vertical Tabs - Left side on desktop, bottom on mobile */}
                    <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col gap-4">
                        {dict.tabs.map((tab, i) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(i)}
                                className={`text-left p-6 rounded-xl transition-all duration-300 relative overflow-hidden group border ${activeTab === i
                                    ? "bg-[var(--color-bg-card)] border-transparent shadow-xl ring-1 ring-[var(--color-primary-light)]"
                                    : "bg-[var(--color-bg-alt)] border-transparent hover:border-[var(--color-border)] shadow-sm"
                                    }`}
                            >
                                <div className="flex items-start gap-3 relative z-10">
                                    <div className={`w-2 h-2 rounded-full mt-2 transition-colors ${activeTab === i ? 'bg-[var(--color-primary)]' : 'bg-gray-300'}`} />
                                    <div>
                                        <h4 className={`text-base font-extrabold uppercase tracking-wide transition-colors ${activeTab === i ? 'text-[var(--color-heading)]' : 'text-[var(--color-body-secondary)]'}`}>
                                            {tab}
                                        </h4>
                                        <p className="text-sm text-[var(--color-body-muted)] mt-1 font-medium">
                                            {descriptions[i] || "Experience seamless interactions"}
                                        </p>
                                    </div>
                                </div>
                                {/* Progress bar background logic */}
                                {activeTab === i && (
                                    <div
                                        className="absolute left-0 bottom-0 h-1 bg-[var(--color-primary)] opacity-20 transition-all duration-100 ease-linear"
                                        style={{ width: `${progress}%` }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
