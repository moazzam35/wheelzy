"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { useFavorites } from "@/hooks/useFavorites";
import { useBookings } from "@/hooks/useBookings";

export default function ProfilePage() {
  const { user, isAuthenticated, status } = useAuth();
  const { orders, fetchOrders } = useOrders();
  const { favorites, fetchFavorites } = useFavorites();
  const { bookings, fetchBookings } = useBookings();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      Promise.all([fetchOrders(), fetchFavorites(), fetchBookings()]).then(() => setLoaded(true));
    }
  }, [isAuthenticated, fetchOrders, fetchFavorites, fetchBookings]);

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
        <h2 style={{ fontSize: "1.5rem" }}>Please login to view your profile</h2>
        <Link href="/login" style={{ padding: "0.8rem 1.5rem", background: "var(--gold)", color: "var(--btn-on-gold)", fontWeight: "600", borderRadius: "4px" }}>
          Go to Login
        </Link>
      </div>
    );
  }

  const stats = [
    { label: "Orders", value: orders.length, href: "/orders" },
    { label: "Favorites", value: favorites.length, href: "/favorites" },
    { label: "Test Drives", value: bookings.length, href: "/testdrive" },
  ];

  return (
    <div style={{ padding: "3rem", maxWidth: "900px", margin: "0 auto", minHeight: "60vh" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>MY PROFILE</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>View and manage your account information.</p>
      <div style={{ height: "2px", background: "var(--gold)", width: "100px", marginBottom: "2rem" }} />

      {/* Avatar + Name */}
      <div style={{
        background: "var(--surface2)",
        border: "1px solid var(--border-dim)",
        borderRadius: "var(--radius-md)",
        padding: "2rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        alignItems: "center",
        marginBottom: "2rem",
      }}>
        <div style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          background: "var(--gold)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "var(--btn-on-gold)",
          flexShrink: 0,
        }}>
          {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.25rem" }}>
            {user?.name || "User"}
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>{user?.email}</p>
          <span style={{
            display: "inline-block",
            padding: "0.2rem 0.7rem",
            borderRadius: "999px",
            fontSize: "0.75rem",
            fontWeight: "600",
            background: user?.role === "ADMIN" ? "rgba(192,57,43,0.15)" : "rgba(201,168,76,0.15)",
            color: user?.role === "ADMIN" ? "#c0392b" : "var(--gold)",
          }}>
            {user?.role === "ADMIN" ? "Admin" : "Member"}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            style={{
              background: "var(--surface2)",
              border: "1px solid var(--border-dim)",
              borderRadius: "var(--radius-sm)",
              padding: "1.25rem 1.5rem",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--gold)", lineHeight: 1 }}>
              {loaded ? s.value : "–"}
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.4rem" }}>{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/settings" style={{ flex: 1, minWidth: "200px", padding: "1rem 1.5rem", background: "var(--gold)", color: "var(--btn-on-gold)", fontWeight: "600", borderRadius: "4px", textAlign: "center" }}>
          Account Settings
        </Link>
        <Link href="/orders" style={{ flex: 1, minWidth: "200px", padding: "1rem 1.5rem", border: "1px solid var(--gold)", color: "var(--gold)", fontWeight: "600", borderRadius: "4px", textAlign: "center" }}>
          View Orders
        </Link>
        <Link href="/messages" style={{ flex: 1, minWidth: "200px", padding: "1rem 1.5rem", border: "1px solid var(--border)", color: "var(--text)", fontWeight: "600", borderRadius: "4px", textAlign: "center" }}>
          Messages
        </Link>
      </div>
    </div>
  );
}
