import React from "react";
const ShopImageGallery = () => {
  const images = [1, 2, 3, 4, 5].map((num) => ({
    src: `/ShopPage/shop-page-${num}.jpg`,
    title: "CLOTHS",
    count: "5 Items",
  }));
  return (
    <div className="bg-[#FAFAFA] w-full py-6">
      <div className="flex flex-col md:flex-row md:justify-center md:items-start gap-4 md:gap-6 max-w-[414px] md:max-w-none mx-auto">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative w-[332px] h-[300px] md:w-[200px] md:h-[240px] rounded-xl overflow-hidden bg-white shadow-md flex-shrink-0"
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center">
              <div className="font-montserrat font-bold text-base md:text-lg text-white tracking-wide text-center drop-shadow-md mb-1">
                {img.title}
              </div>
              <div className="font-montserrat font-bold text-sm md:text-base text-white tracking-wider text-center">
                {img.count}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ShopImageGallery;