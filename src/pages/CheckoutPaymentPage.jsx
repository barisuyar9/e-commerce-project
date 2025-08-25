import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { fetchCards, createCard } from "../store/thunks/cardThunks";
import { selectCard } from "../store/actions/cardActions";
import { placeOrder } from "../store/thunks/orderThunks"; // /order POST

export default function CheckoutPaymentPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { items, fetchState, selectedId } = useSelector((s) => s.card);
  const order = useSelector((s) => s.order);
  const { subtotal, shipping, discount, total } = order?.summary || {};

  const [showNewCard, setShowNewCard] = useState(false);
  const [cvv, setCvv] = useState("");
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (fetchState === "NOT_FETCHED") {
      dispatch(fetchCards());
    }
  }, [dispatch, fetchState]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      card_no: "",
      expire_month: "",
      expire_year: "",
      name_on_card: "",
    },
  });

  const onSubmit = async (data) => {
    await dispatch(
      createCard({
        card_no: data.card_no.replace(/\s+/g, ""),
        expire_month: Number(data.expire_month),
        expire_year: Number(data.expire_year),
        name_on_card: data.name_on_card,
      })
    );
    reset();
    setShowNewCard(false);
    toast.success("Card saved");
  };

  const loading = fetchState === "FETCHING";

  const handlePay = async () => {
    try {
      if (!selectedId) {
        toast.error("Please select a card.");
        return;
      }
      if (cvv.length !== 3) {
        toast.error("Enter 3-digit CVV");
        return;
      }
      setPlacing(true);
      await dispatch(placeOrder(cvv));
      toast.success("Your order has been created successfully!");
      history.replace("/");
    } catch (e) {
      toast.error(e?.message || "Order failed");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900">Checkout — Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">Payment Method</h2>
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 transition-colors"
                    onClick={() => setShowNewCard((p) => !p)}
                  >
                    <span>{showNewCard ? '← Back to saved cards' : '+ Add new card'}</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {showNewCard ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">Card Number</label>
                      <input
                        placeholder="1234 1234 1234 1234"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                        {...register("card_no", {
                          required: "Required",
                          pattern: {
                            value: /^\d{16}$/,
                            message: "Must be 16 digits",
                          },
                        })}
                      />
                      {errors.card_no && (
                        <span className="text-red-500 text-sm">
                          {errors.card_no.message}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="number"
                            placeholder="MM"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                            {...register("expire_month", {
                              required: "Required",
                              min: { value: 1, message: "1-12" },
                              max: { value: 12, message: "1-12" },
                            })}
                          />
                          {errors.expire_month && (
                            <span className="text-red-500 text-sm">
                              {errors.expire_month.message}
                            </span>
                          )}
                        </div>

                        <input
                          type="number"
                          placeholder="YYYY"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                          {...register("expire_year", {
                            required: "Required",
                            min: {
                              value: new Date().getFullYear(),
                              message: "Invalid year",
                            },
                            max: {
                              value: new Date().getFullYear() + 20,
                              message: "Too far",
                            },
                          })}
                        />
                        {errors.expire_year && (
                          <span className="text-red-500 text-sm">
                            {errors.expire_year.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">Name on Card</label>
                      <input
                        placeholder="John Doe"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                        {...register("name_on_card", {
                          required: "Required",
                          minLength: 3,
                        })}
                      />
                      {errors.name_on_card && (
                        <span className="text-red-500 text-sm">
                          {errors.name_on_card.message}
                        </span>
                      )}
                    </div>

                    <div className="pt-2">
                      <label className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            disabled
                          />
                        </div>
                        <span className="ml-3 text-sm text-gray-500">
                          I want to pay with 3D Secure
                        </span>
                      </label>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSubmitting ? (
                          <>
                            <CircularProgress size={20} className="text-white mr-2" />
                            Processing...
                          </>
                        ) : (
                          'Save Card'
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <h3 className="font-semibold mb-3">Saved Cards</h3>
                    {loading ? (
                      <div className="py-8 flex justify-center">
                        <CircularProgress />
                      </div>
                    ) : items.length === 0 ? (
                      <p className="text-gray-600">
                        No saved card. Add a new one.
                      </p>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 gap-4">
                          {items.map((c) => {
                            const masked = (c.card_no || "").replace(
                              /\d(?=\d{4})/g,
                              "*"
                            );
                            return (
                              <label
                                key={c.id}
                                className={`p-4 border rounded-xl cursor-pointer ${
                                  selectedId === c.id
                                    ? "border-blue-500 shadow-sm"
                                    : "border-gray-200"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="savedCard"
                                  className="mr-2 accent-[#23A6F0] cursor-pointer"
                                  checked={selectedId === c.id}
                                  onChange={() => dispatch(selectCard(c.id))}
                                />
                                <div className="font-semibold">{masked}</div>
                                <div className="text-sm text-gray-600">
                                  {String(c.expire_month).padStart(2, "0")}/
                                  {c.expire_year} • {c.name_on_card}
                                </div>
                              </label>
                            );
                          })}
                        </div>

                        {/* CVV */}
                        <div className="pt-4 border-t border-gray-200 mt-6">
                          <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-gray-700">
                              Security Code (CVV)
                            </label>
                            <div className="relative rounded-md shadow-sm max-w-[120px]">
                              <input
                                type="password"
                                maxLength={3}
                                placeholder="•••"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                                value={cvv}
                                onChange={(e) =>
                                  setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                                }
                              />
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              3-digit security code on the back of your card
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Step Controls */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="border border-gray-200 px-4 py-2 rounded hover:bg-gray-50 cursor-pointer"
                onClick={() => history.push("/checkout")}
              >
                Back
              </button>
              <button
                type="button"
                className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!selectedId || cvv.length !== 3 || placing}
                onClick={handlePay}
              >
                {placing ? <CircularProgress size={20} /> : "Pay & Create Order"}
              </button>
            </div>
          </section>

          {/* RIGHT COLUMN */}
          <section className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <Row label="Subtotal" value={`$${subtotal?.toFixed(2)}`} />
                  <Row
                    label="Shipping"
                    value={shipping === 0 ? "Free" : `$${shipping?.toFixed(2)}`}
                  />
                  <Row
                    label="Discount"
                    value={`-$${discount?.toFixed(2)}`}
                    accent
                  />
                  <div className="border-t border-gray-200 pt-4 mt-2">
                    <Row
                      label="Total"
                      value={`$${total?.toFixed(2)}`}
                      bold
                      accent
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Secure Payment</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Your payment information is processed securely. We do not store your credit card details.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex justify-center space-x-6">
                    <img
                      className="h-8"
                      src="https://tailwindui.com/img/logos/visa.svg"
                      alt="Visa"
                    />
                    <img
                      className="h-8"
                      src="https://tailwindui.com/img/logos/mastercard.svg"
                      alt="Mastercard"
                    />
                    <img
                      className="h-8"
                      src="https://tailwindui.com/img/logos/amex.svg"
                      alt="American Express"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Need help?</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Having trouble with your order? Our customer service team is here to help.
                    </p>
                    <div className="mt-4">
                      <a
                        href="#"
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        Contact Support <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function Row({ label, value, bold, accent }) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`text-sm ${bold ? 'font-semibold' : 'text-gray-600'} ${
          accent ? 'text-blue-600' : ''
        }`}
      >
        {label}
      </span>
      <span
        className={`text-sm ${bold ? 'font-semibold' : 'text-gray-900'} ${
          accent ? 'text-blue-600' : ''
        }`}
      >
        {value}
      </span>
    </div>
  );
}