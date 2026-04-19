"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect, ReactNode } from "react";
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
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(itemsPerPage);
  const [isMounted, setIsMounted] = useState(false);

  // Handle responsive items per page
  useEffect(() => {
    setIsMounted(true);

    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setCurrentItemsPerPage(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setCurrentItemsPerPage(Math.min(2, itemsPerPage)); // Tablet
      } else {
        setCurrentItemsPerPage(itemsPerPage); // Desktop
      }
    };

    // Set initial value
    updateItemsPerPage();

    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, [itemsPerPage]);

  const maxIndex = Math.max(0, items.length - currentItemsPerPage);

  // Prevent index out of bounds when resizing screen
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  // Wait for client to mount to avoid hydration mismatch on mobile
  const visibleItems = isMounted
    ? items.slice(currentIndex, currentIndex + currentItemsPerPage)
    : items.slice(0, itemsPerPage);

  const handlePrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

  return (
    <div className={cn("flex flex-col gap-10 w-full", className)}>
      {/* Items Row */}
      {visibleItems.length > 0 ? (
        <div
          className={cn(
            "flex flex-row w-full items-stretch transition-all duration-300",
            // These two classes force the sliced items to share space equally
            "*:flex-1 *:min-w-0",
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
        <div>{renderExtraActions ? renderExtraActions() : <div />}</div>

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
