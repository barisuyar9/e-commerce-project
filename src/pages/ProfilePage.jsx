
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import Gravatar from "react-gravatar";
import CircularProgress from "@mui/material/CircularProgress";

import { fetchAddresses } from "../store/thunks/addressThunk";
import { fetchCards } from "../store/thunks/cardThunks";
import { fetchOrders } from "../store/thunks/orderHistoryThunks";
import { logoutUser } from "../store/actions/userActions";

const maskCard = (no = "") => (no || "").replace(/\d(?=\d{4})/g, "*");

export default function ProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();

 const [tab, setTab] = useState("overview"); 
  const user = useSelector((s) => s.user?.user);
  const token =
    useSelector((s) => s.user?.token) || localStorage.getItem("token");
  const addr = useSelector((s) => s.address);
  const cards = useSelector((s) => s.card);
  const orders = useSelector((s) => s.orderHistory);

  const cartCount = useSelector((s) =>
    (s.cart?.items || []).reduce((sum, it) => sum + it.count, 0)
  );
  const favCount = useSelector((s) => (s.favorites?.items || []).length);

  const isAuthed = Boolean(user || token);
  const email = user?.email || "someone@example.com";
  const name = user?.name || email.split("@")[0];

  useEffect(() => {
    if (addr?.fetchState === "NOT_FETCHED") dispatch(fetchAddresses());
    if (cards?.fetchState === "NOT_FETCHED") dispatch(fetchCards());
    if (orders?.fetchState === "NOT_FETCHED") dispatch(fetchOrders());
  }, [dispatch, addr?.fetchState, cards?.fetchState, orders?.fetchState]);

  if (!isAuthed) return <Redirect to="/login" />;

 

  const loading =
    addr?.fetchState === "FETCHING" ||
    cards?.fetchState === "FETCHING" ||
    orders?.fetchState === "FETCHING";

  const handleLogout = () => {
    dispatch(logoutUser());
    history.replace("/");
  };

  return (
    <main className="w-[90vw] max-w-[1100px] mx-auto py-10 font-[Montserrat] text-[#252B42]">
      {/* Header */}
      <section className="bg-white border border-[#E6E6E6] rounded-xl p-5 flex items-center flex-col md:flex-row text-center md:text-left gap-4">
        <Gravatar
          email={email}
          size={56}
          default="identicon"
          className="rounded-full"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-[#737373] text-sm">{email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="border border-[#E6E6E6] px-4 py-2 rounded hover:bg-gray-50 cursor-pointer"
        >
          Logout
        </button>
      </section>

      {/* Tabs */}
      <nav className="mt-6 flex flex-wrap gap-2">
        {[
          ["overview", "Overview"],
          ["addresses", "Addresses"],
          ["payments", "Payment Methods"],
          ["orders", "Orders"],
          ["security", "Security"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded border ${
              tab === key
                ? "bg-[#23A6F0] text-white border-[#23A6F0]"
                : "border-[#E6E6E6]"
            } cursor-pointer`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <section className="mt-6">
        {loading ? (
          <div className="py-16 flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            {tab === "overview" && (
              <Overview
                cartCount={cartCount}
                favCount={favCount}
                orders={orders}
              />
            )}

            {tab === "addresses" && (
              <Addresses
                items={addr?.items || []}
                onManageNew={() => history.push("/checkout/address/new")}
                onManageList={() => history.push("/checkout")}
              />
            )}

            {tab === "payments" && (
              <Payments
                items={cards?.items || []}
                onManage={() => history.push("/checkout/payment")}
              />
            )}

            {tab === "orders" && (
              <OrdersPreview
                items={orders?.items || []}
                onAll={() => history.push("/orders")}
              />
            )}

            {tab === "security" && <Security email={email} />}
          </>
        )}
      </section>
    </main>
  );
}

/* ------------------ Subcomponents ------------------ */

function Overview({ cartCount, favCount, orders }) {
  const lastOrder = (orders?.items || [])[0];
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <CardStat label="Cart Items" value={cartCount} />
      <CardStat label="Favorites" value={favCount} />
      <CardStat
        label="Orders"
        value={(orders?.items || []).length}
        extra={
          lastOrder ? `Last: #${lastOrder.id || lastOrder.order_id}` : undefined
        }
      />
    </div>
  );
}

function CardStat({ label, value, extra }) {
  return (
    <div className="bg-white border border-[#E6E6E6] rounded-xl p-5">
      <div className="text-[#737373] text-sm">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
      {extra && <div className="text-xs text-[#737373] mt-1">{extra}</div>}
    </div>
  );
}

function Addresses({ items, onManageNew, onManage }) {
  return (
    <div className="bg-white border border-[#E6E6E6] rounded-xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Saved Addresses</h2>
        <div className="flex gap-2">
          <button
            onClick={onManage}
            className="border border-[#E6E6E6] px-3 py-2 rounded hover:bg-gray-50 cursor-pointer"
          >
            Manage
          </button>
          <button
            onClick={onManageNew}
            className="bg-[#23A6F0] text-white px-3 py-2 rounded hover:bg-[#2497da] cursor-pointer"
          >
            + Add New
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-[#737373]">No address saved yet.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 gap-3">
          {items.map((a) => (
            <li key={a.id} className="border border-[#E6E6E6] rounded-xl p-4">
              <div className="font-semibold">{a.title}</div>
              <div className="text-sm text-[#737373]">
                {a.name} {a.surname} • {a.phone}
              </div>
              <div className="text-sm text-[#737373]">
                {a.neighborhood}, {a.district}/{a.city}
              </div>
              <div className="text-sm text-[#737373]">{a.address}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Payments({ items, onManage }) {
  return (
    <div className="bg-white border border-[#E6E6E6] rounded-xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Saved Cards</h2>
        <button
          onClick={onManage}
          className="bg-[#23A6F0] text-white px-3 py-2 rounded hover:bg-[#2497da] cursor-pointer"
        >
          Manage
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-[#737373]">No saved card.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 gap-3">
          {items.map((c) => (
            <li key={c.id} className="border border-[#E6E6E6] rounded-xl p-4">
              <div className="font-semibold">{maskCard(c.card_no)}</div>
              <div className="text-sm text-[#737373]">
                {String(c.expire_month).padStart(2, "0")}/{c.expire_year} •{" "}
                {c.name_on_card}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function OrdersPreview({ items, onAll }) {
  return (
    <div className="bg-white border border-[#E6E6E6] rounded-xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Recent Orders</h2>
        <button
          onClick={onAll}
          className="border border-[#E6E6E6] px-3 py-2 rounded hover:bg-gray-50 cursor-pointer"
        >
          View all
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-[#737373]">You don’t have any orders yet.</p>
      ) : (
        <ul className="divide-y divide-[#E6E6E6]">
          {items.slice(0, 5).map((o) => (
            <li
              key={o.id || o.order_id}
              className="py-3 flex items-center justify-between"
            >
              <div>
                <div className="font-semibold">Order #{o.id || o.order_id}</div>
                <div className="text-xs text-[#737373]">
                  {o.order_date ? new Date(o.order_date).toLocaleString() : "-"}
                </div>
              </div>
              <div className="font-bold">
                ${Number(o.price || o.total || 0).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Security({ email }) {
  return (
    <div className="bg-white border border-[#E6E6E6] rounded-xl p-5 space-y-3">
      <h2 className="text-xl font-bold">Security</h2>
      <p className="text-[#737373] text-sm">
        Basic account settings. (This is a placeholder; update endpoints aren’t
        part of the task.)
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-[#737373]">Email</label>
          <input
            disabled
            className="mt-1 w-full border border-[#E6E6E6] rounded px-3 py-2 bg-gray-50"
            value={email}
            readOnly
          />
        </div>
        <div>
          <label className="text-sm text-[#737373]">New Password</label>
          <input
            type="password"
            className="mt-1 w-full border border-[#E6E6E6] rounded px-3 py-2"
            placeholder="••••••••"
          />
        </div>
      </div>
      <button
        disabled
        className="bg-[#23A6F0] text-white px-4 py-2 rounded cursor-not-allowed"
      >
        Save (disabled)
      </button>
    </div>
  );
}