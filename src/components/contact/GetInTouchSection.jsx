import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

export default function GetInTouchSection() {
  return (
    <section className="font-[Montserrat] py-20 px-5 ">
      <div className=" max-w-[1050px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className=" w-[75vw] flex flex-col gap-5 max-w-xl text-center md:text-left">
          <p className=" font-bold text-[#252B42] ">CONTACT US</p>
          <h2 className="text-[40px] md:text-[58px] font-bold text-[#252B42] leading-tight">
            Get in touch <br />
            today!
          </h2>
          <p className="text-[#737373] text-xl">
            We know how large objects will act,{" "}
            <br className="hidden md:flex" />
            but things on a small scale just do not act that way.
          </p>

          <p className="text-[#252B42] font-bold text-2xl">
            Phone : +451 215 215
          </p>
          <p className="text-[#252B42] font-bold text-2xl">
            Fax : +451 215 215
          </p>

          <nav className="flex justify-center gap-7 mt-4 md:justify-start">
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#252B42] hover:text-[#737373]"
            >
              <FaXTwitter size={30} />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#252B42] hover:text-[#737373]"
            >
              <FaFacebook size={30} />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#252B42] hover:text-[#737373]"
            >
              <FaInstagram size={30} />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#252B42] hover:text-[#737373]"
            >
              <FaLinkedin size={30} />
            </a>
          </nav>
        </div>

        <div className="flex justify-center md:justify-end">
          <img
            src="/contact-hero.png"
            alt="Contact"
            className="w-full md:w-[571px]"
          />
        </div>
      </div>
    </section>
  );
}