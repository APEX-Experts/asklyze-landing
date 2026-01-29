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
        const duration = 6550; // 7seconds
        const startTime = Date.now();

        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);
        }, 50); // Update every 50ms for smooth animation

        const tabInterval = setTimeout(() => {
            setActiveTab((prev) => (prev + 1) % dict.tabs.length);
        }, duration);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(tabInterval);
        };
    }, [activeTab, dict.tabs.length]);


    return (
        <section className="relative pt-[60px] md:pt-[100px] pb-[120px] md:pb-[200px] overflow-hidden">
            {/* Orange Gradient Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "linear-gradient(135deg, #ff9a8b 0%, #ff6a88 55%, #ff99ac 100%)",
                }}
            />

            {/* Content Container */}
            <div className="container relative z-10 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="text-sm font-bold uppercase tracking-widest mb-4 opacity-90">{dict.tag}</div>
                    <h2 className="!text-white text-4xl mb-12 font-bold max-w-2xl mx-auto">
                        {dict.title}
                    </h2>
                </motion.div>

                {/* Custom Tabs with Progress Bars */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {dict.tabs.map((tab, i) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(i)}
                            className={`relative px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 overflow-hidden ${activeTab === i
                                ? "bg-white text-[#ff6a88] shadow-lg scale-105"
                                : "bg-white/20 text-white hover:bg-white/30"
                                }`}
                        >
                            {/* Progress bar background */}
                            {activeTab === i && (
                                <div
                                    className="absolute bottom-0 left-0 h-1 bg-[#ff6a88] transition-all duration-100 ease-linear"
                                    style={{ width: `${progress}%` }}
                                />
                            )}
                            <span className="relative z-10">{tab}</span>
                        </button>
                    ))}
                </div>

                {/* Overlapping Dashboard (The prominent visual) */}
                <motion.div
                    key={activeTab} // Animate on tab change
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative max-w-5xl mx-auto rounded-xl shadow-2xl overflow-hidden bg-white -mb-[100px] md:-mb-[150px] mx-4 md:mx-auto"
                >
                    {/* Dashboard Header Mockup */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
                        <div className="flex items-center gap-4">
                            <div className="font-bold text-gray-800 text-lg">ASKLYZE</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                    </div>

                    {/* Dashboard Body Mockup - Changing content based on tab */}
                    <div className="bg-gray-50 min-h-[400px]">
                        {activeTab === 0 ? (
                            <div className="w-full h-full bg-black">
                                <div style={{ position: "relative", paddingTop: "71.76079734219269%" }}>
                                    <iframe
                                        src="https://customer-nd6eq88q2tb3xwgl.cloudflarestream.com/55692ccda3764ca9a68525d86e504c15/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-nd6eq88q2tb3xwgl.cloudflarestream.com%2F55692ccda3764ca9a68525d86e504c15%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                                        loading="lazy"
                                        style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                        allowFullScreen={true}
                                    />
                                </div>
                            </div>
                        ) : activeTab === 1 ? (
                            <div className="w-full h-full bg-black">
                                <div style={{ position: "relative", paddingTop: "71.76079734219269%" }}>
                                    <iframe
                                        src="https://customer-nd6eq88q2tb3xwgl.cloudflarestream.com/ff634d10d51fdb3d2eeec7f75049fab2/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-nd6eq88q2tb3xwgl.cloudflarestream.com%2Fff634d10d51fdb3d2eeec7f75049fab2%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                                        loading="lazy"
                                        style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                        allowFullScreen={true}
                                    />
                                </div>
                            </div>
                        ) : activeTab === 2 ? (
                            <div className="w-full h-full bg-black">
                                <div style={{ position: "relative", paddingTop: "71.76079734219269%" }}>
                                    <iframe
                                        src="https://customer-nd6eq88q2tb3xwgl.cloudflarestream.com/6751079fa304be597c3140e0ed900d9a/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-nd6eq88q2tb3xwgl.cloudflarestream.com%2F6751079fa304be597c3140e0ed900d9a%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                                        loading="lazy"
                                        style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                        allowFullScreen={true}
                                    />
                                </div>
                            </div>
                        ) : activeTab === 3 ? (
                            <div className="w-full h-full bg-black">
                                <div style={{ position: "relative", paddingTop: "71.80851063829788%" }}>
                                    <iframe
                                        src="https://customer-nd6eq88q2tb3xwgl.cloudflarestream.com/4f369287d11d183bea5af749e15f7e9a/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-nd6eq88q2tb3xwgl.cloudflarestream.com%2F4f369287d11d183bea5af749e15f7e9a%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                                        loading="lazy"
                                        style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                        allowFullScreen={true}
                                    />
                                </div>
                            </div>
                        ) : null}
                    </div>
                </motion.div>
            </div>

            {/* Spacer to push next content down due to negative margin */}
            <div className="h-24"></div>
        </section>
    );
}

