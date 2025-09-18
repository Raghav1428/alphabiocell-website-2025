"use client";

import React from "react";
import { Carousel, Card } from "../components/ui/apple-cards-carousel";
import styles from "./events.module.css";

// Define the event type first
interface ClubEvent {
  category: string;
  title: string;
  src: string;
  date: string;
  time: string;
  location: string;
  description1: string;
  image1: string;
  description2: string;
  image2: string;
  description3: string;
  image3: string;
}

// Define EventContent component
const EventContent = ({ event }: { event: ClubEvent }) => {
  return (
    <div className={styles.eventContent}>
      <div className={styles.eventModalContent}>
        {/* Title and Category moved into content area above date */}
        <div className={styles.eventHeader}>
        <h1 className={styles.eventTitle}>{event.title}</h1>
          {event.category && (
            <h3 className={styles.eventCategory}>{event.category}</h3>
          )}
          
        </div>
        
        <p className={styles.eventDescription}>{event.description1}</p>
        
        <div className={styles.eventImage}>
          <img
            src={event.image1}
            alt={`${event.title} - image 1`}
            className={styles.image}
          />
        </div>
        
        <p className={styles.eventDescription}>{event.description2}</p>
        
        <div className={styles.eventImage}>
          <img
            src={event.image2}
            alt={`${event.title} - image 2`}
            className={styles.image}
          />
        </div>
        
        <p className={styles.eventDescription}>{event.description3}</p>
        
        <div className={styles.eventImage}>
          <img
            src={event.image3}
            alt={`${event.title} - image 3`}
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

// Define the events data (replaced with real events)
const clubEvents: ClubEvent[] = [
  {
    category: "Ideathon",
    title: "Plasmyth",
    src: "Events/plasmyth/1.webp",
    date: "July 31 – Aug 1, 2025",
    time: "—",
    location: "VIT Vellore (SBST) in collaboration with iGEM VIT",
    description1: "A two-day ideathon that brought the spirit of iGEM into a fast-paced competition. Participants navigated brainstorming, troubleshooting, commercialization, and pitching rounds, testing scientific rigor, creativity, and entrepreneurship.",
    image1: "Events/plasmyth/1.webp",
    description2: "Guest talk by Dr. Santhanam P highlighted marine bioprospecting and inspired beyond-traditional thinking. Teams worked on innovative solutions to real-world synthetic biology challenges.",
    image2: "Events/plasmyth/2.webp",
    description3: "The event culminated in a series of pitches where teams presented their solutions to a panel of judges from academia and industry, showcasing the intersection of scientific innovation and entrepreneurial thinking.",
    image3: "Events/plasmyth/3.webp"
  },
  {
    category: "Hackathon",
    title: "AlphaForge 2.0",
    src: "Events/alphaforge/1.webp",
    date: "March 25–27, 2025",
    time: "—",
    location: "Alpha Bio Cell x IIC",
    description1: "A three-day innovation hackathon uniting aspiring bioengineers, entrepreneurs, and innovators. Teams tackled real-world problems and crafted creative solutions to pressing challenges in biotechnology.",
    image1: "Events/alphaforge/1.webp",
    description2: "Participants received mentorship from industry experts and academic leaders, helping them refine their ideas and develop viable prototypes during intensive brainstorming and development sessions.",
    image2: "Events/alphaforge/2.webp",
    description3: "The event concluded with teams pitching to industrial experts, with feedback from esteemed judges and guest speakers, focusing on innovation, feasibility, and potential impact in the biotechnology sector.",
    image3: "Events/alphaforge/3.webp"
  },
  {
    category: "Workshop",
    title: "Hack‑a‑Pill",
    src: "Events/hack-a-pill/1.webp",
    date: "February 4, 2025",
    time: "—",
    location: "Yantra '24, Alpha Bio Cell",
    description1: "An immersive workshop on AI/ML in drug discovery led by Dr. Mukesh Doble. The session began with an introduction to the fundamentals of drug discovery and the growing role of artificial intelligence in accelerating research.",
    image1: "Events/hack-a-pill/1.webp",
    description2: "Participants explored physicochemical foundations and engaged in practical model building with Weka, learning how to implement machine learning algorithms for pharmaceutical applications.",
    image2: "Events/hack-a-pill/2.webp",
    description3: "The workshop concluded with real-time applications to predict pharmacokinetic properties from molecular structures, followed by networking and mentorship opportunities with professionals in the field.",
    image3: "Events/hack-a-pill/3.webp"
  },
  {
    category: "Hackathon",
    title: "Project 2039",
    src: "Events/project2039/1.webp",
    date: "—",
    time: "—",
    location: "Alpha Bio Cell",
    description1: "A premium two-day immersive hackathon exploring what the world will need in 2039. The event kicked off with teams identifying future challenges and opportunities in biotechnology, healthcare, and environmental sustainability.",
    image1: "Events/project2039/1.webp",
    description2: "Day one featured poster presentations where teams showcased their vision for addressing future challenges, followed by fiery courtroom-style debates defending their approaches and methodologies.",
    image2: "Events/project2039/2.webp",
    description3: "The hackathon culminated in final pitches to an expert panel, with projects judged on feasibility, scalability, and real-world relevance, emphasizing solutions that could bridge current technologies with future needs.",
    image3: "Events/project2039/3.webp"
  },
  {
    category: "Debate",
    title: "DebDuel",
    src: "Events/debduel/1.webp",
    date: "November 13, 2024",
    time: "—",
    location: "Alpha Bio Cell",
    description1: "A rapid-fire debate on pressing biotech issues—from genetic engineering ethics to conservation. The event began with an introduction to key ethical dilemmas in modern biotechnology and their implications for society.",
    image1: "Events/debduel/1.webp",
    description2: "Participants were assigned on-the-spot topics and positions, requiring them to quickly develop and articulate arguments on complex issues such as CRISPR ethics, biopiracy, and the balance between innovation and regulation.",
    image2: "Events/debduel/2.webp",
    description3: "The debates fostered critical thinking, ethical reasoning, and an appreciation of diverse perspectives, with judges evaluating participants on the strength of their arguments, rebuttals, and ability to consider multiple viewpoints.",
    image3: "Events/debduel/3.webp"
  },
  {
    category: "Workshop",
    title: "Proteoprediction",
    src: "Events/proteoprediction/1.webp",
    date: "November 8, 2024",
    time: "—",
    location: "Alpha Bio Cell",
    description1: "An immersive workshop bridging traditional biology with modern computation. Led by Dr. Hussain Bhukya from IISER Tirupati, the session began with an overview of protein structure and function analysis.",
    image1: "Events/proteoprediction/1.webp",
    description2: "Participants learned practical skills in NCBI sequence analysis, exploring databases and tools for protein structure prediction, functional annotation, and evolutionary analysis.",
    image2: "Events/proteoprediction/2.webp",
    description3: "The workshop concluded with an introduction to machine learning applications in proteomics, demonstrating how computational approaches are revolutionizing our understanding of protein function and enabling new discoveries in biotechnology.",
    image3: "Events/proteoprediction/3.webp"
  },
];

// Transform events to include content for the carousel
const eventsWithContent = clubEvents.map(event => ({
  ...event,
  content: <EventContent event={event} />
}));

export function Events() {
  const events = eventsWithContent.map((event, index) => (
    <Card key={event.src} card={event} index={index} layout={true} />
  ));

  return (
    <section className={styles.eventsSection}>
      <div className={styles.eventsContainer}>
        <h2 className={styles.eventsTitle}>
          Discover Our Club Events
        </h2>
        <p className={styles.eventsSubtitle}>
          Join us in exploring the fascinating world of biotechnology and innovation
        </p>
        <Carousel items={events} />
      </div>
    </section>
  );
}
