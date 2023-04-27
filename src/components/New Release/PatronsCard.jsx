import TwitterIconsOutline from "@/assets/icons/TwitterIconsOutline";
import Image from 'next/image'

export const PatronsCard = ({ image, name, twitter, country, assets, policyId }) => {
  const totalAssets = assets.filter((item) => item.policyId == policyId)

  return (
    <div className="flex  justify-center space-x-3 px-2 py-4">
      <div>
        <Image width={100} height={100} className="object-cover w-100 h-100 rounded-full border border-2 border-light" src={image? image : "https://firebasestorage.googleapis.com/v0/b/cardano-d265c.appspot.com/o/defaultProfile.png?alt=media&token=63108be1-14c5-4f0c-87d5-95453461d972"} alt="Rounded avatar" unoptimized={true}/>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex">
          <h2 className="flex-none font-semibold">{name}</h2>
          {twitter &&
            <a className="flex-initial" href={twitter} rel="noopener noreferrer"
            target="_blank"><TwitterIconsOutline className="ml-2 w-4 mt-1" /></a>
          }
        </div>
        <div>
          <p className="lead text-[#A0ABBB] w-[110px]">{country}</p>
          <p>{totalAssets.length} Artboardz</p>
        </div>
      </div>
    </div>
  );
};
