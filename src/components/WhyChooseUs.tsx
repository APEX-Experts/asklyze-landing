import { Dictionary } from "@/get-dictionary";
import CommonCTA from "./CommonCTA";

type Props = {
  dict: Dictionary["whyChoose"];
  commonCTA_Dict: Dictionary["commonCTA"];
};

const WhyChooseUs = (props: Props) => {
  const { dict, commonCTA_Dict } = props;

  if (dict.isEnabled === false) return null;

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 lg:px-24">
      <div className="max-w-full flex flex-col items-center mx-auto bg-bg-card rounded-5xl gap-8 justify-center py-12 md:py-16 lg:py-25 px-4 md:px-8 lg:px-12">
        <div className="text-center">
          <h2 className="text-3xl lg:text-[40px] font-bold mb-4 text-primary-dark">
            {dict.title}
          </h2>
          <p className="text-text-body">{dict.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dict.features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white/65 rounded-3xl gap-2.5 justify-end p-6"
            >
              <h3 className="text-xl lg:text-[24px] font-bold text-text-heading">
                {feature.title}
              </h3>
              <p className="text-text-body text-center leading-[130%]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
        <CommonCTA commonCTA_Dict={commonCTA_Dict} />
      </div>
    </section>
  );
};

export default WhyChooseUs;
