"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

interface ContactSectionProps {
    dict: {
        locationTitle: string;
        locationLines: string[];
        emailTitle: string;
        callTitle: string;
        followTitle: string;
        followDesc: string;
    }
}

export default function ContactSection({ dict }: ContactSectionProps) {
    return (
        <section className="py-24 bg-[var(--color-bg-alt)] border-t border-[var(--color-border)]">
            <div className="container max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* Left Info Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 flex flex-col pt-4"
                    >
                        <span className="text-xs font-bold tracking-[0.2em] text-[var(--color-body-muted)] uppercase mb-4">
                            Get In Touch
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-[var(--color-heading)] mb-8 leading-tight">
                            Talk to the ASKLYZE team.
                        </h2>

                        <div className="text-[var(--color-body)] leading-relaxed mb-10 text-lg">
                            <p className="mb-4">
                                ASKLYZE is purpose-built to work inside Oracle APEX environments. Our conversations are technical, not sales-driven.
                            </p>
                            <p>
                                We understand schemas, permissions models, and the enterprise constraints you're working within.
                            </p>
                        </div>

                        <ul className="space-y-4 mb-10">
                            <li className="flex items-start gap-4 text-[var(--color-body-secondary)] text-sm font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mt-1.5 shrink-0" />
                                <span>Oracle APEX-focused discussions</span>
                            </li>
                            <li className="flex items-start gap-4 text-[var(--color-body-secondary)] text-sm font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mt-1.5 shrink-0" />
                                <span>No data access required</span>
                            </li>
                            <li className="flex items-start gap-4 text-[var(--color-body-secondary)] text-sm font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mt-1.5 shrink-0" />
                                <span>Architecture and security questions welcome</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Right Form Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7"
                    >
                        <div className="bg-transparent lg:pl-8">
                            <ContactForm />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
