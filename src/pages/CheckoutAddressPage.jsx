import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchAddresses } from "../store/thunks/addressThunk";
import { selectShipping, selectBilling } from "../store/actions/addressActions";

import {
  setOrderAddresses,
  setOrderItems,
  setOrderSummary,
} from "../store/actions/orderActions";

const BASE_SHIPPING = 29.99;
const FREE_SHIPPING_LIMIT = 150;

export default function CheckoutAddressPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { items, fetchState, shippingId, billingId } = useSelector(
    (s) => s.address
  );

  const cartItems = useSelector((s) => s.cart?.items || []);
  const selected = cartItems.filter((x) => x.checked);
  const subtotal = selected.reduce(
    (sum, x) => sum + Number(x.product.price || 0) * x.count,
    0
  );
  const shippingBase = selected.length > 0 ? BASE_SHIPPING : 0;
  const shippingDiscount = subtotal >= FREE_SHIPPING_LIMIT ? BASE_SHIPPING : 0;
  const shippingPay = Math.max(0, shippingBase - shippingDiscount);
  const grandTotal = subtotal + shippingPay;

  const [sameAsShipping, setSameAsShipping] = useState(true);

  useEffect(() => {
    if (fetchState === "NOT_FETCHED") {
      dispatch(fetchAddresses());
    }
  }, [dispatch, fetchState]);

  useEffect(() => {
    if (sameAsShipping && shippingId) {
      dispatch(selectBilling(shippingId));
    }
  }, [sameAsShipping, shippingId, dispatch]);

  const AddressCard = ({ addr, name, selectedId, onSelect }) => (
    <label
      className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer ${
        selectedId === addr.id
          ? "border-[#23A6F0] shadow-sm"
          : "border-[#E6E6E6]"
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={selectedId === addr.id}
        onChange={() => onSelect(addr.id)}
        className="mt-1 w-4 h-4 accent-[#23A6F0] cursor-pointer"
      />
      <div className="flex-1">
        <div className="font-semibold">{addr.title}</div>
        <div className="text-sm text-[#737373]">
          {addr.name} {addr.surname} • {addr.phone}
        </div>
        <div className="text-sm text-[#737373]">
          {addr.neighborhood}, {addr.district}/{addr.city}
        </div>
        <div className="text-sm text-[#737373]">{addr.address}</div>
      </div>
    </label>
  );

  const loading = fetchState === "FETCHING";


  const handleSaveAndContinue = () => {
   
    dispatch(
      setOrderAddresses({
        shippingId,
        billingId: sameAsShipping ? shippingId : billingId,
      })
    );
  
    dispatch(setOrderItems(selected));
    
    dispatch(
      setOrderSummary({
        subtotal,
        shipping: shippingPay, 
        discount: shippingDiscount,
        total: grandTotal,
      })
    );
    history.push("/checkout/payment");
  };

  return (
    <main className="w-[90vw] max-w-[1200px] mx-auto py-10 font-[Montserrat] text-[#252B42]">
      <h1 className="text-3xl font-bold mb-6">Create Order — Address</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT */}
        <section className="md:col-span-2 space-y-6">
          {/* Shipping */}
          <div className="bg-white border border-[#E6E6E6] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">Shipping Address</h2>
              <button
                className="text-[#23A6F0] font-bold cursor-pointer"
                onClick={() => history.push("/checkout/address/new")}
              >
                + Add Address
              </button>
            </div>

            {loading ? (
              <div className="py-8 flex justify-center">
                <CircularProgress />
              </div>
            ) : items.length === 0 ? (
              <p className="text-[#737373]">
                No saved address. You can add one.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {items.map((a) => (
                  <AddressCard
                    key={a.id}
                    addr={a}
                    name="shipping"
                    selectedId={shippingId}
                    onSelect={(id) => {
                      dispatch(selectShipping(id));
                      if (sameAsShipping) dispatch(selectBilling(id));
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Billing */}
          <div className="bg-white border border-[#E6E6E6] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">Billing Address</h2>
              <label className="text-sm text-[#737373] cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 accent-[#23A6F0] cursor-pointer"
                  checked={sameAsShipping}
                  onChange={(e) => setSameAsShipping(e.target.checked)}
                />
                Same as shipping
              </label>
            </div>

            {sameAsShipping ? (
              <p className="text-[#737373]">
                Billing address will be the same as shipping.
              </p>
            ) : loading ? (
              <div className="py-8 flex justify-center">
                <CircularProgress />
              </div>
            ) : items.length === 0 ? (
              <p className="text-[#737373]">
                No saved address. You can add one.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {items.map((a) => (
                  <AddressCard
                    key={a.id}
                    addr={a}
                    name="billing"
                    selectedId={billingId}
                    onSelect={(id) => dispatch(selectBilling(id))}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Next */}
          <div className="flex justify-end">
            <button
              className="bg-[#23A6F0] text-white font-bold py-2 px-4 rounded hover:bg-[#2497da] cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={!shippingId || (!sameAsShipping && !billingId)}
              onClick={handleSaveAndContinue}
            >
              Save & Continue
            </button>
          </div>
        </section>

        {/* RIGHT: summary */}
        <aside className="md:col-span-1">
          <div className="bg-white border border-[#E6E6E6] rounded-xl p-4 shadow-sm md:sticky md:top-24">
            <h3 className="text-lg font-bold mb-3">Order Summary</h3>
            <Row label="Products total" value={`$${subtotal.toFixed(2)}`} />
            <Row label="Shipping" value={`$${shippingBase.toFixed(2)}`} />
            <Row
              label="Discount"
              value={`-$${shippingDiscount.toFixed(2)}`}
              accent="green"
            />
            <div className="h-px bg-[#E6E6E6] my-2" />
            <Row label="Total" value={`$${grandTotal.toFixed(2)}`} bold />
            <p className="mt-2 text-xs text-[#737373]">
              Free shipping over ${FREE_SHIPPING_LIMIT}.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Row({ label, value, bold, accent }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-[#737373]">{label}</span>
      <span
        className={`${bold ? "font-bold" : ""} ${
          accent === "green" ? "text-[#23856D] font-bold" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}