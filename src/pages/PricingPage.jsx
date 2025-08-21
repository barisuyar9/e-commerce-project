import Brands from "../components/Brands";
import FAQ from "../components/pricing/FAQ";
import FreeTrialSection from "../components/pricing/FreeTrialSection";

import PricingSection from "../components/pricing/PricingSection";

export default function PricingPage(){
    return (
      <main>
        <PricingSection />
        <section className="font-[Montserrat]  bg-[#FAFAFA] py-45">
          <p className="w-[60vw] mx-auto text-center text-xl text-[#252B42] ">
            Trusted By Over 4000 Big Companies
          </p>
          <Brands />
        </section>
        <FAQ />
        <FreeTrialSection />
      </main>
    );
}