"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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


    return (
        <section className="relative pt-[100px] pb-[200px] overflow-hidden">
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

                {/* Custom Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {dict.tabs.map((tab, i) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(i)}
                            className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === i
                                ? "bg-white text-[#ff6a88] shadow-lg scale-105"
                                : "bg-white/20 text-white hover:bg-white/30"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Overlapping Dashboard (The prominent visual) */}
                <motion.div
                    key={activeTab} // Animate on tab change
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative max-w-5xl mx-auto rounded-xl shadow-2xl overflow-hidden bg-white -mb-[150px]"
                >
                    {/* Dashboard Header Mockup */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
                        <div className="flex items-center gap-4">
                            <div className="font-bold text-gray-800 text-lg">R.</div>
                            <div className="text-sm font-medium text-gray-500">{dict.dashboard}</div>
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
                                <video
                                    src="https://pub-676e1cb87e8247329da59049363213c6.r2.dev/first1.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    className="w-full h-full max-h-[500px] object-cover"
                                    playsInline
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ) : activeTab === 1 ? (
                            <div className="w-full h-full bg-black">
                                <video
                                    src="https://pub-676e1cb87e8247329da59049363213c6.r2.dev/step2.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    className="w-full h-full max-h-[500px] object-cover"
                                    playsInline
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ) : activeTab === 2 ? (
                            <div className="w-full h-full bg-black">
                                <video
                                    src="https://pub-676e1cb87e8247329da59049363213c6.r2.dev/step3.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    className="w-full h-full max-h-[500px] object-cover"
                                    playsInline
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ) : activeTab === 3 ? (
                            <div className="w-full h-full bg-black">
                                <video
                                    src="https://pub-676e1cb87e8247329da59049363213c6.r2.dev/step4.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    className="w-full h-full max-h-[500px] object-cover"
                                    playsInline
                                >
                                    Your browser does not support the video tag.
                                </video>
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

