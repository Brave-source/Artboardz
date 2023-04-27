import Link from "next/link";
import Image from 'next/image'
import UserArtboardInfo from "./UserArtboardInfo";
import { useSelector } from "react-redux";
const UserArtBoardItem = ({ image, name, policyId }) => {
  const collection = useSelector((item) => item.collection.collections.filter((collection) => collection.policy == policyId))[0];
  return (
    <li className="w-[302px]   bg-primary-color border-2 border-light-purple rounded-lg overflow-hidden">
        <Image src={image} alt="/" className="w-full h-[300px] object-cover object-top" width={100} height={100} unoptimized={true} />
      <div className="p-3">
        <UserArtboardInfo
          name={name}
          jpgLink={collection.jpgLink}
        />
      </div>
    </li>
  );
};

export default UserArtBoardItem;
