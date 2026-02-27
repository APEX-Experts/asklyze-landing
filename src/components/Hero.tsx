"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

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
  return (
    <section
      className="hero-gradient relative bg-[var(--color-bg)] w-full overflow-hidden flex flex-col justify-center items-center min-h-[90vh]"
      style={{ paddingTop: "120px" }}
    >
      {/* Subtle x.ai style grid/dot background effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Central Hero Content */}
      <div className="w-full max-w-5xl mx-auto px-4 relative z-10 flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center"
        >
          {/* Grok-style Title Typography — metallic text with fog & lens flare */}
          <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center py-16 mb-8">

            {/* Layer 1: Broad atmospheric blue wash */}
            <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-visible">
              <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 w-[80%] h-[200%] bg-blue-600/20 blur-[150px] rounded-full"></div>
            </div>

            {/* Layer 2: Concentrated blue flare — right side */}
            <div className="absolute inset-0 pointer-events-none select-none z-[1] overflow-visible">
              <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[45%] h-[140%] bg-blue-400/40 blur-[100px] rounded-full"></div>
            </div>

            {/* Layer 3: Core white lens flare — intense right hotspot */}
            <div className="absolute inset-0 pointer-events-none select-none z-[2] overflow-visible">
              <div className="absolute top-[40%] right-[8%] -translate-y-1/2 w-[30%] h-[80%] bg-white/60 blur-[80px] rounded-full"></div>
            </div>

            {/* Layer 4: Subtle fog/mist streaks across the text */}
            <div className="absolute inset-0 pointer-events-none select-none z-[3] overflow-visible">
              <div className="absolute top-[55%] right-[15%] -translate-y-1/2 w-[60%] h-[30%] bg-indigo-200/20 blur-[60px] rounded-full"></div>
              <div className="absolute top-[45%] right-[25%] -translate-y-1/2 w-[40%] h-[20%] bg-white/10 blur-[40px] rounded-full"></div>
            </div>

            {/* The heading itself with metallic gradient + mask fade */}
            <h1
              className="relative z-10 text-5xl md:text-7xl lg:text-[85px] font-extrabold tracking-[-0.04em] leading-[1.05] text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(to right, #374151, #6b7280, #9ca3af, #d1d5db, #f9fafb, #ffffff)',
                WebkitBackgroundClip: 'text',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.8) 40%, black 55%, black 100%)',
                maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.8) 40%, black 55%, black 100%)',
              }}
            >
              {dict.titleBeforeSpan} <br className="hidden md:block" />
              <span>
                {dict.titleSpan}
              </span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-[var(--color-body)] max-w-2xl mb-12 leading-relaxed font-medium">
            {dict.description}
          </p>

          {/* Central x.ai style prompt input mock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl mb-12 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-border)] to-[var(--color-border)] rounded-[24px] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[24px] p-4 flex items-center shadow-2xl">
              <Sparkles className="text-[var(--color-body-secondary)] ml-2 mr-4" size={24} />
              <input
                type="text"
                placeholder="Ask about your Oracle Analytics data..."
                className="w-full bg-transparent border-none text-[var(--color-heading)] text-lg focus:outline-none placeholder:text-[var(--color-body-muted)] disabled:opacity-50"
                disabled
              />
              <a
                href="https://g50f94ce30c3ffb-asklyze.adb.ca-toronto-1.oraclecloudapps.com/ords/r/asklyze_local/asklyze-customer-portal/login"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 bg-[var(--color-heading)] text-[var(--color-bg)] rounded-full p-3 hover:scale-105 transition-transform cursor-pointer flex-shrink-0"
              >
                <ArrowRight size={20} />
              </a>
            </div>

            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-[var(--color-body-muted)] hidden md:flex font-mono uppercase tracking-widest text-[10px]">
              <span>SQL Generation</span>
              <span className="h-1 w-1 bg-[var(--color-border)] rounded-full"></span>
              <span>Data Visualization</span>
              <span className="h-1 w-1 bg-[var(--color-border)] rounded-full"></span>
              <span>Predictive Insights</span>
            </div>
          </motion.div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row gap-6 mt-4">
            <motion.a
              href="https://g50f94ce30c3ffb-asklyze.adb.ca-toronto-1.oraclecloudapps.com/ords/r/asklyze_local/asklyze-customer-portal/login"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[var(--color-heading)] text-[var(--color-bg)] border border-transparent rounded-full px-8 py-4 font-bold text-lg hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              {dict.getStarted}
            </motion.a>
            <motion.a
              href={dict.watchDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-[var(--color-heading)] border border-[var(--color-border)] rounded-full px-8 py-4 font-bold text-lg hover:bg-[var(--color-bg-accent)] transition-colors"
            >
              {dict.watchDemo}
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Trust Bar styled minimally */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-10 w-full overflow-hidden"
      >
        <div className="relative w-full flex overflow-hidden opacity-30">
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[var(--color-bg)] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[var(--color-bg)] to-transparent pointer-events-none" />

          <div className="flex w-max animate-marquee gap-24 items-center">
            {[
              "ORACLE APEX", "ENTERPRISE", "DATA MODELS", "ANALYTICS", "NEURAL NETWORKS",
              "ORACLE APEX", "ENTERPRISE", "DATA MODELS", "ANALYTICS", "NEURAL NETWORKS"
            ].map((partner, i) => (
              <div key={i} className="flex-shrink-0 text-md font-mono tracking-[0.3em] text-[var(--color-heading)]">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
