"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

interface FooterProps {
  dict: {
    company: string;
    description: string;
    services: string;
    digitalExperience: string;
    address: string;
    nycOffice: string;
    alexOffice: string;
    legal: string;
    quickLinks: string;
    location: string;
    links: {
      features: string;
      dashboard: string;
      portfolio: string;
      about: string;
      contact: string;
      blog: string;
      docs: string;
    };
    social: {
      facebook: string;
      linkedin: string;
      instagram: string;
      twitter: string;
      youtube: string;
    };
    socialLabels: {
      facebook: string;
      linkedin: string;
      instagram: string;
      twitter: string;
      youtube: string;
    };
    rights: string;
    copyright: string;
    bottomLinks: {
      privacy: string;
      terms: string;
      security: string;
    };
  };
}

const SocialSprite = ({ offset }: { offset: number }) => (
  <svg
    width="38"
    height="38"
    viewBox={`${offset} 0 38 38`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 16.3077H20.6667V13.3846C20.6667 12.5778 21.264 12.6538 22 12.6538H23.3333V9H20.6667C18.4573 9 16.6667 10.9628 16.6667 13.3846V16.3077H14V19.9615H16.6667V28H20.6667V19.9615H22.6667L24 16.3077Z"
      fill="#1F2A6B"
    />
    <path
      d="M68.6639 25H71.0503V15.1071H68.6639V25ZM69.8741 13.9286C70.7094 13.9286 71.3401 13.2857 71.3401 12.4643C71.3401 11.6429 70.7094 11 69.8741 11C69.0218 11 68.4082 11.6429 68.4082 12.4643C68.4082 13.2857 69.0218 13.9286 69.8741 13.9286Z"
      fill="#1F2A6B"
    />
    <path
      d="M80.0218 25H82.4082V19.1964C82.4082 16.4643 80.84 14.9643 78.6411 14.9643C77.4309 14.9643 76.4081 15.5 75.7945 16.3393V15.1071H73.4081V25H75.7945V19.5357C75.7945 17.9464 76.6297 17.0893 77.9252 17.0893C79.1866 17.0893 80.0218 17.9464 80.0218 19.5357V25Z"
      fill="#1F2A6B"
    />
    <g clipPath="url(#clip3_0_8)">
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
    </g>
    <g clipPath="url(#clip5_0_8)">
      <path
        d="M180.485 13.2087L185.437 19.8311L180.454 25.213H181.576L185.938 20.5002L189.464 25.2133H193.28L188.049 18.2196L192.688 13.2087H191.566L187.548 17.5484L184.302 13.2087H180.485ZM182.135 14.035H183.888L191.63 24.3868H189.877L182.135 14.035Z"
        fill="#1F2A6B"
      />
    </g>
    <g clipPath="url(#clip7_0_8)">
      <path
        d="M249.929 16.3246C249.849 16.0283 249.693 15.7581 249.476 15.5412C249.259 15.3242 248.989 15.168 248.693 15.0883C247.601 14.793 243.217 14.793 243.217 14.793C243.217 14.793 238.832 14.793 237.741 15.0883C237.445 15.168 237.175 15.3242 236.958 15.5412C236.741 15.7581 236.584 16.0283 236.505 16.3246C236.301 17.4374 236.202 18.5669 236.209 19.6981C236.202 20.8294 236.301 21.9588 236.505 23.0717C236.584 23.3679 236.741 23.6381 236.958 23.8551C237.175 24.072 237.445 24.2282 237.741 24.308C238.832 24.6033 243.217 24.6033 243.217 24.6033C243.217 24.6033 247.601 24.6033 248.693 24.308C248.989 24.2282 249.259 24.072 249.476 23.8551C249.693 23.6381 249.849 23.3679 249.929 23.0717C250.133 21.9588 250.231 20.8294 250.224 19.6981C250.231 18.5669 250.133 17.4374 249.929 16.3246ZM241.815 21.8004V17.5959L245.454 19.6981L241.815 21.8004Z"
        fill="#1F2A6B"
      />
      <path
        d="M241.822 17.5918V21.8048L245.459 19.6983L241.822 17.5918Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip3_0_8">
        <rect
          width="14"
          height="14.8235"
          fill="white"
          transform="translate(123.875 11.4592)"
        />
      </clipPath>
      <clipPath id="clip5_0_8">
        <rect
          width="14"
          height="13.1765"
          fill="white"
          transform="translate(179.875 12.533)"
        />
      </clipPath>
      <clipPath id="clip7_0_8">
        <rect
          width="15"
          height="10.5"
          fill="white"
          transform="translate(235.59 14.1211)"
        />
      </clipPath>
    </defs>
  </svg>
);

const SocialIcon = ({
  offset,
  href,
  label,
}: {
  offset: number;
  href: string;
  label: string;
}) => (
  <a
    href={href}
    aria-label={label}
    className="w-[38px] h-[38px] rounded-full bg-[#FAFAFA] flex items-center justify-center transition-all hover:-translate-y-1 shadow-sm overflow-hidden border border-black/5"
  >
    <SocialSprite offset={offset} />
  </a>
);

export default function Footer({ dict }: FooterProps) {
  const pathname = usePathname();
  const currentLocale = pathname.startsWith("/ar") ? "ar" : "en";

  return (
    <footer className="w-full relative" style={{ backgroundColor: "#E8EBFA" }}>
      <div className="mx-auto w-full max-w-[1440px] pt-[40px] md:pt-[60px] flex flex-col items-center gap-[32px]">
        {/* Main Content Area */}
        <div className="w-full max-w-[1240px] px-6 mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8">
          {/* Column 1: Brand & Socials */}
          <div className="flex flex-col gap-[24px] max-w-[384px]">
            <Link
              href={`/${currentLocale}`}
              className="inline-block text-primary"
            >
              <Logo width={300} height={60} />
            </Link>
            <p className="text-[18px] leading-[1.6] text-[#1A1A1A] opacity-70 font-normal max-md:text-center">
              {dict.description}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-[18px] mt-2">
              <SocialIcon
                offset={0}
                href={dict.social.facebook}
                label={dict.socialLabels.facebook}
              />
              <SocialIcon
                offset={56}
                href={dict.social.linkedin}
                label={dict.socialLabels.linkedin}
              />
              <SocialIcon
                offset={112}
                href={dict.social.instagram}
                label={dict.socialLabels.instagram}
              />
              <SocialIcon
                offset={168}
                href={dict.social.twitter}
                label={dict.socialLabels.twitter}
              />
              <SocialIcon
                offset={224}
                href={dict.social.youtube}
                label={dict.socialLabels.youtube}
              />
            </div>
          </div>

          {/* Column 2: Legal */}
          <div className="flex flex-col gap-[16px] w-[190px]">
            <h3 className="text-[24px] font-semibold text-[#1F2A6B] leading-[1.21]">
              {dict.legal}
            </h3>
            <Link
              href={`/${currentLocale}/privacy`}
              className="text-[18px] text-[#1A1A1A] opacity-70 hover:opacity-100 transition-opacity"
            >
              {dict.bottomLinks.privacy}
            </Link>
            <Link
              href={`/${currentLocale}/terms`}
              className="text-[18px] text-[#1A1A1A] opacity-70 hover:opacity-100 transition-opacity"
            >
              {dict.bottomLinks.terms}
            </Link>
            <Link
              href={`/${currentLocale}/security`}
              className="text-[18px] text-[#1A1A1A] opacity-70 hover:opacity-100 transition-opacity"
            >
              {dict.bottomLinks.security}
            </Link>
          </div>

          {/* Column 3: Links */}
          <div className="flex flex-col gap-[16px] w-[120px]">
            <h3 className="text-[24px] font-semibold text-[#1F2A6B] leading-[1.21]">
              {dict.quickLinks}
            </h3>
            <Link
              href={`/${currentLocale}/about`}
              className="text-[18px] text-[#1A1A1A] opacity-70 hover:opacity-100 transition-opacity"
            >
              {dict.links.about}
            </Link>
            <Link
              href={`/${currentLocale}/blog`}
              className="text-[18px] text-[#1A1A1A] opacity-70 hover:opacity-100 transition-opacity"
            >
              {dict.links.blog}
            </Link>
            <a
              href="https://docs.asklyze.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[18px] text-[#1A1A1A] opacity-70 hover:opacity-100 transition-opacity"
            >
              {dict.links.docs}
            </a>
          </div>

          {/* Column 4: Location */}
          <div className="flex flex-col gap-[16px] max-w-[280px]">
            <h3 className="text-[24px] font-semibold text-[#1F2A6B] leading-[1.21]">
              {dict.location}
            </h3>
            <p className="text-[18px] text-[#1A1A1A] opacity-70 leading-[1.4]">
              {dict.nycOffice}
            </p>
            <p className="text-[18px] text-[#1A1A1A] opacity-70 leading-[1.4]">
              {dict.alexOffice}
            </p>
          </div>
        </div>

        {/* Copyright Area */}
        <div className="w-full flex justify-center items-center py-[15px] px-[20px] md:px-[231px] min-h-[66px] mt-4">
          <p className="text-[16px] leading-normal text-[#1A1A1A] font-normal text-center">
            {dict.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
