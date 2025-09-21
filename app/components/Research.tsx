"use client";

import React from "react";
import { Carousel, Card } from "./ui/apple-cards-carousel";
import styles from "./research.module.css";

interface ResearchItem {
  category: string; 
  title: string;
  src: string;
  images: string[];
}

const ResearchImageStack = ({ images }: { images: string[] }) => {
  return (
    <div className={styles.stackWrapper}>
      <div className={styles.imageStack}>
        {images.map((img, idx) => (
          <img key={idx} src={img} alt={`Research image ${idx + 1}`} className={styles.stackImage} />
        ))}
      </div>
    </div>
  );
};

const researchItems: ResearchItem[] = [
  {
    category: "Research",
    title: "Neurocons’s Personalized Diet",
    src: "/ABC_RESEARCH DIGEST/cover1.webp",
    images: [
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_6.webp",
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_7.webp",
    ],
  },
  {
    category: "Research",
    title: "Genetics and Environment",
    src: "/ABC_RESEARCH DIGEST/cover2.webp",
    images: [
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_8.webp",
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_9.webp",
    ],
  },
  {
    category: "Research",
    title: "Exercise and Obesity Treatment",
    src: "/ABC_RESEARCH DIGEST/cover3.webp",
    images: [
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_10.webp",
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_11.webp",
    ],
  },
  {
    category: "Research",
    title: "Ceremonial Swords",
    src: "/ABC_RESEARCH DIGEST/cover4.webp",
    images: [
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_12.webp",
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_13.webp",
    ],
  },
  {
    category: "Research",
    title: "Skin Cancer",
    src: "/ABC_RESEARCH DIGEST/cover5.webp",
    images: [
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_14.webp",
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_15.webp",
    ],
  },
  {
    category: "Research",
    title: "Irreversible Tumor Development",
    src: "/ABC_RESEARCH DIGEST/cover6.webp",
    images: [
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_16.webp",
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_17.webp",
    ],
  },
  {
    category: "Research",
    title: "Cardiovascular Health",
    src: "/ABC_RESEARCH DIGEST/cover7.webp",
    images: [
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_18.webp",
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_19.webp",
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_20.webp",
    ],
  },
  {
    category: "Research",
    title: "Cervical Cancer Treatment",
    src: "/ABC_RESEARCH DIGEST/cover8.webp",
    images: [
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_21.webp",
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_22.webp",
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_23.webp",
    ],
  },
  {
    category: "Research",
    title: "Cerebellar Ataxia Diagnosis",
    src: "/ABC_RESEARCH DIGEST/cover9.webp",
    images: [
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_24.webp",
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_25.webp",
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_26.webp",
    ],
  },
  {
    category: "Research",
    title: "Food Packaging",
    src: "/ABC_RESEARCH DIGEST/cover10.webp",
    images: [
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_27.webp",
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_28.webp",
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_29.webp",
    ],
  },
  {
    category: "Research",
    title: "Angioplasty and Stenting",
    src: "/ABC_RESEARCH DIGEST/cover11.webp",
    images: [
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_30.webp",
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_31.webp",
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_32.webp",
    ],
  },
  {
    category: "Research",
    title: "Anti-HBV Therapeutics",
    src: "/ABC_RESEARCH DIGEST/cover12.webp",
    images: [
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_33.webp",
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_34.webp",
    ],
  },
  {
    category: "Research",
    title: "Multi-omics Approach",
    src: "/ABC_RESEARCH DIGEST/cover13.webp",
    images: [
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_35.webp",
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_36.webp",
      "/ABC_RESEARCH DIGEST/ABC_RESEARCH DIGEST_37.webp",
    ],
  },
];

const researchCards = researchItems.map((item) => ({
  ...item,
  content: <ResearchImageStack images={item.images} />,
}));

export function Research() {
  const items = researchCards.map((card, index) => (
    <Card key={`${card.title}-${index}`} card={card as any} index={index} layout={true} />
  ));

  return (
    <section className={styles.researchSection}>
      <div className={styles.researchContainer}>
  <h2 className={`${styles.researchTitle} site-font`}>Our Research Digest</h2>
  <p className={`${styles.researchSubtitle} site-font`}>A Journal Review Compendium</p>
        <Carousel items={items} />
      </div>
    </section>
  );
}
