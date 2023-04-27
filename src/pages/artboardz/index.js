import { useEffect } from "react";
import SearchBar from "@/components/Navigation/SearchBar";
import ArtBoardzSection from "@/components/sections/ArtBoardzSection/ArtBoardzSection";

const ArtBoardzPage = () => {
  useEffect(() => {
    document.querySelector("#main-layout").scrollTop = 0;
  }, []);
  return (
    <>
      <h1 className="xl:hidden block  text-[22px] md:text-[32px] font-semibold text-center tracking-wide text-white mb-[8px] font-Montserrat">
        Artboardz
      </h1> 
      <div className="mx-[8px] xl:ml-4 xl:mr-8 xl:mt-8">
      {/* <SearchBar /> */}
      <ArtBoardzSection />
      </div>
    </>
  );
};

export default ArtBoardzPage;
