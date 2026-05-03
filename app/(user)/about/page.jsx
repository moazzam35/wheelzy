"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView, animate, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, slideInLeft, slideInRight, scaleIn, viewportConfig } from "@/app/lib/animations";
import styles from "./aboutus.module.css";
import Link from "next/link";


const stats = [
  { val: 12, suffix: "+", label: "Years in Business" },
  { val: 5000, suffix: "+", label: "Cars Sold" },
  { val: 98, suffix: "%", label: "Client Satisfaction" },
  { val: 50, suffix: "+", label: "Premium Brands" },
];

const values = [
  { icon: "◈", title: "Transparency", desc: "Every price is fair, every deal is clear. No hidden charges, no pressure tactics — just honest business." },
  { icon: "◉", title: "Excellence", desc: "From the vehicles we source to the service we deliver, we hold every element to the highest standard." },
  { icon: "◆", title: "Passion", desc: "We live and breathe automobiles. Our team are enthusiasts first, professionals second." },
  { icon: "◇", title: "Trust", desc: "Your confidence is our most valuable asset. We've built our reputation one handshake at a time." },
];

const team = [
  { name: "Moazzam", role: "Founder & CEO", quote: "A car isn't just transportation. It's identity." },
  { name: "moazzam", role: "Head of Acquisitions", quote: "We only bring in cars we'd drive ourselves." },
  { name: "moazzam", role: "Lead Technician", quote: "Every vehicle leaves our bay in peak condition." },
  { name: "moazzam", role: "Client Relations", quote: "The relationship starts at sale, not before." },
];

// WHY: useInView counter animation for numbers to emphasize scale
const AnimatedCounter = ({ to, suffix, isReduced }) => {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, viewportConfig);

  useEffect(() => {
    if (isReduced) {
      if (nodeRef.current) nodeRef.current.textContent = to.toLocaleString() + suffix;
      return;
    }
    
    if (inView) {
      const controls = animate(0, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.floor(value).toLocaleString() + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, to, suffix, isReduced]);

  return <span ref={nodeRef}>{isReduced ? to.toLocaleString() + suffix : "0" + suffix}</span>;
};

const AboutUs = () => {
  const isReduced = useReducedMotion();
  
  return (
    <main className={styles.page}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroBg} />
        <motion.div 
          className={styles.heroContent}
          initial={isReduced ? false : "hidden"}
          animate="visible"
          variants={isReduced ? {} : staggerContainer}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>Our Story</motion.p>
          <h1 className={styles.heroTitle}>
            {/* WHY: Hero text split into lines, animating up with stagger */}
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span style={{ display: "block" }} variants={isReduced ? {} : fadeUp}>ABOUT</motion.span>
            </span>
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span style={{ display: "block" }} variants={isReduced ? {} : fadeUp}>WHEELZY</motion.span>
            </span>
          </h1>
          <motion.p className={styles.heroText} variants={fadeUp}>
            Born from a passion for performance and precision, Wheelzy has been connecting discerning drivers with extraordinary machines since 2012.
          </motion.p>
        </motion.div>
      </header>

      {/* Stats */}
      <motion.section 
        className={styles.statsSection}
        initial={isReduced ? false : "hidden"}
        whileInView="visible"
        viewport={viewportConfig}
        variants={staggerContainer}
      >
        {stats.map((s, i) => (
          <motion.div className={styles.stat} key={i} variants={fadeUp}>
            <span className={styles.statVal}>
              <AnimatedCounter to={s.val} suffix={s.suffix} isReduced={isReduced} />
            </span>
            <span className={styles.statLabel}>{s.label}</span>
          </motion.div>
        ))}
      </motion.section>

      {/* Story */}
      <section className={styles.storySection}>
        <motion.div 
          className={styles.storyLeft}
          initial={isReduced ? false : "hidden"}
          whileInView="visible"
          viewport={viewportConfig}
          variants={isReduced ? {} : slideInLeft}
        >
          <p className={styles.sectionEyebrow}>Our Journey</p>
          <h2 className={styles.storyTitle}>FROM GARAGE TO<br />SHOWROOM</h2>
        </motion.div>
        
        {/* WHY: Alternating slideInRight for story content */}
        <motion.div 
          className={styles.storyRight}
          initial={isReduced ? false : "hidden"}
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
        >
          <motion.p className={styles.storyP} variants={isReduced ? {} : slideInRight}>
            Wheelzy started in 2012 when founder Alexei Voss, a former racing driver, couldn't find a dealership that treated luxury cars with the respect they deserved. So he built one.
          </motion.p>
          <motion.p className={styles.storyP} variants={isReduced ? {} : slideInRight}>
            Starting with a single BMW M3 and a rented garage, Alexei's obsession with automotive excellence quickly attracted clients who shared his standards. Word spread. The collection grew.
          </motion.p>
          <motion.p className={styles.storyP} variants={isReduced ? {} : slideInRight}>
            Today, Wheelzy is one of the most trusted names in premium pre-owned and new exotic vehicles — but the core belief hasn't changed. Every car is special. Every client deserves the best.
          </motion.p>
          <motion.div className={styles.storyAccent} variants={isReduced ? {} : slideInRight}>
            <span className={styles.storyQuote}>"We don't sell cars. We match drivers with their perfect machine."</span>
            <span className={styles.storyAuthor}>— Alexei Voss, Founder</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Values */}
      <section className={styles.valuesSection}>
        <motion.div 
          className={styles.valuesHeader}
          initial={isReduced ? false : "hidden"}
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
        >
          <p className={styles.sectionEyebrow}>What Drives Us</p>
          <h2 className={styles.valuesTitle}>OUR VALUES</h2>
        </motion.div>
        
        {/* WHY: Values grid uses staggerContainer + whileInView on each card */}
        <motion.div 
          className={styles.valuesGrid}
          initial={isReduced ? false : "hidden"}
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
        >
          {values.map((v, i) => (
            <motion.div className={styles.valueCard} key={i} variants={fadeUp}>
              <span className={styles.valueIcon}>{v.icon}</span>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueDesc}>{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team */}
      <section className={styles.teamSection}>
        <motion.div 
          className={styles.teamHeader}
          initial={isReduced ? false : "hidden"}
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
        >
          <p className={styles.sectionEyebrow}>The People</p>
          <h2 className={styles.teamTitle}>MEET THE TEAM</h2>
        </motion.div>
        
        <motion.div 
          className={styles.teamGrid}
          initial={isReduced ? false : "hidden"}
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
        >
          {team.map((m, i) => (
            // WHY: Team cards use scaleIn with stagger for a bold introduction
            <motion.div className={styles.teamCard} key={i} variants={isReduced ? {} : scaleIn}>
              <div className={styles.avatar}>
                <span className={styles.avatarInitial}>{m.name.charAt(0)}</span>
              </div>
              <div className={styles.teamInfo}>
                <h3 className={styles.teamName}>{m.name}</h3>
                <p className={styles.teamRole}>{m.role}</p>
                <p className={styles.teamQuote}>"{m.quote}"</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Banner */}
      <motion.section 
        className={styles.ctaBanner}
        initial={isReduced ? false : "hidden"}
        whileInView="visible"
        viewport={viewportConfig}
        variants={fadeUp}
      >
        <div className={styles.ctaInner}>
          <p className={styles.ctaEyebrow}>Ready to Ride?</p>
          <h2 className={styles.ctaTitle}>FIND YOUR NEXT CAR</h2>
          <div className={styles.ctaBtns}>
            <Link href= "/cars" className={styles.btnPrimary}>Browse Fleet</Link>
            <Link href="/contact" className={styles.btnGhost}>
              Contact Us
            </Link>
          </div>
        </div>
      </motion.section>
    </main>
  );
};

export default AboutUs;