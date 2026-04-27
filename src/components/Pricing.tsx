"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import LinkButton from "./LinkButton";
import TabSelector from "./TabSelector";
import { Dictionary } from "@/get-dictionary";

interface PricingProps {
  dict: Dictionary["pricing"];
}

export default function Pricing({ dict }: PricingProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const filteredPlans = dict.plans.filter(
    (plan) => plan.period === billingPeriod || plan.periodLabel === ""
  );

  return (
    <section
      id="pricing"
      className="py-12 md:py-16 px-4 md:px-8 lg:px-24 relative overflow-hidden"
    >
      <div className="max-w-full flex flex-col items-center mx-auto gap-8 justify-center">
        <div className="text-center">
          <h2 className="text-3xl lg:text-[40px] font-bold mb-4 text-primary-dark">
            {dict.title}
          </h2>
          <p className="text-text-body">{dict.desc}</p>
        </div>

        {/* Period Selector Tabs */}
        <TabSelector
          tabs={[dict.monthly, dict.yearly]}
          activeTab={billingPeriod === "monthly" ? dict.monthly : dict.yearly}
          onChange={(tab) =>
            setBillingPeriod(tab === dict.monthly ? "monthly" : "yearly")
          }
          layoutId="pricingPeriod"
          className="mt-4"
        />

        <div className="flex flex-row max-lg:flex-wrap max-lg:gap-8 -space-x-8 w-full mt-4">
          {filteredPlans.map((plan, index) => (
            <motion.div
              key={`${plan.name}-${index}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "relative group hover:translate-y-[-8px] transition-all duration-500 w-full h-[840px]",
                plan.isRecommended ? "z-10" : "z-0"
              )}
            >
              {plan.isRecommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[324px] h-[50px] flex items-center justify-center z-20 transition-all duration-500">
                  <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <Image
                      src="/popular-box.svg"
                      alt="Most Popular"
                      className="w-full h-full object-contain"
                      width={324}
                      height={50}
                    />
                  </div>
                  <span className="relative text-white text-[11px] font-bold tracking-[0.25em] -mt-1 uppercase">
                    {dict.recommended}
                  </span>
                </div>
              )}
              <div
                className={` rounded-3xl p-8 md:p-12 lg:p-16 h-full flex flex-col justify-between  ${
                  plan.isRecommended
                    ? "bg-white pricing-card-shadow"
                    : "bg-bg-card"
                }`}
              >
                <div className="flex items-center flex-col gap-4">
                  <h3 className="max-lg:mt-16 text-[40px] font-bold text-text-heading">
                    {plan.name}
                  </h3>
                  <div className="">
                    <span className="text-5xl font-bold text-text-heading">
                      {plan.price}
                    </span>
                    <span className="text-text-heading leading-[130%] capitalize">
                      {plan.periodLabel}
                    </span>
                  </div>
                </div>
                <ul className="flex flex-col gap-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="mt-1">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.34496 1.87629C7.37353 1.72336 7.45468 1.58524 7.57436 1.48584C7.69404 1.38644 7.84472 1.33203 8.00029 1.33203C8.15587 1.33203 8.30655 1.38644 8.42623 1.48584C8.54591 1.58524 8.62706 1.72336 8.65563 1.87629L9.35629 5.58163C9.40606 5.84506 9.53408 6.08737 9.72365 6.27694C9.91322 6.46651 10.1555 6.59453 10.419 6.64429L14.1243 7.34496C14.2772 7.37353 14.4154 7.45468 14.5147 7.57436C14.6141 7.69404 14.6686 7.84472 14.6686 8.00029C14.6686 8.15587 14.6141 8.30655 14.5147 8.42623C14.4154 8.54591 14.2772 8.62706 14.1243 8.65563L10.419 9.35629C10.1555 9.40606 9.91322 9.53408 9.72365 9.72365C9.53408 9.91322 9.40606 10.1555 9.35629 10.419L8.65563 14.1243C8.62706 14.2772 8.54591 14.4154 8.42623 14.5147C8.30655 14.6141 8.15587 14.6686 8.00029 14.6686C7.84472 14.6686 7.69404 14.6141 7.57436 14.5147C7.45468 14.4154 7.37353 14.2772 7.34496 14.1243L6.64429 10.419C6.59453 10.1555 6.46651 9.91322 6.27694 9.72365C6.08737 9.53408 5.84506 9.40606 5.58163 9.35629L1.87629 8.65563C1.72336 8.62706 1.58524 8.54591 1.48584 8.42623C1.38644 8.30655 1.33203 8.15587 1.33203 8.00029C1.33203 7.84472 1.38644 7.69404 1.48584 7.57436C1.58524 7.45468 1.72336 7.37353 1.87629 7.34496L5.58163 6.64429C5.84506 6.59453 6.08737 6.46651 6.27694 6.27694C6.46651 6.08737 6.59453 5.84506 6.64429 5.58163L7.34496 1.87629Z"
                            stroke="#3B82F6"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.334 1.33301V3.99967"
                            stroke="#3B82F6"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14.6667 2.66699H12"
                            stroke="#3B82F6"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.66732 14.6667C3.4037 14.6667 4.00065 14.0697 4.00065 13.3333C4.00065 12.597 3.4037 12 2.66732 12C1.93094 12 1.33398 12.597 1.33398 13.3333C1.33398 14.0697 1.93094 14.6667 2.66732 14.6667Z"
                            stroke="#3B82F6"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-text-heading leading-normal">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <LinkButton
                  href={plan.href || dict.href}
                  className={`transition-all duration-300 flex items-center justify-center gap-2`}
                >
                  {dict.cta}
                </LinkButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
