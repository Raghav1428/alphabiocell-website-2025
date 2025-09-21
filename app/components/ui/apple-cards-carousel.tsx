"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/app/lib/utils";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/app/hooks/use-outside-click";

interface CarouselProps {
  items: React.ReactElement[];
  initialScroll?: number;
}

type CardData = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full" style={{ background: "#EFEAE3" }}>
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
          ref={carouselRef}
          onScroll={checkScrollability}
          style={{ background: "#EFEAE3" }}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-8 pl-6",
              "mx-auto max-w-7xl",
            )}
            style={{ background: "#EFEAE3" }}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div
          className="mr-10 flex justify-end gap-2"
          style={{ background: "#EFEAE3" }}
        >
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: CardData;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useOutsideClick(
    containerRef as React.RefObject<HTMLDivElement>,
    () => handleClose(),
    open,
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      {mounted && typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {open && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto p-4 md:p-10">
                  {/* Background overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[1000] h-full w-full bg-black/80 backdrop-blur-lg"
                  />
                  {/* Modal */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    ref={containerRef}
                    layoutId={layout ? `card-${card.title}` : undefined}
                    className="relative z-[1010] h-fit max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-[#EFEAE3] font-sans shadow-xl site-font"
                    role="dialog"
                    aria-modal="true"
                    aria-label={card.title}
                  >
                    {/* Floating close button */}
                    <button
                      className="absolute top-4 right-4 z-[1020] flex h-10 w-10 items-center justify-center rounded-full bg-black hover:bg-gray-800 transition"
                      onClick={handleClose}
                      aria-label="Close"
                    >
                      <IconX className="h-6 w-6 text-white" />
                    </button>

                    {/* Content */}
                    <div className="pt-2 pb-6 px-6 overflow-y-auto max-h-[calc(90vh-100px)] abc-modal-scroll">
                      <div className="text-lg md:text-xl leading-relaxed text-gray-800">
                        {card.content}
                      </div>
                    </div>
                    {/* Hide modal scrollbar globally (styled-jsx) */}
                    <style jsx global>{`
                      .abc-modal-scroll {
                        scrollbar-width: none; /* Firefox */
                        -ms-overflow-style: none; /* IE/Edge */
                      }
                      .abc-modal-scroll::-webkit-scrollbar {
                        width: 0;
                        height: 0;
                        display: none; /* Chrome/Safari */
                      }
                    `}</style>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>,
            document.body,
          )
        : null}
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-[#EFEAE3] md:h-[40rem] md:w-96 dark:bg-neutral-900 p-2"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="relative z-40 p-8 pt-10">
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl px-2 site-font"
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          className="absolute inset-0 z-10 h-full w-full object-cover"
        />
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement> & { src: string }) => {
  const [isLoading, setLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    let cancelled = false;
    // Preload using a dedicated Image object — this helps detect cached images synchronously
    const pre = new Image();
    pre.src = src;
    if (pre.complete && pre.naturalWidth) {
      if (!cancelled) setLoading(false);
    } else {
      pre.onload = () => {
        if (!cancelled) setLoading(false);
      };
      pre.onerror = () => {
        if (!cancelled) setLoading(false);
      };
    }

    // Fallback: if ref already points to an element and it's complete
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth) {
      if (!cancelled) setLoading(false);
    }

    return () => {
      cancelled = true;
      pre.onload = null;
      pre.onerror = null;
    };
  }, [src]);
  const filterStyle = isLoading ? "blur(6px)" : "none";
  return (
    <img
      className={cn("h-full w-full", className)}
      style={{
        filter: filterStyle,
        transition: "filter 300ms ease, opacity 200ms ease",
        willChange: "filter, opacity, transform",
        imageRendering: "auto",
      }}
      onLoad={() => setLoading(false)}
      ref={(el) => {
        imgRef.current = el;
      }}
      src={src}
      width={width}
      height={height}
      loading="eager"
      decoding="async"
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
