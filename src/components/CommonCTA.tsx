import React from "react";
import LinkButton from "./LinkButton";
import { Radio } from "lucide-react";

interface CommonCTA {
  getStarted: string;
  getStartedUrl: string;
  watchDemo: string;
  watchDemoUrl: string;
  disclaimer: string;
}

const CommonCTA = ({ commonCTA_Dict }: { commonCTA_Dict: CommonCTA }) => {
  return (
    <div className="flex flex-col gap-3.5 items-center lg:min-w-[350px]">
      {/* Buttons */}
      <div className="flex flex-row flex-wrap gap-2.5 items-center justify-center">
        <LinkButton href={commonCTA_Dict.watchDemoUrl} variant="outline">
          <Radio width={18} height={18} />
          <span>{commonCTA_Dict.watchDemo}</span>
        </LinkButton>
        <LinkButton href={commonCTA_Dict.getStartedUrl} variant="primary">
          <span>{commonCTA_Dict.getStarted}</span>
        </LinkButton>
      </div>
      <p className="text-gray-500 leading-[110%] text-center">
        {commonCTA_Dict.disclaimer}
      </p>
    </div>
  );
};

export default CommonCTA;
