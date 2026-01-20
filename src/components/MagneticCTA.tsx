"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function MagneticCTA() {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.15;
        const deltaY = (e.clientY - centerY) * 0.15;
        x.set(deltaX);
        y.set(deltaY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section className="relative overflow-hidden">
            {/* Strong mesh gradient background */}
            <div className="absolute inset-0 mesh-gradient-strong" />

            {/* Animated background shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -left-32 -top-32 w-96 h-96 rounded-full opacity-10"
                    style={{ background: "var(--color-accent)" }}
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -right-32 -bottom-32 w-[500px] h-[500px] rounded-full opacity-10"
                    style={{ background: "var(--color-accent-light)" }}
                />
            </div>

            <div className="section-container section-spacing relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Main heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2
                            className="mb-6"
                            style={{ fontFamily: "var(--font-playfair), serif" }}
                        >
                            Ready to{" "}
                            <span
                                style={{
                                    background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Democratize
                            </span>{" "}
                            Your Data?
                        </h2>
                        <p className="text-lg lg:text-xl max-w-2xl mx-auto mb-12">
                            Transform how your organization interacts with Oracle databases.
                            From complex SQL to simple questions.{" "}
                            <strong style={{ color: "var(--color-text)" }}>
                                Start your journey today.
                            </strong>
                        </p>
                    </motion.div>

                    {/* Magnetic button */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        ref={ref}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="inline-block"
                    >
                        <motion.button
                            style={{ x: xSpring, y: ySpring }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative px-12 py-6 rounded-full text-lg font-medium overflow-hidden"
                            aria-label="Start your free trial"
                        >
                            {/* Button background */}
                            <div
                                className="absolute inset-0"
                                style={{ background: "var(--color-text)" }}
                            />

                            {/* Hover gradient overlay */}
                            <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))",
                                }}
                            />

                            {/* Ripple effect */}
                            <span className="absolute inset-0 flex items-center justify-center">
                                <span
                                    className="absolute w-0 h-0 rounded-full group-hover:w-[400px] group-hover:h-[400px] transition-all duration-700 ease-out opacity-10"
                                    style={{ background: "white" }}
                                />
                            </span>

                            {/* Button content */}
                            <span
                                className="relative flex items-center gap-3"
                                style={{ color: "var(--color-bg)" }}
                            >
                                Start Free Trial
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <ArrowRight size={22} />
                                </motion.span>
                            </span>
                        </motion.button>
                    </motion.div>

                    {/* Sub text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="mt-6 text-sm"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        No credit card required • 14-day free trial • Full feature access
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
