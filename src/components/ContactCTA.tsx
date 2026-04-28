import React from "react";
import CommonCTA from "./CommonCTA";
import { Dictionary } from "@/get-dictionary";

type Props = {
  dict: Dictionary["contactCTA"];
  commonCTA_Dict: Dictionary["commonCTA"];
};

const ContactCTA = (props: Props) => {
  const { dict, commonCTA_Dict } = props;
  const { title } = dict;

  if (dict.isEnabled === false) return null;

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 lg:px-24">
      <div className="w-full mx-auto flex flex-row max-lg:flex-wrap gap-8 justify-between items-center">
        <h2 className="text-3xl lg:text-6xl font-extrabold text-text-heading text-wrap">
          {title}
        </h2>
        <CommonCTA commonCTA_Dict={commonCTA_Dict} />
      </div>
    </section>
  );
};

export default ContactCTA;
