import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchOrders } from "../store/thunks/orderHistoryThunks";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { items, fetchState, error } = useSelector((s) => s.orderHistory);

  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    if (fetchState === "NOT_FETCHED") {
      dispatch(fetchOrders());
    }
  }, [dispatch, fetchState]);

  const loading = fetchState === "FETCHING";

  return (
    <main className="w-[90vw] max-w-[1100px] mx-auto py-10 font-[Montserrat] text-[#252B42]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <button
          onClick={() => dispatch(fetchOrders())}
          className="text-sm bg-[#23A6F0] text-white font-bold px-4 py-2 rounded hover:bg-[#2497da] cursor-pointer"
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      <div className="bg-white border border-[#E6E6E6] rounded-xl overflow-hidden">
        {/* header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 text-xs uppercase tracking-wide text-[#737373] border-b">
          <div className="col-span-4">Order</div>
          <div className="col-span-3">Date</div>
          <div className="col-span-3 text-right">Total</div>
          <div className="col-span-2 text-right">Items</div>
        </div>

        {/* body */}
        {loading ? (
          <div className="py-12 flex justify-center">
            <CircularProgress />
          </div>
        ) : error ? (
          <div className="p-6 text-red-500">{error}</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-[#737373]">
            You don’t have any orders yet.
          </div>
        ) : (
          <ul className="divide-y divide-[#E6E6E6]">
            {items.map((o) => {
              const id =
                o.id ??
                o.order_id ??
                `#${Math.random().toString(36).slice(2, 8)}`;
              const dateStr = o.order_date
                ? new Date(o.order_date).toLocaleString()
                : "-";
              const total = Number(o.price ?? o.total ?? 0);
              const count = Array.isArray(o.products)
                ? o.products.reduce((s, p) => s + Number(p.count || 0), 0)
                : 0;
              const isOpen = openId === id;

              return (
                <li key={id}>
                  {/* row */}
                  <button
                    className="w-full grid grid-cols-12 gap-4 px-4 py-4 items-center text-left hover:bg-gray-50 cursor-pointer"
                    onClick={() => setOpenId(isOpen ? null : id)}
                    aria-expanded={isOpen}
                  >
                    <div className="col-span-12 md:col-span-4 font-semibold">
                      Order #{id}
                    </div>
                    <div className="col-span-6 md:col-span-3 text-[#737373]">
                      {dateStr}
                    </div>
                    <div className="col-span-3 md:col-span-3 text-right font-bold">
                      ${total.toFixed(2)}
                    </div>
                    <div className="col-span-3 md:col-span-2 text-right text-[#737373]">
                      {count} item{count !== 1 ? "s" : ""}
                    </div>
                  </button>

                  {/* collapsible */}
                  {isOpen && (
                    <div className="px-4 pb-5">
                      <div className="rounded-xl border border-[#E6E6E6] p-4">
                        <h3 className="font-bold mb-3">Order Details</h3>
                        <div className="text-sm text-[#737373] mb-3">
                          Address ID: {o.address_id ?? "-"}
                        </div>

                        <div className="overflow-x-auto">
                          <table className="min-w-full text-sm">
                            <thead>
                              <tr className="text-left text-[#737373] border-b">
                                <th className="py-2 pr-4">Product ID</th>
                                <th className="py-2 pr-4">Detail</th>
                                <th className="py-2 pr-4 text-right">Count</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(o.products || []).map((p, idx) => (
                                <tr
                                  key={idx}
                                  className="border-b last:border-0"
                                >
                                  <td className="py-2 pr-4">{p.product_id}</td>
                                  <td className="py-2 pr-4">
                                    {p.detail || "-"}
                                  </td>
                                  <td className="py-2 pr-4 text-right">
                                    {p.count}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="mt-4 text-right font-bold">
                          Total: ${total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}