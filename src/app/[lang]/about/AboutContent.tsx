"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AboutPageContent } from "../../../../payload-types";
import { cn } from "@/lib/utils";
import Carousel from "@/components/Carousel";

interface AboutContentProps {
  lang: "en" | "ar";
  isArabic: boolean;
  content: Omit<AboutPageContent, "id">;
}

export default function AboutContent({
  lang,
  isArabic,
  content,
}: AboutContentProps) {
  const textAlign = isArabic ? "text-right" : "text-left";
  const dir = isArabic ? "rtl" : "ltr";
  console.log(content);

  // Reusable animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div
      dir={dir}
      className="w-full bg-[#FFFFFF] pb-0 overflow-hidden max-w-full-width mx-auto"
    >
      {/* 1. Hero Section */}
      <div className="w-full px-6 lg:px-[100px] mt-[20px] mb-[55px]">
        <section
          className="relative rounded-[50px] flex flex-col items-center overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(250, 250, 250, 1) 0%, rgba(245, 245, 245, 1) 42%, rgba(238, 241, 255, 1) 100%)",
            paddingTop: "150px",
            paddingBottom: "80px",
          }}
        >
          <div className="container max-w-[1240px] mx-auto px-6 relative z-10 flex flex-col items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="flex flex-col items-center gap-[24px]"
            >
              <h1 className="text-[32px] lg:text-[56px] font-bold text-[#181A2A] text-center leading-[1.21]">
                {content.hero?.title}
              </h1>
              <p className="text-[16px] font-normal text-[#5B647E] text-center leading-[1.6] max-w-[670px] px-4">
                {content.hero?.subtitle}
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* 2. Trusted AI */}
      <div className="w-full bg-white mb-[55px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center justify-center w-full px-6 py-[55px] lg:px-[100px] gap-[32px]"
        >
          <div className="flex flex-col items-center gap-[10px] w-full text-center">
            <motion.h2
              variants={fadeInUp}
              className="text-[#1A1A1A] text-[32px] lg:text-[40px] font-semibold leading-[1.21] text-center m-0"
            >
              {content.trustedSC1?.title
                ?.split(/\\n|\n/)
                .map((line: string, i: number, arr: string[]) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-[#1A1A1A] text-[14px] font-normal lg:max-w-[958px] leading-[1.43] text-center max-w-full m-0"
            >
              {content.trustedSC1?.subtitle}
            </motion.p>
          </div>

          <div className="w-full flex justify-center">
            <div className="flex flex-col lg:flex-row gap-[32px] w-full">
              {content.trustedSC1?.stats?.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex-1 bg-[#FFFFFF] rounded-[30px] px-[29px] py-[30px] flex flex-col items-center justify-center gap-[24px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] transform transition-transform hover:-translate-y-2"
                >
                  <div className="text-[#1F2A6B] text-[24px] font-bold leading-[1.21] text-center m-0 p-0 wrap-break-word">
                    {stat.value}
                  </div>
                  <div className="text-[#5B647E] text-[16px] font-medium leading-[1.21] text-center m-0 p-0 wrap-break-word">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            variants={fadeInUp}
            className="w-full flex justify-center"
          >
            <p className="text-[#1A1A1A] text-[18px] font-normal leading-[1.56] m-0 text-center">
              {content.trustedSC1?.footer}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* 3. APEX Experts AI Solutions */}
      <div className="w-full px-6 lg:px-[100px] mb-[55px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="w-full flex flex-col items-center gap-[32px]"
        >
          <h2 className="text-[#1A1A1A] text-[32px] lg:text-[40px] font-semibold text-center m-0 leading-[1.21]">
            {content.solutions?.title}
          </h2>

          <div className="bg-[#E8EBFA] rounded-[30px] p-[30px] lg:p-[50px] w-full flex flex-col items-center gap-[32px]">
            <Image
              src="/images/about/apex-logo.svg"
              alt={content.alts?.apexLogo || "Apex Logo"}
              width={480}
              height={93}
              className="w-full max-w-[480px] h-auto object-contain"
            />

            <p className="text-[#1A1A1A] text-[20px] lg:text-[28px] leading-[1.5em] font-normal max-w-[1151px] text-center m-0">
              {content.solutions?.description}
            </p>

            <div className="flex flex-col items-center w-full gap-[32px]">
              <div className="flex flex-col items-center text-center gap-[10px]">
                <h3 className="text-[#1A1A1A] text-[28px] font-semibold leading-[1.1] m-0">
                  {content.solutions?.whatWeBuild?.title}
                </h3>
                <p className="text-[#1A1A1A] text-[18px] leading-[1.56em] font-normal m-0 max-w-[800px] text-center">
                  {content.solutions?.whatWeBuild?.subtitle}
                </p>
              </div>

              <div className="w-full flex flex-col lg:flex-row items-stretch gap-[32px]">
                {content.solutions?.whatWeBuild?.points?.map(
                  ({ text: point }, idx) => {
                    const iconSrc =
                      idx === 0
                        ? "/images/about/solution-icon-1.svg"
                        : idx === 1
                          ? "/images/about/solution-icon-2.svg"
                          : "/images/about/solution-icon-3.svg";
                    return (
                      <div
                        key={idx}
                        className={cn(
                          "flex-1 bg-white rounded-[30px] p-[20px] flex flex-col justify-start gap-[16px] shadow-sm transform transition-transform hover:-translate-y-2",
                          isArabic ? "items-start" : ""
                        )}
                      >
                        <div
                          className={`flex ${isArabic ? "flex-row-reverse" : ""}`}
                        >
                          <Image
                            src={iconSrc}
                            alt={`${content.alts?.feature} ${idx + 1}`}
                            width={90}
                            height={90}
                          />
                        </div>
                        <p
                          className={`text-[#1A1A1A] text-[18px] font-normal leading-[1.21] m-0 ${textAlign}`}
                        >
                          {point
                            ?.split(/\\n|\n/)
                            .map((line: string, i: number, arr: string[]) => (
                              <span key={i}>
                                {line}
                                {i < arr.length - 1 && <br />}
                              </span>
                            ))}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4. Guides */}
      <div
        className="w-full px-6 lg:px-[100px] mb-[55px] rounded-[50px]"
        style={{ background: "transparent" }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center gap-[24px] py-[50px]"
        >
          <div className="flex flex-col items-center gap-[24px] w-full text-center">
            <motion.h2
              variants={fadeInUp}
              className="text-[#1A1A1A] text-[32px] lg:text-[40px] font-semibold m-0 leading-[1.21]"
            >
              {content.guides?.title}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-[#5B647E] text-[16px] font-normal leading-[1.3] m-0"
            >
              {content.guides?.subtitle}
            </motion.p>
          </div>

          <div className="flex flex-col lg:flex-row gap-[24px] w-full items-stretch">
            {content.guides?.cards?.map((card, idx) => {
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-[#E8EBFA] rounded-[30px] p-[25px] flex flex-col items-center gap-[20px] flex-1 transform transition-transform hover:-translate-y-2"
                >
                  <Image
                    src={`/images/about/guide-icon-${idx + 1}.svg`}
                    alt={card.title || "Guide Icon"}
                    width={100}
                    height={100}
                    className="w-[100px] h-[100px] object-contain shrink-0"
                  />
                  <div className="flex flex-col items-center justify-center gap-0">
                    <h3 className="text-[#393939] text-[24px] font-semibold leading-tight font-poppins m-0 text-center">
                      {card.title}
                    </h3>
                  </div>
                  <div className="w-full flex justify-center text-center">
                    <p className="text-[#5B647E] text-[16px] leading-relaxed font-normal m-0 text-center">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* 5. Vision and Mission */}
      <div
        className="w-full px-6 lg:px-[100px] mb-[55px]"
        style={{ display: "flex", flexDirection: "column", gap: "50px" }}
      >
        {/* Vision Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative w-full rounded-[50px] overflow-hidden text-wrap flex flex-col lg:flex-row justify-between items-center"
          style={{
            background: "#E8EBFA",
            padding: isArabic ? "20px 50px 20px 30px" : "20px 30px 20px 50px",
          }}
        >
          {/* Tiled background pattern */}
          <div
            className="absolute inset-0 rounded-[30px] z-0"
            style={{
              backgroundImage: "url(/images/about/vm-bg-pattern-v2.png)",
              backgroundRepeat: "repeat",
              backgroundSize: "100px 100px",
              border: "1px solid #F6FBFF",
              borderRadius: "30px",
              top: "0.21px",
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
            }}
          />

          {/* Text block */}
          <div
            className="relative z-10 flex flex-col items-center justify-center gap-[16px]"
            style={{ flex: "1" }}
          >
            <Image
              src="/images/about/vision-logo.svg"
              alt={content.alts?.visionLogo || "Vision Logo"}
              width={100}
              height={100}
              className="w-[100px] h-[100px] object-contain"
            />
            <h3
              className="text-wrap text-[#1A1A1A] m-0"
              style={{
                fontSize: "40px",
                fontWeight: 700,
                lineHeight: "1.116em",
                textAlign: "center",
              }}
            >
              {content.visionMission?.vision?.title}
            </h3>
            <p
              className="text-wrap text-[#1A1A1A] m-0"
              style={{
                fontSize: "24px",
                fontWeight: 400,
                lineHeight: "1.5em",
                textAlign: "center",
              }}
            >
              {content.visionMission?.vision?.description}
            </p>
          </div>

          {/* Vision photo */}
          <div
            className="relative z-10 shrink-0 rounded-[30px] overflow-hidden"
            style={{ width: "500px", height: "266px" }}
          >
            <Image
              src="/images/about/vision.png"
              alt={content.alts?.visionImage || "Vision Image"}
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Mission Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative w-full rounded-[50px] overflow-hidden flex flex-col lg:flex-row justify-between items-center"
          style={{
            background: "#E8EBFA",
            padding: isArabic ? "20px 30px 20px 50px" : "20px 50px 20px 30px",
          }}
        >
          {/* Tiled background pattern */}
          <div
            className="absolute inset-0 rounded-[30px] z-0"
            style={{
              backgroundImage: "url(/images/about/vm-bg-pattern-v2.png)",
              backgroundRepeat: "repeat",
              backgroundSize: "100px 100px",
              border: "1px solid #F6FBFF",
              borderRadius: "30px",
              top: "0.21px",
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
            }}
          />

          {/* Mission photo */}
          <div
            className="relative z-10 shrink-0 rounded-[30px] overflow-hidden"
            style={{ width: "505px", height: "266px" }}
          >
            <Image
              src="/images/about/mission.png"
              alt={content.alts?.missionImage || "Mission Image"}
              fill
              className="object-cover"
            />
          </div>

          {/* Text block */}
          <div
            className="relative z-10 flex flex-col items-center justify-center gap-[16px]"
            style={{ flex: "1" }}
          >
            <Image
              src="/images/about/mission-logo.svg"
              alt={content.alts?.missionLogo || "Mission Logo"}
              width={100}
              height={100}
              className="w-[100px] h-[100px] object-contain"
            />
            <h3
              className="text-wrap text-[#1A1A1A] m-0"
              style={{
                fontSize: "40px",
                fontWeight: 700,
                lineHeight: "1.116em",
                textAlign: "center",
              }}
            >
              {content.visionMission?.mission?.title}
            </h3>
            <p
              className="text-wrap text-[#1A1A1A] m-0"
              style={{
                fontSize: "24px",
                fontWeight: 400,
                lineHeight: "1.5em",
                textAlign: "center",
              }}
            >
              {content.visionMission?.mission?.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* 6. Leaders */}
      <div className="w-full px-6 lg:px-[100px] pt-[55px] pb-10 relative overflow-visible">
        {/* Decorative background element */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "2193.273px",
            height: "411.102px",
            transform: "translate(-50%, -50%) rotate(12deg)",
            padding: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
            borderRadius: "30px",
            background: "#E8EBFA",
            zIndex: 0,
            left: "50%",
            top: "50%",
          }}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center w-full gap-[32px] relative z-10"
        >
          <div className="flex flex-col items-center gap-[10px] text-center">
            <motion.h2
              variants={fadeInUp}
              className="text-[#0F172A] text-3xl lg:text-[40px] font-semibold m-0 leading-[1.21]"
            >
              {content.leaders?.title}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-[#5B647E] text-base lg:text-[18px] m-0 leading-[1.56]"
            >
              {content.leaders?.subtitle}
            </motion.p>
          </div>

          <Carousel
            items={content.leaders?.members || []}
            lang={lang}
            itemsPerPage={3}
            gap="gap-[50px]"
            renderItem={(member, idx) => {
              const imgSrc =
                idx === 0
                  ? "/images/about/ahmed.png"
                  : idx === 1
                    ? "/images/about/amr.png"
                    : "/images/about/abdulrahman.png";
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-white border border-[#C7C7C7] rounded-[30px] p-5 flex flex-col items-center shadow-sm hover:shadow-lg transition-all flex-1"
                  style={{ width: "100%", minHeight: "518px" }}
                >
                  <div className="w-full h-[300px] mb-4 rounded-[30px] relative overflow-hidden bg-gray-100">
                    <Image
                      src={member.imageUrl ?? imgSrc}
                      alt={member.name ?? ""}
                      fill
                      className=" object-cover object-top hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div
                    className="bg-[#E8EBFA] rounded-[20px] px-[17px] py-2 mb-2 text-center"
                    style={{ width: "fit-content" }}
                  >
                    <span className="text-[#3A4A8A] text-[14px] font-normal leading-[1.71]">
                      {member.role}
                    </span>
                  </div>
                  <h4 className="text-[#232323] text-[24px] font-semibold text-center m-0 leading-[1.17]">
                    {member.name}
                  </h4>
                  <div className="mt-4 flex items-center justify-center gap-[16px]">
                    {member.social?.facebook && (
                      <Link
                        href={member.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center transition-all hover:-translate-y-1 shadow-[0px_2px_10px_rgba(0,0,0,0.1)] overflow-hidden border border-black/5"
                      >
                        <svg
                          width="38"
                          height="38"
                          viewBox="0 0 38 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24 16.3077H20.6667V13.3846C20.6667 12.5778 21.264 12.6538 22 12.6538H23.3333V9H20.6667C18.4573 9 16.6667 10.9628 16.6667 13.3846V16.3077H14V19.9615H16.6667V28H20.6667V19.9615H22.6667L24 16.3077Z"
                            fill="#1F2A6B"
                          />
                        </svg>
                      </Link>
                    )}
                    {member.social?.linkedin && (
                      <Link
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center transition-all hover:-translate-y-1 shadow-[0px_2px_10px_rgba(0,0,0,0.1)] overflow-hidden border border-black/5"
                      >
                        <svg
                          width="38"
                          height="38"
                          viewBox="56 0 38 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M68.6639 25H71.0503V15.1071H68.6639V25ZM69.8741 13.9286C70.7094 13.9286 71.3401 13.2857 71.3401 12.4643C71.3401 11.6429 70.7094 11 69.8741 11C69.0218 11 68.4082 11.6429 68.4082 12.4643C68.4082 13.2857 69.0218 13.9286 69.8741 13.9286Z"
                            fill="#1F2A6B"
                          />
                          <path
                            d="M80.0218 25H82.4082V19.1964C82.4082 16.4643 80.84 14.9643 78.6411 14.9643C77.4309 14.9643 76.4081 15.5 75.7945 16.3393V15.1071H73.4081V25H75.7945V19.5357C75.7945 17.9464 76.6297 17.0893 77.9252 17.0893C79.1866 17.0893 80.0218 17.9464 80.0218 19.5357V25Z"
                            fill="#1F2A6B"
                          />
                        </svg>
                      </Link>
                    )}
                    {member.social?.instagram && (
                      <Link
                        href={member.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center transition-all hover:-translate-y-1 shadow-[0px_2px_10px_rgba(0,0,0,0.1)] overflow-hidden border border-black/5"
                      >
                        <svg
                          width="38"
                          height="38"
                          viewBox="112 0 38 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M130.619 16.4475C129.989 16.4475 129.385 16.6977 128.939 17.1432C128.494 17.5886 128.244 18.1927 128.244 18.8226C128.244 19.4525 128.494 20.0566 128.939 20.5021C129.385 20.9475 129.989 21.1977 130.619 21.1977C131.249 21.1977 131.853 20.9475 132.298 20.5021C132.744 20.0566 132.994 19.4525 132.994 18.8226C132.994 18.1927 132.744 17.5886 132.298 17.1432C131.853 16.6977 131.249 16.4475 130.619 16.4475Z"
                            fill="#1F2A6B"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M126.796 12.3052C129.337 12.0236 131.9 12.0236 134.441 12.3052C135.828 12.4601 136.947 13.5527 137.11 14.9456C137.412 17.5214 137.412 20.1236 137.11 22.6994C136.947 24.0923 135.828 25.1848 134.441 25.3406C131.901 25.6222 129.337 25.6222 126.796 25.3406C125.409 25.1848 124.29 24.0923 124.127 22.7002C123.826 20.1241 123.826 17.5216 124.127 14.9456C124.29 13.5527 125.409 12.4601 126.796 12.3052ZM134.273 14.4377C134.079 14.4377 133.893 14.5147 133.756 14.6517C133.619 14.7888 133.542 14.9747 133.542 15.1685C133.542 15.3623 133.619 15.5482 133.756 15.6852C133.893 15.8223 134.079 15.8993 134.273 15.8993C134.466 15.8993 134.652 15.8223 134.789 15.6852C134.926 15.5482 135.003 15.3623 135.003 15.1685C135.003 14.9747 134.926 14.7888 134.789 14.6517C134.652 14.5147 134.466 14.4377 134.273 14.4377ZM127.147 18.8225C127.147 17.9018 127.513 17.0189 128.164 16.3679C128.815 15.7169 129.698 15.3512 130.619 15.3512C131.539 15.3512 132.422 15.7169 133.073 16.3679C133.724 17.0189 134.09 17.9018 134.09 18.8225C134.09 19.7431 133.724 20.6261 133.073 21.2771C132.422 21.9281 131.539 22.2938 130.619 22.2938C129.698 22.2938 128.815 21.9281 128.164 21.2771C127.513 20.6261 127.147 19.7431 127.147 18.8225Z"
                            fill="#1F2A6B"
                          />
                        </svg>
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
