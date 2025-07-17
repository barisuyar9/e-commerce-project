import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
export default function BottomSlider() {
  return (
    <div className="relative w-full h-[709px] overflow-hidden">
      <Swiper
        modules={[Navigation]}
        navigation
        loop={true}
        className="w-full h-full"
        style={{
          "--swiper-navigation-color": "#FFFFFF",
          "--swiper-navigation-size": "32px",
          "--swiper-navigation-sides-offset": "30px",
        }}
      >
        <SwiperSlide>
          {/* Ana container: mobilde dikey, md'de yatay */}
          <div className="w-full h-full bg-[#23856D] text-white font-[Montserrat] flex flex-col md:flex-row items-center justify-between p-10 md:p-20 gap-10">
            {/* Metin Alanı */}
            <div className="flex flex-col text-center md:text-left items-center md:items-start gap-6 md:max-w-[60%]">
              <h5 className="font-bold">SUMMER 2025</h5>
              <h2 className="font-bold text-[40px] md:text-[58px]">
                Vita Classic Product
              </h2>
              <h4 className="text-xl leading-relaxed">
                We know how large objects will act,
                <br className="hidden md:block" />
                but things on a small scale.
              </h4>
              <span className="text-2xl font-bold">$16.48</span>
              <Link to="/maintenance">
                <button className="h-[50px] w-[180px] bg-[#2DC071] font-bold text-base md:text-xl rounded-md">
                  ADD TO CART
                </button>
              </Link>
            </div>
            {/* Görsel Alanı */}
            <div className="w-[300px] md:w-[510px] h-auto">
              <img
                src="/banner.png"
                alt="Banner"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </SwiperSlide>
        {/* Diğer Slider */}
        <SwiperSlide>
          {/* Ana container: mobilde dikey, md'de yatay */}
          <div className="w-full h-full bg-[#23856D] text-white font-[Montserrat] flex flex-col md:flex-row items-center justify-between p-10 md:p-20 gap-10">
            {/* Metin Alanı */}
            <div className="flex flex-col text-center md:text-left items-center md:items-start gap-6 md:max-w-[60%]">
              <h5 className="font-bold">SUMMER 2025</h5>
              <h2 className="font-bold text-[40px] md:text-[58px]">
                Vita Classic Product
              </h2>
              <h4 className="text-xl leading-relaxed">
                We know how large objects will act,
                <br className="hidden md:block" />
                but things on a small scale.
              </h4>
              <span className="text-2xl font-bold">$16.48</span>
              <Link to="/maintenance">
                <button className="h-[50px] w-[180px] bg-[#2DC071] font-bold text-base md:text-xl rounded-md">
                  ADD TO CART
                </button>
              </Link>
            </div>
            {/* Görsel Alanı */}
            <div className="w-[300px] md:w-[510px] h-auto">
              <img
                src="/banner.png"
                alt="Banner"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}