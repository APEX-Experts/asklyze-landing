"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface TestimonialsProps {
    dict: {
        tag: string;
        title: string;
        list: Array<{
            text: string;
            name: string;
            role: string;
        }>;
    };
}

const images = [
    "https://i.pravatar.cc/150?img=11",
    "https://i.pravatar.cc/150?img=5",
    "https://i.pravatar.cc/150?img=3"
];

export default function Testimonials({ dict }: TestimonialsProps) {
    const list = dict.list.map((t, i) => ({
        ...t,
        image: images[i]
    }));

    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % list.length);
    const prev = () => setCurrent((prev) => (prev - 1 + list.length) % list.length);

    return (
        <section className="section bg-[var(--color-bg)] text-[var(--color-heading)] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--color-bg-alt)] rounded-l-full opacity-30 -z-10" />

            <div className="container">
                <div className="text-center mb-16">
                    <span className="section-tag">{dict.tag}</span>
                    <h2>{dict.title}</h2>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Slider Container */}
                    <div className="relative bg-[var(--color-bg-card)] rounded-2xl shadow-[var(--shadow-card)] p-8 md:p-16 text-center border border-[var(--color-border)]">

                        {/* Avatar */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                            <div className="w-20 h-20 rounded-full border-4 border-[var(--color-bg-card)] shadow-lg overflow-hidden">
                                <Image
                                    src={list[current].image}
                                    alt={list[current].name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="mt-8"
                        >
                            <p className="text-lg text-[var(--color-heading)] mb-8 italic leading-relaxed">
                                &quot;{list[current].text}&quot;
                            </p>

                            <h4 className="text-[var(--color-primary)] font-bold text-xl mb-1">{list[current].name}</h4>
                            <div className="text-sm text-[var(--color-body-secondary)] font-medium uppercase tracking-wider">
                                {list[current].role}
                            </div>
                        </motion.div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prev}
                        className="absolute top-1/2 -left-2 md:-left-16 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:bg-[var(--color-bg-accent)] text-[var(--color-body)] hover:text-[var(--color-primary)] flex items-center justify-center transition-all hover:shadow-lg z-20"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={next}
                        className="absolute top-1/2 -right-2 md:-right-16 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:bg-[var(--color-bg-accent)] text-[var(--color-body)] hover:text-[var(--color-primary)] flex items-center justify-center transition-all hover:shadow-lg z-20"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
}
