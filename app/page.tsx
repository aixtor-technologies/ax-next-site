"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL;
  const [homePage, setHomePage] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      const fetchHomePage = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/wp/v2/home-page`);
  
          if (!res.ok) throw new Error("Failed to fetch home page data");
  
          const data = await res.json();
          setHomePage(data || []);
        } catch (error) {
          console.error("Home Page API Error:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchHomePage();
  }, []);
  return (
    <div>
      <h1>Welcome to Our Website 🚀</h1>
    </div>
  );
}