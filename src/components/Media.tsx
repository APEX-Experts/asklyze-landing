import React from "react";
import Image from "next/image";
import { Media as MediaType } from "@/../payload-types";

interface MediaProps {
  resource: string | MediaType;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  alt?: string;
}

export const Media: React.FC<MediaProps> = (props) => {
  const {
    resource,
    className,
    fill,
    width,
    height,
    priority,
    alt: altFromProps,
  } = props;

  if (!resource) return null;

  const isString = typeof resource === "string";
  const url = isString ? resource : resource.url;
  const mimeType = isString ? "" : resource.mimeType;
  const alt = altFromProps || (isString ? "" : resource.alt) || "Media";

  const isVideo =
    mimeType?.startsWith("video/") ||
    url?.endsWith(".mp4") ||
    url?.endsWith(".webm") ||
    url?.endsWith("mkv");

  if (!url) return null;

  if (isVideo) {
    return (
      <video
        src={url || ""}
        className={className}
        autoPlay
        loop
        muted
        playsInline
      />
    );
  }

  // Use Next.js Image for images
  return (
    <Image
      src={url || ""}
      alt={alt}
      className={className}
      fill={fill}
      width={
        !fill
          ? width ||
            (typeof resource !== "string" ? resource.width || 1000 : 1000)
          : undefined
      }
      height={
        !fill
          ? height ||
            (typeof resource !== "string" ? resource.height || 1000 : 1000)
          : undefined
      }
      priority={priority}
    />
  );
};
