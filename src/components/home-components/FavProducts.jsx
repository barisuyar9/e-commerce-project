import React from "react";
import productFavList from "../../data/ProductFavList";
const FavProducts = () => {
  return (
    <section className="w-full bg-white flex flex-col items-center py-20 gap-12 md:gap-20">
      {/* Başlık Alanı */}
      <div className="flex flex-col items-center gap-2 md:gap-2 max-w-[328px] md:max-w-[691px]">
        <h4 className="font-montserrat font-normal text-[20px] leading-[30px] text-center tracking-[0.2px] text-[#737373]">
          Featured Products
        </h4>
        <h3 className="font-montserrat font-bold text-[24px] leading-[32px] text-center tracking-[0.1px] text-[#252B42] md:text-[24px] md:leading-[32px] md:w-[309px]">
          BESTSELLER PRODUCTS
        </h3>
        <p className="font-montserrat font-normal text-[14px] leading-[20px] text-center tracking-[0.2px] text-[#737373] md:w-[347px]">
          Problems trying to resolve the conflict between
        </p>
      </div>
      {/* Ürün Kartları */}
      <div
        className="flex flex-col items-center gap-8 md:gap-[30px] w-full md:grid md:grid-cols-4 md:justify-center md:max-w-[1124px]"
      >
        {productFavList.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center bg-white rounded-lg shadow-sm w-[328px] md:w-[239px] h-[615px] overflow-hidden"
          >
            {/* Ürün görseli */}
            <div className="relative w-full h-[427px] flex items-center justify-center bg-white">
              <img
                src={`/${product.imgUrl}`}
                alt={product.title}
                className="object-cover w-full h-full rounded-t-lg"
                loading="lazy"
              />
            </div>
            {/* Ürün Bilgileri */}
            <div className="flex flex-col items-center px-6 pt-6 pb-9 gap-2 w-full">
              <h5 className="font-montserrat font-bold text-[16px] leading-[24px] text-center tracking-[0.1px] text-[#252B42]">
                {product.title}
              </h5>
              <span className="font-montserrat font-bold text-[14px] leading-[24px] text-center tracking-[0.2px] text-[#737373]">
                {product.subtitle}
              </span>
              {/* Fiyatlar */}
              <div className="flex flex-row items-center gap-2 py-1 px-1">
                <span className="font-montserrat font-bold text-[16px] leading-[24px] text-center tracking-[0.1px] text-[#BDBDBD] line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="font-montserrat font-bold text-[16px] leading-[24px] text-center tracking-[0.1px] text-[#23856D]">
                  ${product.discountPrice.toFixed(2)}
                </span>
              </div>
              {/* Renk Seçenekleri */}
              <div className="flex flex-row items-center gap-[6px] mt-2">
                {product.colorOptions.map((color, cidx) => (
                  <span
                    key={cidx}
                    className="w-4 h-4 rounded-full border border-white shadow"
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default FavProducts;