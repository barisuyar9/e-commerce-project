import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  decreaseFromCart,
} from "../../store/actions/cartActions";

export default function CartDropdown({ onClose }) {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart?.items || []);

  const totalPrice = items.reduce(
    (sum, it) => sum + Number(it.product.price || 0) * it.count,
    0
  );

  return (
    <div className="font-[Montserrat] absolute -right-45 md:-right-10 top-12 mt-2 w-80 sm:w-96 bg-white shadow-2xl border border-gray-100 rounded-xl p-4 z-50 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <div className="font-bold text-lg text-gray-800">
          My Cart ({items.reduce((s, x) => s + x.count, 0)})
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close cart"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Cart Items */}
      <div className="max-h-64 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {items.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500 font-medium">Your cart is empty</p>
            <p className="text-xs text-gray-400 mt-1">Add some products to get started</p>
          </div>
        ) : (
          items.map((it) => (
            <div key={it.product.id} className="flex gap-3 items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <img
                src={it.product.images?.[0]?.url}
                alt={it.product.name}
                className="w-16 h-16 object-cover rounded-lg shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">
                  {it.product.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Qty: {it.count} • ${Number(it.product.price).toFixed(2)}
                </div>
                <div className="text-sm font-bold text-blue-600 mt-1">
                  ${(Number(it.product.price) * it.count).toFixed(2)}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 text-gray-600 hover:text-gray-800"
                  onClick={() => dispatch(decreaseFromCart(it.product.id))}
                  aria-label="Decrease quantity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg">
                  {it.count}
                </span>
                <button
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 text-gray-600 hover:text-gray-800"
                  onClick={() => dispatch(addToCart(it.product))}
                  aria-label="Increase quantity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-gray-800">Total:</span>
          <span className="text-xl font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            to="/cart"
            className="flex-1 text-center py-2 px-4 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
            onClick={onClose}
          >
            View Cart
          </Link>
          <Link
            to="/checkout"
            className="flex-1 text-center py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            onClick={onClose}
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}