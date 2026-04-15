import React from "react";

const InfoBlock = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-6">
    <p className="text-2xl font-medium text-text-heading">{label}</p>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
);

export default InfoBlock;
