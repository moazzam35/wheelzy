"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./blog.module.css";

/* ─────────────────────────────────────────────────────────────────────────── */
const blogPosts =  [
  {
    id: 1,
    title: "Mastering High-Performance Car Maintenance",
    slug: "high-performance-car-maintenance",
    excerpt:
      "Learn how to maintain elite performance machines like the BMW M3 Competition — from engine tuning to brake longevity and peak performance care.",
    category: "Maintenance",
    tags: ["Performance", "BMW", "Service"],
    author: "Auto Expert Team",
    date: "Mar 18, 2025",
    readTime: "7 min read",
    featured: true,
    image: "/comp/images/bmw-m3.jfif",
    carRef: "BMW M3 Competition",
  },
  {
    id: 2,
    title: "Electric vs Gasoline: The Luxury Perspective",
    slug: "electric-vs-gasoline-luxury",
    excerpt:
      "Compare next-generation electric luxury like the Rolls-Royce Spectre with traditional V12 power to understand the future of premium driving.",
    category: "Technology",
    tags: ["EV", "Rolls-Royce", "Future Tech"],
    author: "Tech Mobility Desk",
    date: "Mar 15, 2025",
    readTime: "10 min read",
    featured: true,
    image: "/comp/images/rolls-royce-2.jfif",
    carRef: "Rolls-Royce Spectre",
  },
  {
    id: 3,
    title: "Luxury Car Ownership: First-Year Experience",
    slug: "luxury-car-ownership-first-year",
    excerpt:
      "Owning a Mercedes-AMG C63 S is more than driving — it’s about maintenance, comfort, and experiencing true automotive excellence daily.",
    category: "Lifestyle",
    tags: ["Luxury", "Mercedes-Benz", "Ownership"],
    author: "Premium Auto Insights",
    date: "Mar 12, 2025",
    readTime: "8 min read",
    featured: false,
    image: "/comp/images/mercdees-1.jfif",
    carRef: "Mercedes-AMG C63 S",
  },
  {
    id: 4,
    title: "Ultimate Supercar Road Trip Guide",
    slug: "supercar-road-trip-guide",
    excerpt:
      "Take your Porsche 911 Carrera S on the perfect road trip with performance tips, scenic routes, and driving strategies for long journeys.",
    category: "Travel",
    tags: ["Porsche", "Road Trip", "Adventure"],
    author: "Drive & Explore",
    date: "Mar 10, 2025",
    readTime: "6 min read",
    featured: false,
    image: "/comp/images/porsche-911.jfif",
    carRef: "Porsche 911 Carrera S",
  },
  {
    id: 5,
    title: "Understanding Warranty in High-End Cars",
    slug: "luxury-car-warranty-guide",
    excerpt:
      "From Audi RS7 to exotic machines, learn how warranties work and how to protect your investment in high-performance vehicles.",
    category: "Support",
    tags: ["Audi", "Warranty", "Guide"],
    author: "Auto Support Team",
    date: "Mar 8, 2025",
    readTime: "9 min read",
    featured: false,
    image: "/comp/images/Audi-1.jfif",
    carRef: "Audi RS7 Sportback",
  },
  {
    id: 6,
    title: "The Future of Automotive Innovation",
    slug: "future-automotive-technology",
    excerpt:
      "From Lamborghini hybrid hypercars to AI-driven systems, explore how the next generation of vehicles is redefining performance and intelligence.",
    category: "Technology",
    tags: ["Lamborghini", "AI", "Innovation"],
    author: "Future Mobility Lab",
    date: "Mar 5, 2025",
    readTime: "11 min read",
    featured: true,
    image: "/comp/images/lamborghini-huracan.jfif",
    carRef: "Lamborghini Huracán EVO",
  },
];

const categories = ["All", "Maintenance", "Technology", "Lifestyle", "Travel", "Support"];

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─────────────────────────────────────────────────────────────────────────── */
const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [ref, visible] = useReveal();

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <>
      {/* Hero */}
      <section className={styles.blogHero}>
        <div className={styles.heroBg} />
        <div className={styles.heroScrim} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Knowledge Hub</p>
          <h1 className={styles.heroTitle}>THE WHEELZY BLOG</h1>
          <p className={styles.heroSub}>Expert insights, maintenance tips, and automotive inspiration</p>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.filterSection}>
        <div className={styles.filterInner}>
          <p className={styles.filterLabel}>Filter by Category</p>
          <div className={styles.categoryTabs}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.catTab} ${selectedCategory === cat ? styles.active : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className={styles.blogSection}>
        <div ref={ref} className={`${styles.postGrid} ${visible ? styles.revealed : ""}`}>
          {filteredPosts.map((post, i) => (
            <article
              className={styles.postCard}
              key={post.id}
              style={{ "--delay": `${i * 100}ms` }}
            >
              <div className={styles.postImageWrap}>
                <Image
                  src={post.image}
                  alt={post.title}
                  className={styles.postImage}
                  fill
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className={styles.postImageOverlay} />
                <span className={styles.category}>{post.category}</span>
              </div>
              <div className={styles.postBody}>
                <div className={styles.postMeta}>
                  <span className={styles.date}>{post.date}</span>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                <Link href= "#" className={styles.readMore}>
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} />
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Subscribe to Our Newsletter</h2>
          <p className={styles.ctaSub}>Get the latest automotive insights delivered to your inbox</p>
          <div className={styles.ctaForm}>
            <input type="email" placeholder="your@email.com" className={styles.emailInput} />
            <button className={styles.subscribeBtn}>Subscribe</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;