"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ContentSplitProps {
    dict: {
        section1: {
            title: string;
            desc: string;
            cta: string;
            badgeTitle: string;
            badgeTime: string;
        };
        section2: {
            title: string;
            desc: string;
            cta: string;
            features: string[];
        };
    };
}

export default function ContentSplit({ dict }: ContentSplitProps) {
    return (
        <>
            {/* Section 1: AI SQL (Image Left) */}
            <section className="section section-alt overflow-hidden">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Visual - Dashboard Mockup */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                                <video
                                    src="https://pub-676e1cb87e8247329da59049363213c6.r2.dev/plugin.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-auto"
                                />
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <Check size={20} className="text-green-500" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-800">{dict.section1.badgeTitle}</div>
                                    <div className="text-xs text-gray-500">{dict.section1.badgeTime}</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="mb-6">{dict.section1.title}</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                {dict.section1.desc}
                            </p>

                            <a href="#demo" className="btn btn-primary bg-[#ff705a] border-[#ff705a] text-white hover:bg-[#ff8a78] hover:border-[#ff8a78]">
                                {dict.section1.cta}
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 2: Security (Image Right) */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <h2 className="mb-6">{dict.section2.title}</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                {dict.section2.desc}
                            </p>

                            <ul className="space-y-4 mb-8">
                                {dict.section2.features.map(item => (
                                    <li key={item} className="flex items-center gap-3">
                                        <Check size={20} className="text-red-500" />
                                        <span className="font-medium text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <a href="#security" className="btn btn-outline border-[#ff705a] text-[#ff705a] hover:bg-[#ff705a] hover:text-white">
                                {dict.section2.cta}
                            </a>
                        </motion.div>

                        {/* Visual */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2"
                        >
                            <div className="relative">
                                {/* Background Decorative Blob */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full opacity-50 -z-10" />

                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                                    <video
                                        src="https://pub-676e1cb87e8247329da59049363213c6.r2.dev/ReportBuilder.mp4"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}

