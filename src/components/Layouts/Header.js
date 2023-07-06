import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardanoWallet,
  useWallet,
  useAddress,
  useAssets,
  useNetwork,
} from "@meshsdk/react";
import axios from "axios";
import {
  getUserFailure,
  getUserStart,
  getUserSuccess,
  logUserSuccess,
  updateUserSuccess,
} from "@/store/redux-slices/userSlice";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { LogoSmall } from "./LogoSmall";
import { UIAction } from "../../store/redux-slices/UI-slice";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import { offSetMainnet, setMainnet } from "@/store/redux-slices/CollectorSlice";
import { getNFTByAddress } from "../blockfrost/Blockfrost";
import { useRouter } from "next/router";

const Header = () => {
  const dispatch = useDispatch();
  const meshaddress = useAddress();
  const [isUser, setIsUser] = useState(false);
  const router = useRouter();
  const network = useNetwork();
  const assets = useAssets();
  const { connected } = useWallet();
  const user = useSelector((item) => item.user.user);
  const address = useSelector((item) => item.user.walletAddress);
  const isMainnet = useSelector((item) => item.collector.isMainnet);
  console.log("mesh address",meshaddress)
  console.log("lucid address",address)
  const profile = {
    stakeAddress: address,
    name: "",
    image: "",
    twitter: "",
    nationality: "",
  };
  useEffect(() => {
    const setAssets = async () => {
      const res = await getNFTByAddress(address);
      const units = res.amount?.map((item) => item.unit);
      const filteredUnits = units?.filter((unit) => unit  !== "lovelace");

      const inputs = { units: filteredUnits, id: user?._id, };
      try {
        const res = await axios.put(
          isUser && `https://artboardz.net/api/users/${user._id}`,
          inputs
        );
        dispatch(updateUserSuccess(res.data));
      } catch (err) {
        
      }
    };
    setAssets();
  }, [assets, isUser]);

  useEffect(() => {
    const getAddressInfo = async () => {
      let newUser = false;
      dispatch(getUserStart());
      try {
        const res = await axios.post(
          isMainnet && "https://artboardz.net/api/users",
          profile
        );
        dispatch(getUserSuccess(res.data));
        if(!res.data.name) {
          newUser = true;
        }else if(!res.data.image) {
          newUser = true;
        }
        newUser && router.push("/profile");
      } catch (err) {
        dispatch(getUserFailure());
      }
    };
    getAddressInfo();
  }, [address,isMainnet]);
  
  useEffect(() => {
    if(user?.stakeAddress && assets) {
      setIsUser(true)
    }
  }, [assets, user])

  useEffect(() => {
    !connected && dispatch(logUserSuccess());
  }, [connected, address]);

  useEffect(() => {
    if(connected && network == 1) {
      dispatch(setMainnet());
    }
  },[connected, network]);

  useEffect(() => {
    if(!connected || network == 0) {
      dispatch(offSetMainnet());
    }
  },[connected, network]);

  const navbarToggleHandler = () => {
    dispatch(UIAction.toggleNavbar());
  };
  return (
    <header
      className={`bg-primary-color h-{76px} w-full header flex gap-2 px-4 items-center justify-between`}
    >
      <div className="flex gap-4 xl:hidden">
        <button onClick={navbarToggleHandler}>
          <Bars3Icon className="w-8 text-white" />
        </button>
        <LogoSmall />
      </div>
      <div className="flex z-40 text-[#FFFFFF] items-center gap-2 ml-auto">
        <div className="flex lg:flex">
          <ConnectWallet />
        </div>
      </div>
    </header>
  );
};
export default Header;
