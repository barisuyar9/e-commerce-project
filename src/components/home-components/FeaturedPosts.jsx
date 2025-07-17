import React from "react";
const posts = [
  {
    img: "/FeaturedPosts/post-1.jpg",
    imgMobile: "/FeaturedPosts/post-mobile-1.jpg",
    tags: ["Google", "Trending", "New"],
    title: "Loudest à la Madison #1 (L'intégral)",
    desc: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: 10,
  },
  {
    img: "/FeaturedPosts/post-2.jpg",
    imgMobile: "/FeaturedPosts/post-mobile-2.jpg",
    tags: ["Google", "Trending", "New"],
    title: "Loudest à la Madison #1 (L'intégral)",
    desc: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: 10,
  },
  {
    img: "/FeaturedPosts/post-3.jpg",
    imgMobile: "/FeaturedPosts/post-mobile-3.jpg",
    tags: ["Google", "Trending", "New"],
    title: "Loudest à la Madison #1 (L'intégral)",
    desc: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: 10,
  },
];
export default function FeaturedPosts() {
  return (
    <section className="w-full bg-white flex justify-center">
      <div
        className="flex flex-col items-center py-20 w-[414px] md:w-full md:max-w-[1050px] md:gap-0 md:py-[112px] relative mx-auto"
      >
        {/* Başlık ve açıklama */}
        <div className="flex flex-col items-center gap-2 w-[261px] md:gap-2 md:mb-20 md:w-[692px] mb-10">
          <h6 className="text-[#23A6F0] font-bold text-[14px] leading-6 tracking-[0.2px] text-center mb-2">
            Practice Advice
          </h6>
          {/* Mobil başlık ve açıklama */}
          <h2 className="block md:hidden text-[#252B42] font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center mb-2 w-[239px]">
            Featured Products
          </h2>
          <p className="block md:hidden text-[#737373] font-normal text-[14px] leading-5 tracking-[0.2px] text-center w-[261px]">
            Problems trying to resolve the conflict between the two major
          </p>
          {/* Desktop başlık ve açıklama */}
          <h2 className="hidden md:block text-[#252B42] font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center mb-2 md:w-[309px]">
            Featured Posts
          </h2>
          <p className="hidden md:block text-[#737373] font-normal text-[14px] leading-5 tracking-[0.2px] text-center md:w-[469px]">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>
        {/* Kartlar */}
        <div
          className="flex flex-col items-center gap-[30px] w-[329px] md:flex-row md:justify-center md:items-start md:gap-[30px] md:w-[1045px]"
        >
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start w-[330px] h-[606px] bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.1)] rounded-[5px] overflow-hidden md:items-center md:w-full md:max-w-[348px]"
            >
              {/* Görsel ve NEW etiketi */}
              <div className="relative w-[330px] h-[300px]">
                <picture>
                  <source srcSet={post.imgMobile} media="(max-width: 767px)" />
                  <img
                    src={post.img}
                    alt={post.title}
                    className="absolute w-full h-full object-cover"
                  />
                </picture>
                <div className="flex flex-row items-center px-2.5 absolute w-14 h-6 left-5 top-5 bg-[#E74040] shadow-[0px_2px_4px_rgba(0,0,0,0.1)] rounded-[3px]">
                  <span className="text-white font-bold text-[14px] leading-6 tracking-[0.2px] text-center">NEW</span>
                </div>
              </div>
              {/* Kart içeriği */}
              <div className="flex flex-col items-start px-[25px] pt-[25px] pb-[35px] gap-2.5 w-[330px] h-[306px]">
                {/* Tags */}
                <div className="flex flex-row items-center gap-[15px] mb-2 w-[160px]">
                  <span className="text-[#8EC2F2] text-[12px] leading-4 tracking-[0.2px] w-[45px]">Google</span>
                  <span className="text-[#737373] text-[12px] leading-4 tracking-[0.2px] w-[56px]">Trending</span>
                  <span className="text-[#737373] text-[12px] leading-4 tracking-[0.2px] w-[29px]">New</span>
                </div>
                {/* Başlık */}
                <h4 className="text-[#252B42] text-[20px] leading-[30px] tracking-[0.2px] font-normal mb-2 w-[247px]">
                  {post.title}
                </h4>
                {/* Açıklama */}
                <p className="text-[#737373] text-[14px] leading-5 tracking-[0.2px] mb-2 w-[280px]">
                  {post.desc}
                </p>
                {/* Alt bilgi: tarih ve yorum */}
                <div className="flex flex-row justify-between items-center w-[280px] py-4 gap-2">
                  <div className="flex flex-row items-center gap-1 w-[100px]">
                    {/* Takvim ikonu */}
                    <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.667 2.667h-1.334V2a.667.667 0 1 0-1.333 0v.667H6V2a.667.667 0 1 0-1.333 0v.667H3.333A1.333 1.333 0 0 0 2 4v8a1.333 1.333 0 0 0 1.333 1.333h9.334A1.333 1.333 0 0 0 14 12V4a1.333 1.333 0 0 0-1.333-1.333ZM13.333 12a.667.667 0 0 1-.666.667H3.333A.667.667 0 0 1 2.667 12V6h10.666v6ZM3.333 4h1.334v.667a.667.667 0 1 0 1.333 0V4h4v.667a.667.667 0 1 0 1.333 0V4h1.334c.367 0 .666.3.666.667V5.333H2.667V4.667c0-.367.299-.667.666-.667Z" fill="#23A6F0"/></svg>
                    <span className="text-[#737373] text-[12px] leading-4 tracking-[0.2px]">{post.date}</span>
                  </div>
                  <div className="flex flex-row items-center gap-1 w-[105px]">
                    {/* Grafik ikonu */}
                    <svg width="16" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.667 13.667h-12a.667.667 0 1 1 0-1.334h12a.667.667 0 1 1 0 1.334Zm-10.667-2a.667.667 0 0 1-.667-.667v-4a.667.667 0 1 1 1.334 0v4a.667.667 0 0 1-.667.667Zm4 0a.667.667 0 0 1-.667-.667v-7.333a.667.667 0 1 1 1.334 0v7.333a.667.667 0 0 1-.667.667Zm4 0a.667.667 0 0 1-.667-.667v-2.667a.667.667 0 1 1 1.334 0v2.667a.667.667 0 0 1-.667.667Z" fill="#23856D"/></svg>
                    <span className="text-[#737373] text-[12px] leading-4 tracking-[0.2px]">{post.comments} comments</span>
                  </div>
                </div>
                {/* Learn More */}
                <a href="#" className="flex flex-row items-center gap-2 text-[#737373] font-bold text-[14px] leading-6 tracking-[0.2px] w-[101px]">
                  Learn More
                  <svg width="9" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 1.5l6 6-6 6" stroke="#23A6F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}