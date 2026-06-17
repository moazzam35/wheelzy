import { useState, useCallback } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/favorites");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch favorites");
      setFavorites(data.favorites || []);
      return data.favorites;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const addFavorite = async (carId) => {
    setError("");
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add to favorites");
      await fetchFavorites(); // Refresh local list
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const removeFavorite = async (carId) => {
    setError("");
    try {
      const res = await fetch(`/api/favorites?carId=${carId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to remove from favorites");
      await fetchFavorites(); // Refresh local list
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const isFavorite = useCallback((carId) => {
    return favorites.some(fav => fav.id === parseInt(carId, 10));
  }, [favorites]);

  return {
    favorites,
    loading,
    error,
    fetchFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
