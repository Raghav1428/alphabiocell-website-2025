import styles from "./marquee.module.css";

function Row() {
  return (
    <div className={styles.con}>
      <h1>BREATHE</h1><div className={styles.dot} />
      <h1>IN</h1><div className={styles.dot} />
      <h1>OPPORTUNITY</h1><div className={styles.dot} />
    </div>
  );
}

export default function Marquee() {
  return (
    <section className={styles.page2}>
      <div className={styles.moving}>
        <Row /><Row /><Row />
      </div>

      <div className={styles.contentSection}>
        <div className={styles.headingWrapper}>
          <h2 className={styles.mainHeading}>
            We are a vibrant community of passionate, like-minded individuals with diverse and complementary skill sets, 
            united by one mission: 
            to cultivate aspiring bioengineers to create forward-thinking solutions to real-world challenges in biotechnology, 
            sustainability, and beyond!
          </h2>
          <div className={styles.gooey}/>
        </div>
        
        <div className={styles.sideBySideLayout}>
          <div className={styles.bioSection}>
            <p className={styles.bioText}>
              We believe <span className={styles.bioHighlight}>biotechnology is more than a discipline</span>, it's a launchpad for leadership, a catalyst for innovation, and a driving force for change. <span className={styles.bioHighlight}>At the heart of our vision lies bio</span>:  a symbol of growth and possibility, enabling young innovators to breathe ideas, use opportunities, and create solutions that shape the future.
            </p>
          </div>

          <div className={styles.missionSection}>
            <h3>Our Mission:</h3>
            <div className={styles.missionItems}>
              <div className={styles.missionItem}>
                <div className={styles.missionDot}></div>
                <p><strong>Host Immersive Events:</strong> Hackathons, debates, and ideation challenges that bring together eager science enthusiasts</p>
              </div>
              <div className={styles.missionItem}>
                <div className={styles.missionDot}></div>
                <p><strong>Promote Interdisciplinary Research:</strong> Facilitating exploration across fields of science to create innovations and foster the intersection of biology and technology.</p>
              </div>
              <div className={styles.missionItem}>
                <div className={styles.missionDot}></div>
                <p><strong>Nurture Problem-Solving & Entrepreneurship:</strong> Foster a culture of creative problem-solving and biotech entrepreneurship.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}