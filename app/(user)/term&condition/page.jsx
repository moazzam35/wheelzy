"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./terms.module.css";

const sections = [
  { num: "01", id: "acceptance",  title: "Acceptance of Terms" },
  { num: "02", id: "listings",    title: "Vehicle Listings" },
  { num: "03", id: "purchases",   title: "Purchases & Deposits" },
  { num: "04", id: "trade",       title: "Sell & Trade-In" },
  { num: "05", id: "liability",   title: "Limitation of Liability" },
  { num: "06", id: "law",         title: "Governing Law" },
  { num: "07", id: "contact",     title: "Contact" },
];

export default function TermsOfService() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <main className={styles.page}>

      {/* ── Theme Toggle ── */}
      <button className={styles.themeToggle} onClick={toggleTheme}>
        <span className={styles.themeToggleIcon}>
          {theme === "dark" ? "☀" : "☾"}
        </span>
        {theme === "dark" ? "Light" : "Dark"}
      </button>

      {/* ── Banner ── */}
      <section className={styles.pageBanner}>
        <div className={styles.bannerBg} />
        <div className={styles.bannerCorner} />
        <p className={styles.bannerEyebrow}>Legal · Wheelzy</p>
        <h1 className={styles.bannerTitle}>
          TERMS OF<br />
          <span>SERVICE</span>
        </h1>
        <p className={styles.bannerSub}>
          Please read these terms carefully before using our services.
        </p>
      </section>

      {/* ── Meta Bar ── */}
      <div className={styles.metaBar}>
        <p className={styles.legalDate}>Last updated: January 1, 2025</p>
        <div className={styles.metaBadges}>
          <span className={styles.metaBadge}>Version 3.1</span>
          <span className={styles.metaBadge}>California Law</span>
          <span className={styles.metaBadge}>English</span>
        </div>
      </div>

      {/* ── Layout ── */}
      <div className={styles.legalLayout}>

        {/* Sidebar TOC */}
        <aside className={styles.legalSidebar}>
          <span className={styles.sidebarLabel}>Contents</span>
          <ul className={styles.tocList}>
            {sections.map(s => (
              <li key={s.id} className={styles.tocItem}>
                <a href={`#${s.id}`}>
                  <span className={styles.tocNum}>{s.num}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Content */}
        <div className={styles.legalWrap}>

          {/* 01 */}
          <section id="acceptance" className={styles.legalSection}>
            <div className={styles.sectionTag}>
              <span className={styles.sectionNum}>01</span>
            </div>
            <h2 className={styles.legalH2}>Acceptance of Terms</h2>
            <p className={styles.legalP}>
              By accessing or using Wheelzy's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
            </p>
            <div className={styles.legalHighlight}>
              Continued use of the platform after any modification to these terms constitutes your acceptance of the revised terms.
            </div>
          </section>

          {/* 02 */}
          <section id="listings" className={styles.legalSection}>
            <div className={styles.sectionTag}>
              <span className={styles.sectionNum}>02</span>
            </div>
            <h2 className={styles.legalH2}>Vehicle Listings</h2>
            <p className={styles.legalP}>
              All vehicle information, pricing, and specifications displayed on our platform are provided in good faith and are subject to change. Wheelzy reserves the right to amend pricing at any time prior to a completed transaction.
            </p>
            <p className={styles.legalP}>
              Images are representative and actual vehicle condition should be verified at time of inspection or delivery.
            </p>
          </section>

          {/* 03 */}
          <section id="purchases" className={styles.legalSection}>
            <div className={styles.sectionTag}>
              <span className={styles.sectionNum}>03</span>
            </div>
            <h2 className={styles.legalH2}>Purchases & Deposits</h2>
            <p className={styles.legalP}>
              A refundable holding deposit may be required to reserve a vehicle. Full payment terms will be agreed between the buyer and Wheelzy prior to the transfer of ownership. All sales are subject to a formal sale agreement.
            </p>
            <div className={styles.legalHighlight}>
              Deposits are fully refundable within 48 hours of placement, provided no formal sale agreement has been executed.
            </div>
          </section>

          {/* 04 */}
          <section id="trade" className={styles.legalSection}>
            <div className={styles.sectionTag}>
              <span className={styles.sectionNum}>04</span>
            </div>
            <h2 className={styles.legalH2}>Sell & Trade-In</h2>
            <p className={styles.legalP}>
              Valuations provided through our platform are estimates only and are not binding offers. A final offer will be made following physical inspection of the vehicle. Wheelzy reserves the right to revise or withdraw an offer at any stage.
            </p>
          </section>

          {/* 05 */}
          <section id="liability" className={styles.legalSection}>
            <div className={styles.sectionTag}>
              <span className={styles.sectionNum}>05</span>
            </div>
            <h2 className={styles.legalH2}>Limitation of Liability</h2>
            <p className={styles.legalP}>
              Wheelzy shall not be liable for any indirect, incidental, or consequential damages arising from the use of our platform or services. Our total liability in any matter shall not exceed the value of the transaction in question.
            </p>
            <div className={styles.legalHighlight}>
              Nothing in these terms excludes or limits liability for death, personal injury, or fraud caused by our negligence.
            </div>
          </section>

          {/* 06 */}
          <section id="law" className={styles.legalSection}>
            <div className={styles.sectionTag}>
              <span className={styles.sectionNum}>06</span>
            </div>
            <h2 className={styles.legalH2}>Governing Law</h2>
            <p className={styles.legalP}>
              These terms are governed by the laws of the State of California. Any disputes shall be subject to the exclusive jurisdiction of the courts of Los Angeles County.
            </p>
          </section>

          {/* 07 */}
          <section id="contact" className={styles.legalSection}>
            <div className={styles.sectionTag}>
              <span className={styles.sectionNum}>07</span>
            </div>
            <h2 className={styles.legalH2}>Contact</h2>
            <p className={styles.legalP}>
              For questions regarding these terms, reach out to our legal team directly.
            </p>
            <a href="mailto:moazzampasha356@gmail.com" className={styles.contactRow}>
              moazzampasha356@gmail.com
              <span className={styles.contactArrow}>→</span>
            </a>
          </section>

        </div>
      </div>

    </main>
  );
}