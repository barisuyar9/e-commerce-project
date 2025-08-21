import {
  ChevronDown,
  ChevronUp,
  CircleUserRound,
  Heart,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingCart,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import Gravatar from "react-gravatar";
import { logoutUser } from "../store/actions/userActions";
import CartDropdown from "../components/header/CartDropdown";
import FavoritesDropdown from "../components/header/FavoritesDropdown";

const slugify = (s = "") =>
  s
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const trToAscii = (s = "") =>
  s.replace(
    /[ıİşŞğĞçÇöÖüÜ]/g,
    (ch) =>
      ({
        ı: "i",
        İ: "i",
        ş: "s",
        Ş: "s",
        ğ: "g",
        Ğ: "g",
        ç: "c",
        Ç: "c",
        ö: "o",
        Ö: "o",
        ü: "u",
        Ü: "u",
      }[ch])
  );

const codeMap = {
  tisort: { label: "T-Shirt", slug: "t-shirt" },
  ayakkabi: { label: "Shoes", slug: "shoes" },
  ceket: { label: "Jacket", slug: "jacket" },
  elbise: { label: "Dress", slug: "dress" },
  etek: { label: "Skirt", slug: "skirt" },
  gomlek: { label: "Shirt", slug: "shirt" },
  kazak: { label: "Sweater", slug: "sweater" },
  pantalon: { label: "Pants", slug: "pants" },
};

const genderMap = {
  k: { label: "Women", path: "women" },
  e: { label: "Men", path: "men" },
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((s) => s.user?.user);
  const token =
    useSelector((s) => s.user?.token) || localStorage.getItem("token");
  const isAuthed = Boolean(user || token);
  const emailForAvatar = user?.email || "someone@example.com";
  const emailToShow = user?.email || "";

  const categories = useSelector((s) => s.category?.items || []);
  const catsWomen = categories.filter((c) => c.gender === "k");
  const catsMen = categories.filter((c) => c.gender === "e");

  const keyFromCode = (code = "") => {
    const part = (code.split(":")[1] || "").toString();
    return trToAscii(part)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  };

  const viewOf = (cat) => {
    const key = keyFromCode(cat.code);
    const map = codeMap[key];
    const label = map?.label ?? cat.title;
    const slug = map?.slug ?? slugify(cat.title);
    const g = genderMap[cat.gender] || { label: "Unisex", path: "unisex" };
    return { label, slug, genderPath: g.path };
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push("/");
  };

  const cartCount = useSelector((s) =>
    (s.cart?.items || []).reduce((sum, it) => sum + it.count, 0)
  );
  const favCount = useSelector((s) => (s.favorites?.items || []).length);

  return (
    <header className="z-50 relative">
      <div className=" hidden md:flex flex-row flex-wrap gap-10 items-center justify-between md:bg-[#252B42] px-10 py-5 text-white text-sm font-bold font-[Montserrat] ">
        <div className="flex gap-1 items-center justify-center ">
          <Phone className="h-4" />
          <span>(225) 555-0118</span>
          <Mail className="h-4 ml-5" />
          <span>michelle.rivera@example.com</span>
        </div>
        <div>
          <p>Follow Us and get a chance to win 80% off</p>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <p>Follow Us</p>
          <p>:</p>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-xl" />
          </a>

          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="text-xl" />
          </a>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-xl" />
          </a>

          <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="text-xl" />
          </a>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-5 px-10 py-5 shadow-md">
        <Link
          className="font-[Montserrat] text-2xl font-bold text-[#252B42]"
          to="/"
        >
          Bandage
        </Link>
        <div className="hidden md:flex  justify-between items-center gap-5  font-[Montserrat] text-xsm text-[#737373] ">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`${
              location.pathname === "/" ? "font-normal" : "font-bold"
            } `}
          >
            Home
          </Link>
          <div className="relative flex">
            <Link
              to="/shop"
              className={`${
                location.pathname === "/shop" ? "font-normal" : "font-bold"
              } `}
            >
              Shop
            </Link>

            {isOpen ? (
              <ChevronUp onClick={toggleMenu} className="cursor-pointer" />
            ) : (
              <ChevronDown onClick={toggleMenu} className="cursor-pointer" />
            )}
            {isOpen && (
              <div className="absolute flex top-full mt-2 shadow-md gap-12 p-5 font-bold text-sm bg-white min-w-[28rem]">
                <div className="flex flex-col gap-5 min-w-[10rem]">
                  <Link className="text-[#252B42]">Women</Link>
                  <div className="flex flex-col gap-5">
                    {catsWomen.map((cat) => {
                      const v = viewOf(cat);
                      return (
                        <Link
                          key={cat.id}
                          onClick={toggleMenu}
                          to={`/shop/${v.genderPath}/${v.slug}/${cat.id}`}
                          className="hover:font-normal"
                        >
                          {v.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-5 min-w-[10rem]">
                  <Link className="text-[#252B42]">Men</Link>
                  <div className="flex flex-col gap-5">
                    {catsMen.map((cat) => {
                      const v = viewOf(cat);
                      return (
                        <Link
                          key={cat.id}
                          onClick={toggleMenu}
                          to={`/shop/${v.genderPath}/${v.slug}/${cat.id}`}
                          className="hover:font-normal"
                        >
                          {v.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className={`${
              location.pathname === "/about" ? "font-normal" : "font-bold"
            }`}
          >
            About
          </Link>

          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={`${
              location.pathname === "/contact" ? "font-normal" : "font-bold"
            }`}
          >
            Contact
          </Link>
          <Link
            to="/pricing"
            onClick={() => setIsOpen(false)}
            className={`${
              location.pathname === "/pricing" ? "font-normal" : "font-bold"
            }`}
          >
            Pricing
          </Link>
        </div>
        <div className="flex gap-5 md:gap-7 text-[#252B42] md:text-[#23A6F0]">
          <div className="flex gap-2 items-center">
            {isAuthed ? (
              <>
                <Link
                  //to="/profile"
                  to="/maintenance"
                  className="flex gap-2 content-center items-center "
                  title={emailToShow}
                >
                  {/* Gravatar */}
                  <Gravatar
                    email={emailForAvatar}
                    size={28}
                    default="identicon"
                    className="rounded-full"
                  />

                  <span className="hidden md:flex text-[#23A6F0] font-bold">
                    {emailToShow}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="hidden md:flex text-[#23A6F0] font-bold hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  //to="/profile"
                  to="/maintenance"
                  className="flex gap-1 content-center items-center "
                >
                  <CircleUserRound />
                </Link>

                <Link
                  to="/login"
                  className="hidden md:flex text-[#23A6F0] font-bold"
                >
                  Login
                </Link>
                <span className="hidden md:flex text-[#23A6F0] font-bold">
                  /
                </span>
                <Link
                  to="/register"
                  className="hidden md:flex text-[#23A6F0] font-bold"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* search */}
          <Search />
          <div className="relative">
            <button
              onClick={() => setCartOpen((p) => !p)}
              className="flex gap-1 content-center items-center cursor-pointer"
              aria-label="Open cart"
              title="Cart"
            >
              <ShoppingCart />

              <span className="hidden md:flex">{cartCount}</span>
            </button>

            {cartOpen && <CartDropdown onClose={() => setCartOpen(false)} />}
          </div>
          <Menu onClick={toggleMenu} className="md:hidden" />
          <div className="relative hidden md:flex gap-1 content-center items-center">
            <button
              type="button"
              onClick={() => setFavOpen((p) => !p)}
              className="flex items-center gap-1 cursor-pointer "
              title="Favorites"
            >
              <Heart />
              <span>{favCount}</span>
            </button>
            {favOpen && <FavoritesDropdown onClose={() => setFavOpen(false)} />}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col justify-between items-center gap-10 px-10 py-20 font-[Montserrat] text-3xl text-[#737373] md:hidden">
          <Link
            to="/"
            className={`${
              location.pathname === "/" ? "font-normal" : "font-bold"
            }`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`${
              location.pathname === "/shop" ? "font-normal" : "font-bold"
            }`}
          >
            Product
          </Link>

          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className={`${
              location.pathname === "/about" ? "font-normal" : "font-bold"
            }`}
          >
            About
          </Link>

          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={`${
              location.pathname === "/contact" ? "font-normal" : "font-bold"
            }`}
          >
            Contact
          </Link>
          <Link
            to="/pricing"
            onClick={() => setIsOpen(false)}
            className={`${
              location.pathname === "/pricing" ? "font-normal" : "font-bold"
            }`}
          >
            Pricing
          </Link>

          {isAuthed && (
            <button
              type="button"
              onClick={handleLogout}
              className="text-[#23A6F0] font-bold"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}