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
const colors = ["#5e63ff", "#1ad271", "#f59e0b"];

export default function Pricing({ dict, lang = "en" }: PricingProps) {
    const plans = dict.plans.map((p, i) => ({
        ...p,
        icon: icons[i],
        color: colors[i],
        featured: i === 1, // Professional is featured
        description: p.desc
    }));

    return (
        <section id="pricing" className="section">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="section-header"
                >
                    <span className="section-tag">{dict.tag}</span>
                    <h2>{dict.title}</h2>
                    <p>{dict.desc}</p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className="pricing-card"
                            style={{
                                border: plan.featured ? `2px solid ${plan.color}` : "none",
                            }}
                        >
                            {/* Featured Badge */}
                            {plan.featured && (
                                <div
                                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                                    style={{ background: plan.color }}
                                >
                                    {dict.recommended}
                                </div>
                            )}

                            {/* Icon */}
                            <div
                                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                                style={{ background: `${plan.color}15` }}
                            >
                                <plan.icon size={28} color={plan.color} />
                            </div>

                            {/* Price */}
                            <div className="price" style={{ color: plan.color }}>
                                {plan.price}
                            </div>
                            <div className="plan-name">{plan.name}</div>
                            <div className="plan-desc">{plan.description}</div>

                            <ul style={{ textAlign: lang === "ar" ? "right" : "left" }}>
                                {plan.features.map((feature) => (
                                    <li key={feature} className="w-full flex items-center gap-3">
                                        <Check size={18} color="#1ad271" className="flex-shrink-0" />
                                        <span className="flex-1" style={{ textAlign: lang === "ar" ? "right" : "left" }}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <motion.a
                                href={plan.href || "https://g50f94ce30c3ffb-asklyze.adb.ca-toronto-1.oraclecloudapps.com/ords/r/asklyze_local/asklyze-customer-portal/login"}
                                target={plan.href?.startsWith("/") ? "_self" : "_blank"}
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="btn w-full"
                                style={{
                                    background: plan.featured ? plan.color : "transparent",
                                    color: plan.featured ? "white" : plan.color,
                                    border: `2px solid ${plan.color}`,
                                }}
                            >
                                {plan.cta || dict.cta}
                            </motion.a>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-10 text-sm"
                    style={{ color: "var(--color-body-light)" }}
                >
                    {dict.trustNote}
                </motion.p>

            </div>
        </section>
    );
}
