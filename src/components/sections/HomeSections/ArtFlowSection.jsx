import artflowImg1 from "@/assets/images/Artflow1.png";
import artflowImg3 from "@/assets/images/Artflow2.png";
import artflowImg5 from "@/assets/images/Artflow3.png";

import Image from 'next/image'

const ALL_INFO = [
  {
    image: artflowImg1,
    description: "Artist creates a mural on a positive narrative",
  },
  {
    image: artflowImg3,
    description: "Artboardz promotes and sells digital art",
  },
  {
    image: artflowImg5,
    description: "Artist creates physical version of the art",
  },
 
];

const DUMMY_INFO = [
  {
    image: artflowImg1,
    description: "Artist creates a mural on a positive narrative",
  },
  {
    image: artflowImg3,
    description: "Artboardz promotes and sells digital art",
  },
 
];


const ArtFlowSection = () => {
  return (
    <section className="tracking-wide mb-8 text-white  mx-auto w-[95%] max-w-[1192px] lg:w-full  font-Montserrat font-medium space-y-6  sm:p-4  text-center">
      <article>
        <h1 className="text-[20px] sm:text-[40px]">The Artboardz Flow</h1>
        {/* <p className="text-[18px] mt-10">
          The artist first creates the digital Artboardz version. Artists have
          complete creative freedom as long as the work is imbued with a
          positive, inspiring message. Once between 30 to 50 NFTs have sold, the
          artist creates the equivalent physical version at a predetermined
          public location.
        </p> */}
      </article>
      <div className="hidden md:grid grid-cols-2 md:grid-cols-3 gap-12 md:mx-0 xl:mx-8 gap-y-20 md:gap-x-20 xl:gap-x-32 md:gap-14 justify-items-center">
        {ALL_INFO.map((info, index) => {
          return (
            <div
              key={index}
              className="w-full h-full flex flex-col align-top mt-4  justify-center"
            >
              <div className="m-auto md:w-[12rem] xl:w-[16rem] ">
              <div className="flex justify-center">
              <Image
                src={info.image}
                alt="/"
                className= 'object-contain w-[12rem]'
              />
              
              </div>
              <div className="h-[20px]  border border-t-transparent border-r-transparent border-l-transparent border-[#6E028F]"></div>
              <p className=" text-base text-[14px] sm:text-[20px] text-center mt-6 tracking-wide">
                {info.description}
              </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* RESPONSIVE STYLES */}
      
      <div className="md:hidden grid grid-cols-2 lg:grid-cols-3 gap-12 mx-8 gap-y-20 lg:gap-x-10 lg:gap-14 justify-items-center">
        {DUMMY_INFO.map((info, index) => {
          return (
            <div
              key={index}
              className="w-full h-full flex flex-col align-top  "
            >
              <div className="m-auto w-[150px] ">
              <div className="flex justify-center border border-t-transparent border-r-transparent border-l-transparent border-[#6E028F]">
              <Image
                src={info.image}
                alt="/"
                className= 'object-contain w-[150px]'
              />
               <div className="h-[190px] w-[150px] "></div>
              </div>
              <p className=" text-base text-[14px] sm:text-[20px] text-center mt-4">
                {info.description}
              </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="md:hidden flex justify-center ">
      <div className="m-auto w-[150px] ">
              <Image
                src={artflowImg5}
                alt="/"
                className= 'object-contain w-[150px]  '
              />
              <div className="h-[20px] w-[150px] border border-t-transparent border-r-transparent border-l-transparent border-[#6E028F]"></div>
              </div>
              
              </div>
              
              <div className="md:hidden flex justify-center">
              <p className=" w-[150px] text-base text-[14px] sm:text-[20px] text-center ">
              Artist creates physical version of the art
              </p>
              </div>
      {/* <div >
        <h1 className="text-[20px] sm:text-[40px] p-4">Our Roadmap</h1>
      </div> */}
    </section>
  );
};

export default ArtFlowSection;
