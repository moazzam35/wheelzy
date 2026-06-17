"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion, AnimatePresence,
  useReducedMotion, useScroll, useTransform
} from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import styles from "./header.module.css";

// ── Icons ────────────────────────────────────────────────────
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1"  x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1"  y1="12" x2="3"  y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

// ── Nav links ─────────────────────────────────────────────────
const navLinks = [
  { label: "Home",         href: "/" },
  { label: "Browse Cars",  href: "/cars" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Sell",         href: "/sell" },
  { label: "About",        href: "/about" },
  { label: "Contact",      href: "/contact" },
];

// ── Header ────────────────────────────────────────────────────
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme]       = useState("dark");
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const isReduced = useReducedMotion();
  const pathname  = usePathname();

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Theme persistence
  useEffect(() => {
    const saved = localStorage.getItem("wheelzy-theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("wheelzy-theme", next);
  };

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      {/* Spacer */}
      <div style={{ height: "72px" }} />

      <motion.header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
        initial={isReduced ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.inner}>

          {/* ── Logo ── */}
          <Link href="/" className={styles.logo}>
            <motion.span
              initial={isReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              W<span className={styles.logoAccent}>heelzy</span>
            </motion.span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className={styles.nav}>
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  className={styles.navItem}
                  initial={isReduced ? false : { opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                  >
                    {link.label}
                   
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* ── Right side ── */}
          <motion.div
            className={styles.actions}
            initial={isReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* Theme toggle */}
            <motion.button
              className={styles.iconBtn}
              onClick={toggleTheme}
              aria-label="Toggle theme"
              whileHover={isReduced ? {} : { scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                  exit={{    opacity: 0, rotate:  20, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "flex" }}
                >
                  {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Login button or User Menu */}
            {isAuthenticated ? (
              <Link href="/dashboard">
                <motion.div
                  className={`${styles.loginBtn} ${pathname === "/dashboard" ? styles.loginBtnActive : ""}`}
                  whileHover={isReduced ? {} : { scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserIcon />
                  <span>{user?.name?.split(" ")[0] || "Dashboard"}</span>
                </motion.div>
              </Link>
            ) : (
              <Link href="/login">
                <motion.div
                  className={`${styles.loginBtn} ${pathname === "/login" ? styles.loginBtnActive : ""}`}
                  whileHover={isReduced ? {} : { scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserIcon />
                  <span>Login</span>
                </motion.div>
              </Link>
            )}

            {/* Hamburger */}
            <button
              className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle navigation"
            >
              <span /><span /><span />
            </button>
          </motion.div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className={styles.drawer}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{   opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.drawerInner}>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={isReduced ? false : { opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      className={`${styles.drawerLink} ${pathname === link.href ? styles.drawerLinkActive : ""}`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Divider */}
                <div className={styles.drawerDivider} />

                {/* Theme toggle row */}
                <motion.button
                  className={styles.drawerTheme}
                  onClick={toggleTheme}
                  initial={isReduced ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.06 }}
                >
                  {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                  <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </motion.button>

                {/* Login row */}
                <motion.div
                  initial={isReduced ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.06 }}
                >
                  {isAuthenticated ? (
                    <Link href="/dashboard" className={styles.drawerLogin}>
                      <UserIcon />
                      <span>{user?.name || "Dashboard"}</span>
                    </Link>
                  ) : (
                    <Link href="/login" className={styles.drawerLogin}>
                      <UserIcon />
                      <span>Login / My Account</span>
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}