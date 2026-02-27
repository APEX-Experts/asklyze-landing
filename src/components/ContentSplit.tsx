"use client";

import { motion } from "framer-motion";
import { Check, Database, Lock, Eye, ShieldCheck, Box, User, TerminalSquare } from "lucide-react";
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
            {/* Section 1: AI Analytics for Oracle APEX (Screenshot 2 inspired styling) */}
            <section className="section bg-[var(--color-bg)] overflow-hidden py-24">
                <div className="container max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Content Left */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <h2 className="text-4xl lg:text-5xl font-extrabold text-[var(--color-heading)] mb-6 leading-tight">
                                {dict.section1.title.replace('.', '')} <br /> <span className="text-3xl font-medium">for Oracle APEX</span>
                            </h2>
                            <p className="text-lg text-[var(--color-body)] mb-10 leading-relaxed font-medium">
                                {dict.section1.desc}
                            </p>

                            <div className="space-y-6 mb-10">
                                <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] hover:shadow-[var(--shadow-card-hover)] transition-shadow">
                                    <div className="w-12 h-12 bg-[var(--color-bg-accent)] rounded-lg flex items-center justify-center mb-4">
                                        <TerminalSquare size={24} className="text-[var(--color-primary)]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--color-heading)] mb-2">Native Integration</h3>
                                    <p className="text-[var(--color-body-secondary)] text-sm">Plugins seamlessly execute within your database architecture. {dict.section1.badgeTitle} in {dict.section1.badgeTime}.</p>
                                </div>
                                <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] hover:shadow-[var(--shadow-card-hover)] transition-shadow">
                                    <div className="w-12 h-12 bg-[var(--color-bg-accent)] rounded-lg flex items-center justify-center mb-4">
                                        <Eye size={24} className="text-[var(--color-primary)]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--color-heading)] mb-2">Data-driven</h3>
                                    <p className="text-[var(--color-body-secondary)] text-sm">Turn raw database metadata into actionable insights that drive smarter decisions effortlessly.</p>
                                </div>
                            </div>

                            <a
                                href="https://g50f94ce30c3ffb-asklyze.adb.ca-toronto-1.oraclecloudapps.com/ords/r/asklyze_local/asklyze-customer-portal/login"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white border-none shadow-[var(--shadow-button)] font-semibold rounded-lg px-8 py-3"
                            >
                                {dict.section1.cta}
                            </a>
                        </motion.div>

                        {/* Visual Right */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2 relative"
                        >
                            <div className="bg-[var(--color-bg-alt)] rounded-[32px] p-8 lg:p-12 relative border border-[var(--color-border)]">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-[var(--color-heading)] mb-2">Analysis your Oracle Database</h3>
                                    <p className="text-sm text-[var(--color-body-secondary)]">Select your tables, then AI will generate insights and dashboards</p>
                                </div>

                                {/* Graphic Mockup inside replacing old laptop */}
                                <div className="bg-[var(--color-bg-card)] rounded-2xl shadow-[var(--shadow-card)] overflow-hidden border border-[var(--color-border)] mt-8 group relative aspect-video flex items-center justify-center">
                                    <div style={{ position: "relative", paddingTop: "56.25%", width: "100%" }}>
                                        <iframe
                                            src="https://customer-nd6eq88q2tb3xwgl.cloudflarestream.com/e418d6024c5dd8bea1835b3465095b66/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-nd6eq88q2tb3xwgl.cloudflarestream.com%2Fe418d6024c5dd8bea1835b3465095b66%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
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

            {/* Section 2: Security (Screenshot 4 inspired styling - Flowchart Left, Feats Right) */}
            <section className="section bg-[var(--color-bg)] py-24 border-t border-[var(--color-border)]">
                <div className="container max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                        {/* Visual Left - Flow Diagram Mockup */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-[var(--color-bg-alt)] rounded-3xl p-8 md:p-12 border border-[var(--color-border)] shadow-sm relative"
                        >
                            <div className="flex flex-col gap-6 items-center">
                                {/* Database Block */}
                                <div className="bg-[var(--color-bg-card)] rounded-xl py-6 px-10 border border-[var(--color-border)] shadow-[var(--shadow-card)] text-center w-full max-w-sm z-10 relative">
                                    <div className="w-12 h-12 bg-[var(--color-bg-accent)] rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Database size={24} className="text-[var(--color-primary)]" />
                                    </div>
                                    <div className="font-bold text-[var(--color-heading)] text-lg mb-1">Your Database</div>
                                    <div className="text-xs text-[var(--color-body-muted)]">Oracle APEX / Enterprise Databases</div>
                                </div>

                                {/* Connecting Line */}
                                <div className="w-0.5 h-12 bg-[var(--color-border)] z-0 -my-8 relative" />

                                {/* AI Block */}
                                <div className="bg-[var(--color-bg-card)] rounded-xl py-8 px-8 border border-[var(--color-border)] shadow-[var(--shadow-card)] ring-2 ring-[var(--color-primary-light)] ring-offset-4 ring-offset-[var(--color-bg-alt)] text-center w-full max-w-md z-10 relative">
                                    <div className="text-[10px] font-bold tracking-widest text-[var(--color-primary)] uppercase mb-2">AI Engine</div>
                                    <div className="font-extrabold text-[var(--color-heading)] text-xl mb-6">ASKLYZE Processing</div>
                                    <div className="flex flex-col gap-3">
                                        <div className="bg-[var(--color-bg)] rounded-lg py-3 text-sm font-medium border border-[var(--color-border)] text-[var(--color-body-secondary)]">Natural Language Parser</div>
                                        <div className="bg-[var(--color-bg)] rounded-lg py-3 text-sm font-medium border border-[var(--color-border)] text-[var(--color-body-secondary)]">Query Generator</div>
                                        <div className="bg-[var(--color-bg)] rounded-lg py-3 text-sm font-medium border border-[var(--color-border)] text-[var(--color-body-secondary)]">Visualization Engine</div>
                                    </div>
                                </div>

                                {/* Connecting Line */}
                                <div className="w-0.5 h-12 bg-[var(--color-border)] z-0 -my-8 relative" />

                                {/* Team Block */}
                                <div className="bg-[var(--color-bg-card)] rounded-xl py-6 px-10 border border-[var(--color-border)] shadow-[var(--shadow-card)] text-center w-full max-w-sm z-10 relative">
                                    <div className="flex items-center justify-center gap-2 mb-3">
                                        <div className="w-10 h-10 bg-[var(--color-bg-accent)] rounded-full flex items-center justify-center">
                                            <User size={20} className="text-[var(--color-primary)]" />
                                        </div>
                                        <div className="w-10 h-10 bg-[var(--color-bg-accent)] rounded-full flex items-center justify-center -ml-4 ring-2 ring-[var(--color-bg-card)]">
                                            <User size={20} className="text-[var(--color-primary)]" />
                                        </div>
                                    </div>
                                    <div className="font-bold text-[var(--color-heading)] text-lg mb-1">Your Team</div>
                                    <div className="text-xs text-[var(--color-body-muted)]">Analyst, Manager, Executive</div>
                                </div>
                            </div>
                            <div className="text-center mt-10 text-xs italic text-[var(--color-body-muted)]">All processing happens within your environment.</div>
                        </motion.div>

                        {/* Content Right */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl lg:text-5xl font-extrabold text-[var(--color-heading)] mb-6 leading-tight">Built for enterprise-grade security</h2>
                            <p className="text-lg text-[var(--color-body)] mb-12 font-medium">
                                {dict.section2.desc} ASKLYZE is designed to respect your data boundaries from day one — not as an afterthought.
                            </p>

                            <div className="flex flex-col gap-6 mb-10">
                                <div className="flex gap-4 p-5 rounded-2xl bg-[var(--color-bg-alt)] border border-[var(--color-border)] items-start">
                                    <div className="bg-[var(--color-bg-card)] p-2 rounded-lg shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                                        <Database size={24} className="text-[var(--color-primary)]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[var(--color-heading)] text-lg">Zero Data Movement</h4>
                                        <p className="text-sm text-[var(--color-body-secondary)] mt-1">Your data stays exactly where it is — no uploads, no copies, no external transfers.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-5 rounded-2xl bg-[var(--color-bg-alt)] border border-[var(--color-border)] items-start">
                                    <div className="bg-[var(--color-bg-card)] p-2 rounded-lg shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                                        <Lock size={24} className="text-[var(--color-primary)]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[var(--color-heading)] text-lg">Role-Based Access Control</h4>
                                        <p className="text-sm text-[var(--color-body-secondary)] mt-1">ASKLYZE inherits your database roles and can only read data based on defined user privileges.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-5 rounded-2xl bg-[var(--color-bg-alt)] border border-[var(--color-border)] items-start">
                                    <div className="bg-[var(--color-bg-card)] p-2 rounded-lg shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                                        <ShieldCheck size={24} className="text-[var(--color-primary)]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[var(--color-heading)] text-lg">Full Auditability</h4>
                                        <p className="text-sm text-[var(--color-body-secondary)] mt-1">{dict.section2.title} Every query is logged and inspectable — you always know what's being executed.</p>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="https://docs.asklyze.ai/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex btn btn-outline border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white font-semibold rounded-lg px-8 py-3 transition-colors"
                            >
                                {dict.section2.cta}
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
