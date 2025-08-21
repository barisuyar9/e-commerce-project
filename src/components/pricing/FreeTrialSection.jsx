import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function FreeTrialSection() {
  return (
    <section className="max-w-[550px] mx-auto my-30 text-center flex flex-col justify-center items-center gap-5">
      <h2 className="font-bold text-[40px] text-[#252B42]">
        Start your <br className="md:hidden" /> 14 days free trial
      </h2>
      <p className="text-sm text-[#737373] w-[75%] md:w-[65%]">
        Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
        RELIT official consequent.
      </p>
      <button className="m-5 w-[186px] h-[52px] bg-[#23A6F0] rounded-md font-bold text-white text-sm cursor-pointer hover:bg-[#1c7ab1]">
        Try for free
      </button>

      <nav className="flex gap-5 text-[#252B42]">
        <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
          <FaXTwitter size={30} />
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={30} />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
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
    </section>
  );
}