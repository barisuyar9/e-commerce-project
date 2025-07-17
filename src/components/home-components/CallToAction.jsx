import React from "react";
const CallToAction = () => {
  return (
    <section
      className="w-full bg-white border border-[#fff] rounded-[5px] overflow-hidden relative flex flex-col md:flex-row md:items-center md:justify-end md:h-[682px] md:max-w-[1440px] mx-auto"
    >
      {/* Görsel (Desktop solda, mobil altta) */}
      <div
        className="order-2 md:order-1 w-full md:w-[704px] md:h-full flex justify-center items-end relative md:absolute md:left-0 md:top-0 md:bottom-0 md:right-auto z-0"
      >
        <img
          src="/c2a.png"
          alt="asian-woman-man-with-winter-clothes"
          className="block w-full md:w-[725px] md:h-[774px] md:absolute object-cover select-none pointer-events-none"
          draggable={false}
        />
      </div>
      {/* Metin ve CTA */}
      <div
        className="order-1 md:order-2 flex flex-col justify-center md:items-start items-center px-4 md:px-0 py-14 md:py-0 md:pr-16 md:pl-0 w-full md:w-[573px] z-10"
      >
        {/* Tag */}
        <div className="mb-3">
          <span className="font-montserrat font-bold text-[16px] leading-6 tracking-[0.1px] text-[#BDBDBD] md:text-left text-center">
            SUMMER 2020
          </span>
        </div>
        {/* Başlık */}
        <h2 className="font-montserrat font-bold text-[32px] md:text-[40px] leading-[40px] md:leading-[50px] tracking-[0.2px] text-[#252B42] md:text-left text-center mb-4">
          Part of the <br className="md:hidden" /> Neural Universe
        </h2>
        {/* Açıklama */}
        <p className="font-montserrat font-normal text-[18px] md:text-[20px] leading-[28px] md:leading-[30px] tracking-[0.2px] text-[#737373] md:text-left text-center mb-8 md:mb-10 max-w-[376px]">
          We know how large objects will act, but things on a small scale.
        </p>
        {/* CTA butonları */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-[25px] md:gap-[10px] w-[165px] md:w-[339px] h-[129px] md:h-[52px]">
          <button
            className="font-montserrat font-bold text-[14px] leading-[22px] tracking-[0.2px] text-white rounded-[5px] px-[40px] py-[15px] w-[151px] h-[52px] bg-[#23A6F0] md:bg-[#2DC071] transition hover:bg-[#1E8BD4] md:hover:bg-[#27A15E]"
          >
            BUY NOW
          </button>
          <button
            className="font-montserrat font-bold text-[14px] leading-[22px] tracking-[0.2px] text-[#23A6F0] md:text-[#2DC071] border border-[#23A6F0] md:border-[#2DC071] rounded-[5px] px-[40px] py-[15px] w-[165px] md:w-[171px] h-[52px] transition hover:bg-[#F0FFF7] text-ellipsis whitespace-nowrap overflow-hidden"><span className="block md:hidden">Learn More</span><span className="hidden md:block">READ MORE</span>
          </button>
        </div>
      </div>
    </section>
  );
};
export default CallToAction;