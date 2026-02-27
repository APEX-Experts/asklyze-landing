/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, FileCheck, Globe } from "lucide-react";

const iconMap = {
    Shield,
    Lock,
    Eye,
    Database,
    FileCheck,
    Globe,
} as const;

const formatPoint = (point: string) => point.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

interface PrivacyPolicyContentProps {
    lang: "en" | "ar";
    isArabic: boolean;
    content: any;
}

export default function PrivacyPolicyContent({ lang, isArabic, content }: PrivacyPolicyContentProps) {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-40 pb-20 bg-[var(--color-bg)] overflow-hidden">
                <div className="container max-w-6xl mx-auto px-4 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <span className="text-xs font-bold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-6 block">
                            {content.subtitle}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--color-heading)] mb-6 leading-tight">
                            {content.title}
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--color-body-secondary)] max-w-xl font-medium mb-4">
                            {content.intro}
                        </p>
                        <p className="text-sm font-semibold text-[var(--color-body-muted)]">{content.lastUpdated}</p>
                    </motion.div>
                </div>

                {/* Subtle Decorative Elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-primary-light)] opacity-20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            </section>

            {/* Content Section */}
            <main className="section bg-[var(--color-bg)] border-t border-[var(--color-border)]">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {/* Core Sections as Cards */}
                            {content.sections.map((section: any, index: number) => {
                                const Icon = iconMap[section.iconKey as keyof typeof iconMap];
                                return (
                                    <motion.div
                                        key={`s-${index}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow rounded-[2rem] p-8 flex flex-col"
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            {Icon && (
                                                <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-accent)] flex items-center justify-center flex-shrink-0">
                                                    <Icon className="text-[var(--color-primary)]" size={24} />
                                                </div>
                                            )}
                                            <h3 className="text-xl md:text-2xl font-bold text-[var(--color-heading)]">{section.title}</h3>
                                        </div>
                                        {section.content && (
                                            <p className="text-[15px] md:text-base font-medium text-[var(--color-body-secondary)] leading-relaxed mb-6 flex-grow">{section.content}</p>
                                        )}
                                        {section.points && (
                                            <ul className="space-y-3 mt-auto">
                                                {section.points.map((point: string, idx: number) => (
                                                    <li key={idx} className="text-sm md:text-[15px] text-[var(--color-body)] leading-relaxed flex items-start gap-3 font-medium">
                                                        <span className="text-[var(--color-primary)] mt-1 font-bold shrink-0">•</span>
                                                        <span dangerouslySetInnerHTML={{ __html: formatPoint(point) }} />
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="space-y-8 mb-12">
                            {/* Additional Sections as Standalone Cards */}
                            {content.additionalSections.map((section: any, index: number) => (
                                <motion.div
                                    key={`a-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow rounded-[2rem] p-8 md:p-12"
                                >
                                    <h3 className="text-2xl font-bold text-[var(--color-heading)] mb-6">{section.title}</h3>
                                    {section.content && (
                                        <p className="text-base font-medium text-[var(--color-body-secondary)] leading-relaxed mb-6">{section.content}</p>
                                    )}
                                    {section.points && (
                                        <ul className="space-y-4">
                                            {section.points.map((point: string, idx: number) => (
                                                <li key={idx} className="text-sm md:text-base text-[var(--color-body)] leading-relaxed flex items-start gap-4 font-medium">
                                                    <span className="text-[var(--color-primary)] mt-1 font-bold shrink-0">•</span>
                                                    <span dangerouslySetInnerHTML={{ __html: formatPoint(point) }} />
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Contact Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-[var(--color-bg-accent)] border border-[var(--color-border)] rounded-[2rem] p-10 md:p-14 text-center"
                        >
                            <h2 className="text-3xl font-extrabold text-[var(--color-heading)] mb-4">{content.contact.title}</h2>
                            <p className="text-lg font-medium text-[var(--color-body-secondary)] mb-8 max-w-2xl mx-auto">{content.contact.content}</p>
                            <a href={`mailto:${content.contact.email}`} className="inline-block text-[var(--color-primary)] font-extrabold text-xl hover:text-[var(--color-primary-dark)] transition-colors mb-6">
                                {content.contact.email}
                            </a>
                            <p className="text-[var(--color-body-muted)] text-sm font-semibold tracking-wide">{content.contact.address}</p>
                        </motion.div>
                    </div>
                </div>
            </main>
        </>
    );
}
