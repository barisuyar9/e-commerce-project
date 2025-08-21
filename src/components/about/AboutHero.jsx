import { useHistory } from "react-router-dom";


export default function AboutHero() {
const history = useHistory();

  return (
    <section className="font-[Montserrat] py-20 px-5 ">
      <div className="w-[90vw] max-w-[1050px] mx-auto flex flex-col md:flex-row items-center justify-between gap-30 md:gap-10">
        <div className=" w-[75vw] flex flex-col justify-center items-center gap-5 max-w-xl text-center md:text-left md:items-start">
          <p className=" font-bold text-[#252B42] ">ABOUT COMPANY</p>
          <h2 className="text-[40px] md:text-[58px] font-bold text-[#252B42] leading-tight">
            ABOUT US
          </h2>
          <p className="text-[#737373] text-xl">
            We know how large objects will act,{" "}
            <br className="hidden md:flex" />
            but things on a small scale just do not act that way.
          </p>

          <button
            onClick={() => history.push("/contact")}
            className="w-[193px] h-[52px] mt-2 px-6 py-2 text-white bg-[#00AEEF] rounded hover:bg-[#0099dd] transition cursor-pointer"
          >
            Get Quote Now
          </button>
        </div>

        <div className="flex justify-center">
          <img src="/about-hero.png" alt="Contact" className="w-screen" />
        </div>
      </div>
    </section>
  );
}