"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./careers.module.css";
import { FaMapMarkerAlt } from "react-icons/fa";
const openings = [
  {
    id: 1,
    title: "Senior Sales Consultant",
    dept: "Sales",
    type: "Full-Time",
    location: " Lahore-pakistan",
    desc: "Drive revenue growth by building long-term relationships with high-net-worth clients and delivering a world-class purchasing experience.",
  },
  {
    id: 2,
    title: "Automotive Photographer",
    dept: "Creative",
    type: "Full-Time",
    location: " Multan pakistan",
    desc: "Produce stunning editorial-quality images and video content of our premium vehicle inventory for digital and print media.",
  },
  {
    id: 3,
    title: "Vehicle Acquisition Specialist",
    dept: "Operations",
    type: "Full-Time",
    location:  " Rawalpindi pakistan",
    desc: "Source, evaluate, and acquire top-tier vehicles through auctions, private sellers, and dealer networks.",
  },
  {
    id: 4,
    title: "Digital Marketing Manager",
    dept: "Marketing",
    type: "Full-Time",
    location: " Remote",
    desc: "Lead performance marketing campaigns across paid, social, and SEO channels to grow Wheelzy's premium brand presence.",
  },
  {
    id: 5,
    title: "Client Experience Associate",
    dept: "Customer Service",
    type: "Full-Time",
    location: " Islamabad pakistan",
    desc: "Be the front line of the Wheelzy experience — guiding clients through every step with warmth, knowledge, and precision.",
  },
  {
    id: 6,
    title: "Finance & Insurance Manager",
    dept: "Finance",
    type: "Full-Time",
    location: " Faisalabad pakistan",
    desc: "Structure bespoke financing solutions and insurance products tailored to our high-end clientele.",
  },
];

const perks = [
  {
    icon: "◆",
    title: "Industry-Leading Pay",
    body: "Competitive salaries and commission structures that reward performance without a ceiling.",
  },
  {
    icon: "◈",
    title: "Premium Benefits",
    body: "Full health, dental, vision, and 401(k) matching — because we invest in the people who drive us forward.",
  },
  {
    icon: "◉",
    title: "Growth Pathways",
    body: "Internal promotion culture with structured development plans and access to the best training in the industry.",
  },
  {
    icon: "◇",
    title: "Iconic Inventory",
    body: "Come to work surrounded by the world's finest automobiles. Perks include employee demo program.",
  },
];

export default function CareersPage() {
  const [activeJob, setActiveJob] = useState(null);

  return (
    <main className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroScrim} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Join Wheelzy</p>
          <h1 className={styles.heroTitle}>
            BUILD
            <br />
            SOMETHING
            <br />
            LEGENDARY
          </h1>
          <p className={styles.heroSub}>
            We don't just hire people. We find individuals obsessed with
            excellence and give them the tools to thrive.
          </p>
          <a href="#openings" className={styles.ctaBtn}>
            See Open Roles
          </a>
        </div>
        <div className={styles.heroCorner} />
      </section>

      {/* ── Perks ── */}
      <section className={styles.perksSection}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Why Wheelzy</p>
          <h2 className={styles.sectionTitle}>WHAT YOU GET</h2>
          <div className={styles.titleRule} />
        </div>
        <div className={styles.perksGrid}>
          {perks.map((p, i) => (
            <div className={styles.perkCard} key={i}>
              <span className={styles.perkIcon}>{p.icon}</span>
              <h3 className={styles.perkTitle}>{p.title}</h3>
              <p className={styles.perkBody}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Openings ── */}
      <section id="openings" className={styles.openingsSection}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Current Openings</p>
          <h2 className={styles.sectionTitle}>FIND YOUR ROLE</h2>
          <div className={styles.titleRule} />
        </div>
        <div className={styles.jobList}>
          {openings.map((j) => (
            <div
              className={`${styles.jobRow} ${activeJob === j.id ? styles.jobOpen : ""}`}
              key={j.id}
              onClick={() => setActiveJob(activeJob === j.id ? null : j.id)}
            >
              <div className={styles.jobTop}>
                <div className={styles.jobLeft}>
                  <h3 className={styles.jobTitle}>{j.title}</h3>
                  <div className={styles.jobMeta}>
                    <span className={styles.jobTag}>{j.dept}</span>
                    <span className={styles.jobTag}>{j.type}</span>
                    <span className={styles.jobLocation}> 
                       <FaMapMarkerAlt />
                      {j.location}
                    </span>
                  </div>
                </div>
                <span className={styles.jobArrow}>
                  {activeJob === j.id ? "−" : "+"}
                </span>
              </div>
              {activeJob === j.id && (
                <div className={styles.jobDetail}>
                  <p className={styles.jobDesc}>{j.desc}</p>
                  <Link href="#" className={styles.applyBtn}>
                    Apply for This Role →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.bottomCta}>
        <div className={styles.ctaBg} />
        <div className={styles.ctaInner}>
          <p className={styles.eyebrow}>Don't see your role?</p>
          <h2 className={styles.ctaTitle}>
            WE'RE ALWAYS
            <br />
            LOOKING FOR THE BEST
          </h2>
          <p className={styles.ctaSub}>
            Send us your CV and tell us how you'd make Wheelzy better. We read
            every single one.
          </p>
          <a
            href="mailto:moazzampasha356@gmail.com"
            className={styles.ctaBtn}
            target="blank"
          >
            Send Your CV →
          </a>
        </div>
      </section>
    </main>
  );
}
