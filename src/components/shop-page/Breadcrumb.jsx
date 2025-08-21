import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
const Breadcrumb = ({ current = "Shop" }) => {
  return (
    // dış div: sadece bg ve full genişlik
    <div className="w-full bg-[#FAFAFA] h-[202px] md:h-[92px] py-6 md:py-6">
      {/* içerik container: ortalanmış, max-width burada */}
      <div className="w-full max-w-[1049px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-[30px] h-full px-4">
        {/* Title */}
        <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
          <h2 className="font-montserrat font-bold text-[24px] leading-[32px] text-[#252B42] text-center md:text-left tracking-[0.1px]">
            {current}
          </h2>
        </div>
        {/* Breadcrumb */}
        <div className="flex items-center justify-center md:justify-end w-full md:w-auto">
          <nav aria-label="breadcrumb">
            <ol className="flex flex-row items-center gap-[15px] px-0 py-[10px]">
              <li>
                <Link
                  to="/"
                  className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#252B42]"
                >
                  Home
                </Link>
              </li>
              <li>
                <FaChevronRight className="text-[#BDBDBD] md:w-[9px] md:h-[16px]" />
              </li>
              <li>
                <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] md:text-[#BDBDBD]">
                  {current}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Breadcrumb;