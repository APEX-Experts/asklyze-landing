"use client";

import { motion } from "framer-motion";
import { FileText, CreditCard, Shield, Scale, Users, AlertCircle } from "lucide-react";

interface TermsConditionsContentProps {
    lang: "en" | "ar";
    isArabic: boolean;
    content: any;
}

export default function TermsConditionsContent({ lang, isArabic, content }: TermsConditionsContentProps) {
    return (
        <>
            {/* Hero Section with Gradient */}
            <section className="hero-gradient pt-40 pb-32 relative">
                <div className="container relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-white/20 text-white">
                            {content.subtitle}
                        </span>
                        <h1 className="!text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            {content.title}
                        </h1>
                        <p className="!text-white/90 text-lg md:text-xl max-w-2xl">
                            {content.intro}
                        </p>
                        <p className="!text-white/70 text-sm mt-4">{content.lastUpdated}</p>
                    </motion.div>
                </div>

                {/* Decorative shapes */}
                <div className="absolute top-20 right-10 w-20 h-20 rounded-full bg-white/10 animate-float" />
                <div className="absolute bottom-40 right-1/4 w-32 h-32 rounded-full bg-white/5 animate-float" style={{ animationDelay: "1s" }} />
                <div className="absolute top-1/3 right-20 w-16 h-16 rounded-full border-2 border-white/20 animate-float" style={{ animationDelay: "0.5s" }} />
            </section>

            {/* Content Section */}
            <main className="section bg-gray-50">
                <div className="container">
                    <div className="max-w-5xl mx-auto">
                        {/* Main Sections with Icons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                            {content.sections.map((section: any, index: number) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff705a] to-[#ff9472] flex items-center justify-center flex-shrink-0">
                                            <section.icon className="text-white" size={24} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-[#2c234d] flex-1">{section.title}</h2>
                                    </div>
                                    {section.content && (
                                        <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>
                                    )}
                                    {section.points && (
                                        <ul className="space-y-3">
                                            {section.points.map((point: string, idx: number) => (
                                                <li key={idx} className="text-gray-700 leading-relaxed flex items-start gap-3">
                                                    <span className="text-[#ff705a] mt-1 font-bold">•</span>
                                                    <span dangerouslySetInnerHTML={{ __html: point }} />
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Additional Sections - Full Width */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-8"
                        >
                            <div className="space-y-10">
                                {content.additionalSections.map((section: any, index: number) => (
                                    <div key={index} className="border-l-4 border-[#ff705a] pl-6">
                                        <h3 className="text-xl font-bold text-[#2c234d] mb-4">{section.title}</h3>
                                        {section.content && (
                                            <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>
                                        )}
                                        {section.points && (
                                            <ul className="space-y-3">
                                                {section.points.map((point: string, idx: number) => (
                                                    <li key={idx} className="text-gray-700 leading-relaxed flex items-start gap-3">
                                                        <span className="text-[#ff705a] mt-1 font-bold">•</span>
                                                        <span dangerouslySetInnerHTML={{ __html: point }} />
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Contact Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-[#faebe8] to-[#ffe8e3] rounded-2xl p-8 md:p-12 text-center"
                        >
                            <h2 className="text-3xl font-bold text-[#2c234d] mb-4">{content.contact.title}</h2>
                            <p className="text-gray-700 mb-6">{content.contact.content}</p>
                            <a href={`mailto:${content.contact.email}`} className="text-[#ff705a] font-bold text-lg hover:underline mb-4 block">
                                {content.contact.email}
                            </a>
                            <p className="text-gray-600 text-sm">{content.contact.address}</p>
                        </motion.div>
                    </div>
                </div>
            </main>
        </>
    );
}
