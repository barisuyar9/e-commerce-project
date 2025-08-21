import { useState } from "react";
import Switch from "@mui/material/Switch";
import { Check } from "lucide-react";

const label = { inputProps: { "aria-label": "Switch demo" } };

const plans = [
  {
    title: "FREE",
    description: "Organize across all apps by hand",
    price: 0,
    features: [
      { text: "Unlimited product updates", available: true },
      { text: "Unlimited product updates", available: true },
      { text: "Unlimited product updates", available: true },
      { text: "1GB Cloud storage", available: false },
      { text: "Email and community support", available: false },
    ],
  },
  {
    title: "STANDARD",
    description: "Organize across all apps by hand",
    price: 9.99,
    features: [
      { text: "Unlimited product updates", available: true },
      { text: "Unlimited product updates", available: true },
      { text: "Unlimited product updates", available: true },
      { text: "1GB Cloud storage", available: true },
      { text: "Email and community support", available: false },
    ],
    highlight: true,
  },
  {
    title: "PREMIUM",
    description: "Organize across all apps by hand",
    price: 19.99,
    features: [
      { text: "Unlimited product updates", available: true },
      { text: "Unlimited product updates", available: true },
      { text: "Unlimited product updates", available: true },
      { text: "1GB Cloud storage", available: true },
      { text: "Email and community support", available: true },
    ],
  },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="bg-[#FAFAFA]">
      <div className=" w-[65vw] text-center mx-auto pt-30">
        <h1 className=" text-[#252B42] text-[40px] font-bold ">Pricing</h1>
        <p className="text-sm text-[#737373]  mx-auto pt-5">
          Problems trying to resolve the conflict between{" "}
          <br className="hidden md:flex" /> the two major realms of Classical
          physics: Newtonian mechanics
        </p>
      </div>
      <div className="w-[75vw] mx-auto my-10 flex flex-wrap justify-around items-center font-bold text-[#252B42] max-w-[390px]">
        <p>Monthy</p>

        <Switch
          {...label}
          onClick={() => setIsYearly(!isYearly)}
          className=""
        />

        <p>Yearly</p>
        <p className="flex ml-2 items-center justify-center  w-[108px] h-[44px] text-[#23A6F0]  text-sm bg-[#B2E3FF] rounded-[37px]">
          Save 25%
        </p>
      </div>
      <div className="w-[75vw] max-w-[985px] mx-auto flex flex-col gap-5 md:flex-row md:gap-0 justify-center items-end">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={` py-10 px-5 flex flex-col gap-5 justify-around border rounded-lg ${
              plan.highlight
                ? `bg-[#252B42] h-[664px] text-white md:h-[704px]`
                : `border-[#23A6F0] h-[664px] text-[#252B42]`
            } `}
          >
            <p className="text-center text-2xl font-bold">{plan.title}</p>
            <p
              className={`text-center font-bold w-[160px] mx-auto ${
                plan.highlight ? ` text-white` : `text-[#737373]`
              } `}
            >
              {plan.description}
            </p>
            <div className="flex justify-center items-center gap-1 text-[#23A6F0]">
              <p className="font-bold text-[40px]">
                {isYearly
                  ? (plan.price * 0.75).toFixed(2)
                  : plan.price.toFixed(2)}
              </p>
              <div>
                <p className="font-bold text-2xl">$</p>
                <p className="font-base text-sm">Per Month</p>
              </div>
            </div>
            {plan.features.map((feature, index) => (
              <div key={index} className="w-[90%] flex items-center gap-2">
                <div
                  className={`w-8 h-8 flex justify-center items-center rounded-full text-white ${
                    feature.available ? ` bg-[#2DC071]` : `bg-[#BDBDBD]`
                  }`}
                >
                  <Check className="w-5 h-5 rounded-full text-white" />
                </div>

                <p className="text-sm font-bold">{feature.text}</p>
              </div>
            ))}
            <button className="mt-5 h-[52px] bg-[#23A6F0] rounded-md font-bold text-white text-sm cursor-pointer hover:bg-[#1c7ab1]">
              Try for free
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}