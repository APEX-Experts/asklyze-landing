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
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative flex rounded-full p-[5px] w-fit pricing-tabs bg-white">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => onChange(tab)}
            className={cn(
              "cursor-pointer relative z-10 px-6 py-2.5 text-sm font-bold rounded-full transition-colors duration-300 min-w-[120px] whitespace-nowrap",
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
