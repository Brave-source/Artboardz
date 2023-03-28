import Image from 'next/image'

const Avatar = ({ image, username, borderColor }) => {

  const AvatarClass = `h-full w-full rounded-full object-cover`;
  return (
     <Image src={image ? image : "https://firebasestorage.googleapis.com/v0/b/cardano-d265c.appspot.com/o/defaultProfile.png?alt=media&token=a2172f23-507f-4e25-a64d-beb767d9d0f3"} alt={username} className={AvatarClass} width={100} height={100} />
  );
}

export default Avatar;
