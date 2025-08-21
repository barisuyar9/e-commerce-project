import { useDispatch, useSelector } from "react-redux";
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
    <main className="w-[90vw] max-w-[1200px] mx-auto py-10 font-[Montserrat] text-[#252B42]">
      <h1 className="text-3xl font-bold mb-6">
        My Cart{" "}
        <span className="ml-2 text-base font-normal text-[#737373]">
          ({totalItems} {totalItems === 1 ? "item" : "items"})
        </span>
      </h1>

      {/* Layout: left list + right summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT: cart list */}
        <section className="md:col-span-2">
          {/* table header (desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-xs uppercase tracking-wide text-[#737373] border-b border-[#E6E6E6]">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {/* rows */}
          <div className="space-y-4 mt-4">
            {items.length === 0 && (
              <div className="text-center text-[#737373] bg-white border border-[#E6E6E6] rounded-xl py-10">
                Your cart is empty.
              </div>
            )}

            {items.map((it) => (
              <div
                key={it.product.id}
                className="grid grid-cols-12 gap-4 items-center p-4 bg-white border border-[#E6E6E6] rounded-xl hover:shadow-sm transition"
              >
                {/* product + checkbox */}
                <div className="col-span-12 md:col-span-6 flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={it.checked}
                    onChange={() => dispatch(toggleChecked(it.product.id))}
                    className="w-4 h-4 accent-[#23A6F0] cursor-pointer"
                  />
                  <img
                    src={it.product.images?.[0]?.url}
                    alt={it.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-semibold line-clamp-1">
                      {it.product.name}
                    </div>
                    <div className="text-xs text-[#737373] line-clamp-1">
                      {it.product.description}
                    </div>
                  </div>
                </div>

                {/* quantity */}
                <div className="col-span-6 md:col-span-2 flex md:justify-center items-center gap-2">
                  <button
                    className="px-2 py-1 border border-[#E6E6E6] rounded hover:bg-gray-50 cursor-pointer"
                    onClick={() => dispatch(decreaseFromCart(it.product.id))}
                    aria-label="Decrease"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold">
                    {it.count}
                  </span>
                  <button
                    className="px-2 py-1 border border-[#E6E6E6] rounded hover:bg-gray-50 cursor-pointer"
                    onClick={() => dispatch(addToCart(it.product))}
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>

                {/* price */}
                <div className="col-span-3 md:col-span-2 text-right">
                  <div className="font-bold">
                    ${(Number(it.product.price) * it.count).toFixed(2)}
                  </div>
                  <div className="text-xs text-[#737373]">
                    Unit: ${Number(it.product.price).toFixed(2)}
                  </div>
                </div>

                {/* actions */}
                <div className="col-span-3 md:col-span-2 text-right">
                  <button
                    className="px-3 py-1 border border-[#E6E6E6] rounded hover:bg-gray-50 cursor-pointer"
                    onClick={() => dispatch(removeFromCart(it.product.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT: order summary */}
        <aside className="md:col-span-1">
          <div className="bg-white border border-[#E6E6E6] rounded-xl p-4 shadow-sm md:sticky md:top-24">
            <h2 className="text-lg font-bold mb-3">Order Summary</h2>

            <div className="flex justify-between py-1">
              <span className="text-[#737373]">Products total</span>
              <span className="font-bold">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-[#737373]">Shipping</span>
              <span className="font-bold">
                {shippingBase > 0 ? `$${shippingBase.toFixed(2)}` : "$0.00"}
              </span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-[#737373]">Discount</span>
              <span className="font-bold text-[#23856D]">
                -${shippingDiscount.toFixed(2)}
              </span>
            </div>

            <div className="h-px bg-[#E6E6E6] my-2" />

            <div className="flex justify-between py-1 text-lg">
              <span>Total</span>
              <span className="font-bold">${grandTotal.toFixed(2)}</span>
            </div>

           

            <button
              className="mt-4 w-full bg-[#23A6F0] text-white font-bold py-2 rounded hover:bg-[#2497da] disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
              disabled={selected.length === 0}
              // onClick={() => {} }  // no functionality yet
            >
              Create Order
            </button>

            <p className="mt-2 text-xs text-center text-[#737373]">
              Free shipping for orders over ${FREE_SHIPPING_LIMIT}.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}