"use client";

import { motion } from "framer-motion";
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
            <section className="hero-gradient pt-40 pb-32 relative">
                <div className="container relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`max-w-3xl ${textAlign}`}
                    >
                        <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-white/20 text-white">
                            {content.hero.badge}
                        </span>
                        <h1 className="!text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            {content.hero.title}{" "}
                            <span className="text-white/90">{content.hero.titleHighlight}</span>
                        </h1>
                        <p className="!text-white/90 text-lg md:text-xl max-w-2xl">
                            {content.hero.subtitle}
                        </p>
                        <p className="!text-white/70 text-sm mt-4 max-w-2xl">
                            {content.hero.intro}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                        {content.hero.highlights.map((item: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="bg-white/15 border border-white/20 rounded-2xl p-5 text-white"
                            >
                                <div className="text-2xl font-bold mb-1">{item.value}</div>
                                <div className="text-sm text-white/80">{item.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Decorative shapes */}
                <div className="absolute top-20 right-10 w-20 h-20 rounded-full bg-white/10 animate-float" />
                <div className="absolute bottom-40 right-1/4 w-32 h-32 rounded-full bg-white/5 animate-float" style={{ animationDelay: "1s" }} />
                <div className="absolute top-1/3 right-20 w-16 h-16 rounded-full border-2 border-white/20 animate-float" style={{ animationDelay: "0.5s" }} />
            </section>

            {/* About / Company */}
            <section className="section bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className={textAlign}
                        >
                            <span className="section-tag">{content.about.tag}</span>
                            <h2 className="mb-4">{content.about.title}</h2>
                            <p className="text-lg text-[#2c234d] font-semibold mb-4">{content.about.subtitle}</p>
                            <p className="text-gray-600 mb-6">{content.about.description}</p>
                            <ul className={`space-y-3 ${textAlign}`}>
                                {content.about.bullets.map((item: string, index: number) => (
                                    <li key={index} className={`flex gap-3 ${alignItems}`}>
                                        <span className="text-[#ff705a] font-bold">•</span>
                                        <span className="text-gray-600">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-50 rounded-3xl p-8 shadow-lg border border-gray-100"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff705a] to-[#ff9472] flex items-center justify-center">
                                    <Building2 size={22} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-[#2c234d]">{content.about.card.title}</h3>
                            </div>
                            <p className="text-gray-600 mb-6">{content.about.card.description}</p>
                            <div className="space-y-3">
                                {content.about.card.points.map((point: string, index: number) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <span className="text-[#ff705a] font-bold">•</span>
                                        <span className="text-gray-600">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section bg-gray-50">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-[#ffece8] flex items-center justify-center">
                                    <Target size={22} className="text-[#ff705a]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#2c234d]">{content.mission.title}</h3>
                            </div>
                            <p className="text-gray-600">{content.mission.description}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-[#ededff] flex items-center justify-center">
                                    <LineChart size={22} className="text-[#5e63ff]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#2c234d]">{content.vision.title}</h3>
                            </div>
                            <p className="text-gray-600">{content.vision.description}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section bg-white">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">{content.values.tag}</span>
                        <h2>{content.values.title}</h2>
                        <p>{content.values.subtitle}</p>
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
                                    className="bg-gray-50 rounded-2xl p-6 shadow-md border border-gray-100"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow mb-4">
                                        {Icon ? <Icon size={22} className="text-[#ff705a]" /> : null}
                                    </div>
                                    <h3 className="text-lg font-bold text-[#2c234d] mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Founder */}
            <section className="section bg-gray-50">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div
                                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                                        founderImage
                                            ? "overflow-hidden bg-gray-100"
                                            : "bg-gradient-to-br from-[#ff705a] to-[#ff9472]"
                                    }`}
                                >
                                    {founderImage ? (
                                        <img
                                            src={founderImage}
                                            alt={founderName || "Founder portrait"}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <span className="text-white text-xl font-bold">{founderInitials}</span>
                                    )}
                                </div>
                                <div>
                                    <div className="text-sm uppercase tracking-widest text-[#ff705a] mb-1">{content.founder.tag}</div>
                                    <h3 className="text-2xl font-bold text-[#2c234d]">{content.founder.name}</h3>
                                    <p className="text-sm text-gray-500">{content.founder.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">{content.founder.bio}</p>
                            {content.founder.note ? (
                                <p className="text-xs text-gray-400">{content.founder.note}</p>
                            ) : null}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className={textAlign}
                        >
                            <span className="section-tag">{content.team.tag}</span>
                            <h2 className="mb-4">{content.team.title}</h2>
                            <p className="text-gray-600 mb-6">{content.team.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {content.team.members.map((member: any, index: number) => (
                                    <div key={index} className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
                                        <div className="w-12 h-12 rounded-full bg-[#ffece8] text-[#ff705a] flex items-center justify-center font-bold mb-3">
                                            {member.name?.replace(/[^\p{L}]/gu, "").slice(0, 2) || "AE"}
                                        </div>
                                        <h4 className="text-lg font-bold text-[#2c234d]">{member.name}</h4>
                                        <p className="text-xs text-gray-500 mb-2">{member.role}</p>
                                        <p className="text-sm text-gray-600">{member.bio}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container">
                    <div className="bg-gradient-to-br from-[#ff705a] to-[#ff9472] rounded-3xl p-10 md:p-14 text-white text-center shadow-xl">
                        <h2 className="!text-white text-3xl md:text-4xl font-bold mb-4">{content.cta.title}</h2>
                        <p className="text-white max-w-2xl mx-auto mb-8">{content.cta.description}</p>
                        <a
                            href={`/${lang}/contact`}
                            className="btn btn-white inline-flex"
                        >
                            {content.cta.button}
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
