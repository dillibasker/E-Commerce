import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function Recommendations({ productId }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/api/recommend/${productId}`)
      .then(res => res.json())
      .then(setItems)
      .catch(console.error);
  }, [productId]);

  if (!items.length) return null;

  return (
    <div className="px-8 pb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        You may also like
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(p => (
          <div
            key={p._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 cursor-pointer"
          >
            <img
              src={p.image}
              alt={p.name}
              className="h-32 w-full object-cover rounded-lg"
            />

            <h4 className="font-semibold mt-3 truncate">{p.name}</h4>

            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(p.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <p className="text-blue-600 font-bold mt-2">
              ₹{p.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
