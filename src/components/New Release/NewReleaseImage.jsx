import Image from 'next/image'

const NewReleaseImage = (props) => {
  return (
    
      <Image src={props.image} alt="/" width={100} height={100} className="w-full  h-[236px] md:h-[536px] xl:h-[70vh]  object-cover object-center" unoptimized={true}/>
    
  );
};

export default NewReleaseImage;
