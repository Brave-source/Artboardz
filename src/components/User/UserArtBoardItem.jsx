import Link from "next/link";
import ArtBoardInfo from "../ArtBoardz/ArtBoardInfo";
import Image from 'next/image'
import UserArtboardInfo from "./UserArtboardInfo";
const UserArtBoardItem = ({ image, art, price, id, city, country, instagram, discord, twitter }) => {
  return (
    <li className="w-[302px]   bg-primary-color border-2 border-light-purple rounded-lg overflow-hidden">
      <Link href={`/artboardz/${id}`} className="w-[302px] h-[302px] md:h-[302px] block">
        <Image src={image} alt="/" className="w-full h-full  object-cover object-top" width={100} height={100} />
      </Link>
      <div className="p-3">
        <UserArtboardInfo
          art={art}
          price={price}
          country={country}
          city={city}
          discord={discord}
          twitter={twitter}
          instagram={instagram}
        />
      </div>
    </li>
  );
};

export default UserArtBoardItem;
