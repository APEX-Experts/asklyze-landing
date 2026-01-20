"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
    return (
        <section className="cta-section section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <span className="section-tag">Get Started Today</span>
                    <h2 className="mb-6">
                        Ready to Transform Your Data Analytics?
                    </h2>
                    <p className="mb-8" style={{ fontSize: "18px" }}>
                        Join 500+ enterprises already using ASKLYZE to democratize their Oracle data.
                        Start your journey to AI-powered insights in minutes.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-primary"
                        >
                            Request Demo
                            <ArrowRight size={18} />
                        </motion.a>
                        <motion.a
                            href="#pricing"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-outline"
                        >
                            View Pricing
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
