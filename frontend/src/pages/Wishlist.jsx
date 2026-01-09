import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";

export default function Wishlist({ onBack, isDarkMode }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/wishlist/${userId}`
        );

        const data = await res.json();

        // 🔥 Extract products from wishlist docs
        const wishlistProducts = data.map(item => item.productId);

        setProducts(wishlistProducts);
      } catch (err) {
        console.error("Wishlist fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 rounded bg-rose-500 text-white"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-6 text-rose-500">
        My Wishlist ❤️
      </h2>

      {loading ? (
        <p className="text-gray-400">Loading wishlist...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No wishlist items</p>
      ) : (
        <ProductGrid
          products={products}
          isDarkMode={isDarkMode}
          onProductClick={() => {}}
          onAddToCart={() => {}}
        />
      )}
    </div>
  );
}
