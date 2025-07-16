import { useState } from "react";
import {
  User,
  Search,
  ShoppingCart,
  Menu,
  ChevronDown, // Dropdown menü için eklendi
} from "lucide-react";
import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false); // Shop dropdown durumu

  return (
    <>
      {/* Üst Bar: Sadece desktop, kırmızı çerçeveli */}
      <div className="hidden md:flex w-full items-center justify-between px-8 py-2 bg-[#232340] text-white text-xs font-medium">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1"><MdPhone className="inline-block w-4 h-4 mr-1" /> (225) 555-0118</span>
          <span className="flex items-center gap-1"><MdEmail className="inline-block w-4 h-4 mr-1" /> michelle.rivera@example.com</span>
        </div>
        <span className="">Follow us and get a chance to win 80% off</span>
        <div className="flex items-center gap-2">
          <span className="mr-2">Follow Us :</span>
          <a href="#" className="hover:text-blue-400"><FaInstagram className="w-4 h-4" /></a>
          <a href="#" className="hover:text-red-500"><FaYoutube className="w-4 h-4" /></a>
          <a href="#" className="hover:text-blue-600"><FaFacebook className="w-4 h-4" /></a>
          <a href="#" className="hover:text-blue-400"><FaTwitter className="w-4 h-4" /></a>
        </div>
      </div>

      <header className="w-full flex flex-col md:flex-row justify-between items-center px-4 py-3 shadow-md relative z-10 bg-white">
        {/* Üst Kısım: Logo, Ana Menü, İkonlar */}
        <div className="w-full flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-[#2D2D2D]">Bandage</div>

        {/* Menü (Masaüstü görünümde açık) */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 text-sm hover:text-blue-600 font-bold">Home</Link>
          
          {/* Shop Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
              className="flex items-center text-gray-700 text-sm hover:text-blue-600 font-bold focus:outline-none"
            >
              Shop <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            {isShopDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max bg-white shadow-lg rounded-md py-2 px-4 md:flex hidden">
                <div className="flex flex-col items-start mr-8">
                  <h3 className="font-bold text-gray-800 mb-2">Kadın</h3>
                  <Link to="/category/women/bags" className="text-gray-700 text-sm hover:text-blue-600 py-1" onClick={() => setIsShopDropdownOpen(false)}>Bags</Link>
                  <Link to="/category/women/belts" className="text-gray-700 text-sm hover:text-blue-600 py-1" onClick={() => setIsShopDropdownOpen(false)}>Belts</Link>
                  <Link to="/category/women/cosmetics" className="text-gray-700 text-sm hover:text-blue-600 py-1" onClick={() => setIsShopDropdownOpen(false)}>Cosmetics</Link>
                  <Link to="/category/women/dresses" className="text-gray-700 text-sm hover:text-blue-600 py-1" onClick={() => setIsShopDropdownOpen(false)}>Dresses</Link>
                  <Link to="/category/women/hats" className="text-gray-700 text-sm hover:text-blue-600 py-1" onClick={() => setIsShopDropdownOpen(false)}>Hats</Link>
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="font-bold text-gray-800 mb-2">Erkek</h3>
                  <Link to="/category/men/bags" className="text-gray-700 text-sm hover:text-blue-600 py-1" onClick={() => setIsShopDropdownOpen(false)}>Bags</Link>
                  <Link to="/category/men/belts" className="text-gray-700 text-sm hover:text-blue-600 py-1" onClick={() => setIsShopDropdownOpen(false)}>Belts</Link>
                  <Link to="/category/men/cosmetics" className="text-gray-700 text-sm hover:text-blue-600 py-1" onClick={() => setIsShopDropdownOpen(false)}>Cosmetics</Link>
                  <Link to="/category/men/shirts" className="text-gray-700 text-sm hover:text-blue-600 py-1" onClick={() => setIsShopDropdownOpen(false)}>Shirts</Link>
                  <Link to="/category/men/shoes" className="text-gray-700 text-sm hover:text-blue-600 py-1" onClick={() => setIsShopDropdownOpen(false)}>Shoes</Link>
                </div>
              </div>
            )}
          </div>

          <Link to="/about" className="text-gray-700 text-sm hover:text-blue-600 font-bold">About</Link>
          <Link to="/blog" className="text-gray-700 text-sm hover:text-blue-600 font-bold">Blog</Link>
          <Link to="/contact" className="text-gray-700 text-sm hover:text-blue-600 font-bold">Contact</Link>
          <Link to="/pages" className="text-gray-700 text-sm hover:text-blue-600 font-bold">Pages</Link>
        </nav>

        {/* Iconlar + Hamburger */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/login" className="flex items-center text-blue-600 text-sm hover:text-blue-800 font-bold hidden md:flex">
            <User className="w-5 h-5 mr-1" /> Login / Register
          </Link>
          <Search className="w-5 h-5 text-gray-700" />
          <ShoppingCart className="w-5 h-5 text-gray-700" />
          {/* Sadece mobilde göster */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobil Menü (Açılır kapanır) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md py-4 flex flex-col items-center gap-4">
          <Link to="/" className="text-gray-800 text-lg" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <div className="relative w-full text-center">
            <button
              onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
              className="flex items-center justify-center w-full text-gray-800 text-lg focus:outline-none"
            >
              Shop <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            {isShopDropdownOpen && (
              <div className="mt-2 w-full bg-gray-50 shadow-inner py-2 flex flex-col items-center">
                <h4 className="font-bold text-gray-800 mt-2 mb-1">Kadın</h4>
                <Link to="/category/women/bags" className="text-gray-700 text-md hover:text-blue-600 py-1" onClick={() => { setIsMenuOpen(false); setIsShopDropdownOpen(false); }}>Bags</Link>
                <Link to="/category/women/belts" className="text-gray-700 text-md hover:text-blue-600 py-1" onClick={() => { setIsMenuOpen(false); setIsShopDropdownOpen(false); }}>Belts</Link>
                <Link to="/category/women/cosmetics" className="text-gray-700 text-md hover:text-blue-600 py-1" onClick={() => { setIsMenuOpen(false); setIsShopDropdownOpen(false); }}>Cosmetics</Link>
                <Link to="/category/women/dresses" className="text-gray-700 text-md hover:text-blue-600 py-1" onClick={() => { setIsMenuOpen(false); setIsShopDropdownOpen(false); }}>Dresses</Link>
                <Link to="/category/women/hats" className="text-gray-700 text-md hover:text-blue-600 py-1" onClick={() => { setIsMenuOpen(false); setIsShopDropdownOpen(false); }}>Hats</Link>

                <h4 className="font-bold text-gray-800 mt-4 mb-1">Erkek</h4>
                <Link to="/category/men/bags" className="text-gray-700 text-md hover:text-blue-600 py-1" onClick={() => { setIsMenuOpen(false); setIsShopDropdownOpen(false); }}>Bags</Link>
                <Link to="/category/men/belts" className="text-gray-700 text-md hover:text-blue-600 py-1" onClick={() => { setIsMenuOpen(false); setIsShopDropdownOpen(false); }}>Belts</Link>
                <Link to="/category/men/cosmetics" className="text-gray-700 text-md hover:text-blue-600 py-1" onClick={() => { setIsMenuOpen(false); setIsShopDropdownOpen(false); }}>Cosmetics</Link>
                <Link to="/category/men/shirts" className="text-gray-700 text-md hover:text-blue-600 py-1" onClick={() => { setIsMenuOpen(false); setIsShopDropdownOpen(false); }}>Shirts</Link>
                <Link to="/category/men/shoes" className="text-gray-700 text-md hover:text-blue-600 py-1" onClick={() => { setIsMenuOpen(false); setIsShopDropdownOpen(false); }}>Shoes</Link>
              </div>
            )}
          </div>
          <Link to="/about" className="text-gray-800 text-lg" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/blog" className="text-gray-800 text-lg" onClick={() => setIsMenuOpen(false)}>Blog</Link>
          <Link to="/contact" className="text-gray-800 text-lg" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <Link to="/pages" className="text-gray-800 text-lg" onClick={() => setIsMenuOpen(false)}>Pages</Link>
          <Link to="/login" className="flex items-center text-blue-600 text-lg mt-2" onClick={() => setIsMenuOpen(false)}>
            <User className="w-6 h-6 mr-2" /> Login / Register
          </Link>
        </div>
      )}
    </header>
    </>
  );
};

export default Header;
