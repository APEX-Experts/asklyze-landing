"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import VideoModal from "./VideoModal";

const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

interface HeroProps {
  dict: {
    badge: string;
    titleBeforeSpan: string;
    titleSpan: string;
    description: string;
    getStarted: string;
    watchDemo: string;
    watchDemoUrl: string;
    statTables: string;
    statCharts: string;
    statResponse: string;
    cardQuerySuccess: string;
    cardResponseTime: string;
    cardDataSovereignty: string;
  };
}

export default function Hero({ dict }: HeroProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section
      className="hero-gradient"
      style={{ minHeight: "100vh", paddingTop: "100px" }}
    >
      {/* 3D Particle Background */}
      <HeroScene />

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Centered Hero Content */}
        <div className="flex flex-col items-center text-center" style={{ minHeight: "calc(100vh - 100px)" }}>

          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-8"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              color: "rgba(255, 255, 255, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <span style={{ fontSize: "14px" }}>✦</span>
            {dict.badge}
          </motion.span>

          {/* Main Headline — PURE WHITE like Vexel */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] max-w-4xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            {dict.titleBeforeSpan} {dict.titleSpan}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base md:text-lg max-w-2xl mb-10 leading-relaxed"
            style={{ color: "rgba(255, 255, 255, 0.55)" }}
          >
            {dict.description}
          </motion.p>

          {/* CTA Buttons — Vexel Style: dark pill + white pill with circle arrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            {/* Get Started — dark pill with subtle border */}
            <motion.a
              href="https://g50f94ce30c3ffb-asklyze.adb.ca-toronto-1.oraclecloudapps.com/ords/r/asklyze_local/asklyze-customer-portal/login"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-pill-dark"
            >
              {dict.getStarted}
              <span className="btn-icon">
                <ArrowUpRight size={14} />
              </span>
            </motion.a>

            {/* Watch Demo — white pill with black circle arrow */}
            <motion.button
              onClick={() => setIsVideoModalOpen(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-pill-white cursor-pointer"
            >
              {dict.watchDemo}
              <span className="btn-icon">
                <ArrowUpRight size={14} />
              </span>
            </motion.button>
          </motion.div>

          {/* Dashboard Preview — Full width like Vexel */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-5xl mx-auto relative"
          >
            {/* Dashboard Card */}
            <div
              className="relative mx-auto overflow-hidden"
              style={{
                background: "#0a0a12",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "var(--card-radius)",
                boxShadow: "0 50px 100px rgba(0, 0, 0, 0.5), 0 0 80px rgba(59, 130, 246, 0.05)",
              }}
            >
              {/* Screen Top Bar */}
              <div className="flex gap-2 p-5 pb-0">
                <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.10)" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.10)" }} />
              </div>

              {/* Video Content */}
              <div className="p-5">
                <div
                  className="overflow-hidden relative"
                  style={{ background: "#000", borderRadius: "16px", aspectRatio: "16/10" }}
                >
                  <div style={{ position: "relative", paddingTop: "62.5%" }}>
                    <iframe
                      src="https://customer-nd6eq88q2tb3xwgl.cloudflarestream.com/378b5ca68239fdd874e339fb1475cf30/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-nd6eq88q2tb3xwgl.cloudflarestream.com%2F378b5ca68239fdd874e339fb1475cf30%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                      loading="lazy"
                      style={{
                        border: "none",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: "100%",
                      }}
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                      allowFullScreen={true}
                    />
                  </div>
                </div>
              </div>

              {/* Stats Bar at Bottom */}
              <div className="grid grid-cols-3 gap-4 p-5 pt-0">
                {[
                  { value: "1000+", label: dict.statTables },
                  { value: "22+", label: dict.statCharts },
                  { value: "<2s", label: dict.statResponse },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center py-3"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      borderRadius: "16px",
                    }}
                  >
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc={dict.watchDemoUrl}
      />
    </section>
  );
}
