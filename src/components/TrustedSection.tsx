import React from "react";
import { TrustedByIcon } from "./Icons";
import Marquee from "react-fast-marquee";

type Props = {
  dict: {
    title: string;
    subtitle: string;
  };
  lang: "en" | "ar";
};

const TrustedSection = (props: Props) => {
  const { dict, lang } = props;

  return (
    <section className=" lg:py-20">
      <div className="flex flex-col items-center mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-[40px] font-bold mb-4 text-primary-dark">
            {dict.title}
          </h2>
          <p className="text-text-body">{dict.subtitle}</p>
        </div>
        <Marquee
          className="max-w-[1000px] text-primary-variant"
          autoFill
          direction={lang === "ar" ? "right" : "left"}
          style={{
            direction: lang === "ar" ? "ltr" : undefined,
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <TrustedByIcon key={index} index={index} className="mx-8" />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default TrustedSection;
