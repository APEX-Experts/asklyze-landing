"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";

interface FAQProps {
    dict: {
        tag: string;
        title: string;
        cta: string;
        categories: string[];
        list: Array<{
            question: string;
            answer: string;
            category?: string;
        }>;
    };
}

export default function FAQ({ dict }: FAQProps) {
    const [activeTab, setActiveTab] = useState(dict.categories[0]);
    const [openIndex, setOpenIndex] = useState<number | null>(0); // Default first item open

    // Filter FAQs based on active tab
    const filteredFAQs = activeTab === dict.categories[0]
        ? dict.list
        : dict.list.filter(item => item.category === activeTab);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="section bg-[var(--color-bg)] py-24">
            <div className="container max-w-4xl mx-auto px-4 relative">
                <div className="text-center mb-16">
                    <span className="text-xs font-bold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-4 block">
                        {dict.tag}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-heading)] mb-6">
                        {dict.title}
                    </h2>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {dict.categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setActiveTab(cat);
                                setOpenIndex(null); // Close all when switching tabs
                            }}
                            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${activeTab === cat
                                ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-md shadow-[var(--shadow-button)]"
                                : "bg-[var(--color-bg-alt)] border-transparent text-[var(--color-body-secondary)] hover:border-[var(--color-border)] hover:bg-[var(--color-bg-card)]"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Accordion */}
                <div className="space-y-4">
                    {filteredFAQs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index
                                ? "border-[var(--color-primary-light)] ring-1 ring-[var(--color-primary-light)] bg-[var(--color-bg-card)] shadow-[var(--shadow-card)]"
                                : "border-[var(--color-border)] bg-[var(--color-bg-alt)] hover:border-[var(--color-border)] hover:bg-[var(--color-bg-card)]"
                                }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] rounded-2xl"
                            >
                                <span className={`font-bold text-lg leading-snug pr-8 transition-colors ${openIndex === index ? "text-[var(--color-heading)]" : "text-[var(--color-body)]"
                                    }`}>
                                    {faq.question}
                                </span>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index
                                    ? "bg-[var(--color-primary)] text-white rotate-180"
                                    : "bg-[var(--color-border)] text-[var(--color-body-muted)]"
                                    }`}>
                                    {openIndex === index ? <Minus size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 md:px-8 pb-8 pt-2 text-[var(--color-body-secondary)] leading-relaxed font-medium">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <a
                        href="https://docs.asklyze.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 group px-8 py-4 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-accent)] text-[var(--color-heading)] font-bold transition-all shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]"
                    >
                        {dict.cta}
                        <ArrowRight size={18} className="text-[var(--color-primary)] group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
}
