import Image from 'next/image'
import { useSelector } from 'react-redux';
import {defaultProfile} from "../../assets/images/defaultProfile.png"
const Avatar = ({ image, username, borderColor }) => {
  const user = useSelector((item) => item.user.user);

  const AvatarClass = `h-full w-full rounded-full object-cover`;
  return (
     <Image src={user.image ? user.image : defaultProfile} alt={user.name} className={AvatarClass} width={200} height={200} />
  );
}

export default Avatar;
