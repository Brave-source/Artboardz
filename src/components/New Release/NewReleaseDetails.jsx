
import { useSelector } from "react-redux";
import { DetailsCard } from "./DetailsCard";
import NewReleaseImage from "./NewReleaseImage";
import NewReleaseInfo from "./NewReleaseInfo";



const NewReleaseDetails = ({
  image,
  art,
  artist,
  instagram,
  discord,
  twitter,
  city,
  country,
  artDesc,
  moreInfo,
  mintDate,
  price,
  items,
  royalty,
  id,
  web
}) => {
  const collection = useSelector((state) => state.collection.collections.filter((item) => item._id == id));

  return (
    <section className="text-white font-Montserrat">
      <div className=" mt-[8px] mr-[8px] sm:mr-[16px] ml-[8px]"> 
      <h1 className="xl:hidden block  text-[22px] md:text-[32px] font-semibold text-center tracking-wide text-white mb-[8px]">New Releases</h1>
      <div className="overflow-hidden rounded-[20px] border border-transparent">
        <NewReleaseImage image={image} />
        </div>
        
      </div>
     
      {collection.map((info, index) => {
        return (
          <div key={index} className=" ">
            <DetailsCard
            image={info?.artistUrl}
            title={info?.title}
            desc2={info?.mintingDetails}
            desc3={info?.aboutMe}
            artist={artist}
            artDesc={info?.artDesc}
            mintDate={mintDate}
            price={price}
            items={items}
            royalty={royalty}
            country={info?.country}
            discord={info?.discord}
            twitter={info?.twitter}
            city={info?.city}
            buyLink={info?.nmkrLink}
            jpgLink={info?.jpgLink}
            instagram={info?.instagram}
            webLink={info?.webLink}
            />
          </div>
        );
      })}
    </section>
  );
};

export default NewReleaseDetails;
