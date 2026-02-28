"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
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

const getContactInfo = (dict: ContactSectionProps['dict']) => [
    {
        icon: MapPin,
        title: dict.locationTitle,
        lines: dict.locationLines,
        color: "#ff705a"
    },
    {
        icon: Mail,
        title: dict.emailTitle,
        lines: [
            "admin@apexexperts.net",
            "support@asklyze.ai"
        ],
        color: "#3b82f6"
    },
    {
        icon: Phone,
        title: dict.callTitle,
        lines: [
            "+1 (800) 123-4567",
            "Mon - Fri: 9AM - 6PM EST"
        ],
        color: "#1ad271"
    }
];

export default function ContactSection({ dict }: ContactSectionProps) {
    const contactInfo = getContactInfo(dict);

    return (
        <section className="py-20" style={{ background: "#000" }}>
            <div className="container">
                {/* Divider */}
                <div className="mb-16" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-4 space-y-6">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={info.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="rounded-2xl p-6 transition-shadow border"
                                style={{
                                    background: "rgba(10, 10, 15, 0.8)",
                                    borderColor: "rgba(255, 255, 255, 0.1)",
                                    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
                                }}
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: `${info.color}15` }}
                                    >
                                        <info.icon
                                            className="w-6 h-6"
                                            style={{ color: info.color }}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-2">
                                            {info.title}
                                        </h4>
                                        {info.lines.map((line: string, i: number) => (
                                            <p key={i} className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="rounded-2xl p-6"
                            style={{ background: "linear-gradient(135deg, #ff705a, #ff9472)" }}
                        >
                            <h4 className="text-lg font-bold mb-3 !text-white">{dict.followTitle}</h4>
                            <p className="!text-white text-sm mb-4 opacity-90">
                                {dict.followDesc}
                            </p>
                            <div className="flex gap-3">
                                <a
                                    href="https://twitter.com/apex_experts"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow ASKLYZE on X"
                                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors text-white text-sm font-bold"
                                >
                                    𝕏
                                </a>
                                <a
                                    href="https://www.linkedin.com/showcase/asklyze-ai"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow ASKLYZE on LinkedIn"
                                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors text-white text-sm font-bold"
                                >
                                    in
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-8">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
