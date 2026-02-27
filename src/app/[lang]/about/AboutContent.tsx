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
            <section className="relative pt-40 pb-20 bg-[var(--color-bg)] overflow-hidden">
                <div className="container max-w-6xl mx-auto px-4 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`max-w-3xl ${textAlign}`}
                    >
                        <span className="text-xs font-bold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-6 block">
                            {content.hero.badge}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--color-heading)] mb-6 leading-tight">
                            {content.hero.title}{" "}
                            <span className="text-[var(--color-primary)]">{content.hero.titleHighlight}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--color-body-secondary)] max-w-xl font-medium mb-4">
                            {content.hero.subtitle}
                        </p>
                        <p className="text-sm text-[var(--color-body-muted)] max-w-2xl">
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
                                className="bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow rounded-2xl p-6"
                            >
                                <div className="text-3xl font-extrabold text-[var(--color-primary)] mb-2">{item.value}</div>
                                <div className="text-sm font-semibold text-[var(--color-body-secondary)] uppercase tracking-wider">{item.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Subtle Decorative Elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-primary-light)] opacity-20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            </section>

            {/* About / Company */}
            <section className="section bg-[var(--color-bg)] border-b border-[var(--color-border)]">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className={textAlign}
                        >
                            <span className="text-xs font-bold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block">
                                {content.about.tag}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-heading)] mb-6">{content.about.title}</h2>
                            <p className="text-xl text-[var(--color-heading)] font-semibold mb-4 leading-relaxed">{content.about.subtitle}</p>
                            <p className="text-lg text-[var(--color-body-secondary)] mb-8 leading-relaxed font-medium">{content.about.description}</p>
                            <ul className={`space-y-4 ${textAlign}`}>
                                {content.about.bullets.map((item: string, index: number) => (
                                    <li key={index} className={`flex gap-3 ${alignItems}`}>
                                        <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                                        <span className="text-[var(--color-body)] font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-[var(--color-bg-alt)] rounded-[2rem] p-10 shadow-sm border border-[var(--color-border)] relative"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)] opacity-5 blur-3xl rounded-full pointer-events-none" />
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)] flex items-center justify-center shadow-md">
                                    <Building2 size={24} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-[var(--color-heading)]">{content.about.card.title}</h3>
                            </div>
                            <p className="text-lg text-[var(--color-body-secondary)] mb-8 font-medium relative z-10">{content.about.card.description}</p>
                            <div className="space-y-4 relative z-10">
                                {content.about.card.points.map((point: string, index: number) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                                        <span className="text-[var(--color-body)] font-medium leading-relaxed">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section bg-[var(--color-bg)] border-b border-[var(--color-border)]">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-[var(--color-bg-card)] rounded-[2rem] p-10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow border border-[var(--color-border)]"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-[var(--color-bg-accent)] flex items-center justify-center">
                                    <Target size={24} className="text-[var(--color-primary)]" />
                                </div>
                                <h3 className="text-2xl font-bold text-[var(--color-heading)]">{content.mission.title}</h3>
                            </div>
                            <p className="text-lg text-[var(--color-body-secondary)] font-medium leading-relaxed">{content.mission.description}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-[var(--color-bg-card)] rounded-[2rem] p-10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow border border-[var(--color-border)]"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-[var(--color-bg-accent)] flex items-center justify-center">
                                    <LineChart size={24} className="text-[var(--color-primary)]" />
                                </div>
                                <h3 className="text-2xl font-bold text-[var(--color-heading)]">{content.vision.title}</h3>
                            </div>
                            <p className="text-lg text-[var(--color-body-secondary)] font-medium leading-relaxed">{content.vision.description}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section bg-[var(--color-bg)] border-b border-[var(--color-border)]">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block">
                            {content.values.tag}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-heading)] mb-4">{content.values.title}</h2>
                        <p className="text-lg text-[var(--color-body-secondary)] font-medium max-w-2xl mx-auto">{content.values.subtitle}</p>
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
                                    className="bg-[var(--color-bg-card)] rounded-2xl p-8 border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-[var(--color-bg-accent)] flex items-center justify-center border border-[var(--color-border)] shadow-sm mb-6">
                                        {Icon ? <Icon size={24} className="text-[var(--color-primary)]" /> : null}
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--color-heading)] mb-3">{item.title}</h3>
                                    <p className="text-[var(--color-body-secondary)] font-medium leading-relaxed">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="section bg-[var(--color-bg)] pb-32">
                <div className="container max-w-6xl mx-auto px-4">
                    {/* Founder & Leaders Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                        {/* Founder Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-[var(--color-bg-card)] rounded-[2rem] p-10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow border border-[var(--color-border)]"
                        >
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 text-center sm:text-left">
                                <div
                                    className={`w-32 h-32 md:w-36 md:h-36 rounded-2xl flex items-center justify-center shadow-md border border-[var(--color-border)] flex-shrink-0 ${founderImage
                                        ? "overflow-hidden bg-gray-100"
                                        : "bg-[var(--color-primary)]"
                                        }`}
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
                                        <span className="text-white text-3xl font-bold">{founderInitials}</span>
                                    )}
                                </div>
                                <div className="sm:mt-4">
                                    <div className="text-xs font-bold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-2">{content.founder.tag}</div>
                                    <h3 className="text-3xl font-extrabold text-[var(--color-heading)] mb-2">{content.founder.name}</h3>
                                    <p className="text-lg text-[var(--color-body-secondary)] font-medium">{content.founder.role}</p>
                                </div>
                            </div>
                            <p className="text-lg text-[var(--color-body)] mb-6 font-medium leading-relaxed border-t border-[var(--color-border)] pt-8">{content.founder.bio}</p>
                            {content.founder.note ? (
                                <p className="text-sm text-[var(--color-body-muted)] italic font-medium">{content.founder.note}</p>
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
                            <span className="text-xs font-bold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block">{content.team.tag}</span>
                            <h2 className="text-4xl font-extrabold text-[var(--color-heading)] mb-4">{content.team.title}</h2>
                            <p className="text-lg text-[var(--color-body-secondary)] font-medium mb-10">{content.team.description}</p>

                            {/* Leaders Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {content.team.members.map((member: any, index: number) => {
                                    const memberName = member?.name ?? "";
                                    const memberInitials = memberName.replace(/[^\p{L}]/gu, "").slice(0, 2) || "AE";
                                    const memberImage = member?.image;
                                    return (
                                        <div key={index} className="bg-[var(--color-bg-card)] rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow border border-[var(--color-border)] text-center">
                                            <div
                                                className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-[var(--color-border)] ${memberImage
                                                    ? "overflow-hidden bg-gray-100"
                                                    : "bg-[var(--color-bg-accent)] text-[var(--color-primary)] font-bold text-xl"
                                                    }`}
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
                                            <h4 className="text-lg font-bold text-[var(--color-heading)]">{memberName}</h4>
                                            <p className="text-sm font-medium text-[var(--color-body-secondary)] mb-3">{member.role}</p>
                                            {member.bio ? (
                                                <p className="text-xs text-[var(--color-body-muted)] leading-relaxed">{member.bio}</p>
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
                                        <div key={index} className="bg-[var(--color-bg-card)] rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow border border-[var(--color-border)] text-center h-full">
                                            <div
                                                className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-[var(--color-border)] ${employeeImage
                                                    ? "overflow-hidden bg-gray-100"
                                                    : "bg-[var(--color-bg-accent)] text-[var(--color-primary)] font-bold text-xl"
                                                    }`}
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
                                            <h4 className="text-lg font-bold text-[var(--color-heading)]">{employeeName}</h4>
                                            <p className="text-sm font-medium text-[var(--color-body-secondary)]">{employee.role}</p>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-20 overflow-hidden bg-[var(--color-bg)]">
                <div className="container max-w-5xl mx-auto px-4 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="rounded-[2rem] bg-[var(--color-primary)] text-center p-12 md:p-20 shadow-2xl overflow-hidden relative"
                    >
                        {/* Decorative subtle background sweeps inside CTA */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary-light)] blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/40 blur-2xl rounded-full translate-y-1/2 -translate-x-1/2" />

                        <h2 className="relative z-10 !text-white text-3xl md:text-5xl font-extrabold mb-6 leading-tight">{content.cta.title}</h2>
                        <p className="relative z-10 !text-white/90 max-w-2xl mx-auto mb-10 text-lg md:text-xl font-medium leading-relaxed">{content.cta.description}</p>

                        <div className="relative z-10">
                            <a
                                href={`/${lang}/contact`}
                                className="inline-flex items-center gap-2 bg-[var(--color-heading)] text-[var(--color-bg)] font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer inline-block"
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
