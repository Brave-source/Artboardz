import Link from "next/link";
import { Logo } from "../Layouts/Logo";
import { useDispatch } from "react-redux";
import { UIAction } from "../../store/redux-slices/UI-slice";
import { useRouter } from 'next/router';
import partner1 from '@/assets/images/partner1.png'
import partner2 from '@/assets/images/partner2.png'
import partner3 from '@/assets/images/partner3.png'
import partner4 from '@/assets/images/splash2.png'
import Image from "next/image";


const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const activeNavLinkHandler = ({ isActive }) => {
  //   return isActive
  //     ? "bg-active-link px-2 w-full inline-block"
  //     : "px-2 inline-block";
  // };
  const toggleNavbarHandler = () => {
    dispatch(UIAction.toggleNavbar());
  };

  return (
    <nav
      className={`bg-primary-color text-white text-xl  font-Montserrat h-fit w-[96%] sm:w-[98%] lg:w-[98.5%] xl:w-full mx-2 xl:mx-0  border border-[#FFFFFF] navbar z-50 absolute top-[75px] xl:relative xl:flex xl:left-0 xl:top-0 xl:flex-col xl:px-6 xl:py-4  xl:h-screen xl:gap-y-4 xl:border-none`}
    >
      <div className="hidden xl:flex justify-center relative bottom-2">
        <Logo/>
      </div>

      <ul className="text-center space-y-8 my-8 xl:text-left xl:space-y-4 xl:pt-2">
        <li onClick={toggleNavbarHandler} className="">
          <Link href="/" className={router.pathname == "/" ?  "w-[95%] m-auto h-[46px] pt-2 bg-active-link xl:px-2  xl:h-fit xl:pt-0   inline-block" : "px-2 inline-block"}>
            Home
          </Link>
        </li>
        <li onClick={toggleNavbarHandler}>
          <Link href="/new-releases" className={router.pathname.split('/')[1] == "new-releases" ? "w-[95%] m-auto h-[46px] pt-2 bg-active-link xl:px-2  xl:h-fit xl:pt-0   inline-block xl:w-full" : "px-2 inline-block"}>
            New Releases
          </Link>
        </li>
        <li onClick={toggleNavbarHandler}>
          <Link href="/artboardz" className={router.pathname.split('/')[1] == "artboardz" ? "w-[95%] m-auto h-[46px] pt-2 bg-active-link xl:px-2  xl:h-fit xl:pt-0   inline-block" : "px-2 inline-block"}>
            Artboardz
          </Link>
        </li>
        <li onClick={toggleNavbarHandler}>
          <Link href="/leaderboardz" className={router.pathname.split('/')[1] == "leaderboardz" ? "w-[95%] m-auto h-[46px] pt-2 bg-active-link xl:px-2  xl:h-fit xl:pt-0   inline-block" : "px-2 inline-block"}>
            Leaderboardz
          </Link>
        </li>
        <li onClick={toggleNavbarHandler}>
          <Link href="/about" className={router.pathname.split('/')[1] == "about" ? "w-[95%] m-auto h-[46px] pt-2 bg-active-link xl:px-2  xl:h-fit xl:pt-0   inline-block" : "px-2 inline-block"}>
            About
          </Link>
        </li>
        <li onClick={toggleNavbarHandler}>
          <Link href="/faq" className={router.pathname.split('/')[1] == "faq" ? "w-[95%] m-auto h-[46px] pt-2 bg-active-link xl:px-2  xl:h-fit xl:pt-0   inline-block" : "px-2 inline-block"}>
            FAQ
          </Link>
        </li>
        {/* <li className="xl:hidden">
          <CardanoWallet/>
        </li> */}
      </ul>
      <div className="hidden xl:block ml-2 mt-auto w-fit">
        <h1 className="p-2">Partners</h1>
        <div className="flex gap-2">
        <Link href="https://monetsociety.io">
          <Image src={partner1} width={40} />
        </Link>
        <Link href="https://theartbank.io">
        <Image src={partner2} width={40} />
        </Link>
        <Link href="https://cur8.io">
        <Image src={partner3} width={40} />
        </Link>
        <Link href="https://splash.club">
        <Image src={partner4} width={40} />
        </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
