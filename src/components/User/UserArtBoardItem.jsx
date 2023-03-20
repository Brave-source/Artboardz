import Link from "next/link";
import ArtBoardInfo from "../ArtBoardz/ArtBoardInfo";
import Image from 'next/image'
import UserArtboardInfo from "./UserArtboardInfo";
const UserArtBoardItem = ({ image, name }) => {
  console.log(name)
  return (
    <li className="w-[302px]   bg-primary-color border-2 border-light-purple rounded-lg overflow-hidden">
        <Image src={image} alt="/" className="w-full h-[200px] object-cover object-top" width={100} height={100} unoptimized={true} />
      <div className="p-3">
        <UserArtboardInfo
          name={name}
        />
      </div>
    </li>
  );
};

export default UserArtBoardItem;
