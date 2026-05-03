"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  cardHover,
  imageZoom,
  clipReveal,
  viewportConfig,
} from "@/app/lib/animations";
import styles from "./herosection.module.css";
import Link from "next/link";
import Image from "next/image";

const MotionImage = motion(Image);
const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const cars = [
  {
    id: 1,
    name: "Lamborghini Sián FKP",
    brand: "Lamborghini ",
    price: "$3,700,000",
    hp: "819 HP",
    type: "Hybrid",
    image: "/comp/images/lamborgini-sian.jfif",
  },
 {
  id: 2,
  name: "Nissan GT-R",
  brand: "Nissan",
  price: "$100,000",
  hp: "565 HP",
  type: "Sports Car",
  image: "/comp/images/nissan-bg.PNG",
},
  {
    id: 3,
    name: "Mercedes-Benz G63 AMG",
    brand: "mercdees",
    price: "$185,000",
    hp: "577 HP",
    type: "SUV",
    image: "/comp/images/G-wagon.jfif",
  },
  {
    id: 4,
    name: "Rolls-Royce Cullinan",
    brand: "Rolls-Royce",
    price: "$430,000",
    hp: "563 HP",
    type: "SUV",
    image: "/comp/images/rolls-royce-1.jfif",
  },
  {
    id: 5,
    name: "Bentley Continental GT",
    brand: "Bentlay",
    price: "$250,000",
    hp: "659 HP",
    type: "Luxry",
    image: "/comp/images/bentlay-2.jfif",
  },
  {
    id: 6,
    name: "BMW M4 CSL",
    brand: "BMW",
    price: "$140,000",
    hp: "543 HP",
    type: "Super Car",
    image: "/comp/images/bmw-m4.jfif",
  },
];

const features = [
  {
    icon: "◈",
    num: "01",
    title: "Certified Excellence",
    body: "Every vehicle passes a rigorous 200-point inspection before reaching your hands. Only the finest make the cut.",
  },
  {
    icon: "◉",
    num: "02",
    title: "Tailored Financing",
    body: "Bespoke financing plans built around your life — flexible terms, competitive rates, zero compromise.",
  },
  {
    icon: "◆",
    num: "03",
    title: "White-Glove Delivery",
    body: "We bring the showroom to you. Fully insured, door-to-door delivery anywhere in the country.",
  },
  {
    icon: "◇",
    num: "04",
    title: "Lifetime Support",
    body: "Our relationship doesn't end at the sale. Dedicated advisors on call — for as long as you drive with us.",
  },
];

const categories = [
  { label: "Luxury", count: "48 cars", accent: "#c9a84c" },
  { label: "Sports", count: "31 cars", accent: "#c0392b" },
  { label: "Electric", count: "22 cars", accent: "#2980b9" },
  { label: "SUV", count: "37 cars", accent: "#27ae60" },
  { label: "Exotic", count: "14 cars", accent: "#8e44ad" },
  { label: "Classic", count: "19 cars", accent: "#d35400" },
];

const brands = [
  { name: "BMW", logo: "B" },
  { name: "Mercedes", logo: "M" },
  { name: "Porsche", logo: "P" },
  { name: "Audi", logo: "A" },
  { name: "Ferrari", logo: "F" },
  { name: "Lamborghini", logo: "L" },
  { name: "Tesla", logo: "T" },
  { name: "Bentley", logo: "B" },
];

const testimonials = [
  {
    name: "James Hartley",
    role: "Entrepreneur",
    stars: 5,
    review:
      "Purchased my Porsche 911 here and the entire experience was flawless. The team knew the car inside and out. Best dealership I've ever dealt with — period.",
  },
  {
    name: "Sophia Reyes",
    role: "Creative Director",
    stars: 5,
    review:
      "They found me exactly the spec I wanted in three days. The delivery was white-glove all the way. I won't buy a car anywhere else again.",
  },
  {
    name: "Marcus Ellington",
    role: "Racing Enthusiast",
    stars: 5,
    review:
      "Wheelzy treats every customer like a VIP. Transparent pricing, zero pressure, and the most beautiful inventory in the city. Absolute five stars.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────────────────── */
const Hero = () => {
  const isReduced = useReducedMotion();
  const videoRef = useRef(null);
  const { scrollY } = useScroll();

  const textY = useTransform(scrollY, [0, 500], [0, -80]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.65, 0.9]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      setTimeout(() => {
        video.play().catch(() => {
          const resume = () => {
            video.play();
            document.removeEventListener("click", resume);
          };
          document.addEventListener("click", resume, { once: true });
        });
      }, 100);
    };

    if (video.readyState >= 3) tryPlay();
    else video.addEventListener("canplay", tryPlay, { once: true });

    return () => video.removeEventListener("canplay", tryPlay);
  }, []);

  const headline = "DOMINATE THE ROAD";
  const headlineWords = headline.split(" ");

  return (
    <section className={styles.heroSection}>
      <div className={styles.sticky}>
        <motion.video
          ref={videoRef}
          className={styles.video}
          src="/comp/video/hero-video.mp4"
          muted
          playsInline
          preload="metadata"
          initial={isReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className={styles.scrim} />

        <motion.div
          className={styles.overlay}
          initial={isReduced ? false : { opacity: 0 }}
          animate={{ opacity: 0.65 }}
          style={{ opacity: overlayOpacity }}
          transition={{ duration: 1.2 }}
        >
          <div className={styles.cornerTL} />
          <motion.div
            className={styles.copy}
            style={isReduced ? {} : { y: textY }}
          >
            <motion.p
              className={styles.eyebrow}
              initial={isReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              No Limits
            </motion.p>

            {/* Replace your existing <h1 className={styles.headline}> block */}
<h1 className={styles.headline}>
  {headlineWords.map((word, wi) => (
    <span key={wi} style={{ display: "inline-block", marginRight: "0.25em", overflow: "hidden" }}>
      {word.split("").map((char, ci) => (
        <motion.span
          key={ci}
          style={{ display: "inline-block", willChange: "transform" }}
          initial={isReduced ? false : { y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            delay: 3.5 + wi * 0.4 + ci * 0.1,
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  ))}
</h1>

            <motion.div
              className={styles.ctaRow}
              initial={isReduced ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay:5.5,
              }}
            >
              <Link href="/cars" >
                <motion.button
                  className={styles.btnPrimary}
                  whileHover={
                    isReduced
                      ? {}
                      : { y: -3, boxShadow: "0 0 20px rgba(201,168,76,0.5)" }
                  }
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  Find Your Car
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "#f5f5f0",
              opacity: 0.8,
            }}
            animate={isReduced ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   1 — FEATURED CARS — Draggable Carousel
───────────────────────────────────────────────────────────────────────────── */
const FeaturedCars = () => {
  const isReduced = useReducedMotion();
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const update = () => setWidth(el.scrollWidth - el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.sectionHead}
        initial={isReduced ? false : "hidden"}
        whileInView="visible"
        viewport={viewportConfig}
        variants={fadeUp}
      >
        <p className={styles.eyebrow}>Our Showroom</p>
        <h2 className={styles.sectionTitle}>FEATURED VEHICLES</h2>
        <div className={styles.titleRule} />
      </motion.div>

      <motion.div
        ref={carouselRef}
        style={{
          overflow: "hidden",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
        whileTap={{ cursor: "grabbing" }}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        onPointerLeave={() => setIsDragging(false)}
        initial={isReduced ? false : "hidden"}
        whileInView="visible"
        viewport={viewportConfig}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.div
          drag={isReduced ? false : "x"}
          dragConstraints={{ right: 0, left: -width }}
          dragElastic={0.1}
          dragMomentum={true}
          style={{
            display: "flex",
            gap: "2rem",
            width: "max-content",
            padding: "1rem 0",
          }}
        >
          {cars.map((car) => (
            <motion.div key={car.id} variants={isReduced ? {} : slideInLeft}>
              <motion.div
                className={styles.carCard}
                style={{
                  width: "320px",
                  flexShrink: 0,
                  willChange: "transform",
                }}
                whileHover={isReduced ? {} : "hover"}
                initial="rest"
                animate="rest"
              >
                <motion.div
                  className={styles.carImgWrap}
                  variants={isReduced ? {} : cardHover}
                >
                  <MotionImage
                    src={car.image}
                    alt={car.name}
                    className={styles.carImg}
                    variants={isReduced ? {} : imageZoom}
                    draggable={false}
                    width={320}
                    height={180}
                    priority={car.id <= 2} // Prioritize first 2 images
                    loading={car.id > 2 ? "lazy" : "eager"}
                    quality={85}
                  />
                  <div className={styles.carImgOverlay} />
                  <motion.span
                    className={styles.carType}
                    animate={
                      isReduced
                        ? {}
                        : {
                            boxShadow: [
                              "0 0 0px rgba(201,168,76,0)",
                              "0 0 12px rgba(201,168,76,0.6)",
                              "0 0 0px rgba(201,168,76,0)",
                            ],
                          }
                    }
                    transition={
                      isReduced
                        ? {}
                        : {
                            duration: 2.5,
                            repeat: Infinity,
                            delay: car.id * 0.3,
                          }
                    }
                  >
                    {car.type}
                  </motion.span>
                </motion.div>
                <div className={styles.carBody}>
                  <p className={styles.carBrand}>{car.brand}</p>
                  <h3 className={styles.carName}>{car.name}</h3>
                  <p className={styles.carSpecs}>{car.hp}</p>
                  <div className={styles.carFooter}>
                    <span className={styles.carPrice}>{car.price}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.sectionCta}
        initial={isReduced ? false : "hidden"}
        whileInView="visible"
        viewport={viewportConfig}
        variants={fadeUp}
      >
        <Link href="/cars" className={styles.ghostBtn}>
          Browse Full Inventory →
        </Link>
      </motion.div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   2 — WHY US
───────────────────────────────────────────────────────────────────────────── */
const WhyUs = () => {
  const isReduced = useReducedMotion();
  return (
    <section className={styles.whySection}>
      <div className={styles.whyInner}>
        <motion.div
          className={styles.whyLeft}
          initial={isReduced ? false : "hidden"}
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
        >
          <p className={styles.eyebrow}>Why Wheelzy</p>
          <h2 className={styles.whySectionTitle}>
            THE STANDARD
            <br />
            OTHERS CHASE
          </h2>
          <p className={styles.whyBody}>
            We don't just sell cars. We curate machines. Every vehicle, every
            interaction, every detail is held to a standard most dealerships
            only dream of.
          </p>
          <Link href="/about" className={styles.goldBtn}>
            Our Story →
          </Link>
        </motion.div>

        <motion.div
          className={styles.whyGrid}
          initial={isReduced ? false : "hidden"}
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
        >
          {features.map((f, i) => (
            <motion.div
              className={styles.featureCard}
              key={i}
              variants={fadeUp}
            >
              <div className={styles.featureTop}>
                {/* <span className={styles.featureIcon}>{f.icon}</span>
                <span className={styles.featureNum}>{f.num}</span> */}
              </div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureBody}>{f.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};


/* ─────────────────────────────────────────────────────────────────────────────
   4 — CINEMATIC EXPERIENCE
───────────────────────────────────────────────────────────────────────────── */
const Experience = () => {
  const isReduced = useReducedMotion();
  return (
    <section className={styles.expSection}>
      <div className={styles.expBg}>
        <Image
          src="/comp/images/bg-bmw.jfif"
          alt="BMW luxury car background"
          className={styles.expBgImg}
          fill
          priority
          quality={90}
          sizes="100vw"
        />
        <div className={styles.expScrim} />
      </div>

      <motion.div
        className={styles.expContent}
        initial={isReduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      >
        <p className={styles.eyebrowLight}>The Wheelzy Experience</p>
        <h2 className={styles.expTitle}>
          FEEL EVERY
          <br />
          HEARTBEAT
        </h2>
        <div className={styles.expRule} />
        <p className={styles.expSub}>
          From the showroom floor to the open road — this is what it means to
          drive without compromise.
        </p>
      </motion.div>

      <motion.div
        className={styles.expStats}
        initial={isReduced ? false : "hidden"}
        whileInView="visible"
        viewport={viewportConfig}
        variants={staggerContainer}
      >
        {[
          ["5,000+", "Cars Sold"],
          ["12+", "Years Operating"],
          ["98%", "Satisfaction"],
          ["50+", "Brands"],
        ].map(([v, l], i) => (
          <motion.div className={styles.expStat} key={i} variants={fadeUp}>
            <span className={styles.expStatVal}>{v}</span>
            <span className={styles.expStatLabel}>{l}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   5 — TESTIMONIALS
───────────────────────────────────────────────────────────────────────────── */
const Testimonials = () => {
  const isReduced = useReducedMotion();
  return (
    <section className={styles.testSection}>
      <motion.div
        className={styles.sectionHead}
        initial={isReduced ? false : "hidden"}
        whileInView="visible"
        viewport={viewportConfig}
        variants={fadeUp}
      >
        <p className={styles.eyebrow}>Client Stories</p>
        <h2 className={styles.sectionTitle}>WHAT THEY SAY</h2>
        <div className={styles.titleRule} />
      </motion.div>

      <motion.div
        className={styles.testGrid}
        initial={isReduced ? false : "hidden"}
        whileInView="visible"
        viewport={viewportConfig}
        variants={staggerContainer}
      >
        {testimonials.map((t, i) => (
          <motion.div className={styles.testCard} key={i} variants={fadeUp}>
            <div className={styles.testStars}>{"★".repeat(t.stars)}</div>
            <p className={styles.testReview}>"{t.review}"</p>
            <div className={styles.testAuthor}>
              <div className={styles.testAvatar}>{t.name.charAt(0)}</div>
              <div>
                <p className={styles.testName}>{t.name}</p>
                <p className={styles.testRole}>{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   6 — FINAL CTA
───────────────────────────────────────────────────────────────────────────── */
const FinalCTA = () => {
  const isReduced = useReducedMotion();
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaBg} />
      <motion.div
        className={styles.ctaInner}
        initial={isReduced ? false : "hidden"}
        whileInView="visible"
        viewport={viewportConfig}
        variants={clipReveal}
      >
        <p className={styles.eyebrow}>Your Next Chapter</p>
        <h2 className={styles.ctaTitle}>
          FIND YOUR
          <br />
          PERFECT MACHINE
        </h2>
        <p className={styles.ctaSub}>
          Over 5,000 premium vehicles. Unmatched service. Your dream car is one
          click away.
        </p>
        <div className={styles.ctaBtns}>
          <Link href="/cars" >
          <motion.button
            className={styles.goldBtn}
            whileHover={
              isReduced
              ? {}
              : { y: -3, boxShadow: "0 0 20px rgba(201,168,76,0.5)" }
            }
            >
            Browse All Cars
          </motion.button>
            </Link>
          <Link href="/contact">
          <motion.button
            className={styles.ghostBtn}
            whileHover={
              isReduced
                ? {}
                : { y: -3, boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }
            }
          >
            Speak to an Advisor
          </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function Page() {
  return (
    <>
      <Hero />
      <FeaturedCars />
      <WhyUs />
      <Experience />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
