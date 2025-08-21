import { useHistory } from "react-router-dom";
import Brands from "../Brands";

export default function Clients() {
  const history = useHistory();

  return (
    <section className="bg-[#FAFAFA] font-[Montserrat] ">
      <div className="  w-[90vw] py-20 md:py-35 px-5 max-w-[1050px] mx-auto flex flex-col items-center justify-between gap-20">
        <div className=" w-[65vw] text-center mx-auto">
          <h1 className=" text-[#252B42] text-[40px] font-bold ">
            Big Companies Are Here
          </h1>
          <p className="text-sm text-[#737373]  mx-auto pt-5">
            Problems trying to resolve the conflict between{" "}
            <br className="hidden md:flex" /> the two major realms of Classical
            physics: Newtonian mechanics
          </p>
        </div>
        <Brands />
      </div>
      <div className=" h-[520px] md:h-[640px] flex flex-col items-center md:flex-row ">
        <div className="h-full w-screen flex flex-col justify-center items-center gap-10 bg-[#2A7CC7] text-white font-bold text-center md:text-left ">
          <div className="w-[75vw] md:w-[32vw] flex flex-col gap-5 md:gap-10">
            <p>WORK WITH US</p>
            <h2 className="text-[40px]">Now Let's Grow Yours</h2>
            <p className="text-sm font-normal w-[60vw] mx-auto md:w-full tracking-wide">
              The gradual accumulation of information about atomic and
              small-scale behavior during the first quarter of the 20th
            </p>
            <button onClick={()=>history.push("/contact")} className="text-sm mx-auto border border-white rounded w-[130px] h-[52px] hover:bg-white hover:text-[#2A7CC7] cursor-pointer md:mx-0">
              Contact Us
            </button>
          </div>
        </div>
        <div className="hidden md:flex h-[640px] w-[60vw] ">
          <img src="/client-hero.jpg" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}