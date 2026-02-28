"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

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

function generateParticles() {
    return Array.from({ length: 40 }).map(() => ({
        width: `${2 + Math.random() * 3}px`,
        height: `${2 + Math.random() * 3}px`,
        background: `rgba(59, 130, 246, ${(0.15 + Math.random() * 0.3).toFixed(3)})`,
        top: `${(5 + Math.random() * 50).toFixed(2)}%`,
        left: `${(15 + Math.random() * 70).toFixed(2)}%`,
        boxShadow: `0 0 ${(4 + Math.random() * 8).toFixed(2)}px rgba(59, 130, 246, 0.3)`,
    }));
}

export default function Testimonials({ dict }: TestimonialsProps) {
    const [particles, setParticles] = useState<React.CSSProperties[]>([]);

    useEffect(() => {
        setParticles(generateParticles());
    }, []);

    const list = dict.list.map((t, i) => ({
        ...t,
        image: images[i]
    }));

    return (
        <section className="section relative overflow-hidden">
            {/* Blue Particle Sphere Background — CSS recreation of the Vexel 3D sphere */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Main sphere glow */}
                <div
                    className="absolute top-[10%] left-1/2 -translate-x-1/2"
                    style={{
                        width: "800px",
                        height: "800px",
                        background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 30%, rgba(59, 130, 246, 0.03) 50%, transparent 70%)",
                        borderRadius: "50%",
                    }}
                />
                {/* Particle ring effect */}
                <div
                    className="absolute top-[15%] left-1/2 -translate-x-1/2"
                    style={{
                        width: "600px",
                        height: "600px",
                        border: "1px solid rgba(59, 130, 246, 0.1)",
                        borderRadius: "50%",
                    }}
                />
                <div
                    className="absolute top-[20%] left-1/2 -translate-x-1/2"
                    style={{
                        width: "400px",
                        height: "400px",
                        border: "1px solid rgba(59, 130, 246, 0.06)",
                        borderRadius: "50%",
                    }}
                />
                {/* Scattered blue dots to simulate particles */}
                {particles.map((p, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={p}
                    />
                ))}
            </div>

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{dict.title}</h2>
                    <p style={{ color: "rgba(255,255,255,0.55)" }}>
                        Discover why teams trust ASKLYZE for AI-powered analytics.
                    </p>
                </motion.div>

                {/* 3-Column Testimonial Cards — Glassmorphism with 32px radius */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {list.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8"
                            style={{
                                background: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "var(--card-radius)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                            }}
                        >
                            {/* Quote */}
                            <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.8)" }}>
                                &quot;{testimonial.text}&quot;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">{testimonial.name}</div>
                                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Row — 3 big number cards like Vexel */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {[
                        { value: "99.99%", label: "Always On, Always Reliable" },
                        { value: "1000+", label: "Tables Supported" },
                        { value: "24/7", label: "Enterprise Support" },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="p-8"
                            style={{
                                background: "rgba(5, 5, 10, 0.6)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "var(--card-radius)",
                            }}
                        >
                            <div className="text-5xl md:text-6xl font-bold text-white mb-2" style={{ letterSpacing: "-0.03em" }}>
                                {stat.value}
                            </div>
                            <div className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
