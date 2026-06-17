"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function SettingsPage() {
  const { user, isAuthenticated, status, logout } = useAuth();
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, push: false, marketing: false });
  const [theme, setTheme] = useState("dark");

  if (status === "loading") {
    return (
      <div style={{ padding: "3rem", textAlign: "center", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--text-muted)" }}>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ padding: "3rem", textAlign: "center", minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
        <h2 style={{ fontSize: "1.5rem" }}>Please login to access settings</h2>
        <Link href="/login" style={{ padding: "0.8rem 1.5rem", background: "var(--gold)", color: "var(--btn-on-gold)", fontWeight: "600", borderRadius: "4px" }}>
          Go to Login
        </Link>
      </div>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const sectionStyle = {
    background: "var(--surface2)",
    border: "1px solid var(--border-dim)",
    borderRadius: "var(--radius-sm)",
    padding: "1.75rem",
    marginBottom: "1.5rem",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.85rem",
    color: "var(--text-muted)",
    marginBottom: "0.4rem",
    fontWeight: "500",
  };

  const inputStyle = {
    width: "100%",
    background: "var(--input-bg)",
    border: "1px solid var(--input-border)",
    borderRadius: "4px",
    padding: "0.7rem 1rem",
    color: "var(--text)",
    fontSize: "0.95rem",
  };

  const toggleStyle = (active) => ({
    width: "44px",
    height: "24px",
    borderRadius: "12px",
    background: active ? "var(--gold)" : "var(--surface3)",
    border: "none",
    cursor: "pointer",
    position: "relative",
    flexShrink: 0,
    transition: "background 0.2s",
  });

  const knobStyle = (active) => ({
    position: "absolute",
    top: "3px",
    left: active ? "23px" : "3px",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    background: active ? "var(--btn-on-gold)" : "var(--text-muted)",
    transition: "left 0.2s",
  });

  return (
    <div style={{ padding: "3rem", maxWidth: "700px", margin: "0 auto", minHeight: "60vh" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>SETTINGS</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Manage your account preferences.</p>
      <div style={{ height: "2px", background: "var(--gold)", width: "100px", marginBottom: "2rem" }} />

      {/* Account Info */}
      <div style={sectionStyle}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "1.25rem" }}>Account Information</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>Full Name</label>
            <input style={inputStyle} defaultValue={user?.name || ""} readOnly />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} defaultValue={user?.email || ""} readOnly />
          </div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label style={labelStyle}>Role</label>
          <input style={{ ...inputStyle, maxWidth: "200px" }} defaultValue={user?.role === "ADMIN" ? "Admin" : "Member"} readOnly />
        </div>
      </div>

      {/* Notifications */}
      <div style={sectionStyle}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "1.25rem" }}>Notification Preferences</h3>
        {[
          { key: "email", label: "Email Notifications", desc: "Receive order updates and alerts via email" },
          { key: "push", label: "Push Notifications", desc: "Receive browser push notifications" },
          { key: "marketing", label: "Marketing Emails", desc: "Receive promotions and new arrival alerts" },
        ].map((item) => (
          <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.9rem 0", borderBottom: "1px solid var(--border-dim)" }}>
            <div>
              <p style={{ fontWeight: "500", marginBottom: "0.2rem" }}>{item.label}</p>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{item.desc}</p>
            </div>
            <button
              style={toggleStyle(notifications[item.key])}
              onClick={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
              aria-label={`Toggle ${item.label}`}
            >
              <div style={knobStyle(notifications[item.key])} />
            </button>
          </div>
        ))}
      </div>

      {/* Appearance */}
      <div style={sectionStyle}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "1.25rem" }}>Appearance</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          {["dark", "light"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTheme(t);
                document.documentElement.setAttribute("data-theme", t);
                localStorage.setItem("wheelzy-theme", t);
              }}
              style={{
                flex: 1,
                padding: "0.8rem",
                borderRadius: "6px",
                border: theme === t ? "2px solid var(--gold)" : "1px solid var(--border-dim)",
                background: t === "dark" ? "#0a0a0c" : "#f2f0eb",
                color: t === "dark" ? "#f0ede8" : "#1a1a1a",
                cursor: "pointer",
                fontWeight: theme === t ? "700" : "400",
                textTransform: "capitalize",
              }}
            >
              {t === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>
          ))}
        </div>
      </div>

      {/* Save + Logout */}
      <form onSubmit={handleSave} style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <button
          type="submit"
          style={{
            flex: 1,
            minWidth: "200px",
            padding: "0.85rem 1.5rem",
            background: "var(--gold)",
            color: "var(--btn-on-gold)",
            fontWeight: "600",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {saved ? "✓ Saved" : "Save Preferences"}
        </button>
        <button
          type="button"
          onClick={logout}
          style={{
            flex: 1,
            minWidth: "200px",
            padding: "0.85rem 1.5rem",
            background: "transparent",
            color: "var(--red-accent)",
            fontWeight: "600",
            borderRadius: "4px",
            border: "1px solid var(--red-accent)",
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </form>
    </div>
  );
}
