"use client";
import React, { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { allCars, tagColors, formatPrice } from "@/app/lib/cars-data";
import styles from "./cardetail.module.css";
import Link from "next/link";

const MotionImage = motion(Image);
// ── Spec icon map ────────────────────────────────────────────────────────────
const specIcons = {
  topSpeed: "◈",
  acceleration: "◉",
  engine: "⬡",
  drivetrain: "◎",
};

// ── Related cars (same brand, exclude self) ──────────────────────────────────
function getRelated(car) {
  return allCars
    .filter((c) => c.brand === car.brand && c.id !== car.id)
    .slice(0, 3);
}

// ── Hero parallax image ──────────────────────────────────────────────────────
function HeroImage({ car, tc, isReduced }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className={styles.hero} ref={ref}>
      <motion.div className={styles.heroImgWrap} style={isReduced ? {} : { y }}>
        <MotionImage
          src={car.image}
          alt={car.name}
          className={styles.heroImg}
          width={1200}
          height={675}
          priority
          quality={90}
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className={styles.heroOverlayBottom} />
      <div className={styles.heroOverlayTop} />

      {/* Tag badge */}
      {car.tag && (
        <motion.span
          className={styles.heroTag}
          style={{
            background: tc.bg,
            border: `1px solid ${tc.border}`,
            color: tc.text,
          }}
          initial={isReduced ? false : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {car.tag}
        </motion.span>
      )}

      {/* Back button inside hero */}
      <BackButton />

      {/* Hero text overlay */}
      <motion.div
        className={styles.heroText}
        initial={isReduced ? false : "hidden"}
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        <motion.p
          className={styles.heroBrand}
          variants={
            isReduced
              ? {}
              : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
          }
        >
          {car.brand} · {car.year}
        </motion.p>
        <motion.h1
          className={styles.heroName}
          variants={
            isReduced
              ? {}
              : {
                  hidden: { opacity: 0, y: 32 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                }
          }
        >
          {car.name}
        </motion.h1>
        <motion.p
          className={styles.heroPrice}
          variants={
            isReduced
              ? {}
              : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
          }
        >
          {formatPrice(car.price)}
        </motion.p>
      </motion.div>
    </div>
  );
}

// ── Back button ──────────────────────────────────────────────────────────────
function BackButton() {
  const router = useRouter();
  return (
    <motion.button
      className={styles.backBtn}
      onClick={() => router.back()}
      aria-label="Go back to inventory"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      whileHover={{ x: -4 }}
      whileTap={{ scale: 0.96 }}
    >
      <span className={styles.backArrow}>←</span>
      <span>Back to Inventory</span>
    </motion.button>
  );
}

// ── Animated stat bar ────────────────────────────────────────────────────────
function HpBar({ hp, isReduced }) {
  const maxHp = 1020; // Tesla Plaid is max
  const pct = Math.min((hp / maxHp) * 100, 100);

  return (
    <div className={styles.hpBarWrap}>
      <div className={styles.hpBarTrack}>
        <motion.div
          className={styles.hpBarFill}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={
            isReduced
              ? { duration: 0 }
              : { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }
          }
        />
      </div>
      <span className={styles.hpBarLabel}>{hp} HP</span>
    </div>
  );
}

// ── Related card ─────────────────────────────────────────────────────────────
function RelatedCard({ car, onClick, isReduced }) {
  const tc = tagColors[car.tag] || null;
  return (
    <motion.div
      className={styles.relatedCard}
      onClick={() => onClick(car.id)}
      whileHover={isReduced ? {} : { y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(car.id)}
      aria-label={`View ${car.name}`}
    >
      <div className={styles.relatedImgWrap}>
        <MotionImage
          src={car.image}
          alt={car.name}
          className={styles.relatedImg}
          width={400}
          height={225}
          quality={85}
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <div className={styles.relatedOverlay} />
        {car.tag && tc && (
          <span
            className={styles.relatedTag}
            style={{
              background: tc.bg,
              border: `1px solid ${tc.border}`,
              color: tc.text,
            }}
          >
            {car.tag}
          </span>
        )}
      </div>
      <div className={styles.relatedBody}>
        <p className={styles.relatedBrand}>{car.brand}</p>
        <p className={styles.relatedName}>{car.name}</p>
        <p className={styles.relatedPrice}>{formatPrice(car.price)}</p>
      </div>
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const isReduced = useReducedMotion();

  const id = parseInt(params.id, 10);
  const car = allCars.find((c) => c.id === id);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (!car) {
    return (
      <main className={styles.notFound}>
        <h1>Vehicle not found</h1>
        <button
          className={styles.backBtnAlt}
          onClick={() => router.push("/cars")}
        >
          ← Return to Inventory
        </button>
      </main>
    );
  }

  const tc = tagColors[car.tag] || {
    bg: "rgba(255,255,255,0.05)",
    border: "#555",
    text: "#aaa",
  };
  const related = getRelated(car);

  const handleRelatedClick = (relatedId) => {
    router.push(`/cars/${relatedId}`);
  };

  return (
    <main style={{ marginTop: "20px" }} className={styles.page}>
      {/* ── HERO ─────────────────────────────────────────── */}
      <HeroImage car={car} tc={tc} isReduced={isReduced} />

      {/* ── CONTENT WRAPPER ──────────────────────────────── */}
      <div className={styles.content}>
        {/* ── QUICK STATS BAR ──────────────────────────────── */}
        <motion.section
          className={styles.quickStats}
          initial={isReduced ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {Object.entries(car.specs).map(([key, val]) => (
            <div key={key} className={styles.quickStat}>
              <span className={styles.quickStatIcon}>
                {specIcons[key] || "◇"}
              </span>
              <span className={styles.quickStatVal}>{val}</span>
              <span className={styles.quickStatKey}>
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
            </div>
          ))}
          <div className={styles.quickStat}>
            <span className={styles.quickStatIcon}>⚡</span>
            <span className={styles.quickStatVal}>{car.hp} HP</span>
            <span className={styles.quickStatKey}>Horsepower</span>
          </div>
        </motion.section>

        {/* ── TWO COLUMN: description + hp bar ─────────────── */}
        <section className={styles.twoCol}>
          {/* Left: description */}
          <motion.div
            className={styles.descCol}
            initial={isReduced ? false : { opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className={styles.sectionEyebrow}>About This Vehicle</p>
            <h2 className={styles.sectionTitle}>The Story</h2>
            <p className={styles.description}>{car.description}</p>

            {/* Metadata pills */}
            <div className={styles.metaPills}>
              <span className={styles.metaPill}>
                <span className={styles.metaPillLabel}>Body</span>
                {car.type}
              </span>
              <span className={styles.metaPill}>
                <span className={styles.metaPillLabel}>Year</span>
                {car.year}
              </span>
              <span className={styles.metaPill}>
                <span className={styles.metaPillLabel}>Brand</span>
                {car.brand}
              </span>
            </div>
          </motion.div>

          {/* Right: HP meter + full specs */}
          <motion.div
            className={styles.specsCol}
            initial={isReduced ? false : { opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className={styles.sectionEyebrow}>Performance</p>
            <h2 className={styles.sectionTitle}>Specifications</h2>

            {/* HP power bar */}
            <div className={styles.hpSection}>
              <p className={styles.hpLabel}>Power Output</p>
              <HpBar hp={car.hp} isReduced={isReduced} />
            </div>

            {/* Spec rows */}
            <div className={styles.specRows}>
              {Object.entries(car.specs).map(([key, val], i) => (
                <motion.div
                  key={key}
                  className={styles.specRow}
                  initial={isReduced ? false : { opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                >
                  <span className={styles.specRowLabel}>
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <div className={styles.specRowDivider} />
                  <span className={styles.specRowVal}>{val}</span>
                </motion.div>
              ))}
              <motion.div
                className={styles.specRow}
                initial={isReduced ? false : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: Object.keys(car.specs).length * 0.07,
                  duration: 0.5,
                }}
              >
                <span className={styles.specRowLabel}>Horsepower</span>
                <div className={styles.specRowDivider} />
                <span className={styles.specRowVal}>{car.hp} HP</span>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── PRICING + CTA ─────────────────────────────────── */}
        <motion.section
          className={styles.ctaSection}
          initial={isReduced ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.ctaLeft}>
            <p className={styles.ctaPriceLabel}>Starting at</p>
            <p className={styles.ctaPrice}>{formatPrice(car.price)}</p>
            <p className={styles.ctaPriceSub}>
              Manufacturer suggested retail price
            </p>
          </div>
          <div className={styles.ctaButtons}>
            <Link href={`/testdrive?carName=${encodeURIComponent(car.name)}`}>
              <motion.button
                className={styles.ctaBtnPrimary}
                whileHover={
                  isReduced
                    ? {}
                    : {
                        scale: 1.04,
                        boxShadow: "0 0 40px rgba(201,168,76,0.45)",
                      }
                }
                whileTap={{ scale: 0.97 }}
              >
                Schedule Test Drive
              </motion.button>
            </Link>
            <motion.button
              className={styles.ctaBtnSecondary}
              whileHover={
                isReduced
                  ? {}
                  : { scale: 1.04, borderColor: "#c9a84c", color: "#c9a84c" }
              }
              whileTap={{ scale: 0.97 }}
            >
              Apply for Financing
            </motion.button>
            <motion.button
              className={styles.ctaBtnGhost}
              whileHover={isReduced ? {} : { scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Download Brochure ↓
            </motion.button>
          </div>
        </motion.section>

        {/* ── RELATED CARS ─────────────────────────────────── */}
        {related.length > 0 && (
          <section className={styles.relatedSection}>
            <motion.div
              className={styles.relatedHeader}
              initial={isReduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className={styles.sectionEyebrow}>More from {car.brand}</p>
              <h2 className={styles.sectionTitle}>Related Vehicles</h2>
            </motion.div>

            <div className={styles.relatedGrid}>
              {related.map((rc, i) => (
                <motion.div
                  key={rc.id}
                  initial={isReduced ? false : { opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                >
                  <RelatedCard
                    car={rc}
                    onClick={handleRelatedClick}
                    isReduced={isReduced}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
