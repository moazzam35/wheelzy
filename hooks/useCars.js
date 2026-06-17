import { useState, useCallback } from "react";

export function useCars() {
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCars = useCallback(async (filters = {}) => {
    setLoading(true);
    setError("");
    try {
      const searchParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "") {
          searchParams.append(key, val);
        }
      });

      const res = await fetch(`/api/cars?${searchParams.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch cars");
      setCars(data.cars || []);
      return data.cars;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCarById = useCallback(async (id) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/cars/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch car details");
      setCar(data.car || null);
      return data.car;
    } catch (err) {
      setError(err.message);
      setCar(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const addCar = async (carData) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add car");
      return { success: true, car: data.car };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const editCar = async (id, carData) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update car");
      return { success: true, car: data.car };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const removeCar = async (id) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete car");
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const uploadCarImage = async (file) => {
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload image");
      return { success: true, url: data.url };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    cars,
    car,
    loading,
    error,
    fetchCars,
    fetchCarById,
    addCar,
    editCar,
    removeCar,
    uploadCarImage,
  };
}
