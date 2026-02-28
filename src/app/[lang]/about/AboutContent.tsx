/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Sparkles, Users, Globe, Building2, Target, LineChart } from "lucide-react";

const iconMap = {
    Shield,
    Sparkles,
    Users,
    Globe,
    Building2,
    Target,
    LineChart,
} as const;

/* ── Shared inline-style constants (matching landing page exactly) ── */
const CARD_BG = "rgba(5, 5, 10, 0.6)";
const CARD_BORDER = "1px solid rgba(255, 255, 255, 0.1)";
const CARD_BORDER_COLOR = "rgba(255, 255, 255, 0.1)";
const CARD_RADIUS = "var(--card-radius)"; // 32px
const TEXT_SECONDARY = "rgba(255,255,255,0.55)";
const TEXT_BODY = "rgba(255,255,255,0.7)";
const TEXT_MUTED = "rgba(255,255,255,0.4)";
const BLUE_ACCENT = "#3b82f6";

interface AboutContentProps {
    lang: "en" | "ar";
    isArabic: boolean;
    content: any;
}

export default function AboutContent({ lang, isArabic, content }: AboutContentProps) {
    const textAlign = isArabic ? "text-right" : "text-left";
    const alignItems = isArabic ? "items-end" : "items-start";
    const founderName = content?.founder?.name ?? "";
    const founderInitials = founderName.replace(/[^\p{L}]/gu, "").slice(0, 2) || "AE";
    const founderImage = content?.founder?.image;

    return (
        <>
            {/* Hero */}
            <section className="relative pt-40 pb-20 overflow-hidden" style={{ background: "#000" }}>
                <div className="container max-w-6xl mx-auto px-4 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`max-w-3xl ${textAlign}`}
                    >
                        <span
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-8"
                            style={{
                                background: "rgba(255, 255, 255, 0.05)",
                                color: "rgba(255, 255, 255, 0.8)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                        >
                            {content.hero.badge}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight" style={{ letterSpacing: "-0.03em" }}>
                            {content.hero.title}{" "}
                            <span style={{ color: "#ff705a" }}>{content.hero.titleHighlight}</span>
                        </h1>
                        <p className="text-base md:text-lg max-w-xl mb-4" style={{ color: TEXT_SECONDARY }}>
                            {content.hero.subtitle}
                        </p>
                        <p className="text-sm max-w-2xl" style={{ color: TEXT_MUTED }}>
                            {content.hero.intro}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto md:mx-0">
                        {content.hero.highlights.map((item: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                style={{
                                    background: CARD_BG,
                                    border: CARD_BORDER,
                                    borderRadius: CARD_RADIUS,
                                    padding: "36px 28px",
                                }}
                            >
                                <div className="text-3xl font-extrabold text-white mb-2">{item.value}</div>
                                <div className="text-sm font-semibold uppercase tracking-wider" style={{ color: TEXT_MUTED }}>{item.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Blue glow (matches landing page) */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                        width: "800px",
                        height: "600px",
                        background: "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 60%)",
                    }}
                />
            </section>

            {/* About / Company */}
            <section className="section" style={{ background: "#000" }}>
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className={textAlign}
                        >
                            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">{content.about.title}</h2>
                            <p className="text-xl text-white font-semibold mb-4 leading-relaxed">{content.about.subtitle}</p>
                            <p className="text-lg mb-8 leading-relaxed" style={{ color: TEXT_SECONDARY }}>{content.about.description}</p>
                            <ul className={`space-y-4 ${textAlign}`}>
                                {content.about.bullets.map((item: string, index: number) => (
                                    <li key={index} className={`flex gap-3 ${alignItems}`}>
                                        <span className="mt-[2px] shrink-0" style={{ color: BLUE_ACCENT }}>•</span>
                                        <span style={{ color: TEXT_BODY }}>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            style={{
                                background: CARD_BG,
                                border: CARD_BORDER,
                                borderRadius: CARD_RADIUS,
                                padding: "48px 36px",
                            }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#ffffff" }}>
                                    <Building2 size={24} style={{ color: "#000000" }} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">{content.about.card.title}</h3>
                            </div>
                            <p className="text-lg mb-8" style={{ color: TEXT_SECONDARY }}>{content.about.card.description}</p>
                            <div className="space-y-4">
                                {content.about.card.points.map((point: string, index: number) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <span className="mt-[2px] shrink-0" style={{ color: BLUE_ACCENT }}>•</span>
                                        <span className="leading-relaxed" style={{ color: TEXT_BODY }}>{point}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section" style={{ background: "#000" }}>
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            style={{
                                background: CARD_BG,
                                border: CARD_BORDER,
                                borderRadius: CARD_RADIUS,
                                padding: "48px 36px",
                            }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#ffffff" }}>
                                    <Target size={24} style={{ color: "#000000" }} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">{content.mission.title}</h3>
                            </div>
                            <p className="text-lg leading-relaxed" style={{ color: TEXT_SECONDARY }}>{content.mission.description}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            style={{
                                background: CARD_BG,
                                border: CARD_BORDER,
                                borderRadius: CARD_RADIUS,
                                padding: "48px 36px",
                            }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#ffffff" }}>
                                    <LineChart size={24} style={{ color: "#000000" }} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">{content.vision.title}</h3>
                            </div>
                            <p className="text-lg leading-relaxed" style={{ color: TEXT_SECONDARY }}>{content.vision.description}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section" style={{ background: "#000" }}>
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{content.values.title}</h2>
                        <p className="text-lg max-w-2xl mx-auto" style={{ color: TEXT_SECONDARY }}>{content.values.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.values.items.map((item: any, index: number) => {
                            const Icon = iconMap[item.iconKey as keyof typeof iconMap];
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    style={{
                                        background: CARD_BG,
                                        border: CARD_BORDER,
                                        borderRadius: CARD_RADIUS,
                                        padding: "48px 36px",
                                        minHeight: "280px",
                                    }}
                                >
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-10" style={{ background: "#ffffff" }}>
                                        {Icon ? <Icon size={24} style={{ color: "#000000" }} /> : null}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="leading-relaxed" style={{ color: TEXT_SECONDARY }}>{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="section pb-32" style={{ background: "#000" }}>
                <div className="container max-w-6xl mx-auto px-4">
                    {/* Founder & Leaders Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                        {/* Founder Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            style={{
                                background: CARD_BG,
                                border: CARD_BORDER,
                                borderRadius: CARD_RADIUS,
                                padding: "48px 36px",
                            }}
                        >
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 text-center sm:text-left">
                                <div
                                    className={`w-32 h-32 md:w-36 md:h-36 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0 ${founderImage ? "overflow-hidden bg-gray-100" : ""}`}
                                    style={founderImage ? { border: CARD_BORDER } : { background: "#ffffff" }}
                                >
                                    {founderImage ? (
                                        <Image
                                            src={founderImage}
                                            alt={founderName || "Founder portrait"}
                                            width={144}
                                            height={144}
                                            className="w-full h-full object-cover"
                                            style={{ imageRendering: 'auto' }}
                                            quality={100}
                                            priority
                                            unoptimized
                                        />
                                    ) : (
                                        <span className="text-black text-3xl font-bold">{founderInitials}</span>
                                    )}
                                </div>
                                <div className="sm:mt-4">
                                    <div className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: TEXT_MUTED }}>{content.founder.tag}</div>
                                    <h3 className="text-3xl font-extrabold text-white mb-2">{content.founder.name}</h3>
                                    <p className="text-lg" style={{ color: TEXT_SECONDARY }}>{content.founder.role}</p>
                                </div>
                            </div>
                            <p className="text-lg mb-6 leading-relaxed pt-8" style={{ color: TEXT_BODY, borderTop: "1px solid rgba(255,255,255,0.05)" }}>{content.founder.bio}</p>
                            {content.founder.note ? (
                                <p className="text-sm italic" style={{ color: TEXT_MUTED }}>{content.founder.note}</p>
                            ) : null}
                        </motion.div>

                        {/* Leadership Block */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className={textAlign}
                        >
                            <h2 className="text-4xl font-extrabold text-white mb-4">{content.team.title}</h2>
                            <p className="text-lg mb-10" style={{ color: TEXT_SECONDARY }}>{content.team.description}</p>

                            {/* Leaders Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {content.team.members.map((member: any, index: number) => {
                                    const memberName = member?.name ?? "";
                                    const memberInitials = memberName.replace(/[^\p{L}]/gu, "").slice(0, 2) || "AE";
                                    const memberImage = member?.image;
                                    return (
                                        <div
                                            key={index}
                                            className="text-center"
                                            style={{
                                                background: CARD_BG,
                                                border: CARD_BORDER,
                                                borderRadius: CARD_RADIUS,
                                                padding: "36px 24px",
                                            }}
                                        >
                                            <div
                                                className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-sm ${memberImage ? "overflow-hidden bg-gray-100" : "font-bold text-xl"}`}
                                                style={memberImage ? { border: CARD_BORDER } : { background: "#ffffff", color: "#000000" }}
                                            >
                                                {memberImage ? (
                                                    <Image
                                                        src={memberImage}
                                                        alt={memberName || "Team member portrait"}
                                                        width={96}
                                                        height={96}
                                                        className="w-full h-full object-cover"
                                                        quality={90}
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <span>{memberInitials}</span>
                                                )}
                                            </div>
                                            <h4 className="text-lg font-bold text-white">{memberName}</h4>
                                            <p className="text-sm mb-3" style={{ color: TEXT_MUTED }}>{member.role}</p>
                                            {member.bio ? (
                                                <p className="text-xs leading-relaxed" style={{ color: TEXT_MUTED }}>{member.bio}</p>
                                            ) : null}
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* Employees Row (Aligned with Leaders column) */}
                    {content.team.employees && (
                        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="hidden lg:block"></div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                            >
                                {content.team.employees.map((employee: any, index: number) => {
                                    const employeeName = employee?.name ?? "";
                                    const employeeInitials = employeeName.replace(/[^\p{L}]/gu, "").slice(0, 2) || "AE";
                                    const employeeImage = employee?.image;
                                    return (
                                        <div
                                            key={index}
                                            className="text-center h-full"
                                            style={{
                                                background: CARD_BG,
                                                border: CARD_BORDER,
                                                borderRadius: CARD_RADIUS,
                                                padding: "36px 24px",
                                            }}
                                        >
                                            <div
                                                className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-sm ${employeeImage ? "overflow-hidden bg-gray-100" : "font-bold text-xl"}`}
                                                style={employeeImage ? { border: CARD_BORDER } : { background: "#ffffff", color: "#000000" }}
                                            >
                                                {employeeImage ? (
                                                    <Image
                                                        src={employeeImage}
                                                        alt={employeeName || "Team member portrait"}
                                                        width={96}
                                                        height={96}
                                                        className="w-full h-full object-cover"
                                                        quality={90}
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <span>{employeeInitials}</span>
                                                )}
                                            </div>
                                            <h4 className="text-lg font-bold text-white">{employeeName}</h4>
                                            <p className="text-sm" style={{ color: TEXT_MUTED }}>{employee.role}</p>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-20 overflow-hidden" style={{ background: "#000" }}>
                <div className="container max-w-5xl mx-auto px-4 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="rounded-[2rem] text-center p-12 md:p-20 shadow-2xl overflow-hidden relative"
                        style={{ background: "#ff705a" }}
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" style={{ background: "#ff8a78" }} />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/40 blur-2xl rounded-full translate-y-1/2 -translate-x-1/2" />

                        <h2 className="relative z-10 !text-white text-3xl md:text-5xl font-extrabold mb-6 leading-tight">{content.cta.title}</h2>
                        <p className="relative z-10 !text-white/90 max-w-2xl mx-auto mb-10 text-lg md:text-xl leading-relaxed">{content.cta.description}</p>

                        <div className="relative z-10">
                            <a
                                href={`/${lang}/contact`}
                                className="inline-flex items-center gap-2 font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                style={{ background: "#ffffff", color: "#000000" }}
                            >
                                {content.cta.button}
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
