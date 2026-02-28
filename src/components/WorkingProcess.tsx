"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

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
    };
}

const tableData = [
    { name: "EBA_COUNTRIES_V", desc: "Reference view of countries with identifiers and names.", tag: "MASTER DATA", delay: 0 },
    { name: "EBA_COUNTRY_REGIONS", desc: "Master list of regions used for regional analysis.", tag: "MASTER DATA", delay: 0.2 },
    { name: "EBA_COUNTRY_SUB_REGIONS", desc: "Detailed region mapping for finer-grained reporting.", tag: "MASTER DATA", delay: 0.4 },
    { name: "EBA_PROJECT_COMMENTS", desc: "Generated comments linked to projects and audit trails.", tag: "OPERATIONS", delay: 0.6 },
    { name: "EBA_PROJECT_MILESTONES", desc: "Milestone definitions including dates and descriptions.", tag: "OPERATIONS", delay: 0.8 },
    { name: "EBA_CUSTOMER_ORDERS", desc: "Fact table for customer orders and sales metrics.", tag: "FACT DATA", delay: 1.0 },
];

export default function WorkingProcess({ dict }: WorkingProcessProps) {
    const steps = [
        { title: dict.step1Title, description: dict.step1Desc },
        { title: dict.step2Title, description: dict.step2Desc },
        { title: dict.step3Title, description: dict.step3Desc },
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
                                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-5 leading-tight">
                                        {step.title}
                                    </h3>
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

                                {/* Visual Side — Bento Grid */}
                                <div className={isReversed ? "lg:order-1" : "lg:order-2"}>
                                    <div
                                        className="p-8 relative overflow-hidden flex flex-col justify-center"
                                        style={{
                                            background: "rgba(5, 5, 10, 0.6)",
                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                            borderRadius: "32px",
                                            minHeight: "360px",
                                        }}
                                    >
                                        {/* Center glow */}
                                        <div
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full pointer-events-none"
                                            style={{
                                                background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)",
                                            }}
                                        />

                                        {index === 0 ? (
                                            /* Whitelist Tables Animation - Full Replicated Scene */
                                            <div className="relative z-10 w-full h-full min-h-[460px] flex items-center justify-center -m-4 sm:m-0 scale-[0.8] sm:scale-100 origin-center">
                                                {/* Monitor Shell */}
                                                <div className="relative w-[480px] max-w-[120%]">
                                                    {/* Monitor Frame */}
                                                    <div
                                                        className="p-3 pb-4 rounded-[20px] shadow-2xl relative"
                                                        style={{
                                                            background: "linear-gradient(180deg, #1e2d46 0%, #17253d 100%)",
                                                            borderBottom: "4px solid #0f1624"
                                                        }}
                                                    >
                                                        {/* Monitor Screen */}
                                                        <div
                                                            className="rounded-xl overflow-hidden relative"
                                                            style={{
                                                                background: "#111d33",
                                                                border: "1px solid rgba(122, 151, 199, 0.32)",
                                                                height: "500px"
                                                            }}
                                                        >
                                                            {/* App Window */}
                                                            <div className="flex flex-col h-full bg-[#13233d]">
                                                                {/* Topbar */}
                                                                <div className="flex items-center justify-between px-4 h-12 border-b border-[#2d3b54] bg-[#0d1627]">
                                                                    <div className="flex items-center gap-2">
                                                                        <Image src="/logo-light.png" alt="Asklyze" width={20} height={20} className="opacity-80" />
                                                                        <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider">AI Data Configuration</span>
                                                                    </div>
                                                                    <div className="text-white/40 text-xs">✕</div>
                                                                </div>

                                                                {/* App Body */}
                                                                <div className="flex-1 p-5 bg-[#101d33] flex flex-col overflow-hidden relative">

                                                                    {/* Config Steps */}
                                                                    <div className="flex items-center gap-2 mb-6 text-[10px] font-bold tracking-wide uppercase">
                                                                        <span className="bg-[#3f46a2] text-white px-3 py-1.5 rounded border border-[#4d56bb]">1 Select Tables</span>
                                                                        <span className="bg-[#172744] text-[#b8ccea] px-3 py-1.5 rounded border border-[#7c9ac6]/30">2 Build Metadata</span>
                                                                        <span className="bg-[#172744] text-[#b8ccea] px-3 py-1.5 rounded border border-[#7c9ac6]/30">3 Complete</span>
                                                                    </div>

                                                                    {/* Query Pill */}
                                                                    <div className="bg-[#172744] border border-[#7c9ac6]/30 text-[#b8ccea] text-xs px-3 py-1.5 rounded-md inline-block mb-3 font-medium w-fit">
                                                                        Schema: CUSTOMER01 (15 tables)
                                                                    </div>

                                                                    {/* Filters */}
                                                                    <div className="flex gap-2 mb-4 text-[10px] font-bold uppercase">
                                                                        <span className="bg-[#172744] text-[#b8ccea] px-3 py-1 rounded border border-[#7c9ac6]/30">Recommended</span>
                                                                        <span className="bg-[#3f46a2] text-white px-3 py-1 rounded border border-[#4d56bb]">Selected (15/150)</span>
                                                                        <span className="bg-[#172744] text-[#b8ccea] px-3 py-1 rounded border border-[#7c9ac6]/30">All Tables</span>
                                                                    </div>

                                                                    {/* Animated Table Collector List */}
                                                                    <div className="flex flex-col gap-2 flex-1 relative z-10 h-[220px]">
                                                                        {tableData.map((table, i) => (
                                                                            <motion.div
                                                                                key={table.name}
                                                                                initial={{ opacity: 0, y: 15 }}
                                                                                whileInView={{ opacity: 1, y: 0 }}
                                                                                transition={{
                                                                                    duration: 0.5,
                                                                                    delay: table.delay,
                                                                                }}
                                                                                viewport={{ once: true }}
                                                                                className="flex items-center justify-between p-2.5 rounded-lg border"
                                                                                style={{
                                                                                    background: "#1a2b48",
                                                                                    borderColor: "rgba(121, 146, 192, 0.56)",
                                                                                }}
                                                                            >
                                                                                <div className="flex items-center gap-3">
                                                                                    {/* Toggle Pill */}
                                                                                    <div className="w-8 h-4 bg-[#5a67d2] rounded-full relative">
                                                                                        <div className="absolute right-[2px] top-[2px] w-3 h-3 bg-white rounded-full"></div>
                                                                                    </div>

                                                                                    <div>
                                                                                        <div className="text-[11px] font-bold text-[#e4eeff] mb-0.5">{table.name}</div>
                                                                                        <div className="text-[9px] text-[#a8bedf] truncate w-[200px]">{table.desc}</div>
                                                                                    </div>
                                                                                </div>

                                                                                {/* Tag */}
                                                                                <div className="text-[8px] font-bold bg-[#223452] text-[#d2dff6] px-2 py-1 rounded uppercase tracking-wider whitespace-nowrap">
                                                                                    {table.tag}
                                                                                </div>
                                                                            </motion.div>
                                                                        ))}
                                                                        {/* Fade overlay for bottom of list */}
                                                                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#101d33] to-transparent pointer-events-none z-20"></div>
                                                                    </div>

                                                                    {/* Footer */}
                                                                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#2d3b54] bg-[#101d33] flex justify-end z-30">
                                                                        <span className="text-[10px] font-bold px-3 py-1.5 rounded bg-[#1d3f3a] text-[#8bf0c0]">
                                                                            15 tables ready for AI
                                                                        </span>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Stand */}
                                                    <div className="w-16 h-8 bg-[#1e2d46] mx-auto relative -mt-1 -z-10 rounded-b-lg"></div>
                                                    <div className="w-32 h-2 bg-[#17253d] mx-auto rounded-full mt-1"></div>
                                                </div>
                                            </div>
                                        ) : (
                                            /* Placeholder 3x3 bento grid for other steps */
                                            <div className="grid grid-cols-3 gap-3 h-full relative z-10 w-full max-w-xs mx-auto aspect-square">
                                                {Array.from({ length: 9 }).map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="transition-all duration-500"
                                                        style={{
                                                            background: i === 4
                                                                ? "rgba(59, 130, 246, 0.08)"
                                                                : "rgba(255, 255, 255, 0.02)",
                                                            border: i === 4
                                                                ? "1px solid rgba(59, 130, 246, 0.2)"
                                                                : "1px solid rgba(255, 255, 255, 0.04)",
                                                            borderRadius: "16px",
                                                            aspectRatio: "1",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        {i === 4 && (
                                                            <div style={{
                                                                width: "24px",
                                                                height: "24px",
                                                                borderRadius: "8px",
                                                                background: "rgba(59, 130, 246, 0.3)",
                                                                border: "1px solid rgba(59, 130, 246, 0.4)",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                color: "rgba(59, 130, 246, 0.8)",
                                                                fontSize: "14px",
                                                            }}>
                                                                +
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
