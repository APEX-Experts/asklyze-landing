"use client";

import { motion } from "framer-motion";
import { Check, Cloud, Server } from "lucide-react";

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
            features: string[];
        }>;
    };
}

const icons = [Cloud, Server];
const colors = ["#5e63ff", "#1ad271"];

export default function Pricing({ dict }: PricingProps) {
    const plans = dict.plans.map((p, i) => ({
        ...p,
        icon: icons[i],
        color: colors[i],
        featured: i === 1, // On-Premise is featured
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
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

                            {/* Features */}
                            <ul>
                                {plan.features.map((feature) => (
                                    <li key={feature}>
                                        <Check size={18} color="#1ad271" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="btn w-full"
                                style={{
                                    background: plan.featured ? plan.color : "transparent",
                                    color: plan.featured ? "white" : plan.color,
                                    border: `2px solid ${plan.color}`,
                                }}
                            >
                                {dict.cta}
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
