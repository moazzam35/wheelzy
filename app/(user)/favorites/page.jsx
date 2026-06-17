"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";

export default function FavoritesPage() {
  const { favorites, loading, error, fetchFavorites, removeFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [isAuthenticated, fetchFavorites]);

  if (!isAuthenticated) {
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Please login to view favorites</h2>
        <Link href="/login" style={{ color: "#c9a84c", textDecoration: "underline" }}>
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "3rem", maxWidth: "1200px", margin: "0 auto", minHeight: "60vh" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "2rem" }}>MY FAVORITES</h1>
      <div style={{ height: "2px", background: "var(--accent-glow)", width: "100px", marginBottom: "2rem" }} />

      {loading && <p>Loading your favorite vehicles...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && favorites.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>You haven't added any vehicles to your favorites yet.</p>
          <Link
            href="/cars"
            style={{
              padding: "0.8rem 1.5rem",
              background: "#c9a84c",
              color: "#1a1a1a",
              fontWeight: "600",
              borderRadius: "4px",
              display: "inline-block",
            }}
          >
            Browse Inventory
          </Link>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
        {favorites.map((car) => (
          <div
            key={car.id}
            style={{
              background: "var(--surface2)",
              border: "1px solid var(--border-color)",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ position: "relative", height: "200px", width: "100%" }}>
              <img
                src={car.image}
                alt={car.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                {car.brand} · {car.year}
              </p>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0.5rem 0", color: "var(--text-primary)" }}>
                {car.name}
              </h3>
              <p style={{ fontSize: "1.1rem", fontWeight: "600", color: "#c9a84c" }}>
                ${car.price.toLocaleString()}
              </p>
              <div style={{ marginTop: "auto", paddingTop: "1.5rem", display: "flex", gap: "1rem" }}>
                <Link
                  href={`/cars/${car.id}`}
                  style={{
                    flexGrow: 1,
                    textAlign: "center",
                    padding: "0.6rem",
                    border: "1px solid #c9a84c",
                    color: "#c9a84c",
                    borderRadius: "4px",
                    fontWeight: "500",
                  }}
                >
                  Details
                </Link>
                <button
                  onClick={() => removeFavorite(car.id)}
                  style={{
                    padding: "0.6rem 1rem",
                    background: "var(--surface3)",
                    border: "none",
                    color: "var(--text-primary)",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
