import { DetailsCard } from "../New Release/DetailsCard";
import NewReleaseImage from "../New Release/NewReleaseImage";
import { PatronsCard } from "../New Release/PatronsCard";
import useCollapse from 'react-collapsed'
import { useState } from "react";
import Image from "next/image";

const ArtBoardzDetails = ({
  image,
  art,
  location,
  artist,
  links,
  artDesc,
  patrons,
  moreInfo,
  evolution,
  mintDate,
  price,
  items,
  royalty
}) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <section className="text-white font-Montserrat">
      <div className="xl:mt-[8px] mr-[8px] xl:mr-[16px] ml-[8px]">
      <h1 className="xl:hidden block  text-[22px] md:text-[32px] font-semibold text-center tracking-wide text-white mb-[8px]">
        Artboardz
      </h1> 
      <div className="overflow-hidden rounded-[20px] border border-transparent">
        <NewReleaseImage image={image} />
        </div>
          
          {/* <div className="grid grid-cols-5 gap-2 my-4 items-center justify-center text-base sm:text-xl tracking-wide">
          <div className=" p-2 border rounded-lg border-light-purple text-center">
              <p>Mint Date</p>
              <p className="font-semibold">Feb 22, 2023</p>
            </div>
            <div className=" p-2 border rounded-lg border-light-purple text-center">
              <p>Price</p>
              <p className="font-semibold">100</p>
            </div>
            <div className="p-2 border rounded-lg border-light-purple text-center">
              <p>Items</p>
              <p className="font-semibold">40</p>
            </div>
            <div className="p-2  border rounded-lg border-light-purple text-center">
              <p>Royalty</p>
              <p className="font-semibold">5%</p>
            </div>
            <div className="p-2  border rounded-lg border-light-purple text-center">
              <p>Location</p>
              <p className="font-semibold">South Africa</p>
            </div>
          </div> */}
          
       
      </div>

      {/* <div className="py-6">
        <NewReleaseInfo
          art={art}
          location={location}
          artist={artist}
          links={links}
          artDesc={artDesc}
        />
      </div> */}
      {moreInfo.map((info, index) => {
        return (
          <div key={index} className="py-12 ">
            <DetailsCard
              image={info.image}
              title={info.title}
              desc={info.desc}
              desc2={info.desc2}
              desc3={info.desc3}
              art={art}
              location={location}
              artist={artist}
              links={links}
              artDesc={artDesc}
              mintDate={mintDate}
              price={price}
              items={items}
              royalty={royalty}
              
            />
          </div>
        );
      })}
      {/* Patrons */}
      {patrons.title && (
        <h2 className="text-2xl md:text-3xl font-medium ml-[8px] pb-4">{patrons.title}</h2>
      )}
      <div className="py-1 mx-[8px] rounded-lg" style={{ backgroundColor: '#011335' }}>
        <div className="md:flex justify-between">
          {patrons.patron.slice(0, 4).map((info, index) => {
            let first = (index + 4) % 4 === 0;
            return(
                <div className={`xs:w-full md:w-1/4 my-2 ${first ? '' : 'xs:border-b md:border-l border-purple-800'}`} key={index}>
                  <PatronsCard 
                    image={info.image}
                    name={info.name}
                    twitter={info.twitter}
                    country={info.country}
                    assets={info.assets}
                  />
                </div>
            );
          })}
        </div>
        <div className="md:flex justify-between" {...getCollapseProps()}>
          {patrons.patron.slice(4).map((info, index) => {
            let first = (index + 4) % 4 === 0;
            return(
                <div className={`xs:w-full md:w-1/4 my-2 ${first ? '' : 'xs:border-b md:border-l border-purple-800'}`} key={index}>
                  <PatronsCard 
                    image={info.image}
                    name={info.name}
                    twitter={info.twitter}
                    country={info.country}
                    assets={info.assets}
                  />
                </div>
            );
          })}
        </div>
        <p className="text-center underline text-sm" {...getToggleProps()}>
            {isExpanded ? 'Collapse' : 'View All'}
        </p>
      </div>
      {evolution.title && (
        <h2 className="text-2xl md:text-3xl font-medium ml-[8px] pb-4 pt-8">{evolution.title}</h2>
      )}
      {/* <Colapse/> */}
      <div className="flex mx-2 my-4">
        <div className={"flex transition-all " + (checked ? "w-1/5" : "w-4/5")}>
          <button onClick={handleChange} className="w-full">
            <Image src={evolution.image} className={'object-cover h-[800px]'} />
          </button>
        </div>
        <div className={"flex transition-all " + (checked ? "w-4/5" : "w-1/5")}>
          <button onClick={handleChange} className="w-full">
            <Image src={evolution.image2} className={'object-cover h-[800px]'} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArtBoardzDetails;
