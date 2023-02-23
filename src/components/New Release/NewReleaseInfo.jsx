import DiscordIcon from "@/assets/icons/DiscordIcon";
import InstagramIconsOutline from "@/assets/icons/InstagramIconsOutline";
import TwitterIconsOutline from "@/assets/icons/TwitterIconsOutline";
import CardanoIcon from "@/assets/images/icons8-cardano-50.png"
import Image from "next/image";

const NewReleaseInfo = ({ art, location, artist, links, artDesc }) => {
  return (
    <div className=" tracking-wide overflow-visible p-3  items-center flex-col">
      <div className="flex items-center justify-between ">
        <p className="text-2xl md:text-[20px] font-medium">{`${art} by ${artist}`}</p>
        
      </div>

      <div className="flex  items-center justify-between">
        <p className="text-sm"> {`${location.city}, ${location.country}`}</p>
        <div className="flex gap-2 items-center">
        <p className="text-lg">100 </p>
        <Image src={CardanoIcon} height={20}/>
        </div>
      </div>   
    </div>
  );
};

export default NewReleaseInfo;
