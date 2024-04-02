import ButtonSubmit from "@/components/button-submit";
import Layout from "@/components/layout";
import { ChevronRight } from "lucide-react";

const Onboarding = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center p-4 space-y-5">
        <img className="w-80 h-80" src="/public/logo-parkify.png" alt="" />
        <p className="font-medium text-4xl">Parkify</p>
        <p className="font-normal text-base text-center px-8">
          “Reserve your parking hassle-free with our advance reservation system”
        </p>
        <div className="flex w-full p-10">
          <ButtonSubmit
            button_value="Explore Now"
            button_icon={<ChevronRight />}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Onboarding;
