import React from "react";

const categories = [
  {
    title: "MEN",
    img: "/category-pick-1.jpg",
  },
  {
    title: "WOMEN",
    img: "/category-pick-2.jpg",
  },
  {
    title: "ACCESSORIES",
    img: "/category-pick-3.jpg",
  },
  {
    title: "KIDS",
    img: "/category-pick-4.jpg",
  },
];

const CategoryPick = () => {
  return (
    <section
      className="bg-[#FAFAFA] w-full flex justify-center items-center py-20"
    >
      <div
        className="w-[333px] md:w-[1124px] flex flex-col md:gap-12 gap-12 md:items-center items-start relative"
      >
        {/* Title & Description */}
        <div className="flex flex-col items-center gap-2 md:w-[607px] w-full mx-auto">
          <h2 className="font-bold text-[24px] leading-8 tracking-[0.1px] text-[#252B42] font-montserrat">
            EDITOR’S PICK
          </h2>
          <p className="text-[#737373] text-[14px] leading-5 tracking-[0.2px] font-normal text-center md:w-[342px] w-[193px]">
            Problems trying to resolve the conflict between
          </p>
        </div>

        {/* Category Cards */}
        <div
          className="flex flex-col md:flex-row md:gap-[30px] gap-[30px] md:w-[1050px] w-[325px] mx-auto"
        >
          {/* MEN */}
          <div className="relative bg-white md:w-[510px] md:h-[500px] w-[324px] h-[500px] overflow-hidden rounded-md">
            <img
              src={categories[0].img}
              alt={categories[0].title}
              className="object-cover w-full h-full"
            />
            <div className="absolute left-[31px] md:left-[31px] right-[calc(100%-201px)] md:right-[309px] bottom-[26px] w-[170px] h-12 bg-white flex items-center justify-center shadow-md">
              <span className="font-bold text-[16px] leading-6 tracking-[0.1px] text-[#252B42]">
                {categories[0].title}
              </span>
            </div>
          </div>
          {/* WOMEN */}
          <div className="relative bg-white md:w-[240px] md:h-[500px] w-[325px] h-[500px] overflow-hidden rounded-md">
            <img
              src={categories[1].img}
              alt={categories[1].title}
              className="object-cover w-full h-full"
            />
            <div className="absolute left-[14px] md:left-[21px] right-[calc(100%-132px)] md:right-[83px] bottom-[23px] md:bottom-[18px] w-[170px] md:w-auto h-12 bg-white flex items-center justify-center shadow-md px-6 md:px-12">
              <span className="font-bold text-[16px] leading-6 tracking-[0.1px] text-[#252B42]">
                {categories[1].title}
              </span>
            </div>
          </div>
          {/* ACCESSORIES & KIDS */}
          <div className="flex flex-col md:gap-4 gap-4 md:w-[240px] w-[325px] md:h-[500px]">
            {/* ACCESSORIES */}
            <div className="relative bg-white md:w-[240px] w-[325px] md:h-[242px] h-[242px] overflow-hidden rounded-md">
              <img
                src={categories[2].img}
                alt={categories[2].title}
                className="object-cover w-full h-full"
              />
              <div className="absolute left-[14px] md:left-[14px] right-[calc(100%-132px)] md:right-[56px] bottom-[23px] w-[170px] md:w-auto h-12 bg-white flex items-center justify-center shadow-md px-4 md:px-6">
                <span className="font-bold text-[16px] leading-6 tracking-[0.1px] text-[#252B42]">
                  {categories[2].title}
                </span>
              </div>
            </div>
            {/* KIDS */}
            <div className="relative bg-white md:w-[240px] w-[325px] md:h-[242px] h-[242px] overflow-hidden rounded-md">
              <img
                src={categories[3].img}
                alt={categories[3].title}
                className="object-cover w-full h-full"
              />
              <div className="absolute left-[18px] md:left-[18px] right-[calc(100%-138px)] md:right-[102px] bottom-[18px] w-[120px] md:w-auto h-12 bg-white flex items-center justify-center shadow-md px-4 md:px-10">
                <span className="font-bold text-[16px] leading-6 tracking-[0.1px] text-[#252B42]">
                  {categories[3].title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryPick;
