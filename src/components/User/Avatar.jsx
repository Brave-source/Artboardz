import Image from 'next/image'
import { useSelector } from 'react-redux';

const Avatar = ({ image, username, borderColor }) => {
  const user = useSelector((item) => item.user.user);

  const AvatarClass = `h-full w-full rounded-full object-cover`;
  return (
     <Image src={user.image ? user.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvFFG-hAuwWCF1wpo8rDXVEfoFI4_MTg0V8Q&usqp=CAU"} alt={user.name} className={AvatarClass} width={100} height={100} />
  );
}

export default Avatar;
