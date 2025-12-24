import { X, ShoppingCart, Star } from 'lucide-react';

export default function ProductDetail({ product, onClose, onAddToCart }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl"
        style={{
          animation: 'slideIn 0.3s ease-out',
        }}
      >
        <style>{`
          @keyframes slideIn {
            from {
              transform: scale(0.9) translateY(20px);
              opacity: 0;
            }
            to {
              transform: scale(1) translateY(0);
              opacity: 1;
            }
          }
        `}</style>

        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  {product.category}
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>

                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">{product.rating} / 5</span>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-700 font-semibold">
                    ✓ {product.stock} items in stock
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <p className="text-gray-500 text-sm">Price</p>
                    <p className="text-4xl font-bold text-blue-600">₹{product.price}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-full font-bold text-lg flex items-center justify-center space-x-3 hover:from-blue-700 hover:to-blue-800 transition transform hover:scale-105"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
