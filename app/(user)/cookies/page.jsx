"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./cookies.module.css";

const cookieTypes = [
  {
    id: "necessary",
    label: "Strictly Necessary",
    icon: "◆",
    required: true,
    description: "These cookies are essential for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as logging in or filling in forms.",
    examples: ["Session authentication", "CSRF protection tokens", "Load balancer cookies", "Cookie consent state"],
    count: 4,
  },
  {
    id: "performance",
    label: "Performance & Analytics",
    icon: "◈",
    required: false,
    description: "These cookies allow us to count visits and traffic sources so we can measure and improve site performance. All data is aggregated and anonymised.",
    examples: ["Google Analytics (ga, _gid)", "Heatmap tracking", "Page speed metrics", "A/B test variants"],
    count: 6,
  },
  {
    id: "functional",
    label: "Functional",
    icon: "◉",
    required: false,
    description: "These cookies enable enhanced functionality and personalisation, such as remembering your saved vehicles, preferred currency, or recently viewed listings.",
    examples: ["Saved vehicle filters", "Recently viewed cars", "Currency preference", "Language selection"],
    count: 5,
  },
  {
    id: "targeting",
    label: "Targeting & Advertising",
    icon: "◇",
    required: false,
    description: "These cookies are used to deliver relevant advertisements and track marketing campaign effectiveness. They may be set through our site by advertising partners.",
    examples: ["Meta Pixel", "Google Ads remarketing", "LinkedIn Insight Tag", "Affiliate tracking"],
    count: 8,
  },
];

export default function CookiesPage() {
  const [prefs, setPrefs] = useState({ necessary: true, performance: false, functional: false, targeting: false });
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => {
    if (id === "necessary") return;
    setSaved(false);
    setPrefs(p => ({ ...p, [id]: !p[id] }));
  };

  const acceptAll = () => {
    setPrefs({ necessary: true, performance: true, functional: true, targeting: true });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const rejectAll = () => {
    setPrefs({ necessary: true, performance: false, functional: false, targeting: false });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const savePrefs = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const activeCount = Object.values(prefs).filter(Boolean).length;

  return (
    <main className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGrid} />
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <p className={styles.eyebrow}>Privacy & Data</p>
            <h1 className={styles.heroTitle}>COOKIE<br />PREFERENCES</h1>
            <p className={styles.heroSub}>
              We value your privacy. Choose which cookies you allow — your preferences are saved
              and respected on every visit.
            </p>
            <div className={styles.heroBadge}>
              <span className={styles.badgeDot} />
              <span>{activeCount} of {cookieTypes.length} cookie categories active</span>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.heroCard}>
              <p className={styles.heroCardLabel}>Quick Actions</p>
              <div className={styles.quickBtns}>
                <button className={styles.acceptAllBtn} onClick={acceptAll}>Accept All Cookies</button>
                <button className={styles.rejectAllBtn} onClick={rejectAll}>Necessary Only</button>
              </div>
              <p className={styles.heroCardNote}>Or configure each category individually below.</p>
            </div>
          </div>
        </div>
        <div className={styles.heroRule} />
      </section>

      {/* ── Cookie Controls ── */}
      <section className={styles.controlsSection}>
        <div className={styles.controlsInner}>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <p className={styles.sidebarTitle}>Your Selection</p>
              <div className={styles.sidebarList}>
                {cookieTypes.map(c => (
                  <div className={styles.sidebarItem} key={c.id}>
                    <span className={styles.sidebarIcon}>{c.icon}</span>
                    <span className={styles.sidebarLabel}>{c.label}</span>
                    <span className={`${styles.sidebarStatus} ${prefs[c.id] ? styles.statusOn : styles.statusOff}`}>
                      {prefs[c.id] ? "ON" : "OFF"}
                    </span>
                  </div>
                ))}
              </div>
              <button className={styles.saveBtn} onClick={savePrefs}>
                {saved ? "✓ Preferences Saved" : "Save My Preferences"}
              </button>
              <p className={styles.sidebarFooter}>
                Read our <Link href="/cookie-policy" className={styles.inlineLink}>Cookie Policy</Link> and <Link href="/privacypolicy" className={styles.inlineLink}>Privacy Policy</Link>
              </p>
            </div>

            <div className={styles.sidebarInfo}>
              <span className={styles.infoIcon}>ℹ</span>
              <p>Your preferences are stored locally and apply to this browser only. Changes take effect immediately.</p>
            </div>
          </aside>

          {/* Cookie Cards */}
          <div className={styles.cardsCol}>
            {cookieTypes.map((c) => (
              <div
                className={`${styles.cookieCard} ${prefs[c.id] ? styles.cardActive : ""} ${c.required ? styles.cardRequired : ""}`}
                key={c.id}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.cardHeaderLeft}>
                    <span className={styles.cardIcon}>{c.icon}</span>
                    <div>
                      <h3 className={styles.cardTitle}>{c.label}</h3>
                      <p className={styles.cardCount}>{c.count} cookies in this category</p>
                    </div>
                  </div>
                  <div className={styles.cardHeaderRight}>
                    {c.required && (
                      <span className={styles.requiredBadge}>Always On</span>
                    )}
                    <button
                      className={`${styles.toggle} ${prefs[c.id] ? styles.toggleOn : ""} ${c.required ? styles.toggleDisabled : ""}`}
                      onClick={() => toggle(c.id)}
                      aria-label={`Toggle ${c.label}`}
                      disabled={c.required}
                    >
                      <span className={styles.toggleKnob} />
                    </button>
                  </div>
                </div>

                <p className={styles.cardDesc}>{c.description}</p>

                <button
                  className={styles.expandBtn}
                  onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                >
                  {expanded === c.id ? "Hide examples −" : "Show cookie examples +"}
                </button>

                {expanded === c.id && (
                  <div className={styles.examples}>
                    {c.examples.map((ex, i) => (
                      <div className={styles.exampleItem} key={i}>
                        <span className={styles.exampleDot} />
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Save row (mobile/inline) */}
            <div className={styles.saveRow}>
              <button className={styles.acceptAllBtnInline} onClick={acceptAll}>Accept All</button>
              <button className={styles.saveBtnInline} onClick={savePrefs}>
                {saved ? "✓ Saved!" : "Save Preferences"}
              </button>
              <button className={styles.rejectBtnInline} onClick={rejectAll}>Necessary Only</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Info Strip ── */}
      <section className={styles.infoStrip}>
        <div className={styles.infoCards}>
          {[
            { icon: "◆", title: "GDPR Compliant", body: "We follow all applicable data protection regulations and your rights are always protected." },
            { icon: "◈", title: "No Data Selling", body: "Wheelzy never sells your personal data to third parties. Your privacy is non-negotiable." },
            { icon: "◉", title: "Change Anytime", body: "You can update your cookie preferences at any time by returning to this page." },
          ].map((item, i) => (
            <div className={styles.infoCard} key={i}>
              <span className={styles.infoCardIcon}>{item.icon}</span>
              <h4 className={styles.infoCardTitle}>{item.title}</h4>
              <p className={styles.infoCardBody}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer links ── */}
      <section className={styles.footerLinks}>
        <div className={styles.footerLinksInner}>
          <p className={styles.footerLinksText}>For full details on how we use data, read our legal documents:</p>
          <div className={styles.footerLinkRow}>
            <Link href="/cookie-policy" className={styles.footerLink}>Cookie Policy →</Link>
            <Link href="/privacypolicy" className={styles.footerLink}>Privacy Policy →</Link>
            <Link href="/disclaimer" className={styles.footerLink}>Disclaimer →</Link>
          </div>
        </div>
      </section>

    </main>
  );
}