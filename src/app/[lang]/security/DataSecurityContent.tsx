/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const formatPoint = (point: string) =>
  point.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

interface DataSecurityContentProps {
  lang: "en" | "ar";
  isArabic: boolean;
  content: any;
}

export default function DataSecurityContent({
  lang,
  isArabic,
  content,
}: DataSecurityContentProps) {
  const [activeSection, setActiveSection] = useState(0);
  const allSections = [
    ...(content.sections || []),
    ...(content.additionalSections || []),
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("article[data-index]");
      let currentActive = 0;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // 200px offset to trigger active state before it hits the very top
        if (rect.top <= 200) {
          currentActive = Number(section.getAttribute("data-index"));
        }
      });
      setActiveSection(currentActive);
    };
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120; // 120px offset for fixed header
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white max-w-wide-section mx-[60px]">
      {/* Hero */}
      <section
        className="relative mx-4 mt-[35px] rounded-[50px] flex flex-col items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(250, 250, 250, 1) 0%, rgba(245, 245, 245, 1) 42%, rgba(238, 241, 255, 1) 100%)",
          paddingTop: "150px",
          paddingBottom: "80px",
        }}
      >
        <div className="container max-w-[1240px] mx-auto px-6 relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-[24px]"
          >
            <h1 className="text-[32px] md:text-[56px] font-bold text-[#181A2A] text-center leading-[1.21]">
              {content.title}
            </h1>
            <p className="text-[16px] font-normal text-[#5B647E] text-center leading-[1.6] max-w-[670px]">
              {content.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article Layout */}
      <main className="bg-white flex justify-center py-20 overflow-visible">
        <div className="w-full max-w-[1240px] px-6 flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Left Sidebar Menu */}
          <aside className="w-full md:w-auto md:min-w-[280px] md:max-w-[320px] shrink-0 flex flex-col gap-[16px] sticky top-[120px]">
            {allSections.map((section: any, index: number) => {
              const isActive = activeSection === index;
              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(index)}
                  className={`flex items-center gap-[10px] text-left transition-colors text-[14px] leading-[1.3] font-normal capitalize ${
                    isActive
                      ? "text-[#1F2A6B]"
                      : "text-[#6B6B6B] hover:text-[#181A2A]"
                  }`}
                >
                  {isActive && (
                    <div className="shrink-0 w-[18px] h-[18px] flex items-center justify-center">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_336_3714)">
                          <path
                            d="M17.6271 8.41573L0.913266 0.701637C0.647129 0.580783 0.329566 0.652781 0.144427 0.881633C0.0538343 0.992485 0.00307248 1.13054 0.000275068 1.27367C-0.00252234 1.4168 0.0428066 1.55674 0.128999 1.67104L5.62529 8.99943L0.128999 16.3278C-0.0484251 16.5631 -0.0419967 16.8897 0.143142 17.1172C0.267853 17.2728 0.454277 17.3564 0.643272 17.3564C0.734556 17.3564 0.825839 17.3371 0.91198 17.2972L17.6259 9.58313C17.8547 9.47771 18 9.25014 18 8.99943C18 8.74872 17.8547 8.52116 17.6271 8.41573Z"
                            fill="#1F2A6B"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_336_3714">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  )}
                  <span>{section.title}</span>
                </button>
              );
            })}
          </aside>

          {/* Right Main Content */}
          <div className="w-full max-w-[857px] flex flex-col gap-12 font-inter text-[14px] leading-loose text-[#1A1A1A]">
            {allSections.map((section: any, index: number) => (
              <article
                id={`section-${index}`}
                data-index={index}
                key={index}
                className="scroll-mt-[120px]"
              >
                <h2 className="text-[20px] md:text-[24px] font-bold text-[#181A2A] mb-4 leading-[1.4]">
                  {section.title}
                </h2>
                {section.content && <p className="mb-4">{section.content}</p>}
                {section.points && (
                  <ul className="space-y-2 mb-4">
                    {section.points.map((point: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="mt-[2px] shrink-0 text-[#1F2A6B]">
                          •
                        </span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: formatPoint(point),
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
