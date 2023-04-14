
import hero0Image from "@/assets/images/hero0.jpg";
import hero1Image from "@/assets/images/hero1.png";
import hero2Image from "@/assets/images/hero2.png";
import hero3Image from "@/assets/images/hero3.png";
import Image from 'next/image'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from 'next/router';
import { NodeNextRequest } from "next/dist/server/base-http/node";

export const HERO_DATA = [
  {
    id: "H0",
    image: hero0Image,
    title: "Replacing Billboards With Art",
    button: "Explore",
    ref: "artboardz"
  },
  {
    id: "H1",
    image: hero1Image,
    title: "Support Our New Collections",
    button: "Support",
    ref: "new-releases"
  },
  {
    id: "H2",
    image: hero2Image,
    title: "Our Top Artboardz Collectors",
    button: "View",
    ref: "leaderboardz"
  },
  {
    id: "H3",
    image: hero3Image,
    title: "How Artboardz Works",
    button: "Learn",
    ref: "about"
 },
];

const HeroSection = () => {
  const router = useRouter();
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    lazyLoad: 'ondemand',

  };
  const displayHero = HERO_DATA.map((hero, index) => {
    return (
      <Box key={index} sx={{justifyContent: 'center', w:'100vw', border: 1, borderColor: 'transparent', borderRadius:'12px'}}>
        <h1 className="md:hidden block  text-[22px] font-semibold text-center tracking-wide text-white mb-[8px]">{hero.title}</h1>
      <Image
        src={hero.image}
        alt=""
        className="w-full h-[236px] md:h-[61vh] xl:h-[82vh] rounded-[10px] xl:rounded-[20px] overflow-hidden object-cover"
      />
      <div className="xl:absolute xl:bottom-[5%] xl:ml-12 md:h-[20px]">
        <h1 className="hidden md:block md:relative md:bottom-[160px] md:ml-[30px] md:text-left text-[40px] text-center tracking-wide text-white ">{hero.title}</h1>
        <button className="hover:bg-transparent border border-2 border-[#6E028F] bg-[#6E028F] md:relative md:bottom-[160px] md:ml-[30px] w-full md:w-[194px] h-[38px] xl:h-[46px] text-white py-2 px-1 xl:px-4 rounded-md text-base tracking-wide font-Poppins font-[16px]  block my-6 ">
        <Link href={'/'+hero.ref} className={router.pathname.split('/')[1] == hero.ref }>{hero.button}</Link>          </button>
      </div>
      </Box>
    );
  })
  return (
    <section className=" mr-[8px] xl:mr-[16px] ml-[8px] mt-[8px] rounded-[12px]">
      <div className="hidden xl:w-full xl:rounded-[12px] xl:block">
        <Slider {...settings} className="w-full mr-[20px] rounded-[12px]">
          {displayHero}
        </Slider>
      </div>
      <div className="xl:hidden  w-full rounded-[12px] block">
          {displayHero}
      </div>
    </section>
  );
};

export default HeroSection;
