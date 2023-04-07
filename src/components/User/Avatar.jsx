import Image from 'next/image'
import { useSelector } from 'react-redux';
import {defaultProfile} from "../../assets/images/defaultProfile.png"
const Avatar = ({ image, username, borderColor }) => {
  const user = useSelector((item) => item.user.user);

  const AvatarClass = `h-full w-full rounded-full object-cover`;
  return (
     <Image src={user.image ? user.image : "https://firebasestorage.googleapis.com/v0/b/cardano-d265c.appspot.com/o/defaultProfile.png?alt=media&token=63108be1-14c5-4f0c-87d5-95453461d972"} alt={user.name} className={AvatarClass} width={100} height={100} />
  );
}

export default Avatar;
