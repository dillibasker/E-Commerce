import { Star, TrendingUp, Sparkles, Heart, ShoppingCart, Eye, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function Recommendations({ productId, onProductClick, onAddToCart, isDarkMode }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/recommend/${productId}`)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [productId]);

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (!items.length && !loading) return null;

  return (
    <div className={`px-8 pb-8 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
      {/* Header with Animation */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              You May Also Like
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              AI-powered recommendations just for you
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
          <Zap className="w-4 h-4" />
          <span>Trending</span>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className={`rounded-2xl overflow-hidden ${
                isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
              } animate-pulse`}
            >
              <div className={`h-40 ${isDarkMode ? 'bg-slate-600' : 'bg-gray-200'}`}></div>
              <div className="p-4 space-y-3">
                <div className={`h-4 rounded ${isDarkMode ? 'bg-slate-600' : 'bg-gray-200'}`}></div>
                <div className={`h-3 w-2/3 rounded ${isDarkMode ? 'bg-slate-600' : 'bg-gray-200'}`}></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((p, index) => (
            <div
              key={p._id}
              className={`group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${
                isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:shadow-xl shadow-lg'
              }`}
              style={{
                animation: `slideUp 0.5s ease-out ${index * 0.1}s backwards`
              }}
              onMouseEnter={() => setHoveredItem(p._id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => onProductClick && onProductClick(p)}
            >
              <style>{`
                @keyframes slideUp {
                  from {
                    opacity: 0;
                    transform: translateY(20px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>

              {/* Product Image */}
              <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />

                {/* Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
                  hoveredItem === p._id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(p._id);
                      }}
                      className={`p-2 rounded-full backdrop-blur-md transition-all ${
                        wishlist.includes(p._id)
                          ? 'bg-red-500 scale-110'
                          : 'bg-white/90 hover:bg-red-500 hover:scale-110'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${wishlist.includes(p._id) ? 'text-white fill-white' : 'text-gray-800'}`} />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart && onAddToCart(p);
                      }}
                      className="p-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 backdrop-blur-md transition-all transform hover:scale-110 shadow-lg"
                    >
                      <ShoppingCart className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                  {p.rating >= 4.5 && (
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                      <TrendingUp className="w-3 h-3" />
                      <span>Hot</span>
                    </div>
                  )}
                  
                  <div className="ml-auto bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    ₹{p.price}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h4 className={`font-bold text-sm mb-2 line-clamp-2 min-h-[2.5rem] ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {p.name}
                </h4>

                {/* Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(p.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : isDarkMode ? "text-slate-600" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-xs font-semibold ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    {p.rating}
                  </span>
                </div>

                {/* Price and Quick View */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                      Starting at
                    </p>
                    <p className="text-lg font-black bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                      ₹{p.price}
                    </p>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onProductClick && onProductClick(p);
                    }}
                    className={`p-2 rounded-lg transition-all ${
                      isDarkMode
                        ? 'bg-slate-600 hover:bg-slate-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View All Button */}
      {items.length >= 4 && (
        <div className="text-center mt-8">
          <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto">
            <span>View All Recommendations</span>
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}