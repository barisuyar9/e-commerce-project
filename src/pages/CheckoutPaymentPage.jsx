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
    <main className="w-[90vw] max-w-[1200px] mx-auto py-10 font-[Montserrat] text-[#252B42]">
      <h1 className="text-3xl font-bold mb-6">Create Order — Payment</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT */}
        <section className="md:col-span-2 space-y-6">
          <div className="bg-white border border-[#E6E6E6] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">Card Information</h2>
              <button
                type="button"
                className="text-[#23A6F0] font-bold cursor-pointer"
                onClick={() => setShowNewCard((p) => !p)}
              >
                {showNewCard ? "Use saved card" : "Add new card"}
              </button>
            </div>

            {showNewCard ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label>Card Number</label>
                  <input
                    placeholder="1234 1234 1234 1234"
                    className="border border-[#E6E6E6] rounded px-3 py-2"
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

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label>Expire Month</label>
                    <input
                      type="number"
                      placeholder="MM"
                      className="border border-[#E6E6E6] rounded px-3 py-2"
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

                  <div className="flex flex-col gap-1">
                    <label>Expire Year</label>
                    <input
                      type="number"
                      placeholder="YYYY"
                      className="border border-[#E6E6E6] rounded px-3 py-2"
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

                <div className="flex flex-col gap-1">
                  <label>Name on Card</label>
                  <input
                    placeholder="John Doe"
                    className="border border-[#E6E6E6] rounded px-3 py-2"
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

                <label className="flex items-center gap-2 text-sm text-[#737373] cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-[#23A6F0] cursor-pointer"
                    disabled
                  />
                  I want to pay with 3D Secure
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#23A6F0] text-white font-bold py-2 px-4 rounded hover:bg-[#2497da] disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <CircularProgress size={20} /> : "Save Card"}
                </button>
              </form>
            ) : (
              <div>
                <h3 className="font-semibold mb-3">Saved Cards</h3>
                {loading ? (
                  <div className="py-8 flex justify-center">
                    <CircularProgress />
                  </div>
                ) : items.length === 0 ? (
                  <p className="text-[#737373]">
                    No saved card. Add a new one.
                  </p>
                ) : (
                  <>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {items.map((c) => {
                        const masked = (c.card_no || "").replace(
                          /\d(?=\d{4})/g,
                          "*"
                        );
                        return (
                          <label
                            key={c.id}
                            className={`p-3 border rounded-xl cursor-pointer ${
                              selectedId === c.id
                                ? "border-[#23A6F0] shadow-sm"
                                : "border-[#E6E6E6]"
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
                            <div className="text-sm text-[#737373]">
                              {String(c.expire_month).padStart(2, "0")}/
                              {c.expire_year} • {c.name_on_card}
                            </div>
                          </label>
                        );
                      })}
                    </div>

                    {/* CVV */}
                    <div className="mt-4 max-w-[200px]">
                      <label className="block text-sm font-semibold mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        inputMode="numeric"
                        maxLength={3}
                        className="border border-[#E6E6E6] rounded px-3 py-2 w-full"
                        value={cvv}
                        onChange={(e) =>
                          setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                        }
                        placeholder="123"
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Step Controls */}
          <div className="flex justify-between">
            <button
              type="button"
              className="border border-[#E6E6E6] px-4 py-2 rounded hover:bg-gray-50 cursor-pointer"
              onClick={() => history.push("/checkout")}
            >
              Back
            </button>
            <button
              type="button"
              className="bg-[#23A6F0] text-white font-bold py-2 px-4 rounded hover:bg-[#2497da] cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={!selectedId || cvv.length !== 3 || placing}
              onClick={handlePay}
            >
              {placing ? <CircularProgress size={20} /> : "Pay & Create Order"}
            </button>
          </div>
        </section>

        {/* RIGHT: summary */}
        <aside className="md:col-span-1">
          <div className="bg-white border border-[#E6E6E6] rounded-xl p-4 shadow-sm md:sticky md:top-24">
            <h3 className="text-lg font-bold mb-3">Order Summary</h3>
            <Row
              label="Products total"
              value={`$${Number(subtotal || 0).toFixed(2)}`}
            />
            <Row
              label="Shipping"
              value={`$${Number(shipping || 0).toFixed(2)}`}
            />
            <Row
              label="Discount"
              value={`-$${Number(discount || 0).toFixed(2)}`}
              accent="green"
            />
            <div className="h-px bg-[#E6E6E6] my-2" />
            <Row
              label="Total"
              value={`$${Number(total || 0).toFixed(2)}`}
              bold
            />
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