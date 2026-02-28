"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { countries, getCountryByCode, Country } from "@/data/countries";
import { ChevronDown, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const companySizes = [
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-200", label: "51-200 employees" },
    { value: "201-500", label: "201-500 employees" },
    { value: "500+", label: "500+ employees" },
];

interface FormData {
    name: string;
    email: string;
    country: string;
    mobile: string;
    companyName: string;
    companySize: string;
    title: string;
    subject: string;
    comment: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        country: "",
        mobile: "",
        companyName: "",
        companySize: "",
        title: "",
        subject: "",
        comment: "",
    });

    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const [countrySearch, setCountrySearch] = useState("");
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const countryDropdownRef = useRef<HTMLDivElement>(null);

    // Auto-detect user's country via IP
    useEffect(() => {
        async function detectCountry() {
            try {
                // Try multiple geolocation APIs as fallback
                const apis = [
                    { url: "https://ipapi.co/json/", getCode: (d: { country_code: string }) => d.country_code },
                    { url: "https://ipwho.is/", getCode: (d: { country_code: string }) => d.country_code },
                ];

                for (const api of apis) {
                    try {
                        const response = await fetch(api.url);
                        if (response.ok) {
                            const data = await response.json();
                            const countryCode = api.getCode(data);
                            if (countryCode) {
                                const country = getCountryByCode(countryCode);
                                if (country) {
                                    setSelectedCountry(country);
                                    setFormData(prev => ({ ...prev, country: country.code }));
                                    return; // Success, exit
                                }
                            }
                        }
                    } catch {
                        continue; // Try next API
                    }
                }
            } catch (error) {
                console.log("Could not detect country:", error);
            }
        }
        detectCountry();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
                setIsCountryDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredCountries = countries.filter(c =>
        c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
        c.dialCode.includes(countrySearch)
    );

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country);
        setFormData(prev => ({ ...prev, country: country.code }));
        setIsCountryDropdownOpen(false);
        setCountrySearch("");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    countryName: selectedCountry?.name || "",
                    countryDialCode: selectedCountry?.dialCode || "",
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to send message");
            }

            setStatus("success");
            setFormData({
                name: "",
                email: "",
                country: selectedCountry?.code || "",
                mobile: "",
                companyName: "",
                companySize: "",
                title: "",
                subject: "",
                comment: "",
            });
        } catch (error) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-2xl shadow-xl p-8 md:p-10 border border-white/8"
            style={{ background: "rgba(20, 20, 35, 0.8)", backdropFilter: "blur(20px)" }}
        >
            <h3 className="text-2xl font-bold text-white mb-8">Send us a Message</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-white/5 rounded-full border-0 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff705a]/30 transition-all"
                        placeholder="Your name"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-white/5 rounded-full border-0 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff705a]/30 transition-all"
                        placeholder="Your email"
                    />
                </div>
            </div>

            {/* Country with Flag + Mobile Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                {/* Country Selector */}
                <div className="relative" ref={countryDropdownRef}>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Country *</label>
                    <button
                        type="button"
                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                        className="w-full px-5 py-4 bg-white/5 rounded-full border-0 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#ff705a]/30 transition-all"
                    >
                        {selectedCountry ? (
                            <span className="flex items-center gap-2">
                                <span className="text-xl">{selectedCountry.flag}</span>
                                <span className="text-white truncate">{selectedCountry.name}</span>
                            </span>
                        ) : (
                            <span className="text-gray-500">Select country</span>
                        )}
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ${isCountryDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                        {isCountryDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute z-50 w-full mt-2 rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
                                style={{ background: "#14141f" }}
                            >
                                <div className="p-3 border-b border-white/8">
                                    <input
                                        type="text"
                                        value={countrySearch}
                                        onChange={(e) => setCountrySearch(e.target.value)}
                                        placeholder="Search country..."
                                        className="w-full px-4 py-3 bg-white/5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#ff705a]/30"
                                    />
                                </div>
                                <div className="max-h-60 overflow-y-auto">
                                    {filteredCountries.map((country) => (
                                        <button
                                            key={country.code}
                                            type="button"
                                            onClick={() => handleCountrySelect(country)}
                                            className="w-full px-5 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors text-left"
                                        >
                                            <span className="text-xl">{country.flag}</span>
                                            <span className="text-white">{country.name}</span>
                                            <span className="text-gray-500 text-sm ml-auto">{country.dialCode}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Mobile Number</label>
                    <div className="flex">
                        <span className="inline-flex items-center px-4 py-4 bg-white/8 rounded-l-full border-0 text-gray-400 text-sm font-medium">
                            {selectedCountry ? selectedCountry.dialCode : "+1"}
                        </span>
                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={(e) => {
                                // Only allow numbers
                                const value = e.target.value.replace(/[^0-9]/g, "");
                                setFormData(prev => ({ ...prev, mobile: value }));
                            }}
                            className="flex-1 px-5 py-4 bg-white/5 rounded-r-full border-0 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff705a]/30 transition-all"
                            placeholder="Phone number"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                {/* Company Name - takes 2 columns */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Company Name *</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-white/5 rounded-full border-0 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff705a]/30 transition-all"
                        placeholder="Your company"
                    />
                </div>

                {/* Company Size */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Company Size *</label>
                    <select
                        name="companySize"
                        value={formData.companySize}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-white/5 rounded-full border-0 text-white focus:outline-none focus:ring-2 focus:ring-[#ff705a]/30 transition-all appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236a7695'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 1.25rem center", backgroundSize: "1.25rem" }}
                    >
                        <option value="" disabled>Select</option>
                        {companySizes.map((size) => (
                            <option key={size.value} value={size.value}>{size.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Title */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-400 mb-2">Your Title / Role</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-white/5 rounded-full border-0 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff705a]/30 transition-all"
                    placeholder="e.g. Product Manager, CEO, Developer"
                />
            </div>

            {/* Subject */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-400 mb-2">Subject *</label>
                <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white/5 rounded-full border-0 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff705a]/30 transition-all"
                    placeholder="What is this about?"
                />
            </div>

            {/* Comment */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Your Message *</label>
                <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-5 py-4 bg-white/5 rounded-3xl border-0 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff705a]/30 transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                />
            </div>

            {/* Status Messages */}
            <AnimatePresence mode="wait">
                {status === "success" && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-4 bg-green-900/20 border border-green-800 rounded-2xl flex items-center gap-3 text-green-400"
                    >
                        <CheckCircle className="w-5 h-5" />
                        <span>Your message has been sent successfully! We&apos;ll get back to you soon.</span>
                    </motion.div>
                )}

                {status === "error" && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-2xl flex items-center gap-3 text-red-400"
                    >
                        <AlertCircle className="w-5 h-5" />
                        <span>{errorMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
                className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-[#ff705a] to-[#ff9472] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {status === "loading" ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        <Send className="w-5 h-5" />
                        Send Message
                    </>
                )}
            </motion.button>
        </motion.form>
    );
}
