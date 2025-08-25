import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  addToCart,
  decreaseFromCart,
  removeFromCart,
  toggleChecked,
} from "../store/actions/cartActions";

const BASE_SHIPPING = 29.99;
const FREE_SHIPPING_LIMIT = 150;

export default function CartPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const items = useSelector((s) => s.cart?.items || []);

  const totalItems = items.reduce((s, x) => s + x.count, 0);
  const selected = items.filter((x) => x.checked);
  const subtotal = selected.reduce(
    (sum, x) => sum + Number(x.product.price || 0) * x.count,
    0
  );

  const shippingBase = selected.length > 0 ? BASE_SHIPPING : 0;
  const shippingDiscount = subtotal >= FREE_SHIPPING_LIMIT ? BASE_SHIPPING : 0;
  const shippingPay = Math.max(0, shippingBase - shippingDiscount);
  const grandTotal = subtotal + shippingPay;

  return (
    <main className="min-h-screen bg-gray-50 font-[Montserrat] text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-lg text-gray-600">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {/* Layout: left list + right summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: cart list */}
          <section className="lg:col-span-2">
            {/* Empty State */}
            {items.length === 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
                <button
                  onClick={() => history.push("/shop")}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Start Shopping
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            )}

            {/* Cart Items */}
            {items.length > 0 && (
              <div className="space-y-4">
                {items.map((it) => (
                  <div
                    key={it.product.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Info */}
                      <div className="flex items-start gap-4 flex-1">
                        <input
                          type="checkbox"
                          checked={it.checked}
                          onChange={() => dispatch(toggleChecked(it.product.id))}
                          className="w-5 h-5 accent-blue-600 cursor-pointer mt-2"
                        />
                        <img
                          src={it.product.images?.[0]?.url}
                          alt={it.product.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-lg line-clamp-2 mb-2">
                            {it.product.name}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                            {it.product.description}
                          </p>
                          <div className="text-lg font-bold text-blue-600">
                            ${(Number(it.product.price) * it.count).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            ${Number(it.product.price).toFixed(2)} each
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-gray-600 hover:text-gray-800"
                            onClick={() => dispatch(decreaseFromCart(it.product.id))}
                            aria-label="Decrease quantity"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-12 h-10 flex items-center justify-center text-lg font-semibold text-gray-700 bg-gray-50 border border-gray-300 rounded-lg">
                            {it.count}
                          </span>
                          <button
                            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-gray-600 hover:text-gray-800"
                            onClick={() => dispatch(addToCart(it.product))}
                            aria-label="Increase quantity"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 hover:border-red-400 transition-all duration-200 font-medium"
                          onClick={() => dispatch(removeFromCart(it.product.id))}
                        >
                          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* RIGHT: order summary */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Products total</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {shippingBase > 0 ? `$${shippingBase.toFixed(2)}` : "$0.00"}
                  </span>
                </div>

                {shippingDiscount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-600">Shipping discount</span>
                    <span className="font-semibold text-green-600">
                      -${shippingDiscount.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 text-lg"
                disabled={selected.length === 0}
                onClick={() => history.push("/checkout")}
              >
                {selected.length === 0 ? "Select items to checkout" : "Proceed to Checkout"}
              </button>

              {shippingDiscount === 0 && subtotal > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">
                      Add ${(FREE_SHIPPING_LIMIT - subtotal).toFixed(2)} more for free shipping!
                    </span>
                  </div>
                </div>
              )}

              {shippingDiscount > 0 && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-green-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-medium">Free shipping applied!</span>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}