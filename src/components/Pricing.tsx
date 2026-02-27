"use client";

import { motion } from "framer-motion";
import { Check, Cloud, Database, Server } from "lucide-react";

interface PricingProps {
    dict: {
        tag: string;
        title: string;
        desc: string;
        cta: string;
        recommended: string;
        trustNote: string;
        plans: Array<{
            name: string;
            price: string;
            period: string;
            desc: string;
            cta?: string;
            href?: string;
            features: string[];
        }>;
    };
    lang?: string;
}

const icons = [Cloud, Database, Server];

export default function Pricing({ dict, lang = "en" }: PricingProps) {
    const plans = dict.plans.map((p, i) => ({
        ...p,
        icon: icons[i],
        featured: i === 1, // Professional is featured
        description: p.desc
    }));

    return (
        <section id="pricing" className="section bg-[#0c0a09] border-t border-[var(--color-border)] py-24 relative overflow-hidden">
            {/* Warm golden atmospheric glow — x.ai careers style */}
            <div className="absolute inset-0 pointer-events-none select-none z-0">
                {/* Main golden glow — top center */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] h-[500px]"
                    style={{
                        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(180,130,50,0.18) 0%, rgba(160,100,30,0.10) 25%, rgba(120,70,20,0.05) 45%, transparent 70%)',
                    }}
                />
                {/* Secondary warm amber accent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[350px]"
                    style={{
                        background: 'radial-gradient(ellipse 50% 45% at 50% 0%, rgba(217,170,80,0.12) 0%, rgba(180,130,50,0.05) 40%, transparent 65%)',
                    }}
                />
                {/* Subtle edge warmth */}
                <div className="absolute top-0 left-[20%] w-[30%] h-[300px]"
                    style={{
                        background: 'radial-gradient(ellipse 70% 60% at 30% 0%, rgba(180,100,30,0.08) 0%, transparent 55%)',
                    }}
                />
                <div className="absolute top-0 right-[20%] w-[30%] h-[300px]"
                    style={{
                        background: 'radial-gradient(ellipse 70% 60% at 70% 0%, rgba(180,100,30,0.08) 0%, transparent 55%)',
                    }}
                />
            </div>
            <div className="container max-w-6xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-bold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block">
                        {dict.tag}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-heading)] mb-6">
                        {dict.title}
                    </h2>
                    <p className="text-lg text-[var(--color-body)] max-w-2xl mx-auto">
                        {dict.desc}
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className={`relative flex flex-col bg-[var(--color-bg-card)] rounded-2xl border transition-all duration-300 ${plan.featured
                                ? "border-[var(--color-primary)] ring-1 ring-[var(--color-primary)] shadow-xl lg:-mt-4 lg:mb-4"
                                : "border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] mt-0"
                                }`}
                        >
                            {/* Featured Badge */}
                            {plan.featured && (
                                <div
                                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-white bg-[var(--color-primary)] shadow-sm"
                                >
                                    {dict.recommended}
                                </div>
                            )}

                            <div className="p-8 border-b border-[var(--color-border)]">
                                {/* Icon & Title */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${plan.featured ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-bg-accent)] text-[var(--color-primary)]"
                                        }`}>
                                        <plan.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[var(--color-heading)]">{plan.name}</h3>
                                    </div>
                                </div>

                                <p className="text-sm text-[var(--color-body-secondary)] min-h-[40px] mb-6">
                                    {plan.description}
                                </p>

                                {/* Price */}
                                <div className="mb-2">
                                    <span className="text-4xl font-extrabold text-[var(--color-heading)]">{plan.price}</span>
                                    {plan.price !== "Custom" && <span className="text-[var(--color-body-muted)] text-sm font-medium">/{plan.period}</span>}
                                </div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col bg-[var(--color-bg-alt)] rounded-b-2xl">
                                <ul className="space-y-4 mb-8 flex-1" style={{ textAlign: lang === "ar" ? "right" : "left" }}>
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-[var(--color-bg-accent)] flex items-center justify-center shrink-0 mt-0.5">
                                                <Check size={12} className="text-[var(--color-primary)]" />
                                            </div>
                                            <span className="text-sm text-[var(--color-body-secondary)] leading-relaxed flex-1" style={{ textAlign: lang === "ar" ? "right" : "left" }}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <a
                                    href={plan.href || "https://g50f94ce30c3ffb-asklyze.adb.ca-toronto-1.oraclecloudapps.com/ords/r/asklyze_local/asklyze-customer-portal/login"}
                                    target={plan.href?.startsWith("/") ? "_self" : "_blank"}
                                    rel="noopener noreferrer"
                                    className={`w-full py-4 rounded-xl text-sm font-bold transition-all text-center ${plan.featured
                                        ? "bg-[var(--color-primary)] text-[var(--color-bg)] hover:bg-[var(--color-primary-dark)] shadow-[var(--shadow-button)]"
                                        : "bg-[var(--color-bg-card)] text-[var(--color-heading)] border border-[var(--color-border)] hover:bg-[var(--color-bg)] hover:border-[var(--color-primary)]"
                                        }`}
                                >
                                    {plan.cta || dict.cta}
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-12 text-sm text-[var(--color-body-muted)] font-medium"
                >
                    {dict.trustNote}
                </motion.p>

            </div>
        </section>
    );
}
