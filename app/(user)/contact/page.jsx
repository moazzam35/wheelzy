"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { fadeUp, scaleIn, slideInLeft, staggerContainer, viewportConfig } from "@/app/lib/animations";
import styles from "./contact.module.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaSpinner, FaCheck } from "react-icons/fa";

// ============================================================
// FILE: app/(user)/contact/page.jsx
// ANIMATIONS ADDED:
// - Page title: fadeUp on mount
// - Form container: scaleIn with delay
// - Form fields: staggered fadeUp for each input
// - Input focus: motion wrapper scale(1.01) + border color (via CSS classes)
// - Submit button: Spinner (infinite rotate) during loading, AnimatePresence checkmark on success
// - Success message: scale 0.5 -> 1 with spring bounce
// - Contact info cards: whileInView slideInLeft with stagger
// PERFORMANCE NOTES: layout animations minimized; using CSS transforms primarily.
// ACCESSIBILITY: useReducedMotion applied to disable form scales and heavy springs.
// ============================================================

const subjects = [
  "General Inquiry",
  "Buy a Car",
  "Sell My Car",
  "Test Drive Request",
  "Financing",
  "Other",
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success
  const [focused, setFocused] = useState(null);
  const isReduced = useReducedMotion();

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const canSubmit = form.name && form.email && form.subject && form.message && status === "idle";

  const handleSubmit = () => {
    if (!canSubmit) return;
    setStatus("loading");
    // Simulate network request for loading state
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <main className={styles.page}>
      {/* Header */}
      <motion.header 
        className={styles.header}
        initial={isReduced ? false : "hidden"}
        animate="visible"
        variants={fadeUp}
      >
        <p className={styles.eyebrow}>Get In Touch</p>
        <h1 className={styles.title}>CONTACT</h1>
        <div className={styles.titleLine} />
      </motion.header>

      <div className={styles.layout}>
        {/* Left — Info */}
        <motion.aside 
          className={styles.info}
          initial={isReduced ? false : "hidden"}
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
        >
          {/* WHY: Contact info cards slideInLeft staggered */}
          <motion.div className={styles.infoBlock} variants={isReduced ? {} : slideInLeft}>
            <span className={styles.infoLabel}>LOCATION</span>
            <p className={styles.infoVal}>Bahawalnagar, Punjab<br />Pakistan</p>
          </motion.div>

          <motion.div className={styles.infoBlock} variants={isReduced ? {} : slideInLeft}>
            <span className={styles.infoLabel}>HOURS</span>
            <div className={styles.hours}>
              <div className={styles.hourRow}><span>Mon – Fri</span><span className={styles.hourTime}>9AM – 7PM</span></div>
              <div className={styles.hourRow}><span>Saturday</span><span className={styles.hourTime}>10AM – 6PM</span></div>
              <div className={styles.hourRow}><span>Sunday</span><span className={styles.hourTime}>11AM – 4PM</span></div>
            </div>
          </motion.div>

          <motion.div className={styles.infoBlock} variants={isReduced ? {} : slideInLeft}>
            <span className={styles.infoLabel}>PHONE</span>
            <a href="tel:+923001234567" className={styles.infoLink}>+92 300 1234567</a>
          </motion.div>

          <motion.div className={styles.infoBlock} variants={isReduced ? {} : slideInLeft}>
            <span className={styles.infoLabel}>EMAIL</span>
            <a href="mailto:moazzampasha356@gmail.com" className={styles.infoLink}>moazzampasha356@gmail.com</a>
          </motion.div>

          <motion.div className={styles.infoBlock} variants={isReduced ? {} : slideInLeft}>
            <span className={styles.infoLabel}>FOLLOW US</span>
            <div className={styles.socials}>
              {["Instagram", "YouTube", "TikTok", "LinkedIn"].map((s) => (
                <button key={s} className={styles.social}>{s}</button>
              ))}
            </div>
          </motion.div>

          {/* Map placeholder */}
          <motion.div className={styles.mapBox} variants={isReduced ? {} : slideInLeft}>
            <div className={styles.mapGrid}>
              {Array.from({ length: 36 }).map((_, i) => <div key={i} className={styles.mapCell} />)}
            </div>
            <div className={styles.mapPin}>
              <span className={styles.mapPinDot} />
              <span className={styles.mapPinLabel}>Wheelzy HQ</span>
            </div>
          </motion.div>
        </motion.aside>

        {/* Right — Form */}
        <section className={styles.formSection}>
          <AnimatePresence mode="wait">
            {status !== "success" ? (
              // WHY: Form container scaleIn entrance
              <motion.div 
                key="form"
                className={styles.formCard}
                initial={isReduced ? false : "hidden"}
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                variants={isReduced ? fadeUp : { ...scaleIn, visible: { ...scaleIn.visible, transition: { ...scaleIn.visible.transition, delay: 0.2 } } }}
              >
                <h2 className={styles.formTitle}>Send a Message</h2>
                <p className={styles.formSub}>We'll get back to you within 24 hours.</p>

                {/* WHY: Staggered fadeUp for form fields */}
                <motion.div 
                  className={styles.formGrid}
                  variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    { name: "name", label: "Full Name *", type: "text", placeholder: "Your full name" },
                    { name: "email", label: "Email Address *", type: "email", placeholder: "your@email.com" },
                    { name: "phone", label: "Phone (optional)", type: "text", placeholder: "+1 (555) 000-0000" }
                  ].map((field) => (
                    // WHY: Input subtle scale(1.01) on focus
                    <motion.div
                      key={field.name}
                      variants={fadeUp}
                      animate={isReduced ? {} : focused === field.name ? { scale: 1.01 } : { scale: 1 }}
                      className={`${styles.field} ${focused === field.name ? styles.fieldFocused : ""}`}
                    >
                      <label className={styles.label}>{field.label}</label>
                      <input
                        name={field.name}
                        type={field.type}
                        className={styles.input}
                        placeholder={field.placeholder}
                        value={form[field.name]}
                        onChange={handleChange}
                        onFocus={() => setFocused(field.name)}
                        onBlur={() => setFocused(null)}
                      />
                    </motion.div>
                  ))}

                  <motion.div
                    variants={fadeUp}
                    animate={isReduced ? {} : focused === "subject" ? { scale: 1.01 } : { scale: 1 }}
                    className={`${styles.field} ${focused === "subject" ? styles.fieldFocused : ""}`}
                  >
                    <label className={styles.label}>Subject *</label>
                    <select
                      name="subject"
                      className={styles.input}
                      value={form.subject}
                      onChange={handleChange}
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused(null)}
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </motion.div>

                  <motion.div
                    variants={fadeUp}
                    animate={isReduced ? {} : focused === "message" ? { scale: 1.01 } : { scale: 1 }}
                    className={`${styles.field} ${styles.fieldFull} ${focused === "message" ? styles.fieldFocused : ""}`}
                  >
                    <label className={styles.label}>Message *</label>
                    <textarea
                      name="message"
                      className={`${styles.input} ${styles.textarea}`}
                      placeholder="Tell us what you're looking for..."
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      rows={5}
                    />
                  </motion.div>
                </motion.div>

                {/* WHY: Button loading spinner and text swap */}
                <motion.button
                  className={`${styles.submitBtn} ${!canSubmit ? styles.submitDisabled : ""}`}
                  onClick={handleSubmit}
                  disabled={!canSubmit || status === "loading"}
                  whileHover={!isReduced && canSubmit ? { scale: 1.02 } : {}}
                  whileTap={!isReduced && canSubmit ? { scale: 0.98 } : {}}
                >
                  {status === "loading" ? (
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <FaSpinner />
                      </motion.span>
                      Sending...
                    </span>
                  ) : (
                    "Send Message →"
                  )}
                </motion.button>
              </motion.div>
            ) : (
              // WHY: Success message spring bounce entrance
              <motion.div 
                key="success"
                className={styles.successCard}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className={styles.successIcon}><FaCheck /></div>
                <h2 className={styles.successTitle}>Message Received</h2>
                <p className={styles.successText}>
                  Thanks, <strong>{form.name}</strong>! We've received your message regarding <strong>"{form.subject}"</strong>. Our team will be in touch at <strong>{form.email}</strong> within 24 hours.
                </p>
                <button
                  className={styles.resetBtn}
                  onClick={() => {
                    setStatus("idle");
                    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
                  }}
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>

      {/* Bottom contact bar */}
      <motion.div 
        className={styles.contactBar}
        initial={isReduced ? false : "hidden"}
        whileInView="visible"
        viewport={viewportConfig}
        variants={fadeUp}
      >
        <div className={styles.barItem}><FaPhone className={styles.barIcon} /><div><span className={styles.barLabel}>CALL US</span><span className={styles.barVal}>+92 300 1234567</span></div></div>
        <div className={styles.barDivider} />
        <div className={styles.barItem}><FaEnvelope className={styles.barIcon} /><div><span className={styles.barLabel}>EMAIL</span><span className={styles.barVal}>moazzampasha356@gmail.com</span></div></div>
        <div className={styles.barDivider} />
        <div className={styles.barItem}><FaMapMarkerAlt className={styles.barIcon} /><div><span className={styles.barLabel}>VISIT</span><span className={styles.barVal}>Bahawalnagar, Punjab, Pakistan</span></div></div>
      </motion.div>
    </main>
  );
};

export default Contact;
