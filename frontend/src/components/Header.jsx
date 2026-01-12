import { useState , useEffect } from 'react';
import { ShoppingCart, Search, Menu, LogOut, User, Bell, Heart, Sun, Moon, Globe, ChevronDown, Gift, TrendingUp, X } from 'lucide-react';

export default function Header({
  cartCount,
  onCartClick,
  onLogout,
  onProfileClick,
  wishlistCount,
  userId,
  WishlistClick,
  toggleDarkMode

}) {

useEffect(() => {
  if (!userId) return;   // ✅ ADD THIS

  fetch(`${import.meta.env.VITE_API_URL}/wishlist/count/${userId}`)
    .then(res => res.json())
    .then(data => setWishlistCount(data.count))
    .catch(err => console.error(err));
}, [userId]);


  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const categories = [
    { name: 'Electronics', icon: '💻', trending: true },
    { name: 'Fashion', icon: '👕', trending: false },
    { name: 'Home & Living', icon: '🏠', trending: false },
    { name: 'Sports', icon: '⚽', trending: true },
    { name: 'Books', icon: '📚', trending: false },
    { name: 'Toys', icon: '🎮', trending: false }
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <Gift className="w-4 h-4 text-emerald-400" />
            <span className="font-medium">🎉 Free Shipping on Orders Over $50!</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <button className="flex items-center space-x-1 hover:text-emerald-400 transition">
              <Globe className="w-4 h-4" />
              <span>EN</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <a href="#" className="hover:text-emerald-400 transition">Help Center</a>
            <a href="#" className="hover:text-emerald-400 transition">Track Order</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-xl border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">

            {/* LEFT SECTION */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <div className="flex items-center space-x-2 group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition"></div>
                  <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h1 className={`text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  ShopZone
                </h1>
              </div>
            </div>
            
            {/* RIGHT SECTION */}
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleDarkMode}  // ✅ CHANGE THIS - was setIsDarkMode
                className={`p-3 rounded-full transition-all duration-300 ${
                  isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600'
                } hover:scale-110`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Wishlist */}
              <button
                  onClick={WishlistClick}
                  className={`relative p-3 rounded-full transition-all duration-300 ${
                    isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900'
                  } hover:scale-110`}
                >
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {wishlistCount}
                    </span>
                  )}
              </button>


              {/* Notifications */}
              <button className={`hidden md:block relative p-3 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900'} hover:scale-110`}>
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Profile */}
              {onProfileClick && (
                <button
                  onClick={onProfileClick}
                  className={`hidden md:flex items-center space-x-2 px-4 py-2.5 rounded-full font-semibold transition-all duration-300 ${isDarkMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'} hover:scale-105`}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </button>
              )}

              {/* Cart */}
              <button
                onClick={onCartClick}
                className="relative bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-full p-3 transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Logout */}
              <button
                onClick={() => setShowLogoutModal(true)}
                className={`hidden lg:flex items-center space-x-2 px-4 py-2.5 rounded-full font-semibold transition-all duration-300 
                ${isDarkMode 
                  ? 'bg-red-900/50 text-red-400 hover:bg-red-900' 
                  : 'bg-red-50 text-red-600 hover:bg-red-100'} 
                hover:scale-105`}
              >
                <span>Logout</span>
              </button>


              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className={`md:hidden p-3 rounded-full transition-all ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900'}`}
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className={`flex items-center rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <input
                type="text"
                placeholder="Search..."
                className={`flex-1 px-4 py-2 rounded-l-full outline-none ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900'}`}
              />
              <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-r-full">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className={`md:hidden border-t ${isDarkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {categories.map((cat, idx) => (
                <a key={idx} href="#" className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
                  <span className="text-xl">{cat.icon}</span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{cat.name}</span>
                </a>
              ))}
              <button onClick={onLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </div>
        )}
      </header>
      {/* Logout Confirmation Modal */}
{showLogoutModal && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
    <div className="bg-white dark:bg-slate-900 rounded-xl w-80 p-6 text-center shadow-2xl">

      <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">
        Logout
      </h2>

      <p className="text-slate-600 dark:text-slate-300 mb-6">
        Do you want to logout of the account?
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => setShowLogoutModal(false)}
          className="w-full py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white"
        >
          No
        </button>

        <button
          onClick={() => {
            setShowLogoutModal(false);
            onLogout(); // ✅ actual logout happens here
          }}
          className="w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          Yes
        </button>
      </div>

    </div>
  </div>
)}

    </>
  );
}