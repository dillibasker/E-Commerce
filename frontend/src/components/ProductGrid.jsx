import { ShoppingCart, Star } from 'lucide-react';
import { useState, useEffect } from "react";

export default function ProductGrid({ products, onProductClick, onAddToCart }) {

    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // Filter products based on search term for the grid
    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update suggestions whenever searchTerm changes
    useEffect(() => {
        if (!searchTerm) {
            setSuggestions([]);
            return;
        }

        const matches = products
            .filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.category?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(0, 5); // top 5 suggestions

        setSuggestions(matches);
    }, [searchTerm, products]);

    return (
        <div className="container mx-auto px-4 py-12">

            {/* 🔍 Search Input with dropdown */}
            <div className="text-center mb-6 relative">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* 🔹 Suggestions dropdown */}
                {suggestions.length > 0 && (
                    <ul className="absolute bg-white border rounded-lg mt-1 w-full md:w-1/2 max-h-60 overflow-auto z-50 shadow-lg">
                        {suggestions.map((s) => (
                            <li
                                key={s._id}
                                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                onClick={() => setSearchTerm(s.name)} // fill search bar
                            >
                                {s.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
                <p className="text-gray-600">Discover our amazing collection</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* ✅ Use filteredProducts for search */}
                {filteredProducts.map((product) => (
                    <div
                        key={product._id}
                        className="product-card group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                        style={{
                            transform: 'translateZ(0)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-10px) rotateX(5deg) scale(1.03)';
                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) rotateX(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                        }}
                    >
                        <div
                            className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden"
                            onClick={() => onProductClick(product)}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                            />
                            <div className="absolute top-3 right-3 bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold">
                                {product.category}
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                            <div className="flex items-center mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                                <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onAddToCart(product);
                                    }}
                                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:from-blue-700 hover:to-blue-800 transition transform hover:scale-105"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    <span>Add</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ❌ No products found */}
            {filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 mt-10">
                    No products found
                </p>
            )}
        </div>
    );
}
