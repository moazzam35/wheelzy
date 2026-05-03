"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  cardHover,
  imageZoom,
} from "@/app/lib/animations";
import { allCars, tagColors, formatPrice } from "@/app/lib/cars-data";
import styles from "./browsecars.module.css";
import Image from "next/image";

const MotionImage = motion(Image);

// ─── Filter constants ───────────────────────────────────────────────────────
const brands = [
  "All",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Ferrari",
  "Lamborghini",
  "Land Rover",
  "McLaren",
  "Mercedes-Benz",
  "Nissan",
  "Porsche",
  "Rolls-Royce",
  "Tesla",
];
const types = ["All", "Coupe", "Sedan", "SUV", "Electric", "Hybrid", "Convertible"];
const priceRanges = [
  "All",
  "Under $50K",
  "$50K–$100K",
  "$100K–$200K",
  "$200K+",
];

// ─── Isolated Card Component ────────────────────────────────────────────────
const CarCard = React.memo(({ car, isReduced, onViewDetails }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);
  const tc = tagColors[car.tag] || null;

  const handleMouseMove = (e) => {
    if (isReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    if (isReduced) return;
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      layout={!isReduced}
      initial={isReduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
    >
      <motion.div
        className={styles.card}
        style={
          isReduced
            ? { willChange: "transform" }
            : {
                rotateX,
                rotateY,
                transformPerspective: 1000,
                willChange: "transform",
              }
        }
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        variants={isReduced ? {} : cardHover}
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        {/* Tag */}
        {car.tag && tc && (
          <span
            className={styles.tag}
            style={{
              background: tc.bg,
              border: `1px solid ${tc.border}`,
              color: tc.text,
            }}
          >
            {car.tag}
          </span>
        )}

        {/* Image */}
        <motion.div
          className={styles.imgWrap}
          variants={isReduced ? {} : cardHover}
        >
          <MotionImage
            src={car.image}
            alt={car.name}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className={styles.img}
            variants={isReduced ? {} : imageZoom}
          />
          <div className={styles.imgOverlay} />
        </motion.div>

        {/* Body */}
        <div className={styles.cardBody}>
          <div className={styles.cardTop}>
            <span className={styles.cardBrand}>{car.brand}</span>
            <span className={styles.cardYear}>{car.year}</span>
          </div>
          <h3 className={styles.cardName}>{car.name}</h3>
          <div className={styles.cardStats}>
            <span>{car.hp} HP</span>
            <span className={styles.dot}>·</span>
            <span>{car.type}</span>
          </div>
          <div className={styles.cardFooter}>
            <motion.span
              className={styles.cardPrice}
              variants={
                isReduced
                  ? {}
                  : {
                      rest: { color: "var(--text-primary)" },
                      hover: { color: "#c9a84c" },
                    }
              }
            >
              {formatPrice(car.price)}
            </motion.span>

            {/* Navigate to detail page on click */}
            <motion.button
              className={styles.viewBtn}
              onClick={() => onViewDetails(car.id)}
              aria-label={`View details for ${car.name}`}
              variants={
                isReduced
                  ? {}
                  : { rest: { color: "var(--text-muted)" } }
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                cursor: "pointer",
              }}
            >
              View Details
              <motion.span
                variants={isReduced ? {} : { rest: { x: 0 }, hover: { x: 6 } }}
              >
                →
              </motion.span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

CarCard.displayName = "CarCard";

// ─── BrowseCars Page ────────────────────────────────────────────────────────
export default function BrowseCars() {
  const router = useRouter();
  const isReduced = useReducedMotion();

  const [activeBrand, setActiveBrand] = useState("All");
  const [activeType, setActiveType]   = useState("All");
  const [activePrice, setActivePrice] = useState("All");
  const [sort, setSort]               = useState("default");

  // Memoised filter + sort so it doesn't recompute on every render
  const filtered = useMemo(() => {
    const priceFilter = (car) => {
      if (activePrice === "All") return true;
      if (activePrice === "Under $50K") return car.price < 50000;
      if (activePrice === "$50K–$100K") return car.price >= 50000 && car.price <= 100000;
      if (activePrice === "$100K–$200K") return car.price > 100000 && car.price <= 200000;
      if (activePrice === "$200K+") return car.price > 200000;
      return true;
    };

    let result = allCars
      .filter((c) => activeBrand === "All" || c.brand === activeBrand)
      .filter((c) => activeType === "All" || c.type === activeType)
      .filter(priceFilter);

    if (sort === "price-asc")  result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "hp")         result = [...result].sort((a, b) => b.hp - a.hp);

    return result;
  }, [activeBrand, activeType, activePrice, sort]);

  // Navigate to the dynamic detail page
  const handleViewDetails = (id) => {
    router.push(`/cars/${id}`);
  };

  const resetFilters = () => {
    setActiveBrand("All");
    setActiveType("All");
    setActivePrice("All");
    setSort("default");
  };

  return (
    <main className={styles.page}>
      {/* ── Header + Filters ── */}
      <motion.div
        initial={isReduced ? false : "hidden"}
        animate="visible"
        variants={isReduced ? {} : staggerContainer}
      >
        <motion.header
          className={styles.pageHeader}
          variants={isReduced ? {} : fadeUp}
        >
          <p className={styles.eyebrow}>Our Inventory</p>
          <h1 className={styles.title}>BROWSE CARS</h1>
          <div className={styles.titleLine} />
        </motion.header>

        <motion.div
          className={styles.filterSection}
          variants={isReduced ? {} : fadeUp}
        >
          {/* Brand filter */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>BRAND</span>
            <div className={styles.pills}>
              {brands.map((b) => (
                <button
                  key={b}
                  className={`${styles.pill} ${activeBrand === b ? styles.pillActive : ""}`}
                  onClick={() => setActiveBrand(b)}
                  aria-pressed={activeBrand === b}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Type filter */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>TYPE</span>
            <div className={styles.pills}>
              {types.map((t) => (
                <button
                  key={t}
                  className={`${styles.pill} ${activeType === t ? styles.pillActive : ""}`}
                  onClick={() => setActiveType(t)}
                  aria-pressed={activeType === t}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Price + Sort row */}
          <div className={styles.filterRow}>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>PRICE</span>
              <div className={styles.pills}>
                {priceRanges.map((p) => (
                  <button
                    key={p}
                    className={`${styles.pill} ${activePrice === p ? styles.pillActive : ""}`}
                    onClick={() => setActivePrice(p)}
                    aria-pressed={activePrice === p}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.sortGroup}>
              <span className={styles.filterLabel}>SORT BY</span>
              <select
                className={styles.select}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="hp">Horsepower</option>
              </select>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.resultsBar}
          variants={isReduced ? {} : fadeUp}
        >
          <span className={styles.resultsCount}>
            {filtered.length} vehicles found
          </span>
        </motion.div>
      </motion.div>

      {/* ── Grid ── */}
      <motion.div className={styles.grid} layout>
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              className={styles.empty}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              key="empty-state"
            >
              <p>No vehicles match your filters.</p>
              <button onClick={resetFilters} className={styles.resetBtn}>
                Reset Filters
              </button>
            </motion.div>
          ) : (
            filtered.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                isReduced={isReduced}
                onViewDetails={handleViewDetails}
              />
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}