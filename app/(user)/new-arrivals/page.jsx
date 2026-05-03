"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion, useDragControls, useAnimation } from "framer-motion";
import Image from "next/image";
import { fadeUp, clipReveal, staggerContainer, slideInLeft, viewportConfig, cardHover, imageZoom } from "@/app/lib/animations";
import styles from "./newarrivals.module.css";
import Link from "next/link";
import { allCars } from "@/app/lib/cars-data";

const MotionImage = motion(Image);
// ============================================================
// FILE: app/(user)/new-arrivals/page.jsx
// ANIMATIONS ADDED:
// - Section titles: clipReveal left-to-right wipe
// - Badges: infinite pulse glow animation
// - Car cards: whileInView staggered slideInLeft
// - Horizontal gallery: useDragControls with momentum and constraints
// - Drag cursor: changes to grabbing during drag
// PERFORMANCE NOTES: dragConstraints calculated dynamically, layout animations avoided where unnecessary.
// ACCESSIBILITY: useReducedMotion applied to disable infinite pulses and heavy drags.
// ============================================================

const newCars = [
 {
  id: 13,
  name: "Lamborghini Aventador",
  brand: "Lamborghini",
  price: 450000,
  year: 2025,
  hp: 769,
  type: "Coupe",
  image: "/comp/images/lamborgini-1.jfif",
  arrivedDaysAgo: 1,
  badge: "Hypercar",
  highlight: "V12 Power",
},
{
  id: 14,
  name: "McLaren 720S",
  brand: "McLaren",
  price: 310000,
  year: 2025,
  hp: 710,
  type: "Coupe",
  image: "/comp/images/meclaran-1.jfif",
  arrivedDaysAgo: 2,
  badge: "Exotic",
  highlight: "Track Beast",
},
{
  id: 15,
  name: "Rolls-Royce Ghost",
  brand: "Rolls-Royce",
  price: 380000,
  year: 2025,
  hp: 563,
  type: "Sedan",
  image: "/comp/images/rolls-royce.jfif",
  arrivedDaysAgo: 3,
  badge: "Ultra Luxury",
  highlight: "Silent Ride",
},
{
  id: 16,
  name: "Range Rover Autobiography",
  brand: "Land Rover",
  price: 195000,
  year: 2025,
  hp: 523,
  type: "SUV",
  image: "/comp/images/Range Rover.jfif",
  arrivedDaysAgo: 4,
  badge: "Luxury",
  highlight: "Executive Comfort",
},
{
  id: 17,
  name: "Audi RS e-tron GT",
  brand: "Audi",
  price: 142000,
  year: 2025,
  hp: 637,
  type: "Electric",
  image: "/comp/images/audi-3.jfif",
  arrivedDaysAgo: 5,
  badge: "EV",
  highlight: "Electric Performance",
},
{
  id: 18,
  name: "Lamborghini Urus S",
  brand: "Lamborghini",
  price: 240000,
  year: 2025,
  hp: 666,
  type: "SUV",
  image: "/comp/images/Lamborghini-Urus-2.jfif",
  arrivedDaysAgo: 6,
  badge: "Featured",
  highlight: "Super SUV",
}
];

const NewArrivals = () => {
  const [featured, setFeatured] = useState(newCars[0]);
  const isReduced = useReducedMotion();
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragControls = useDragControls();

  // Calculate drag constraints dynamically
  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <main className={styles.page}>
      {/* Header */}
      <motion.header 
        className={styles.header}
        initial={isReduced ? false : "hidden"}
        animate="visible"
        variants={isReduced ? {} : staggerContainer}
      >
        <div className={styles.headerInner}>
          <motion.p className={styles.eyebrow} variants={fadeUp}>Fresh Stock</motion.p>
          {/* WHY: clipReveal for dramatic section title entrance */}
          <motion.h1 
            className={styles.title} 
            variants={isReduced ? {} : clipReveal}
          >
            NEW ARRIVALS
          </motion.h1>
          <motion.p className={styles.subtitle} variants={fadeUp}>
            The latest additions to our exclusive fleet — updated weekly
          </motion.p>
        </div>
        <div className={styles.ticker}>
          <div className={styles.tickerTrack}>
            {[...newCars, ...newCars].map((c, i) => (
              <span key={i} className={styles.tickerItem}>
                {c.name} <span className={styles.tickerDot}>·</span>
              </span>
            ))}
          </div>
        </div>
      </motion.header>

      {/* Featured spotlight */}
      <motion.section 
        className={styles.spotlight}
        initial={isReduced ? false : "hidden"}
        whileInView="visible"
        viewport={viewportConfig}
        variants={staggerContainer}
      >
        <motion.div className={styles.spotlightImg} variants={fadeUp}>
          <MotionImage
            src={featured.image}
            alt={featured.name}
            fill
            quality={90}
            sizes="100vw"
          />
          <div className={styles.spotlightGrad} />
          {/* WHY: Infinite pulse glow for "NEW" badge to catch attention */}
          <motion.span 
            className={styles.spotBadge}
            animate={isReduced ? {} : { boxShadow: ["0 0 0px #c9a84c", "0 0 20px #c9a84c", "0 0 0px #c9a84c"] }}
            transition={isReduced ? {} : { duration: 2, repeat: Infinity }}
          >
            {featured.badge}
          </motion.span>
          <span className={styles.arrivalTag}>
            Arrived {featured.arrivedDaysAgo} days ago
          </span>
        </motion.div>

        <div className={styles.spotlightInfo}>
          <motion.p className={styles.spotBrand} variants={fadeUp}>{featured.brand}</motion.p>
          <motion.h2 className={styles.spotName} variants={fadeUp}>{featured.name}</motion.h2>
          <motion.p className={styles.spotHighlight} variants={fadeUp}>{featured.highlight}</motion.p>

          <motion.div className={styles.statRow} variants={staggerContainer}>
            <motion.div className={styles.stat} variants={fadeUp}>
              <span className={styles.statVal}>{featured.hp}</span>
              <span className={styles.statLabel}>HORSEPOWER</span>
            </motion.div>
            <div className={styles.statDivider} />
            <motion.div className={styles.stat} variants={fadeUp}>
              <span className={styles.statVal}>{featured.year}</span>
              <span className={styles.statLabel}>YEAR</span>
            </motion.div>
            <div className={styles.statDivider} />
            <motion.div className={styles.stat} variants={fadeUp}>
              <span className={styles.statVal}>{featured.type}</span>
              <span className={styles.statLabel}>TYPE</span>
            </motion.div>
          </motion.div>

          <motion.div className={styles.spotPrice} variants={fadeUp}>
            ${featured.price.toLocaleString()}
          </motion.div>

          <motion.div className={styles.spotBtns} variants={fadeUp}>
            <Link href={`/testdrive?carName=${encodeURIComponent(featured.name)}`} >
            <motion.button 
              className={styles.btnPrimary}
              whileHover={isReduced ? {} : { y: -3, boxShadow: "0 0 20px rgba(201,168,76,0.5)" }}
              >
              Schedule Test Drive
            </motion.button>
              </Link>
            <motion.button 
              className={styles.btnGhost}
              whileHover={isReduced ? {} : { y: -3, boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}
              >
              View Full Specs
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* All new arrivals - Horizontal Scroll Gallery */}
      <motion.section 
        className={styles.allSection}
        initial={isReduced ? false : "hidden"}
        whileInView="visible"
        viewport={viewportConfig}
        variants={staggerContainer}
      >
        <motion.h2 className={styles.sectionTitle} variants={isReduced ? {} : clipReveal}>
          ALL NEW ARRIVALS
        </motion.h2>
        
        {/* WHY: Horizontal scroll gallery with useDragControls momentum */}
        <motion.div 
          ref={carouselRef} 
          style={{ overflow: "hidden", cursor: isDragging ? "grabbing" : "grab" }}
          whileTap={{ cursor: "grabbing" }}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          onPointerLeave={() => setIsDragging(false)}
        >
          <motion.div 
            drag={isReduced ? false : "x"}
            dragConstraints={{ right: 0, left: -width }}
            dragElastic={0.1}
            style={{ display: "flex", gap: "2rem", width: "max-content", padding: "1rem 0" }}
            variants={staggerContainer}
          >
            {newCars.map((car) => (
              // WHY: Staggered slideInLeft entrance for each card
              <motion.div key={car.id} variants={isReduced ? {} : slideInLeft}>
                <motion.div
                  className={`${styles.card} ${featured.id === car.id ? styles.cardActive : ""}`}
                  onClick={() => setFeatured(car)}
                  style={{ width: "320px", flexShrink: 0, willChange: "transform" }}
                  whileHover={isReduced ? {} : "hover"}
                  initial="rest"
                  animate="rest"
                >
                  <motion.div className={styles.imgWrap} variants={isReduced ? {} : cardHover}>
                    <motion.img 
                      src={car.image} 
                      alt={car.name} 
                      className={styles.img} 
                      variants={isReduced ? {} : imageZoom}
                    />
                    {/* WHY: Infinite pulse glow for "NEW" badge on cards */}
                    <motion.span 
                      className={styles.cardBadge}
                      animate={isReduced ? {} : { boxShadow: ["0 0 0px #c9a84c", "0 0 15px #c9a84c", "0 0 0px #c9a84c"] }}
                      transition={isReduced ? {} : { duration: 2, repeat: Infinity, delay: Math.random() }}
                    >
                      {car.badge}
                    </motion.span>
                  </motion.div>
                  <div className={styles.cardBody}>
                    <p className={styles.cardBrand}>{car.brand}</p>
                    <h3 className={styles.cardName}>{car.name}</h3>
                    <div className={styles.cardMeta}>
                      <span>{car.hp} HP</span>
                      <span>·</span>
                      <span>{car.type}</span>
                      <span>·</span>
                      <span className={styles.daysAgo}>{car.arrivedDaysAgo}d ago</span>
                    </div>
                    <div className={styles.cardFooter}>
                      <span className={styles.cardPrice}>${car.price.toLocaleString()}</span>
                      <button className={styles.viewBtn}>View</button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
  );
};

export default NewArrivals;