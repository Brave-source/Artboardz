import Image from 'next/image'

const Avatar = ({ image, username, borderColor }) => {

  const AvatarClass = `h-full w-full rounded-full object-cover`;
  return (
     <Image src={image ? image : "https://firebasestorage.googleapis.com/v0/b/cardano-d265c.appspot.com/o/defaultProfile.png?alt=media&token=63108be1-14c5-4f0c-87d5-95453461d972"} alt={username} className={AvatarClass} width={100} height={100} />
  );
}

export default Avatar;
