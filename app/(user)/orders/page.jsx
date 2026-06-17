"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useOrders } from "@/hooks/useOrders";
import { useAuth } from "@/hooks/useAuth";

const statusStyles = {
  PENDING:   { bg: "rgba(201,168,76,0.15)", color: "#c9a84c", label: "Pending" },
  COMPLETED: { bg: "rgba(39,174,96,0.15)",  color: "#27ae60", label: "Completed" },
  CANCELLED: { bg: "rgba(192,57,43,0.15)",  color: "#c0392b", label: "Cancelled" },
};

export default function OrdersPage() {
  const { orders, loading, error, fetchOrders } = useOrders();
  const { isAuthenticated, status } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, fetchOrders]);

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
        <h2 style={{ fontSize: "1.5rem" }}>Please login to view your orders</h2>
        <Link href="/login" style={{ padding: "0.8rem 1.5rem", background: "var(--gold)", color: "var(--btn-on-gold)", fontWeight: "600", borderRadius: "4px" }}>
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "3rem", maxWidth: "1200px", margin: "0 auto", minHeight: "60vh" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>MY ORDERS</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Track and manage your vehicle purchases.</p>
      <div style={{ height: "2px", background: "var(--gold)", width: "100px", marginBottom: "2rem" }} />

      {loading && <p style={{ color: "var(--text-muted)" }}>Loading your orders...</p>}
      {error && <p style={{ color: "var(--red-accent)" }}>{error}</p>}

      {!loading && orders.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem 2rem", background: "var(--surface2)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-dim)" }}>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1.1rem" }}>You haven't placed any orders yet.</p>
          <Link href="/cars" style={{ padding: "0.8rem 1.5rem", background: "var(--gold)", color: "var(--btn-on-gold)", fontWeight: "600", borderRadius: "4px", display: "inline-block" }}>
            Browse Inventory
          </Link>
        </div>
      )}

      {orders.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {orders.map((order) => {
            const s = statusStyles[order.status] || statusStyles.PENDING;
            return (
              <div
                key={order.id}
                style={{
                  background: "var(--surface2)",
                  border: "1px solid var(--border-dim)",
                  borderRadius: "var(--radius-sm)",
                  padding: "1.5rem",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1.5rem",
                  alignItems: "center",
                }}
              >
                {order.car?.image && (
                  <div style={{ width: "120px", height: "80px", borderRadius: "6px", overflow: "hidden", flexShrink: 0 }}>
                    <img src={order.car.image} alt={order.car.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {order.car?.brand} · {order.car?.year}
                  </p>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: "600", margin: "0.25rem 0" }}>{order.car?.name || "Vehicle"}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    Order #{order.id.slice(0, 8)} · {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--gold)" }}>
                    ${order.pricePaid?.toLocaleString()}
                  </p>
                  <span style={{
                    display: "inline-block",
                    marginTop: "0.5rem",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    background: s.bg,
                    color: s.color,
                  }}>
                    {s.label}
                  </span>
                </div>
                <Link
                  href={order.car ? `/cars/${order.car.id}` : "/cars"}
                  style={{
                    padding: "0.5rem 1rem",
                    border: "1px solid var(--gold)",
                    color: "var(--gold)",
                    borderRadius: "4px",
                    fontWeight: "500",
                    fontSize: "0.85rem",
                  }}
                >
                  View Car
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
