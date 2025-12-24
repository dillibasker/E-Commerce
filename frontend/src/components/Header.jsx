import { ShoppingCart, Search, Menu, LogOut } from 'lucide-react';

export default function Header({ cartCount, onCartClick, onLogout }) {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-3xl font-bold text-white tracking-wide">ShopZone</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-white hover:text-yellow-300 transition">Electronics</a>
              <a href="#" className="text-white hover:text-yellow-300 transition">Accessories</a>
              <a href="#" className="text-white hover:text-yellow-300 transition">Deals</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Search bar */}
            <div className="hidden md:flex items-center bg-white rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Search products..."
                className="outline-none w-64"
              />
              <Search className="w-5 h-5 text-gray-500" />
            </div>

            {/* Cart button */}
            <button
              onClick={onCartClick}
              className="relative bg-yellow-400 hover:bg-yellow-500 text-blue-900 rounded-full p-3 transition transform hover:scale-110"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Logout button */}
            <button
              onClick={onLogout}
              className="hidden md:flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition transform hover:scale-105"
            >
              <LogOut className="w-5 h-5 mr-2" /> Logout
            </button>

            {/* Mobile menu button */}
            <button className="md:hidden text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
