"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import TabSelector from "./TabSelector";
import { Dictionary } from "@/get-dictionary";

interface FAQProps {
  dict: Dictionary["faq"];
}

export default function FAQ({ dict }: FAQProps) {
  const [activeTab, setActiveTab] = useState(dict.categories[0].text);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFAQs =
    activeTab === dict.categories[0].text
      ? dict.list
      : dict.list.filter((item) => item.category === activeTab);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-12 md:py-16 px-4 md:px-8 lg:px-24 relative overflow-hidden"
    >
      <div className="flex flex-col gap-8 items-center w-full max-w-[1240px] mx-auto">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl lg:text-[40px] font-bold text-text-heading">
            {dict.title}
          </h2>
        </div>

        <TabSelector
          tabs={dict.categories.map((category) => category.text)}
          activeTab={activeTab}
          onChange={setActiveTab}
          layoutId="faqCategories"
        />

        <div className="flex flex-col gap-4 w-full">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                "p-6 rounded-[32px]  cursor-pointer transition-all duration-300 w-full border-[0.5px]",
                openIndex === index
                  ? "bg-bg-card shadow-sm border-transparent"
                  : "bg-white  border-gray-300"
              )}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-bold text-text-heading leading-[170%]">
                  {faq.question}
                </h3>
                <div
                  className={cn(
                    "shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-text-heading transition-all duration-300",
                    openIndex === index ? "" : ""
                  )}
                >
                  {openIndex === index ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </div>
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-text-heading leading-[162.5%] mt-4">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
