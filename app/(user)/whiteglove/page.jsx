"use client";
import React from "react";
import Link from "next/link";
import styles from "./whiteglove.module.css";

const steps = [
  { num: "01", title: "Purchase Confirmed", icon: "◆", body: "Once your vehicle purchase is finalized, our delivery team is immediately assigned to your order." },
  { num: "02", title: "Pre-Delivery Detailing", icon: "◈", body: "Your vehicle receives a full professional detail — paintwork correction, interior deep-clean, and tyre dressing." },
  { num: "03", title: "Logistics Coordination", icon: "◉", body: "We arrange fully insured enclosed transport with real-time GPS tracking so you always know where your car is." },
  { num: "04", title: "Day-of Delivery", icon: "◇", body: "Your dedicated concierge contacts you two hours prior. Your car arrives wrapped, protected, and pristine." },
  { num: "05", title: "Handover Experience", icon: "◆", body: "We walk you through every feature of your new vehicle, answer all your questions, and don't leave until you're confident and delighted." },
  { num: "06", title: "Post-Delivery Support", icon: "◈", body: "Your advisor remains on call for 30 days after delivery for any questions, paperwork, or follow-up needs." },
];

const included = [
  "Fully enclosed, climate-controlled transport",
  "GPS real-time tracking throughout transit",
  "Professional pre-delivery detail & inspection",
  "Dedicated delivery concierge",
  "All documentation handled & delivered",
  "30-day post-delivery support",
  "Full insurance coverage in transit",
  "Flexible scheduling — including weekends",
];

export default function WhiteGlovePage() {
  return (
    <main className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroScrim} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Wheelzy Delivery</p>
          <h1 className={styles.heroTitle}>WHITE-GLOVE<br />DELIVERY</h1>
          <p className={styles.heroSub}>Your dream car, delivered with the same care and attention we put into selecting it — anywhere in the country.</p>
          <Link href="#process" className={styles.ctaBtn}>See How It Works</Link>
        </div>
        <div className={styles.heroCornerBR} />
      </section>

      {/* ── Promise block ── */}
      <section className={styles.promiseSection}>
        <div className={styles.promiseInner}>
          <div className={styles.promiseText}>
            <p className={styles.eyebrow}>Our Promise</p>
            <h2 className={styles.promiseTitle}>EVERY DETAIL.<br />EVERY TIME.</h2>
            <p className={styles.promiseBody}>
              Most dealerships call a courier and forget about it. At Wheelzy, delivery is a curated experience —
              not an afterthought. From the moment you sign to the moment you turn the key for the first time,
              our team is with you every step of the way.
            </p>
            <p className={styles.promiseBody}>
              We operate fully enclosed, climate-controlled transporters with real-time tracking. Your vehicle
              is handled by specialists who care as much about that car as you do.
            </p>
          </div>
          <div className={styles.promiseStats}>
            {[["2,400+", "Deliveries Completed"], ["100%", "On-Time Rate"], ["50", "States Covered"], ["5★", "Average Rating"]].map(([v, l], i) => (
              <div className={styles.stat} key={i}>
                <span className={styles.statVal}>{v}</span>
                <span className={styles.statLabel}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="process" className={styles.processSection}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>The Process</p>
          <h2 className={styles.sectionTitle}>FROM SHOWROOM<br />TO YOUR DOOR</h2>
          <div className={styles.titleRule} />
        </div>
        <div className={styles.processGrid}>
          {steps.map((s, i) => (
            <div className={styles.processCard} key={i}>
              <div className={styles.processTop}>
                <span className={styles.processIcon}>{s.icon}</span>
                {/* <span className={styles.processNum}>{s.num}</span> */}
              </div>
              <h3 className={styles.processTitle}>{s.title}</h3>
              <p className={styles.processBody}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className={styles.includedSection}>
        <div className={styles.includedInner}>
          <div className={styles.includedLeft}>
            <p className={styles.eyebrow}>What's Included</p>
            <h2 className={styles.includedTitle}>EVERYTHING.<br />ZERO SURPRISES.</h2>
            <p className={styles.includedSub}>Our white-glove delivery fee covers the full service — no hidden charges, no add-ons to approve.</p>
            <Link href="/contact" className={styles.ctaBtn}>Request Delivery Info</Link>
          </div>
          <div className={styles.includedRight}>
            <ul className={styles.includedList}>
              {included.map((item, i) => (
                <li className={styles.includedItem} key={i}>
                  <span className={styles.tick}>◆</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}