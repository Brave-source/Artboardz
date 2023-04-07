import { useEffect } from "react";
import ArtFlowSection from "@/components/sections/HomeSections/ArtFlowSection";
import BenefitsSections from "@/components/sections/HomeSections/BenefitsSections";
import BillboardSection from "@/components/sections/HomeSections/BillboardSection";
import TwitterIcon from "@/assets/icons/TwitterIcon";
import DiscordIcon from "@/assets/icons/DiscordIcon";
import Link from "next/link";
import Roadmap from "@/components/Roadmap/Roadmap";

const About = () => {
    useEffect(() => {
        document.querySelector("#main-layout").scrollTop = 0;
      }, []);
      return (
        <>
          <BillboardSection />
          <BenefitsSections />
          <ArtFlowSection />
          <Roadmap/>
          <div className="h-screen w-fit mx-auto mt-auto sm:mb-10 flex items-center flex-col ">
          <div className="flex gap-2">
          <Link href={'https://twitter.com/theartbankers'}>
        <TwitterIcon />
        </Link>
        <Link href={'https://discord.gg/wCHMvjN7'}>
        <DiscordIcon />
        </Link>
    </div>

            {/* <div>
              <p className="text-white font-Montserrat">Pool ID: d19db...44</p>
            </div> */}
          </div>
        </>
      )
}

export default About;