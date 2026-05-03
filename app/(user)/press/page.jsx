"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./media.module.css";

/* ─────────────────────────────────────────────────────────────────────────────
   WHEELZY — media.jsx
   Sections: Hero Banner → Press Coverage → Photo Gallery → Video Vault → Press Kit CTA
   Theme: Dark luxury automotive  |  Gold / Obsidian / Smoke
   Add to <head>:
     <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
───────────────────────────────────────────────────────────────────────────── */

/* ── Data ──────────────────────────────────────────────────────────────────── */

const pressItems = [
  {
    outlet: "AutoWeek",
    logo: "AW",
    headline: "Wheelzy Redefines the Premium Car-Buying Experience",
    excerpt: "Few dealerships have managed to combine curation, service, and technology as seamlessly as Wheelzy has in its latest showroom overhaul.",
    date: "March 2025",
    tag: "Feature",
  },
  {
    outlet: "Road & Track",
    logo: "R&T",
    headline: "The Dealership That Sells Cars Like a Luxury Boutique",
    excerpt: "Walking into Wheelzy feels less like shopping for a vehicle and more like browsing a curated gallery of mechanical art.",
    date: "January 2025",
    tag: "Review",
  },
  {
    outlet: "Forbes Autos",
    logo: "FA",
    headline: "5 Dealerships Changing How America Buys Cars",
    excerpt: "Wheelzy earns the top spot for its white-glove approach, transparent pricing, and unparalleled post-sale support.",
    date: "November 2024",
    tag: "List",
  },
  {
    outlet: "Car & Driver",
    logo: "C&D",
    headline: "We Tested Wheelzy's Delivery Promise — Here's What Happened",
    excerpt: "The promise: showroom-to-doorstep in 48 hours, fully insured. The reality: even better than advertised.",
    date: "September 2024",
    tag: "Test",
  },
];

export const galleryItems = [
  // Row 1: tall(spans 2 rows col1) + wide(spans 2 cols, row1) 
  { id: 2, label: "Porsche 911 Carrera S",      brand: "Porsche",       aspect: "tall",   src: "/comp/images/porsche-911.jfif",         link: "/cars/porsche-911" },
  { id: 1, label: "BMW M3 Competition",          brand: "BMW",           aspect: "wide",   src: "/comp/images/bmw-m3.jfif",              link: "/cars/bmw-m3" },
  // Row 2 col 2-3 (col1 still occupied by tall): two squares
  { id: 3, label: "Mercedes-AMG C63 S",          brand: "Mercedes-Benz", aspect: "square", src: "/comp/images/mercdees-1.jfif",          link: "/cars/amg-c63" },
  { id: 6, label: "Rolls-Royce Spectre",         brand: "Rolls-Royce",   aspect: "square", src: "/comp/images/rolls-royce-2.jfif",       link: "/cars/rolls-royce-spectre" },
  // Row 3: wide + square
  { id: 4, label: "Audi RS7 Sportback",          brand: "Audi",          aspect: "wide",   src: "/comp/images/Audi-1.jfif",              link: "/cars/audi-rs7" },
  { id: 5, label: "Lamborghini Huracán EVO",     brand: "Lamborghini",   aspect: "square", src: "/comp/images/lamborghini-huracan.jfif", link: "/cars/lamborghini-huracan" },
];

const videos = [
  { id: 1, title: "The Wheelzy Story",      duration: "4:32", category: "Brand", thumb: "/comp/images/porsche-911.jfif" },
  { id: 2, title: "BMW M3 Full Walkthrough", duration: "7:14", category: "Review", thumb: "/comp/images/bmw-m3.jfif" },
  { id: 3, title: "Showroom Tour 2025",     duration: "3:08", category: "Tour",   thumb: "/comp/images/audi-rs7.jfif" },
];

const kitAssets = [
  { label: "Brand Guidelines",  ext: "PDF",  size: "4.2 MB" },
  { label: "Logo Pack",         ext: "ZIP",  size: "12 MB"  },
  { label: "Press Photos",      ext: "ZIP",  size: "86 MB"  },
  { label: "Executive Bios",    ext: "PDF",  size: "1.1 MB" },
];

/* ── Scroll-reveal hook ──────────────────────────────────────────────────── */
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

/* ── 0. HERO ─────────────────────────────────────────────────────────────── */
function MediaHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section className={styles.mediaHero}>
      <div className={styles.mediaHeroBg}>
        <Image
          src="/comp/images/lamborghini-huracan.jfif"
          alt="Lamborghini Huracan"
          className={styles.mediaHeroBgImg}
          fill
          priority
          quality={90}
          sizes="100vw"
        />
        <div className={styles.mediaHeroScrim} />
      </div>

      <div className={`${styles.mediaHeroContent} ${mounted ? styles.revealed : ""}`}>
        <p className={styles.eyebrow}>Press &amp; Media</p>
        <h1 className={styles.mediaHeroTitle}>{"MEDIA\nCENTER"}</h1>
        <div className={styles.goldRule} />
        <p className={styles.mediaHeroSub}>
          Press releases, brand assets, photography, and everything journalists need — all in one place.
        </p>
        <div className={styles.heroPills}>
          {["Press Kit", "Contact PR", "Latest Release"].map(l => (
            <button key={l} className={styles.heroPill}>{l}</button>
          ))}
        </div>
      </div>

      {/* stat strip */}
      <div className={styles.heroStats}>
        {[["120+", "Press Features"], ["34", "Awards Won"], ["2013", "Est."], ["50+", "Brands Covered"]].map(([v, l], i) => (
          <div key={i} className={styles.heroStat}>
            <span className={styles.heroStatVal}>{v}</span>
            <span className={styles.heroStatLabel}>{l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 1. PRESS COVERAGE ───────────────────────────────────────────────────── */
function PressCoverage() {
  const [ref, visible] = useReveal();
  return (
    <section className={styles.pressSection}>
      <div className={styles.sectionHead}>
        <p className={styles.eyebrow}>In The News</p>
        <h2 className={styles.sectionTitle}>PRESS COVERAGE</h2>
        <div className={styles.titleRule} />
      </div>

      <div ref={ref} className={`${styles.pressGrid} ${visible ? styles.revealed : ""}`}>
        {pressItems.map((item, i) => (
          <article
            key={i}
            className={styles.pressCard}
            style={{ "--delay": `${i * 90}ms` }}
          >
            <div className={styles.pressCardTop}>
              <div className={styles.pressLogo}>{item.logo}</div>
              <span className={styles.pressTag}>{item.tag}</span>
            </div>
            <h3 className={styles.pressHeadline}>{item.headline}</h3>
            <p className={styles.pressExcerpt}>{item.excerpt}</p>
            <div className={styles.pressFooter}>
              <span className={styles.pressDate}>{item.date}</span>
              <button className={styles.pressReadBtn}>Read More →</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── 2. PHOTO GALLERY ────────────────────────────────────────────────────── */
function PhotoGallery() {
  const [ref, visible] = useReveal(0.08);
  const [active, setActive] = useState(null);

  return (
    <section className={styles.gallerySection}>
      <div className={styles.sectionHead}>
        <p className={styles.eyebrow}>Visual Archive</p>
        <h2 className={styles.sectionTitle}>PHOTO GALLERY</h2>
        <div className={styles.titleRule} />
      </div>

      <div ref={ref} className={`${styles.galleryGrid} ${visible ? styles.revealed : ""}`}>
        {galleryItems.map((item, i) => (
          <div
            key={item.id}
            className={`${styles.galleryItem} ${styles[`aspect-${item.aspect}`]}`}
            style={{ "--delay": `${i * 70}ms` }}
            onClick={() => setActive(item)}
          >
            <Image
              src={item.src}
              alt={item.label}
              className={styles.galleryImg}
              fill
              quality={85}
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className={styles.galleryOverlay}>
              <span className={styles.galleryLabel}>{item.label}</span>
              <span className={styles.galleryExpand}>⊕</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div className={styles.lightbox} onClick={() => setActive(null)}>
          <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={() => setActive(null)}>✕</button>
            <Image
              src={active.src}
              alt={active.label}
              className={styles.lightboxImg}
              width={1200}
              height={800}
              quality={95}
              sizes="100vw"
            />
            <p className={styles.lightboxCaption}>{active.label}</p>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── 3. VIDEO VAULT ──────────────────────────────────────────────────────── */
function VideoVault() {
  const [ref, visible] = useReveal();
  const [playing, setPlaying] = useState(null);

  return (
    <section className={styles.videoSection}>
      <div className={styles.sectionHead}>
        <p className={styles.eyebrow}>Visual Stories</p>
        <h2 className={styles.sectionTitle}>VIDEO VAULT</h2>
        <div className={styles.titleRule} />
      </div>

      <div ref={ref} className={`${styles.videoGrid} ${visible ? styles.revealed : ""}`}>
        {videos.map((vid, i) => (
          <div
            key={vid.id}
            className={styles.videoCard}
            style={{ "--delay": `${i * 110}ms` }}
            onClick={() => setPlaying(vid.id === playing ? null : vid.id)}
          >
            <div className={styles.videoThumbWrap}>
              <Image
                src={vid.thumb}
                alt={vid.title}
                className={styles.videoThumb}
                fill
                quality={80}
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className={styles.videoThumbOverlay} />
              <div className={`${styles.playBtn} ${playing === vid.id ? styles.paused : ""}`}>
                {playing === vid.id ? "⏸" : "▶"}
              </div>
              <span className={styles.videoDuration}>{vid.duration}</span>
            </div>
            <div className={styles.videoMeta}>
              <span className={styles.videoCategory}>{vid.category}</span>
              <h3 className={styles.videoTitle}>{vid.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 4. PRESS KIT CTA ────────────────────────────────────────────────────── */
function PressKitCTA() {
  const [ref, visible] = useReveal(0.15);

  return (
    <section className={styles.kitSection}>
      <div ref={ref} className={`${styles.kitInner} ${visible ? styles.revealed : ""}`}>
        <div className={styles.kitLeft}>
          <p className={styles.eyebrow}>Media Resources</p>
          <h2 className={styles.kitTitle}>DOWNLOAD THE<br />PRESS KIT</h2>
          <div className={styles.goldRule} />
          <p className={styles.kitBody}>
            Everything you need to cover Wheelzy — brand guidelines, high-resolution photography,
            executive bios, and official press releases, ready to download.
          </p>
          <button className={styles.goldBtn}>Download Full Kit →</button>
        </div>

        <div className={styles.kitAssets}>
          {kitAssets.map((a, i) => (
            <div key={i} className={styles.kitAssetRow} style={{ "--delay": `${i * 80}ms` }}>
              <div className={styles.kitAssetIcon}>{a.ext}</div>
              <div className={styles.kitAssetInfo}>
                <span className={styles.kitAssetLabel}>{a.label}</span>
                <span className={styles.kitAssetSize}>{a.size}</span>
              </div>
              <button className={styles.kitDownloadBtn}>↓</button>
            </div>
          ))}

          {/* Contact PR box */}
          <div className={styles.prContact}>
            <p className={styles.prContactLabel}>Media Enquiries</p>
            <p className={styles.prContactEmail}>press@wheelzy.com</p>
            <p className={styles.prContactPhone}>+1 (800) 935-5299</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── ROOT ────────────────────────────────────────────────────────────────── */
export default function MediaPage() {
  return (
    <>
      <MediaHero />
      <PressCoverage />
      <PhotoGallery />
      <VideoVault />
      <PressKitCTA />
    </>
  );
}