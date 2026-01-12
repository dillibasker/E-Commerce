import ProductGrid from "../components/ProductGrid";

export default function Wishlist({
  onBack,
  isDarkMode,
  wishlist,
  allProducts,
  onToggleWishlist,
  onAddToCart,
  onProductClick
}) {
  const products = allProducts.filter(p =>
    wishlist.includes(p._id)
  );

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

      {products.length === 0 ? (
        <p className="text-gray-500">No wishlist items</p>
      ) : (
        <ProductGrid
          products={products}
          wishlist={wishlist}                 // ✅ IMPORTANT
          onToggleWishlist={onToggleWishlist} // ✅ IMPORTANT
          isDarkMode={isDarkMode}
          onProductClick={onProductClick}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
}
