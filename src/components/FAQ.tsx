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
    const [openIndex, setOpenIndex] = useState<number | null>(0); // Default first item open

    // Filter FAQs based on active tab
    const filteredFAQs = activeTab === dict.categories[0]
        ? dict.list
        : dict.list.filter(item => item.category === activeTab);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="section">
            <div className="container relative">
                {/* Background Decos */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#faebe8] rounded-full opacity-40 -translate-x-1/2 -z-10 blur-3xl" />

                <div className="text-center mb-12">
                    <span className="section-tag">{dict.tag}</span>
                    <h2>{dict.title}</h2>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {dict.categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setActiveTab(cat);
                                setOpenIndex(null); // Close all when switching tabs
                            }}
                            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === cat
                                ? "bg-[#ff705a] text-white shadow-md transform scale-105"
                                : "bg-[#eef2f6] text-[#6a7695] hover:bg-[#e2e6ea]"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Accordion */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {filteredFAQs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border rounded-lg overflow-hidden transition-all duration-300 ${openIndex === index ? "border-[#ff705a] shadow-md bg-white" : "border-gray-100 bg-white"}`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`font-semibold text-lg ${openIndex === index ? "text-[#2c234d]" : "text-gray-600"}`}>
                                    {faq.question}
                                </span>
                                <span className={`transition-transform duration-300 ${openIndex === index ? "rotate-180 text-[#ff705a]" : "text-gray-400"}`}>
                                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
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
                                        <div className="px-6 pb-6 text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
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
                        className="inline-block px-8 py-3 rounded-full border border-[#ff705a] text-[#ff705a] font-medium hover:bg-[#ff705a] hover:text-white transition-all"
                    >
                        {dict.cta}
                    </a>
                </div>
            </div>
        </section>
    );
}
