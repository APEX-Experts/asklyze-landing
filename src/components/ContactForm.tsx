"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface FormData {
    fullName: string;
    workEmail: string;
    company: string;
    oracleEnvironment: string;
    message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        workEmail: "",
        company: "",
        oracleEnvironment: "",
        message: "",
    });

    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            // Note: Map new fields to API structure as needed
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.fullName,
                    email: formData.workEmail,
                    companyName: formData.company,
                    subject: "New Inquiry from ASKLYZE Landing Page",
                    comment: `Environment: ${formData.oracleEnvironment}\n\nMessage:\n${formData.message}`,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to send message");
            }

            setStatus("success");
            setFormData({
                fullName: "",
                workEmail: "",
                company: "",
                oracleEnvironment: "",
                message: "",
            });
        } catch (error) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full"
        >
            <div className="flex flex-col gap-5">
                {/* Full Name */}
                <div>
                    <label className="block text-xs font-bold text-[var(--color-heading)] mb-2">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[var(--color-bg-card)] rounded-lg border border-[var(--color-border)] text-[var(--color-heading)] placeholder:text-[var(--color-body-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all shadow-sm"
                    />
                </div>

                {/* Work Email */}
                <div>
                    <label className="block text-xs font-bold text-[var(--color-heading)] mb-2">Work Email</label>
                    <input
                        type="email"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[var(--color-bg-card)] rounded-lg border border-[var(--color-border)] text-[var(--color-heading)] placeholder:text-[var(--color-body-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all shadow-sm"
                    />
                </div>

                {/* Company */}
                <div>
                    <label className="block text-xs font-bold text-[var(--color-heading)] mb-2">Company / Organization</label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[var(--color-bg-card)] rounded-lg border border-[var(--color-border)] text-[var(--color-heading)] placeholder:text-[var(--color-body-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all shadow-sm"
                    />
                </div>

                {/* Oracle Environment */}
                <div>
                    <label className="block text-xs font-bold text-[var(--color-heading)] mb-2">Oracle Environment</label>
                    <input
                        type="text"
                        name="oracleEnvironment"
                        value={formData.oracleEnvironment}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[var(--color-bg-card)] rounded-lg border border-[var(--color-border)] text-[var(--color-heading)] placeholder:text-[var(--color-body-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all shadow-sm text-sm"
                        placeholder="e.g., Oracle APEX 23.1, Oracle Database 19c"
                    />
                </div>

                {/* Message */}
                <div>
                    <label className="block text-xs font-bold text-[var(--color-heading)] mb-2">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-[var(--color-bg-card)] rounded-lg border border-[var(--color-border)] text-[var(--color-heading)] placeholder:text-[var(--color-body-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all resize-none shadow-sm"
                    />
                </div>
            </div>

            {/* Status Messages */}
            <AnimatePresence mode="wait">
                {status === "success" && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700"
                    >
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Your message has been sent successfully! We'll get back to you soon.</span>
                    </motion.div>
                )}

                {status === "error" && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700"
                    >
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">{errorMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Submit Button */}
            <div className="mt-8">
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full px-8 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-medium rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                >
                    {status === "loading" ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        "Contact ASKLYZE"
                    )}
                </button>
                <div className="text-center mt-4">
                    <p className="text-[10px] text-[var(--color-body-muted)] font-medium tracking-wide">
                        We do not access your data or environment during initial conversations.
                    </p>
                </div>
            </div>
        </form>
    );
}
