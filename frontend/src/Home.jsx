import { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";

function Home({ onLogout, isDarkMode, toggleDarkMode }) { // ✅ ADD THESE PROPS
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [wishlist, setWishlist] = useState([]);
    const [currentUser, setCurrentUser] = useState(null); // ✅ FIX
  const [userId, setUserId] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      // 1️⃣ Fetch logged-in user
      const userRes = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
        credentials: "include", // send cookies
      });
      if (!userRes.ok) throw new Error("Not authenticated");
      const userData = await userRes.json();
      setCurrentUser(userData.user); // ✅ store user info

      const userId = userData.user._id;
      setUserId(userId);

      // 2️⃣ Seed DB with products (optional)
      if (import.meta.env.DEV) {
      await fetch(`${import.meta.env.VITE_API_URL}/seed`, { method: "POST" });
      }


      // 3️⃣ Fetch all products
      const productRes = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      const productsData = await productRes.json();
      setProducts(productsData);

      // 4️⃣ Fetch wishlist for current user
      const wishlistRes = await fetch(`${import.meta.env.VITE_API_URL}/wishlist/${userId}`);
      const wishlistData = await wishlistRes.json();
      setWishlist(wishlistData.map(item => item.productId._id));


    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      setCart(cart.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item._id === productId ? { ...item, quantity } : item
      ));
    }
  };
  const toggleWishlist = async (productId) => {
  try {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );

    await fetch(`${import.meta.env.VITE_API_URL}/wishlist/toggle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId })
    });
  } catch (err) {
    console.error(err);
  }
};

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-orange-50'
    }`}> {/* ✅ UPDATED - Dynamic background */}
      
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
        onLogout={onLogout}
        onProfileClick={() => setShowProfile(true)}
        WhishlistClick={() => setShowWishlist(true)}
        wishlistCount={wishlist.length}
        userId={userId}
        isDarkMode={isDarkMode}           // ✅ ADD THIS
        toggleDarkMode={toggleDarkMode}   // ✅ ADD THIS
      />

      {/* PROFILE PAGE */}
      {showWishlist ? (
            <Wishlist
                onBack={() => setShowWishlist(false)}
                isDarkMode={isDarkMode}
                wishlist={wishlist}
                allProducts={products}
                onToggleWishlist={toggleWishlist}
                onAddToCart={addToCart}
                onProductClick={setSelectedProduct}
            />
          ) : showProfile ? (
            <Profile
              onBack={() => setShowProfile(false)}
              isDarkMode={isDarkMode}
            />
          ) : (
        <>
          {/* LOADING */}
          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <div className={`animate-spin rounded-full h-16 w-16 border-t-4 ${
                isDarkMode ? 'border-emerald-500' : 'border-blue-600'
              }`}></div> {/* ✅ UPDATED - Dynamic spinner color */}
            </div>
          ) : selectedProduct ? (
            <ProductDetail
              product={selectedProduct}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onClose={() => setSelectedProduct(null)}
              onAddToCart={addToCart}
              onProductClick={setSelectedProduct}
              isDarkMode={isDarkMode}
                // ✅ ADD THIS
            />
          ) : (
            <ProductGrid
              products={products}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onProductClick={setSelectedProduct}
              onAddToCart={addToCart}
              isDarkMode={isDarkMode} 
              currentUser={currentUser} // ✅ ADD THIS
            />
          )}

          {/* CART */}
          {showCart && (
            <Cart
              cart={cart}
              onClose={() => setShowCart(false)}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
              onCheckout={() => {
                setShowCart(false);
                setShowCheckout(true);
              }}
              total={getTotal()}
              isDarkMode={isDarkMode}  // ✅ ADD THIS
            />
          )}

          {/* CHECKOUT */}
          {showCheckout && (
            <Checkout
              cart={cart}
              total={getTotal()}
              onClose={() => setShowCheckout(false)}
              onSuccess={() => {
                setCart([]);
                setShowCheckout(false);
              }}
              isDarkMode={isDarkMode}  // ✅ ADD THIS
            />
          )}
        </>
      )}
    </div>
  );
}


export default Home;