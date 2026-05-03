"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { Dictionary } from "@/get-dictionary";
import { Media } from "./Media";
import { Media as MediaType } from "@/../payload-types";

type Props = {
  dict: Dictionary["trustedBy"];
  lang: "en" | "ar";
};

const TrustedSection = (props: Props) => {
  const { dict, lang } = props;

  if (dict.isEnabled === false) return null;

  const partners = dict.partners || [];

  return (
    <section className=" lg:py-20">
      <div className="flex flex-col items-center mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-[40px] font-bold mb-4 text-primary-dark">
            {dict.title}
          </h2>
          <p className="text-text-body">{dict.subtitle}</p>
        </div>
        {partners.length > 0 && (
          <Marquee
            className="max-w-[1000px] text-primary-variant"
            autoFill
            direction={lang === "ar" ? "right" : "left"}
            style={{
              direction: lang === "ar" ? "ltr" : undefined,
            }}
          >
            {partners.map((partner, index) => (
              <div
                key={index}
                className="mx-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Media
                  resource={partner.logo as MediaType}
                  alt={partner.name || "Partner"}
                  height={40}
                  width={140}
                  className="object-contain"
                />
              </div>
            ))}
          </Marquee>
        )}
      </div>
    </section>
  );
};

export default TrustedSection;
