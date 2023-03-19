import DiscordIcon from "@/assets/icons/DiscordIcon";
import InstagramIconsOutline from "@/assets/icons/InstagramIconsOutline";
import TwitterIconsOutline from "@/assets/icons/TwitterIconsOutline";
import CardanoIcon from "@/assets/images/icons8-cardano-50.png"
import Image from "next/image";

const NewReleaseInfo = ({  artist, city, country, title, price  }) => {
  return (
    <div className="tracking-wide overflow-visible grid grid-cols-1 py-2 px-4 h-full content-evenly w-full">
      <div className="flex items-center justify-between align-center">
        <p className="text-2xl md:text-[20px] font-medium">{title} by {artist}</p>
        
      </div>

      <div className="flex  items-center align-center justify-between">
        <p className="text-sm"> {city}, {country}</p>
        <div className="flex gap-2 items-center">
        <p className="text-lg">{price} </p>
        <Image src={CardanoIcon} height={20} unoptimized={true}/>
        </div>
      </div>   
    </div>
  );
};

export default NewReleaseInfo;
