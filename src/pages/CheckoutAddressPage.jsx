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
      className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
        selectedId === addr.id
          ? "border-blue-600 bg-blue-50 shadow-md"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={selectedId === addr.id}
        onChange={() => onSelect(addr.id)}
        className="mt-1 w-5 h-5 accent-blue-600 cursor-pointer"
      />
      <div className="flex-1">
        <div className="font-semibold text-lg text-gray-900 mb-2">{addr.title}</div>
        <div className="text-sm text-gray-600 mb-1">
          {addr.name} {addr.surname} • {addr.phone}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          {addr.neighborhood}, {addr.district}/{addr.city}
        </div>
        <div className="text-sm text-gray-600">{addr.address}</div>
      </div>
      {selectedId === addr.id && (
        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
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
    <main className="min-h-screen bg-gray-50 font-[Montserrat] text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Shipping & Billing Address
          </h1>
          <p className="text-lg text-gray-600">
            Choose your delivery and billing addresses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <section className="lg:col-span-2 space-y-6">
            {/* Shipping */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
                </div>
                <button
                  className="inline-flex items-center px-4 py-2 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
                  onClick={() => history.push("/checkout/address/new")}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Address
                </button>
              </div>

              {loading ? (
                <div className="py-12 flex justify-center">
                  <CircularProgress />
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-4">No saved addresses found</p>
                  <button
                    onClick={() => history.push("/checkout/address/new")}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Add Your First Address
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Billing Address</h2>
                </div>
                <label className="flex items-center text-sm text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">
                  <input
                    type="checkbox"
                    className="mr-2 w-4 h-4 accent-blue-600 cursor-pointer"
                    checked={sameAsShipping}
                    onChange={(e) => setSameAsShipping(e.target.checked)}
                  />
                  Same as shipping
                </label>
              </div>

              {sameAsShipping ? (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 text-blue-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Billing address will be the same as shipping address</span>
                  </div>
                </div>
              ) : loading ? (
                <div className="py-12 flex justify-center">
                  <CircularProgress />
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-4">No saved addresses found</p>
                  <button
                    onClick={() => history.push("/checkout/address/new")}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Add Billing Address
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
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
            <div className="flex justify-end pt-6">
              <button
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 text-lg"
                disabled={!shippingId || (!sameAsShipping && !billingId)}
                onClick={handleSaveAndContinue}
              >
                Save & Continue
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </section>

          {/* RIGHT: summary */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Order Summary</h3>
              <div className="space-y-4 mb-6">
                <Row label="Products total" value={`$${subtotal.toFixed(2)}`} />
                <Row label="Shipping" value={`$${shippingBase.toFixed(2)}`} />
                {shippingDiscount > 0 && (
                  <Row
                    label="Shipping discount"
                    value={`-$${shippingDiscount.toFixed(2)}`}
                    accent="green"
                  />
                )}
              </div>
              <div className="border-t border-gray-200 pt-4 mb-6">
                <Row label="Total" value={`$${grandTotal.toFixed(2)}`} bold />
              </div>
              
              {shippingDiscount === 0 && subtotal > 0 && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
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
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
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

function Row({ label, value, bold, accent }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{label}</span>
      <span
        className={`${bold ? "font-bold text-lg" : "font-semibold"} ${
          accent === "green" ? "text-green-600" : "text-gray-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}