"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemsPerPage?: number;
  lang?: "en" | "ar";
  className?: string;
  gap?: string;
  emptyMessage?: string;
  renderExtraActions?: () => ReactNode;
}

export default function Carousel<T>({
  items,
  renderItem,
  itemsPerPage = 3,
  lang = "en",
  className,
  gap = "gap-6",
  emptyMessage = "No items to display.",
  renderExtraActions,
}: CarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(0, items.length - itemsPerPage);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerPage);

  const handlePrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

  return (
    <div className={cn("flex flex-col gap-10 w-full", className)}>
      {/* Items Row */}
      {visibleItems.length > 0 ? (
        <div
          className={cn(
            "flex flex-row w-full items-stretch",
            gap,
            lang === "ar" ? "flex-row-reverse" : ""
          )}
        >
          {visibleItems.map((item, index) => renderItem(item, index))}

        </div>
      ) : (
        <p className="text-text-body text-center py-8">{emptyMessage}</p>
      )}

      {/* Navigation Row */}
      <div className="flex flex-row justify-between max-lg:flex-wrap items-center gap-8 min-h-[44px]">
        <div>
          {renderExtraActions ? renderExtraActions() : <div />}
        </div>
        
        <div
          className={cn(
            "flex items-center gap-3",
            lang === "ar" ? "flex-row-reverse" : ""
          )}
        >

          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            aria-label="Previous items"
            className={cn(
              "w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200",
              canGoPrev
                ? "bg-primary text-white cursor-pointer border-transparent hover:bg-primary-hover"
                : "cursor-not-allowed bg-primary-variant text-white"
            )}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            aria-label="Next items"
            className={cn(
              "w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200",
              canGoNext
                ? "bg-primary text-white cursor-pointer border-transparent hover:bg-primary-hover"
                : "cursor-not-allowed bg-primary-variant text-white"
            )}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
