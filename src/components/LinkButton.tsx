import Link from "next/link";
import React from "react";

type Props = {
  href?: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  target?: string;
  rel?: string;
};

const LinkButton = ({
  href = "#",
  onClick,
  className = "",
  children,
  variant,
  target,
  rel,
}: Props) => {
  switch (variant) {
    case "secondary": {
      return (
        <LinkOrButton
          href={href}
          onClick={onClick}
          target={target}
          rel={rel}
          className={`cursor-pointer flex items-center gap-2.5 px-5 h-[50px] py-4 rounded-full transition-all bg-secondary text-white shadow-sm hover:bg-secondary-hover ${className}`}
        >
          {children}
        </LinkOrButton>
      );
    }
    case "outline": {
      return (
        <LinkOrButton
          href={href}
          onClick={onClick}
          target={target}
          rel={rel}
          className={`cursor-pointer flex items-center gap-2.5 px-5 h-[50px] py-4 rounded-full transition-all bg-transparent border border-primary text-primary shadow-sm hover:bg-primary hover:text-white ${className}`}
        >
          {children}
        </LinkOrButton>
      );
    }
    default: {
      return (
        <LinkOrButton
          href={href}
          onClick={onClick}
          target={target}
          rel={rel}
          className={`cursor-pointer flex items-center gap-2.5 px-5 h-[50px] py-4 rounded-full transition-all bg-primary text-white shadow-sm hover:bg-primary-hover ${className}`}
        >
          {children}
        </LinkOrButton>
      );
    }
  }
};

const LinkOrButton = ({ href = "#", onClick, ...props }: Props) => {
  if (onClick) {
    return <button onClick={onClick} {...props} />;
  }
  return <Link href={href} {...props} />;
};

export default LinkButton;
