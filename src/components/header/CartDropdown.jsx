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
    <div className="font-[Montserrat] absolute -right-45 md:-right-10 top-12 mt-2 w-80 bg-white shadow-lg border border-[#E6E6E6] rounded p-3 z-50">
      <div className="font-bold mb-2">
        My Cart ({items.reduce((s, x) => s + x.count, 0)})
      </div>

      <div className="max-h-64 overflow-auto space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">Your cart is empty</p>
        ) : (
          items.map((it) => (
            <div key={it.product.id} className="flex gap-3 items-center">
              <img
                src={it.product.images?.[0]?.url}
                alt={it.product.name}
                className="w-14 h-14 object-cover rounded"
              />
              <div className="flex-1">
                <div className="text-sm font-semibold line-clamp-1">
                  {it.product.name}
                </div>
                <div className="text-xs text-gray-500">
                  Qty: {it.count} • ${Number(it.product.price).toFixed(2)}
                </div>
              </div>

              <div className="flex items-center gap-2 font-bold">
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() => dispatch(decreaseFromCart(it.product.id))}
                  aria-label="Decrease"
                >
                  -
                </button>
                <button
                  className="px-2 py-1 border rounded font-bold"
                  onClick={() => dispatch(addToCart(it.product))}
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-3 flex justify-between items-center">
        <span className="font-bold">${totalPrice.toFixed(2)}</span>
        <div className="flex gap-2 items-center">
          <Link
            to="/cart"
            className="text-[#23A6F0] font-bold"
            onClick={onClose}
          >
            Go to Cart
          </Link>
          <Link
            to="/checkout"
            className="bg-[#23A6F0] text-white px-3 py-1 rounded font-bold"
            onClick={onClose}
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}