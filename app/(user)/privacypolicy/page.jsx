import React from "react";
import styles from "./provacypolicy.module.css";

export default function PrivacyPolicy() {
  return (
    <main className={styles.page}>
      <div className={styles.pageBanner}>
        <div className={styles.bannerBg} />
        <div className={styles.bannerCorner} />
        <p className={styles.bannerEyebrow}>Legal</p>
        <h1 className={styles.bannerTitle}>PRIVACY<br />POLICY</h1>
        <p className={styles.bannerSub}>Your data, your rights — handled with the same care we give every vehicle.</p>
      </div>

      <div className={styles.legalWrap}>
        <p className={styles.legalDate}>Last updated: January 1, 2025</p>

        <h2 className={styles.legalH2}>1. Information We Collect</h2>
        <p className={styles.legalP}>We collect information you provide directly when you make an enquiry, submit a vehicle for valuation, apply for financing, or contact us. This may include your name, email address, phone number, and vehicle details.</p>
        <p className={styles.legalP}>We also collect usage data automatically — such as pages visited, time on site, and browser type — to improve your experience on our platform.</p>
        <div className={styles.legalDivider} />

        <h2 className={styles.legalH2}>2. How We Use Your Information</h2>
        <p className={styles.legalP}>Your information is used solely to respond to your enquiries, process applications, provide valuations, and improve our services. We do not sell your data to third parties under any circumstances.</p>
        <p className={styles.legalP}>We may use anonymised, aggregated data for internal analytics and service improvements.</p>
        <div className={styles.legalDivider} />

        <h2 className={styles.legalH2}>3. Data Storage & Security</h2>
        <p className={styles.legalP}>All data is encrypted in transit and at rest. We use industry-standard security protocols and conduct regular security audits. Access to personal data is limited to authorised personnel only.</p>
        <div className={styles.legalDivider} />

        <h2 className={styles.legalH2}>4. Cookies</h2>
        <p className={styles.legalP}>We use essential cookies to ensure the site functions correctly and analytics cookies to understand how visitors use our site. You can manage cookie preferences at any time via your browser settings or our Cookie Policy page.</p>
        <div className={styles.legalDivider} />

        <h2 className={styles.legalH2}>5. Your Rights</h2>
        <p className={styles.legalP}>You have the right to access, correct, or request deletion of any personal data we hold about you. To exercise these rights, contact us at privacy@wheelzy.com and we will respond within 30 days.</p>
        <div className={styles.legalDivider} />

        <h2 className={styles.legalH2}>6. Contact</h2>
        <p className={styles.legalP}>For any privacy-related queries, contact our Data Protection team at privacy@wheelzy.com or write to: Wheelzy, 123 Motor Mile, Beverly Hills, CA 90210.</p>
      </div>
    </main>
  );
}