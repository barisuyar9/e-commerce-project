import { ChevronRight } from "lucide-react";

export default function FAQ() {
  const qas = [
    {
      question: "Work better together",
      answer:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.",
    },
    {
      question: "OpenType features and Variable fonts",
      answer:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.",
    },
    {
      question: "Start working faster today",
      answer:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.",
    },
    {
      question: "Work at the speed of thought.",
      answer:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.",
    },
    {
      question: "The Fastest way to navigate",
      answer:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.",
    },
    {
      question: "the quick fox jumps over the lazy dog",
      answer:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.",
    },
  ];

  return (
    <section className="my-30 flex flex-col gap-10 w-[90vw] mx-auto max-w-[1056px]">
      <div className=" w-[65vw] text-center mx-auto md:w-full">
        <h1 className=" text-[#252B42] text-[40px] font-bold ">Pricing FAQs</h1>
        <p className="text-sm text-[#737373]  mx-auto pt-5">
          We focus on ergonomics and meeting you where you work. It's only a
          keystroke away.
        </p>
      </div>
      <div></div>

      <div className="flex flex-col md:flex-row flex-wrap">
        {qas.map((qa, index) => (
          <div
            key={index}
            className="w-[75vw] max-w-[490px] mx-auto flex flex-row justify-center items-start text-justify my-5 gap-2"
          >
            <ChevronRight className="hidden md:flex w-6 h-6 text-[#23A6F0]" />
            <div className="flex flex-col gap-5 max-w-[408px]">
              <p className="text-[#252B42] font-bold">{qa.question}</p>
              <p className="text-[#737373]">{qa.answer}</p>
            </div>
          </div>
        ))}
        <p className="text-[20px] text-[#737373] text-center mt-20 mx-auto">
          Haven’t got your answer?
          <br className="md:hidden" /> Contact our support
        </p>
      </div>
    </section>
  );
}