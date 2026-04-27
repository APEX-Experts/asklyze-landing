"use client";

import { motion } from "framer-motion";
import CommonCTA from "./CommonCTA";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
interface WorkingProcessProps {
  dict: {
    title: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  commonCTA_Dict: {
    getStarted: string;
    getStartedUrl: string;
    watchDemo: string;
    watchDemoUrl: string;
    disclaimer: string;
  };
}

export default function WorkingProcess({
  dict,
  commonCTA_Dict,
}: WorkingProcessProps) {
  const steps = [
    { title: dict.step1Title, description: dict.step1Desc },
    { title: dict.step2Title, description: dict.step2Desc },
    { title: dict.step3Title, description: dict.step3Desc },
  ];

  return (
    <section className="mx-4 md:mx-16 lg:mx-24 my-12">
      <div className="max-w-content-section flex flex-col gap-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-row w-full justify-between items-center"
        >
          <h2 className="text-3xl lg:text-[40px] font-bold text-primary-dark text-center">
            {dict.title}
          </h2>
          <CommonCTA commonCTA_Dict={commonCTA_Dict} />
        </motion.div>
        {/* Steps */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {steps.map(({ title, description }, index) => (
            <div
              className="flex flex-col gap-8 items-center rounded-4xl p-[28px] bg-primary-light step-container transition-all duration-300 hover:scale-105 group"
              key={index}
            >
              <div className="relative max-w-[342px] max-h-[287px]">
                <Image
                  src={`/icons/work${index}.svg`}
                  alt={title}
                  width={634}
                  height={532}
                  className="object-contain aspect-87/73"
                />
              </div>
              {/* Text Block */}
              <div className="flex flex-col gap-3.5 items-start">
                <h3 className="text-2xl font-bold leading-[110%] text-text-heading group-hover:text-primary-dark transition-colors duration-300">
                  {index + 1}- {title}
                </h3>
                <p className="text-text-body leading-[130%] capitalize text-lg">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
