"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Linkedin, Github, Twitter } from "lucide-react";

interface GradientCTAProps {
    dict: {
        title: string;
        desc: string;
        cta: string;
    };
    lang?: string;
}

export default function GradientCTA({ dict, lang = "en" }: GradientCTAProps) {
    const socialLinks = [
        { icon: Linkedin, href: "https://www.linkedin.com/showcase/asklyze-ai" },
        { icon: Github, href: "https://github.com/APEX-Experts" },
        { icon: Twitter, href: "https://twitter.com/apex_experts" },
    ];

    return (
        <section className="relative overflow-hidden" style={{ paddingTop: "180px", paddingBottom: "120px" }}>
            <div className="container relative z-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    {/* Large centered heading — exactly like "Launch with Vexel." */}
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-12 text-white" style={{ letterSpacing: "-0.03em" }}>
                        {dict.title}
                    </h2>

                    {/* CTA Buttons — text link + white pill (exactly like Vexel) */}
                    <div className="flex flex-wrap gap-6 justify-center items-center mb-12">
                        {/* Get Started — text link with arrow */}
                        <a
                            href="https://g64534a1113c35c-asklyze.adb.me-riyadh-1.oraclecloudapps.com/ords/r/asklyze_cloud/asklyze-customer-portal/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-text-link"
                        >
                            {dict.cta}
                            <ArrowUpRight size={16} />
                        </a>

                        {/* Learn More — white pill with black circle arrow */}
                        <motion.a
                            href={`/${lang}/contact`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="btn-pill-white"
                        >
                            Learn More
                            <span className="btn-icon">
                                <ArrowUpRight size={14} />
                            </span>
                        </motion.a>
                    </div>

                    {/* Social Icons — simple white icons like Vexel */}
                    <div className="flex justify-center gap-6">
                        {socialLinks.map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-all duration-300 hover:opacity-70"
                                style={{ color: "rgba(255,255,255,0.6)" }}
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
