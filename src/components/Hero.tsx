"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

import { useState } from "react";
import VideoModal from "./VideoModal";

interface HeroProps {
    dict: {
        badge: string;
        titleBeforeSpan: string;
        titleSpan: string;
        description: string;
        getStarted: string;
        watchDemo: string;
        statTables: string;
        statCharts: string;
        statResponse: string;
        cardQuerySuccess: string;
        cardResponseTime: string;
        cardDataSovereignty: string;
    }
}

export default function Hero({ dict }: HeroProps) {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    return (
        <section className="hero-gradient" style={{ minHeight: "100vh", paddingTop: "120px" }}>
            <div className="w-full max-w-[95rem] mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style={{ minHeight: "calc(100vh - 120px)" }}>
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
                            style={{ background: "rgba(255, 255, 255, 0.2)", color: "white" }}
                        >
                            {dict.badge}
                        </motion.span>

                        <h1 style={{ color: "white", marginBottom: "24px", fontSize: "3.5rem", lineHeight: 1.1 }}>
                            {dict.titleBeforeSpan} <br />
                            <span style={{ color: "#ffffff", fontWeight: "800", textShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
                                {dict.titleSpan}
                            </span>
                        </h1>

                        <p
                            style={{
                                color: "rgba(255, 255, 255, 0.9)",
                                fontSize: "20px",
                                maxWidth: "560px",
                                marginBottom: "32px",
                                lineHeight: "1.6",
                            }}
                        >
                            {dict.description}
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <motion.a
                                href="#pricing"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-white"
                            >
                                {dict.getStarted}
                                <ArrowRight size={18} />
                            </motion.a>
                            <motion.button
                                onClick={() => setIsVideoModalOpen(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn"
                                style={{
                                    background: "transparent",
                                    border: "2px solid rgba(255, 255, 255, 0.3)",
                                    color: "white",
                                    cursor: "pointer"
                                }}
                            >
                                <Play size={18} />
                                {dict.watchDemo}
                            </motion.button>
                        </div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="flex gap-8 mt-12"
                        >
                            {[
                                { value: "1000+", label: dict.statTables },
                                { value: "22+", label: dict.statCharts },
                                { value: "<2s", label: dict.statResponse },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <div
                                        className="text-3xl font-bold"
                                        style={{ color: "white" }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "14px" }}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Laptop Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="relative"
                    >
                        {/* Laptop Frame */}
                        <div>
                            <div
                                className="relative mx-auto"
                                style={{
                                    maxWidth: "100%",
                                    background: "#252525",
                                    borderRadius: "20px",
                                    padding: "15px 15px 0",
                                    boxShadow: "0 50px 100px rgba(0, 0, 0, 0.3)",
                                }}
                            >
                                {/* Screen Top Bar */}
                                <div className="flex gap-2 mb-3">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>

                                {/* Screen Content - Video */}
                                <div
                                    className="rounded-t-lg overflow-hidden relative"
                                    style={{ background: "#000", aspectRatio: "16/10" }}
                                >
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover"
                                        poster="https://placehold.co/800x500/1a1a1a/FFF?text=Hero+Video+Placeholder"
                                    >
                                        <source src="https://pub-676e1cb87e8247329da59049363213c6.r2.dev/ReportBuilder.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>

                                    {/* Overlay Gradient for integration */}
                                    <div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }}
                                    />


                                </div>

                                {/* Laptop Base */}
                                <div
                                    style={{
                                        height: "20px",
                                        background: "#1a1a1a",
                                        borderRadius: "0 0 10px 10px",
                                        margin: "0 -15px",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Floating elements */}
                        <motion.div
                            className="absolute -left-8 top-1/3 hidden lg:block"
                            style={{
                                background: "white",
                                borderRadius: "12px",
                                padding: "16px 20px",
                                boxShadow: "var(--shadow-card)",
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center"
                                    style={{ background: "rgba(26, 210, 113, 0.1)" }}
                                >
                                    <span style={{ color: "var(--color-green)", fontSize: "20px" }}>✓</span>
                                </div>
                                <div>
                                    <div className="text-sm font-semibold" style={{ color: "var(--color-heading)" }}>
                                        {dict.cardQuerySuccess}
                                    </div>
                                    <div className="text-xs" style={{ color: "var(--color-body-light)" }}>
                                        {dict.cardResponseTime}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="absolute -right-4 bottom-1/4 hidden lg:block"
                            style={{
                                background: "white",
                                borderRadius: "12px",
                                padding: "16px 20px",
                                boxShadow: "var(--shadow-card)",
                            }}
                        >
                            <div className="text-2xl font-bold" style={{ color: "var(--color-blue)" }}>
                                100%
                            </div>
                            <div className="text-xs" style={{ color: "var(--color-body-light)" }}>
                                {dict.cardDataSovereignty}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Background Blobs */}
            <div
                className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                }}
            />

            <VideoModal
                isOpen={isVideoModalOpen}
                onClose={() => setIsVideoModalOpen(false)}
                videoSrc="https://pub-676e1cb87e8247329da59049363213c6.r2.dev/ASKLYZE-Intelligent_APEX_Analytics_2026_en.mp4"
            />
        </section>
    );
}
