import { ChevronRight } from "lucide-react";
import { useState } from "react";
import ReviewForm from "./ReviewForm";

export default function ProductFooter({ product }) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <section className="flex flex-col w-[90vw] mx-auto my-20 gap-10 font-[Montserrat] text-[#252B42] lg:w-[1056px]">
      <div className="mx-auto flex justify-center gap-10 items-center md:w-[30vw] ">
        <button
          className={`text-sm text-[#737373] cursor-pointer ${
            activeTab === "description"
              ? `font-semibold underline`
              : `font-bold`
          }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`text-sm text-[#737373] cursor-pointer ${
            activeTab === "additionalInformation"
              ? `font-semibold underline`
              : `font-bold`
          }`}
          onClick={() => setActiveTab("additionalInformation")}
        >
          Additional Information
        </button>
        <button
          className={`text-sm text-[#737373] cursor-pointer ${
            activeTab === "review" ? `font-semibold underline` : `font-bold`
          }`}
          onClick={() => setActiveTab("review")}
        >
          Review
        </button>
      </div>
      <hr className="hidden md:flex text-[#ECECEC]" />
      <div className="border border-[#c9c9c9] rounded p-3 shadow-lg">
        {activeTab === "description" && (
          <div className="mx-auto flex flex-col justify-center items-center md:flex-row  md:items-start gap-10">
            <img
              src={product.images[0].url}
              className="w-full h-[292px] object-cover md:h-[392px] md:w-[332px]"
            />
            <div className=" flex flex-col py-6 gap-4 md:py-0 md:w-[332px]">
              <p className="font-bold text-2xl"> the quick fox jumps over </p>
              <p className="text-sm text-[#737373]">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent. RELIT official consequent door ENIM RELIT Mollie.
                Excitation venial consequent sent nostrum met.
              </p>
              <p className="text-sm text-[#737373]">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent. RELIT official consequent door ENIM RELIT Mollie.
                Excitation venial consequent sent nostrum met.
              </p>
              <p className="text-sm text-[#737373]">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent. RELIT official consequent door ENIM RELIT Mollie.
                Excitation venial consequent sent nostrum met.
              </p>
            </div>
            <div className=" flex flex-col gap-6 md:w-[332px] sm:flex-row lg:flex-col">
              <div className="flex flex-col gap-3 pb-2">
                <p className="font-bold text-2xl pb-2">
                  the quick fox jumps over
                </p>
                <div className="flex justify-start items-center gap-3 font-bold text-[#737373] text-sm">
                  <ChevronRight />

                  <p>the quick fox jumps over the lazy dog</p>
                </div>
                <div className="flex justify-start items-center gap-3 font-bold text-[#737373] text-sm">
                  <ChevronRight />

                  <p>the quick fox jumps over the lazy dog</p>
                </div>
                <div className="flex justify-start items-center gap-3 font-bold text-[#737373] text-sm">
                  <ChevronRight />

                  <p>the quick fox jumps over the lazy dog</p>
                </div>
                <div className="flex justify-start items-center gap-3 font-bold text-[#737373] text-sm">
                  <ChevronRight />

                  <p>the quick fox jumps over the lazy dog</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 ">
                <p className="font-bold text-2xl pb-2">
                  the quick fox jumps over
                </p>
                <div className="flex justify-start items-center gap-3 font-bold text-[#737373] text-sm">
                  <ChevronRight />

                  <p>the quick fox jumps over the lazy dog</p>
                </div>
                <div className="flex justify-start items-center gap-3 font-bold text-[#737373] text-sm">
                  <ChevronRight />

                  <p>the quick fox jumps over the lazy dog</p>
                </div>
                <div className="flex justify-start items-center gap-3 font-bold text-[#737373] text-sm">
                  <ChevronRight />

                  <p>the quick fox jumps over the lazy dog</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "additionalInformation" && (
          <div className="max-w-2xl mx-auto my-10">
            <p className="pb-2 text-[#737373] text-m">
              Discover the essential details that make this piece a must-have in
              your wardrobe.
            </p>
            <p className="text-[#737373] text-sm py-1">
              <strong>Material: </strong>100% Cotton
            </p>
            <p className="text-[#737373] text-sm py-1">
              <strong>Fit: </strong>Regular
            </p>
            <p className="text-[#737373] text-sm py-1">
              <strong>Neckline: </strong>Crew Neck
            </p>
            <p className="text-[#737373] text-sm py-1">
              <strong>Sleeve: </strong>Short
            </p>
            <p className="text-[#737373] text-sm py-1">
              <strong>Care: </strong>Machine wash cold
            </p>
            <p className="text-[#737373] text-sm py-1">
              <strong>Made in: </strong>Turkey
            </p>
          </div>
        )}
        {activeTab === "review" && <ReviewForm productName={product.name} />}
      </div>
    </section>
  );
}





