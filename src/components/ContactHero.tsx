"use client";

import { motion } from "framer-motion";

interface ContactHeroProps {
  dict: {
    title: string;
    desc: string;
  };
}

export default function ContactHero({ dict }: ContactHeroProps) {
  return (
    <section
      className="hero-gradient rounded-5xl max-w-wide-section mx-4 md:mx-[60px]"
      style={{ padding: "150px 0 60px 0" }}
    >
      <div className="container max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center gap-4">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-extrabold text-primary text-center text-4xl md:text-5xl lg:text-6xl max-w-3xl leading-[110%]"
          >
            {dict.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-text-body text-base md:text-lg max-w-xl mx-auto leading-normal font-medium"
          >
            {dict.desc}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
