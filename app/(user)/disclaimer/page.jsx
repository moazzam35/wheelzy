"use client";
import React from "react";
import styles from "./disclaimer.module.css";

const sections = [
  {
    title: "General Information Disclaimer",
    body: `The information provided on the Wheelzy website (wheelzy.com) is for general informational purposes only. While we make every effort to ensure the accuracy and completeness of information presented, we make no warranties or representations of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website for any purpose.

Any reliance you place on such information is therefore strictly at your own risk.`
  },
  {
    title: "Vehicle Information & Pricing",
    body: `Vehicle specifications, features, colours, options, and pricing displayed on this website are subject to change without notice. All prices are listed in USD and are exclusive of taxes, registration fees, documentation fees, and any applicable finance or insurance charges unless explicitly stated otherwise.

Mileage, horsepower, performance figures, and fuel economy estimates are based on manufacturer-supplied data and may differ from actual performance under real-world conditions. Images of vehicles are for illustrative purposes only and may not represent the exact specification of the vehicle available for sale.`
  },
  {
    title: "Availability Disclaimer",
    body: `Vehicles shown on this website are subject to prior sale. Wheelzy cannot guarantee that any specific vehicle will be available at the time of your inquiry or purchase attempt. We strongly recommend contacting our team directly to confirm availability before making any travel arrangements or financial commitments.`
  },
  {
    title: "Financial & Valuation Information",
    body: `Any finance estimates, monthly payment calculations, trade-in valuations, or price comparisons displayed on this website are indicative only and do not constitute a formal credit offer, financial advice, or binding valuation. Actual finance terms are subject to lender approval, individual credit assessment, and prevailing interest rates at the time of application.

Trade-in valuations provided through our online tool are estimates only. A final offer is contingent upon physical inspection of the vehicle.`
  },
  {
    title: "Third-Party Links",
    body: `Our website may contain links to third-party websites. These links are provided for your convenience and do not signify our endorsement of those sites or their content. We have no responsibility for the content of linked third-party websites and accept no liability for any loss or damage that may arise from their use.`
  },
  {
    title: "Limitation of Liability",
    body: `To the fullest extent permitted by applicable law, Wheelzy excludes all liability for any direct, indirect, incidental, special, or consequential loss or damages arising from your use of, or inability to use, this website or any information contained on it. This includes, without limitation, loss of profits, data, business, or goodwill.`
  },
  {
    title: "Intellectual Property",
    body: `All content on this website — including text, images, logos, vehicle photography, design elements, and code — is the intellectual property of Wheelzy or its licensors and is protected by applicable copyright and trademark laws. Unauthorised reproduction, distribution, or modification of any content is strictly prohibited.`
  },
  {
    title: "Changes to This Disclaimer",
    body: `We reserve the right to amend this disclaimer at any time. Any changes will be effective immediately upon posting to the website. Your continued use of the website following any changes constitutes acceptance of the revised disclaimer.`
  },
  {
    title: "Governing Law",
    body: `This disclaimer and your use of this website are governed by the laws of the State of New York, United States, without regard to conflict of law principles. Any disputes shall be subject to the exclusive jurisdiction of the courts of New York.`
  },
  {
    title: "Contact",
    body: `For questions regarding this disclaimer, please contact our legal team at legal@wheelzy.com or write to: Wheelzy Ltd., 1 Automotive Plaza, New York, NY 10001, United States.`
  },
];

export default function DisclaimerPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroAccent} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Legal</p>
          <h1 className={styles.heroTitle}>DISCLAIMER</h1>
          <p className={styles.heroSub}>Effective Date: January 1, 2026 · Last Reviewed: April 1, 2026</p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentInner}>
          <div className={styles.intro}>
            <p>Please read this disclaimer carefully before using the Wheelzy website. By accessing or using our website, you confirm that you have read, understood, and agreed to the terms set out in this disclaimer.</p>
          </div>

          <div className={styles.toc}>
            <p className={styles.tocTitle}>Contents</p>
            <ol className={styles.tocList}>
              {sections.map((s, i) => (
                <li key={i}><a href={`#section-${i}`} className={styles.tocLink}>{s.title}</a></li>
              ))}
            </ol>
          </div>

          {sections.map((s, i) => (
            <div className={styles.section} key={i} id={`section-${i}`}>
              <div className={styles.sectionNumWrap}>
                <span className={styles.sectionNum}>{String(i + 1).padStart(2, '0')}</span>
                <h2 className={styles.sectionTitle}>{s.title}</h2>
              </div>
              {s.body.split('\n\n').map((para, j) => (
                <p className={styles.para} key={j}>{para}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}