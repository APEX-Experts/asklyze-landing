"use client";

import { useRef, useState, useEffect, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  SceneCard — renders an iframe inside a contained card, auto-scaled */
/* ------------------------------------------------------------------ */
export default function SceneCard({
    src,
    iframeWidth = 1000,
    iframeHeight = 700,
    title,
}: {
    src: string;
    iframeWidth?: number;
    iframeHeight?: number;
    title: string;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.5);

    const updateScale = useCallback(() => {
        if (cardRef.current) {
            const containerWidth = cardRef.current.clientWidth;
            setScale(containerWidth / iframeWidth);
        }
    }, [iframeWidth]);

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        const observer = new ResizeObserver(() => updateScale());
        observer.observe(el);
        updateScale();
        return () => observer.disconnect();
    }, [updateScale]);

    return (
        <div
            ref={cardRef}
            className="relative overflow-hidden w-full"
            style={{
                background: "rgba(5, 5, 10, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "var(--card-radius)",
                height: `${Math.max(iframeHeight * scale, 260)}px`,
            }}
        >
            {/* Browser window dots */}
            <div className="absolute top-4 left-5 flex gap-2 z-10">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.10)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.10)" }} />
            </div>

            <iframe
                src={src}
                className="absolute top-0 left-0 border-0 outline-none select-none pointer-events-none"
                style={{
                    width: `${iframeWidth}px`,
                    height: `${iframeHeight}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                    background: "transparent",
                }}
                title={title}
            />
        </div>
    );
}
