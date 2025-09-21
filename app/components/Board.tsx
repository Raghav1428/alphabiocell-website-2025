"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/use-outside-click";
import styles from "./board.module.css";

export function Board() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const [mounted, setMounted] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const justOpenedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";

      // Prevent immediate outside-click close from the opening click
      justOpenedRef.current = true;
      setTimeout(() => {
        justOpenedRef.current = false;
      }, 0);
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(
    ref,
    () => {
      if (justOpenedRef.current) {
        return;
      }
      setActive(null);
    },
    Boolean(active && typeof active === "object")
  );

  const layout = [3, 4, 4];
  const rows: Array<typeof cards> = [];
  {
    let start = 0;
    for (const count of layout) {
      rows.push(cards.slice(start, start + count));
      start += count;
    }
  }

  return (
    <>
      {mounted
        ? createPortal(
            <AnimatePresence>
              {active && typeof active === "object" ? (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto p-4 md:p-10">
                  {/* Background overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[1000] h-full w-full bg-black/70 backdrop-blur-sm"
                  />

                  {/* Modal */}
                  <motion.div
                    key={`modal-${(active as any)?.title}-${id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layoutId={`card-${(active as any)?.title}-${id}`}
                    ref={ref}
                    className="relative z-[1010] w-full max-w-[500px] max-h-[90vh] flex flex-col bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-xl box-border !p-6 md:!p-8 gap-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label={(active as any)?.title}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <motion.div layoutId={`image-${(active as any)?.title}-${id}`}>
                      <img
                        width={200}
                        height={200}
                        src={(active as any)?.src}
                        alt={(active as any)?.title}
                        className="w-full h-80 object-cover object-top"
                      />
                    </motion.div>

                    <button
                      className="absolute top-3 right-3 z-[1020] flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow"
                      onClick={() => {
                        setActive(null);
                      }}
                      aria-label="Close"
                    >
                      <CloseIcon />
                    </button>

                    <div>
                      <div className="flex justify-between items-start gap-4 px-6 py-4">
                        <div className="space-y-1 pr-2">
                          <motion.h3
                            layoutId={`title-${(active as any)?.title}-${id}`}
                            className="font-medium text-neutral-700 dark:text-neutral-200 text-base leading-snug"
                          >
                            {(active as any)?.title}
                          </motion.h3>
                          <motion.p
                            layoutId={`description-${(active as any)?.description}-${id}`}
                            className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed"
                          >
                            {(active as any)?.description}
                          </motion.p>
                        </div>

                        <motion.a
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          href={(active as any)?.ctaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center h-10 w-10 rounded-full bg-[#0A66C2] hover:bg-[#084d94] text-white shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]/50"
                          aria-label="Connect on LinkedIn"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
                            <path d="M20.447 20.452H17.21v-5.569c0-1.329-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.943v5.663H9.001V9h3.106v1.561h.044c.433-.82 1.49-1.685 3.067-1.685 3.282 0 3.888 2.16 3.888 4.972v6.604zM5.337 7.433a1.804 1.804 0 1 1 0-3.609 1.804 1.804 0 0 1 0 3.609zM6.957 20.452H3.714V9h3.243v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </motion.a>
                      </div>
                      <div className="pt-2 relative px-6 pb-8">
                        <motion.div
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-neutral-600 text-sm md:text-base leading-relaxed max-h-[40vh] overflow-auto dark:text-neutral-400 p-6 space-y-4 [mask:linear-gradient(to_bottom,white,white,rgba(255,255,255,0.75)_93%,transparent_100%)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                        >
                          {typeof (active as any)?.content === "function"
                            ? (active as any)?.content()
                            : (active as any)?.content}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}

      {/* Centered Board section with 3/4/4 rows and smaller cards */}
      <section className="w-full flex justify-center py-12">
        <div className="w-full max-w-6xl px-4">
          <h2 className={`${styles.boardTitle} site-font`}>
            Meet the Board
          </h2>
          <p className={`${styles.boardSubtitle} site-font`}>
            The passionate minds driving innovation and excellence in biotechnology
          </p>
          {rows.map((row, rowIdx) => {
            if (rowIdx === 0) {
              return (
                <div key={`row-${rowIdx}`} className="w-full flex justify-center gap-6">
                  {row.map((card) => (
                    <motion.div
                      layoutId={`card-${card.title}-${id}`}
                      key={card.title}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActive(card);
                      }}
                      className={`${styles.boardCard} p-3 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg cursor-pointer`}
                    >
                      <div className="flex gap-3 flex-col w-full">
                        <motion.div layoutId={`image-${card.title}-${id}`}>
                          <img
                            width={100}
                            height={100}
                            src={card.src}
                            alt={card.title}
                            className="h-40 w-full rounded-md object-cover object-top"
                          />
                        </motion.div>
                        <div className="flex justify-center items-center flex-col">
                          <motion.h3
                            layoutId={`title-${card.title}-${id}`}
                            className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-sm site-font"
                          >
                            {card.title}
                          </motion.h3>
                          <motion.p
                            layoutId={`description-${card.description}-${id}`}
                            className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-xs site-font"
                          >
                            {card.description}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              );
            }

            return (
              <div
                key={`row-${rowIdx}`}
                className={`${styles.boardRow} ${rowIdx === 0 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"} ${rowIdx > 0 ? styles.boardRowSpacing : ""}`}
              >
                {row.map((card) => (
                  <motion.div
                    layoutId={`card-${card.title}-${id}`}
                    key={card.title}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActive(card);
                    }}
                    className={`${styles.boardCard} p-3 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg cursor-pointer`}
                  >
                    <div className="flex gap-3 flex-col w-full">
                      <motion.div layoutId={`image-${card.title}-${id}`}>
                        <img
                          width={100}
                          height={100}
                          src={card.src}
                          alt={card.title}
                          className="h-40 w-full rounded-md object-cover object-top"
                        />
                      </motion.div>
                      <div className="flex justify-center items-center flex-col">
                        <motion.h3
                          layoutId={`title-${card.title}-${id}`}
                          className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-sm"
                        >
                          {card.title}
                        </motion.h3>
                        <motion.p
                          layoutId={`description-${card.description}-${id}`}
                          className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-xs"
                        >
                          {card.description}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Chairperson",
    title: "Afnan Kausar Rahman",
    src: "Board/afnan.webp",
    ctaText: "Connect",
    ctaLink: "https://www.linkedin.com/",
    content: () => {
      return (
        <p>
          Meet the ultimate multitasker and the captain of our ship: steering us through every challenge with a clear vision and mission. A dedicated and disciplined individual, he gracefully balances research and organisational work of the club, all while staying ten steps ahead with biotech-savvy foresight. With strong analytical skills, a structured approach, and a knack for making things happen, he juggles responsibilities like a pro, always ensuring the team achieves its best. Lowkey a workaholic (jk) and our very own Harry Potter doppelgänger, he leads with composure, listens with intent, and guides with steady commitment, making him the driving force behind every success we accomplish together.
        </p>
      );
    },
  },
  {
    description: "Vice Chairperson",
    title: "Arooshi Sethi",
    src: "Board/arooshi.webp",
    ctaText: "Connect",
    ctaLink: "https://www.linkedin.com/",
    content: () => {
      return (
        <p>
          She’s the calm in the storm, the glue in the chaos, and the steady hand in the madness; always composed, dependable, and ready to take charge. Skilled in conflict resolution and decision-making, she finds balance where others don’t see any. A creative genius and problem-solving wizard, she manages to grind hard while still keeping the vibes alive, effortlessly blending responsibility with fun. Reliable, brilliant, and well-rounded, she ensures academic and organisational goals are met with precision, while her intelligence, composure, and positivity keep the club running smoothly and the energy immaculate.
        </p>
      );
    },
  },
  {
    description: "Secretary",
    title: "Rogini Varshini",
    src: "Board/rogini.webp",
    ctaText: "Connect",
    ctaLink: "https://www.linkedin.com/",
    content: () => {
      return (
        <p>
          Meet our very own SheEO: the Perfectionist, the Powerhouse, the Shooting Star. Hardworking, intelligent, and fiercely reliable, she’s the definition of girlboss energy, always in control and always delivering with precision and efficiency. She speaks through her work—turning mission impossible into mission accomplished with focus, determination, and sharp solutions. Calm under pressure and multi-talented, she balances everything with grace, effortlessly managing multiple responsibilities while making it all look easy. Dynamic and dedicated, she’s the shining star who keeps everything on track and inspires everyone around her.
        </p>
      );
    },
  },
  {
    description: "Co-Secretary",
    title: "Ramani Srinivasan",
    src: "Board/ramani.webp",
    ctaText: "Connect",
    ctaLink: "https://www.linkedin.com/",
    content: () => {
      return (
        <p>
          He’s the human embodiment of a Chill Pill—the composed and approachable presence who vibes through life like a Zen Master while still achieving endlessly. His calm demeanour, patience, and sense of humour create a positive, welcoming environment where everyone feels at ease. Balancing a relaxed outlook with a strong sense of responsibility, he’s the butterfly effect in action; not chasing success, just enjoying the ride, and somehow making everything fall into place. Cool, funny, and effortlessly engaging, he’s both an entertainer and a dependable team player, dropping unexpected bangers when it matters most while keeping the spirit, the vibes, and the dedication alive.
        </p>
      );
    },
  },
  {
    description: "Events Head",
    title: "Shrijan Kashyap",
    src: "Board/shrijan.webp",
    ctaText: "Connect",
    ctaLink: "https://www.linkedin.com/",
    content: () => {
      return (
        <p>
          She’s the club’s very own creative powerhouse; the human Pinterest board, pop culture expert, and dynamic mind behind some of our most unforgettable events. With her innovative ideas, strong sense of aesthetics, and trend-savvy outlook, she brings a unique perspective that makes every project bigger, brighter, and more impactful. A true Swiftie, Barbiecore enthusiast, and resident fashionista, she infuses everything with bubbly, unstoppable, pink-powered energy while ensuring that events are executed with precision and flair. Fun, resourceful, and endlessly imaginative, she’s not just the spark but the whole fire that keeps our club lit.
        </p>
      );
    },
  },
  {
    description: "Research Head",
    title: "Oviya Sundar",
    src: "Board/oviya.webp",
    ctaText: "Connect",
    ctaLink: "https://www.linkedin.com/",
    content: () => {
      return (
        <p>
          Meet our Innovator-in-Chief: an extraordinary blend of analytical precision and creative vision. A true powerhouse of research, workshops, and hackathons, she turns challenges into opportunities, crafting new ideas with both logic and flair. She has a remarkable gift for making science engaging and accessible, designing interactive concepts that draw people in and spark curiosity. With her calm and methodical approach, she ensures excellence in everything she undertakes. Sharp, passionate, and endlessly inventive, she is the calm yet unstoppable force that drives innovation and keeps the team thriving.
        </p>
      );
    },
  },
  {
    description: "Finance Head",
    title: "Sruthi Kumaran",
    src: "Board/sruthi.webp",
    ctaText: "Connect",
    ctaLink: "https://www.linkedin.com/",
    content: () => {
      return (
        <p>
          She’s the Deal Maker, the Silent Powerhouse, and the brain behind the operation. Whether it’s securing sponsorships, managing budgets, or solving complex problems, she handles it all with foresight and efficiency. A relentless achiever who works in the background, she transforms challenges into solutions. Dependable yet dynamic, she defines what it means to be a true hustler, delivering excellence, offering support, and ensuring that everything falls seamlessly into place.
        </p>
      );
    },
  },
  {
    description: "Outreach Head",
    title: "Iraiyanbu M",
    src: "Board/iraiyanbu.webp",
    ctaText: "Connect",
    ctaLink: "https://www.linkedin.com/",
    content: () => {
      return (
        <p>
          He is a skilled a creative master whose technical expertise and sharp eye for aesthetics transform raw ideas into polished, impactful content. With impressive editing skills, unique vision, and meticulous precision, he ensures that every reel, transition, and frame stands out with cinematic brilliance. Organised, composed, and clear-headed, he thrives on clean execution and creativity, letting his work speak louder than words. A quiet genius and calm strategist, he consistently delivers results that set a high standard, making him the mastermind behind the screens and a true force of perfection.
        </p>
      );
    },
  },
  {
    description: "Design Head",
    title: "Oishee Shown",
    src: "Board/oishee.webp",
    ctaText: "Connect",
    ctaLink: "https://www.linkedin.com/",
    content: () => {
      return (
        <p>
          She is Our Very Own Sunshine Scribbler: a highly creative and enthusiastic individual whose dedication and imagination consistently elevate every project she touches. The Picasso of the group, she radiates bubbly energy, boundless enthusiasm, and a clear vision that transforms ideas into brilliance. With a natural knack for design and innovation, she constantly brings fresh, out-of-the-box perspectives that push the team’s work to the next level. A true team player - always supportive, encouraging, and making hard work look effortless.
        </p>
      );
    },
  },
  {
    description: "Editorial Head",
    title: "Amritha A S",
    src: "Board/amritha.webp",
    ctaText: "Connect",
    ctaLink: "https://www.linkedin.com/",
    content: () => {
      return (
        <p>
          Meet The Wordsmith Extraordinaire - a versatile individual whose mastery of language gives our club its voice. The mind behind some of our best writings, she has an uncanny ability to turn thoughts into perfectly woven words. Sharp, diligent, and endlessly creative, she brings clarity, vision, and innovation to every project, consistently raising the standard and transforming ideas into masterpieces. A true all-rounder and force of talent, she doesn’t just contribute—she inspires, shapes, and elevates everything she touches.
        </p>
      );
    },
  },
  {
    description: "Creative Head",
    title: "Akshita Sriram",
    src: "Board/akshita.webp",
    ctaText: "Connect",
    ctaLink: "https://www.linkedin.com/",
    content: () => {
      return (
        <p>
          Meet the Cheerleader, the one who radiates good vibes and turns every moment into a masterpiece. With a charm that’s effortlessly magnetic and creativity that overflows, she’s the glue that brings people together and makes everyone feel like they belong. Enthusiastic, dynamic, and endlessly expressive, she thrives in every space: dropping genius ideas, hyping everyone up, and adding her own fire. Adorable, vibrant, and impossible not to love, she makes everything ten times more fun, and let’s be real, no one is more pookie than her.
        </p>
      );
    },
  },
];
