import { X, ShoppingCart, Star, Heart, Share2, TrendingUp, Package, Shield, Truck, RotateCcw, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from "react";

export default function ProductDetail({ product, onClose, onAddToCart, onProductClick, isDarkMode ,  wishlist,          // ✅ ADD
  onToggleWishlist }) {
  const [recommendations, setRecommendations] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock multiple images for gallery (in real app, get from product)
  const images = [product.image, product.image, product.image, product.image];
  const isWishlisted = wishlist.includes(product._id);


  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    onClose();
  };

  const shareProduct = async (product) => {
  const url = `${window.location.origin}/product/${product._id}`;

  if (navigator.share) {
    // ✅ Same native share popup as Amazon / Flipkart
    await navigator.share({
      title: product.name,
      text: `Check out this product on our store`,
      url,
    });
  } else {
    // 🖥 Desktop fallback
    await navigator.clipboard.writeText(url);
    alert("Link copied to clipboard");
  }
};


  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div
        className={`rounded-3xl max-w-6xl w-full my-8 shadow-2xl ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        }`}
        style={{ animation: 'slideIn 0.3s ease-out' }}
      >
        <style>{`
          @keyframes slideIn {
            from {
              transform: scale(0.95) translateY(20px);
              opacity: 0;
            }
            to {
              transform: scale(1) translateY(0);
              opacity: 1;
            }
          }
        `}</style>

        <div className="relative max-h-[90vh] overflow-y-auto">
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className={`sticky top-4 right-4 float-right rounded-full p-3 shadow-xl z-20 transition-all backdrop-blur-md ${
              isDarkMode
                ? 'bg-slate-900/80 hover:bg-slate-700 text-white'
                : 'bg-white/90 hover:bg-gray-100 text-gray-800'
            }`}
          >
            <X className="w-6 h-6" />
          </button>

          {/* PRODUCT DETAILS */}
          <div className="grid md:grid-cols-2 gap-8 p-8 pt-4">
            {/* LEFT: Product Images Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative">
                <div className={`rounded-2xl overflow-hidden ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                }`}>
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-[400px] object-cover"
                  />
                </div>

                {/* Image Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(prev => prev === 0 ? images.length - 1 : prev - 1)}
                      className={`absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-md shadow-lg transition-all ${
                        isDarkMode ? 'bg-slate-800/80 hover:bg-slate-700 text-white' : 'bg-white/90 hover:bg-white text-gray-800'
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(prev => prev === images.length - 1 ? 0 : prev + 1)}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-md shadow-lg transition-all ${
                        isDarkMode ? 'bg-slate-800/80 hover:bg-slate-700 text-white' : 'bg-white/90 hover:bg-white text-gray-800'
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Action Buttons Overlay */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                        onClick={() => onToggleWishlist(product._id)}
                        className={`p-3 rounded-full backdrop-blur-md shadow-lg transition-all ${
                          isWishlisted
                            ? 'bg-red-500 text-white scale-110'
                            : isDarkMode
                              ? 'bg-slate-800/80 hover:bg-red-500 text-white'
                              : 'bg-white/90 hover:bg-red-500 hover:text-white text-gray-800'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
                      </button>

                  <button
                    onClick={() => shareProduct(product)}
                    className={`p-3 rounded-full backdrop-blur-md shadow-lg transition-all ${
                      isDarkMode
                        ? 'bg-slate-800/80 hover:bg-emerald-500 text-white'
                        : 'bg-white/90 hover:bg-emerald-500 hover:text-white text-gray-800'
                    }`}
                  >
                    <Share2 className="w-5 h-5" />
                  </button>

                </div>

                {/* Stock Badge */}
                {product.stock < 10 && (
                  <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                    <Zap className="w-4 h-4" />
                    <span>Only {product.stock} left!</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`rounded-lg overflow-hidden transition-all ${
                      selectedImage === idx
                        ? 'ring-4 ring-emerald-500 scale-105'
                        : isDarkMode
                          ? 'ring-2 ring-slate-600 hover:ring-slate-500'
                          : 'ring-2 ring-gray-200 hover:ring-gray-300'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: Product Info */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Category Badge */}
                <div className="flex items-center justify-between">
                  <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {product.category}
                  </div>
                  {product.rating >= 4.5 && (
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-2 rounded-full text-sm font-bold">
                      <TrendingUp className="w-4 h-4" />
                      <span>Trending</span>
                    </div>
                  )}
                </div>

                {/* Product Name */}
                <h2 className={`text-4xl font-black leading-tight ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : isDarkMode ? 'text-slate-600' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`font-bold ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                    {product.rating}
                  </span>
                  <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    (2,489 reviews)
                  </span>
                </div>

                {/* Description */}
                <p className={`text-lg leading-relaxed ${
                  isDarkMode ? 'text-slate-300' : 'text-gray-600'
                }`}>
                  {product.description}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className={`rounded-xl p-4 flex items-center space-x-3 ${
                    isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
                  }`}>
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
                      <Truck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                        Free Shipping
                      </p>
                      <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Orders over ₹500
                      </p>
                    </div>
                  </div>

                  <div className={`rounded-xl p-4 flex items-center space-x-3 ${
                    isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
                  }`}>
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
                      <RotateCcw className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                        Easy Returns
                      </p>
                      <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        30-day policy
                      </p>
                    </div>
                  </div>

                  <div className={`rounded-xl p-4 flex items-center space-x-3 ${
                    isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
                  }`}>
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                        Warranty
                      </p>
                      <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        1 Year
                      </p>
                    </div>
                  </div>

                  <div className={`rounded-xl p-4 flex items-center space-x-3 ${
                    isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
                  }`}>
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                        In Stock
                      </p>
                      <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {product.stock} units
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & CTA Section */}
              <div className="space-y-4">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between">
                  <span className={`font-bold ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                    Quantity
                  </span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className={`w-10 h-10 rounded-full font-bold transition-all ${
                        isDarkMode
                          ? 'bg-slate-700 hover:bg-slate-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      -
                    </button>
                    <span className={`text-xl font-bold w-12 text-center ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className={`w-10 h-10 rounded-full font-bold transition-all ${
                        isDarkMode
                          ? 'bg-slate-700 hover:bg-slate-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price Display */}
                <div className={`rounded-2xl p-6 ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gradient-to-br from-gray-50 to-gray-100'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm font-semibold ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-600'
                    }`}>
                      Price per unit
                    </span>
                    <span className="text-5xl font-black bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                      ₹{product.price}
                    </span>
                  </div>
                  {quantity > 1 && (
                    <div className="flex items-center justify-between pt-4 border-t border-dashed">
                      <span className={`font-semibold ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                        Total ({quantity} items)
                      </span>
                      <span className="text-2xl font-black bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                        ₹{(product.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 transition-all transform hover:scale-105 shadow-lg"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>Add {quantity > 1 ? `${quantity} Items` : ''} to Cart</span>
                </button>
              </div>
            </div>
          </div>

          {/* AI RECOMMENDATIONS SECTION */}
          {recommendations.length > 0 && (
            <div className={`px-8 pb-8 border-t ${
              isDarkMode ? 'border-slate-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-6 pt-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-lg opacity-50"></div>
                  <TrendingUp className="relative w-7 h-7 text-emerald-500" />
                </div>
                <h3 className={`text-3xl font-black ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  You may also like
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recommendations.map((p) => (
                  <div
                    key={p._id}
                    className={`rounded-xl shadow-lg hover:shadow-2xl transition-all p-4 cursor-pointer transform hover:-translate-y-2 ${
                      isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      onProductClick(p);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <div className="relative mb-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-32 w-full object-cover rounded-lg"
                      />
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        ₹{p.price}
                      </div>
                    </div>

                    <h4 className={`font-bold truncate mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {p.name}
                    </h4>

                    <div className="flex items-center justify-between">
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
                      <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        {p.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}