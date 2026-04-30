"use client";

import { Dictionary } from "@/get-dictionary";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { SparksIcon } from "./Icons";
import LinkButton from "./LinkButton";
import MockupStage from "./MockupStage";

interface HeroProps {
  dict: Dictionary["hero"];
  siteSettings: Dictionary["siteSettings"];
}

export default function Hero({ dict, siteSettings }: HeroProps) {
  if (dict.isEnabled === false) return null;

  return (
    <>
      <section
        className="hero-gradient rounded-5xl max-w-wide-section lg:mx-[60px] mx-2 relative overflow-hidden"
        style={{ minHeight: "100vh", paddingTop: "128px" }}
      >
        <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
          {/* Centered Hero Content */}
          <div
            className="flex flex-col items-center text-center gap-4 relative z-20"
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
              className="font-normal text-primary-dark text-center text-3xl md:text-5xl lg:text-[64px] max-w-4xl"
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

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap gap-4 justify-center mt-2"
            >
              <LinkButton
                href={dict.watchDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
              >
                {dict.watchDemo}
                <Play />
              </LinkButton>
              <LinkButton
                href={siteSettings.getStartedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4"
              >
                {dict.getStarted}
              </LinkButton>
            </motion.div>
            <p className="text-gray-500 text-center leading-[110%] mt-2">
              {dict.disclaimer}
            </p>

            {/* Interactive Mockup Stage replacing the static image */}
            <div className="w-full relative flex justify-center pb-10">
              <MockupStage images={dict.mockupImages} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
