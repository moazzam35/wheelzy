"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import styles from "./testdrive.module.css";

const vehicles = [
  { id: 1,  name: "BMW M3 Competition",        type: "Sedan",     hp: "503 HP",  image: "/comp/images/bmw-m3.jfif" },
  { id: 2,  name: "Mercedes-AMG C63 S",        type: "Sedan",     hp: "671 HP",  image: "/comp/images/mercdees-1.jfif" },
  { id: 3,  name: "Porsche 911 Carrera",       type: "Coupe",     hp: "379 HP",  image: "/comp/images/porsche-911.jfif" },
  { id: 4,  name: "Audi RS7 Sportback",        type: "Fastback",  hp: "591 HP",  image: "/comp/images/Audi-1.jfif" },
  { id: 5,  name: "Lamborghini Huracán EVO",   type: "Supercar",  hp: "640 HP",  image: "/comp/images/lamborghini-huracan.jfif" },
  { id: 6,  name: "Tesla Model S Plaid",       type: "Electric",  hp: "1020 HP", image: "/comp/images/tesla-model-s.jfif" },
  { id: 13, name: "Lamborghini Aventador",     type: "Coupe",     hp: "769 HP",  image: "/comp/images/lamborgini-1.jfif" },
  { id: 14, name: "McLaren 720S",              type: "Coupe",     hp: "710 HP",  image: "/comp/images/meclaran-1.jfif" },
  { id: 15, name: "Rolls-Royce Ghost",         type: "Sedan",     hp: "563 HP",  image: "/comp/images/rolls-royce.jfif" },
  { id: 16, name: "Range Rover Autobiography", type: "SUV",       hp: "523 HP",  image: "/comp/images/Range Rover.jfif" },
  { id: 17, name: "Audi RS e-tron GT",         type: "Electric",  hp: "637 HP",  image: "/comp/images/audi-3.jfif" },
  { id: 18, name: "Lamborghini Urus S",        type: "SUV",       hp: "666 HP",  image: "/comp/images/Lamborghini-Urus-2.jfif" },
];

const times = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

export default function TestDrivePage() {
  // ── 1. Read URL param FIRST (hook must be at top level) ──
  const searchParams = useSearchParams();
  const carName = searchParams.get("carName");

  // ── 2. Resolve pre-selection BEFORE useState calls ──
  const preSelected = carName
    ? (vehicles.find(v => v.name.toLowerCase() === carName.toLowerCase())?.id ?? null)
    : null;

  // ── 3. Initialise state using preSelected ──
  const [selected, setSelected] = useState(preSelected);
  const [step, setStep]         = useState(preSelected ? 2 : 1);
  const [form, setForm]         = useState({
    date: "", time: "", name: "", email: "", phone: "", license: ""
  });

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <main className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroScrim} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Wheelzy Experience</p>
          <h1 className={styles.heroTitle}>
            FEEL IT<br />BEFORE YOU<br />BUY IT
          </h1>
          <p className={styles.heroSub}>
            Schedule a private, no-pressure test drive at a time and location that works for you.
          </p>
        </div>
        <div className={styles.heroAccent} />
      </section>

      {/* ── Step indicator ── */}
      <div className={styles.stepBar}>
        {["Choose Vehicle", "Your Details", "Confirmed"].map((s, i) => (
          <div
            key={i}
            className={`${styles.stepItem} ${step > i + 1 ? styles.done : ""} ${step === i + 1 ? styles.active : ""}`}
          >
            <div className={styles.stepCircle}>{step > i + 1 ? "✓" : i + 1}</div>
            <span className={styles.stepLabel}>{s}</span>
            {i < 2 && <div className={styles.stepConnector} />}
          </div>
        ))}
      </div>

      {/* ── Step 1: Pick car ── */}
      {step === 1 && (
        <section className={styles.pickSection}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Step 1</p>
            <h2 className={styles.sectionTitle}>SELECT YOUR VEHICLE</h2>
            <div className={styles.titleRule} />
          </div>

          <div className={styles.vehicleGrid}>
            {vehicles.map(v => (
              <div
                key={v.id}
                className={`${styles.vehicleCard} ${selected === v.id ? styles.vehicleSelected : ""}`}
                onClick={() => setSelected(v.id)}
              >
                <div className={styles.vehicleImg}>
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    quality={85}
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                  <div className={styles.vehicleOverlay} />
                  {selected === v.id && <div className={styles.checkMark}>✓</div>}
                </div>
                <div className={styles.vehicleInfo}>
                  <p className={styles.vehicleType}>{v.type} · {v.hp}</p>
                  <h3 className={styles.vehicleName}>{v.name}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.stepNav}>
            <button
              className={`${styles.nextBtn} ${!selected ? styles.disabled : ""}`}
              onClick={() => selected && setStep(2)}
              disabled={!selected}
            >
              Continue to Details →
            </button>
          </div>
        </section>
      )}

      {/* ── Step 2: Details ── */}
      {step === 2 && (
        <section className={styles.formSection}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Step 2</p>
            <h2 className={styles.sectionTitle}>YOUR DETAILS</h2>
            <div className={styles.titleRule} />
          </div>

          <div className={styles.formWrap}>
            {/* Selected car preview */}
            <div className={styles.selectedCar}>
              <p className={styles.label}>Selected Vehicle</p>
              <div className={styles.selectedCardInner}>
                <img
                  src={vehicles.find(v => v.id === selected)?.image}
                  alt=""
                  className={styles.selectedImg}
                />
                <div>
                  <p className={styles.selectedType}>
                    {vehicles.find(v => v.id === selected)?.type}
                  </p>
                  <p className={styles.selectedName}>
                    {vehicles.find(v => v.id === selected)?.name}
                  </p>
                </div>
              </div>
              <button
                className={styles.changeBtn}
                onClick={() => setStep(1)}
              >
                ← Change Vehicle
              </button>
            </div>

            {/* Form */}
            <form
              className={styles.form}
              onSubmit={e => { e.preventDefault(); setStep(3); }}
            >
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Preferred Date</label>
                  <input
                    name="date"
                    type="date"
                    className={styles.input}
                    value={form.date}
                    onChange={handle}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Preferred Time</label>
                  <select
                    name="time"
                    className={styles.select}
                    value={form.time}
                    onChange={handle}
                    required
                  >
                    <option value="">Select Time</option>
                    {times.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Full Name</label>
                  <input
                    name="name"
                    className={styles.input}
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handle}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email</label>
                  <input
                    name="email"
                    type="email"
                    className={styles.input}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handle}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Phone</label>
                  <input
                    name="phone"
                    className={styles.input}
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={handle}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Driver's License #</label>
                  <input
                    name="license"
                    className={styles.input}
                    placeholder="DL number"
                    value={form.license}
                    onChange={handle}
                    required
                  />
                </div>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Book Test Drive →
              </button>
            </form>
          </div>
        </section>
      )}

      {/* ── Step 3: Success ── */}
      {step === 3 && (
        <section className={styles.successSection}>
          <div className={styles.successInner}>
            <div className={styles.successIcon}>✓</div>
            <p className={styles.eyebrow}>Booking Confirmed</p>
            <h2 className={styles.successTitle}>
              WE'LL SEE YOU<br />ON THE ROAD
            </h2>
            <p className={styles.successMsg}>
              Your test drive has been scheduled. A confirmation with full details
              has been sent to {form.email || "your email"}. Our team will call
              to confirm 24 hours before your appointment.
            </p>
            <Link href="/cars" className={styles.ctaBtn}>
              Browse More Vehicles →
            </Link>
          </div>
        </section>
      )}

    </main>
  );
}