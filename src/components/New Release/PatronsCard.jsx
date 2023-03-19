import TwitterIconsOutline from "@/assets/icons/TwitterIconsOutline";
import Image from 'next/image'

export const PatronsCard = ({ image, name, twitter, country, assets }) => {
  return (
    <div className="flex space-x-3 px-2 py-4">
      <div>
        <Image width={100} height={100} className="object-cover w-24 h-24 rounded-full border border-2 border-light" src={image} alt="Rounded avatar" unoptimized={true}/>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex">
          <h2 className="flex-none font-semibold">{name}</h2>
          {twitter &&
            <a className="flex-initial" href={twitter}><TwitterIconsOutline className="ml-2 w-4 mt-1" /></a>
          }
        </div>
        <div>
          <p className="lead">{country}</p>
          <p>{assets.length} Artboardz</p>
        </div>
      </div>
    </div>
  );
};
