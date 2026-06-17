"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import styles from "./signup.module.css";

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// Password strength checker
function getStrength(password) {
  let score = 0;
  if (password.length >= 8)           score++;
  if (/[A-Z]/.test(password))         score++;
  if (/[0-9]/.test(password))         score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score; // 0–4
}

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColors = ["", "#c0392b", "#e67e22", "#c9a84c", "#27ae60"];

export default function SignupPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm]         = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [agreed, setAgreed]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const strength = getStrength(form.password);

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please fill in all fields."); return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords don't match."); return;
    }
    if (strength < 2) {
      setError("Please choose a stronger password."); return;
    }
    if (!agreed) {
      setError("Please accept the terms to continue."); return;
    }
    setLoading(true);
    const result = await register({
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (result.success) {
      router.push("/login?registered=true");
    } else {
      setError(result.error || "Registration failed. Please try again.");
    }
  };

  return (
    <main className={styles.page}>

      {/* ── Decorative background ── */}
      <div className={styles.bg}>
        <div className={styles.bgGlow1} />
        <div className={styles.bgGlow2} />
        <div className={styles.bgGrid} />
      </div>

      <div className={styles.layout}>



        {/* ── Right panel ── */}
        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.panelContent}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <p className={styles.eyebrow}>Join the fleet</p>
              <h1 className={styles.title}>CREATE ACCOUNT</h1>
              <p className={styles.subtitle}>
                Get access to exclusive vehicles, test drive scheduling, and personalised recommendations.
              </p>
            </motion.div>

            {/* ── Form ── */}
            <motion.form
              className={styles.form}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.6 }}
            >
              {/* Name row */}
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>First Name</label>
                  <input
                    name="firstName"
                    className={styles.input}
                    placeholder="John"
                    value={form.firstName}
                    onChange={handle}
                    autoComplete="given-name"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Last Name</label>
                  <input
                    name="lastName"
                    className={styles.input}
                    placeholder="Smith"
                    value={form.lastName}
                    onChange={handle}
                    autoComplete="family-name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className={styles.field}>
                <label className={styles.label}>Email Address</label>
                <input
                  name="email"
                  type="email"
                  className={styles.input}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handle}
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div className={styles.field}>
                <label className={styles.label}>Password</label>
                <div className={styles.inputWrap}>
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    className={styles.input}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handle}
                    autoComplete="new-password"
                  />
                  <button type="button" className={styles.eyeBtn}
                    onClick={() => setShowPass(v => !v)} aria-label="Toggle">
                    <EyeIcon open={showPass} />
                  </button>
                </div>

                {/* Strength bar */}
                {form.password && (
                  <motion.div
                    className={styles.strengthWrap}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className={styles.strengthBar}>
                      {[1,2,3,4].map(i => (
                        <div
                          key={i}
                          className={styles.strengthSegment}
                          style={{
                            background: strength >= i ? strengthColors[strength] : "var(--surface3)"
                          }}
                        />
                      ))}
                    </div>
                    <span
                      className={styles.strengthLabel}
                      style={{ color: strengthColors[strength] }}
                    >
                      {strengthLabels[strength]}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Confirm password */}
              <div className={styles.field}>
                <div className={styles.labelRow}>
                  <label className={styles.label}>Confirm Password</label>
                  {form.confirm && form.password === form.confirm && (
                    <span className={styles.matchBadge}>
                      <CheckIcon /> Match
                    </span>
                  )}
                </div>
                <div className={styles.inputWrap}>
                  <input
                    name="confirm"
                    type={showConf ? "text" : "password"}
                    className={`${styles.input} ${
                      form.confirm && form.password !== form.confirm ? styles.inputError : ""
                    } ${
                      form.confirm && form.password === form.confirm ? styles.inputSuccess : ""
                    }`}
                    placeholder="••••••••"
                    value={form.confirm}
                    onChange={handle}
                    autoComplete="new-password"
                  />
                  <button type="button" className={styles.eyeBtn}
                    onClick={() => setShowConf(v => !v)} aria-label="Toggle">
                    <EyeIcon open={showConf} />
                  </button>
                </div>
              </div>

              {/* Terms checkbox */}
              <label className={styles.checkLabel}>
                <div
                  className={`${styles.checkbox} ${agreed ? styles.checkboxChecked : ""}`}
                  onClick={() => setAgreed(v => !v)}
                  role="checkbox"
                  aria-checked={agreed}
                  tabIndex={0}
                  onKeyDown={e => e.key === " " && setAgreed(v => !v)}
                >
                  {agreed && <CheckIcon />}
                </div>
                <span>
                  I agree to the{" "}
                  <Link href="/term&condition" className={styles.termsLink}>Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacypolicy" className={styles.termsLink}>Privacy Policy</Link>
                </span>
              </label>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    className={styles.error}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{   opacity: 0, y: -6 }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(201,168,76,0.35)" }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? <span className={styles.spinner} /> : "Create Account →"}
              </motion.button>

              {/* Divider */}
              <div className={styles.divider}>
                <span /><p>or sign up with</p><span />
              </div>

              {/* Social */}
              <div className={styles.socialRow}>
                <motion.button type="button" className={styles.socialBtn}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </motion.button>
                <motion.button type="button" className={styles.socialBtn}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </motion.button>
              </div>
            </motion.form>

            <motion.p
              className={styles.switchText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Already have an account?{" "}
              <Link href="/login" className={styles.switchLink}>Sign in →</Link>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}