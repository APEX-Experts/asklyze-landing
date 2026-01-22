"use client";

import { useEffect, useRef, useState } from "react";

interface OptimizedVideoProps {
    src: string;
    poster?: string;
    className?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    playsInline?: boolean;
    preload?: "none" | "metadata" | "auto";
    lazyLoad?: boolean;
}

export default function OptimizedVideo({
    src,
    poster,
    className = "",
    autoPlay = true,
    loop = true,
    muted = true,
    playsInline = true,
    preload = "metadata",
    lazyLoad = true,
}: OptimizedVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isInView, setIsInView] = useState(!lazyLoad);
    const [shouldLoad, setShouldLoad] = useState(!lazyLoad);

    useEffect(() => {
        if (!lazyLoad) return;

        const video = videoRef.current;
        if (!video) return;

        // Intersection Observer for lazy loading
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        // Start loading when video is close to viewport
                        setShouldLoad(true);
                    } else {
                        setIsInView(false);
                    }
                });
            },
            {
                rootMargin: "200px", // Start loading 200px before entering viewport
                threshold: 0.1,
            }
        );

        observer.observe(video);

        return () => {
            observer.disconnect();
        };
    }, [lazyLoad]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !shouldLoad) return;

        // Play video when in view, pause when out of view to save bandwidth
        if (isInView && autoPlay) {
            video.play().catch(() => {
                // Handle autoplay prevention by browsers
            });
        } else if (!isInView) {
            video.pause();
        }
    }, [isInView, autoPlay, shouldLoad]);

    return (
        <video
            ref={videoRef}
            className={className}
            autoPlay={false} // Controlled by useEffect
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            preload={shouldLoad ? preload : "none"}
            poster={poster}
            {...(shouldLoad && { src })}
        >
            {shouldLoad && <source src={src} type="video/mp4" />}
            Your browser does not support the video tag.
        </video>
    );
}
