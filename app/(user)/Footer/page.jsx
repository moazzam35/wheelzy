"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/app/lib/animations";
import styles from "./footer.module.css";

import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const footerLinks = {
  Inventory: [
    { label: "Browse All Cars", href: "/cars" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Luxury Collection", href: "/cars?type=luxury" },
    { label: "Sports & Exotic", href: "/cars?type=sports" },
    { label: "Electric Vehicles", href: "/cars?type=electric" },
    { label: "SUVs & Crossovers", href: "/cars?type=suv" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press & Media", href: "/press" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ],
  Services: [
    { label: "Sell Your Car", href: "/sell" },
    { label: "Trade-In", href: "/sell?type=trade" },
    { label: "Financing", href: "/financing" },
    { label: "White-Glove Delivery", href: "/whiteglove" },
    { label: "Test Drive", href: "/testdrive" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacypolicy" },
    { label: "Terms of Service", href: "/term&condition" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

const Footer = () => {
  const isReduced = useReducedMotion();

  return (
    <motion.footer 
      className={styles.footer}
      initial={isReduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
    >
      {/* ── Top rule ── */}
      <div className={styles.topRule} />

      {/* ── Main grid ── */}
      <motion.div 
        className={styles.inner}
        variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        
        {/* Brand column */}
        <motion.div className={styles.brand} variants={fadeUp}>
          <Link href="/" className={styles.logo}>
            Wheelzy
          </Link>

          <p className={styles.tagline}>
            We don't just sell cars.<br />We curate machines.
          </p>

          {/* Contact */}
          <div className={styles.contactBlock}>
            <p className={styles.contactLine}>
              <span className={styles.contactIcon}>✉</span>
              moazzampasha356@gmail.com
            </p>
            <p className={styles.contactLine}>
              <span className={styles.contactIcon}>✆</span>
              +92 300 000 000
            </p>
            <p className={styles.contactLine}>
              <span className={styles.contactIcon}>◎</span>
              Bahawalnagar, Punjab, Pakistan
            </p>
          </div>
        </motion.div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <motion.div className={styles.col} key={heading} variants={fadeUp}>
            <h4 className={styles.colHead}>{heading}</h4>
            <ul className={styles.linkList}>
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Newsletter ── */}
      <motion.div 
        className={styles.newsletter}
        variants={fadeUp}
        initial={isReduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className={styles.newsletterText}>
          <p className={styles.newsletterEyebrow}>Stay in the fast lane</p>
          <p className={styles.newsletterSub}>
            New arrivals, exclusive offers, zero spam.
          </p>
        </div>

        <div className={styles.newsletterForm}>
          <input
            type="email"
            placeholder="Your email address"
            className={styles.input}
          />
          <button className={styles.subscribeBtn}>
            Subscribe
          </button>
        </div>
      </motion.div>

      {/* ── Bottom bar ── */}
      <div className={styles.bottomBar}>
        {/* WHY: Copyright text simple fade in with 0.8s delay */}
        <motion.p 
          className={styles.copy}
          initial={isReduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          © {new Date().getFullYear()} Wheelzy. All rights reserved.
        </motion.p>
        <motion.p 
          className={styles.madeWith}
          initial={isReduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Crafted with precision ◈ Built for drivers
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;