"use client"

import dynamic from 'next/dynamic';
import styles from "./hero.module.css";
const LottiePlayer = dynamic(() => import('@lottiefiles/react-lottie-player').then(mod => mod.Player), { 
  ssr: false,
});


export default function Hero() {
  return (
    <section className={styles.page1}>
      <div className={styles.center}>
        <div className={styles.left}>
          <h3>
            We believe in tapping into the untapped — exploring the limitless
            opportunities biology offers across scientific domains.
          </h3>
        </div>
        <div className={styles.right}>
          <h1>
            CLUB <br /> THAT <br /> INNOVATES
          </h1>
        </div>
      </div>

      <div className={styles.heroShape}>
        <div className={styles.hero1} />
        <div className={styles.hero2} />
        <div className={styles.hero3} />
      </div>

      <div className={styles.facultyWrapper}>
        {/* 🎬 Background animation */}
        <LottiePlayer
          autoplay
          loop
          speed={0.8}
          src="/DNAHelix.json"
          className={`${styles.lottieFacultyBg} ${styles.helix1}`}
        />
        <LottiePlayer
          autoplay
          loop
          speed={0.8}
          src="/DNAHelix2.json"
          className={`${styles.lottieFacultyBg} ${styles.helix2}`}
        />

        {/* Cards on top */}
        <div className={styles.faculty}>
          <div className={styles.card}>
            <img src="Faculty/RameshPathySir.webp" alt="Faculty placeholder" />
            <div className={styles.info}>
              <h4>
                <strong>Dr. Ramesh Pathy Manian</strong>
              </h4>
              <p className={styles.designation}>
                Professor Grade I, Department of Biotechnology
              </p>
              <p>
              Dr. Ramesh Pathy Manian, Professor in the School of Biosciences and Technology, serves as the Faculty Coordinator of our club. With 18 years of academic experience and specialised expertise in Biocatalysts and Biofuels, he shares invaluable technical, academic, and professional support to our members. His mentorship ensures that the club's activities are smooth, and his encouragement motivates the club to pursue its goals with confidence. We’re deeply grateful for his tireless contributions.
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <img src="Faculty/SuthindiranSir.webp" alt="Faculty placeholder" />
            <div className={styles.info}>
              <h4>
                <strong>Dr. Suthindiran K</strong>
              </h4>
              <p className={styles.designation}>
                Head of Department, Bio-Medical Sciences
              </p>
              <p>
              Dr. Suthindiran K, Head of the Department of Bio-Medical Sciences, is the Faculty Coordinator of our club. Holding a Master’s in Biotechnology and Microbiology and a Doctorate in Marine Biotechnology, along with 15 years of teaching experience, he specialises in Marine Biotechnology, Microbial Diversity, and Metagenomics. Through his mentorship, members get constant academic and professional insights, and his involvement ensures that the club’s progress is steadfast. We extend our sincere gratitude for his presence in this club.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
