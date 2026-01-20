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
        <section className="section bg-[#f9fbfd] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#faebe8] rounded-l-full opacity-30 -z-10" />

            <div className="container">
                <div className="text-center mb-16">
                    <span className="section-tag">{dict.tag}</span>
                    <h2>{dict.title}</h2>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Slider Container */}
                    <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-16 text-center">

                        {/* Avatar */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                            <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden">
                                <Image
                                    src={list[current].image}
                                    alt={list[current].name}
                                    fill
                                    className="object-cover"
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
                            <p className="text-lg text-gray-600 mb-8 italic leading-relaxed">
                                &quot;{list[current].text}&quot;
                            </p>

                            <h4 className="text-[#2c234d] font-bold text-xl mb-1">{list[current].name}</h4>
                            <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                                {list[current].role}
                            </div>
                        </motion.div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prev}
                        className="absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2 w-10 h-10 rounded-full bg-transparent hover:bg-white text-gray-400 hover:text-[#ff705a] flex items-center justify-center transition-all hover:shadow-lg"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={next}
                        className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2 w-10 h-10 rounded-full bg-transparent hover:bg-white text-gray-400 hover:text-[#ff705a] flex items-center justify-center transition-all hover:shadow-lg"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
}
