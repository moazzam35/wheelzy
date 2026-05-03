"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig, scaleIn } from "@/app/lib/animations";
import styles from "./sellyourcar.module.css";
import { FaCloudUploadAlt, FaCheck, FaCarSide, FaInfoCircle, FaStar } from "react-icons/fa";

// ============================================================
// FILE: app/(user)/sell/page.jsx
// ANIMATIONS ADDED:
// - Multi-step form transitions: AnimatePresence mode="wait", x: 50/opacity 0 entrance and exit
// - Progress bar: scaleX animation with spring transition, transformOrigin left
// - Image upload zone: whileDrag scale(1.02) + border color pulse using whileHover
// - Summary/Review step: staggerChildren list items sliding up (fadeUp)
// PERFORMANCE NOTES: AnimatePresence handles mounting/unmounting; spring physics on progress bar.
// ACCESSIBILITY: useReducedMotion applied to disable x-axis slides and springs.
// ============================================================

const steps = [
  { num: "01", title: "Enter Car Details", desc: "Tell us your car's make, model, year, and mileage." },
  { num: "02", title: "Condition & Photos", desc: "Describe the state and upload recent photos." },
  { num: "03", title: "Your Information", desc: "Provide contact details for the valuation." },
  { num: "04", title: "Review & Submit", desc: "Verify your information before submission." },
];

const makes = ["BMW", "Mercedes-Benz", "Porsche", "Audi", "Lamborghini", "Tesla", "Ferrari", "Bentley", "Toyota", "Honda", "Ford", "Chevrolet", "Other"];
const years = Array.from({ length: 20 }, (_, i) => (2025 - i).toString());
const conditions = ["Excellent", "Good", "Fair", "Poor"];

const stepVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: -50, opacity: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
};

const SellYourCar = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ make: "", model: "", year: "", mileage: "", condition: "", name: "", phone: "", email: "", notes: "", uploadedFiles: 0 });
  const [submitted, setSubmitted] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const isReduced = useReducedMotion();

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleNext = () => {
    if (step < 4) setStep((s) => s + 1);
    else setSubmitted(true);
  };

  const canNext = () => {
    if (step === 1) return form.make && form.model && form.year && form.mileage;
    if (step === 2) return form.condition;
    if (step === 3) return form.name && form.phone && form.email;
    if (step === 4) return true;
    return false;
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDraggingOver(true); };
  const handleDragLeave = () => setIsDraggingOver(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setForm(p => ({ ...p, uploadedFiles: p.uploadedFiles + e.dataTransfer.files.length }));
    }
  };

  return (
    <main className={styles.page}>
      {/* Header */}
      <motion.header className={styles.header} initial={isReduced ? false : "hidden"} animate="visible" variants={staggerContainer}>
        <motion.p className={styles.eyebrow} variants={fadeUp}>Top Dollar, Zero Hassle</motion.p>
        <motion.h1 className={styles.title} variants={fadeUp}>SELL YOUR CAR</motion.h1>
        <motion.div className={styles.titleLine} variants={fadeUp} />
        <motion.p className={styles.subtitle} variants={fadeUp}>We buy any car — any brand, any condition.</motion.p>
      </motion.header>

      {/* How it works */}
      <motion.section className={styles.howSection} initial={isReduced ? false : "hidden"} whileInView="visible" viewport={viewportConfig} variants={staggerContainer}>
        <motion.h2 className={styles.sectionLabel} variants={fadeUp}>HOW IT WORKS</motion.h2>
        <div className={styles.steps}>
          {steps.map((s, i) => (
            <motion.div className={styles.step} key={i} variants={fadeUp}>
              <span className={styles.stepNum}>{s.num}</span>
              <div className={styles.stepLine} />
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Form Area */}
      <section className={styles.formSection}>
        <div className={styles.formWrap}>
          {!submitted ? (
            <>
              {/* Progress Bar */}
              <div className={styles.progress}>
                {[1, 2, 3, 4].map((n) => (
                  <React.Fragment key={n}>
                    <div className={`${styles.progStep} ${step >= n ? styles.progActive : ""}`}>
                      <span className={styles.progNum}>{n}</span>
                      <span className={styles.progLabel}>
                        {n === 1 ? "Details" : n === 2 ? "Condition" : n === 3 ? "Info" : "Review"}
                      </span>
                    </div>
                    {n < 4 && (
                      <div className={styles.progBarTrack}>
                        {/* WHY: scaleX spring transition for progress bar */}
                        <motion.div 
                          className={styles.progBarFill}
                          initial={isReduced ? false : { scaleX: 0 }}
                          animate={{ scaleX: step > n ? 1 : 0 }}
                          style={{ transformOrigin: "left" }}
                          transition={isReduced ? {} : { type: "spring", stiffness: 100, damping: 20 }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* WHY: AnimatePresence mode="wait" for step transitions */}
              <div className={styles.stepContainer} style={{ position: "relative", minHeight: "450px" }}>
                <AnimatePresence mode="wait">
                  {/* STEP 1: Details */}
                  {step === 1 && (
                    <motion.div key="step1" variants={isReduced ? fadeUp : stepVariants} initial="hidden" animate="visible" exit="exit" className={styles.stepForm}>
                      <h3 className={styles.stepFormTitle}>Tell Us About Your Car</h3>
                      <div className={styles.fieldGrid}>
                        <div className={styles.field}>
                          <label className={styles.label}>Make</label>
                          <select name="make" className={styles.input} value={form.make} onChange={handleChange}>
                            <option value="">Select Make</option>
                            {makes.map((m) => <option key={m} value={m}>{m}</option>)}
                          </select>
                        </div>
                        <div className={styles.field}>
                          <label className={styles.label}>Model</label>
                          <input name="model" className={styles.input} placeholder="e.g. M3, C-Class" value={form.model} onChange={handleChange} />
                        </div>
                        <div className={styles.field}>
                          <label className={styles.label}>Year</label>
                          <select name="year" className={styles.input} value={form.year} onChange={handleChange}>
                            <option value="">Select Year</option>
                            {years.map((y) => <option key={y} value={y}>{y}</option>)}
                          </select>
                        </div>
                        <div className={styles.field}>
                          <label className={styles.label}>Mileage (km)</label>
                          <input name="mileage" type="number" className={styles.input} placeholder="e.g. 45000" value={form.mileage} onChange={handleChange} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Condition & Photos */}
                  {step === 2 && (
                    <motion.div key="step2" variants={isReduced ? fadeUp : stepVariants} initial="hidden" animate="visible" exit="exit" className={styles.stepForm}>
                      <h3 className={styles.stepFormTitle}>Vehicle Condition & Photos</h3>
                      <div className={styles.conditionGrid}>
                        {conditions.map((c) => (
                          <div
                            key={c}
                            className={`${styles.condCard} ${form.condition === c ? styles.condActive : ""}`}
                            onClick={() => setForm((p) => ({ ...p, condition: c }))}
                          >
                            <span className={styles.condIcon}>{c === "Excellent" ? "★★★★★" : c === "Good" ? "★★★★☆" : c === "Fair" ? "★★★☆☆" : "★★☆☆☆"}</span>
                            <span className={styles.condLabel}>{c}</span>
                          </div>
                        ))}
                      </div>

                      {/* WHY: Image upload zone with drag animations */}
                      <div className={styles.field} style={{ marginTop: 24 }}>
                        <label className={styles.label}>Upload Photos (Exterior, Interior, Dash)</label>
                        <motion.div
                          className={`${styles.uploadZone} ${isDraggingOver ? styles.uploadZoneDrag : ""}`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          whileHover={isReduced ? {} : { scale: 1.01, borderColor: "var(--gold)" }}
                          animate={isReduced ? {} : isDraggingOver ? { scale: 1.02, borderColor: "var(--gold)", backgroundColor: "rgba(201, 168, 76, 0.05)" } : { scale: 1, borderColor: "var(--border-color)", backgroundColor: "transparent" }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <FaCloudUploadAlt className={styles.uploadIcon} />
                          <p>Drag & drop photos here, or <span>browse</span></p>
                          {form.uploadedFiles > 0 && <p className={styles.uploadSuccess}>{form.uploadedFiles} files attached</p>}
                        </motion.div>
                      </div>

                      <div className={styles.field} style={{ marginTop: 16 }}>
                        <label className={styles.label}>Additional Notes</label>
                        <textarea name="notes" className={`${styles.input} ${styles.textarea}`} placeholder="Any modifications, damage, or special features..." value={form.notes} onChange={handleChange} rows={2} />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Your Info */}
                  {step === 3 && (
                    <motion.div key="step3" variants={isReduced ? fadeUp : stepVariants} initial="hidden" animate="visible" exit="exit" className={styles.stepForm}>
                      <h3 className={styles.stepFormTitle}>Your Contact Info</h3>
                      <div className={styles.fieldGrid}>
                        <div className={styles.field} style={{ gridColumn: "1 / -1" }}>
                          <label className={styles.label}>Full Name</label>
                          <input name="name" className={styles.input} placeholder="Your full name" value={form.name} onChange={handleChange} />
                        </div>
                        <div className={styles.field}>
                          <label className={styles.label}>Phone</label>
                          <input name="phone" className={styles.input} placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} />
                        </div>
                        <div className={styles.field}>
                          <label className={styles.label}>Email</label>
                          <input name="email" type="email" className={styles.input} placeholder="your@email.com" value={form.email} onChange={handleChange} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Review */}
                  {step === 4 && (
                    <motion.div key="step4" variants={isReduced ? fadeUp : stepVariants} initial="hidden" animate="visible" exit="exit" className={styles.stepForm}>
                      <h3 className={styles.stepFormTitle}>Review & Submit</h3>
                      
                      {/* WHY: Summary/Review step with staggerChildren fadeUp for list items */}
                      <motion.div className={styles.reviewList} variants={staggerContainer} initial="hidden" animate="visible">
                        <motion.div className={styles.reviewItem} variants={fadeUp}>
                          <div className={styles.reviewIcon}><FaCarSide /></div>
                          <div className={styles.reviewData}>
                            <span className={styles.reviewLabel}>Vehicle</span>
                            <span className={styles.reviewVal}>{form.year} {form.make} {form.model} — {form.mileage} km</span>
                          </div>
                        </motion.div>
                        
                        <motion.div className={styles.reviewItem} variants={fadeUp}>
                          <div className={styles.reviewIcon}><FaStar /></div>
                          <div className={styles.reviewData}>
                            <span className={styles.reviewLabel}>Condition</span>
                            <span className={styles.reviewVal}>{form.condition} {form.notes ? `(w/ notes)` : ""} | {form.uploadedFiles} photos</span>
                          </div>
                        </motion.div>

                        <motion.div className={styles.reviewItem} variants={fadeUp}>
                          <div className={styles.reviewIcon}><FaInfoCircle /></div>
                          <div className={styles.reviewData}>
                            <span className={styles.reviewLabel}>Contact</span>
                            <span className={styles.reviewVal}>{form.name} | {form.email} | {form.phone}</span>
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Nav buttons */}
              <div className={styles.formNav}>
                {step > 1 && (
                  <button className={styles.backBtn} onClick={() => setStep((s) => s - 1)}>← Back</button>
                )}
                <button
                  className={`${styles.nextBtn} ${!canNext() ? styles.nextDisabled : ""}`}
                  onClick={handleNext}
                  disabled={!canNext()}
                >
                  {step === 4 ? "Submit for Valuation →" : "Next →"}
                </button>
              </div>
            </>
          ) : (
            /* Success State */
            <motion.div className={styles.success} initial={isReduced ? false : "hidden"} animate="visible" variants={scaleIn}>
              <div className={styles.successIcon}><FaCheck /></div>
              <h2 className={styles.successTitle}>We've Got Your Submission!</h2>
              <p className={styles.successText}>
                Our team will review your <strong>{form.year} {form.make} {form.model}</strong> and contact you at <strong>{form.phone}</strong> within 2 hours with your valuation.
              </p>
              <button className={styles.successBtn} onClick={() => { setSubmitted(false); setStep(1); setForm({ make: "", model: "", year: "", mileage: "", condition: "", name: "", phone: "", email: "", notes: "", uploadedFiles: 0 }); }}>
                Submit Another Car
              </button>
            </motion.div>
          )}
        </div>

        {/* Trust badges */}
        <motion.div className={styles.trustRow} initial={isReduced ? false : "hidden"} whileInView="visible" viewport={viewportConfig} variants={staggerContainer}>
          {["Free Valuation", "No Hidden Fees", "Same-Day Pickup", "Instant Payment"].map((t) => (
            <motion.div key={t} className={styles.trustBadge} variants={fadeUp}>
              <span className={styles.trustCheck}>✓</span>
              <span>{t}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
};

export default SellYourCar;