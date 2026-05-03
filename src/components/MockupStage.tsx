"use client";

import "@/../public/mockup.css";
import { Dictionary } from "@/get-dictionary";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Media } from "./Media";
import { Media as MediaType } from "@/../payload-types";

// ----------------------------------------------------------------------
// Mockup Stage Component (Ported animations to Framer Motion)
// ----------------------------------------------------------------------

interface MockupStageProps {
  images?: Dictionary["hero"]["mockupImages"];
}

export default function MockupStage({ images }: MockupStageProps) {
  const defaultImage = "/screenshot1.jpg";

  // Prepare 5 slots for images, defaulting to /screenshot1.jpg
  const displayImages = Array.from({ length: 5 }).map((_, i) => {
    return images?.[i]?.image || defaultImage;
  });

  const [order, setOrder] = useState([0, 1, 2, 3, 4]);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isHovered || !mounted) return;
    const timer = setInterval(() => {
      setOrder((prev) => {
        const newOrder = [...prev];
        const last = newOrder.pop()!;
        newOrder.unshift(last);
        return newOrder;
      });
    }, 2600);
    return () => clearInterval(timer);
  }, [isHovered, mounted]);

  const getSlotStates = () => {
    const isTablet = windowWidth <= 980;
    const isMobile = windowWidth <= 640;
    const stageWidth = Math.min(windowWidth, 1160);

    if (isMobile) {
      return [
        { x: 0, y: 22, scale: 0.88, rotation: -7, opacity: 0, zIndex: 1 },
        { x: 0, y: 12, scale: 0.93, rotation: -4, opacity: 0, zIndex: 2 },
        { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, zIndex: 5 },
        { x: 0, y: 12, scale: 0.93, rotation: 4, opacity: 0, zIndex: 2 },
        { x: 0, y: 22, scale: 0.88, rotation: 7, opacity: 0, zIndex: 1 },
      ];
    }

    const nearX = Math.min(
      isTablet ? 170 : 230,
      stageWidth * (isTablet ? 0.23 : 0.2)
    );
    const farX = Math.min(
      isTablet ? 260 : 410,
      stageWidth * (isTablet ? 0.36 : 0.38)
    );
    const nearY = isTablet ? 26 : 36;
    const farY = isTablet ? 48 : 72;
    const farScale = isTablet ? 0.68 : 0.6;
    const nearScale = isTablet ? 0.82 : 0.84;

    return [
      {
        x: -farX,
        y: farY,
        scale: farScale,
        rotation: -13,
        opacity: 0.5,
        zIndex: 1,
      },
      {
        x: -nearX,
        y: nearY,
        scale: nearScale,
        rotation: -7,
        opacity: 0.86,
        zIndex: 3,
      },
      { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, zIndex: 5 },
      {
        x: nearX,
        y: nearY,
        scale: nearScale,
        rotation: 7,
        opacity: 0.86,
        zIndex: 3,
      },
      {
        x: farX,
        y: farY,
        scale: farScale,
        rotation: 13,
        opacity: 0.5,
        zIndex: 1,
      },
    ];
  };

  const slotStates = getSlotStates();

  if (!mounted) {
    return <div className="mockup-stage" style={{ opacity: 0 }} />;
  }

  return (
    <>
      <div
        className="mockup-stage pointer-events-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {displayImages.map((imgSrc, id) => {
          const visualIndex = order.indexOf(id);
          const state = slotStates[visualIndex];
          const isCenter = visualIndex === 2;

          return (
            <motion.div
              key={id}
              style={{
                position: "absolute",
                left: "50%",
                zIndex: state.zIndex,
              }}
              className="mock-container"
            >
              <motion.div
                initial={false}
                animate={{
                  x: state.x,
                  y: state.y,
                  scale: state.scale,
                  rotate: state.rotation,
                  opacity: state.opacity,
                }}
                transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
                style={{ originX: 0.5, originY: 1, translateX: "-50%" }}
              >
                <div
                  className={`mockup-card ${isCenter ? "is-center" : ""}`}
                  style={{
                    position: "relative",
                  }}
                >
                  <Media
                    resource={imgSrc as MediaType}
                    alt={`Mockup ${id}`}
                    className="mockup-card-image"
                    width={620}
                    height={460}
                  />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
