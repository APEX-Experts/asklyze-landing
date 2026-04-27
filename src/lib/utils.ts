import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

export const formatPoint = (point?: string) =>
  typeof point === "string"
    ? point.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    : "";