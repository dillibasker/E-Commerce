import { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Profile from "./pages/Profile";

function Home({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      const data = await res.json();
      if (data.length === 0) {
        await fetch(`${import.meta.env.VITE_API_URL}/seed`, { method: 'POST' });
        const res2 = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        const data2 = await res2.json();
        setProducts(data2);
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
        onLogout={onLogout}
        onProfileClick={() => setShowProfile(true)} // Profile button
      />

      {/* PROFILE PAGE */}
      {showProfile ? (
        <Profile onBack={() => setShowProfile(false)} />
      ) : (
        <>
          {/* LOADING */}
          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
            </div>
          ) : selectedProduct ? (
            <ProductDetail
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onAddToCart={addToCart}
            />
          ) : (
            <ProductGrid
              products={products}
              onProductClick={setSelectedProduct}
              onAddToCart={addToCart}
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
            />
          )}
        </>
      )}
    </div>
  );
}

export default Home;
