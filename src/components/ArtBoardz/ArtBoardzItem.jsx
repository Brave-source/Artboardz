import Link from "next/link";
import ArtBoardzInfo from "./ArtBoardInfo";
import Image from 'next/image'

const ArtBoardzItem = ({ image, city, country, artist, instagram, discord, twitter, id }) => {
  return (
    <li className=" bg-primary-color border-2 border-light-purple rounded-lg overflow-hidden">
      <Link href={`/artboardz/${id}`} className="h-[236px] sm:h-[266px] md:h-[228px] block">
        <Image src={image} alt="/" className="h-[236px] w-full sm:h-full object-cover " width={100} height={100} />
      </Link> 
      <div className="p-3">
        <ArtBoardzInfo
          artist={artist}
          city={city}
          country={country}
          instagram={instagram}
          discord={discord}
          twitter={twitter}
        />
      </div>
      {/* <button className="bg-active-link rounded-md p-2 font-semibold w-11/12 mx-auto block tracking-wide text-base my-4">
        Floor: 340
      </button> */}
    </li>
  );
};

export default ArtBoardzItem;
