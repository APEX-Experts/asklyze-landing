"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import VideoModal from "./VideoModal";
import { SparksIcon } from "./Icons";
import LinkButton from "./LinkButton";
import Image from "next/image";

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
    disclaimer: string;
  };
}

export default function Hero({ dict }: HeroProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section
      className="hero-gradient rounded-5xl max-w-wide-section mx-[60px]"
      style={{ minHeight: "100vh", paddingTop: "128px" }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Centered Hero Content */}
        <div
          className="flex flex-col items-center text-center gap-4"
          style={{ minHeight: "calc(100vh - 60px)" }}
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium border border-white/10 leading-[20px]"
            style={{
              background:
                "linear-gradient(90deg, var(--primary-400, #3A4A8A) 0%, var(--primary-300, #5C6AA5) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <SparksIcon />
            {dict.badge}
          </motion.span>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-normal text-primary-dark text-center text-[64px] max-w-3xl"
          >
            {dict.titleBeforeSpan}{" "}
            <span className="text-primary font-extrabold">
              {dict.titleSpan}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base max-w-2xl leading-normal font-medium"
          >
            {dict.description}
          </motion.p>

          {/* CTA Buttons — Vexel Style: dark pill + white pill with circle arrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap gap-4 justify-center mt-2"
          >
            <LinkButton
              onClick={() => {
                console.log("CLICKED");
                setIsVideoModalOpen(true);
              }}
              variant="outline"
            >
              {dict.watchDemo}
              <Play />
            </LinkButton>
            <LinkButton
              href="https://g64534a1113c35c-asklyze.adb.me-riyadh-1.oraclecloudapps.com/ords/r/asklyze_cloud/asklyze-customer-portal/login"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4"
            >
              {dict.getStarted}
            </LinkButton>
          </motion.div>
          <p className="text-gray-500 text-center leading-[110%] mt-2 mb-[160px]">
            {dict.disclaimer}
          </p>
          <div className="w-full absolute bottom-0 left-1/2 -translate-x-1/2">
            <Image
              src="/hero_images.png"
              alt="Hero Image"
              width={1440}
              height={1080}
              className="w-full h-auto"
            />
          </div>
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
