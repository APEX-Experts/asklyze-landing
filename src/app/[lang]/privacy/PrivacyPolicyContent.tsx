/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";

const formatPoint = (point: string) => point.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

interface PrivacyPolicyContentProps {
    lang: "en" | "ar";
    isArabic: boolean;
    content: any;
}

export default function PrivacyPolicyContent({ lang, isArabic, content }: PrivacyPolicyContentProps) {
    return (
        <>
            {/* Hero */}
            <section className="relative pt-40 pb-20 overflow-hidden" style={{ background: "#000" }}>
                <div className="container max-w-3xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {content.subtitle}
                        </p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            {content.title}
                        </h1>
                        <p className="text-base md:text-lg max-w-xl mx-auto mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
                            {content.intro}
                        </p>
                        <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>{content.lastUpdated}</p>
                    </motion.div>
                </div>
                {/* Subtle blue glow */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                        width: "800px",
                        height: "600px",
                        background: "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 60%)",
                    }}
                />
            </section>

            {/* Article Content */}
            <main style={{ background: "#000" }}>
                <div className="container max-w-3xl mx-auto px-6 py-20">
                    {/* Divider */}
                    <div className="mb-16" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />

                    {/* Core Sections */}
                    <div className="space-y-16">
                        {content.sections.map((section: any, index: number) => (
                            <motion.article
                                key={`s-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.05 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                    {section.title}
                                </h2>
                                {section.content && (
                                    <p className="text-base leading-[1.8] mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                                        {section.content}
                                    </p>
                                )}
                                {section.points && (
                                    <ul className="space-y-3">
                                        {section.points.map((point: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3 text-[15px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.55)" }}>
                                                <span className="mt-[2px] shrink-0" style={{ color: "#3b82f6" }}>•</span>
                                                <span dangerouslySetInnerHTML={{ __html: formatPoint(point) }} />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.article>
                        ))}
                    </div>

                    {/* Additional Sections */}
                    <div className="space-y-16 mt-16">
                        {content.additionalSections.map((section: any, index: number) => (
                            <motion.article
                                key={`a-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                    {section.title}
                                </h2>
                                {section.content && (
                                    <p className="text-base leading-[1.8] mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                                        {section.content}
                                    </p>
                                )}
                                {section.points && (
                                    <ul className="space-y-3">
                                        {section.points.map((point: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3 text-[15px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.55)" }}>
                                                <span className="mt-[2px] shrink-0" style={{ color: "#3b82f6" }}>•</span>
                                                <span dangerouslySetInnerHTML={{ __html: formatPoint(point) }} />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.article>
                        ))}
                    </div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="mt-20 pt-16 text-center"
                        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{content.contact.title}</h2>
                        <p className="text-base mb-6 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
                            {content.contact.content}
                        </p>
                        <a
                            href={`mailto:${content.contact.email}`}
                            className="inline-block text-lg font-semibold mb-4 transition-colors"
                            style={{ color: "#3b82f6" }}
                        >
                            {content.contact.email}
                        </a>
                        <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>{content.contact.address}</p>
                    </motion.div>
                </div>
            </main>
        </>
    );
}
