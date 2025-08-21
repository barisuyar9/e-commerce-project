import { ArrowBigDownDash } from "lucide-react";

export default function LetsTalkSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center pt-5 pb-15 gap-4 font-[Montserrat]">
      
      <ArrowBigDownDash className="text-[#00AEEF] animate-bounce" size={75} />

      <p className="uppercase text-sm font-semibold text-[#252B42]">
        We can’t wait to meet you
      </p>

      
      <h2 className="text-4xl font-bold text-[#252B42]">Let’s Talk</h2>

      
      <button className="mt-2 px-6 py-2 text-white bg-[#00AEEF] rounded hover:bg-[#0099dd] transition cursor-pointer">
        Try it free now
      </button>
    </section>
  );
}