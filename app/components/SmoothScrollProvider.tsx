"use client";

import { useEffect, useRef } from "react";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!containerRef.current) return;

    let scrollInstance: any;

    const init = async () => {
      const module = await import("locomotive-scroll");
      const LocomotiveScroll = module.default;
      scrollInstance = new LocomotiveScroll({
        el: containerRef.current as HTMLElement,
        smooth: true,
      });
    };

    init();

    return () => {
      if (scrollInstance && typeof scrollInstance.destroy === "function") {
        scrollInstance.destroy();
      }
    };
  }, []);

  return (
    <div id="scroll-container" data-scroll-container ref={containerRef}>
      {children}
    </div>
  );
}
