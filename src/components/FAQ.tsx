"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

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
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const filteredFAQs = activeTab === dict.categories[0]
        ? dict.list
        : dict.list.filter(item => item.category === activeTab);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="section">
            <div className="container relative">
                <div className="text-center mb-12">
                    <p className="text-sm uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>{dict.tag}</p>
                    <h2 className="text-3xl md:text-4xl font-bold">{dict.title}</h2>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {dict.categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setActiveTab(cat);
                                setOpenIndex(null);
                            }}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === cat
                                ? "bg-white text-black"
                                : "bg-white/5 text-gray-400 hover:bg-white/10"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Accordion */}
                <div className="max-w-3xl mx-auto space-y-3">
                    {filteredFAQs.map((faq, index) => (
                        <div
                            key={index}
                            className={`rounded-xl overflow-hidden transition-all duration-300`}
                            style={{
                                background: openIndex === index ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.01)",
                                border: openIndex === index
                                    ? "1px solid rgba(255, 255, 255, 0.1)"
                                    : "1px solid rgba(255, 255, 255, 0.05)",
                            }}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`font-semibold ${openIndex === index ? "text-white" : "text-gray-300"}`}>
                                    {faq.question}
                                </span>
                                <span className={`transition-transform duration-300 ${openIndex === index ? "text-white" : "text-gray-600"}`}>
                                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 leading-relaxed border-t pt-4" style={{ color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.05)" }}>
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        href="https://docs.asklyze.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all"
                        style={{
                            background: "transparent",
                            color: "#ffffff",
                            border: "1.5px solid rgba(255,255,255,0.15)",
                        }}
                    >
                        {dict.cta}
                    </a>
                </div>
            </div>
        </section>
    );
}
