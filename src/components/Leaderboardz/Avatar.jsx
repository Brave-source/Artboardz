import Image from 'next/image'

const Avatar = ({ image, username, borderColor }) => {

  const AvatarClass = `h-full w-full rounded-full object-cover`;
  return (
     <Image src={image ? image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvFFG-hAuwWCF1wpo8rDXVEfoFI4_MTg0V8Q&usqp=CAU"} alt={username} className={AvatarClass} width={100} height={100} />
  );
}

export default Avatar;
