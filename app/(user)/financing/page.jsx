"use client";
import React, { useState } from "react";
import styles from "./financing.module.css";

const plans = [
  {
    name:"Standard",
    rate:"4.9%",
    rateSub:"APR from",
    features:["Up to 60 months","No early repayment fee","Fast approval — 24 hrs","Vehicles up to $150,000"],
    featured: false,
  },
  {
    name:"Premier",
    rate:"2.9%",
    rateSub:"APR from",
    features:["Up to 84 months","Deferred first payment","Same-day approval","All vehicles, no cap","GAP insurance included"],
    featured: true,
  },
  {
    name:"Bespoke",
    rate:"1.9%",
    rateSub:"APR from",
    features:["Fully custom terms","Dedicated finance manager","Balloon payment options","Multi-vehicle portfolios","Concierge document service"],
    featured: false,
  },
];

export default function Financing() {
  const [loan, setLoan] = useState(80000);
  const [months, setMonths] = useState(60);
  const monthly = Math.round((loan * (0.029 / 12)) / (1 - Math.pow(1 + 0.029 / 12, -months)));

  return (
    <main className={styles.page}>
      <div className={styles.pageBanner}>
        <div className={styles.bannerBg} />
        <div className={styles.bannerCorner} />
        <p className={styles.bannerEyebrow}>Flexible Finance</p>
        <h1 className={styles.bannerTitle}>FINANCING<br />MADE EASY</h1>
        <p className={styles.bannerSub}>Bespoke plans built around your life — competitive rates, zero compromise.</p>
      </div>

      {/* Plans */}
      <div className={styles.section}>
        <div className={styles.sectionHeadCenter}>
          <p className={styles.eyebrow}>Choose Your Plan</p>
          <h2 className={styles.sectionTitle}>FINANCING OPTIONS</h2>
          <div className={styles.titleRuleCenter} />
        </div>

        <div className={styles.financeGrid}>
          {plans.map((p, i) => (
            <div className={`${styles.financeCard} ${p.featured ? styles.financeCardFeatured : ""}`} key={i}>
              {p.featured && <span className={styles.financeBadge}>Most Popular</span>}
              <p className={styles.financePlanName}>{p.name}</p>
              <div className={styles.financeRate}>{p.rate}</div>
              <p className={styles.financeRateSub}>{p.rateSub}</p>
              <ul className={styles.financeFeatures}>
                {p.features.map(f => <li className={styles.financeFeature} key={f}>{f}</li>)}
              </ul>
              <button className={p.featured ? styles.goldBtn : styles.ghostBtn} style={{ width:"100%", justifyContent:"center" }}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Calculator */}
      <div className={styles.sectionAlt}>
        <div style={{ maxWidth:580, margin:"0 auto" }}>
          <div className={styles.sectionHeadCenter}>
            <p className={styles.eyebrow}>Estimate Your Payment</p>
            <h2 className={styles.sectionTitle}>PAYMENT<br />CALCULATOR</h2>
            <div className={styles.titleRuleCenter} />
          </div>

          <div className={styles.formCard}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Loan Amount — ${loan.toLocaleString()}</label>
              <input type="range" min="10000" max="500000" step="5000" value={loan}
                onChange={e => setLoan(+e.target.value)}
                style={{ width:"100%", accentColor:"#c9a84c", marginTop:8 }} />
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#8a8a95", marginTop:4 }}>
                <span>$10K</span><span>$500K</span>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Term — {months} months</label>
              <input type="range" min="12" max="84" step="12" value={months}
                onChange={e => setMonths(+e.target.value)}
                style={{ width:"100%", accentColor:"#c9a84c", marginTop:8 }} />
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#8a8a95", marginTop:4 }}>
                <span>12mo</span><span>84mo</span>
              </div>
            </div>

            <div style={{ background:"rgba(201,168,76,0.06)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:12, padding:"28px", textAlign:"center", marginTop:8 }}>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:4, textTransform:"uppercase", color:"#8a8a95", marginBottom:8 }}>Estimated Monthly</p>
              <p style={{ fontFamily:"'Bebas Neue', serif", fontSize:56, color:"#c9a84c", lineHeight:1 }}>${monthly.toLocaleString()}</p>
              <p style={{ fontSize:11, color:"#8a8a95", marginTop:8 }}>Based on 2.9% APR Premier plan</p>
            </div>

            <button className={styles.goldBtn} style={{ width:"100%", justifyContent:"center", marginTop:24 }}>Apply Now →</button>
          </div>
        </div>
      </div>
    </main>
  );
}