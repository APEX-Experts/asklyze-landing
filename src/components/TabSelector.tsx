"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabSelectorProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
  className?: string;
  layoutId?: string;
}

export default function TabSelector({
  tabs,
  activeTab,
  onChange,
  className,
  layoutId = "activeTab",
}: TabSelectorProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full md:w-fit min-w-[230px] px-2",
        className
      )}
    >
      <div className="relative flex w-full md:w-fit rounded-full p-[5px] pricing-tabs bg-white">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => onChange(tab)}
            className={cn(
              "flex-1 md:flex-none cursor-pointer relative z-10 px-1 sm:px-2 md:px-6 py-2.5 text-[11px] sm:text-xs md:text-sm font-bold rounded-full transition-colors duration-300 md:min-w-[120px] whitespace-nowrap truncate",
              activeTab === tab ? "text-white" : "text-primary-dark"
            )}
          >
            {activeTab === tab && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 bg-primary rounded-full -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
