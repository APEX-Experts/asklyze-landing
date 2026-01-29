"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import OptimizedVideo from "./OptimizedVideo";

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
                                <div style={{ position: "relative", paddingTop: "71.61803713527851%", width: "100%" }}>
                                    <iframe
                                        src="https://customer-nd6eq88q2tb3xwgl.cloudflarestream.com/e418d6024c5dd8bea1835b3465095b66/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-nd6eq88q2tb3xwgl.cloudflarestream.com%2Fe418d6024c5dd8bea1835b3465095b66%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                                        loading="lazy"
                                        style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                        allowFullScreen={true}
                                    />
                                </div>
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

                            <a
                                href="https://g64534a1113c35c-asklyze.adb.me-riyadh-1.oraclecloudapps.com/ords/r/asklyze_cloud/asklyze-demo/login"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary bg-[#ff705a] border-[#ff705a] text-white hover:bg-[#ff8a78] hover:border-[#ff8a78]"
                            >
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

                            <a
                                href="https://docs.asklyze.ai/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline border-[#ff705a] text-[#ff705a] hover:bg-[#ff705a] hover:text-white"
                            >
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
                                    <div style={{ position: "relative", paddingTop: "69.23076923076923%" }}>
                                        <iframe
                                            src="https://customer-nd6eq88q2tb3xwgl.cloudflarestream.com/378b5ca68239fdd874e339fb1475cf30/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-nd6eq88q2tb3xwgl.cloudflarestream.com%2F378b5ca68239fdd874e339fb1475cf30%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                                            loading="lazy"
                                            style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                                            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                            allowFullScreen={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}

