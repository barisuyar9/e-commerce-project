import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
const footerLinks = [
  {
    title: "Company Info",
    links: ["About Us", "Carrier", "We are hiring", "Blog"],
  },
  {
    title: "Legal",
    links: ["About Us", "Carrier", "We are hiring", "Blog"],
  },
  {
    title: "Features",
    links: ["Business Marketing", "User Analytic", "Live Chat", "Unlimited Support"],
  },
  {
    title: "Resources",
    links: ["IOS & Android", "Watch a Demo", "Customers", "API"],
  },
];
export default function Footer() {
  return (
    <footer className="bg-white w-full mt-10">
      {/* Üst Logo ve Sosyal Medya */}
      <div className="w-full bg-[#FAFAFA]">
        <div className="max-w-[1050px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-10">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-2xl text-[#252B42] font-montserrat">Bandage</h3>
          </div>
          <div className="flex gap-5 mt-6 md:mt-0">
            <a href="#" aria-label="Facebook" className="w-6 h-6 rounded-full bg-[#23A6F0] flex items-center justify-center text-white"><FaFacebookF size={20} /></a>
            <a href="#" aria-label="Instagram" className="w-6 h-6 rounded-full bg-[#23A6F0] flex items-center justify-center text-white"><FaInstagram size={20} /></a>
            <a href="#" aria-label="Twitter" className="w-6 h-6 rounded-full bg-[#23A6F0] flex items-center justify-center text-white"><FaTwitter size={20} /></a>
          </div>
        </div>
      </div>
      {/* Orta Bölüm */}
      <hr className="border-t border-[#E6E6E6] max-w-[1057px] mx-auto" />
      <div className="w-full bg-white">
        <div className="max-w-[1050px] mx-auto flex flex-col md:flex-row gap-10 px-6 py-12">
          {/* Linkler */}
          <div className="flex flex-col md:flex-row gap-10 flex-1">
            {footerLinks.map((col) => (
              <div key={col.title} className="min-w-[148px] mb-8 md:mb-0">
                <h5 className="font-bold text-base md:text-lg text-[#252B42] mb-5 font-montserrat">{col.title}</h5>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="font-bold text-sm md:text-base text-[#737373] font-montserrat hover:text-[#23A6F0]">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Abonelik Formu */}
          <div className="flex flex-col gap-5 max-w-[321px] w-full">
            <h5 className="font-bold text-base md:text-lg text-[#252B42] font-montserrat">Get In Touch</h5>
            <form className="relative w-full">
              <input
                type="email"
                placeholder="Your Email"
                className="h-[58px] pl-5 pr-[120px] bg-[#F9F9F9] border border-[#E6E6E6] rounded-[5px] font-montserrat text-[#737373] text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-[58px] w-[117px] bg-[#23A6F0] text-white font-montserrat font-medium text-sm rounded-r-[5px] border border-[#E6E6E6] hover:bg-[#1D8ED6] transition-colors"
              >
                Subscribe
              </button>
            </form>
            <span className="text-xs text-[#737373] font-montserrat">Lore imp sum dolor Amit</span>
          </div>
        </div>
      </div>
      {/* Alt Copyright Satırı */}
      <div className="w-full bg-[#FAFAFA]">
        <div className="max-w-[1050px] mx-auto px-6 py-6 flex items-center justify-center md:justify-start">
          <h6 className="font-bold text-sm md:text-base text-[#737373] text-center md:text-left font-montserrat">
            <span className="block md:inline">Made With Love By</span>
            <span className="block md:inline md:ml-2">Finland All Right Reserved</span>
          </h6>
        </div>
      </div>
    </footer>
  );
}