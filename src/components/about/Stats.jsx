export default function Stats(){
    return (
      <section className="w-[90vw] font-[Montserrat] py-20 px-5 max-w-[1050px] mx-auto flex flex-col items-center justify-between gap-40">
        <div className="flex flex-col gap-15 justify-center items-center md:flex-row ">
          <div className="text-center md:text-left">
            <p className="text-sm text-[#E74040] pb-5">Problems trying</p>
            <h1 className="w-[75vw] mx-auto text-2xl text-[#252B42] font-bold md:w-[30vw]">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent.
            </h1>
          </div>
          <p className="text-[#737373] text-sm w-[75vw] md:w-[40vw]">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics
          </p>
        </div>
        <div className="px-5 flex flex-col flex-wrap gap-25 justify-center items-center md:flex-row">
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-[#252B42] font-bold text-6xl">15K</p>
            <p className="text-[#737373] font-bold">Happy Customers</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-[#252B42] font-bold text-6xl">150K</p>
            <p className="text-[#737373] font-bold">Monthly Visitors</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-[#252B42] font-bold text-6xl">15</p>
            <p className="text-[#737373] font-bold">Countries Worldwide</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-[#252B42] font-bold text-6xl">100+</p>
            <p className="text-[#737373] font-bold">Top Partners</p>
          </div>
        </div>
        <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-xl shadow-lg">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/digital-marketing.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    );
}