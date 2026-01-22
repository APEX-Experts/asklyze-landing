"use client";

import { motion } from "framer-motion";
import { Database, Search, LineChart, LucideIcon } from "lucide-react";
import OptimizedVideo from "./OptimizedVideo";

interface Step {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
    bg: string;
    image: string;
    video?: string;
    iframeSrc?: string;
}

interface WorkingProcessProps {
    dict: {
        title: string;
        subtitle: string;
        step1Title: string;
        step1Desc: string;
        step2Title: string;
        step2Desc: string;
        step3Title: string;
        step3Desc: string;
    }
}

export default function WorkingProcess({ dict }: WorkingProcessProps) {
    const steps: Step[] = [
        {
            icon: Database,
            title: dict.step1Title,
            description: dict.step1Desc,
            color: "#ff705a",
            bg: "#ffece8",
            image: "/illustrations/data.svg",
            iframeSrc: "https://player.cloudinary.com/embed/?cloud_name=ddmoxgaxf&public_id=configuration-data_kwuxaj"
        },
        {
            icon: Search,
            title: dict.step2Title,
            description: dict.step2Desc,
            color: "#5e63ff",
            bg: "#ededff",
            image: "/illustrations/search.svg",
            video: "https://pub-676e1cb87e8247329da59049363213c6.r2.dev/configuration.mp4"
        },
        {
            icon: LineChart,
            title: dict.step3Title,
            description: dict.step3Desc,
            color: "#1ad271",
            bg: "#e0fbf0",
            image: "/illustrations/charts.svg",
            video: "https://pub-676e1cb87e8247329da59049363213c6.r2.dev/AIGeneration.mp4"
        }
    ];

    return (
        <section className="section" id="features">
            <div className="w-full px-4 md:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="section-tag">{dict.title}</span>
                    <h2 className="section-title">{dict.subtitle}</h2>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {steps.map((step, index) => {
                        // Explicitly check for video existence to avoid TS issues or runtime ambiguity
                        const hasVideo = "video" in step && step.video;
                        const hasIframe = "iframeSrc" in step && step.iframeSrc;
                        const hasMedia = hasVideo || hasIframe;

                        return (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="text-center group"
                            >
                                {/* Illustration/Video Placeholder */}
                                <div className={`mb-8 relative mx-auto flex items-center justify-center transition-all duration-300 ${hasMedia ? "w-full aspect-video" : "w-48 h-48"
                                    }`}>
                                    {/* Decorative Blob */}
                                    <div
                                        className="absolute inset-0 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"
                                        style={{ background: step.bg, filter: "blur(20px)" }}
                                    />
                                    {/* Content Container */}
                                    <div className="relative z-10 w-full h-full bg-white rounded-3xl shadow-lg border border-gray-100 flex items-center justify-center overflow-hidden">
                                        {hasIframe && step.iframeSrc ? (
                                            <iframe
                                                src={step.iframeSrc}
                                                width="640"
                                                height="360"
                                                style={{ height: "auto", width: "100%", aspectRatio: "640 / 360" }}
                                                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                                                allowFullScreen
                                                frameBorder="0"
                                                title={`${step.title} video`}
                                            />
                                        ) : hasVideo && step.video ? (
                                            <OptimizedVideo
                                                src={step.video}
                                                className="w-full h-full object-contain"
                                                autoPlay={true}
                                                loop={true}
                                                muted={true}
                                                playsInline={true}
                                                preload="metadata"
                                                lazyLoad={true}
                                            />
                                        ) : (
                                            <step.icon size={64} color={step.color} className="opacity-80" />
                                        )}
                                        {/* Mock illustration effect using CSS - only show if no video */}
                                        {!hasMedia && (
                                            <div className="absolute inset-x-0 bottom-0 h-16 opacity-10" style={{ background: step.color }} />
                                        )}
                                    </div>
                                </div>

                                <h3 className="mb-3 font-bold text-xl">{step.title}</h3>
                                <p className="text-gray-500 px-4">{step.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
