import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Wishlist({ onBack, isDarkMode }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/wishlist/USER_ID`)
      .then(res => res.json())
      .then(setWishlist);
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

      {wishlist.length === 0 ? (
        <p className="text-gray-500">No wishlist items</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlist.map(item => (
            <ProductCard
              key={item._id}
              product={item.productId}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}
