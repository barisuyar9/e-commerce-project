import { Phone, MapPin, Mail } from "lucide-react";

export default function SupportSection() {
  return (
    <section className="font-[Montserrat] text-center py-16 px-5">
      <p className=" text-sm text-gray-500 font-semibold">VISIT OUR OFFICE</p>
      <h2 className="text-3xl md:text-4xl font-bold text-[#252B42] my-4 leading-snug">
        We help small businesses <br /> with big ideas
      </h2>

      <div className="md:w-[75vw] mt-12 flex flex-col lg:flex-row justify-center gap-8 max-w-6xl mx-auto">
        <div className="flex-1 flex flex-col justify-center items-center gap-4 p-8 rounded shadow-md min-h-[393px]">
          <Phone className="text-[#00AEEF]" size={36} />
          <div className="text-sm text-[#252B42] font-bold text-center">
            <p>georgia.young@example.com</p>
            <p>georgia.young@ple.com</p>
          </div>
          <p className="font-semibold text-[#252B42]">Get Support</p>
          <button className="mt-2 px-6 py-2 text-[#00AEEF] border border-[#00AEEF] rounded-full hover:bg-[#00AEEF] hover:text-white transition cursor-pointer font-bold">
            Submit Request
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center gap-4 p-8 bg-[#252B42] text-white rounded shadow-md min-h-[393px]">
          <MapPin className="text-[#00AEEF]" size={36} />
          <div className="text-sm text-white text-center">
            <p>georgia.young@example.com</p>
            <p>georgia.young@ple.com</p>
          </div>
          <p className="font-semibold">Get Support</p>
          <button className="mt-2 px-6 py-2 text-[#00AEEF] border border-[#00AEEF] rounded-full hover:bg-[#00AEEF] hover:text-white transition cursor-pointer font-bold">
            Submit Request
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center gap-4 p-8 rounded shadow-md min-h-[393px]">
          <Mail className="text-[#00AEEF]" size={36} />
          <div className="text-sm text-[#252B42] font-bold text-center">
            <p>georgia.young@example.com</p>
            <p>georgia.young@ple.com</p>
          </div>
          <p className="font-semibold text-[#252B42]">Get Support</p>
          <button className="mt-2 px-6 py-2 text-[#00AEEF] border border-[#00AEEF] rounded-full hover:bg-[#00AEEF] hover:text-white transition cursor-pointer font-bold">
            Submit Request
          </button>
        </div>
      </div>
    </section>
  );
}