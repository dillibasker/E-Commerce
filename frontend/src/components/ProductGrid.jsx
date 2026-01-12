import { ShoppingCart, Star, Heart, Eye, TrendingUp, Zap, Filter, X, Sparkles } from 'lucide-react';
import { useState, useEffect } from "react";

export default function ProductGrid({ products = [],  wishlist = [],
  onToggleWishlist, onProductClick, onAddToCart, isDarkMode }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [wishlist, setWishlist] = useState([]);
    const [priceRange, setPriceRange] = useState("All");
    const [sortBy, setSortBy] = useState("featured");

    // Get unique categories
    const categories = ["All", ...new Set((products || []).map(p => p.category).filter(Boolean))];

    // Price ranges
    const priceRanges = [
        { label: "All", min: 0, max: Infinity },
        { label: "Under ₹500", min: 0, max: 500 },
        { label: "₹500 - ₹1000", min: 500, max: 1000 },
        { label: "₹1000 - ₹2000", min: 1000, max: 2000 },
        { label: "Above ₹2000", min: 2000, max: Infinity }
    ];

    // Filter and sort products
    let filteredProducts = (products || []).filter((p) => {
        const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
        
        const selectedRange = priceRanges.find(r => r.label === priceRange);
        const matchesPrice = !selectedRange || (p.price >= selectedRange.min && p.price < selectedRange.max);
        
        return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    if (sortBy === "price-low") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    }

    // Update suggestions
/* 🔍 Search suggestions */
useEffect(() => {
  if (!searchTerm || !products || products.length === 0) {
    setSuggestions([]);
    return;
  }

  const matches = products
    .filter(p =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  setSuggestions(matches);
}, [searchTerm, products]);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <div className="container mx-auto px-4 py-12">

                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-xl opacity-50"></div>
                            <Sparkles className="relative w-10 h-10 text-emerald-500 animate-pulse" />
                        </div>
                        <h2 className={`text-5xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            Featured Products
                        </h2>
                    </div>
                    <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Discover our curated collection of premium products
                    </p>
                    <div className="mt-4 flex items-center justify-center space-x-2">
                        <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                        <Zap className="w-5 h-5 text-emerald-500" />
                        <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="max-w-4xl mx-auto mb-10 relative">
                    <div className={`relative rounded-2xl shadow-xl transition-all ${isDarkMode ? 'bg-slate-800 ring-slate-700' : 'bg-white ring-slate-200'} ${searchTerm ? 'ring-2 ring-emerald-500' : ''}`}>
                        <input
                            type="text"
                            placeholder="Search for products, brands, categories and more..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full px-6 py-4 rounded-2xl outline-none font-medium transition-all ${isDarkMode ? 'bg-slate-800 text-white placeholder-slate-400' : 'bg-white text-slate-900 placeholder-slate-500'}`}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-24 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2.5 rounded-xl transition-all duration-300 font-semibold shadow-lg">
                            Search
                        </button>
                    </div>

                    {/* Suggestions Dropdown */}
                    {suggestions.length > 0 && (
                        <div className={`absolute left-0 right-0 mt-2 rounded-2xl shadow-2xl max-h-80 overflow-auto z-50 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                            {suggestions.map((s) => (
                                <div
                                    key={s._id}
                                    className={`px-6 py-4 cursor-pointer transition-all flex items-center justify-between hover:scale-[1.02] ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-50'}`}
                                    onClick={() => setSearchTerm(s.name)}
                                >
                                    <div className="flex items-center space-x-4">
                                        <img src={s.image} alt={s.name} className="w-12 h-12 object-cover rounded-lg" />
                                        <div>
                                            <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{s.name}</p>
                                            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{s.category}</p>
                                        </div>
                                    </div>
                                    <span className="text-emerald-500 font-bold text-lg">₹{s.price}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Filters Section */}
                <div className="mb-8 space-y-6">
                    {/* Category Filter */}
                    <div>
                        <div className="flex items-center space-x-2 mb-3">
                            <Filter className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
                            <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Categories</h3>
                        </div>
                        <div className="flex items-center space-x-3 flex-wrap gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                                        selectedCategory === cat
                                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105'
                                            : isDarkMode
                                                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                                : 'bg-white text-slate-700 hover:bg-slate-100 shadow'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price & Sort Filters */}
                    <div className="flex flex-wrap gap-4">
                        {/* Price Range */}
                        <div className="flex-1 min-w-[200px]">
                            <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                Price Range
                            </label>
                            <select
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className={`w-full px-4 py-2.5 rounded-xl font-medium transition-all ${
                                    isDarkMode
                                        ? 'bg-slate-800 text-white border-slate-700'
                                        : 'bg-white text-slate-900 border-slate-200'
                                } border focus:ring-2 focus:ring-emerald-500 outline-none`}
                            >
                                {priceRanges.map(range => (
                                    <option key={range.label} value={range.label}>{range.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Sort By */}
                        <div className="flex-1 min-w-[200px]">
                            <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                Sort By
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className={`w-full px-4 py-2.5 rounded-xl font-medium transition-all ${
                                    isDarkMode
                                        ? 'bg-slate-800 text-white border-slate-700'
                                        : 'bg-white text-slate-900 border-slate-200'
                                } border focus:ring-2 focus:ring-emerald-500 outline-none`}
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                            </select>
                        </div>

                        {/* Results Count */}
                        <div className="flex items-end">
                            <div className={`px-5 py-2.5 rounded-xl font-semibold ${
                                isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-700 shadow'
                            }`}>
                                {filteredProducts.length} Products
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className={`group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                                isDarkMode ? 'bg-slate-800' : 'bg-white'
                            } shadow-lg hover:shadow-2xl transform hover:-translate-y-2`}
                        >
                            {/* Product Image */}
                            <div
                                className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden"
                                onClick={() => onProductClick(product)}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                                />
                                
                                {/* Category Badge */}
                                <div className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                                    {product.category}
                                </div>

                                {/* Action Buttons */}
                                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                      <button
                                                onClick={(e) => {
                                                e.stopPropagation();
                                                onToggleWishlist(product._id); // ✅ FIXED
                                                }}
                                                className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg ${
                                                wishlist.includes(product._id)
                                                    ? 'bg-red-500 text-white scale-110'
                                                    : isDarkMode
                                                    ? 'bg-slate-800/90 text-white hover:bg-red-500'
                                                    : 'bg-white/90 text-slate-700 hover:bg-red-500 hover:text-white'
                                                }`}
                                            >
                                                <Heart
                                                className={`w-5 h-5 ${
                                                    wishlist.includes(product._id) ? 'fill-white' : ''
                                                }`}
                                                />
                                        </button>
                                    <button className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg ${
                                        isDarkMode
                                            ? 'bg-slate-800/90 text-white hover:bg-emerald-500'
                                            : 'bg-white/90 text-slate-700 hover:bg-emerald-500 hover:text-white'
                                    }`}>
                                        <Eye className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Trending Badge */}
                                {product.rating >= 4.5 && (
                                    <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                        <TrendingUp className="w-3 h-3" />
                                        <span>Trending</span>
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="p-5">
                                <h3 className={`text-lg font-bold mb-2 truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    {product.name}
                                </h3>
                                <p className={`text-sm mb-3 line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {product.description}
                                </p>

                                {/* Rating */}
                                <div className="flex items-center mb-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${
                                                    i < Math.floor(product.rating)
                                                        ? 'text-yellow-400 fill-yellow-400'
                                                        : isDarkMode ? 'text-slate-600' : 'text-slate-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className={`ml-2 text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                        {product.rating}
                                    </span>
                                </div>

                                {/* Price & Add to Cart */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-3xl font-black bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                                            ₹{product.price}
                                        </span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onAddToCart(product);
                                        }}
                                        className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-5 py-2.5 rounded-xl flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        <span>Add</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Products Found */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <div className={`text-8xl mb-6 ${isDarkMode ? 'opacity-20' : 'opacity-30'}`}>🔍</div>
                        <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            No products found
                        </h3>
                        <p className={`text-lg mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            Try adjusting your search or filters
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("All");
                                setPriceRange("All");
                                setSortBy("featured");
                            }}
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}