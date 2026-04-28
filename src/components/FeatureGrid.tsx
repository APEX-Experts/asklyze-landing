"use client";
import { motion, AnimatePresence } from "framer-motion";
import CommonCTA from "./CommonCTA";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FeatureIcon } from "./Icons";
import {
  type CommonCtaContent,
  type FeatureGridContent,
} from "../../payload-types";

export default function FeatureGrid({
  dict,
  commonCTA_Dict,
}: {
  dict: Omit<FeatureGridContent, "id">;
  commonCTA_Dict: Omit<CommonCtaContent, "id">;
}) {
  const [activeFeature, setActiveFeature] = useState(0);

  if (dict.isEnabled === false) return null;

  const features = dict.features;
  return (
    <section id="features" className="mx-4 md:mx-16 lg:mx-24 my-12">
      <div className="max-w-content-section flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mx-auto"
        >
          <h2 className="font-bold mb-5 text-center text-3xl lg:text-[40px] text-primary-dark">
            {dict.title}
          </h2>
          <p className="text-center text-text-body">{dict.desc}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-8 justify-center"
        >
          {/* CTA */}
          <div className="flex flex-col gap-6 items-center w-full">
            {/* Image */}
            <div className="w-full h-[450px] rounded-3xl relative overflow-hidden feature-image-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={features[activeFeature].image}
                    alt={features[activeFeature].title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <CommonCTA commonCTA_Dict={commonCTA_Dict} />
          </div>
          {/* Features */}
          <div className="flex flex-col gap-4 w-full">
            {features.map(({ title, desc }, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col gap-2.5 items-start py-4 px-5 rounded-3xl border cursor-pointer",
                  activeFeature === index
                    ? "border-primary-border bg-primary-bg-light"
                    : "border-primary-border-light feature-gradient"
                )}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex flex-row gap-2.5 items-center">
                  <div
                    className={cn(
                      "p-4 rounded-xl",
                      activeFeature === index
                        ? "bg-bg-subtle text-primary"
                        : "bg-primary-light text-primary-variant"
                    )}
                  >
                    <FeatureIcon index={index} width={42} height={42} />
                  </div>
                  <h3 className="text-text-heading font-medium text-2xl leading-[110%]">
                    {title}
                  </h3>
                </div>
                <p className="text-text-body leading-[130%] capitalize">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
